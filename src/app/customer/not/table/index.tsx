import React from 'react'
import { Table, Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { CompanySelectNode } from '@/app/interface'

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
            key: 'status',
            title: '服务状态',
            dataIndex: 'status',
            render: (txt: number) => <span>待完善</span>
        },
        {
            key: 'manage',
            title: '业务员',
            dataIndex: 'manage',
            render: (manage) => <span>{manage ? manage?.name : '-'}</span>
        },
        {
            key: 'a',
            title: '合作次数',
            dataIndex: 'a',
            render: () => <span>待完善</span>,
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
        <Table bordered columns={columns} rowKey="companyId" pagination={pagination} dataSource={list} />
    </div>
}