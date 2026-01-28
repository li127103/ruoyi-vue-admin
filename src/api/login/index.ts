
import  type { RegisterVO,  UserLoginVO} from  './types'
import request from '@/config/axios'


export interface SmsCodeVO {
    mobile: string
    scene: number
}


export interface SmsLoginVO {
    mobile: string
    code: string
}

//登录
export  const  login = (data: UserLoginVO) => {
    return  request.post(
        url: '/login',
    )
}