import React from 'react'
import { Layout, Menu, Button, Breadcrumb } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { Switch, Route, RouteProps, Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import './index.scss'
import routes, { routes as tabs } from '../../route/child'

const { SubMenu } = Menu
const { Header, Sider, Content } = Layout

export interface S {
  collapsed: boolean
  defaultOpenKeys: string[]
  defaultSelectedKeys: string
  title: string[]
}

export default class SiderDemo extends React.Component<RouteComponentProps, S> {
  state = {
    collapsed: false,
    defaultOpenKeys: ['/company'],
    defaultSelectedKeys: '/company/info',
    title: [],
  }

  componentWillMount() {
    this.props.history.listen((path) => {
      if (path.pathname) {
        this.getTitle(path.pathname)
      }
    })
    const result: any =
      window.location.hash.match(/[#/]([\w+]+)[/][\w]+/) ||
      window.location.pathname.match(/[/]([\w+]+)[/][\w]+/) ||
      '/company/info'
    const openKeys = result ? `/${result[1]}` : '/rank'
    const selectedKeys = result ? result[0] : ''
    this.getTitle(selectedKeys)
    this.setState({
      defaultSelectedKeys: selectedKeys,
      defaultOpenKeys: [openKeys],
    })
  }

  /**
   * @todo 获取title
   * @param path pathname
   */
  getTitle = (path: string = '') => {
    const title: string[] = []
    const result = path.match(/([/][\w+]+)[/][\w]+/)
    const openKeys = result && result[1]
    const selectedKeys: any = path
    tabs.find((v: any) => {
      if (v.path === openKeys) {
        const children = v.children.find((child) => selectedKeys.includes(child.path))
        title.push(v.title, children ? children.title : '')
      }
      return v.path === openKeys
    })
    this.setState({
      title,
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  onLoginout = () => {
    this.props.history.push('/login')
  }

  onMenu = (node: MenuInfo) => {
    this.props.history.push(String(node.key))
  }

  onOpenChange = (keys) => {
    if (keys.length) {
      const { defaultOpenKeys } = this.state
      const latestOpenKey = keys.find((key) => defaultOpenKeys.indexOf(key) === -1)
      this.setState({
        defaultOpenKeys: [latestOpenKey],
      })
    } else {
      this.setState({
        defaultOpenKeys: keys,
      })
    }
  }

  render() {
    const { defaultOpenKeys, defaultSelectedKeys, title } = this.state
    return (
      <Layout className="app-page">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="info flex-top-center">
            <p>&nbsp;中午好</p>
          </div>
          <Menu
            theme="dark"
            onOpenChange={this.onOpenChange}
            onClick={this.onMenu}
            mode="inline"
            openKeys={defaultOpenKeys}
            defaultSelectedKeys={[defaultSelectedKeys]}
          >
            {tabs.map(
              (v: any) =>
                v.icon && (
                  <SubMenu key={v.path} icon={v.icon} title={v.title}>
                    {v.children.map(
                      (child) =>
                        !child.hide && (
                          <Menu.Item key={v.path + child.path}>{child.title}</Menu.Item>
                        )
                    )}
                  </SubMenu>
                )
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background both-sides-center" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <Button onClick={this.onLoginout} className="login-out">
              退出
            </Button>
          </Header>
          <Content className="site-layout-background">
            <Breadcrumb style={{ margin: '16px 24px' }}>
              {title.map((v) => (
                <Breadcrumb.Item key={v}>{v}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div className="app-main">
              <Switch>
                {routes.map((route: RouteProps | any) =>
                  route.redirect ? (
                    <Redirect
                      key={'router-' + route.path}
                      exact={route.path === '/'}
                      from={route.path}
                      to={{ pathname: route.redirect }}
                    />
                  ) : (
                    <Route
                      key={'router-' + route.path}
                      path={route.path}
                      component={route.component}
                    />
                  )
                )}
              </Switch>
            </div>
            {/* <div className='footer-div'>
                            <Footer className='flex-center'><p>Job Admin ©2020 Created by Hangzhou</p></Footer>
                        </div> */}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
