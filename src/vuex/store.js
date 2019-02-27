import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
    handleUserName: (state, information) => {
        state.information = information
            // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
        localStorage.setItem('information',JSON.stringify(information))
    }
}
const state = {
    information: {} || localStorage.getItem(JSON.parse(information)),
}

const getters = {
    userName: (state) => state.information,
}

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
export default  store; 