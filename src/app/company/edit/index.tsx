/**
 * 描述信息：职位管理-单位资料
 */

import * as React from 'react';
import './index.scss';
import { Form, Input, Cascader, Button, Select, Col, DatePicker } from 'antd'
import options from '../../data/cities'
import { scaleArr, indArr, typeArr } from '../../data'
import { connect } from 'react-redux'
import { setData } from '@/store/company/desc/action'
import { RouteComponentProps } from 'react-router'
import moment from 'moment';

const { Option } = Select
const { TextArea } = Input

export interface P extends RouteComponentProps {
  data: FormNode
  setData: (node: Node) => void
}

export interface Node {
  name: string
  ind: string
  scale: string
  addr: string
  web: string
  desc: string
  prov: string
  city: string
  area: string
  amount: number
  foundAt: any
}

export interface FormNode extends Node {
  address: any
}

@(connect((state: any) => {
  return ({ ...state.companyDescReducer })
}, (dispatch) => ({
  setData(data: {}) {
    dispatch(setData(data))
  },
})) as any)
class App extends React.Component<P> {

  async componentDidMount() {
    if (!this.props.data) {
      const id = window.$utils.getHashQuery('companyId')
      const data = await window.$api.CompanyInfo({ id })
      await this.props.setData(data)
    }
  }

  onFinish = async (values: FormNode) => {
    const [prov, city, area] = values.address
    const { data } = this.props
    const { foundAt } = values
    const params = { ...data, ...values, prov, city, area, amount: Number(values.amount), foundAt: foundAt ? moment(foundAt).format('YYYY') : '' }
    await window.$api.updateCompanyInfo(params)
    this.props.setData(params)
    this.props.history.goBack()
  }

  render() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    const { data } = this.props
    if (!data) return '';
    if (data.foundAt) {
      data.foundAt = moment(data.foundAt, "YYYY/MM")
    }
    const dt = data as FormNode
    const { prov, city, area } = dt
    dt.address = [prov, city, area]
    return (
      <Form {...layout} name="basic" onFinish={this.onFinish} initialValues={dt} className='company-info app-container animate'>
        <Form.Item
          label="单位名称"
          name="name"
          rules={[{ required: true, message: '请输入单位名称' }]}
        >
          <Input placeholder="请输入单位名称" />
        </Form.Item>

        <Form.Item label="单位类型" name='type' rules={[{ required: true, message: '请选择单位类型' }]}>
          <Select allowClear placeholder="请选择单位类型">
            {
              typeArr.map((item) => <Option key={'rcomph-' + item.value} value={item.value}>{item.label}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="所在城市"
          name="address"
          rules={[{ required: true, message: '请选择所在城市' }]}
        >
          <Cascader placeholder="请选择所在城市" options={options} />
        </Form.Item>
        <Form.Item
          label="详细地址"
          name="addr"
        >
          <Input placeholder="请输入单位地址" />
        </Form.Item>

        <Form.Item label="单位行业" name='ind' >
          <Select allowClear placeholder="请选择单位行业">
            {
              indArr.map((item) => <Option key={'ind-' + item.value} value={item.value}>{item.label}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="单位规模"
          name="scale"
        >
          <Select allowClear placeholder="请选择单位规模">
            {
              scaleArr.map((item) => <Option key={'comp-' + item.value} value={item.value}>{item.label}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="单位官网"
          name="web"
        >
          <Input placeholder="如:www.job218.com" />
        </Form.Item>
        <Form.Item
          label="创办时间"
          name="foundAt"
        >
          <DatePicker format='YYYY' picker="year" />
        </Form.Item>
        <Form.Item
          label="投资金额"
          name="amount"
        >
          <Input prefix="￥" type='number' suffix="万" />
        </Form.Item>
        <Form.Item
          label="企业邮箱"
          name="email"
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item
          label="单位简介"
          name="desc"
          className="intro"
        >
          <TextArea rows={10} placeholder="请输入单位简介" />
        </Form.Item>
        <Col offset={6}>
          <Button onClick={() => this.props.history.goBack()}>返回</Button>
          <Button htmlType="submit" type="primary">更新信息</Button>
        </Col>
      </Form >
    );
  }
}

export default App;
