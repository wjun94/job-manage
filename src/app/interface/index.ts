export interface CompanySelectNode {
    companyId: string
    manageId: string
    salesId: string
    createAt: string
    entrant: string
    name: string
    prov: string
    status: number
    sales: {  // 售后
        name: string
    }
    manage: {   // 业务员
        name: string
    }
    record: {   // 通话状态
        status: number
    }
    recordCount: number // 联系次数
}

export interface AdvtgNode {
    id: string
    createAt: string
    companyId: string
    name: number
    type: number
    month: number
    mark?: string
}

export interface InstituteAllNode {
    companyId: string,
    name: string,
    addr?: string
    status: boolean
    createAt: string,
    addAt: string,
    prov: string,
    city: string,
    type: number,
    ind: number,
    sales: {
        name: string
    },
    manage: {
        name: string
    },
    recordCount: number,
    scale: number,
    entrant: string
}

export interface combinationNode {
    down: number,   // 简历下载数
    post: number,   // 在线职位数
    urgent: number, // 急聘数
    type: number,   // // 'PC‘，'小程序'
    name: number,   // '县级', '市级', '省级', '首页'
    article: number,    // 公众号文章篇数
}