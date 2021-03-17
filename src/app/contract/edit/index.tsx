/**
 * 描述信息：职位管理-单位资料
 */

import * as React from 'react';
import './index.scss';
import { Form, Input, Radio, Select, DatePicker, Button, message } from 'antd'
import { InstituteAllNode as Node, AdvtgNode } from '@/app/interface'
import { typeArr, contractArr, combinationArr, paymentTimeArr } from '@/app/data'
import Table from './table'
import moment from 'moment';
import { RouteComponentProps } from 'react-router'

const { Option } = Select

class App extends React.Component<RouteComponentProps> {
  private formRef: any
  private companyId = ''
  state = {
    type: 1,
    list: []
  }
  async componentDidMount() {
    this.companyId = window.$utils.getHashQuery('companyId')
    const { data } = await window.$api.contactCompanyDesc({ companyId: this.companyId })
    data.companyType = typeArr.find(item => item.value === data.type)?.label || '-'
    data.companyName = data.name || '-'
    this.formRef.setFieldsValue({ ...data, type: 1, price: 0, month: 0, article: 0, urgent: 0, post: 0, down: 0 })
  }

  onFinish = async (values: Node) => {
    values.createAt = moment(values.createAt).format("YYYY-MM-DD HH:mm")
    values.addr = values.city
    values.status = true
    values.companyId = this.companyId
    await window.$api.createService({ ...values, name: values.combination, effectAt: values.createAt })
    // 创建广告
    const { list } = this.state
    list.length && list.forEach(async (item: AdvtgNode) => {
      await window.$api.createAdvtg({ ...values, ...item, effectAt: values.createAt })
    })
    message.success("开通成功")
    this.props.history.goBack()
  }

  /**
   * @todo 合同类型
   * @param v
   */
  onType = (v) => {
    this.setState({
      type: v.target.value
    })
  }

  onCreateAtBtn = () => {
    this.formRef.setFieldsValue({ createAt: moment(new Date(), "YYYY-MM-DD HH:mm") })
  }

  /**
   * @todo 单击套餐
   * @param node
   */
  onCombination = (node) => {
    const result: any = combinationArr.find(item => item.value === node)
    const { children = {} } = result
    this.setState({
      list: [
        {
          month: result?.month,
          name: children?.name,
          type: children?.type,
        }
      ]
    })
    this.formRef.setFieldsValue({ type: 1, price: result?.price, ...children, month: result?.month })
  }

  render() {
    const { type, list } = this.state
    return (
      <>
        <Form ref={el => this.formRef = el} name="basic" layout="vertical" onFinish={this.onFinish} className='contract-edit animate'>
          <header className='box left-line'>
            <h2>甲方信息</h2>
            <div className='flex'>
              <Form.Item label="甲方名称" name="companyName">
                <Input disabled />
              </Form.Item>
              <Form.Item label="单位类型" name="companyType">
                <Input disabled />
              </Form.Item>
              <Form.Item label="所在城市" name="prov">
                <Input disabled />
              </Form.Item>
            </div>
          </header>

          <div className='box left-line'>
            <h2>合同信息</h2>
            <Form.Item className='type' label="合同类型" name="type" >
              <Radio.Group onChange={this.onType} buttonStyle="outline">
                {
                  contractArr.map(v => <Radio.Button key={v.label} value={v.value}>{v.label}</Radio.Button>)
                }
              </Radio.Group>
            </Form.Item>

            <div className='flex combination'>
              <Form.Item label="合同套餐" name='combination'>
                <Select allowClear onChange={this.onCombination} placeholder="请选择单位类型">
                  {
                    combinationArr.map((item) => <Option key={'rcomph-' + item.value} value={item.value}>{item.label}</Option>)
                  }
                </Select>
              </Form.Item>

              <Form.Item label="合同金额" name='price' rules={[{ required: true, message: '请输入合同金额' }]}>
                <Input prefix="￥" disabled={type === 1} suffix="RMB" />
              </Form.Item>

              <Form.Item label="合作时间" name='month'>
                <Input disabled={type === 1} suffix="月" />
              </Form.Item>

              <Form.Item rules={[{ required: true, message: '请选择到账时间' }]} label="到账时间" name='paymentAt'>
                <Select allowClear placeholder="请选择到账时间">
                  {
                    paymentTimeArr.map((item) => <Option key={'rcoc-' + item.value} value={item.value}>{item.label}</Option>)
                  }
                </Select>
              </Form.Item>

              <Form.Item label="开通时间" rules={[{ required: true, message: '请选择到账时间' }]} name='createAt'>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" placeholder="请选择到账时间" />
              </Form.Item>
              <Form.Item label=" ">
                <Button onClick={this.onCreateAtBtn} type='primary'>当前时间</Button>
              </Form.Item>
            </div>
          </div>

          <div className='box left-line'>
            <h2>包含服务</h2>
            <div className='flex'>
              <Form.Item label="单位发布地" name="city">
                <Input disabled />
              </Form.Item>
              <Form.Item label="在线职位" rules={[{ required: true, message: '请输入在线职位' }]} name="post">
                <Input disabled={type === 1} />
              </Form.Item>

              <Form.Item label="急聘个数" name="urgent">
                <Input disabled={type === 1} />
              </Form.Item>

              <Form.Item label="简历下载" name="down">
                <Input disabled={type === 1} />
              </Form.Item>

              <Form.Item label="公众号推文" name="article">
                <Input disabled={type === 1} />
              </Form.Item>
            </div>
          </div>

          <div className='box last'>
            <h2>广告位</h2>
            <Table list={list} />
          </div>
          <Form.Item className='footer'>
            <Button onClick={() => this.props.history.goBack()}>返回</Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form >
      </>
    );
  }
}

export default App;
