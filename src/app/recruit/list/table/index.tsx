import React from 'react'
import { Table, Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import moment from 'moment';

export interface P {
    rowSelection: any
    list: Node[]
    pagination: TablePaginationConfig
    onNodeClick: Function
}

export interface Node {
    id: string
    name: string
    updateAt: string
    status: number
    views: number
}

export default function Index(props: any) {
    const { pagination, list, rowSelection } = props
    const columns = [
        {
            key: 'name',
            title: '岗位名称',
            dataIndex: 'name'
        },
        {
            key: 'updateAt',
            title: '更新时间',
            dataIndex: 'updateAt',
            render: (text: string) => <span>{moment(text).format('LL')}</span>
        },
        {
            key: 'status',
            title: '岗位状态',
            dataIndex: 'status',
            render: (txt: number) => <span>{txt === 1 ? '未发布' : (txt === 2 ? '已发布' : (txt === 3 ? '暂停' : '到期'))}</span>
        },
        {
            key: 'ugt',
            title: '急聘',
            dataIndex: 'ugt',
            render: (ugt: boolean) => <span>{ugt ? '是' : '否'}</span>
        },
        {
            key: 'views',
            title: '访问量',
            dataIndex: 'views'
        },
        {
            key: '',
            title: '应聘情况',
            dataIndex: '',
            render: () => <Button type="link">查看</Button>,
        },
        {
            key: '',
            title: '操作选项',
            dataIndex: '',
            render: (_: any, record: any) => <>
                <Button onClick={() => props.onNodeClick(1, record)} type="link">编辑</Button>
                <Button onClick={() => props.onNodeClick(2, record)} type="link">复制</Button>
            </>,
        },
    ]
    return <div className='recruit-list-table'>
        <Table bordered columns={columns} rowSelection={rowSelection} rowKey="id" pagination={pagination} dataSource={list} />
    </div>
}