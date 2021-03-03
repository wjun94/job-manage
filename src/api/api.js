import Server from './server';
import {
  message
} from 'antd';

const initPage = {
  current: 1,
  pageSize: 10
}

class API extends Server {

  /**
   * @todo 更新公司信息
   * @param params
   * @method PATCH
   * @return {promise}
   */
  async updateCompanyInfo(params = {}) {
    try {
      let result = await this.axios('PATCH', `/updateCompanyInfo`, params);
      message.success('更新成功', 1.5);
      return result.data
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 联系人信息
   * @param params
   * @method get
   * @return {promise}
   */
  async contact(params = {}) {
    try {
      let result = await this.axios('get', `/contact`, params);
      return result.data
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 获取企业列表
   * @param params
   * @method get
   * @return {promise}
   */
  async CompanyInfo(params = {}) {
    try {
      let result = await this.axios('get', `/companyInfo`, params);
      return result.data
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 更新联系人
   * @param params
   * @method patch
   * @return {promise}
   */
  async updateContact(params = {}) {
    try {
      let result = await this.axios('patch', `/updateContact`, params);
      message.success("操作成功")
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 创建联系人
   * @param params
   * @method post
   * @return {promise}
   */
  async createContact(params = {}) {
    try {
      let result = await this.axios('post', `/createContact`, params);
      message.success("操作成功")
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 获取联系人列表
   * @param params
   * @method get
   * @return {promise}
   */
  async contactList(params = initPage) {
    try {
      let result = await this.axios('get', `/contactList`, params);
      console.log(result)
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 获取企业列表
   * @param params
   * @method get
   * @return {promise}
   */
  async companyList(params = initPage) {
    try {
      let result = await this.axios('get', `/companyList`, params);
      console.log(result)
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 登录
   * @param params
   * @method post
   * @return {promise}
   */
  async login(params = {}) {
    try {
      let result = await this.axios('POST', `/login`, params);
      return result.data
    } catch (err) {
      throw err;
    }
  }
}

export default new API();