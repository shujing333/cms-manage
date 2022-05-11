/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 10:04:57
 * @LastEditors: admin
 * @LastEditTime: 2022-05-11 10:42:58
 */
import App from '../App'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ListList from '../pages/ListList'
import ListTable from '../pages/ListTable'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<ListList />}></Route>
        <Route path="/listtable" element={<ListTable />}></Route>
        <Route path="/listlist" element={<ListList />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/means" element={<Means />}></Route>
      </Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </Router>
)

export default BaseRouter