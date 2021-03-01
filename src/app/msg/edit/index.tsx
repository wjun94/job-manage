/**
 * 描述信息：留言管理-添加留言
 */

import * as React from 'react';
import './index.scss';
import { Form, Input, Button } from 'antd'
import { FormProps } from '../../types'

const { TextArea } = Input

class App extends React.Component<FormProps, {}> {

  handleSubmit = (values) => {
    window.$api.createMsg("POST", "createMsg", values).then(() => {
      this.props.history.push('/msg')
    });
  }

  render() {
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 7 },
    };
    return (
      <Form {...layout} onFinish={this.handleSubmit} name="basic" className='message-add-page animate'>
        <Form.Item
          label="联系人"
          name="name"
          rules={[{ required: true, message: '请输入联系人' }]}
        >
          <Input placeholder="请输入联系人" />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phone"
          rules={[{ required: true, message: '请输入联系电话' }]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item
          label="问题描述"
          name="desc"
          className="intro"
          rules={[{ required: true, message: '请输入问题描述' }]}
        >
          <TextArea rows={10} placeholder="请输入问题描述" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 3 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button>返回</Button>
        </Form.Item>
      </Form >
    );
  }
}

export default App;
