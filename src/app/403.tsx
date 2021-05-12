import { Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NoFoundPage: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="抱歉，您没有权限访问该页面，请重新登录。"
    extra={<Link to={'/login'}>返回首页</Link>}
  />
)

export default NoFoundPage
