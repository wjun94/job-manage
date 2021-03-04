import React, { useRef } from 'react'
import { Modal, Form, Input, Select, DatePicker, Radio } from 'antd'
import { recordArr } from '@/app/data'
import { RecordNode } from '../type'

const { TextArea } = Input
const { Option } = Select

export interface P {
    // list: Node[]
    // pagination: TablePaginationConfig
    // onOptions: Function
    // onNodeClick: Function
    visible: boolean
    handleOk: Function
    handleCancel: Function
    list: RecordNode[]
}

export default function Index(props: P) {
    const { visible, handleOk, handleCancel, list } = props
    let formEl: any = useRef('form');
    function onSubmit() {
        formEl.validateFields().then(res => {
            handleOk(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return <Modal title="添加通话记录" onOk={() => onSubmit()} onCancel={() => handleCancel()} visible={visible} >
        <Form ref={(el) => formEl = el} initialValues={{ status: 1 }}>
            <Form.Item name='manageId' rules={[{ required: true, message: '请选择单位联系人' }]}>
                <Select allowClear placeholder="请选择单位联系人">
                    {
                        list.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: '请输入通话内容' }]}
                name="content"
            >
                <TextArea rows={2} placeholder="请输入通话內容" />
            </Form.Item>
            <Form.Item
                name="ceserveAt"
            >
                <DatePicker placeholder="预约通话时间" />
            </Form.Item>
            <Form.Item name='status' rules={[{ required: true, message: '请选择单位联系人' }]}>
                <Radio.Group buttonStyle="solid">
                    {
                        recordArr.map(v => <Radio.Button key={v.label} value={v.value}>{v.label}</Radio.Button>)
                    }
                </Radio.Group>
            </Form.Item>
        </Form>
    </Modal>
}