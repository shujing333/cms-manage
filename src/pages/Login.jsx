/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 10:07:08
 * @LastEditors: admin
 * @LastEditTime: 2022-05-09 14:43:05
 */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png'
import "./css/Login.css"
import {LoginApi} from '../request/api'
function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values);
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res => {
      if(res.errCode === 0){
        message.success(res.message)
        // 存储数据
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('editable', res.data.editable)
        //跳转到首页
        setTimeout(()=>navigate('/'),1500)
      }else{
        message.error(res.message)
      }
    })
  };

  return (
    <div className="login">
      <div className="login-box">
        <img src={logoImg} alt=""/>
        <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="请输入用户名"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="请输入密码"/>
          </Form.Item>

          <Form.Item>
            <Link to="/register">还没账号？立即注册</Link>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login