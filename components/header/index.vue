 <template>
  <div>   
      <div class="header">
        
         <div class="menu-main">
        
           <div class="menu-left">
             活抓一只程序猿
           </div>

           <div class="menu-right">
              <a-menu
              class="top-menu"
              v-model="current"
              mode="horizontal"
              @click="menuClik"
            >
              <a-menu-item key="index">
                首页
              </a-menu-item>
              <a-menu-item key="about">
                关于
              </a-menu-item>
              <a-menu-item v-if="isLogin==false" key="login">
                登录
              </a-menu-item>
         
              <a-menu-item v-if="isLogin==true" key="manager">
                管理
              </a-menu-item>
              
              <a-menu-item v-if="isLogin==true" key="logout">
                注销
              </a-menu-item>
           </a-menu>
           </div>

           
         </div>
       

      </div>
    
    
    
  </div>
</template>

<script>
 import Cookies from 'js-cookie'
 export default {
   props:{
    menuKeyProps:{
        type:String,
        default:"index"
    }
   },
  
  data() {
   
     return {
       current: [this.menuKeyProps],
       menuKey:this.menuKeyProps,
       isLogin:this.$store.state.isLogin,
     }
  },
  
 

  created(){
    
  },

 
 
  mounted(){
       
  },
  
  watch: {

   '$route': function (to, from) {
　　　　// 拿到目标参数 to.query.id 去再次请求数据接口
　　　　this.loadPageData(to.query.id)
　　},

   menuKey:function(val){
     
      if(val=="index"){
           this.$router.push('/');
      }

      if(val=="login"){
           this.$router.push('/login');
      }
      
      if(val=="about"){
           this.$router.push('/about');
      }
      
      if(val=="manager"){
           this.$router.push('/manager');
      }

     }
  },
  methods:{
        showConfirm() {
          let self = this;
          this.$confirm({
            title: '确定要退出登录吗?',
            
            onOk() {
               self.logout()
            },
            onCancel() {},
          });
        },
       logout(){

          Cookies.remove('token');
          this.$store.commit('setToken', "")
          this.$message.success('注销中...');
          setTimeout(() => {
            //this.$router.push('/login',);
            // this.$router.push({path:'/login',query:{
            //   rand:Math.ceil(Math.random()*10000)
            //  }
            // })
            location.href="/login"
          }, 600)

       },
      
       menuClik(item){
         if(item.key=="index"){
                this.menuKey="index"
            }
            if(item.key=="login"){
                this.menuKey="login"
            }
            
            if(item.key=="about"){
                this.menuKey="about"
            }
            if(item.key=="logout"){
              
                this.menuKey="logout"
                this.showConfirm()
                //this.logout()
            }
            if(item.key=="manager"){
                this.menuKey="manager"
            }
         },
     }
 }
</script>

<style>

.header{
  width: 100%;
  height: 60px;
  background: white;
  border-bottom: 1px solid #e8e9e7;
}
 

.menu-main{
  margin: 0px auto;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  
}

.menu-left{
  width: 240px;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  
}

.menu-right{
 height: 60px;

}

.top-menu{
   border-bottom: none;
   
}

.top-menu li {
  height: 60px ;
  margin-right: 30px;
}


</style>

