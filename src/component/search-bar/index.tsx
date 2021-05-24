import React, { useState, useRef, useEffect } from 'react'
import { Form, Input, Button, Select, Row, Col } from 'antd'
import { typeArr, statusArr } from '@/app/data'
import options from '@/app/data/cities'
import './index.scss'

export interface ColumnsNode {
  title?: string
  name: string
  valueType: string
  valueEnum?: { label: string; value: number | string }[]
}

export interface P {
  columns?: ColumnsNode[]
  onFinish: (values: any) => void
  init?: Object // 初始值
}

const { Option } = Select

export const initColumns: ColumnsNode[] = [
  {
    name: 'name',
    title: '单位名称',
    valueType: 'input',
  },
  {
    name: 'prov',
    title: '所在城市',
    valueType: 'prov',
  },
  {
    name: 'city',
    valueType: 'city',
  },
  {
    name: 'companyId',
    title: '单位编号',
    valueType: 'input',
  },
  {
    name: 'type',
    title: '单位类型',
    valueType: 'select',
    valueEnum: typeArr,
  },
  {
    name: 'status',
    title: '合作状态',
    valueType: 'select',
    valueEnum: statusArr,
  },
]

export default function Index(props: P) {
  const { columns = initColumns, onFinish, init = null } = props
  useEffect(() => {
    init && formEl.setFieldsValue(init)
  }, [init])
  let formEl: any = useRef(null)
  const [prov, setProv] = useState<any>('')
  const citys = options.find((v) => v.value === prov)?.children
  return (
    <Row>
      <Form
        ref={(el) => (formEl = el)}
        className="search-bar"
        onFinish={(values) => onFinish(values)}
        layout="inline"
      >
        {columns.map((item) => {
          return (
            <Col key={item.name}>
              <Form.Item name={item.name} label={item.title}>
                {(() => {
                  switch (item.valueType) {
                    case 'input':
                      // 输入框
                      return <Input placeholder="请输入" />
                    case 'prov':
                      // 城市选择
                      return (
                        <Select allowClear onChange={(e) => setProv(e)} placeholder="请选择所在省">
                          {options.map((item) => (
                            <Option key={item.code} value={item.value}>
                              {item.value}
                            </Option>
                          ))}
                        </Select>
                      )
                    case 'city':
                      return (
                        <Select allowClear placeholder="请选择所在市">
                          {citys &&
                            citys.map(
                              (item) =>
                                item && (
                                  <Option key={item.code} value={item.value}>
                                    {item.value}
                                  </Option>
                                )
                            )}
                        </Select>
                      )
                    case 'select':
                      return (
                        <Select allowClear placeholder="请选择">
                          {item.valueEnum &&
                            item.valueEnum.map((item) => (
                              <Option key={'rcomph-' + item.value} value={item.value}>
                                {item.label}
                              </Option>
                            ))}
                        </Select>
                      )
                  }
                })()}
              </Form.Item>
            </Col>
          )
        })}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            onClick={() => {
              onFinish({})
              formEl.resetFields()
            }}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
    </Row>
  )
}
