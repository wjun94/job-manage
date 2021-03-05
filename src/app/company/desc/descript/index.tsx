import React from 'react'
import { Button, Badge, Radio } from 'antd';
import { recordArr } from '@/app/data'
import { ContactNode } from '../type'
import './index.scss'

export interface P {
    onNodeClick: Function
    list: ContactNode[]
    onRadio: Function
}

export default function Index(props: P) {
    const { onNodeClick, list, onRadio } = props
    const result = [{ label: '全部', value: 0 }, ...recordArr]
    return (
        <>
            <div className='ant-descriptions-small descript ant-descriptions-bordered'>
                <div className='ant-descriptions-header'>
                    <div className='ant-descriptions-title'>通话记录列表</div>
                    <Radio.Group defaultValue={0} onChange={(e) => onRadio(e)} buttonStyle="outline">
                        {
                            result.map(v => <Radio.Button key={v.label} value={v.value}>{v.label}</Radio.Button>)
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
                                <table className='main'>
                                    <tbody>
                                        <tr className='left-content'>
                                            <td width="220" rowSpan={3}>
                                                <div>
                                                    {item.name}<br />
                                                    联系电话:{item.phone || '-'}<br />
                                                    固定电话:{item.fixedNum || '-'}<br />
                                                    邮箱:{item.email || '-'}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>创建时间</th>
                                            <td><Badge color={item.status === 1 ? 'green' : '#f5222d'} text={item.createAt} /></td>

                                            <th>预约时间</th>
                                            <td>{item.ceserveAt || '-'}</td>

                                            <th>联系人</th>
                                            <td>{item.manageName}</td>
                                        </tr>
                                        <tr className='ant-descriptions-row content'>
                                            <td colSpan={6}>{item.content}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </React.Fragment>
                        ))
                    }
                </div> : <p className='no-data'>暂无数据</p>
            }
        </>
    )
}

