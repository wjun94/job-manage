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
      title: '客户信息',
      dataIndex: 'name',
      render: (txt: string, record: any) => (
        <Button onClick={() => props.onNodeClick(record)} type="link">
          {txt}
        </Button>
      ),
    },
    {
      title: '通话状态',
      dataIndex: 'record',
      render: (record) =>
        record && record.status ? (
          <Badge
            color={record.status === 1 ? '#009688' : '#f5222d'}
            text={
              <span>
                {record ? recordArr.find((item) => item.value === record.status)?.label : '-'}
              </span>
            }
          />
        ) : (
          '-'
        ),
    },
    {
      title: '联系次数',
      dataIndex: 'recordCount',
      render: (recordCount) => <span>{recordCount}</span>,
    },
    {
      title: '联系时间',
      dataIndex: 'time',
      render: (_, data) => (
        <span>
          {data.record && data.record.createAt ? moment(data.record.createAt).calendar() : '-'}
        </span>
      ),
    },
    {
      title: '入库时间',
      dataIndex: 'addAt',
      render: (addAt) => <span>{addAt ? moment(addAt).calendar() : '-'}</span>,
    },
    {
      title: '业务员',
      dataIndex: 'manage',
      render: (manage) => <span>{manage ? manage?.name : '-'}</span>,
    },
    {
      title: '操作选项',
      width: 180,
      dataIndex: '',
      render: (_: any, record: CompanySelectNode) => (
        <>
          <Button onClick={() => onOptions(record)} type="link">
            {record.manage && record.manage?.name ? '踢出' : '加入'}
          </Button>
          <Button onClick={() => onContact(record)} type="link">
            联系人
          </Button>
        </>
      ),
    },
  ]
  return (
    <div className="recruit-list-table">
      <Table
        bordered
        columns={columns}
        rowKey="companyId"
        pagination={pagination}
        dataSource={list}
      />
    </div>
  )
}
