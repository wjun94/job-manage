import React from 'react'
import { Modal, Input } from 'antd';
import './index.scss'

export default function Index(props) {
    const { list } = props
    console.log(list)
    return (
        <Modal title="服务" className="service-modal" onCancel={props.handleCancel} visible={props.isModalVisible}>
            {
                list.map(item => <>
                    <Input addonBefore='职位发布地' value={item.addr} disabled />
                    <Input addonBefore='职位数' addonAfter='个' value={item.post} disabled />
                </>)
            }
        </Modal>
    )
}