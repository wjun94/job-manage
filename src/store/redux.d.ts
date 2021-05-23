import { TablePaginationConfig } from 'antd/lib/table/interface'

interface CommonType1<T> {
  total: number
  pageSize: number
  current: number
  paginationProps: false | TablePaginationConfig
  list: T[]
  params: Object
}
