<template>
  <div class="yx-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col v-bind="colLayout" v-for="item in formItems" :key="item.label">
          <el-form-item
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
              >
              </el-input>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select style="width: 100%">
                <el-option
                  v-for="option in item.options"
                  :key="option.title"
                  :value="option.value"
                >
                  {{ option.title }}
                </el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker v-bind="item.otherOptions"></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { IFormItem } from '../types'
export default defineComponent({
  props: {
    // 表单项
    formItems: {
      type: Array as PropType<IFormItem[]>, // vue3 和 ts 的支持 使得可以用as PropType<>限制props参数的类型
      default: () => [] // vue3+ts联合时，props的对象类型、数组类型默认值要写成箭头函数否则会有问题
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 表单控件样式
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    // 表单自适应行内个数，当有多个属性时写成对象，可以直接用v-bind="obj"统一设置
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // 一行4个
        lg: 8, // 一行3个
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.yx-form {
  padding-top: 22px;
}
</style>
