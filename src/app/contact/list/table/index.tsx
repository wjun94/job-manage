import React from 'react'
import { Table, Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { Node } from '../../type'

export interface P {
    list: Node[]
    pagination: TablePaginationConfig
    onOptions: Function
    onNodeClick: Function
}

export default function Index(props: P) {
    const { pagination, list } = props
    const columns = [
        {
            key: 'name',
            title: '称呼',
            dataIndex: 'name',
        },
        {
            key: 'sex',
            title: '性别',
            dataIndex: 'sex',
            render: (sex: boolean) => <span>{sex ? '男' : '女'}</span>
        },
        {
            key: 'pos',
            title: '职务',
            dataIndex: 'pos',
        },
        {
            key: 'phone',
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            key: 'fixedNum',
            title: '固定电话',
            dataIndex: 'fixedNum',
        },
        {
            key: 'qq',
            title: 'QQ',
            dataIndex: 'qq',
        },
        {
            key: 'wechart',
            title: '微信',
            dataIndex: 'wechart',
        },
        {
            key: 'mark',
            title: '备注',
            dataIndex: 'mark',
        },
        {
            key: '',
            title: '操作选项',
            dataIndex: '',
            render: (_: any, record: Node) => <>
                <Button onClick={() => props.onNodeClick(record)} type="link">编辑</Button>
                {list.length <= 1 && <Button onClick={() => props.onOptions(record)} danger type="link">删除</Button>}
            </>,
        },
    ]
    return <div className='recruit-list-table'>
        <Table bordered columns={columns} rowKey="id" pagination={pagination} dataSource={list} />
    </div>
}