/**
 * 描述信息：职位管理-职位信息-发布新职位
 */

import * as React from 'react';
import './index.scss';
import { Input, Select, InputNumber, Button, Cascader, Form, Checkbox } from 'antd';
import { sexArr, benfArr, educationArr, expArr, jobTypeArr } from '../../data'
import cityData from './cities'
import { FormProps } from '../../types'

const { Option } = Select;
const { TextArea } = Input;

export interface Node {
  id: string
  name: string // 岗位名称
  prov: string // 省
  city: string // 市
  area: string // 区
  sex: number // 性别 1:不限 2:男 3:女
  nat: number // 工作性质 1:全职 2:兼职
  ugt: number // 急聘
  rcrt: number // 招聘人数
  losal: number // 最低薪资
  hisal: number // 最高薪资
  educ: string // 学历
  exp: number // 工作经验
  desc: string // 职位描述
  benf: string[] | string | any // 福利待遇
  cont: string // 联系人
  phone: string // 电话号码
  email: string // 邮箱
  job: string // 工作
  ind: string // 行业
}

export interface FormNode extends Node {
  address: any // 地址
  types: any // 岗位类型
}

class App extends React.Component<FormProps, { data: FormNode | {}, edit: boolean }> {
  private initForm: any
  state = {
    data: {},
    edit: false
  }
  async componentDidMount() {
    var id = window.$utils.getHashQuery('id')
    if (id) {
      // 获取url参数
      const data = await window.$api.recruit({ id })
      const { prov, city, area, type, job } = data
      data.address = [prov, city, area]
      data.types = [type, job]
      data.benf = data.benf && data.benf.split(',')
      this.initForm.setFieldsValue(data)
      this.setState({
        data,
        edit: !!id
      })
    }
  }

  /** 提交 */
  handleSubmit = (values: FormNode) => {
    const [prov, city, area] = values.address
    const [type, job] = values.types
    const body = { ...values, prov, city, area, type, job }
    body.benf = values.benf ? values.benf.join(",") : ''
    const { edit } = this.state
    if (!edit) {
      window.$api.createRecruit(body).then(() => {
        this.props.history.push('/recruit/list')
      })
    } else {
      const { id } = this.state.data as any;
      window.$api.updateRecruit({ ...body, id }).then(() => {
        this.props.history.push('/recruit/list')
      })
    }
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
    };
    const { data, edit } = this.state
    return (
      !edit || (edit && data.hasOwnProperty("id")) ? <Form className='position-add-page animate app-container' ref={(el) => this.initForm = el} onFinish={this.handleSubmit} {...formItemLayout}>
        <Form.Item label="职位名称" name='name' rules={[{ required: true, message: '请输入职位名称' }]} >
          <Input
            placeholder="请输入职位名称"
          />
        </Form.Item>
        <Form.Item label="职位类型" name='types' rules={[{ required: true, message: '请选择择职位类型' }]}>
          <Cascader options={jobTypeArr} placeholder="请选择择职位类型" />
        </Form.Item>
        <Form.Item label="工作城市" name='address' rules={[{ required: true, message: '请选择工作地点' }]}>
          <Cascader options={cityData} placeholder="请选择工作地点" />
        </Form.Item>
        <Form.Item label="详细地址" name='addr' >
          <Input placeholder="请输入详细地址" />
        </Form.Item>
        <Form.Item label="性别" name='sex'>
          <Select allowClear placeholder="请选择性别">
            {
              sexArr.map((item, i) => (
                <Option key={'sex-' + i} value={i + 1}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item label="工作性质" name='nat' rules={[{ required: true, message: '请选择择工作性质' }]} >
          <Select allowClear placeholder="请选择择工作性质">
            <Option value={1}>全职</Option>
            <Option value={2}>兼职</Option>
          </Select>
        </Form.Item>
        <Form.Item label="招聘人数" name='rcrt' rules={[{ required: true, message: '请填写招聘人数' }]}>
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item className='sal' label="薪资">
          <Form.Item style={{ display: 'inline-block' }} name='losal' rules={[{ required: true, message: '请填写' }]}>
            <InputNumber min={800} style={{ width: 100, textAlign: 'center' }} placeholder="800" />
          </Form.Item>
          <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
          <Form.Item name='hisal' rules={[{ required: true, message: '请填写' }]} style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
            <InputNumber min={1200} style={{ width: 100, textAlign: 'center' }} placeholder="1200" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="学历要求" name='educ' rules={[{ required: true, message: '请选择学历' }]}>
          <Select allowClear placeholder="请选择学历">
            {
              educationArr.map((item: string, i) => <Option key={'ed-' + i} value={i + 1}>{item}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item label="工作经验" name='exp' rules={[{ required: true, message: '请选择工作经验' }]}>
          <Select allowClear placeholder="请选择工作经验">
            {
              expArr.map((item: string, i) => <Option key={'exo-' + i} value={i + 1}>{item}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item label="职位描述" name='desc' rules={[{ required: true, message: '请填写职位描述' }]}>
          <TextArea rows={4} placeholder="请填写职位描述" />
        </Form.Item>
        <Form.Item label="福利待遇" name='benf'>
          <Select allowClear mode="tags" placeholder="请选择择福利待遇">
            {
              benfArr.map((item, i) => (
                <Option key={"z-" + i} value={item}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item label="设为急聘" name="ugt" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 9, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form> : ''
    );
  }
}

export default App;
