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
    const reg = /^([A-Z]([a-z0-9])*|"[A-Z]{0,1}([a-z0-9])*((\. | | & |, |-|\\|\/|! |\? |: |\t)[A-Z]{0,1}([a-z0-9])*)*")((\. | | & |, |-|\\|\/|! |\? |: |\t)[A-Z]{0,1}([a-z0-9])*| "[A-Z]{0,1}([a-z0-9])*((\. | | & |, |-|\\|\/|! |\? |: )[A-Z]{0,1}([a-z0-9])*)*(\.|!|\?){0,1}")*(\.|!|\?)$/gm
    return reg.test(text)
}
