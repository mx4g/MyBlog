<template>
  <div>   
      <Header :menuKeyProps="menuKey"/>
      <div class="breadcrumb-main">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>文章</a-breadcrumb-item>
          
        </a-breadcrumb>
      </div>
      <div class="container">
 
         <div class="article-content">
            <div class="article-title">{{this.articleData.title}}</div>
            <div  class="markdown-body"  v-html="articleData.htmlContent"/>
        </div>
         <div class="article-comment">
            评论(0)
         </div>
 
      </div>
  
    
     <Footer />
  </div>
</template>
 
<script>
import axios from 'axios'
import Header from '~/components/header'

import Footer from '~/components/footer'
 
 
export default {
  components: {
    Header,
    Footer
  },
  
  fetch ({ store, params }) {
    
     
  },
   
  mounted(){
 
  
    this.getArticle(this.$route.params.id);
   

  },
  async asyncData(){
    
    return {
      menuKey:"",
      articleData:{},
      current: ['mail'],
     
      url:"http://127.0.0.1:8080/v1/articles/31",
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
    }
  },
  methods: {
    getArticle(id){
        axios({
              method:'get',
              url:"http://127.0.0.1:8080/v1/articles/"+id,
          }).then((response) =>{           
              this.articleData = response.data
          }).catch((error) =>{
              console.log(error);  
          })
     }
  }
 
}
</script>
 

<style scoped>
 
.container{
  margin: 20px auto;
  width: 1000px;

  min-height: 100px;
  overflow: hidden;
}

.article-content{
    background: white;
    padding: 20px;
    margin-bottom: 20px;
    min-height: 100px;
    overflow: hidden;
}

.article-title{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
}

.article-comment{
    background: white;
    min-height: 100px;
    overflow: hidden;
}

.breadcrumb-main{
  margin: 0 auto;
  padding-top: 20px;
  width: 1000px;
  overflow: hidden;
}

 
.header{
  width: 100%;
  height: 60px;
  background: white;
  border-bottom: 1px solid #e8e9e7;
}
.footer{
  width: 100%;
  height: 60px;
  background: white;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
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
