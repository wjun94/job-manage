import React from 'react'
import { connect } from 'react-redux'
import {
  setCurrent,
  setList,
  setPageSize,
  setPaginationProps,
  setParams,
} from '@/store/customer/select/action'
import type { MngNode } from '@/app/common.d'
import Table from './table'
import SearchBar, { initColumns } from '@/component/search-bar'
import { CompanySelectNode } from '@/app/common.d'
import ContactTableModal from '@/component/contact-table-modal'
import { setData } from '@/store/company/desc/action'
import './index.scss'
import { Button } from 'antd'
import type { CommonType1 } from '@/store/redux'

export interface P extends CommonType1<CompanySelectNode> {
  setPageSize: Function
  setList: Function
  setData: Function
  setPaginationProps: Function
  setCurrent: Function
  setParams: Function
  data: any
  mngList: MngNode[]
  history: any
}

@(connect(
  (state: any) => {
    return {
      ...state.customerSelectReducer,
      data: state.companyDescReducer.data,
      mngList: state.commonReducer.mngList, // 业务员列表
    }
  },
  (dispatch) => ({
    setParams(data: {}) {
      // 跳转编辑单位信息tab缓存数据
      dispatch(setParams(data))
    },
    setData(data: {}) {
      // 跳转编辑单位信息tab缓存数据
      dispatch(setData(data))
    },
    setList(list: []) {
      dispatch(setList(list))
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
  })
) as any)
export default class Home extends React.Component<P, any> {
  state = {
    contactList: [],
    isModalVisible: false,
    loading: true,
  }

  searchColums = [
    ...initColumns,
    {
      name: 'manageId',
      title: '业务人员',
      valueType: 'select',
      valueEnum: [
        { label: '全部', value: '' },
        ...this.props.mngList.map((v) => ({ label: v.name, value: v.id })),
      ],
    },
  ]

  async componentDidMount() {
    this.getData()
  }

  /**
   * @todo 获取列表数据
   */
  getData = async () => {
    const { current, pageSize, params } = this.props
    const { data, total } = await window.$api.customerSelectList({
      current: current,
      pageSize: pageSize,
      ...params,
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
    this.setState({
      loading: false,
    })
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
   * @todo 点击加入或脱离
   * @param node
   * @memberof table
   */
  onOptions = (node: CompanySelectNode) => {
    const isOut = node.manage && node.manage.name
    if (isOut) {
      // 踢出
      window.$api.outCompany({
        companyId: node.companyId,
      })
    } else {
      // 加入
      window.$api.addCompany({
        companyId: node.companyId,
      })
    }
    node.manage = {
      name: isOut ? '' : window.$user.name,
    }
    this.props.setList(this.props.list)
  }

  /**
   * @param type 1:编辑 2:是否急聘
   * @param node 节点属性
   * @memberof Table
   */
  onCompany = async (node: CompanySelectNode) => {
    const { companyId } = node
    this.props.history.push({
      pathname: '/company/desc',
      search: companyId ? `companyId=${companyId}` : '',
    })
  }

  /**
   * @todo 点击联系人
   * @param node 节点属性
   * @memberof Table
   */
  onContact = async (node) => {
    const result = await window.$api.contactList({ companyId: node.companyId })
    this.setState({
      contactList: result.data,
      isModalVisible: true,
    })
  }

  /**
   * @todo 新建单位
   * */
  onAdd = async () => {
    await this.props.setData(null)
    this.props.history.push({ pathname: '/company/edit' })
  }

  /**
   * @todo 点击搜索
   * @param values 表单数据
   */
  onSearch = async (values) => {
    console.log(values)
    await this.props.setParams(values)
    this.getData()
  }

  render() {
    const { paginationProps, list } = this.props
    const { contactList, isModalVisible, loading } = this.state
    return (
      <>
        <SearchBar init={this.props.params} onFinish={this.onSearch} columns={this.searchColums} />
        <div className="customer-select app-container">
          <Button type="primary" onClick={this.onAdd} className="add">
            新增单位
          </Button>
          <Table
            loading={loading}
            onContact={this.onContact}
            onOptions={this.onOptions}
            onNodeClick={this.onCompany}
            pagination={paginationProps}
            list={list}
          />
        </div>
        <ContactTableModal
          onCancel={() => this.setState({ isModalVisible: false })}
          isModalVisible={isModalVisible}
          list={contactList}
        />
      </>
    )
  }
}
