import React, { useRef } from 'react'
import { Modal, Form, Input, Select, DatePicker } from 'antd'
// import { Node } from '../type'

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
}

export default function Index(props: P) {
    const { visible, handleOk, handleCancel } = props
    let formEl: any = useRef('form');
    function onSubmit() {
        formEl.validateFields().then(res => {
            console.log(res)
            handleOk()
        }).catch(err => {
            console.log(err)
        })
    }

    return <Modal title="添加通话记录" onOk={() => onSubmit()} onCancel={() => handleCancel()} visible={visible} >
        <Form ref={(el) => formEl = el}>
            <Form.Item name='type' rules={[{ required: true, message: '请选择单位联系人' }]}>
                <Select allowClear placeholder="请选择单位联系人">
                    {
                        <Option value={1}>1</Option>
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="content"
            >
                <TextArea rows={2} placeholder="请输入聊天內容" />
            </Form.Item>
            <Form.Item
                name="ceserveAt"
            >
                <DatePicker placeholder="请选择预约时间" />
            </Form.Item>
        </Form>
    </Modal>
}