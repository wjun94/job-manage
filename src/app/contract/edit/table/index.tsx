import React from 'react'
import { Table, } from 'antd'
import { combinationNameArr, combinationType } from '@/app/data'
import './index.scss'

export default function Index(props) {
    console.log(props)
    const columns = [
        {
            title: '投放位置',
            dataIndex: 'pos',
            width: 80,
            key: 'pos',
            render: (txt) => <span>{combinationType.find(item => item.value === txt)?.label}</span>
        },
        {
            title: '名称',
            dataIndex: 'name',
            width: 80,
            key: 'name',
            render: (txt) => <span>{combinationNameArr.find(item => item.value === txt)?.label}</span>
        },
        {
            title: '投放天数',
            dataIndex: 'month',
            width: 80,
            key: 'month',
            render: (txt) => <span>{txt}个月</span>
        },
    ];
    return <Table className='contract-edit-table' pagination={false} rowKey="month" dataSource={props.list} columns={columns} />;
}