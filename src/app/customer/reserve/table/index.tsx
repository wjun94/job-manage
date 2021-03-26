import React from 'react'
import { Table, Button, Badge } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { CompanySelectNode } from '@/app/interface'
import moment from 'moment'

export interface P {
    list: CompanySelectNode[] | any
    pagination: TablePaginationConfig | any
    onNodeClick: Function
    onOptions: Function
    onContact: Function
}

export interface Node {
    companyId: string
    name: string
    updateAt: string
    status: number
    views: number
}

export default function Index(props: P) {
    const { pagination, list, onOptions, onContact } = props
    const columns = [
        {
            key: 'name',
            title: '客户信息',
            dataIndex: 'name',
            render: (txt: string, record: any) => <Button onClick={() => props.onNodeClick(record)} type="link">{txt}</Button>
        },
        {
            key: 'prov',
            title: '城市',
            dataIndex: 'prov',
            render: (prov) => <span>{prov || '-'}</span>
        },
        {
            key: 'manage',
            title: '业务员',
            dataIndex: 'manage',
            render: (manage) => <span>{manage?.name || '-'}</span>
        },
        {
            key: 'serviceCount',
            title: '合作次数',
            dataIndex: 'serviceCount',
        },
        {
            key: 'recordCount',
            title: '联系次数',
            dataIndex: 'recordCount',
        },
        {
            key: 'reserveAt',
            title: '预约时间',
            dataIndex: 'reserveAt',
            render: (reserveAt) => <span>{moment(reserveAt).calendar()}</span>,
        },
        {
            key: 'createAt',
            title: '入库时间',
            dataIndex: 'createAt',
            render: (createAt) => <span>{moment(createAt).format('LL') || '-'}</span>
        }, {
            key: 'addAt',
            title: '剩余脱库',
            dataIndex: 'addAt',
            render: (_, record) => <span>{record.addAt ? window.$utils.distanceTime(record.addAt, 1, 'year') + '天' : '-'}</span>,
        },
        {
            key: 'status',
            title: '服务状态',
            dataIndex: 'status',
            render: (txt: number, record) => {
                let status = 0
                let title = '未合作'
                if (txt === 3) {
                    status = 4
                    title = '体验到期'
                    if (window.$utils.distanceTime(record.experienceAt, record.day) > 0) {
                        title = '体验中'
                        status = 3
                    }
                } else if (txt === 1) {
                    title = '合作到期'
                    status = 2
                    if (window.$utils.distanceTime(record.effectAt, record.month, 'month') > 0) {
                        title = '合作中'
                        status = 1
                    }
                }
                return <Badge color={status === 0 ? '#108ee9' : (status === 1 ? '#009688' : (status === 2 ? '#f5222d' : status === 3 ? 'gold' : 'volcano'))} text={title}></Badge>
            }
        },
        {
            key: '',
            title: '操作选项',
            width: 180,
            dataIndex: '',
            render: (_: any, record: CompanySelectNode) => <>
                <Button onClick={() => onOptions(record)} type="link">{record.manage && record.manage?.name ? '踢出' : '加入'}</Button>
                <Button onClick={() => onContact(record)} type="link">联系人</Button>
            </>,
        },
    ]
    return <div className='recruit-list-table'>
        <Table bordered columns={columns} rowKey="id" pagination={pagination} dataSource={list} />
    </div>
}