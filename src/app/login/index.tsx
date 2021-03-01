/**
 * 文档作者: wjun94
 * 创建时间：2019年10月27日
 * 修改时间：2019年10月27日
 * 描述信息：登录
 */
import * as React from 'react';
import './index.scss';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from '../types'
import LeftPng from './left.png'

class App extends React.Component<FormProps, {}> {
  componentDidMount() {
    // if (window.$utils.getCookie("jobToken")) {
    //   this.props.history.push('/')
    // }
  }
  handleSubmit = async (values) => {
    const res = await window.$api.loginCompany(values)
    window.$utils.setCookie("jobToken", res)
    this.props.history.push('/')
  };
  onRegist = () => {
    this.props.history.push('/regist')
  }
  render() {
    return (
      <div className='login-page flex-center'>
        <div className='login-main left-center'>
          <img alt="log" src={LeftPng} />
          <div className='right'>
            <div className='header'>
              <h2>龙港人才网企业登入</h2>
              <p className='desc'>一款专门做招聘的平台</p>
            </div>

            <Form onFinish={this.handleSubmit} className="login-form">
              <Form.Item name='phone' rules={[{ required: true, message: '请输入账号!' }]}>
                <Input
                  prefix={<UserOutlined />}
                  placeholder="手机号"
                />
              </Form.Item>
              <Form.Item name='pwd' rules={[{ required: true, message: '请输入密码!' }]}>
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item >
                <Button block type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
                <Button block onClick={this.onRegist} className="login-form-button">
                  注册
                </Button>
              </Form.Item>
            </Form>
            <p className='footer'>Longgang Job ©2020 Created by Hangzhou</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
