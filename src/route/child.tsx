import React from 'react'
import { RouteProps } from "react-router-dom";
import Home from '../app/home'
import Loadable from 'react-loadable'
import CompanyPng from '../assets/images/company.png'
import PosPng from '../assets/images/pos.png'
import ResumePng from '../assets/images/resume.png'
import AdPng from '../assets/images/ad.png'
import ContractPng from '../assets/images/contract.png'
import MessagePng from '../assets/images/message.png'
import LogPng from '../assets/images/log.png'
import SetPng from '../assets/images/set.png'

const ResumeList = Loadable({
    loader: () => import('../app/resume/list'),
    loading: () => <div>Loading...</div>,
});

const RecruitList = Loadable({
    loader: () => import('../app/recruit/list'),
    loading: () => <div>Loading...</div>,
});

const CompanyDoc = Loadable({
    loader: () => import('../app/company/doc'),
    loading: () => <div>Loading...</div>,
});

const CompanyLogo = Loadable({
    loader: () => import('../app/company/logo'),
    loading: () => <div>Loading...</div>,
});

const ContractList = Loadable({
    loader: () => import('../app/contract/list'),
    loading: () => <div>Loading...</div>,
});

const CompanyQRCode = Loadable({
    loader: () => import('../app/company/QRCode'),
    loading: () => <div>Loading...</div>,
});

const UserSafety = Loadable({
    loader: () => import('../app/user/safety'),
    loading: () => <div>Loading...</div>,
});

const AdvertiseList = Loadable({
    loader: () => import('../app/advertise/list'),
    loading: () => <div>Loading...</div>,
});

const ResumeHistory = Loadable({
    loader: () => import('../app/resume/history'),
    loading: () => <div>Loading...</div>,
});

const ResumeSearch = Loadable({
    loader: () => import('../app/resume/search'),
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

const CompanySelect = Loadable({
    loader: () => import('../app/company/select'),
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

const RecruitEdit = Loadable({
    loader: () => import('../app/recruit/edit'),
    loading: () => <div>Loading...</div>,
});

CompanyLogo.preload()  // 预加载
MsgList.preload()
RecruitEdit.preload()
LogLogin.preload()
MsgEdit.preload()
LogOperate.preload()
ResumeHistory.preload()
CompanyDesc.preload()
CompanySelect.preload()
UserModify.preload()
ResumeSearch.preload()
AdvertiseList.preload()
CompanyDoc.preload()
RecruitList.preload()
ContractList.preload()
CompanyQRCode.preload()
ResumeList.preload()
UserSafety.preload()

export const routes = [
    {
        path: '/company',
        title: '客户管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={CompanyPng} />,
        children: [{
            path: '/select',
            title: '客户查询',
            component: CompanySelect
        }, {
            path: '/add',
            title: '添加客户',
            hide: true,
            component: CompanyDesc
        }, {
            path: '/desc',
            title: '单位详情',
            hide: true,
            component: CompanyDesc
        }, {
            path: '/me',
            title: '我的客户',
            component: CompanyLogo
        }, {
            path: '/reserve',
            title: '预约客户',
            component: CompanyQRCode
        }, {
            path: '/contact',
            title: '今日联系',
            component: CompanyDoc
        }, {
            path: '/not',
            title: '私库未联系',
            component: CompanyDoc
        }, {
            path: '/away',
            title: '30天脱离',
            component: CompanyDoc
        }, {
            path: '/expected',
            title: '未合作',
            component: CompanyDoc
        }, {
            path: '/being',
            title: '正合作',
            component: CompanyDoc
        }, {
            path: '/former',
            title: '原合作',
            component: CompanyDoc
        }, {
            path: '/pub',
            title: '公库',
            component: CompanyDoc
        }]
    },
    {
        path: '/recruit',
        title: '职位管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={PosPng} />,
        children: [{
            path: '/list',
            title: '职位列表',
            component: RecruitList
        }, {
            path: '/edit',
            hide: true,
            title: '职位编辑',
            component: RecruitEdit
        }]
    },
    {
        path: '/resume',
        title: '简历管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={ResumePng} />,
        children: [{
            path: '/list',
            title: '应聘简历',
            component: ResumeList
        }, {
            path: '/search',
            title: '搜索简历',
            component: ResumeSearch
        }, {
            path: '/history',
            title: '浏览记录',
            component: ResumeHistory
        }]
    },
    {
        path: '/advertise',
        title: '广告管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={AdPng} />,
        children: [{
            path: '/list',
            title: '广告列表',
            component: AdvertiseList
        }]
    },
    {
        path: '/contract',
        title: '合同管理',
        icon: <img alt="log" className='anticon img anticon-pic-center' src={ContractPng} />,
        children: [{
            path: '/list',
            title: '合同列表',
            component: ContractList
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