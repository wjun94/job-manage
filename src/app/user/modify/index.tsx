/**
 * 描述信息：账号信息-修改密码
 */

import * as React from 'react';
import './index.scss';
import { Form, Input, Button, Col, message } from 'antd'
import { FormInstance } from 'antd/lib/form';

export interface Node {
  pwd: string
  newPwd: string
  verPwd: string
}


class App extends React.Component<{}, {}> {
  formRef = React.createRef<FormInstance>();
  /**
   * @param values
   * @todo 提交表单
   */
  onFinish = (values: Node) => {
    const { pwd, newPwd, verPwd } = values
    if (newPwd !== verPwd) {
      message.error("新密码与确认密码不一致")
      return
    } else if (pwd === newPwd) {
      message.error("原密码不能与新密码一样")
      return
    } else if (newPwd.length < 6) {
      message.error("新密码不能少于6位")
      return
    }
    window.$api.updatePwd(values).then(() => {
      if (this.formRef.current) { this.formRef.current.resetFields() };
    })
  }

  render() {
    const layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
    };
    return (
      <Form {...layout} ref={this.formRef} onFinish={this.onFinish} name="basic" className='update-password animate'>
        <Form.Item
          label="原密码"
          name="pwd"
          rules={[{ required: true, message: '请输入原密码' }]}
        >
          <Input type='password' placeholder="请输入原密码" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPwd"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input type='password' placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="verPwd"
          rules={[{ required: true, message: '请输入确认新密码' }]}
        >
          <Input type='password' placeholder="请输入确认新密码" />
        </Form.Item>

        <Col offset={3}>
          <Button htmlType="submit" type="primary">确认</Button>
          <Button>返回</Button>
        </Col>
      </Form >
    );
  }
}

export default App;
