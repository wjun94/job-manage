import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { setCurrent, setList, setPageSize, init, setPagination, setPaginationProps } from '@/store/recruit/list/action'
import Table, { Node } from './table'
import './index.scss'

export interface P extends RouteComponentProps {
    pageSize: number
    current: number
    setPagination: Function
    setPageSize: Function
    init: Function
    setList: Function
    setPaginationProps: Function
    setCurrent: Function
    paginationProps: any,
    list: Node[]
}

@(connect((state: any) => {
    return ({ ...state.recruitListReducer })
}, (dispatch) => ({
    setList(list: []) {
        dispatch(setList(list))
    },
    setPagination(obj: {}) {
        dispatch(setPagination(obj))
    },
    setPaginationProps(obj: {}) {
        dispatch(setPaginationProps(obj))
    },
    setCurrent(current: number) {
        dispatch(setCurrent(current))
    },
    setPageSize(pageSize: number) {
        dispatch(setPageSize(pageSize))
    },
    init() {
        dispatch(init())
    }
})) as any)
export default class Home extends React.Component<P, any> {

    async componentDidMount() {
        this.getData()
    }

    /**
     * @todo 获取列表数据
     */
    getData = async () => {
        const { current, pageSize } = this.props
        const { data, total } = await window.$api.companyList({ current: current, pageSize: pageSize })
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
        this.props.setPaginationProps(paginationProps)
        this.props.setList(data)
    }

    changePageSize = async (pageSize: number, current: number) => {
        await this.props.setPageSize(pageSize)
        await this.props.setCurrent(current)
        this.getData()
    }

    changePage = async (current: number) => {
        await this.props.setCurrent(current)
        this.getData()
    }

    /**
     * @param type 1:编辑 2:是否急聘
     * @param node 节点属性
     * @memberof Table
     */
    onCompany = async (node: Node) => {
        console.log(node)
        const { companyId } = node
        this.props.history.push({ pathname: '/company/desc', search: companyId ? `companyId=${companyId}` : '' })
    }

    render() {
        const { paginationProps, list } = this.props
        console.log(list)
        return <>
            <div className='position-page'>
                <Table onNodeClick={this.onCompany} rowKey="companyId" pagination={paginationProps} list={list} />
            </div>
        </>
    }
}