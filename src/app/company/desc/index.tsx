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
import { Row, Col, Button } from 'antd';
import moment from 'moment';
import { Node } from './type'
import Modal from './modal'
import Descript from './descript'

export interface P extends RouteComponentProps {
  data: Node | any
  setData: (node: any) => void
}

@(connect((state: any) => {
  return ({ ...state.companyDescReducer })
}, (dispatch) => ({
  setData(data: {}) {
    dispatch(setData(data))
  },
})) as any)
class App extends React.Component<P, { visible: boolean }> {

  state = {
    visible: false
  }

  private id = ''

  async componentDidMount() {
    const id = window.$utils.getHashQuery('companyId')
    this.id = id
    const data = await window.$api.companyInfo({ id })
    this.props.setData(data)
    const record = await window.$api.recordList({ id })
    console.log(record)
  }

  /**
   * @todo 点击底部
   * @param index 索引
   */
  onFooter = (index: number) => {
    switch (index) {
      case 0:
        this.props.history.push({ pathname: '/company/edit', search: this.id ? `companyId=${this.id}` : '' })
        break
      case 1:
        this.props.history.push({ pathname: '/contact/list', search: this.id ? `companyId=${this.id}` : '' })
        break
      case 2:
        break
    }
  }

  /**
   * @todo 添加通话记录
   */
  onAddRecord = () => {
    this.setState({ visible: true })
  }

  handleOk = (values: any) => {
    const { contact = [] } = this.props.data
    const result = contact.find(item => values.manageId === item.id)
    window.$api.createRecord({ ...result, ...values, manageId: window.$user.id, manageName: window.$user.name })
    this.handleCancel()
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    const { data } = this.props
    const { visible } = this.state
    if (!data) return '';
    const { type, companyId, name, prov, city, area, desc, scale, ind, amount, foundAt, entrant, createAt, updateAt, contact } = data
    const indObj = indArr.find(v => ind === v.value)
    const scaleObj = scaleArr.find(v => scale === v.value)
    const typeObj = typeArr.find(v => type === v.value)
    const infoArr = [
      { label: '录入人：', value: entrant },
      { label: '上次洽谈时间：', value: '-' },
      { label: '录入时间：', value: moment(createAt).format('LL') },
      { label: '所属人：', value: '-' },
      { label: '下次洽谈时间：', value: '-' },
      { label: '更新时间：', value: updateAt ? moment(updateAt).format('LL') : '-' },
      { label: '售后：', value: '-' },
      { label: '共洽谈数：', value: '-' },
    ]
    return (
      <>
        <div className='app-container customer-desc'>
          <h2><span>ID:{companyId}</span><span>{name}</span></h2>
          <p className='c-info'>
            <span className='after'>{typeObj ? typeObj.label : '-'}</span>
            <span className='after'>{`${prov}-${city}${area ? ('-' + area) : ''}`}</span>
            <span className='after'>投资金额：{`${amount ? amount + '万' : '未知'}`}</span>
            <span className='after'>规模：{indObj ? indObj.label : '-'}</span>
            <span className='after'>人数：{scaleObj ? scaleObj.label : '-'}</span>
            <span>创办时间：{foundAt ? moment(foundAt).format('YYYY') + '年' : '-'}</span>
          </p>
          <p className='desc'>{desc || '暂无描述'}</p>
          <footer className='left-center'>
            {
              [{ label: '修改信息', icon: editPng }, { label: '联系人', icon: contractPng }, { label: '合同', icon: contactPng }].map((item, i) => (
                <p className='after flex-center' onClick={() => this.onFooter(i)} key={item.icon}>
                  <img alt='logo' src={item.icon} />
                  <span>{item.label}</span>
                </p>
              ))
            }
          </footer>
        </div>
        <Row className='app-container customer-desc-main'>
          {
            infoArr.map(item => <Col key={item.label} span={8}><span className='label'>{item.label}</span><span>{item.value}</span></Col>)
          }
        </Row>
        <div className='app-container customer-desc-footer'>
          <Button onClick={() => this.onAddRecord()} type="primary">添加通话记录</Button>
          <Descript />
        </div>
        <Modal list={contact} handleOk={this.handleOk} handleCancel={() => this.handleCancel()} visible={visible} />
      </>
    );
  }
}

export default App;
