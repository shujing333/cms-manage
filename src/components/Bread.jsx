/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 17:27:17
 * @LastEditors: admin
 * @LastEditTime: 2022-05-10 10:50:10
 */
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom'

function Bread() {
  const {pathname} = useLocation()
  const [breadName, setBreadName] = useState('')

  useEffect(()=>{
    switch(pathname) {
      case '/listlist':
          setBreadName('查看文章列表')
          break;
      case '/listtable':
        setBreadName('查看文章列表')
        break;
      case '/edit':
        setBreadName('文章编辑')
        break; 
      case '/means':
        setBreadName('修改资料')
        break;
      default:
        setBreadName(pathname.includes('edit') ? '文章编辑' : "")
        break;
    }
  },[pathname])
  return (
    <Breadcrumb style={{height: '40px', lineHeight: '40px'}}>
      <Breadcrumb.Item href="/">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {breadName}
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default Bread