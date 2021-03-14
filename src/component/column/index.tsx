import React from 'react'
import { Row, Col } from 'antd'
import './index.scss'

export interface Node {
    label: string
    value: string
}

export interface P {
    list: Node[]
}

export default function Column(props: P) {
    const { list } = props
    return (
        <Row className='row-content' gutter={[14, 0]}>
            {
                list.map((item: Node) => (<Col className='col' key={item.label} span={24 / list.length}>
                    <div className='flex-center'>
                        <div className='top-center'>
                            <p>{item.label}</p>
                            <p className='value'>{item.value}</p>
                        </div>
                    </div>
                </Col>))
            }
        </Row>
    )
}