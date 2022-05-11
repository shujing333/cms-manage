/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 09:53:06
 * @LastEditors: admin
 * @LastEditTime: 2022-05-09 17:34:46
 */
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Aside from './components/Aside'
import Bread from './components/Bread'
function App() {
  // const { Header, Footer, Sider, Content } = Layout;
  return (
    <Layout id='app'>
      <Header />
      <div className='container'>
        <Aside />
        <div className='container_box'>
          <Bread />
          <div className="container_content">
            <Outlet />
          </div>
        </div>
      </div>
      <footer>Respect | Copyright &copy; 2022 Author daer</footer>
    </Layout>
  );
}

export default App;
