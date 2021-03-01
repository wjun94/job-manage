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
   * @todo 批量操作
   * @param params
   * @method DELETE
   * @return {promise}
   */
  async updateRecruits(params = {}, str = '操作成功') {
    try {
      let result = await this.axios('PATCH', `/updateRecruits`, params);
      message.success(str);
      return result.data
    } catch (err) {
      throw err;
    }
  }
  /**
   * @todo 删除职位
   * @param params
   * @method DELETE
   * @return {promise}
   */
  async deleteRecruits(params = {}) {
    try {
      let result = await this.axios('DELETE', `/deleteRecruits`, params);
      message.success('删除成功');
      return result.data
    } catch (err) {
      throw err;
    }
  }
  /**
   * @todo 修改密码
   * @param params
   * @method PATCH
   * @return {promise}
   */
  async updatePwd(params = {}) {
    try {
      let result = await this.axios('PATCH', `/updatePwd`, params);
      message.success('修改成功', 1.5);
      return result.data
    } catch (err) {
      throw err;
    }
  }
  /**
   * @todo 更新招聘信息
   * @param params
   * @method PATCH
   * @return {promise}
   */
  async updateRecruit(params = {}) {
    try {
      let result = await this.axios('PUT', `/updateRecruit`, params);
      message.success('更新成功');
      return result.data
    } catch (err) {
      throw err;
    }
  }
  /**
   * @todo 注册
   * @param params
   * @method post
   * @return {promise}
   */
  async createCompany(params = {}) {
    try {
      let result = await this.axios('POST', `/createCompany`, params);
      message.success('创建成功')
      return result.data
    } catch (err) {
      throw err;
    }
  }
  /**
   * @todo 创建招聘信息
   * @param params
   * @method post
   * @return {promise}
   */
  async createRecruit(params = {}) {
    try {
      let result = await this.axios('POST', `/createRecruit`, params);
      message.success('创建成功')
      return result.data
    } catch (err) {
      throw err;
    }
  }
  /**
   * @todo 创建消息
   * @param params
   * @method post
   * @return {promise}
   */
  async createMsg(params = {}) {
    try {
      let result = await this.axios('POST', `/createMsg`, params);
      return result.data
    } catch (err) {
      throw err;
    }
  }
  /**
   * @todo 消息列表
   * @param params
   * @method GET
   * @return {promise}
   */
  async msgList(params = initPage) {
    try {
      let result = await this.axios('GET', `/msgList`, params);
      return result
    } catch (err) {
      throw err;
    }
  }
  /**
   * @todo 企业登录
   * @param params
   * @method post
   * @return {promise}
   */
  async loginCompany(params = {}) {
    try {
      let result = await this.axios('POST', `/loginCompany`, params);
      return result.data
    } catch (err) {
      throw err;
    }
  }
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
   * @todo 获取企业信息
   * @param params
   * @method get
   * @return {promise}
   */
  async getCompanyInfo(params = {}) {
    try {
      let result = await this.axios('get', `/companyInfo`, params);
      return result.data
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 获取招聘详情
   * @param params
   * @method get
   * @return {promise}
   */
  async recruit(params = {}) {
    try {
      let result = await this.axios('get', `/recruit`, params);
      return result.data
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 复制招聘详情
   * @param params
   * @method post
   * @return {promise}
   */
  async copyRecruit(params = {}) {
    try {
      let result = await this.axios('post', `/copyRecruit`, params);
      message.success("复制成功")
      return result.data
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 获取招聘列表
   * @param params
   * @method get
   * @return {promise}
   */
  async recruitList(params = initPage) {
    try {
      let result = await this.axios('get', `/recruitList`, params);
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 获取登录日志
   * @param params
   * @method get
   * @return {promise}
   */
  async getLoginLogList(params = initPage) {
    try {
      let result = await this.axios('get', `/loginLogList`, params);
      return result
    } catch (err) {
      throw err;
    }
  }
}

export default new API();