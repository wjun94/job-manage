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
  const { pagination, list, onContact } = props
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
      title: '合作状态',
      dataIndex: 'status',
      render: (txt: number, record) => {
        let status = 0
        let title = '未合作'
        if (txt === 3) {
          status = 4
          title = '体验到期'
          if (window.$utils.distanceTime(record.experienceAt, record.day) > 0) {
            title = '体验中'
            status = 3
          }
        } else if (txt === 1) {
          title = '合作到期'
          status = 2
          if (window.$utils.distanceTime(record.effectAt, record.month, 'month') > 0) {
            title = '合作中'
            status = 1
          }
        }
        return (
          <Badge
            color={
              status === 0
                ? '#108ee9'
                : status === 1
                ? '#009688'
                : status === 2
                ? '#f5222d'
                : status === 3
                ? 'gold'
                : 'volcano'
            }
            text={title}
          ></Badge>
        )
      },
    },
    {
      title: '操作选项',
      width: 180,
      dataIndex: '',
      render: (_: any, record: CompanySelectNode) => (
        <>
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
