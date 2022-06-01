import { text } from "express"

export const validatorEmail = (text) =>{
    const Reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    return Reg.test(text)
}

export const validatorUserName = (text)=>{
    const reg = /^(?=.{4,16}$)(?!.*[_]{2})[a-zA-Z0-9_]+$/
    return reg.test(text)
}

export const validatorSimpleText = (text)=>{
    const reg = /[0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/
    return !reg.test(text)
}

export const validatorNumber = (text)=>{
    const reg = /(^\d{1,10}$)/g
    return reg.test(text)
}
