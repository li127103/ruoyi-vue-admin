import {request} from "@/config/axios"

export  interface  DictTypeVO {
    id : number,
    name: string,
    type: string,
    status: number
    remark: string
    createTime: Date
}

