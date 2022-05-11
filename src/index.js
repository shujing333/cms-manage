/*
 * @Descripttion: 
 * @Author: admin
 * @Date: 2022-05-09 09:53:06
 * @LastEditors: admin
 * @LastEditTime: 2022-05-09 17:16:41
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import "./assets/base.css"
import store from './store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <Router />
  </Provider>
  
);

