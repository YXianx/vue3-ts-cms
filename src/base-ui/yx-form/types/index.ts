type IInputType = 'input' | 'password' | 'select' | 'datepicker'
// 表单项
export interface IFormItem {
  type: IInputType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对一些特殊的属性
  otherOptions?: any
}

// 表单所有配置
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: object
  colLayout?: object
}
