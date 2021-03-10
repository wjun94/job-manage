import React from 'react'
import { RouteComponentProps } from 'react-router'
import Table from './table'
import { Node } from '../type'
import { Button } from 'antd';
import './index.scss'

export interface S {
    pageSize: number
    current: number
    list: Node[]
    paginationProps: any
}

export default class Home extends React.Component<RouteComponentProps, S> {

    state = {
        current: 1,
        pageSize: 10,
        list: [],
        paginationProps: {}
    }

    private companyId: string = ''

    async componentDidMount() {
        const companyId = window.$utils.getHashQuery('companyId')
        this.companyId = companyId
        this.getData()
    }

    /**
     * @todo 获取列表数据
     */
    getData = async () => {
        const { current, pageSize } = this.state
        const { data, total } = await window.$api.contactList({ current: current, pageSize: pageSize, companyId: this.companyId })
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: () => `共${total}条`,
            pageSize,
            current,
            total: total,
            onShowSizeChange: (current: number, pageSize: number) => this.changePageSize(pageSize, current),
            onChange: (current: number) => { this.changePage(current) },
        }
        this.setState({
            paginationProps,
            list: data
        })
    }

    changePageSize = async (pageSize: number, current: number) => {
        await this.setState({
            pageSize,
            current
        })
    }

    changePage = async (current: number) => {
        await this.setState({
            current
        })
        this.getData()
    }

    /**
     * @param type 1:编辑 2:是否急聘
     * @param node 节点属性
     * @memberof Table
     */
    onEdit = async (node: Node | any = {}) => {
        const { id } = node
        this.props.history.push({ pathname: '/contact/edit', search: `companyId=${this.companyId}${id ? '&id=' + id : ''}` })
    }

    /**
     * @todo 删除
     * @param node 节点属性
     * @memberof Table
     */
    onOptions = async (node: Node) => { }

    onBack = () => {
        this.props.history.goBack()
    }

    render() {
        const { paginationProps, list } = this.state
        return <>
            <div className='customer-select app-container'>
                <header>
                    <Button onClick={() => this.onEdit()} type="primary">添加</Button>
                    <Button onClick={() => this.onBack()}>返回</Button>
                </header>
                <Table onOptions={this.onOptions} onNodeClick={this.onEdit} pagination={paginationProps} list={list} />
            </div>
        </>
    }
}