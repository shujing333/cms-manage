/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 10:07:08
 * @LastEditors: admin
 * @LastEditTime: 2022-05-09 14:17:28
 */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png'
import "./css/Register.css"
import {RegisterApi} from '../request/api'
function Register() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values);
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res => {
      if(res.errCode === 0) {
        message.success(res.message)
        // 跳转到登录页
        setTimeout(()=>navigate('/login'),1500)
      }else{
        message.error(res.message)
      }
    })
  };

  return (
    <div className="register">
      <div className="register-box">
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

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次确认密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('请输入相同密码！'));
                },
              }),
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined /> } placeholder="请再次确认密码！"/>
          </Form.Item>

          <Form.Item>
            <Link to="/login">已有账号？前往登录</Link>
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Register