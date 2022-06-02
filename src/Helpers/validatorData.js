import { text } from "express"

/**
 * It returns true if the text is a valid email address, and false if it is not.
 * @param text - The text to be validated
 * @returns A boolean value.
 */
export const validatorEmail = (text) =>{
    const Reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    return Reg.test(text)
}

/**
 * It returns true if the text is between 4 and 16 characters long, and contains only letters, numbers,
 * and underscores, and does not contain two underscores in a row.
 * @param text - The text to be validated
 * @returns A boolean value.
 */
export const validatorUserName = (text)=>{
    const reg = /^(?=.{4,16}$)(?!.*[_]{2})[a-zA-Z0-9_]+$/
    return reg.test(text)
}

/**
 * It returns true if the text contains only letters, spaces, and punctuation.
 * @param text - The text to be validated
 * @returns A function that takes a text parameter and returns a boolean.
 */
export const validatorSimpleText = (text)=>{
    const reg = /[0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/
    return !reg.test(text)
}

/**
 * It returns true if the text is a number between 1 and 10 digits long.
 * @param text - The text to be validated
 * @returns A function that takes a string and returns a boolean.
 */
export const validatorNumber = (text)=>{
    const reg = /(^\d{1,10}$)/g
    return reg.test(text)
}

/**
 * It returns true if the text contains a serial number.
 * @param text - The text to be validated
 * @returns A boolean value.
 */
export const validatorSerialNumber= (text)=>{
    const reg = /(N\/S|s\/n|S\/N|SN|ns|n\/s|NS):([A-Za-z0-9]+[!"$#$%/&]*[A-Za-z0-9]*)/
    return reg.test(text)

}

/**
 * It returns true if the text contains a phone number, false otherwise.
 * @param text - The text to be validated
 * @returns A boolean value.
 */
export const validatorPhoneNumber = (text)=>{
    const reg = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/
    return reg.test(text)
}