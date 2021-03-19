/**
 * 描述信息：简历管理-浏览记录
 */

import * as React from 'react';
import './index.scss';
import { Table } from 'antd';


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
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '应聘岗位',
      dataIndex: 'pos',
      key: 'pos',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '学历',
      dataIndex: 'educ',
      key: 'educ',
    },
    {
      title: '现所在城市',
      dataIndex: 'loc',
      key: 'loc',
    }, {
      title: '浏览日期',
      dataIndex: 'createAt',
      key: 'createAt',
    },
  ];
  constructor(props: any | Node[]) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.changePageSize()
  }


  /** 单击tab */
  handleModeChange = (key: string) => {
    console.log(key)
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
      data: res.data.map((v: any) => ({ ...v, key: v.id }))
    })
  }



  render() {
    const { data } = this.state
    return (
      <div className='history-page animate'>
        <Table pagination={this.pagination} columns={this.columns} dataSource={data} />
      </div>
    );
  }
}

export default App;
