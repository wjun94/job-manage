export interface CompanySelectNode {
    companyId: string
    manageId: string
    serviceId: string
    createAt: string
    entrant: string
    name: string
    prov: string
    status: number
    service: {  // 售后
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

export interface InstituteAllNode {
    companyId: string,
    name: string,
    createAt: string,
    addAt: string,
    prov: string,
    city: string,
    type: number,
    ind: number,
    service: {
        name: string
    },
    manage: {
        name: string
    },
    recordCount: number,
    scale: number,
    entrant: string
}