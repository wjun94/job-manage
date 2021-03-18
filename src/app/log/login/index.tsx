/**
 * 描述信息：日志管理-登录日志
 */

import * as React from 'react';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table'
import './index.scss';

export interface Node {
  id: string
  createAt: string
  ip: string
  addr: string
  platform: string
  browser: string
}

export interface S {
  data: Node[]
}

class App extends React.Component<{}, S> {
  state = {
    data: []
  }
  // 页码显示
  private pagination: TablePaginationConfig = {
    total: 10,
    pageSize: 10,
    showSizeChanger: true,
    onShowSizeChange: (current: number, pageSize: number) => this.changePageSize(current, pageSize),
    onChange: (current, pageSize) => this.changePageSize(current, pageSize),
  }

  private columns = [
    {
      key: 'createAt',
      title: '登录时间',
      dataIndex: 'createAt',
    },
    {
      key: 'ip',
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      key: 'addr',
      title: '地点',
      dataIndex: 'addr',
    },
    {
      key: 'platform',
      title: '设备',
      dataIndex: 'platform',
    },
    {
      key: 'browser',
      title: '浏览器',
      dataIndex: 'browser',
    },
  ]

  componentDidMount() {
    this.changePageSize()
  }
  /** @todo 选择页码
   * @param {number} current 页码
   * @param {number} pageSize 显示多少个
   */
  changePageSize = async (current: number = 1, pageSize: number = 10) => {
    const res = await window.$api.loginLogList({ current, pageSize })
    this.pagination.total = res.total
    this.pagination.pageSize = pageSize
    this.setState({
      data: res.data.map((v: any) => ({ ...v, key: v.id }))
    })
  }
  render() {
    const { data } = this.state
    return (
      <Table className='animate' pagination={this.pagination} columns={this.columns} dataSource={data} size="middle" />
    );
  }
}

export default App;
