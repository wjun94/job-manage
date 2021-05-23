export interface MngNode {
  id: string
  name: string
}

export interface CompanySelectNode {
  companyId: string
  salesId: string
  createAt: string
  entrant: string
  name: string
  prov: string
  status: number
  sales: {
    // 售后
    name: string
  }
  manage: {
    // 业务员
    name: string
  }
  record: {
    // 通话状态
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

export interface InstituteNotNode {
  addAt: string
  city: string
  companyId: string
  createAt: string
  day: number
  entrant: string
  ind: number
  scale: number
  effectAt: string
  manage: {
    name: string
  }
  name: string
  prov: string
}

export interface InstituteAllNode {
  companyId: string
  combination?: string
  name: string
  addr?: string
  status: boolean
  createAt: string
  effect_at: string
  month: number
  addAt: string
  prov: string
  city: string
  type: number
  ind: number
  sales: {
    name: string
  }
  manage: {
    name: string
  }
  service: ServiceNode
  recordCount: number
  scale: number
  entrant: string
}

export interface ServiceNode {
  id?: string
  companyId: string
  createAt: string
  addr: string
  month: number
  status: boolean
  type: number
  name: string
  down: number
  post: number
  urgent: number
  article: number
}

export interface CombinationNode {
  down: number // 简历下载数
  post: number // 在线职位数
  urgent: number // 急聘数
  pos: number // 投放位置 'PC‘，'小程序'
  name: number // '县级', '市级', '省级', '首页'
  article: number // 公众号文章篇数
}

export interface ContactNode {
  id: string
  companyId: string
  name: string
  createAt: string
  mark: number // 备注
  pos: string // 职位
  sex: boolean // 性别
  qq: string
  wechart: string
  email: string
  phone: string // 手机号码
  fixedNum: string // 固定电话
}
