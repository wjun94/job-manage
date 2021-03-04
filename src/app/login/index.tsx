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
    // if (window.$utils.getCookie("manageToken")) {
    //   this.props.history.push('/')
    // }
  }
  handleSubmit = async (values) => {
    const res = await window.$api.login(values)
    window.$utils.setCookie("manageToken", res.token)
    delete res.token
    window.localStorage.setItem("userInfo", JSON.stringify(res))
    // window.$user = res
    const href = window.location.href.match(/^[\w\W]+[#]/)
    if (href) {
      window.location.href = href[0] + "/customer/select"
    } else {
      this.props.history.push('/customer/select')
      window.location.reload();
    }
  };
  render() {
    return (
      <div className='login-page flex-center'>
        <div className='login-main left-center'>
          <img alt="log" src={LeftPng} />
          <div className='right'>
            <div className='header'>
              <h2>温州千选才网业务员后台</h2>
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
