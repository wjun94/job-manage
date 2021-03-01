/**
 * 描述信息：留言管理-留言
 */

import * as React from 'react';
import './index.scss';
import { Button, Table } from 'antd';
import { RouterProps, Columns } from '../../types'

export interface Node {
  id: string
  name: string  // 联系人
  desc: string // 问题描述
  cont: string // 联系方式
  type: number // 问题类型
}

class App extends React.Component<RouterProps, any | Node[]> {
  // 页码显示
  private pagination: any = {
    total: 10,
    pageSize: 10,
    showSizeChanger: true,
    onShowSizeChange: (current: number, pageSize: number) => this.changePageSize(current, pageSize),
    onChange: (current: number, pageSize: number) => this.changePageSize(current, pageSize),
  }
  private selectedRows: string[] = []
  // 复选框勾选
  private rowSelection: any = {
    onChange: (_: string, selectedRows: string[]) => {
      this.selectedRows = selectedRows
    },
  };
  private columns: Columns[] = [
    {
      key: 'name',
      title: '联系人',
      dataIndex: 'name'
    },
    {
      key: 'desc',
      title: '问题描述',
      dataIndex: 'desc',
      render: (text: string) => <span className='txt'>{text}</span>
    },
    {
      key: 'phone',
      title: '联系电话',
      dataIndex: 'phone'
    },
    {
      key: 'type',
      title: '问题类型',
      dataIndex: 'type',
    },
    {
      key: 'sendAt',
      title: '创建日期',
      dataIndex: 'sendAt'
    },
  ]
  constructor(props: any | Node[]) {
    super(props)
    this.state = {
      data: []
    }
    console.log(this.selectedRows)
  }

  componentDidMount() {
    this.changePageSize()
  }

  /** 单击添加留言 */
  onMsgCreate = (query: string = '') => {
    this.props.history.push({ pathname: '/messageCreate', query })
  }

  /** @todo 选择页码
   * @param {number} current 页码
   * @param {number} pageSize 显示多少个
   */
  changePageSize = async (current: number = 1, pageSize: number = 10) => {
    const res = await window.$api.msgList({ current, pageSize })
    this.pagination.total = res.total
    this.pagination.pageSize = pageSize
    this.setState({
      data: res.data.map((v: any) => ({ ...v, key: v.id }))
    })
  }

  render() {
    const { data } = this.state
    return (
      <div className='message-page animate'>
        <header className='flex-top-center'>
          <Button onClick={() => this.onMsgCreate()} type="primary">添加留言</Button>
        </header>
        <Table rowSelection={this.rowSelection} pagination={this.pagination} columns={this.columns} dataSource={data} />
        <div className='footer'>
          <Button type="primary" danger>删除选中项</Button>
        </div>
      </div>
    );
  }
}

export default App;
