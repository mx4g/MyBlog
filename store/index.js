 
import cookieparser from 'cookieparser'
export const state = () => ({
 
  token:"",
  isLogin:false,
  userInfo:[]

})

export const mutations = {

  setToken(state,data){
    state.token = data
    if(state.token){
       state.isLogin=true
    }else{
       state.isLogin=false
    } 
  },
  setUserInfo: function (state, user) {
    state.userInfo = user
  },
}

export const actions = {
  
  async nuxtServerInit({ commit }, { req }) {
 
    let cookie = req.headers.cookie;
    let json = cookieparser.parse(cookie);

    // 将cookie转成json对象（自己实现该方法）
    let token = json.token;
    commit('setToken', token);
  },

  /**
   * 获取用户信息
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async getUserInfo({state, commit}) {
    if (state.userInfo) {
      return
    }
    const data =  []
    commit('setUserInfo', data)
  },
}