import { CombinationNode } from '@/app/interface'

export interface Node {
    label: string
    value: number
}

const setArr = (arr): Node[] => {
    return arr.map((item, i) => ({
        label: item,
        value: i + 1
    }))
}

export const sortArr = [
    { label: '登录时间', value: 'login_at' },
    { label: '开通时间', value: 'c_at' },
    { label: '注册时间', value: 'b_at' },
    { label: '到期时间', value: 'a_at' }
]

export const paymentTimeArr = setArr(['实时到账', '一周内', '两周内', '三周内', '一个月内'])

export const combinationNameArr = setArr(['县级', '市级', '省级', '首页'])

export const combinationType = setArr(['PC', 'PC、小程序'])

const one: CombinationNode = {
    down: 50,
    post: 10,
    urgent: 0,
    article: 0,
    // 广告
    name: 1,
    pos: 1,
}

const two: CombinationNode = {
    down: 60,
    post: 20,
    urgent: 1,
    article: 0,
    // 广告
    name: 2,
    pos: 2,
}

const three: CombinationNode = {
    down: 70,
    post: 30,
    urgent: 2,
    article: 1,
    // 广告
    name: 4,
    pos: 2,
}

const price = 100

const getPrice = (multiple) => {
    return Number((price * multiple / (price * multiple > 1000 ? 100 : 10)).toFixed(0) + (price * multiple > 1000 ? '00' : '0'))
}

export const combinationArr = [
    {
        label: `月${price}元套餐`,
        value: 'a1',
        month: 1,
        price: Number(price),
        children: one,
    },
    {
        label: `月${getPrice(1.2)}元套餐`,
        value: 'a2',
        month: 1,
        price: getPrice(1.2),
        children: two,
    },
    {
        label: `月${getPrice(1.4)}元套餐`,
        value: 'a3',
        month: 1,
        price: getPrice(1.4),
        children: three,
    },
    {
        label: `季${getPrice(3 * 0.9)}元套餐`,
        value: 'b1',
        month: 3,
        price: getPrice(3 * 0.9),
        children: one,
    },
    {
        label: `季${getPrice(3 * 1.2 * 0.9)}元套餐`,
        value: 'b2',
        month: 3,
        price: getPrice(3 * 1.2 * 0.9),
        children: two,
    },
    {
        label: `季${getPrice(3 * 1.4 * 0.9)}元套餐`,
        value: 'b3',
        month: 3,
        price: getPrice(3 * 1.4 * 0.9),
        children: three,
    },
    {
        label: `半年${getPrice(6 * 0.8)}元套餐`,
        value: 'c1',
        month: 6,
        price: getPrice(6 * 0.8),
        children: one,
    },
    {
        label: `半年${getPrice(6 * 1.2 * 0.8)}元套餐`,
        value: 'c2',
        month: 6,
        price: getPrice(6 * 1.2 * 0.8),
        children: two,
    },
    {
        label: `半年${getPrice(6 * 1.4 * 0.8)}元套餐`,
        value: 'c3',
        month: 6,
        price: getPrice(6 * 1.4 * 0.8),
        children: three,
    },
    {
        label: `一年${getPrice(12 * 0.7)}元套餐`,
        value: 'd1',
        month: 12,
        price: getPrice(12 * 0.7),
        children: one,
    },
    {
        label: `一年${getPrice(12 * 1.2 * 0.7)}元套餐`,
        value: 'd2',
        month: 12,
        price: getPrice(12 * 1.2 * 0.7),
        children: two,
    },
    {
        label: `一年${getPrice(12 * 1.4 * 0.7)}元套餐`,
        value: 'd3',
        month: 12,
        price: getPrice(12 * 1.4 * 0.7),
        children: three,
    },
]

export const statusArr: Node[] = setArr(['已合作', '未合作', '体验中', '已到期', '已终止'])

export const contractArr: Node[] = setArr(['标准合同', '非标准合同', '自定义合同'])


export const scaleArr: Node[] = setArr(['小于20人', '20-50人', '50-100人', '100-500人', '500-1000人', '1000人以上', '5000人以上'])

export const typeArr: Node[] = setArr(['合资', '独资', '国有', '私营', '全民所有制', '集体所有制', '股份制', '有限责任'])

export const indArr: Node[] = setArr(['住宿和餐饮', '金融', '房地产', '互联网',
    '教育', '体育', '娱乐', '传统行业', '批发和零售', '交通运输', '采矿业', '制造业', '农业', '文化', '旅游'])


export const benfArr: string[] = ['五险一金', '假日福利', '双休', '单休', '单双休']

export const recordArr = [{ label: "正常", value: 1 }, { label: "没联系上", value: 2 }, { label: "空号", value: 3 }, { label: "错号", value: 4 }]

