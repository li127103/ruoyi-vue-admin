import type  {CSSProperties} from  'vue'
import {ColProps ,ComponentProps ,ComponentName} from "@/types/components";
import type { AxiosPromise } from 'axios'
export  type  FormSetPropsType = {
    field: string
    path: string
    value: any
}


export type  FormValueType = string | number | string[] | number[] | boolean | undefined | null

export type FormItemProps = {
    labelWidth? : string | number
    required?: boolean
    rules?: Recordable
    error?: string
    showMessage?: boolean
    inlineMessage?: boolean
    style?: CSSProperties
}



export  type  FormSchema = {
    // 唯一值
    field: string
    // 标题
    label?: string
    // 提示
    labelMessage?: string

    // col 组件属性
    colProps? : ColProps

    // 表单组件属性，slots对应的是表单组件的插槽，规则：${field}-xxx，具体可以查看element-plus文档
    componentProps?: { slots?:Recordable} & ComponentProps

    // 初始值
    value?: FormValueType

    //远程加载下拉项
    api?: <T = any>() => AxiosPromise<T>
}