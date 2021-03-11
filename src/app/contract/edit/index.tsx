/**
 * 描述信息：职位管理-单位资料
 */

import * as React from 'react';
import './index.scss';
import { Form, Input, Radio, Select, DatePicker, Button } from 'antd'
import { InstituteAllNode as Node } from '@/app/interface'
import { typeArr, contractArr, combinationArr, paymentTimeArr } from '@/app/data'
import moment from 'moment';

const { Option } = Select

class App extends React.Component {
  private formRef: any
  state = {
    type: 1
  }
  async componentDidMount() {
    const companyId = window.$utils.getHashQuery('companyId')
    const { data } = await window.$api.contactCompanyDesc({ companyId })
    data.companyType = typeArr.find(item => item.value === data.type)?.label || '-'
    this.formRef.setFieldsValue({ ...data, type: 1, price: 0, month: 0, article: 0, urgent: 0, post: 0, down: 0 })
  }

  onFinish = async (values: Node) => {
    console.log(values)
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
    const result = combinationArr.find(item => item.value === node)
    this.formRef.setFieldsValue({ type: 1, price: result?.price, ...result?.children, month: result?.month })
  }

  render() {
    const { type } = this.state
    return (
      <>
        <Form ref={el => this.formRef = el} name="basic" layout="vertical" onFinish={this.onFinish} className='contract-edit animate'>
          <header className='box left-line'>
            <h2>甲方信息</h2>
            <div className='flex'>
              <Form.Item label="甲方名称" name="name">
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

              <Form.Item label="合同金额" name='price'>
                <Input prefix="￥" disabled={type === 1} suffix="RMB" />
              </Form.Item>

              <Form.Item label="合作时间" name='month'>
                <Input disabled={type === 1} suffix="月" />
              </Form.Item>

              <Form.Item label="到账时间" name='paymentAt'>
                <Select allowClear placeholder="请选择到账时间">
                  {
                    paymentTimeArr.map((item) => <Option key={'rcoc-' + item.value} value={item.value}>{item.label}</Option>)
                  }
                </Select>
              </Form.Item>

              <Form.Item label="开通时间" name='createAt'>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" placeholder="请选择开通时间" />
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
              <Form.Item label="在线职位" name="post">
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
          <Form.Item className='footer'>
            <Button>返回</Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form >
      </>
    );
  }
}

export default App;
