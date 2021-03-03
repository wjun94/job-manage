import React from 'react'
import { Modal } from 'antd'
// import { Node } from '../type'

export interface P {
    // list: Node[]
    // pagination: TablePaginationConfig
    // onOptions: Function
    // onNodeClick: Function
}

export default function Index(props: P) {
    return <Modal title="添加通话记录" visible={true} >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
}