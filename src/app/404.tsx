import { Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，您访问的页面不存在。"
    extra={<Link to={'/login'}>返回首页</Link>}
  />
)

export default NoFoundPage
