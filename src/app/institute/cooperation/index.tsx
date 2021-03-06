import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import {
  setCurrent,
  setList,
  setPageSize,
  init,
  setPagination,
  setPaginationProps,
} from '@/store/institute/cooperation/action'
import Table from './table'
import SearchBar from './search-bar'
import { InstituteAllNode } from '@/app/common.d'
import Modal from '@/component/service-modal'
import './index.scss'

export interface P extends RouteComponentProps {
  pageSize: number
  current: number
  setPagination: Function
  setPageSize: Function
  init: Function
  setList: Function
  setPaginationProps: Function
  setCurrent: Function
  paginationProps: any
  list: InstituteAllNode[]
}

@(connect(
  (state: any) => {
    return { ...state.instituteCooperationReducer }
  },
  (dispatch) => ({
    setList(list: []) {
      dispatch(setList(list))
    },
    setPagination(obj: {}) {
      dispatch(setPagination(obj))
    },
    setPaginationProps(obj: {}) {
      dispatch(setPaginationProps(obj))
    },
    setCurrent(current: number) {
      dispatch(setCurrent(current))
    },
    setPageSize(pageSize: number) {
      dispatch(setPageSize(pageSize))
    },
    init() {
      dispatch(init())
    },
  })
) as any)
export default class Home extends React.Component<P> {
  state = {
    isModalVisible: false,
    serviceList: [],
  }

  async componentDidMount() {
    this.getData()
  }

  /**
   * @todo 获取列表数据
   */
  getData = async () => {
    const { current, pageSize } = this.props
    const { data, total } = await window.$api.instituteCooperationList({
      current: current,
      pageSize: pageSize,
    })
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: false,
      showTotal: () => `共${total}条`,
      pageSize,
      current,
      total: total,
      onShowSizeChange: (current: number, pageSize: number) =>
        this.changePageSize(pageSize, current),
      onChange: (current: number) => {
        this.changePage(current)
      },
    }
    this.props.setPaginationProps(paginationProps)
    this.props.setList(data)
  }

  changePageSize = async (pageSize: number, current: number) => {
    await this.props.setPageSize(pageSize)
    await this.props.setCurrent(current)
    // this.getData()
  }

  changePage = async (current: number) => {
    await this.props.setCurrent(current)
    this.getData()
  }

  /**
   * @todo 操作相关按钮
   * @param node
   * @memberof table
   */
  onOptions = async (type: number, node: InstituteAllNode) => {
    console.log(type)
    switch (type) {
      case 0: {
        // 开通服务
        this.props.history.push({
          pathname: '/contract/edit',
          search: `companyId=${node.companyId}`,
        })
        break
      }
      case 5: {
        // 服务
        const result = await window.$api.serviceList({ companyId: node.companyId })
        this.setState({
          serviceList: result,
          isModalVisible: true,
        })
        break
      }
    }
  }

  /**
   * @param type 1:编辑 2:是否急聘
   * @param node 节点属性
   * @memberof Table
   */
  onCompany = async (node: InstituteAllNode) => {
    const { companyId } = node
    this.props.history.push({
      pathname: '/company/desc',
      search: companyId ? `companyId=${companyId}` : '',
    })
  }

  render() {
    const { paginationProps, list } = this.props
    const { isModalVisible, serviceList } = this.state
    return (
      <>
        <SearchBar />
        <div className="customer-select app-container">
          <Table
            onOptions={this.onOptions}
            onNodeClick={this.onCompany}
            pagination={paginationProps}
            list={list}
          />
        </div>
        <Modal
          list={serviceList}
          handleCancel={() => this.setState({ isModalVisible: false })}
          isModalVisible={isModalVisible}
        />
      </>
    )
  }
}
