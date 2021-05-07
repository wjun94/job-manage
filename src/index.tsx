import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.css'
import App from './App';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import store from '@/store/store'
import { Provider } from 'react-redux'
import Api from '@/api/api'
import * as Utils from '@/utils/index'
import moment from 'moment'
import './mock'
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

declare global {
  interface Window {
    $api: any;
    $utils: any;
    $user: {
      createAt: string
      email: string
      id: string
      level: number
      name: string
      phone: string
    };
  }
}

window.$api = Api
window.$utils = Utils
const user = window.localStorage.getItem("userInfo")
window.$user = user ? JSON.parse(user) : {}


ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider componentSize={'middle'} locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
