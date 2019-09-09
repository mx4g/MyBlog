<template>
  <div>   
      <Header :menuKeyProps="menuKey"/>
      
      <Body @searchArticle="getAricleList">
        <div>
          <a-list
            itemLayout="vertical"
            size="large"
            :dataSource="listData"
            :loading="loadingMore"
            >
            <div slot="footer" class='pageFooter'><a-pagination  @change="onChange" :pageSize="pageSize" :total="total" /></div>
             
            <a-list-item class="list-item" slot="renderItem" slot-scope="item, index" key="item.title">
              
              <nuxt-link target="_blank" slot="extra" :to="{ name: 'article-id',params:{id:item.id}}">
                 <img  v-if="item.firstImage"   width="222" height="140" alt="logo" :src="zyImageUrl(item.firstImage)" />
              </nuxt-link>
             
             
              <a-list-item-meta
               >
                <nuxt-link target="_blank" slot="title" :to="{ name: 'article-id',params:{id:item.id}}">{{item.title}}</nuxt-link>
                <a-avatar slot="avatar" src="https://pic.qqtn.com/up/2019-7/2019073010080939511.jpg" />
              </a-list-item-meta>

             {{item.remark}}
            
            </a-list-item>
          </a-list>


        </div>
      </Body>
      
      <Footer />
 
  </div>
</template>
 
<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import Header from '~/components/header'
import Body from '~/components/body'
import Footer from '~/components/footer'
 
export default {
  components: {
    Header,
    Body,
    Footer
  },
  
//  async fetch ({ store, params }) {
    
//      var token = Cookies.get('token')
//      store.commit('home/setToken', token);
//   },

  created(){

     this.getAricleList(this.searchValue)
   
   
  },
  async asyncData(){
    return {
      page:1, 
      current: ['index'],
      listData:[],
      menuKey:"index",
      loadingMore:false,
      pageSize:5,
      total:0,
      searchValue:"",
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
        { type: 'edit', text: '编辑' },
      ],
    }
  },
  watch: {
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
     }
  },
  methods: {
    onChange(page) {
     
        this.page = page
       this.getAricleList(this.searchValue)
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
    },
    getAricleList(val){
        this.searchValue = val
        this.loadingMore=true
        axios.get("http://127.0.0.1:8080/v1/articles/all",{
                    params:{page:this.page,title:val},

                }).then((res)=>{
                
                  this.loadingMore=false    
                  this.listData = res.data.data
                
                  this.total=res.data.total
            }).catch((error) =>{
          console.log(error);  
        })
    },

    zyImageUrl(url){
      return url.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    }
  
  }
 
}
 </script>
 

<style scoped>
 
 
.pageFooter{

  text-align: center;
} 
 
.list-item {
 
  background: white !important;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  border-bottom: none;
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
