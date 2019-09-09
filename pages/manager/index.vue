<template>
  <div>
      <Header :menuKeyProps="menuKey"/>
      
      <Body @searchArticle="getAricleList">
        
        <div class="userInfo">
          <div class="userAvatar">
              <div>
                <a-avatar :size="64" slot="avatar" src="https://pic.qqtn.com/up/2019-7/2019073010080939511.jpg" />
                <span>混世魔王</span>
              </div>
              <div class="addBtn">
                <a-button type="primary" shape="circle" icon="plus" @click="addArticle"/>
              </div>
          </div>
        
          <div class="userInfoDesc">我命由我不由天，是魔是仙，我自己说了算。若命运不公，我便和它斗到底。</div>
        </div>
        
        <div class="article">
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

              <template slot="actions" v-for="{type, text} in actions">
  
                <span  v-if="type !='edit'" :key="type" @click="deleteArticle(item.id)">
                  <a-icon :type="type" style="margin-right: 8px" />
                  {{text}}
                </span>

                <span  v-else :key="type">
                  <nuxt-link target="_blank"  :to="{ name: 'article-saveoredit-id',params:{id:item.id}}">
                      <a-icon :type="type" style="margin-right: 8px" />
                      {{text}}
                  </nuxt-link>
                </span>

              </template>
           
              <a-list-item-meta
               >
               <nuxt-link target="_blank" slot="title" :to="{ name: 'article-id',params:{id:item.id}}">{{item.title}}</nuxt-link>
                
              </a-list-item-meta>
               {{item.remark}}
            </a-list-item>
          </a-list>
        </div>
 
      </Body>

      <Footer />
  </div>
</template>

<script >
import axios from 'axios'
import Header from '~/components/header'
import Body from '~/components/body'
import Footer from '~/components/footer'
export default {
  components: {
    Header,
    Body,
    Footer
  },
  data () {
     return {
    
      loadingMore:false,
      listData:[],
      page:1,
      pageSize:5,
      total:0,
      menuKey:"manager",
      searchValue:"",
      actions: [
        { type: 'delete', text: '删除' },
        { type: 'edit', text: '编辑' },
      ],
     }
  },
  created(){
    this.getAricleList(this.searchValue)
    
  },
  methods: {
    onChange(page) {
        this.loadingMore=true
        this.page = page
        this.getAricleList(this.searchValue)
    },
    addArticle(){
      let routeData = this.$router.resolve({ path: '/article/saveoredit' });
      window.open(routeData.href, '_blank');
    },
    deleteArticle(id){
      var self = this
     
       this.$confirm({
          title: '确定要删除吗?',
        
          onOk() {
            return  self.toDeleteAricle(id)
          },
          onCancel() {},
      });
       
    },
    

    toDeleteAricle(id){
      axios.delete("http://127.0.0.1:8080/v1/articles/"+ id).then((res)=>{
                    
                    if(res.data >0){
                      this.$message.success('删除成功');
                      this.getAricleList()
                    }  
                      
                }).catch((error) =>{
                 console.log(error);  
       })
    },
    getAricleList(val){
        this.loadingMore = true
        this.searchValue =val
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
 .userInfo{
   background: white;
   padding: 20px;
  
 }
 .userAvatar{
   display: flex;
   justify-content: space-between;
 }
 .userInfoDesc{
   padding-top:10px 
 }

 .article{
   margin-top: 20px;
   background: white;
   padding: 20px;
 }

.pageFooter{

  text-align: center;
} 
 
</style>
