# h5

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration

此项目对移动端适配问题的三种解决方案进行尝试：

#### 一.rem + vw方案：

* 1.可参考global.scss中
```javascript
//---------------rem结合vw的方式
// 页面最大宽度
$max-width:1024;

// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vw_fontsize: 75; // iPhone 6尺寸的根元素大小基准值

// 开发中页面元素大小转换函数（ 如15px，写rem(15)即可 ）
@function rem($px) {
@return ($px / $vw_fontsize ) * 1rem;
}

// 对于不同屏幕宽度，需要额外设置根节点的字体大小
html {
font-size: ($vw_fontsize / ($vw_design / 2)) * 100vw;
@media screen and (max-width: 300px) {
 font-size: 64px;
}
@media screen and (min-width: 750px) {
 font-size: 108px;
}
}
// ---------------rem结合vw的方式
```
* 2.适配结果：综合了rem以及vw的优点


#### 二.vw

* 1.使用时，把设计稿的宽度（通过工具，如蓝湖）调整成100，然后开发中直接使用vw作为单位即可；如需适配PC端，则使用vmin作为单位
* 2.适配结果：大屏幕时，体验不好，太过紧凑


#### 三.尚未尝试过的rem + vw

* 1.
```javascript
//  -------------rem结合vw的方式
// 也可以设置页面最大宽度
// $max-width:1024;

//$rootSize: 16!default;
//$designWidth: 750!default;
//$designRatio: 2!default;
//
//@function rem($px) {
//  @return $px / $rootSize * 1rem;
//}
//@function rootVw() {
//  @return $rootSize / $designWidth * $designRatio * 100vmin;
//}
//html{
//  font-size: rootVw();
//}
// --------------rem结合vw的方式
```
