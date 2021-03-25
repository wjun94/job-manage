import React from 'react'
import { Table, Modal } from 'antd'
import './index.scss'

export default function Index(props) {
    const { list, isModalVisible, onCancel } = props
    const columns = [
        {
            key: 'name',
            title: '称呼',
            dataIndex: 'name',
        },
        {
            key: 'sex',
            title: '性别',
            dataIndex: 'sex',
            render: (sex: boolean) => <span>{sex ? '男' : '女'}</span>
        },
        {
            key: 'pos',
            title: '职务',
            dataIndex: 'pos',
            render: (txt: string) => <span>{txt || '-'}</span>
        },
        {
            key: 'phone',
            title: '手机号',
            dataIndex: 'phone',
            render: (txt: string) => <span>{txt || '-'}</span>
        },
        {
            key: 'fixedNum',
            title: '固定电话',
            dataIndex: 'fixedNum',
            render: (txt: string) => <span>{txt || '-'}</span>
        },
        {
            key: 'qq',
            title: 'QQ',
            dataIndex: 'qq',
            render: (txt: string) => <span>{txt || '-'}</span>
        },
        {
            key: 'wechart',
            title: '微信',
            dataIndex: 'wechart',
            render: (txt: string) => <span>{txt || '-'}</span>
        },
        {
            key: 'mark',
            title: '备注',
            dataIndex: 'mark',
            render: (txt: string) => <span>{txt || '-'}</span>
        },
    ]
    return <Modal width={680} className='contact-table' footer={null} visible={isModalVisible} onCancel={onCancel}>
        <Table bordered columns={columns} rowKey="id" dataSource={list} />
    </Modal>
}