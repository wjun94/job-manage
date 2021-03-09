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
   * @todo 踢出公司
   * @param params
   * @method PATCH
   * @return {promise}
   */
  async outCompany(params = {}) {
    try {
      let result = await this.axios('PATCH', `/outCompany`, params);
      message.success('踢出成功');
      return result.data
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 添加公司
   * @param params
   * @method PATCH
   * @return {promise}
   */
  async addCompany(params = {}) {
    try {
      let result = await this.axios('PATCH', `/addCompany`, params);
      message.success('加入成功');
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
  async updateManageId(params = {}) {
    try {
      let result = await this.axios('PATCH', `/updateManageId`, params);
      message.success(params.manageId ? '加入成功' : '踢出成功', 1.5);
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
   * @todo 私库未联系
   * @param params
   * @method get
   * @return {promise}
   */
  async customerNotList(params = {}) {
    try {
      let result = await this.axios('get', `/customerNotList`, params);
      return result
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
   * @todo 获取企业信息
   * @param params
   * @method get
   * @return {promise}
   */
  async companyDesc(params = {}) {
    try {
      let result = await this.axios('get', `/companyDesc`, params);
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
   * @todo 获取聊天记录列表
   * @param params
   * @method get
   * @return {promise}
   */
  async recordList(params = {}) {
    try {
      let result = await this.axios('get', `/recordList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 创建聊天记录
   * @param params
   * @method post
   * @return {promise}
   */
  async createRecord(params = {}) {
    try {
      let result = await this.axios('post', `/createRecord`, params);
      message.success("添加成功")
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
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 预约客户和今日联系列表
   * @param params
   * @method get
   * @return {promise}
   */
  async reserveAndTodayList(params = {}) {
    try {
      let result = await this.axios('get', `/reserveAndTodayList`, {
        ...initPage,
        ...params
      });
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
  async customerList(params = {}) {
    try {
      let result = await this.axios('get', `/customerList`, {
        ...initPage,
        ...params
      });
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