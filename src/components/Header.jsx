/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 14:55:24
 * @LastEditors: admin
 * @LastEditTime: 2022-05-11 11:44:09
 */
import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png'
import { Menu, Dropdown, message } from 'antd';
import defaultAvatar from '../assets/defaultAvatar.jpg'
import { CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import {connect} from 'react-redux'


function Header(props){
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState('daer')

  useEffect(()=>{
    let name = localStorage.getItem('username')
    let image = localStorage.getItem('avatar')
    if(name) {
      setUsername(name)
    }
    if(image) {
      setAvatar('http://47.93.114.103:6688/' + image)
    }
  },[props.myKey])

  // 修改资料跳转
  const handleMeans = () => {
    navigate('/means')
  }
  // 退出登录
  const logout = () => {
    message.success('退出成功，即将返回登录页！')
    localStorage.clear() // 退出登录清楚浏览器本地存储信息
    setTimeout(()=>navigate('/login'),1500)
  }
  const menu = (
    <Menu>
        <Menu.Item key={1} onClick={handleMeans}>修改资料</Menu.Item>
        <Menu.Divider />
        <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <header>
      <img src={logoImg} alt="" className="logo"/>
      <div className="right">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <img src={avatar} className="avatar" alt="" />
            <span>{username}</span>
                <CaretDownOutlined />
            </a>
        </Dropdown>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    myKey: state.myKey
  }
}
export default connect(mapStateToProps)(Header)