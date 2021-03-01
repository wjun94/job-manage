/**
 * 描述信息：广告管理
 */

import * as React from 'react';
import './index.scss';
import { Button, Tabs, Table } from 'antd';
import { RouterProps } from '../../types'
import { adColumns, noAdColumns } from './data'
import { ColumnsType } from 'antd/lib/table'

const { TabPane } = Tabs;

export interface Node {
  name: string // 姓名
  createAt: string // 开始时间
  days: number // 播放天数
  pos: string // 播放位置
  status: string   // 状态
  endAt?: number // 剩余时间
}

export interface S {
  data: Node[]
  selected: string
  columns: ColumnsType<any>
}

class App extends React.Component<RouterProps, S> {
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
  constructor(props: any | Node[]) {
    super(props)
    this.state = {
      data: [],
      selected: 'tab-0',
      columns: adColumns
    }
    console.log(this.selectedRows)
  }

  componentDidMount() {
    this.changePageSize()
  }

  /** 单击编辑 */
  onRecruitEdit = (query: string = '') => {
    this.props.history.push({ pathname: '/recruit/edit', query })
  }

  /** 单击tab */
  handleModeChange = (key: string) => {
    this.setState({
      selected: key
    })
    switch (key) {
      case 'tab-0':
      case 'tab-1':
        this.setState({
          columns: adColumns
        })
        break
      case 'tab-2':
      case 'tab-3':
        this.setState({
          columns: noAdColumns
        })
        break
    }
  }

  /** @todo 选择页码
   * @param {number} current 页码
   * @param {number} pageSize 显示多少个
   */
  changePageSize = (current: number = 1, pageSize: number = 10) => {
    window.$api.recruitList({ current, pageSize })
  }

  render() {
    const { columns, data, selected } = this.state
    return (
      <div className='apply-page animate'>
        <Tabs defaultActiveKey="1" onChange={this.handleModeChange}>
          {
            ['全部广告', '正在播放', '已暂停', '已结束'].map((v, i) => {
              return <TabPane tab={v} key={'tab-' + i} />
            })
          }
        </Tabs>
        <Table rowSelection={this.rowSelection} bordered pagination={this.pagination} columns={columns} dataSource={data} />
        <div className='footer'>
          {
            selected === 'tab-1' ? <Button type="primary" danger>暂停</Button> : selected === 'tab-2' && <Button type="primary">启用</Button>
          }
        </div>
      </div>
    );
  }
}

export default App;
