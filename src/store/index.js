/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 17:13:53
 * @LastEditors: admin
 * @LastEditTime: 2022-05-09 17:14:59
 */
import reducer from './reducer'
import {createStore} from 'redux'

const store = createStore(reducer)
export default store