<template>
  <div class="app-container">
    <div class="direction">
      <div class="direction_text" v-if="lineType==='MTOX'">
        <span>闵行</span>
        <img src="@/assets/daoda.png" alt="">
        <span>徐汇</span>
      </div>
      <div class="direction_text" v-else>
        <span>徐汇</span>
        <img src="@/assets/daoda.png" alt="">
        <span>闵行</span>
      </div>
      <div class="direction_change" @click="changeLineType()">
        <img class="direction_change_img" src="@/assets/qiehuan.png" alt="">
        <div class="direction_change_text">换向</div>
      </div>
    </div>
    <div class="time_bar">
      <div class="time_bar_item" :class="busDate===0?'active':''" @click="changeTime(0)">
        <div class="time_bar_item_til" :class="busDate===0?'active':''">今天</div>
        <div class="time_bar_item_time">{{`${now.year}-${now.month}-${now.day}`}}</div>
      </div>
      <div class="time_bar_item" :class="busDate===1?'active':''" @click="changeTime(1)">
        <div class="time_bar_item_til" :class="busDate===1?'active':''">明天</div>
        <div class="time_bar_item_time">{{`${tomorrow.year}-${tomorrow.month}-${tomorrow.day}`}}</div>
      </div>
    </div>
    <div class="con_box">
      <div class="con_item" v-for="(item, index) in shiftList" :key="index">
        <div class="con_item_top">
          <div class="con_item_top_lt">{{item.startTime}}</div>
          <div class="con_item_top_rt" v-if="item.isShowLeft">
            <span>剩余</span>
            <span class="special">{{item.leftSeat}}张</span>
          </div>
        </div>
        <div class="con_item_ct">
          <span>{{item.start}}</span>
          <img src="@/assets/qiehuan2.png" alt="">
          <span>{{item.end}}</span>
          <div v-if="item.isNonStop">直达</div>
          <span v-else class="stop">途径：{{item.stopStation}}</span>
        </div>
        <div class="con_item_bt">
          <div class="con_item_bt_btn" v-if="item.status==='CAN_RESERVE'" @click="goToConfirm(item)">预约</div>
          <div class="con_item_bt_btn NOT_RESERVE" v-if="item.status==='NOT_RESERVE'">预约</div>
          <div class="con_item_bt_btn NOT_RESERVE" v-if="item.status==='RESERVER_SUCCESS'&&!item.isShowLeft">预约成功</div>
          <div class="con_item_bt_btn RESERVER_SUCCESS" v-if="item.status==='RESERVER_SUCCESS'&&item.isShowLeft">预约成功</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ShiftList",
    components: {
    },
    data() {
      return {
        lineType: 'MTOX', //MTOX: 闵行->徐汇, XTOM:徐汇->闵行
        busDate: 0,
        now: {
          year: '',
          month: '',
          day: ''
        },
        tomorrow: {
          year: '',
          month: '',
          day: ''
        },
        shiftList: [],
      }
    },
    created() {
      this.setNowAndTomorrow();
      // this.initData();
    },
    activated() {
      this.initData();
    },
    methods: {
      setNowAndTomorrow() {
        let day = new Date();
        this.now.year = day.getFullYear();
        this.now.month = day.getMonth()+1 < 10 ? `0${day.getMonth()+1}`:day.getMonth()+1;
        this.now.day = day.getDate() < 10 ? `0${day.getDate()}`:day.getDate();

        day.setTime(day.getTime()+24*60*60*1000);
        this.tomorrow.year = day.getFullYear();
        this.tomorrow.month = day.getMonth()+1 < 10 ? `0${day.getMonth()+1}`:day.getMonth()+1;
        this.tomorrow.day = day.getDate() < 10 ? `0${day.getDate()}`:day.getDate();
      },
      changeLineType() {
        this.lineType = this.lineType==='MTOX'?'XTOM':'MTOX';
        this.initData();
      },
      changeTime(num) {
        this.busDate = num;
        this.initData();
      },
      async initData() {
        let date = '';
        let sel = this.busDate === 0? this.now : this.tomorrow;
        date = `${sel.year}-${sel.month}-${sel.day}`
        let params = {
          lineType: this.lineType,
          date: date,
        }
        let res = await this.$service.get(this.api.getBusScheduleList, { params: params });
        // console.log(res);
        if (res.entities.length) {
          res.entities.forEach(item => {
            let arr = item.circuitName.split("->");
            item.start = arr[0];
            item.end = arr[1];

            let shiftDate = `${item.stateDate} ${item.startTime}:00`;
            shiftDate = shiftDate.replace(/-/g,'/');
            let shiftTimestamp = new Date(shiftDate).getTime();
            let now = (new Date()).getTime();
            if((+shiftTimestamp) - (+now) >= 30*60*1000) {
              item.isShowLeft = true;
            }else {
              item.isShowLeft = false;
            }
          })
        }
        this.shiftList = res.entities;
      },
      goToConfirm(item) {
        this.$router.push({
          name: 'ConfirmOrder',
          query: {
            ...item
          }
        })
      }
    },
  };
