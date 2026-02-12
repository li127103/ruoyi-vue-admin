/**
 * 数据字典工具类
 */
import { useDictStoreWithOut } from '@/store/modules/dict'
import { ElementPlusInfoType } from '@/types/elementPlus'

const  dictStore = useDictStoreWithOut()

/**
 * 获取 dictType 对应的数据字典数组
 *
 * @param dictType 数据类型
 * @returns {*|Array} 数据字典数组
 */
export  interface  DictDataType {
    dictType:string,
    label:string,
    value:string | number | boolean
    colorType :ElementPlusInfoType | ''
    cssClass:string
}


export interface NumberDictDataType extends DictDataType {
    value: number
}

export interface StringDictDataType extends DictDataType {
    value: string
}

export  const  getDictOptions = (dictType: string) =>{
    return dictStore.getDictByType(dictType) || []
}