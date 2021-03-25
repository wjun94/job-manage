import React from 'react'
import { Table, Button, Badge } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { CompanySelectNode } from '@/app/interface'
import { recordArr } from '@/app/data'
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
            render: (manage) => <span>{manage ? manage?.name : '-'}</span>
        },
        {
            key: 'sales',
            title: '售后',
            dataIndex: 'sales',
            render: (sales) => <span>{sales?.name || '-'}</span>
        },
        {
            key: 'a',
            title: '合作次数',
            dataIndex: 'a',
            render: () => <span>待完善</span>,
        },
        {
            key: 'addAt',
            title: '入库时间',
            dataIndex: 'addAt',
            render: (addAt) => <span>{moment(addAt).calendar()}</span>,
        },
        {
            key: 'time',
            title: '联系时间',
            dataIndex: 'time',
            render: (_, data) => <span>{data.record && data.record.createAt ? moment(data.record.createAt).calendar() : '-'}</span>,
        },
        {
            key: 'recordCount',
            title: '联系次数',
            dataIndex: 'recordCount',
            render: (recordCount) => <span>{recordCount}</span>,
        },
        {
            key: 'addAt',
            title: '剩余脱库',
            dataIndex: 'addAt',
            render: (txt) => <span>{txt ? window.$utils.distanceTime(txt) + '天' : '-'}</span>,
        },
        {
            key: '',
            title: '操作选项',
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