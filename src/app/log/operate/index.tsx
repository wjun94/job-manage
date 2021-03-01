/**
 * 描述信息：日志管理-操作日志
 */

import * as React from 'react';
import { Table } from 'antd';
import './index.scss';

class App extends React.Component {
  state = {
    data: []
  }
  private columns = [
    {
      title: '时间',
      dataIndex: 'createAt',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '地点',
      dataIndex: 'addr',
    },
    {
      title: '设备',
      dataIndex: 'platform',
    },
    {
      title: '操作详情',
      dataIndex: 'browser',
    },
  ]
  render() {
    const { data } = this.state
    return (
      <Table className='animate' columns={this.columns} dataSource={data} size="middle" />
    );
  }
}

export default App;
