/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 10:07:08
 * @LastEditors: admin
 * @LastEditTime: 2022-05-10 16:56:06
 */
import React, {useState, useEffect} from 'react';
import { PageHeader, Button, Modal, Form, Input, message } from 'antd';
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import moment from 'moment'
import E from 'wangeditor'
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api'

let editor = null
function Edit() {
  const params = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [content, setContent] = useState('')
  const [form] = Form.useForm() // ant Form表单自定义的一个hook函数
  const location = useLocation()
  const navigate = useNavigate()
  // 编辑文章之后处理请求数据
  const dealData = (errCode, msg) => {
    setIsModalVisible(false) // 关闭弹窗
    if(errCode === 0) {
      message.success(msg)
      setTimeout(()=>navigate('/listlist'),1500)
    }else{
      message.error(msg)
    }
  }
  // 对话框提交
  const handleOk = ()=>{
    console.log("提交文章");
    form
      .validateFields() // 必填字段校验
      .then(values=>{
        let {title, subTitle} = values
        if(params.id) {
          // 修改文章
          ArticleUpdateApi({title, subTitle, content, id: params.id }).then(res=> dealData(res.errCode, res.message))
        }else{
          // 新增文章
          ArticleAddApi({title, subTitle, content}).then(res=>dealData(res.errCode, res.message))
        }
      })
      .catch(()=>false)
  }

  useEffect(()=>{
    // 创建一个富文本对象
    editor = new E('#div1')
    // 将富文本框里边的内容赋值给content
    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
    }
    editor.create()
    // 根据地址栏id请求该条信息
    if(params.id) {
      ArticleSearchApi({id: params.id}).then(res=>{
        if(res.errCode === 0) {
          editor.txt.html(res.data.content) // 重新设置编辑器内容
          setTitle(res.data.title)
          setSubTitle(res.data.subTitle)
        }
      })
    }
  },[location.pathname])
  return (
    <div>
      {/* 头部 setIsModalVisible 设置弹窗显隐*/}
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
        extra={<Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>提交文章</Button>}
      ></PageHeader>
      {/* 富文本编辑 */}
      <div id="div1" style={{ padding: '0 20px 20px', background: '#fff' }}></div>
      {/* 弹窗 */}
      <Modal zIndex={99999} title="填写文章标题" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} okText="提交" cancelText="取消">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          autoComplete="off"
          initialValues={{ title, subTitle }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请填写标题' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="副标题"
            name="subTitle"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default Edit