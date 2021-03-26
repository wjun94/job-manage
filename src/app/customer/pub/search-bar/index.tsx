import React, { useState, useRef } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { typeArr, sortArr, statusArr } from '@/app/data'
import options from '@/app/data/cities'
import './index.scss'

const { Option } = Select

export default function Index(props) {
    let formEl: any = useRef()
    const [prov, setProv] = useState<any>('')
    function onFinish(values) {
        console.log(values)
    }
    const citys = options.find(v => v.value === prov)?.children
    return (<Form
        ref={el => formEl = el}
        className="search-bar"
        onFinish={onFinish}
        layout="inline"
    >
        <Form.Item name="name" label="单位名称">
            <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
            label="所在城市"
            name="prov"
        >
            <Select allowClear onChange={(e) => setProv(e)} placeholder="请选择所在省">
                {
                    options.map(item => <Option key={item.code} value={item.value}>{item.value}</Option>)
                }
            </Select>
        </Form.Item>

        <Form.Item
            name="city"
        >
            <Select allowClear placeholder="请选择所在市">
                {
                    citys && citys.map(item => item && <Option key={item.code} value={item.value}>{item.value}</Option>)
                }
            </Select>
        </Form.Item>

        <Form.Item name="id" label="单位ID">
            <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item label="单位类型" name='type'>
            <Select allowClear placeholder="请选择单位类型">
                {
                    typeArr.map((item) => <Option key={'rcomph-' + item.value} value={item.value}>{item.label}</Option>)
                }
            </Select>
        </Form.Item>

        <Form.Item label="排序方式" name='sort'>
            <Select allowClear placeholder="请选择单位类型">
                {
                    sortArr.map((item) => <Option key={'rco-' + item.value} value={item.value}>{item.label}</Option>)
                }
            </Select>
        </Form.Item>

        <Form.Item label="合作状态" name='status'>
            <Select allowClear placeholder="请选择合作状态">
                {
                    statusArr.map((item) => <Option key={'rcz-' + item.value} value={item.value}>{item.label}</Option>)
                }
            </Select>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button onClick={() => formEl.resetFields()}>重置</Button>
        </Form.Item>
    </Form>
    );
}