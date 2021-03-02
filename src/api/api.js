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
      let result = await this.axios('PATCH', `/manageUpdateCompanyInfo`, params);
      message.success('更新成功', 1.5);
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
      let result = await this.axios('get', `/CompanyInfoById`, params);
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
      let result = await this.axios('POST', `/loginManage`, params);
      return result.data
    } catch (err) {
      throw err;
    }
  }
}

export default new API();