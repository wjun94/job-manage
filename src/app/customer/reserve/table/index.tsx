import React from 'react'
import { Table, Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { CompanySelectNode } from '@/app/interface'
import moment from 'moment'

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
            key: 'prov',
            title: '城市',
            dataIndex: 'prov',
            render: (prov) => <span>{prov || '-'}</span>
        },
        {
            key: 'status',
            title: '服务状态',
            dataIndex: 'status',
            render: (txt: number) => <span>待完善</span>
        },
        {
            key: 'sales',
            title: '售后',
            dataIndex: 'sales',
            render: (sales) => <span>{sales.name || '-'}</span>
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
            key: 'c',
            title: '剩余脱库',
            dataIndex: 'c',
            render: (_, data) => <span>{data.addAt ? window.$utils.distanceTime(data.addAt) + '天' : '-'}</span>
        },
        {
            key: '',
            title: '操作选项',
            dataIndex: '',
            render: (_: any, record: CompanySelectNode) => <>
                <Button onClick={() => onOptions(record)} type="link">{record.manage && record.manage.name ? '踢出' : '加入'}</Button>
            </>,
        },
    ]
    return <div className='recruit-list-table'>
        <Table bordered columns={columns} rowKey="id" pagination={pagination} dataSource={list} />
    </div>
}