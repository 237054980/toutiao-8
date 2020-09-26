//本地存储封装模块




export const getItem = name => {
    const data = window.localStorage.getItem(name)
    //为什么把 JSON.parse 放到 try-catch中?
    //因为data 可能把不是 JSON 格式的字符串
    try {
        //尝试吧data 转为javaScript 对象
        return JSON.parse(data)
    } catch (error) {
        //data 不是JSON 格式的字符串,直接原样返还
        return data
        
    }
}



export const setItem = (name, value) =>{
    //如果value是对象, 就把 value 转为JSON 格式的字符串再存储
    if(typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}




export const removeItem = name =>{

    window.localStorage.removeItem(name)
}