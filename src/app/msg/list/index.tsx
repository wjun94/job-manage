/**
 * 描述信息：留言管理-留言
 */

import * as React from 'react';
import './index.scss';
import { Table, Tooltip } from 'antd';
import moment from 'moment'

export interface Node {
  id: string
  name: string  // 联系人
  desc: string // 问题描述
  cont: string // 联系方式
  type: number // 问题类型
}

class App extends React.Component<{}, any> {
  // 页码显示
  private pagination: any = {
    total: 10,
    pageSize: 10,
    showSizeChanger: true,
    onShowSizeChange: (current: number, pageSize: number) => this.changePageSize(current, pageSize),
    onChange: (current: number, pageSize: number) => this.changePageSize(current, pageSize),
  }
  private columns = [
    {
      key: 'createAt',
      title: '创建日期',
      dataIndex: 'createAt',
      render: (txt) => moment(txt).calendar()
    },
    {
      key: 'name',
      title: '联系人',
      dataIndex: 'name'
    },
    {
      key: 'phone',
      title: '联系电话',
      dataIndex: 'phone'
    },
    {
      key: 'page',
      title: '问题页面',
      dataIndex: 'page',
    },
    {
      key: 'desc',
      title: '问题描述',
      width: 240,
      ellipsis: {
        showTitle: false,
      },
      dataIndex: 'desc',
      render: (txt) => <Tooltip placement="topLeft" title={txt}>
        {txt}
      </Tooltip>
    },
  ]
  constructor(props: any | Node[]) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.changePageSize()
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
        <Table pagination={this.pagination} columns={this.columns} dataSource={data} />
      </div>
    );
  }
}

export default App;
