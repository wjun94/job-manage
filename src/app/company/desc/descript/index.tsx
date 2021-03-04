import React from 'react'
import { Button, Badge, Radio } from 'antd';
import { recordArr } from '@/app/data'
import { ContactNode } from '../type'
import './index.scss'

export interface P {
    onNodeClick: Function
    list: ContactNode[]
}

export default function Index(props: P) {
    const { onNodeClick, list } = props
    return (
        <>
            <div className='ant-descriptions-small descript ant-descriptions-bordered'>
                <div className='ant-descriptions-header'>
                    <div className='ant-descriptions-title'>通话记录列表</div>
                    <Radio.Group buttonStyle="outline">
                        {
                            recordArr.map(v => <Radio.Button key={v.label} value={v.value}>{v.label}</Radio.Button>)
                        }
                    </Radio.Group>
                    <Button onClick={() => onNodeClick()} type="primary">添加通话记录</Button>
                </div>
            </div>
            {
                list && list.length ? <div className='ant-descriptions-view '>
                    {
                        list.map(item => (
                            <React.Fragment key={item.id}>
                                <div className='ant-descriptions-small descript-content ant-descriptions-bordered'>
                                    <table>
                                        <tbody>
                                            <tr className='ant-descriptions-row'>
                                                <td className='ant-descriptions-item-content' rowSpan={3}>
                                                    {item.name}<br />
                                                    联系电话:{item.phone || '-'}<br />
                                                    固定电话:{'-'}<br />
                                                    邮箱:{item.email || '-'}
                                                </td>
                                            </tr>
                                            <tr className='ant-descriptions-row'>
                                                <th className='ant-descriptions-item-label'>创建时间</th>
                                                <td className='ant-descriptions-item-content'><Badge color="green" text={item.createAt} /></td>

                                                <th className='ant-descriptions-item-label'>预约时间</th>
                                                <td className='ant-descriptions-item-content'>{item.ceserveAt || '-'}</td>

                                                <th className='ant-descriptions-item-label'>联系人</th>
                                                <td className='ant-descriptions-item-content'>{item.manageName}</td>
                                            </tr>
                                            <tr className='ant-descriptions-row'>
                                                <td className='ant-descriptions-item-content border' colSpan={6}>{item.content}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div> : <p className='no-data'>暂无数据</p>
            }
        </>
    )
}

