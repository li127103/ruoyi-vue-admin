<script lang="tsx">
import {computed, defineComponent, mergeProps} from 'vue'
import {useDesign} from "@/hooks/web/useDesign";
import {FormSchema, FormSetPropsType} from "@/types/form";
import {ElForm} from "element-plus";
import {FormProps} from './types'
import {propTypes} from "@/utils/propTypes";
import {findIndex} from "@/utils";
import {set} from "lodash-es";

const {getPrefixCls} = useDesign()

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Form",
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    },
    // 是否需要栅格布局
    // update by 芋艿：将 true 改成 false，因为项目更常用这种方式
    isCol: propTypes.bool.def(false),
    //表单数据对象
    model: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    //是否自动设置placeholder
    autoSetPlaceholder: propTypes.bool.def(true),
    // 是否自定义内容
    isCustom: propTypes.bool.def(false),
    // 表单label宽度
    labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
    // 是否 loading 数据中 add by 芋艿
    vLoading: propTypes.bool.def(false)

  },
  emits: ['register'],
  setup(props, {slots, expose, emit}) {
    //element form 实例
    const elFormRef = ref<ComponentRef<typeof ElForm>>()

    // useForm传入的props
    const outsideProps = ref<FormProps>({})

    const mergeProps = ref<FormProps>({})


    const getProps = computed(() => {
      const propsObj = {...props}
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    //表单数据
    const formModel = ref<Recordable>({})

    onMounted(() => {
      emit('register', unref(elFormRef)?.$parent, unref(elFormRef))
    })

    const setValues = (data: Recordable = {}) => {
      formModel.value = Object.assign(unref(formModel), data)
    }

    const setProps = (props: FormProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    const delSchema = (field: string) => {
      const {schema} = unref(getProps)
      const index = findIndex(schema, (v: FormSchema) => v.field === field)
      if (index > -1) {
        schema.splice(index, 1)
      }
    }

    const addSchema = (formSchema: FormSchema, index?: number) => {
      const {schema} = unref(getProps)
      if (index !== void 0) {
        schema.splice(index, 0, formSchema)
        return
      }
      schema.push(formSchema)
    }

    const setSchema = (schemaProps: FormSetPropsType[]) => {
      const {schema} = unref(getProps)
      for (const v of schema) {
        for (const item of schemaProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value)
          }
        }
      }
    }
    const getElFormRef = (): ComponentRef<typeof ElForm> => {
      return unref(elFormRef) as ComponentRef<typeof ElForm>
    }

    expose({
      setValues,
      formModel,
      setProps,
      delSchema,
      addSchema,
      setSchema,
      getElFormRef
    })

    // 监听表单结构化数组，重新生成formModel
    watch(
        () => unref(getProps).schema,
        (schema = []) => {
          formModel.value =init
        }
    )
  }
})
</script>

<template>

</template>

<style scoped>

</style>