/**
 * 描述信息：简历管理-应聘简历
 */

import * as React from 'react';
import './index.scss';
import { Button, Tabs, Table, Input } from 'antd';
import { RouterProps } from '../../types'
import { resumeColumns, downColumns } from '../../home/data'
import { ColumnsType } from 'antd/lib/table'

const { Search } = Input;
const { TabPane } = Tabs;

export interface Node {
  name: string // 姓名
  pos: string // 应聘岗位
  sex: number // 性别 1:男 2:女
  educ: string // 学历
  loc: string   // 现所在城市
  createAt: string  // 投递时间/下载时间
  intv?: number // 面试结果
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
      columns: resumeColumns
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
      case 'tab-2':
        this.setState({
          columns: resumeColumns
        })
        break
      case 'tab-1':
        this.setState({
          columns: downColumns
        })
        break
    }
  }

  /** @todo 选择页码
   * @param {number} current 页码
   * @param {number} pageSize 显示多少个
   */
  changePageSize = async (current: number = 1, pageSize: number = 10) => {
    const res = await window.$api.recruitList({ current, pageSize })
    this.pagination.total = res.total
    this.pagination.pageSize = pageSize
    this.setState({
      data: res.data
    })
  }

  render() {
    const { columns, data, selected } = this.state
    return (
      <div className='apply-page animate'>
        <header className='flex-top-center'>
          <Search enterButton style={{ width: 260 }} onSearch={value => console.log(value)} placeholder="请输入人才姓名或应聘岗位" />
        </header>
        <Tabs defaultActiveKey="1" onChange={this.handleModeChange}>
          {
            ['全部简历', '已下载简历', '面试管理'].map((v, i) => {
              return <TabPane tab={v} key={'tab-' + i} />
            })
          }
        </Tabs>
        <Table rowSelection={this.rowSelection} pagination={this.pagination} columns={columns} dataSource={data} />
        <div className='footer'>
          {
            selected !== 'tab-2' ? <div>
              <Button type="primary">安排面试</Button>
              <Button danger>拒绝简历</Button>
              <Button type="primary" danger>删除简历</Button>
            </div> : <Button type="primary" danger>删除简历</Button>
          }
        </div>
      </div>
    );
  }
}

export default App;
