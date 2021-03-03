/**
 * 描述信息：职位管理-单位资料
 */

import * as React from 'react';
import './index.scss';
import { scaleArr, indArr, typeArr } from '../../data'
import contactPng from '@/assets/images/contact.png'
import editPng from '@/assets/images/edit.png'
import { connect } from 'react-redux'
import { setData } from '@/store/company/desc/action'
import contractPng from '@/assets/images/contract1.png'
import { RouteComponentProps } from 'react-router'
import moment from 'moment';

export interface Node {
  name: string
  ind: string
  scale: string
  addr: string
  web: string
  desc: string
  prov: string
  city: string
  area: string
}

export interface FormNode extends Node {
  address: any
}

export interface P extends RouteComponentProps {
  data: any
  setData: (node: any) => void
}

@(connect((state: any) => {
  return ({ ...state.companyDescReducer })
}, (dispatch) => ({
  setData(data: {}) {
    dispatch(setData(data))
  },
})) as any)
class App extends React.Component<P, {}> {

  async componentDidMount() {
    if (!this.props.data) {
      const data = await window.$api.getCompanyInfo()
      this.props.setData(data)
    }
  }

  /**
   * @todo 点击底部
   * @param index 索引
   */
  onFooter = (index: number) => {
    switch (index) {
      case 0:
        this.props.history.push('/company/edit')
        break
      case 1:
        break
      case 2:
        break
    }
  }

  render() {
    const { data } = this.props
    if (!data) return '';
    const { type, companyId, name, prov, city, area, desc, scale, ind, amount, createAt } = data
    console.log(area)
    return (
      <div className='app-container info-page'>
        <h2><span>ID：{companyId}</span><span>{name}</span></h2>
        <p className='c-info'>
          <span className='after'>{typeArr[type]}</span>
          <span className='after'>{`${prov}-${city}${area ? ('-' + area) : ''}`}</span>
          <span className='after'>投资金额：{`${amount ? amount + '万' : '未知'}`}</span>
          <span className='after'>行业：{indArr[ind - 1] || '-'}</span>
          <span className='after'>人数：{scaleArr[scale - 1] || '-'}</span>
          <span>创办时间：{createAt ? moment(createAt).format('YYYY') + '年' : '-'}</span>
        </p>
        <p className='desc'>{desc || '暂无描述'}</p>
        <footer>
          {
            [{ label: '修改信息', icon: editPng }, { label: '联系人', icon: contractPng }, { label: '合同', icon: contactPng }].map((item, i) => (
              <p className='after' onClick={() => this.onFooter(i)} key={item.icon}>
                <img alt='logo' src={item.icon} />
                <span>{item.label}</span>
              </p>
            ))
          }
        </footer>
      </div>
    );
  }
}

export default App;