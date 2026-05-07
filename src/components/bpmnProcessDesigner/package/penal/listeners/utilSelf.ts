// 初始化表单数据
export  function  initListenerForm(listener) {
    let self = {
        ...listener,
    }

    if (listener.script){
        self = {
            ...listener,
            ...listener.script,
            scriptType: listener.script.resource ? 'externalScript' : 'inlineScript'
        }
    }
    if (listener.event === 'timeout' && listener.eventDefinitions) {
        if (listener.eventDefinitions.length){
            let k = ''
            for (const key in listener.eventDefinitions[0]) {
                console.log(listener.eventDefinitions, key)
                if (key.indexOf('time') !== -1) {
                    k = key
                    self.eventDefinitionType = key.replace('time', '').toLowerCase()
                }
            }
            console.log(k)
            self.eventTimeDefinitions = listener.eventDefinitions[0][k].body
        }
    }
    return self
}