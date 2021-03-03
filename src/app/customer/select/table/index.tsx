import React from 'react'
import { Table, Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'

export interface P {
    list: Node[]
    pagination: TablePaginationConfig
    onNodeClick: Function
}

export interface Node {
    companyId: string
    name: string
    updateAt: string
    status: number
    views: number
}

export default function Index(props: P) {
    const { pagination, list } = props
    const columns = [
        {
            key: 'name',
            title: '客户信息',
            dataIndex: 'name',
            render: (txt: string, record: Node) => <Button onClick={() => props.onNodeClick(record)} type="link">{txt}</Button>
        },
        {
            key: 'createAt',
            title: '手机状态',
            dataIndex: 'createAt',
            render: (text: string) => <span>待完善</span>
        },
        {
            key: 'status',
            title: '服务状态',
            dataIndex: 'status',
            render: (txt: number) => <span>待完善</span>
        },
        {
            key: 'ugt',
            title: '业务员',
            dataIndex: 'ugt',
            render: (ugt: boolean) => <span>待完善</span>
        },
        {
            key: 'views',
            title: '售后',
            dataIndex: 'views',
            render: (ugt: boolean) => <span>待完善</span>
        },
        {
            key: 'a',
            title: '合作次数',
            dataIndex: 'a',
            render: () => <span>待完善</span>,
        },
        {
            key: 'b',
            title: '洽谈次数',
            dataIndex: 'b',
            render: () => <span>待完善</span>,
        },
        {
            key: '',
            title: '操作选项',
            dataIndex: '',
            render: (_: any, record: Node) => <>
                <Button onClick={() => props.onNodeClick(1, record)} type="link">加入</Button>
            </>,
        },
    ]
    return <div className='recruit-list-table'>
        <Table bordered columns={columns} rowKey="companyId" pagination={pagination} dataSource={list} />
    </div>
}