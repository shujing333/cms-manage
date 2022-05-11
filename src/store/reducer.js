/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 17:11:42
 * @LastEditors: admin
 * @LastEditTime: 2022-05-11 11:59:45
 */
const defaultState = {
  // 上传图片时触发头像更新
  myKey: 1
}
export default (state=defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch(action.type) {
    case "addKeyFn": 
        newState.myKey++
        break;
    default:
        break;
  }
  return newState
}