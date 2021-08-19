<template>
  <div class="app-container">
    <div class="con_box">
      <img src="@/assets/bianzu.png" alt="">
      <div class="dre">
        <span>{{orderObj.start}}</span>
        <img src="@/assets/jiantou.png" alt="">
        <span>{{orderObj.end}}</span>
      </div>
      <div class="time">
        <span>乘车人：{{orderObj.loginName}}</span>
      </div>
      <div class="time">
        <span>{{`${orderObj.stateDate} ${orderObj.startTime}`}}</span>
        <span class="small">开</span>
      </div>
      <div class="now_time">
        <span>当前时间：</span>
        <span v-show="Y">{{`${Y}-${M}-${D} ${h}:${m}:`}}</span>
        <span v-show="Y" class="big">{{s}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AppointmentSuccess",
    components: {

    },
    data() {
      return {
        orderObj: {},
        Y: '',
        M: '',
        D: '',
        h: '',
        m: '',
        s: '',
        timer: ''
      }
    },
    created() {
      this.orderObj = this.$route.query;
      this.setNow();
      this.timer = setInterval(this.setNow,1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      setNow() {
        let day = new Date();
        this.Y = day.getFullYear();
        this.M = day.getMonth()+1 >= 10 ? `${day.getMonth()+1}` : `0${day.getMonth()+1}`;
        this.D = day.getDate() >= 10 ? `${day.getDate()}` : `0${day.getDate()}`;
        this.h = day.getHours() >= 10 ? `${day.getHours()}` : `0${day.getHours()}`;
        this.m = day.getMinutes() >= 10 ? `${day.getMinutes()}` : `0${day.getMinutes()}`;
        this.s = day.getSeconds() >= 10 ? `${day.getSeconds()}` : `0${day.getSeconds()}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .app-container {
    padding: rem(24) rem(8) 0 rem(8);
  }
  .con_box {
    width: 100%;
    /*height: 65vmin;*/
    background-color: #fff;
    border-radius: rem(5);
    padding: rem(16) rem(20) rem(32) rem(20);
    img {
      display: block;
      width: rem(64);
      height: rem(64);
      margin: 0 auto;
    }
    .dre {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: rem(24);
      span {
        font-size: rem(32);
        width: 39%;
        font-weight: 500;
        color: #262626;
        text-align: center;
      }
      img {
        width: 11%;
        height: rem(16);
      }
    }
    .time {
      display: flex;
      align-items: flex-end;
      margin-top: rem(16);
      justify-content: center;
      span {
        font-size: rem(24);
        color: #262626;
      }
      span.small {
        font-size: rem(16);
        font-weight: 500;
        color: #666666;
        margin-left: rem(4);
      }
    }
    .now_time {
      display: flex;
      align-items: flex-end;
      margin-top: rem(8);
      justify-content: center;
      span {
        font-size: rem(16);
        color: #909399;
      }
      span.big {
        font-size: rem(20);
      }
    }
  }
</style>