</script>

<style lang="scss" scoped>
  .app-container {
    padding-top: rem(101);
    padding-bottom: rem(61);
    background-color: #F1F1F1;
  }
  .direction {
    height: rem(48);
    width: 100%;
    max-width: $max-width * 1px;
    background-color: #096DD9;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 rem(10);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include fixedCenter;
    .direction_text {
      display: flex;
      align-items: center;
      font-size: rem(21);
      font-weight: 500;
      color: #FFFFFF;
      img {
        width: rem(16);
        margin: 0 rem(6);
      }
    }
    .direction_change {
      height: rem(48);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .direction_change_img {
        width: rem(18);
      }
      .direction_change_text {
        font-size: rem(14);
        color: #FFFFFF;
      }
    }
  }
  .time_bar {
    height: rem(54);
    width: 100%;
    max-width: $max-width * 1px;
    background-color: #ffffff;
    position: fixed;
    top: rem(48);
    left: 0;
    display: flex;
    justify-content: space-around;
    @include fixedCenter;
    .time_bar_item {
      width: rem(98);
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .time_bar_item_til{
        font-size: rem(16);
        color: #666666;
        line-height: rem(22);
      }
      .time_bar_item_til.active {
        font-weight: 500;
        color: #222222;
      }
      .time_bar_item_time {
        font-size: rem(12);
        color: #909399;
        line-height: rem(17);
      }
    }
    .time_bar_item.active {
      border-bottom: rem(3) solid #096DD9;
    }
  }
  .con_box {
    width: 100%;
    padding: rem(16) rem(8) 0 rem(8);
  }
  .con_item {
    /*width: rem(359);*/
    height: rem(141);
    background-color: #fff;
    margin: 0 auto;
    margin-bottom: rem(6);
    padding: rem(16) rem(12) rem(10) rem(16);
    .con_item_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .con_item_top_lt {
        font-size: rem(24);
        font-weight: 500;
        color: #333333;
        line-height: rem(33);
      }
      .con_item_top_rt {
        font-size: rem(14);
        color: #666666;
        line-height: rem(20);
        .special {
          color: #262626;
        }
      }
    }
    .con_item_ct {
      height: rem(40);
      border-bottom: rem(2) solid #F3F3F3;
      display: flex;
      align-items: center;
      span {
        font-size: rem(14);
        color: #666666;
        line-height: rem(20);
      }
      img {
        width: rem(14);
        height: rem(14);
        margin: 0 rem(6);
      }
      div {
        width: rem(35);
        height: rem(18);
        border-radius: rem(3);
        border: rem(1) solid #979797;
        font-size: rem(12);
        color: #262626;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: rem(6);
      }
      span.stop {
        margin-left: rem(6);
      }
    }
    .con_item_bt {
      display: flex;
      flex-direction: row-reverse;
      padding-top: rem(9);
      .con_item_bt_btn {
        width: rem(83);
        height: rem(32);
        background-color: #016AED;
        border-radius: rem(16);
        font-size: rem(14);
        color: #FFFFFF;
        line-height: rem(32);
        text-align: center;
      }
      .con_item_bt_btn.NOT_RESERVE {
        background-color: #D7DADF;
      }
      .con_item_bt_btn.RESERVER_SUCCESS {
        background-color: #5A9218;
      }
    }
  }
</style>
