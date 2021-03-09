import React from 'react'
import { Table, Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { CompanySelectNode } from '@/app/interface'

export interface P {
    list: CompanySelectNode[] | any
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
            key: 'service',
            title: '售后',
            dataIndex: 'service',
            render: (service) => <span>{service.name || '-'}</span>
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
            dataIndex: '',
            render: (_: any, record: CompanySelectNode) => <>
                <Button onClick={() => onOptions(record)} type="link">{record.manageId ? '踢出' : '加入'}</Button>
            </>,
        },
    ]
    return <div className='recruit-list-table'>
        <Table bordered columns={columns} rowKey="companyId" pagination={pagination} dataSource={list} />
    </div>
}