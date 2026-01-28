import {config} from "@/config/axios/config"
import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios"
import qs from 'qs'
import {getAccessToken, getTenantId, getVisitTenantId} from "@/utils/auth";

const tenantEnable = import.meta.env.VITE_APP_TENANT_ENABLE
const {result_code, base_url, request_timeout} = config


// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgs = [
    '无效的刷新令牌', // 刷新令牌被删除时，不用提示
    '刷新令牌已过期' // 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。否则，会导致继续 401，无法跳转到登出界面
]

//是否显示重新登录
export const isRelogin = {show: false}
// Axios 无感知刷新令牌，参考 https://www.dashingdog.cn/article/11 与 https://segmentfault.com/a/1190000020210980 实现
//请求队列
let requestList: any[] = []
let isRefreshToken = false
// 请求白名单，无须 token 的接口
const whiteList: string[] = ['/login', '/refresh-token']

//创建axios实例
const service: AxiosInstance = axios.create({
    baseURL: base_url, //api 的 base_url
    timeout: request_timeout, //请求超时时间
    withCredentials: false, //禁用 Cookie等信息
    //自定义参数序列化
    paramsSerializer: (params) => {
        return qs.stringify(params, {allowDots: true})
    }
})

//request拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 是否需要设置 token
        let isToken = (config!.headers || {}).isToken === false
        whiteList.some((v) => {
            if (config.url && config.url.indexOf(v) > 1) {
                return (isToken = false)
            }
        })
        if (getAccessToken() && !isToken) {
            config.headers.Authorization = 'Bearer ' + getAccessToken() // 让每个请求携带自定义token
        }
        //设置租户
        if (tenantEnable && tenantEnable === 'true') {
            const tenantId = getTenantId()
            if (tenantId) config.headers['tenant-id'] = tenantId
            // 只有登录时，才设置 visit-tenant-id 访问租户
            const visitTenantId = getVisitTenantId()
            if (config.headers.Authorization && visitTenantId) {
                config.headers['visit-tenant-id'] = visitTenantId
            }
        }

        const method = config.method?.toUpperCase()
        // 防止 GET 请求缓存
        if (method === 'GET') {
            config.headers['Cache-Control'] = 'no-cache'
            config.headers['Pragma'] = 'no-cache'
        }
        // 自定义参数序列化函数
        else if (method === 'POST') {
            const contentType = config.headers['Content-Type'] || config.headers['content-type']
            if (contentType === 'application/x-www-form-urlencoded') {
                if (config.data && typeof config.data !== 'string') {
                    config.data = qs.stringify(config.data)
                }
            }
        }
        // 是否 API 加密
        if ((config!.headers || {}).isEncrypt){
            try {
                //加密请求数据
                if (config.data) {
                    config.data =
                }
            }catch (error) {

            }
        }


    }
)