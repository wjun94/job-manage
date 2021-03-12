import React from 'react'
import { RouteProps } from "react-router-dom";
import Home from '../app/home'
import Loadable from 'react-loadable'
import CompanyPng from '../assets/images/company.png'
import PosPng from '../assets/images/pos.png'
import MessagePng from '../assets/images/message.png'
import LogPng from '../assets/images/log.png'
import SetPng from '../assets/images/set.png'

const CustomerDoc = Loadable({
    loader: () => import('../app/customer/doc'),
    loading: () => <div>Loading...</div>,
});

const UserSafety = Loadable({
    loader: () => import('../app/user/safety'),
    loading: () => <div>Loading...</div>,
});

const UserModify = Loadable({
    loader: () => import('../app/user/modify'),
    loading: () => <div>Loading...</div>,
});

const CompanyDesc = Loadable({
    loader: () => import('../app/company/desc'),
    loading: () => <div>Loading...</div>,
});

const CustomerEdit = Loadable({
    loader: () => import('../app/company/edit'),
    loading: () => <div>Loading...</div>,
});

const CustomerSelect = Loadable({
    loader: () => import('../app/customer/select'),
    loading: () => <div>Loading...</div>,
});

const CustomerMe = Loadable({
    loader: () => import('../app/customer/me'),
    loading: () => <div>Loading...</div>,
});

const CustomerReserve = Loadable({
    loader: () => import('../app/customer/reserve'),
    loading: () => <div>Loading...</div>,
});

const CustomerToday = Loadable({
    loader: () => import('../app/customer/today'),
    loading: () => <div>Loading...</div>,
});

const CustomerNot = Loadable({
    loader: () => import('../app/customer/not'),
    loading: () => <div>Loading...</div>,
});

const LogOperate = Loadable({
    loader: () => import('../app/log/operate'),
    loading: () => <div>Loading...</div>,
});

const LogLogin = Loadable({
    loader: () => import('../app/log/login'),
    loading: () => <div>Loading...</div>,
});

const MsgEdit = Loadable({
    loader: () => import('../app/msg/edit'),
    loading: () => <div>Loading...</div>,
});

const MsgList = Loadable({
    loader: () => import('../app/msg/list'),
    loading: () => <div>Loading...</div>,
});

const ContactList = Loadable({
    loader: () => import('../app/contact/list'),
    loading: () => <div>Loading...</div>,
});

const ContactEdit = Loadable({
    loader: () => import('../app/contact/edit'),
    loading: () => <div>Loading...</div>,
});

const InstituteAll = Loadable({
    loader: () => import('../app/institute/all'),
    loading: () => <div>Loading...</div>,
});

const InstituteNot = Loadable({
    loader: () => import('../app/institute/not'),
    loading: () => <div>Loading...</div>,
});

const ContractEdit = Loadable({
    loader: () => import('../app/contract/edit'),
    loading: () => <div>Loading...</div>,
});

ContractEdit.preload()
InstituteAll.preload()
InstituteNot.preload()
MsgList.preload()
LogLogin.preload()
MsgEdit.preload()
LogOperate.preload()
CompanyDesc.preload()
CustomerEdit.preload()
CustomerSelect.preload()
CustomerMe.preload()
CustomerReserve.preload()
CustomerToday.preload()
CustomerNot.preload()
UserModify.preload()
CustomerDoc.preload()
UserSafety.preload()
ContactList.preload()
ContactEdit.preload()

export const routes = [
    {
        path: '/contact',
        title: '联系人管理',
        children: [{
            path: '/list',
            title: '联系人列表',
            hide: true,
            component: ContactList
        }, {
            path: '/edit',
            title: '编辑联系人',
            hide: true,
            component: ContactEdit
        }]
    },
    {
        path: '/company',
        title: '单位管理',
        children: [{
            path: '/desc',
            title: '单位详情',
            hide: true,
            component: CompanyDesc
        }, {
            path: '/edit',
            title: '编辑单位信息',
            hide: true,
            component: CustomerEdit
        },]
    },
    {
        path: '/customer',
        title: '客户管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={CompanyPng} />,
        children: [{
            path: '/select',
            title: '客户查询',
            component: CustomerSelect
        }, {
            path: '/add',
            title: '添加客户',
            hide: true,
            component: CompanyDesc
        }, {
            path: '/me',
            title: '我的客户',
            component: CustomerMe
        }, {
            path: '/reserve',
            title: '预约客户',
            component: CustomerReserve
        }, {
            path: '/contact',
            title: '今日联系',
            component: CustomerToday
        }, {
            path: '/not',
            title: '私库未联系',
            component: CustomerNot
        }, {
            path: '/away',
            title: '30天脱离',
            component: CustomerDoc
        }, {
            path: '/expected',
            title: '未合作',
            component: CustomerDoc
        }, {
            path: '/being',
            title: '正合作',
            component: CustomerDoc
        }, {
            path: '/former',
            title: '原合作',
            component: CustomerDoc
        }, {
            path: '/pub',
            title: '公库',
            component: CustomerDoc
        }]
    },
    {
        path: '/institute',
        title: '单位管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={PosPng} />,
        children: [{
            path: '/all',
            title: '全部单位',
            component: InstituteAll
        }, {
            path: '/not',
            title: '未合作',
            component: InstituteNot
        }, {
            path: '/experience',
            title: '体验中',
            component: InstituteAll
        }, {
            path: '/cooperation',
            title: '合作中',
            component: InstituteAll
        }, {
            path: '/maturity',
            title: '已到期',
            component: InstituteAll
        }]
    },
    {
        path: '/contract',
        title: '合同管理',
        children: [{
            path: '/edit',
            title: '编辑合同',
            hide: true,
            component: ContractEdit
        }]
    },
    {
        path: '/msg',
        title: '留言管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={MessagePng} />,
        children: [{
            path: '/list',
            title: '留言列表',
            component: MsgList
        }, {
            path: '/edit',
            hide: true,
            title: '留言编辑',
            component: MsgEdit
        }]
    },
    {
        path: '/log',
        title: '日志管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={LogPng} />,
        children: [{
            path: '/login',
            title: '登录日志',
            component: LogLogin
        }, {
            path: '/operate',
            title: '操作日志',
            component: LogOperate
        }]
    },
    {
        path: '/user',
        title: '账号管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={SetPng} />,
        children: [{
            path: '/modify',
            title: '修改密码',
            component: UserModify
        }, {
            path: '/safety',
            title: '安全设置',
            component: UserSafety
        }]
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: '',
        component: Home
    },
]

const result: RouteProps[] = []

routes.forEach(v => {
    if (v.children) {
        (v.children as any).forEach(child => {
            result.push({
                path: `${v.path}${child.path}`,
                component: child.component
            })
        })
    } else {
        result.push(v)
    }
})

export default result