export const jobTypeArr: any = [
    {
        label: '互联网',
        child: [
            ['Java开发', 'UI设计师', 'Web前端', 'PHP', 'Python', 'Android', '美工', '深度学习', '算法工程师', 'Hadoop', 'Node.js', '数据开发', '数据分析师', '数据架构', '人工智能区块链'],
            ['电气工程师', '电子工程师', 'PLC', '测试工程师', '设备工程师', '硬件工程师', '结构工程师', '工艺工程师'],
            ['产品经理', '新媒体运营', '运营专员', '淘宝运营', '天猫运营', '产品助理', '产品运营', '淘宝客服', '游戏运营编辑']
        ]
    },
    {
        label: '金融',
        child: [
            ['投资经理', '风控', '催收', '银行柜员', '银行销售', '信审', '信用卡', '贷款', '金融产品', '汽车金融', '金融研究'],
            ['证券', '交易员', '投资经理', '期货', '操盘手', '基金', '股票', '投资顾问', '信托', '典当', '担保', '信贷', '权证'],
            ['财产保险', '保险内勤', '理赔', '精算师', '保险销售', '理财顾问', '查勘定损', '车险']
        ]
    },
    {
        label: '房地产/建筑',
        child: [
            ['土建工程师', '施工员', '资料员', '预算员', '造价员', '一级建造师', '室内设计师', '土建', '暖通', '项目经理', '电气工程师', '建筑设计'],
            ['置业顾问', '房地产销售', '房地产招商', '开发报建', '房地产策划', '房地产开发', '房地产评估', '地产经纪'],
            ['物业', '物业经理', '保安', '客服', '物业管理', '物业客服', '电工', '物业主管', '物业维修', '消防', '客服主管', '前台', '文员', '物业项目经理']
        ]
    },
    {
        label: '贸易/零售/物流',
        child: [
            ['采购', '外贸', '外贸业务员', '外贸跟单', '采购助理', '外贸日语', '采购专员', '外贸英语', '外贸助理', '采购经理', '买手'],
            ['导购', '营业员', '店长', '收银员', '销售', '导购员', '督导', '客服', '新零售产品', '理货员'],
            ['供应链', '物流专员', '物流经理', '物流运营', '物流跟单', '物流管理', '物仓调度', '货运代理', '报检报关', '仓储管理']
        ]
    },
    {
        label: '教育/传媒/广告',
        child: [
            ['教师', '英语老师', '课程顾问', '英语', '教务', '美术老师', '幼教', '小学教师', '班主任', '助教'],
            ['编导', '摄影师', '编剧', '摄影', '后期制作', '制片', '记者', '剪辑', '化妆师'],
            ['广告创意', '美术指导', '策划经理', '文案', '广告制作', '媒介', '广告审核', '平面设计', '网页设计', '插画师', '工业设计', '视觉设计']
        ]
    },
    {
        label: '服务业',
        child: [
            ['美容师', '美容学徒', '美容导师', '纹绣师', '医美', '美甲师', '健身教练'],
            ['导游', '旅游顾问', '旅游计调', '签证', '旅游销售', '票务', '服务员', '收银员', '店长', '酒店前台', '酒店管理', '餐饮管理', '收银'],
            ['保安', '保洁', '月嫂', '保姆', '家政', '婚礼策划', '育婴师', '催乳师', '司机']
        ]
    },
    {
        label: '市场/销售',
        child: [
            ['市场营销', '市场策划', '市场顾问', '市场总监', '市场推广', 'SEO', '品牌经理', 'SEM', '商务渠道', '网络营销', '活动策划', 'APP推广'],
            ['销售专员', '销售经理', '客户代表', '销售代表', 'BD经理', '大客户销售', '渠道销售', '销售助理', '电话销售', '销售顾问', '商品经理', '广告销售', '网络营销', '营销主管', '销售总监', '商务总监', '城市经理']
        ]
    },
    {
        label: '人事/财务/行政',
        child: [
            ['人力资源主管', '招聘', 'HRBP', '人力资源专员', '培训', '薪资福利', '绩效考核', '人力资源经理', '人力资源总监', '员工关系', '组织发展'],
            ['会计', '出纳', '财务顾问', '结算', '税务', '风控', '财务经理', '财务主管', '财务分析', '法务专员', '律师', '法律顾问', '法务主管'],
            ['行政专员', '前台', '行政主管', '经理助理', '后勤', '司机', '行政经理', '行政总监']
        ]
    },
].map(item => {
    const [one = [], two = [], three = []] = item.child
    const result = [...one, ...two, ...three]
    return {
        label: item.label,
        value: item.label,
        children: result.map(child => ({ label: child, value: child }))
    }
})