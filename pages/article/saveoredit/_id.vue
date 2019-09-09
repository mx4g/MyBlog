<template>
  <div>
    
     <a-form
        id="formArticle"
        ref="formArticle"
        :form="form"
        @submit="handleSubmit"
      >
      <a-form-item>
         <div class="save-btn-block">
           <a-button type="dashed" 
             htmlType="submit"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
            >保存</a-button>
          </div>
      </a-form-item>

       <a-form-item
        >
            <a-input placeholder="请输入标题"  
               v-decorator="[
                'title',
                {rules: [{ required: true, message: '不能为空' }]}
              ]"
            />
       </a-form-item>

       <a-form-item
          
        >
            <a-input placeholder="请输入标签" 
               v-decorator="[
                'tag',
                {rules: [{ required: true, message: '不能为空' }]}
              ]"
            />
       </a-form-item>
     </a-form>     
    
     <div>
   
      
     </div>


     <div class="editor-container">
        <div class="mavonEditor">
          <no-ssr>
            <mavon-editor :toolbars="markdownOption" 
             
               v-model="handbook" 
               @change="changeData"
               ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"
               
              />
          </no-ssr>
        </div>
     </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      state: {
        time: 60,
        loginBtn: false
      },
      artile:{
        title:"",
        tag:"",
        firstImage:"",
        remark:"",
        content:"",
        htmlContent:"",
       
      },
      methodType:"post",
      successMsg:'',
      failMsg:"",
      form: this.$form.createForm(this),
 
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
       
      },
      handbook: "#### 开心的编写你的博客吧！",
      img_file:[],
      isSaveOrEdit:true
    };
  },

  created(){
 
    var id = this.$route.params.id
    if(id){
       
       this.successMsg="修改成功"
       this.failMsg="你没有修改，不需要提交，修改失败！"
       this.isSaveOrEdit=false
       this.artile.id=id
       this.methodType="put"
       this.getArticle(id)
           
    }else{
      this.isSaveOrEdit=true
      this.successMsg="保存成功";
      this.failMsg="保存失败"
    }
   

  },
  methods:{
        

       getSimpleText(html){
          html = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
          var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
          var text = html.replace(re1,'');//执行替换成空字符
          text = text.substring(0,140)
          return text;
        },

       getFirstImageUrl(html){
           var url = '';
            html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                  url =  capture;
            });
           return url
 
       },
       changeData(value, render) {
            // console.log(this.getSimpleText(render))
            //console.log(this.$refs.md)
            this.artile.content = value;
            this.artile.htmlContent = render;
            this.artile.remark=this.getSimpleText(render)
            
       },

       handleSubmit(e){

         this.state.loginBtn = true

         // 避免事件冒泡[阻止页面刷新]
         e.preventDefault();

         this.form.validateFields((err, values) => {
           if (!err) {
              this.artile.title = values.title
              this.artile.tag = values.tag

              this.saveData()
              
 
            }else{
              setTimeout(() => {
                this.state.loginBtn = false
              }, 600)
            }
        });
      
     },
     saveData(){
           
           //首图片保存
          this.artile.firstImage = this.getFirstImageUrl(this.artile.htmlContent)
         
  
           axios({
                method:this.methodType,
                url:'http://127.0.0.1:8080/v1/articles/',
                data:this.artile
            }).then((response) =>{           
              
              if( response.data >0 ){
                  this.$message.success(this.successMsg);
                
                  //跳得编辑页面
                  setTimeout(() => {
                    this.$router.push('/manager');
                  }, 600)
              }else{
                  this.$message.success(this.failMsg);
                  //跳得编辑页面
                  setTimeout(() => {
                    this.state.loginBtn = false
                  }, 600)
              }
            

            }).catch((error) =>{
                console.log(error)       
            })
       },
 

       // 绑定@imgAdd event
       $imgAdd(pos, $file) {
           
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append('fileUpload', $file);     
            
            this.img_file[pos] = $file;
          
            axios({
                url: 'http://127.0.0.1:8080/v1/uploads/',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
               
                 var url = res.data.url.replace(/\\/g,"/")
                 var imgUrl = "http://127.0.0.1:8080/"+ url;
                
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               
                this.$refs.md.$img2Url(pos, imgUrl);
               
            })
        },
        $imgDel(pos) {
            
            
            delete this.img_file[pos];
            //console.log(this.imgTemple)
         
        },
  
 

        //一下属于编辑页面

        getArticle(id){
           axios({
                method:'get',
                url:"http://127.0.0.1:8080/v1/articles/"+id,
            }).then((response) =>{  
 
                this.artile = response.data
             
                //表单赋值
                this.handbook=this.artile.content              
                this.form.setFieldsValue({
                  title: this.artile.title,
                  tag:this.artile.tag
                })

 
            }).catch((error) =>{
                console.log(error);  
            })
        }
  }
};
</script>

<style scoped>
.save-btn-block{
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.editor-container{
  width: 100%;

  overflow: hidden;
}
.mavonEditor {
  width: 100%;
  height: 100vh;
}
</style>