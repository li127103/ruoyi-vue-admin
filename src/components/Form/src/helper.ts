import {FormSchema} from "@/types/form";
import {PlaceholderModel} from "@/components/Form/src/types";
import {ColProps} from '@/types/components'

/**
 *
 * @param schema 对应组件数据
 * @returns 返回提示信息对象
 * @description 用于自动设置placeholder
 */
export const setTextPlaceholder = (schema: FormSchema): PlaceholderModel => {
    const {t} = useI18n()
    const textMap = ['Input', 'Autocomplete', 'InputNumber', 'InputPassword']
    const selectMap = ['Select', 'SelectV2', 'TimePicker', 'DatePicker', 'TimeSelect', 'TimeSelect']
    if (textMap.includes(schema?.component as string)) {
        return {
            placeholder: t('common.inputText') + schema.label
        }
    }
    if (selectMap.includes((schema?.component as string))) {
        // 一些范围选择器
        const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
        if (
            twoTextMap.includes(
                (schema?.componentProps?.type || schema?.componentProps?.isRange) as string
            )
        ) {
            return {
                startPlaceholder: t('common.startTimeText'),
                endPlaceholder: t('common.endTimeText'),
                rangeSeparator: '-'
            }
        } else {
            return {
                placeholder: t('common.selectText') + schema.label
            }
        }
    }
    return {}
}


/**
 *
 * @param col 内置栅格
 * @returns 返回栅格属性
 * @description 合并传入进来的栅格属性
 */
export const setGridProp = (col: ColProps = {}): ColProps => {
    return {
        // 如果有span，代表用户优先级更高，所以不需要默认栅格
        ...(col.span
            ? {}
            : {
                xs: 24,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12
            }),
        ...col
    }
}

/**
 *
 * @param item 传入的组件属性
 * @returns 默认添加 clearable 属性
 */
export const setComponentProps = (item: FormSchema): Recordable => {
    const notNeedClearable = ['ColorPicker']
    const componentProps: Recordable = notNeedClearable.includes(item.component as string)
        ? {...item.componentProps}
        : {
            clearable: true,
            ...item.componentProps
        }
    // 需要删除额外的属性
    delete componentProps?.slots
    return componentProps
}