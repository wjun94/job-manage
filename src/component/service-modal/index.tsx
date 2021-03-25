import React from 'react'
import { Modal, Input, Form } from 'antd';
import { combinationArr } from '@/app/data'
import './index.scss'

export default function Index(props) {
    const { list } = props
    return (
        <Modal title="包含服务" width={640} className="service-modal" onCancel={props.handleCancel} visible={props.isModalVisible}>
            {
                list && list.length ? list.map(item => {
                    console.log(item)
                    const result = item.name ? (combinationArr.find(v => v.value === item.name)?.label || item.name) : '体验中'
                    item.combination = result
                    return (
                        <Form key={item.id} initialValues={item} layout="inline">
                            <Form.Item label="发布地" name="addr">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="广告名称" name="combination">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="急聘数" name="urgent">
                                <Input disabled addonAfter="个" />
                            </Form.Item>
                            <Form.Item label="简历下载数" name="down">
                                <Input disabled addonAfter="份" />
                            </Form.Item>
                            <Form.Item label="在线职位数" name="post">
                                <Input disabled addonAfter="个" />
                            </Form.Item>
                            <Form.Item label="公众号篇数" name="article">
                                <Input disabled addonAfter="个" />
                            </Form.Item>
                        </Form>
                    )
                }) : '暂无服务'
            }
        </Modal>
    )
}