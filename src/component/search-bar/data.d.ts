export interface ColumnsNode {
  title?: string
  name: string
  valueType: string
  valueEnum?: { label: string; value: number }[]
}

export interface P {
  columns?: ColumnsNode[]
  onFinish: (values: any) => void
}
