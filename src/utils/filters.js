import Vue from "vue";
import store from "../store";
Date.prototype.format = function(fmt) {
  let o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

Vue.filter("fmtTime", time => {
  if (!time) return "";
  return new Date(time).format("yyyy-MM-dd hh:mm");
});

Vue.filter("fmtDate", time => {
  return new Date(time).format("yyyy-MM-dd");
});

function getweekday(date) {
  const weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
  return `周${weekArray[new Date(date).getDay()]}${date.getMonth() +
    1}月${date.getDate()}日 `;
}

Vue.filter("fmtDateWithDay", dateStr => {
  const d = new Date(dateStr.replace(/-/g, "/"));
  return getweekday(d);
});

Vue.filter("fmtDateYm", value => {
  const date = new Date(value.replace(/-/g, "/"));

  return `${date.getMonth() + 1}月${date.getDate()}日 ${
    date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
  }:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}`;
});

Vue.filter("fmtDateYMD", value => {
  const date = new Date(value.replace(/-/g, "/"));
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
});

Vue.filter("fmtDateYMDhm", value => {
  const date = new Date(value.replace(/-/g, "/"));
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${
    date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
  }:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}`;
});

Vue.filter("getActivityType", type => {
  if (!type) {
    return "";
  }
  return store.state.activities.find(item => item.id == type).name;
});

Vue.filter("fmtMoney", value => {
  if (value == Math.floor(value)) {
    value = Math.floor(value);
  }
  return value;
});
