import React from 'react'
import { Table, Button, Badge } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { CompanySelectNode } from '@/app/common.d'
import { recordArr } from '@/app/data'

export interface P {
  list: CompanySelectNode[] | any
  pagination?: false | TablePaginationConfig
  onNodeClick: Function
  onOptions: Function
  onContact: Function
  loading: boolean
}

export interface Node {
  companyId: string
  name: string
  updateAt: string
  status: number
  views: number
}

export default function Index(props: P) {
  const { pagination, list, onOptions, onContact, loading } = props
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
      title: '业务员',
      dataIndex: 'manage',
      render: (manage) => <span>{manage?.name || '-'}</span>,
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
    },
    {
      title: '合作次数',
      dataIndex: 'serviceCount',
    },
    {
      title: '合作状态',
      dataIndex: 'service',
      render: (service: { status: number }) => {
        let status = 0
        let title = '未合作'
        if (service) {
          switch (service.status) {
            case 1:
              status = 1
              title = '合作中'
              break
            case 2:
              status = 2
              title = '已到期'
              break
            case 3:
              status = 3
              title = '体验中'
              break
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
      title: '剩余脱库',
      dataIndex: 'expiredAt',
      render: (txt: number, { cStatus }) =>
        cStatus === 2 && txt > 0 ? (txt ? window.$utils.ms2day(txt) : '-') : '-',
    },
    {
      title: '剩余可加入',
      dataIndex: 'expiredAt',
      render: (txt: number, { cStatus }) =>
        cStatus === 3 && txt > 0 ? (txt ? window.$utils.ms2day(txt) : '-') : '-',
    },
    {
      title: '操作选项',
      width: 180,
      dataIndex: '',
      render: (_: any, record: CompanySelectNode) => (
        <>
          <Button
            disabled={
              !!(
                record.cStatus === 3 ||
                (record.manage && record.manage.id !== window.$user.id && record.cStatus === 2)
              )
            }
            onClick={() => onOptions(record)}
            type="link"
          >
            {record.cStatus === 2 && record.manage && record.manage.id === window.$user.id
              ? '踢出'
              : '加入'}
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
        loading={loading}
        bordered
        columns={columns}
        rowKey="companyId"
        pagination={pagination}
        dataSource={list}
      />
    </div>
  )
}
