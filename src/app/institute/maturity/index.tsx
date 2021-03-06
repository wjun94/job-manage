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
} from '@/store/institute/not/action'
import ExperienceDrawer from '@/component/experience-drawer'
import Table from './table'
import SearchBar from './search-bar'
import { InstituteAllNode } from '@/app/common.d'
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
    return { ...state.instituteNotReducer }
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
export default class Home extends React.Component<P, any> {
  state = {
    isVisible: false,
    drawerData: {},
  }

  async componentDidMount() {
    this.getData()
  }

  /**
   * @todo 获取列表数据
   */
  getData = async () => {
    const { current, pageSize } = this.props
    const { data, total } = await window.$api.instituteMaturityList({
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
  onOptions = (type: number, node: InstituteAllNode) => {
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
      case 3: {
        // 开通体验
        this.setState({
          isVisible: true,
          drawerData: node,
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

  onDrawerClose = () => {
    this.setState({
      isVisible: false,
    })
  }

  onDrawerFinish = async (values) => {
    await window.$api.createExperience(values)
  }

  render() {
    const { paginationProps, list } = this.props
    const { isVisible, drawerData } = this.state
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
        <ExperienceDrawer
          onFinish={this.onDrawerFinish}
          visible={isVisible}
          data={drawerData}
          onClose={this.onDrawerClose}
        />
      </>
    )
  }
}
