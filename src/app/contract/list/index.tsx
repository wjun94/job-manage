/**
 * 描述信息：日志管理-登录日志
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
      title: '编号',
      dataIndex: 'createAt',
    },
    {
      title: '创建时间',
      dataIndex: 'ip',
    },
    {
      title: '生效时间',
      dataIndex: 'addr',
    },
    {
      title: '合同周期',
      dataIndex: 'platform',
    },
    {
      title: '状态',
      dataIndex: 'browser',
    }, {
      title: '操作情况',
      dataIndex: '',
      key: 'option',
      render: () => <p><span>查看</span></p>
    }
  ]
  
  render() {
    const { data } = this.state
    return (
      <Table className='animate' bordered columns={this.columns} dataSource={data} size="middle" />
    );
  }
}

export default App;
