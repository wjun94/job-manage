import React from 'react'
import { Table, Button, Badge } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { CompanySelectNode } from '@/app/interface'
import { recordArr } from '@/app/data'

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
            key: 'record',
            title: '通话状态',
            dataIndex: 'record',
            render: (record) => record && record.status ? <Badge color={record.status === 1 ? '#009688' : '#f5222d'} text={<span>{record ? recordArr.find(item => item.value === record.status)?.label : '-'}</span>} /> : '-'
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
            render: (manage) => <span>{manage.name || '-'}</span>
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
            key: 'recordCount',
            title: '联系次数',
            dataIndex: 'recordCount',
            render: (recordCount) => <span>{recordCount}</span>,
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