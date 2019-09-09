<template>
  <div>
      <Header :menuKeyProps="menuKey"/>
      
      <Body  @searchArticle="jumpToHomePage">
        <div>
          <img :src="image" style="wi:left"/>
        </div>
      </Body>

      <Footer />
  </div>
</template>

<script >
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
      image:"https://c-ssl.duitang.com/uploads/item/201701/03/20170103143749_nmrkU.jpeg",
      menuKey:"about"
     }
   },
  
  methods: {
    jumpToHomePage:function(){
        this.$router.push('/');
    }
  }
}
</script>


<style scoped>
 /* .container{
  margin: 20px auto;
  width: 1000px;
  overflow: hidden;
} */
</style>
