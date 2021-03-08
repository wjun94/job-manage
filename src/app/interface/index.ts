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