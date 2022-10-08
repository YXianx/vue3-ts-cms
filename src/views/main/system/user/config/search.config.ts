import { IForm } from '@/base-ui/yx-form/types/index'
// YxForm配置信息 当有多个属性时写成对象，可以直接用v-bind="obj"统一设置
export const searchFormConfig: IForm = {
  formItems: [
    {
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      rules: [],
      placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '喜欢的运动',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ],
      placeholder: '请选择喜欢的运动'
    },
    {
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '110px',
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }
}
