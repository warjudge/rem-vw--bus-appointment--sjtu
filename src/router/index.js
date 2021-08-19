import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/index"),
    meta: {
      title: "校车间通勤班车预约"
    },
    children: [
      {
        path: "",
        name: "ShiftList",
        component: () => import("../views/Home/ShiftList"),
      },
      {
        path: "/my",
        name: "My",
        component: () => import("../views/Home/My"),
      },
    ]
  },
  {
    path: "/confirmOrder",
    name: "ConfirmOrder",
    component: () => import("../views/ConfirmOrder.vue"),
    meta: {
      title: "确认订单"
    }
  },
  {
    path: "/appointmentSuccess",
    name: "AppointmentSuccess",
    component: () => import("../views/AppointmentSuccess.vue"),
    meta: {
      title: "预约成功"
    }
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition && to.name == "PaymentDetail") {
  //     return savedPosition;
  //   }
  //   return { x: 0, y: 0 };
  // }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (from.name === 'AppointmentSuccess' && to.name === 'ConfirmOrder') {
    router.go(-1);
  }else {
    next();
  }

  // if (to.matched.some(record => record.meta.title)) {
  //
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   // if (!auth.loggedIn()) {
  //   //   next({
  //   //     path: '/login',
  //   //     query: { redirect: to.fullPath }
  //   //   })
  //   // } else {
  //   //   next()
  //   // }
  // } else {
  //   next() // 确保一定要调用 next()
  // }
});

export default router;
