import { TablePaginationConfig } from 'antd/lib/table/interface'

interface CommonType1 {
  total: number
  pageSize: number
  current: number
  paginationProps: false | TablePaginationConfig
  list: []
}
