import Cookies from 'js-cookie'

export default function ({store, route, redirect, req}) {

  const token = Cookies.get('token')

  if (token) {
    store.commit('setToken', token)
   
  }
}
