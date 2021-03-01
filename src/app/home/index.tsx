import * as React from 'react';
import './index.scss';
import Box from '../../component/box'
import { resumeColumns, adColumns } from './data'
import { Row, Table, Button } from 'antd';

const resumeData: any = []
for (let i = 0; i < 5; i++) {
  resumeData.push({
    key: i,
    name: `Edward King ${i}`,
    pos: 32,
    sex: `London, Park Lane no. ${i}`,
    age: `London, Park Lane no. ${i}`,
    educ: `London, Park Lane no. ${i}`,
    loc: `London, Park Lane no. ${i}`,
    createAt: `London, Park Lane no. ${i}`,
    intv: `London, Park Lane no. ${i}`,
  });
}

const posData: any = []
for (let i = 0; i < 5; i++) {
  posData.push({
    key: i,
    name: `Edward King ${i}`,
    stat: 32,
    intv: `London, Park Lane no. ${i}`,
    updateAt: `London, Park Lane no. ${i}`,
  });
}

const adData: any = []
for (let i = 0; i < 5; i++) {
  adData.push({
    key: i,
    name: `Edward King ${i}`,
    createAt: '2020-01-01',
    days: `London, Park Lane no. ${i}`,
    pos: `London, Park Lane no. ${i}`,
    stat: `London, Park Lane no. ${i}`,
    endAt: `London, Park Lane no. ${i}`,
  });
}
class App extends React.Component {
  state = {
    box1: [
      {
        label: '可发布',
        value: 30
      }, {
        label: '已发布',
        value: 30
      }, {
        label: '可发急聘',
        value: 30
      }, {
        label: '已发急聘',
        value: 30
      }
    ],
    box2: [
      {
        label: '应聘简历',
        value: 30
      }, {
        label: '可下载',
        value: 30
      }, {
        label: '已下载',
        value: 30
      }, {
        label: '剩余可下载',
        value: 30
      }
    ],
  }
  private posColumns = [
    {
      title: '岗位名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '岗位状态',
      dataIndex: 'stat',
      key: 'stat',
    }, {
      title: '访问量',
      dataIndex: 'intv',
      key: 'intv',
    }, {
      title: '更新时间',
      dataIndex: 'updateAt',
      key: 'updateAt',
    }, {
      title: '操作情况',
      dataIndex: '',
      key: 'option',
      render: () => <p><span>修改</span><span>应聘情况</span></p>
    }
  ]
  render() {
    const { box1, box2 } = this.state
    return (
      <div className='home-page animate'>
        <Row className='both-sides'>
            <Box title="职位" data={box1} />
            <Box title="简历" data={box2} />
        </Row>
        <div className='left-center'>
          <h2>最新应聘简历</h2>
          <Button type="primary">查找人才库简历</Button>
        </div>
        <Table bordered pagination={false} columns={resumeColumns} dataSource={resumeData} />
        <div className='left-center'>
          <h2>我的职位</h2>
          <Button type="primary">刷新所有职位</Button>
        </div>
        <Table bordered pagination={false} columns={this.posColumns} dataSource={posData} />
        <div className='left-center'>
          <h2>我的广告</h2>
        </div>
        <Table bordered pagination={false} columns={adColumns} dataSource={adData} />
      </div>
    );
  }
}

export default App;
