import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { setCurrent, setList, setPageSize, init, setPagination, setPaginationProps } from '@/store/customer/pub/action'
import SearchBar from './search-bar'
import { CompanySelectNode } from '@/app/interface'
import Table from './table'
import ContactTableModal from '@/component/contact-table-modal'
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
    list: CompanySelectNode[]
}

@(connect((state: any) => {
    return ({ ...state.customerPubReducer })
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

    state = {
        contactList: [],
        isModalVisible: false
    }

    async componentDidMount() {
        this.getData()
    }

    /**
     * @todo 获取列表数据
     */
    getData = async () => {
        const { current, pageSize } = this.props
        const { data, total } = await window.$api.customerPubList({ current: current, pageSize: pageSize })
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
        // this.getData()
    }

    changePage = async (current: number) => {
        await this.props.setCurrent(current)
        this.getData()
    }

    /**
     * @todo 点击加入或脱离
     * @param node
     * @memberof table
     */
    onOptions = (node: CompanySelectNode) => {
        const isOut = node.manage && node.manage.name
        if (isOut) {
            // 踢出
            window.$api.outCompany({
                companyId: node.companyId,
            })
        } else {
            // 加入
            window.$api.addCompany({
                companyId: node.companyId,
            })
        }
        node.manage = {
            name: isOut ? '' : window.$user.name
        }
        this.props.setList(this.props.list)
    }

    /**
     * @param type 1:编辑 2:是否急聘
     * @param node 节点属性
     * @memberof Table
     */
    onCompany = async (node: CompanySelectNode) => {
        const { companyId } = node
        this.props.history.push({ pathname: '/company/desc', search: companyId ? `companyId=${companyId}` : '' })
    }

    /**
     * @todo 点击联系人
     * @param node 节点属性
     * @memberof Table
     */
    onContact = async (node) => {
        const result = await window.$api.contactList({ companyId: node.companyId })
        this.setState({
            contactList: result.data,
            isModalVisible: true
        })
    }

    render() {
        const { paginationProps, list } = this.props
        const { contactList, isModalVisible } = this.state
        return <>
            <SearchBar />
            <div className='customer-me app-container'>
                <Table onOptions={this.onOptions}
                    onContact={this.onContact}
                    onNodeClick={this.onCompany} pagination={paginationProps} list={list} />
            </div>
            <ContactTableModal onCancel={() => this.setState({ isModalVisible: false })} isModalVisible={isModalVisible} list={contactList} />
        </>
    }
}