import React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { setCurrent, setList, setPageSize, init, setPagination, setPaginationProps } from '@/store/recruit/list/action'
import { Tabs, Button, message, Modal } from 'antd';
import Column from '@/component/column'
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

const { TabPane } = Tabs;

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
    state = {
        title: ''
    }
    private selectedRows: Node[] = []
    // 复选框勾选
    private rowSelection: any = {
        onChange: (_: string, selectedRows: Node[]) => {
            this.selectedRows = selectedRows.filter(v => v)
        },
    };

    async componentDidMount() {
        this.getData()
    }

    /**
     * @todo 获取列表数据
     */
    getData = async () => {
        const { current, pageSize } = this.props
        const { data, total } = await window.$api.recruitList({ current: current, pageSize: pageSize })
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

    /** 单击tab */
    handleModeChange = (key: string) => {
        console.log(key)
    }

    /** 单击编辑 */
    onRecruitEdit = (id: string = '') => {
        this.props.history.push({ pathname: '/recruit/edit', search: id ? `id=${id}` : '' })
    }

    /**
     * @todo 单击按钮(批量操作)
     * @param title
     */
    onBtn = (title: string) => {
        if (this.selectedRows.length === 0) {
            message.error("请选择岗位")
            return
        }
        this.setState({
            title
        })
    }

    /**
   * @todo 弹窗点击确定
   */
    handleOk = () => {
        const { title } = this.state
        const arr = this.selectedRows.map((v: Node) => v.id)
        const { list } = this.props
        switch (title) {
            case '删除职位':
                window.$api.deleteRecruits({ ids: arr }).then(() => {
                    this.selectedRows = []
                    this.getData()
                })
                break;
            case '清空访问量':
                window.$api.updateRecruits({ ids: arr, views: 0 }, '清空成功').then(() => {
                    list.forEach((v: any) => {
                        if (arr.includes(v.id)) {
                            v.views = 0
                        }
                    })
                    this.props.setList(list)
                })
                break;
            case '设为急聘':
                window.$api.updateRecruits({ ids: arr, ugt: true }, '设置成功').then(() => {
                    list.forEach((v: any) => {
                        if (arr.includes(v.id)) {
                            v.ugt = true
                        }
                    })
                    this.props.setList(list)
                })
                break;
            case '取消急聘':
                window.$api.updateRecruits({ ids: arr, ugt: false }, '设置成功').then(() => {
                    list.forEach((v: any) => {
                        if (arr.includes(v.id)) {
                            v.ugt = false
                        }
                    })
                    this.setState({ list })
                })
                break;
        }
        this.handleCancel()
    }

    /**
     * @todo 取消弹窗
     */
    handleCancel = () => {
        this.setState({
            title: ''
        })
    }

    /**
     * @param type 1:编辑 2:是否急聘
     * @param node 节点属性
     * @memberof Table
     */
    onOptions = async (type: number, node: Node) => {
        switch (type) {
            case 1:
                // 编辑
                this.onRecruitEdit(node.id)
                break
            case 2:
                // 复制
                await window.$api.copyRecruit({ id: node.id })
                this.getData()
                break
            case 3:
                // 急聘
                break
        }
    }

    render() {
        const { paginationProps, list } = this.props
        const { title } = this.state
        return <>
            <Column list={[{ label: '已布数', value: '30' }, { label: '剩余发布', value: '30' }, { label: '已急招', value: '30' }, { label: '剩余急招', value: '30' }]} />
            <div className='position-page'>
                <Modal
                    title={title}
                    visible={!!title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>确定{title}?</p>
                </Modal>
                <header>
                    <Tabs defaultActiveKey="1" onChange={this.handleModeChange}>
                        {
                            ['全部岗位', '未发布', '已发布', '暂停', '到期'].map((v, i) => {
                                return <TabPane tab={v} key={'tab-' + i} />
                            })
                        }
                    </Tabs>
                    <Button onClick={() => this.onRecruitEdit()} type="primary">发布新岗位</Button>
                    <Button onClick={this.onBtn.bind(this, '设为急聘')} type="primary">设为急聘</Button>
                    <Button onClick={this.onBtn.bind(this, '取消急聘')} type="primary" ghost>取消急聘</Button>
                    <Button onClick={this.onBtn.bind(this, '清空访问量')} danger>清空访问量</Button>
                    <Button type="primary" danger onClick={this.onBtn.bind(this, '删除职位')}>删除职位</Button>
                </header>
                <Table onNodeClick={this.onOptions} rowSelection={this.rowSelection} rowKey="id" pagination={paginationProps} list={list} />
            </div>
        </>
    }
}