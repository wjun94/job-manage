/**
 * 文档作者: wjun94
 * 创建时间：2019年09月22日
 * 修改时间：2019年10月12日
 * 描述信息：类型
 */

export interface Node {
  label: string;
  name: number;
}

export interface Columns {
  title: string
  dataIndex: string
  key: string
  render?: any
}

export interface SelNode {
  label: string;
  value: number;
}

export interface State<T, V> {
  data: T
  list?: V[]
}

export interface RouterProps {
  history: any
}

/** 表单 */
export interface FormProps {
  history?: any,  // 页面跳转
  form: any,
  location?: any // url参数
}

export interface CompProps {
  data: any;      // 数据
  onNodeClick?: () => void;    // 单击事件
}

export interface LeftMenuNode {
  lable: string;
  name: string;
  icon?: any
  children?: LeftMenuNode[];
}

export interface TableNode {
  id: string
  key: string
  title: string    // 职位名称
  updateTime: string // 公司
  status: string // 地址
  price: number   // 薪资
  option: string[]  // 创建时间
}

/** 表单 */
export interface FormProps {
  history?: any,
  form: any
}

export interface Result {
  code: number
  message: string
  data: any
}
