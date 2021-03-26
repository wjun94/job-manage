/**
 * 描述信息：职位管理-单位资料
 */

import * as React from 'react';
import './index.scss';
import { scaleArr, indArr, typeArr } from '../../data'
import contactPng from '@/assets/images/contact.png'
import editPng from '@/assets/images/edit.png'
import { connect } from 'react-redux'
import { setData, setList } from '@/store/company/desc/action'
import contractPng from '@/assets/images/contract1.png'
import { RouteComponentProps } from 'react-router'
import { Row, Col } from 'antd';
import { CompInfoNode, ContactNode } from './type'
import Modal from './modal'
import Descript from './descript'
import moment from 'moment';

export interface P extends RouteComponentProps {
  data: CompInfoNode | any
  list: ContactNode[]
  setData: (node: CompInfoNode) => void
  setList: (node: ContactNode[]) => void
}

@(connect((state: any) => {
  return ({ ...state.companyDescReducer })
}, (dispatch) => ({
  setData(data: CompInfoNode) {
    dispatch(setData(data))
  },
  setList(list: CompInfoNode[]) {
    dispatch(setList(list))
  },
})) as any)
class App extends React.Component<P, { visible: boolean, total: number }> {

  state = {
    visible: false,
    total: 0,
  }

  private id = ''

  async componentDidMount() {
    const id = window.$utils.getHashQuery('companyId')
    this.id = id
    const data = await window.$api.companyDesc({ companyId: id })
    this.props.setData(data)
    this.getRecordList()
  }

  /**
   * @patam status 通话状态
   */
  getRecordList = async (status: number = 0) => {
    const record = await window.$api.recordList({ companyId: this.id, status })
    await this.props.setList(record.data)
    this.setState({
      total: record.total
    })
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

  handleOk = async (values: ContactNode) => {
    const { contact = [] } = this.props.data
    values.reserveAt = values.reserveAt ? moment(values.reserveAt).format('YYYY-MM-DD HH:mm') : ''
    const result = contact.find(item => values.manageId === item.id)
    const obj = { ...result, ...values, manageId: window.$user.id, manageName: window.$user.name }
    await window.$api.createRecord(obj)
    let { list = [] } = this.props
    list = [obj, ...list]
    this.setState({
      total: this.state.total + 1
    })
    await this.props.setList(list)
    this.handleCancel()
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  /**
   * @param e
   * @member Descript
   */
  onRadio = (e) => {
    this.getRecordList(e.target.value)
  }

  render() {
    const { data, list } = this.props
    const { visible, total } = this.state
    if (!data) return '';
    const { type, companyId, name, prov, city, area, desc, scale, ind, amount, foundAt, entrant, createAt, updateAt, contact, sales, manage } = data
    const indObj = indArr.find(v => ind === v.value)
    const scaleObj = scaleArr.find(v => scale === v.value)
    const typeObj = typeArr.find(v => type === v.value)
    const reserveAt = list.find(item => item.reserveAt)
    const recordAt = list.find(item => item.reserveAt ? window.$utils.diffTime(item.reserveAt) <= 0 : true)?.createAt
    const infoArr = [
      { label: '录入人：', value: entrant },
      { label: '上次联系时间：', value: recordAt ? moment(recordAt).calendar() : '-' },
      { label: '录入时间：', value: moment(createAt).calendar() },
      { label: '所属人：', value: manage?.name || '-' },
      { label: '下次洽谈时间：', value: reserveAt && window.$utils.diffTime(reserveAt.reserveAt) > 0 ? moment(reserveAt.reserveAt).calendar() : '-' },
      { label: '更新时间：', value: updateAt ? moment(updateAt).calendar() : '-' },
      { label: '售后：', value: sales?.name },
      { label: '共洽谈数：', value: total },
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
          <Descript onRadio={this.onRadio} onNodeClick={this.onAddRecord} list={list} />
        </div>
        <Modal list={contact} handleOk={this.handleOk} handleCancel={() => this.handleCancel()} visible={visible} />
      </>
    );
  }
}

export default App;
