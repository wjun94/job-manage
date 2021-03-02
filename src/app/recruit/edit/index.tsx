/**
 * 描述信息：职位管理-职位信息-发布新职位
 */

import * as React from 'react';
import './index.scss';
import { FormProps } from '../../types'

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
    return '';
  }
}

export default App;
