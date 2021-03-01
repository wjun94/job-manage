/**
 * 描述信息：简历管理-搜索简历
 */

import * as React from 'react';
import './index.scss';
import { Form, Input, Cascader, Button, Select, Col } from 'antd'
import options from '../../data/cities'
import { Node as LabelNode } from '../../types'
import { educationArr } from '../../data'

const { Option } = Select

export interface Node {
  addr: string[]
  name: string
  exp: string
  educ: number
  updateAt: number
}

const updateTime = [
  {
    label: '最近一周',
    name: 1
  }, {
    label: '半个月',
    name: 2
  }, {
    label: '一个月',
    name: 3
  }, {
    label: '半年',
    name: 4
  },
]

class App extends React.Component {
  render() {
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 7 },
    };
    return (
      <Form {...layout} name="basic" className='comp-page animate'>
        <Form.Item
          label="所在城市"
          name="addr"
        >
          <Cascader placeholder="请选择所在城市" options={options} />
        </Form.Item>
        <Form.Item
          label="从事岗位"
          name="name"
        >
          <Input placeholder="请输入单位名称" />
        </Form.Item>
        <Form.Item
          label="工作年限"
          name="exp"
        >
          <Input placeholder="请输入工作年限" />
        </Form.Item>
        <Form.Item label="学历" name='educ'>
          <Select allowClear placeholder="请选择学历">
            {
              educationArr.map((item, i) => <Option key={'edz-' + i} value={i + 1}>{item}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item label="简历更新时间" name='updateAt'>
          <Select allowClear placeholder="请选择学历">
            {
              updateTime.map((v: LabelNode) => <Option key={'ed-' + v.name} value={v.name}>{v.label}</Option>)
            }
          </Select>
        </Form.Item>
        <Col offset={3}>
          <Button htmlType="submit" type="primary">搜索</Button>
        </Col>
      </Form >
    );
  }
}

export default App;
