<template>
  <div class="header">
    <div class="header_icon" @click="goBack()">
      <van-icon name="arrow-left" color="#ffffff" size="6vw"/>
    </div>
    <div class="header_text">{{title}}</div>
  </div>
</template>

<script>
  import { Icon } from 'vant';
  export default {
    name: "AppHeader",
    props: {
      title: {
        type: String
      }
    },
    components: {
      vanIcon: Icon,
    },
    data() {
      return {
      }
    },
    created() {},
    methods: {
      goBack() {
        this.$emit('goBack');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    width: 100vw;
    height: 15vw;
    background-color: #096DD9;
    position: fixed;
    left: 0;
    top: 0;
  }
  .header_icon  {
    position: absolute;
    top: 0;
    left: 0;
    height: 15vw;
    width: 15vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header_text {
    font-size: 5vw;
    color: #FFFFFF;
    text-align: center;
    line-height: 15vw;
  }
</style>
