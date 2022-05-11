/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 16:43:26
 * @LastEditors: admin
 * @LastEditTime: 2022-05-10 15:25:47
 */
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
function Aside() {
  const navigate = useNavigate()
  const location = useLocation()
  const [defaultKey, setDefaultKey] = useState('')
  
  useEffect(()=>{
    // console.log(location,"123");
    let path = location.pathname
    let key = path.split('/')[1]
    setDefaultKey(key)
  },[location.pathname])

  const handleClick = (e) => {
    // console.log(e);
    navigate('/' + e.key)
    setDefaultKey(e.key)
  }
  return(
    <Menu
          onClick={handleClick}
          style={{ width: 180 }}
          selectedKeys={[defaultKey]}
          mode="inline"
          className='aside'
          theme="dark"
      >   
          <Menu.Item key="listlist"><ReadOutlined /> 查看文章列表List</Menu.Item>
          <Menu.Item key="listtable"><ReadOutlined /> 查看文章列表Table</Menu.Item>
          <Menu.Item key="edit"><EditOutlined /> 文章编辑</Menu.Item>
          <Menu.Item key="means"><DatabaseOutlined /> 修改资料</Menu.Item>
      </Menu>
  )
}
export default Aside