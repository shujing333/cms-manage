/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 10:07:08
 * @LastEditors: admin
 * @LastEditTime: 2022-05-10 11:01:54
 */
import React, {useState, useEffect} from 'react';
import { Table, Button, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './css/ListTable.less'
import {ArticleListApi, ArticleDelApi} from '../request/api'
import moment from 'moment'

// 标题组件
function MyTitle(props){
  return(
    <div>
      <a className="table_title" href={"http://codesohigh.com:8765/article/" + props.id}>{props.title}</a>
      <p style={{color: '#999'}}>{props.subTitle}</p>
    </div>
  )
}

function ListTable() {
  const navigate = useNavigate()
  const [arr, setArr] = useState([])
  const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 0})

  useEffect(()=>{
    getAticalList(pagination.current, pagination.pageSize)
  },[])
  // 分页函数
  const pageChange = (arg) => getAticalList(arg.current, arg.pageSize)
  
  // 请求数据
  const getAticalList = (current, pageSize) => {
    ArticleListApi({
      num: current,
      count: pageSize
    }).then(res=>{
      // console.log(res,"res");
      
      if(res.errCode === 0) {
        // 更改pagination
        let {num, count, total} = res.data
        setPagination({current: num, pageSize: count, total})
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        // 声明一个空数组
        let myarr = []
        /*
          1.要给数组每条数据加key，让key=id
          2.要有一个标签结构，赋予一个属性
        */
       newArr.map(item=>{
         let obj= {
           key: item.id,
           date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
           mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle}/>
         }
         myarr.push(obj)
       })
       setArr(myarr)
      }
    })
  }
  // 删除
  const delFn = (id)=>{
    ArticleDelApi({id }).then(res=>{
      if(res.errCode === 0) {
        message.success(res.message)
      }else {
        message.error(res.message)
      }
      getAticalList(1, pagination.pageSize)
    })
    
  }
  // 每一列
  const columns = [
      {
          dataIndex: 'mytitle',
          key: 'mytitle',
          width: '60%',
          render: text => <div>{text}</div>
      },
      {
          dataIndex: 'date',
          key: 'date',
          render: text => <p>{text}</p>,
      },
      {
          key: 'action',
          render: text => {
              return (
                  <Space size="middle">
                      {/* text.key就是id */}
                      <Button type='primary' onClick={() => navigate('/edit/' + text.key)}>编辑</Button>
                      <Button type='danger' onClick={()=>delFn(text.key)}>删除</Button>
                  </Space>
              )
          },
      },
  ];
  return (
    <div className='list_table'>
        <Table
            showHeader={false}
            columns={columns}
            dataSource={arr}
            onChange={pageChange}
            pagination={pagination}
        />
    </div>
  )
}
export default ListTable