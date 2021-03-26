import React from 'react'
import { Table, Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { InstituteNotNode } from '@/app/interface'
import { indArr, scaleArr } from '@/app/data'
import moment from 'moment'
import './index.scss'

export interface P {
    list: InstituteNotNode[] | any
    pagination: TablePaginationConfig | any
    onNodeClick: Function
    onOptions: Function
}

export interface Node {
    companyId: string
    name: string
    updateAt: string
    status: number
    views: number
}

export default function Index(props: P) {
    const { pagination, list, onOptions } = props
    const columns = [
        {
            key: 'name',
            title: '客户信息',
            width: 200,
            dataIndex: 'name',
            render: (txt: string, record: InstituteNotNode) => <>
                <Button onClick={() => props.onNodeClick(record)} type="link">{txt}</Button>
                <p className='flex'><span className={record.ind ? 'after' : ''}>{record.prov}-{record.city}</span><span>{indArr.find(item => item.value === record.ind)?.label}</span></p>
                <p>{scaleArr.find(item => item.value === record.scale)?.label}</p>
            </>
        },
        {
            key: 'l',
            title: '认证',
            dataIndex: 'l',
            render: () => <span>待完善</span>,
        },
        {
            key: 'z',
            title: '时间',
            dataIndex: 'z',
            render: (_, record: InstituteNotNode) => <>
                <p>注册时间：{moment(record.createAt).format('ll')}</p>
                <p>登录时间：-</p>
                <p>体验开始：{record.experience_at ? moment(record.experience_at).format('ll') : '-'}</p>
                <p>体验结束：{record.experience_at ? window.$utils.addTime(record.experience_at, record.day) : '-'}</p>
            </>,
        },
        {
            key: 'entrant',
            title: '来源',
            dataIndex: 'entrant',
        },
        {
            key: 'manage',
            title: '业务员',
            dataIndex: 'manage',
            render: (manage) => <span>{manage?.name || '-'}</span>,
        },
        {
            key: 'experienceCount',
            title: '体验次数',
            dataIndex: 'experienceCount',
        },
        {
            key: '',
            title: '操作选项',
            width: 320,
            dataIndex: '',
            render: (_, record: InstituteNotNode) => <>
                {
                    [{ label: '开通服务', value: 0 }, { label: '进入后台', value: 2 }, { label: '开通体验', value: 3 }, { label: '账号', value: 4 }, { label: '日志', value: 6 }].map((item, i) => (
                        <Button className={`btn-${item.value}`} key={'l-' + item.value} onClick={() => onOptions(item.value, record)}>{item.label}</Button>
                    ))
                }
            </>,
        },
    ]
    return <div className='institute-all-list-table'>
        <Table bordered columns={columns} rowKey="companyId" pagination={pagination} dataSource={list} />
    </div>
}