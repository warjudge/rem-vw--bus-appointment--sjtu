<template>
  <div class="app-container">
    <div class="line_box" v-for="(item, index) in list" :key="index">

      <div class="success" v-if="item.appointmentStatus==='SUCCESS'">
        <div class="success_top" @click="goToAppointmentSuccess(item)">
          <div class="success_top_lt">
            <div class="success_top_lt_top">
              <img src="@/assets/bianzu.png" alt="">
              <span>{{item.start}}</span>
              <img class="small" src="@/assets/qiehuan2.png" alt="">
              <span>{{item.end}}</span>
              <div v-if="item.isNonStop">直达</div>
            </div>
            <div class="success_top_lt_bt">{{`${item.stateDate} ${item.startTime}`}}</div>
          </div>
          <van-icon name="arrow" color="#909399" size="6vmin"/>
        </div>
        <div class="success_bt" v-if="item.canCancel">
          <div class="success_bt_btn" @click="cancelAppointment(item.id)">取消预约</div>
        </div>
      </div>

      <div class="fail" v-else>
        <div class="fail_top">
          <div class="fail_top_lt">
            <span>{{item.start}}</span>
            <img class="small" src="@/assets/qiehuan2.png" alt="">
            <span>{{item.end}}</span>
          </div>
          <div class="fail_top_rt" v-if="item.appointmentStatus==='INVALID'">已失效</div>
          <div class="fail_top_rt" v-if="item.appointmentStatus==='CANCEL'">已取消</div>
        </div>
        <div class="fail_ct">{{`${item.stateDate} ${item.startTime}`}}</div>
        <div v-if="!item.isNonStop" class="fail_bt">途径：{{item.stopStation}}</div>
      </div>

    </div>

  </div>
</template>

<script>
  import { Icon } from 'vant';
  import { MessageBox, Toast } from 'mint-ui';
  export default {
    name: "My",
    components: {
      vanIcon: Icon,
    },
    data() {
      return {
        list: [],
        btnDisabled: false,
      }
    },
    created() {
      // this.initData();
    },
    activated() {
      this.initData();
    },
    methods: {
      async initData() {
        let res = await this.$service.get(this.api.getBusAppointmentList);
        if (res.entities.length) {
          res.entities.forEach(item => {
            let arr = item.circuitName.split("->");
            item.start = arr[0];
            item.end = arr[1];
          })
        }
        this.list = res.entities;
      },
      cancelAppointment(id) {
        MessageBox.confirm('',{
          title: '提示',
          message: '是否确认该操作？',
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(async action => {
          if(this.btnDisabled) return;
          this.btnDisabled = true;
          let params = new FormData();
          params.append('appointmentId',id);
          let res = await this.$service.post(this.api.cancelBusAppointment,params);
          this.btnDisabled = false;
          if (res.errno === 0) {
            Toast({
              message: '取消成功',
              position: 'middle',
              duration: 2000
            });
            this.initData();
          }
        }).catch(err => {

        })
      },
      goToAppointmentSuccess(item) {
        this.$router.push({
          name: 'AppointmentSuccess',
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
    padding: rem(8) rem(8) rem(61) rem(8);
  }
  .line_box {
    background-color: #fff;
    margin: rem(6) 0;
  }
  .success {
    margin: 0 auto;
    .success_top {
      height: rem(84);
      padding: 0 rem(11);
      border-bottom: rem(1) solid #F3F3F3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .success_top_lt {
        display: flex;
        flex-direction: column;
        .success_top_lt_top {
          display: flex;
          align-items: center;
          img {
            width: rem(22);
          }
          span {
            font-size: rem(24);
            font-weight: 500;
            color: #333333;
            margin: 0 rem(6);
          }
          img.small {
            width: rem(14);
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
        }
        .success_top_lt_bt {
          font-size: rem(14);
          color: #666666;
          margin-top: rem(4);
          padding-left: rem(43);
        }
      }
    }
    .success_bt {
      height: rem(45);
      display: flex;
      flex-direction: row-reverse;
      padding: rem(6) rem(8) 0 0;
      .success_bt_btn {
        width: rem(81);
        height: rem(31);
        background-color: #FFFFFF;
        border: rem(1) solid #D7DADF;
        border-radius: rem(19);
        font-size: rem(14);
        color: #666666;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .fail {
    padding: rem(16) rem(12) rem(22) rem(16);
    color: #909399;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    .fail_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .fail_top_lt {
        height: rem(33);
        display: flex;
        align-items: center;
        padding-left: rem(25);
        span {
          font-size: rem(24);
          font-weight: 500;
          margin: 0 rem(8);
        }
        img.small {
          width: rem(14);
        }
      }
      .fail_top_rt {
        font-size: rem(14);
      }
    }
    .fail_ct,.fail_bt {
      margin-top: rem(4);
      height: rem(20);
      font-size: rem(14);
      padding-left: rem(32);
    }

  }
</style>
