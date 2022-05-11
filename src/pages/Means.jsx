/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 10:07:08
 * @LastEditors: admin
 * @LastEditTime: 2022-05-11 11:40:38
 */
import React, {useState, useEffect} from 'react';
import { Form, Input, Button, message, Upload } from 'antd';
import './css/Means.less'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {GetUserDataApi, ChangeUserDataApi} from '../request/api'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

// 将图片路径转base64
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
// 限制图片大小只能是200KB
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 / 1024  < 200;
  if (!isLt2M) {
    message.error('请上传小于200KB的图!');
  }
  return isJpgOrPng && isLt2M;
}

function Means(props) {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    GetUserDataApi().then(res=>{
      if(res.errCode === 0) {
        message.success(res.message)
        // 存到本地
        sessionStorage.setItem('username', res.data.username)
      }
    })
  },[])
  // 修改用户信息提交
  const onFinish = (values) => {
    console.log(values,"提交");
    if(values.username && values.username !== sessionStorage.getItem('username') && values.password.trim() !== "") {
      ChangeUserDataApi({
        username: values.username,
        password: values.password
      }).then(res=>{
        console.log(res,"提交成功啦！");
        
        if(res.errCode === 0) {
          message.success('修改成功，请重新登录！')
          setTimeout(()=>navigate('/login'),1500)
        }else {
          message.error(res.message)
        }
      })
    }else{
      message.error('请修改用户信息！')
    }
  }

  // 点击了上传图片
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setLoading(false)
        setImageUrl(imageUrl)
        // 存储图片名称
        localStorage.setItem('avatar', info.file.response.data.filePath)
        // 使用react-redux
        props.addKey()
      }
      );
    }
  }

  // 上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className='means'>
      <Form
        name="basic"
        style={{width: '400px'}}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="修改用户名：" name="username">
          <Input placeholder='请输入新用户名' />
        </Form.Item>

        <Form.Item label="修 改 密 码：" name="password">
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{float: 'right'}}>提交</Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像：</p>
      {/* 
         headers 设置请求头携带token
       */}
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload" //图片上传接口
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{"cms-token": localStorage.getItem('cms-token')}}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    addKey() {
      dispatch({type: "addKeyFn"})
    }
  }
}
export default connect(null, mapDispatchToProps)(Means)