/**
 * 描述信息：职位管理-单位资料
 */

import * as React from 'react'
import './index.scss'
import { Form, Input, Button, Col, Radio } from 'antd'
import { RouteComponentProps } from 'react-router'
import { ContactNode as Node } from '@/app/common.d'

const { TextArea } = Input

export interface S {
  data: Node | any
  id: string
}

class App extends React.Component<RouteComponentProps, S> {
  state = {
    data: {},
    id: '',
  }

  private formRef: any = null
  private companyId = ''

  async componentDidMount() {
    this.companyId = window.$utils.getHashQuery('companyId')
    const id = window.$utils.getHashQuery('id')
    let data = {
      sex: true,
    }
    if (id) {
      data = await window.$api.contact({ id })
      this.setState({
        data,
      })
    }
    this.formRef.setFieldsValue(data)
    this.setState({
      id,
    })
  }

  onFinish = async (values: Node) => {
    const { companyId } = this
    if (this.state.id) {
      const { data } = this.state
      await window.$api.updateContact({ ...data, ...values })
    } else {
      await window.$api.createContact({ ...values, companyId })
    }
    this.props.history.goBack()
  }

  render() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    }
    const { id } = this.state
    return (
      <>
        <Form
          {...layout}
          name="basic"
          onFinish={this.onFinish}
          ref={(el) => (this.formRef = el)}
          className="company-info app-container animate"
        >
          <Form.Item label="称呼" name="name" rules={[{ required: true, message: '请输入称呼' }]}>
            <Input placeholder="请输入称呼" />
          </Form.Item>

          <Form.Item label="手机号码" name="phone">
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item label="固定电话" name="fixedNum">
            <Input placeholder="请输入固定电话" />
          </Form.Item>

          <Form.Item label="QQ" name="qq">
            <Input placeholder="请输入qq号" />
          </Form.Item>

          <Form.Item label="微信" name="wechart">
            <Input placeholder="请输入微信号" />
          </Form.Item>

          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item label="职务" name="pos">
            <Input placeholder="请输入职务" />
          </Form.Item>

          <Form.Item label="性别" name="sex">
            <Radio.Group>
              <Radio value={true}>男</Radio>
              <Radio value={false}>女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="备注" name="mark" className="intro">
            <TextArea rows={10} placeholder="请输入备注" />
          </Form.Item>
          <Col offset={6}>
            <Button onClick={() => this.props.history.goBack()}>返回</Button>
            <Button htmlType="submit" type="primary">
              {id ? '更新' : '添加'}
            </Button>
          </Col>
        </Form>
      </>
    )
  }
}

export default App
