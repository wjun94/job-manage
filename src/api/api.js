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
   * @todo 未合作客户列表
   * @param params
   * @method get
   * @return {promise}
   */
  async serviceList(params = {}) {
    try {
      let result = await this.axios('get', `/serviceList`, {
        ...params
      });
      return result.data || []
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 已到期客户列表
   * @param params
   * @method get
   * @return {promise}
   */
  async instituteMaturityList(params = {}) {
    try {
      let result = await this.axios('get', `/instituteMaturityList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 未合作客户列表
   * @param params
   * @method get
   * @return {promise}
   */
  async instituteCooperationList(params = {}) {
    try {
      let result = await this.axios('get', `/instituteCooperationList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 未合作客户列表
   * @param params
   * @method get
   * @return {promise}
   */
  async instituteExperienceList(params = {}) {
    try {
      let result = await this.axios('get', `/instituteExperienceList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 未合作客户列表
   * @param params
   * @method get
   * @return {promise}
   */
  async instituteNotList(params = {}) {
    try {
      let result = await this.axios('get', `/instituteNotList`, {
        ...initPage,
        ...params
      });
      return result
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
  async instituteAllList(params = {}) {
    try {
      let result = await this.axios('get', `/instituteAllList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/私库未联系
   * @param params
   * @method get
   * @return {promise}
   */
  async customerNotList(params = {}) {
    try {
      let result = await this.axios('get', `/customerNotList`, {
        ...initPage,
        ...params
      });
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
   * @todo 创建广告位
   * @param params
   * @method get
   * @return {promise}
   */
  async createAdvtg(params = {}) {
    try {
      let result = await this.axios('post', `/createAdvtg`, params);
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 开通体验
   * @param params
   * @method get
   * @return {promise}
   */
  async createExperience(params = {}) {
    try {
      let result = await this.axios('post', `/createExperience`, params);
      message.success("操作成功")
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 开通服务
   * @param params
   * @method get
   * @return {promise}
   */
  async createService(params = {}) {
    try {
      let result = await this.axios('post', `/createService`, params);
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
  async msgList(params = initPage) {
    try {
      let result = await this.axios('get', `/msgList`, params);
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
  async loginLogList(params = initPage) {
    try {
      let result = await this.axios('get', `/loginLogList`, params);
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 合同管理单位信息
   * @param params
   * @method get
   * @return {promise}
   */
  async contactCompanyDesc(params = {}) {
    try {
      let result = await this.axios('get', `/contactCompanyDesc`, params);
      return result
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
  async contactList(params = {}) {
    try {
      let result = await this.axios('get', `/contactList`, {
        ...initPage,
        ...params,
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/预约客户 列表
   * @param params
   * @method get
   * @return {promise}
   */
  async customerReserveList(params = {}) {
    try {
      let result = await this.axios('get', `/customerReserveList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/今日联系  列表
   * @param params
   * @method get
   * @return {promise}
   */
  async customerTodayList(params = {}) {
    try {
      let result = await this.axios('get', `/customerTodayList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/客户查询 列表
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
   * @todo 创建单位
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
   * @todo 客户管理/原合作 列表
   * @param params
   * @method get
   * @return {promise}
   */
  async customerFormerList(params = {}) {
    try {
      let result = await this.axios('get', `/customerFormerList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/未合作 列表
   * @param params
   * @method get
   * @return {promise}
   */
  async customerBeingList(params = {}) {
    try {
      let result = await this.axios('get', `/customerBeingList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/未合作 列表
   * @param params
   * @method get
   * @return {promise}
   */
  async customerExpectedList(params = {}) {
    try {
      let result = await this.axios('get', `/customerExpectedList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/公库 列表
   * @param params
   * @method get
   * @return {promise}
   */
  async customerPubList(params = {}) {
    try {
      let result = await this.axios('get', `/customerPubList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/我的客户 列表
   * @param params
   * @method get
   * @return {promise}
   */
  async customerAwayList(params = {}) {
    try {
      let result = await this.axios('get', `/customerAwayList`, {
        ...initPage,
        ...params
      });
      return result
    } catch (err) {
      throw err;
    }
  }

  /**
   * @todo 客户管理/我的客户 列表
   * @param params
   * @method get
   * @return {promise}
   */
  async customerMeList(params = {}) {
    try {
      let result = await this.axios('get', `/customerMeList`, {
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