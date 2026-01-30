import  type  { RouteLocationNormalized,Router, RouteRecordNormalized } from  'vue-router'
import  {createRouter ,  createWebHashHistory, RouteRecordRaw} from  'vue-router'
import { isUrl } from  '@/utils/is'
import { cloneDeep, omit } from  'lodash-es'
import qs from 'qs'
import {defineAsyncComponent} from "vue";


const modules = import.meta.glob('../views/**/*.{vue,tsx}')


/**
 * 注册一个异步组件
 * @param componentPath 例:/bpm/oa/leave/detail
 */
export  const  registerComponent = (componentPath: string)=>{
    for (const  item in modules){
        if (item.includes(componentPath)){
            // 使用异步组件的方式来动态加载组件
            // @ts-ignore
            return defineAsyncComponent(modules[item])
        }
    }
}

/* Layout */
export  const  Layout = () => import('@/layout/Layout.vue')

export  const  getParentLayout= () => {
    return ()=>{
        new Promise((resolve)=>{
            resolve({
                name: 'ParentLayout'
            })
        })
    }
}


// 按照路由中meta下的rank等级升序来排序路由
export  const  ascending = (arr: any[]) => {
    arr.forEach((v) => {
        if (v?.meta?.rank === null) v.meta.rank = undefined
        if (v?.meta?.rank === 0) {
            if (v.name !== 'home' && v.name !== '/'){
                console.warn('rank only the home page can be 0')
            }
        }
    })

    return arr.sort((a: {meta:{rank : number}}, b :{meta:{rank:number}}) => {
        return a?.meta?.rank - b?.meta.rank
    })
}

export const  getRawRoute = (route:RouteLocationNormalized) :RouteLocationNormalized =>{
 if (!route) return route
    const{ matched, ...opt  } = route
    return  {
     ...opt,
        matched: (matched
        ? matched.map((item)=>({
                meta: item.meta,
                name: item.name,
                path: item.path
            })): undefined) as RouteRecordNormalized[]
    }
}

// 后端控制路由生成
export  const  generateRoute = (routes: AppCustomRouteRecordRaw[]) :AppRouteRecordRaw[] => {
    const  res : AppRouteRecordRaw[] = []
    const  modulesRoutesKeys = Object.keys(modules)
    for (const route of routes) {
        // 1. 生成 meta 菜单元数据
        const meta = {
            title: route.name,
            icon: route.icon,
            hidden: !route.visible,
            noCache: !route.keepAlive,
            alwaysShow:
              route.children &&
              route.children.length >0 &&
                (route.alwaysShow != undefined ? route.alwaysShow : true)
        } as any
        // 特殊逻辑：如果后端配置的 MenuDO.component 包含 ?，则表示需要传递参数
        // 此时，我们需要解析参数，并且将参数放到 meta.query 中
        // 这样，后续在 Vue 文件中，可以通过 const { currentRoute } = useRouter() 中，通过 meta.query 获取到参数
        if (route.component && route.component.indexOf('?') > -1){
            const query =  route.component.split('?')[1]
            route.component = route.component.split('?')[0]
            meta.query = qs.parse(query)
        }

        // 2. 生成 data（AppRouteRecordRaw）
        // 路由地址转首字母大写驼峰，作为路由名称，适配keepAlive
        let data: AppRouteRecordRaw = {
            path:
              route.path.indexOf('?') > -1 && !isUrl(route.path) ? route.path.split('?')[0]: route.path, // 注意，需要排除 http 这种 url，避免它带 ? 参数被截取掉
            name:
              route.componentName && route.componentName.length > 0
            ? route.componentName: toCamelCase(route.path, true),
            redirect: route.redirect,
            meta: meta,
        }
        //处理顶级非目录路由
        if (!route.children && route.parentId == 0 && route.component) {
            data.component =Layout
            data.meta =  {
                hidden: meta.hidden
            }
            data.name= toCamelCase(route.path,true) + 'Parent'
            data.redirect = ''
            meta.alwaysShow = true
            const childrenData: AppRouteRecordRaw = {
                path: '',
                name:
                route.componentName && route.componentName.length > 0
                ? route.componentName : toCamelCase(route.path, true),
                redirect: route.redirect,
                meta: meta
            }

            const index = route?.component
            ? modulesRoutesKeys.findIndex((ev) => ev.includes(route.component))
             : modulesRoutesKeys.findIndex((ev)=> ev.includes(route.path))
            childrenData.component = modules[modulesRoutesKeys[index]]
            data.children = [childrenData]
        }else {
            //目录
            if (route.children?.length) {
                data.component = Layout
                data.redirect =
            }
        }
    }
}

const  toCamelCase = (str: string, upperCaseFirst: boolean) => {
    str = (str || '')
        .replace(/-(.)/g, function (group1: string) {
            return group1.toUpperCase()
        })
        .replaceAll('-', '')

    if (upperCaseFirst && str) {
        str = str.charAt(0).toUpperCase() + str.slice(1)
    }

    return str
}