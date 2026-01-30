import { service } from  './service'
import { config } from './config'

const { default_headers } =  config


const  request = (option: any) =>{
    const { headersType, headers, ...otherOption } = option
    return service({
        ...otherOption,
        headers: {
            'Content-Type': headersType || default_headers,
            ...headers,
        }
    })

}


export  default  {
    get: async<T = any>(option: any) =>{
        const  res = await request({method: 'GET',...option})
        return res.data as unknown as T
},
    post: async<T = any>(option: any) =>{

    }
}