<template>
    <div class="container">
 
         <div class="left">
           <!-- 插槽 -->
           <slot></slot>
         </div>

         <div class="right">
           <div class="search-main">
            <a-input-search
              placeholder="输入关键字搜索"
              style="width: 216px;height: 30px"
              v-model="searchValue"
              @search="onSearch"
            />
           </div>
            <div class="column-category">
              <div class="type-content">
                <a-icon type="read" theme="filled" />
                <span>栏目分类</span>
              </div>
            </div>
            <div class="column-category">
              <div class="type-content">
                <a-icon type="tags" theme="filled" />
                <span>标签群</span>
              </div>
               <div>
                  <a-tag color="pink">pink</a-tag>
                  <a-tag color="red">red</a-tag>
                  <a-tag color="orange">orange</a-tag>
                  <a-tag color="green">green</a-tag>
                  <a-tag color="cyan">cyan</a-tag>
                  <a-tag color="blue">blue</a-tag>
                  <a-tag color="purple">purple</a-tag>
                </div>
            </div>
          
         </div>

    </div>
</template>

<script>
export default {
   data(){
     return {
       searchValue:""
     }
   },
   methods: {
  
     onSearch(){
       this.$emit("searchArticle",this.searchValue)
     },
    
  
  }
}
</script>

<style scoped>

.container{
  margin: 20px auto;
  width: 1000px;
  overflow: hidden;
}

.right{
  width: 260px;
  overflow:hidden;
  float: left;
}

.right div {
  margin-bottom: 20px;
  margin-left: 20px;
  background-color: white;
}
 
.left{
  overflow:hidden;
  width: 740px;
  padding-left: 10px;
  float: left;
}


.search-main{
  overflow: hidden;
  padding: 12px;
 
}

.user_place{
  height: 300px;
  background: green
}

.column-category {
  height: 300px;
  padding: 12px;
  
}

.column-category div {

    margin-left:0px !important;
}

.type-content {
  font-size:14px;
  font-weight:bold;
  padding-bottom:12px;border-bottom:1px solid #eee;
}

</style>


