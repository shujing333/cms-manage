/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-10 10:06:51
 * @LastEditors: admin
 * @LastEditTime: 2022-05-10 15:22:44
 */
import React, {useState, useEffect} from 'react';
import { List, Skeleton, Pagination, Button, message } from 'antd';
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import {ArticleListApi, ArticleDelApi} from '../request/api'
function ListList () {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  
  // 请求列表数据
  const getList = (num) => {
    ArticleListApi({
      num,
      count: pageSize
    }).then(res=>{
      if(res.errCode === 0) {
        let { arr, total, num, count } = res.data
        setList(arr)
        setTotal(total)
        setCurrent(num)
        setPageSize(count)
      }
    })
  }
  
  // 在挂载的时候请求数据  componentDidMount
  useEffect(()=>{
    getList(current)
  },[])
  // 删除
  const delFn = (id) => {
    console.log("删除");
    ArticleDelApi({id}).then(res=>{
      if(res.errCode === 0) {
        message.success(res.message)
      }else {
        message.error(res.message)
      }
      getList(1)
    })
    
  }

  // 分页
  const onChange = (pages)=> {
    getList(pages)
  }
  return(
    <div className='list_table' style={{ padding: '20px' }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type='primary' onClick={()=>navigate('/edit/'+item.id)}>编辑</Button>, 
              <Button type='danger' onClick={()=>delFn(item.id)}>删除</Button>
            ]}
          >
            {/* Skeleton  骨架屏 */}
            <Skeleton loading={false}>
              <List.Item.Meta
                title={<a href="!#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination style={{float: 'right',marginTop: '20px'}} onChange={onChange} total={total} current={current} pageSize={pageSize} />
    </div>
  )
}

export default ListList