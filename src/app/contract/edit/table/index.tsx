import React from 'react'
import { Table } from 'antd'
import { combinationNameArr, combinationType } from '@/app/data'
import './index.scss'

export default function Index(props) {
  console.log(props)
  const columns = [
    {
      title: '投放位置',
      dataIndex: 'pos',
      width: 80,
      render: (txt) => <span>{combinationType.find((item) => item.value === txt)?.label}</span>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 80,
      render: (txt) => <span>{combinationNameArr.find((item) => item.value === txt)?.label}</span>,
    },
    {
      title: '投放天数',
      dataIndex: 'day',
      width: 80,
      render: (txt) => <span>{txt}天</span>,
    },
  ]
  return (
    <Table
      className="contract-edit-table"
      pagination={false}
      rowKey="day"
      dataSource={props.list}
      columns={columns}
    />
  )
}
