<template>
  <div class="app-container">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar route v-model="active" active-color="#262626" inactive-color="#909399">
      <van-tabbar-item to="/" replace name="shiftList">
        <span class="tabbar_text_custom">班次列表</span>
        <template #icon="props">
          <img :src="props.active ? leftTabIcon.active : leftTabIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my" replace name="my">
        <span class="tabbar_text_custom">我的预约</span>
        <template #icon="props">
          <img :src="props.active ? rightTabIcon.active : rightTabIcon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import appHeader from '@/components/AppHeader';
import { Tabbar, TabbarItem } from 'vant';
import shiftList from './ShiftList';
import my from './My';
document.title = "校车间通勤班车预约";

export default {
  name: "Home",
  components: {
    appHeader,
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
    shiftList,
    my,
  },
  data() {
    return {
      active: 'shiftList',
      leftTabIcon: {
        active: require('../../assets/banshilight.png'),
        inactive: require('../../assets/banshi.png')
      },
      rightTabIcon: {
        active: require('../../assets/wodelight.png'),
        inactive: require('../../assets/wode.png')
      }
    }
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
  .van-tabbar {
    height: rem(61);
    width: 100%;
    max-width: $max-width * 1px;
  }
  .van-tabbar.van-tabbar--fixed {
    @include fixedCenter;
  }
  .tabbar_text_custom {
    font-size: rem(14);
    line-height: rem(20);
  }
  .tabbar_text_custom.active {
    font-weight: 500;
    color: #262626;
  }
  .van-tabbar-item__icon img {
    height: rem(25);
  }
</style>
