import React, { useRef } from 'react';
import { Drawer, Form, Input, Button } from 'antd';

export default function ExperienceDrawer(props) {
    const { visible, onClose, data, onFinish } = props
    data.companyName = data.name
    data.post = 1
    data.urgent = 0
    data.article = 0
    data.down = 0
    data.day = 7
    let formRef: any = useRef()

    function close() {
        formRef.resetFields()
        onClose()
    }

    function onSubmit() {
        formRef.validateFields().then(async values => {
            await onFinish({ ...values, companyId: data.companyId, addr: data.prov })
            close()
        })
    }
    return (
        <Drawer
            title="开通体验"
            placement="right"
            closable={false}
            width={600}
            onClose={onClose}
            visible={visible}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={close} style={{ marginRight: 8 }}>取消</Button>
                    <Button onClick={onSubmit} type="primary">提交</Button>
                </div>
            }
        >
            <Form initialValues={data} ref={el => formRef = el} name="basic" layout="vertical" className='contract-edit animate'>
                <Form.Item label="甲方名称" name="companyName">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="所在城市" name="prov">
                    <Input disabled />
                </Form.Item>
                <div className='box left-line'>
                    <h2>包含服务</h2>
                    <div className='flex'>
                        <Form.Item label="单位发布地" name="city">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="在线职位" rules={[{ required: true, message: '请输入在线职位' }]} name="post">
                            <Input />
                        </Form.Item>

                        <Form.Item label="急聘个数" name="urgent">
                            <Input />
                        </Form.Item>

                        <Form.Item label="简历下载" name="down">
                            <Input />
                        </Form.Item>

                        <Form.Item label="公众号推文" name="article">
                            <Input />
                        </Form.Item>

                        <Form.Item label="服务时间" rules={[{ required: true, message: '请输入服务时间' }]} name="day">
                            <Input />
                        </Form.Item>
                    </div>
                </div>
            </Form >
        </Drawer>
    );
};