import React from 'react'
import { Table, Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/interface'
import { InstituteAllNode } from '@/app/common.d'
import { indArr, scaleArr } from '@/app/data'
import moment from 'moment'
import './index.scss'

export interface P {
  list: InstituteAllNode[] | any
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
      width: 200,
      dataIndex: 'name',
      render: (txt: string, record: InstituteAllNode) => (
        <>
          <Button onClick={() => props.onNodeClick(record)} type="link">
            {txt}
          </Button>
          <p className="flex">
            <span className={record.ind ? 'after' : ''}>
              {record.prov}-{record.city}
            </span>
            <span>{indArr.find((item) => item.value === record.ind)?.label}</span>
          </p>
          <p>{scaleArr.find((item) => item.value === record.scale)?.label}</p>
        </>
      ),
    },
    {
      key: 'l',
      title: '认证',
      dataIndex: 'l',
      render: () => <span>待完善</span>,
    },
    {
      key: 'z',
      title: '时间',
      dataIndex: 'z',
      render: (_, record) => {
        return (
          <>
            <p>注册时间：{moment(record.createAt).format('ll')}</p>
            <p>登录时间：-</p>
            <p>合作开始：{record.effect_at ? moment(record.effect_at).format('ll') : '-'}</p>
            <p>
              合作结束：
              {record.effect_at ? window.$utils.addTime(record.effect_at, record.month, 'M') : '-'}
            </p>
          </>
        )
      },
    },
    {
      key: 'entrant',
      title: '来源',
      dataIndex: 'entrant',
    },
    {
      key: 'manage',
      title: '业务员',
      dataIndex: 'manage',
      render: (manage) => <span>{manage?.name || '-'}</span>,
    },
    {
      key: 'serviceCount',
      title: '合作次数',
      dataIndex: 'serviceCount',
      render: (num) => <span>{num}</span>,
    },
    {
      key: '',
      title: '操作选项',
      width: 320,
      dataIndex: '',
      render: (_, record: InstituteAllNode) => (
        <>
          {[
            { label: '开通服务', value: 0 },
            { label: '进入后台', value: 2 },
            { label: '账号', value: 4 },
            { label: '服务', value: 5 },
            { label: '广告', value: 1 },
            { label: '日志', value: 6 },
          ].map((item) => (
            <Button
              className={`btn-${item.value}`}
              key={'l-' + item.value}
              onClick={() => onOptions(item.value, record)}
            >
              {item.label}
            </Button>
          ))}
        </>
      ),
    },
  ]
  return (
    <div className="institute-all-list-table">
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
