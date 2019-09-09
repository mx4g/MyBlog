<template>
  <div>
    <Header :menuKeyProps="menuKey"/>
  
    <div v-if="isLogin==false" class="container">
     
      <div class="title">欢迎，请登录</div>
     
      <a-form
        id="formLogin"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
          >

        <a-form-item>
         
          <a-input
            size="large"
            type="text"
            placeholder="账户: admin"
            v-decorator="[
              'username',
              {rules: [{ required: true, message: '请输入帐户名' }],
              validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>

        </a-form-item>

        <a-form-item>
        
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="密码: admin"
            v-decorator="[
              'password',
              {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>

        </a-form-item>

        <a-form-item>
        
          <a-checkbox v-decorator="['rememberMe']" >自动登录</a-checkbox>
      
        </a-form-item>

        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >确定</a-button>
        </a-form-item>

      </a-form> 
   
    </div>
  
    <div v-else class="container">
      你已经登录了，o(*￣︶￣*)o
    </div>
  
  </div>
    
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import Header from '~/components/header'
 export default {
  components: {
    Header
  },
  data () {
     return {
      menuKey:"login",
      checked:true,
      isLogin:this.$store.state.isLogin,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false
      }
    }
   },
   mounted(){
     
   },
   methods: {
     handleSubmit(e){

        this.state.loginBtn = true
         // 避免事件冒泡[阻止页面刷新]
        e.preventDefault();

        this.form.validateFields((err, values) => {
          if (!err) {
         
             axios.post("http://127.0.0.1:8080/v1/users/login",values).then((res)=>{
                           
                  if(!Boolean(res.data.state)){
                    this.$message.error('用户名密码有误！');
                    setTimeout(() => {
                      this.state.loginBtn = false
                    }, 600)
                  }else{
                      Cookies.set('token', res.data.token, { expires: 2,path: '/' })
                      
                      this.$store.commit('setToken', res.data.token)
                    
                      this.$message.success('登录成功');
                      setTimeout(() => {
                        this.$router.push('/');
                    }, 600)
                  }
                       
                     
                       

                }).catch((error) =>{
                  console.log(error)
           })
            

          }else{
            setTimeout(() => {
              this.state.loginBtn = false
            }, 600)
          }
        });
      
     }
   }
 }
</script>


<style scoped>
  
 .container {
     margin: 100px auto;
     width: 500px;
     padding: 20px;
     background: white
 }
 .title{
     text-align: center;
     padding: 20px;
     font-size: 20px;

 }
 .login-button{
     width: 100%;
 }
</style>
