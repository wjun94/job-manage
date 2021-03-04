import React from 'react'
// import { Badge } from 'antd';

export default function Index(props: {}) {
    return (
        <div className='ant-descriptions ant-descriptions-bordered'>
            <div className='ant-descriptions-header'>
                <div className='ant-descriptions-title'>标题</div>
            </div>
            <div className='ant-descriptions-view '>
                <table>
                    <tbody>
                        <tr className='ant-descriptions-row'>
                            <td className='ant-descriptions-item-content' rowSpan={3}>
                                张老师<br />
                                联系电话:13588222222<br />
                                固定电话:13588222222<br />
                                邮箱:13588222222
                            </td>
                            <td style={{ display: 'none' }} className='ant-descriptions-item-content' />
                        </tr>
                        <tr className='ant-descriptions-row'>
                            <th className='ant-descriptions-item-label'>创建时间</th>
                            <td className='ant-descriptions-item-content'>2020</td>

                            <th className='ant-descriptions-item-label'>预约时间</th>
                            <td className='ant-descriptions-item-content'>-</td>

                            <th className='ant-descriptions-item-label'>联系人</th>
                            <td className='ant-descriptions-item-content'>小项</td>
                        </tr>
                        <tr className='ant-descriptions-row'>
                            <td className='ant-descriptions-item-content'>通话内容...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


        // <Descriptions
        //     bordered
        //     title="通话记录列表"
        //     size="small"
        //     column={2}
        //     extra={<Button type="primary">Edit</Button>}
        // >
        //     <Descriptions.Item label="" labelStyle={{ display: 'none' }}><span ref={el => spanEl = el}>通话时间11</span></Descriptions.Item>
        //     <Descriptions.Item label="通话记录" span={4}>通话记录...</Descriptions.Item>
        //     <Descriptions.Item label="通话时间">2020</Descriptions.Item>
        //     <Descriptions.Item label="预约时间">2021</Descriptions.Item>
        //     <Descriptions.Item label="联系人">小向</Descriptions.Item>
        //     <Descriptions.Item label="状态">
        //         <Badge status="processing" text="正常" />
        //     </Descriptions.Item>
        // </Descriptions>
    )
}