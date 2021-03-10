// 手机号码验证
function mobile(value) {
    let reg = /^1[3456789]\d{9}$/
    return reg.test(value)
  }
  // 邮箱验证
  function email(value) {
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    return reg.test(value)
  }
  // qq验证
  function qq(value) {
    let reg = /^[1-9][0-9]{4,11}$/
    return reg.test(value)
  }
  // 昵称不能包含特殊字符验证
  function nickname(value) {
    let reg = /[\'.,:;*?~`!@#$%^&+=)(<>{}]|\]|\[|\/|\\\|\"|\|/
    return !reg.test(value)
  }
  // 验证密码
  function password(value) {
    let reg = /^[A-Za-z0-9]{6,20}$/
    return reg.test(value)
  }
  // 纯数字验证
  function int(value){
    let reg = /^\d+$/
    return reg.test(value)
  }
  export default {
    mobile,
    email,
    qq,
    nickname,
    password,
    int,
  }