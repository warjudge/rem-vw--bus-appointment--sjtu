<template>
  <div class="app-container">
    <div class="til_line">订单详情</div>
    <div class="con_line">
      <div>路线</div>
      <div class="con_line_rt">
        <span>{{orderObj.start}}</span>
        <img src="@/assets/qiehuan2.png" alt="">
        <span>{{orderObj.end}}</span>
      </div>
    </div>
    <div class="con_line">
      <div>日期</div>
      <div>{{orderObj.stateDate}}</div>
    </div>
    <div class="con_line">
      <div>班次</div>
      <div>{{orderObj.startTime}}</div>
    </div>
    <div class="til_line">订单须知</div>
    <div class="tip_line">
      <div>1.每日班次每人限预定不超过4次；</div>
      <div>2.可预约发车前半小时至第二天所有班次；</div>
      <div>3.班次发车前1小时以上可以取消预约；</div>
      <div>4.预约3次未进行乘坐将列入黑名单。</div>
    </div>
    <div class="bt_btn">
      <div class="bt_btn_lt" @click="goBack()">取消</div>
      <div class="bt_btn_rt" @click="appointBus()">确认</div>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/components/AppHeader';
  export default {
    name: "ConfirmOrder",
    components: {
      appHeader,
    },
    data() {
      return {
        orderObj: {},
        btnDisabled: false,
      }
    },
    created() {
      this.orderObj = this.$route.query;
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      async appointBus() {
        if(this.btnDisabled) return;
        this.btnDisabled = true;
        let params = new FormData();
        params.append('busScheduleId',this.orderObj.id);
        let res = await this.$service.post(this.api.saveBusAppointment,params);
        this.btnDisabled = false;
        if (res.errno === 0) {
          this.$router.push({
            name: 'AppointmentSuccess',
            query: {
              ...this.orderObj
            }
          })
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .app-container {
    padding-bottom: rem(71);
    background: #F1F1F1;
  }
  .til_line {
    display: flex;
    align-items: center;
    height: rem(52);
    width: 100%;
    padding-top: rem(4);
    padding-left: rem(16);
    font-size: rem(16);
    font-weight: 400;
    color: #909399;
  }
  .con_line {
    width: 100%;
    height: rem(56);
    padding: 0 rem(8) 0 rem(16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #262626;
    font-size: rem(16);
    background-color: #fff;
    border: rem(1) solid #E9E9E9;
    .con_line_rt {
      display: flex;
      align-items: center;
      span {
        color: #262626;
        font-weight: 500;
      }
      img {
        width: rem(14);
        height: rem(14);
        margin: 0 rem(8);
      }
    }
  }
  .tip_line {
    height: rem(148);
    width: 100%;
    background-color: #fff;
    font-size: rem(16);
    line-height: rem(24);
    padding: rem(18) 0 0 rem(16);
  }
  .bt_btn {
    width: 100%;
    max-width: $max-width * 1px;
    height: rem(72);
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    line-height: rem(72);
    font-size: rem(18);
    font-weight: 500;
    text-align: center;
    @include fixedCenter;
    .bt_btn_lt {
      width: 37%;
      background-color: #fff;
      color: #666666;
    }
    .bt_btn_rt {
      width: 63%;
      background-color: #016AED;
      color: #fff;
    }
  }

</style>
