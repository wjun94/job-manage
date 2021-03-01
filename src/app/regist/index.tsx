/**
 * 描述信息：注册
 */

import * as React from 'react';
import './index.scss';
import { FormProps } from '../types'
import options from './city'
import {
    Form,
    Input,
    Select,
    Button,
    Cascader,
} from 'antd';
import { scaleArr, typeArr, indArr } from '../data'

const { Option } = Select;

export interface Node {
    name: string    // 单位名
    ind: string     // 所属行业
    prov: string    // 省
    city: string    // 城市
    area: string     // 区
    addr: string    // 详细地址
    scale: number   // 单位规模
    cont: string    // 联系人
}

export interface FromNode extends Node {
    address: any
    phone: string
}

class App extends React.Component<FormProps, {}> {

    handleSubmit = (values: FromNode) => {
        values.scale = Number(values.scale)
        const [prov, city, area] = values.address
        values.prov = prov
        values.city = city
        values.area = area
        window.$api.createCompany({ phone: values.phone, cInfo: values }).then(() => {
            this.props.history.push("/login")
        })
    };

    /** 校验手机号码 */
    checkPhone(rule: any, value: string, callback: (params?: string) => void) {
        console.log((/^1(3|4|5|7|8)\d{9}$/.test(value)))
        console.log(value)
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
            throw new Error('您输入的手机号码有误')
            // callback("您输入的手机号码有误");
        } else {
            callback();
        }
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form className='rigist-form' {...formItemLayout} onFinish={this.handleSubmit}>
                <Form.Item
                    label="单位名"
                    name="name"
                    rules={[{ required: true, message: '请您输入单位名' }]}
                >
                    <Input placeholder="请您输入单位名" />
                </Form.Item>

                <Form.Item label="单位类型" name='type' rules={[{ required: true, message: '请选择单位类型' }]}>
                    <Select allowClear placeholder="请选择单位类型">
                        {
                            typeArr.map((v, i) => <Option key={'rcomph-' + v} value={i + 1}>{v}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="单位行业" name='ind' >
                    <Select allowClear placeholder="请选择单位行业">
                        {
                            indArr.map((v, i) => <Option key={'rcompz-' + v} value={i + 1}>{v}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="单位规模" name='scale'>
                    <Select allowClear placeholder="请选择单位规模">
                        {
                            scaleArr.map((v, i) => <Option key={'rcomp-' + v} value={i + 1}>{v}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="所在城市"
                    name="address"
                    rules={[{ required: true, message: '请选择所在城市' }]}
                >
                    <Cascader placeholder="请选择所在城市" options={options} />
                </Form.Item>

                <Form.Item
                    label="详细地址"
                    name="addr"
                >
                    <Input placeholder="请输入详细地址" />
                </Form.Item>

                <Form.Item
                    label="联系手机"
                    name="phone"
                    rules={[{ required: true, message: '请您输入联系手机' }, { validator: this.checkPhone }]}
                >
                    <Input placeholder="请您输入联系手机" />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交注册信息</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default App;