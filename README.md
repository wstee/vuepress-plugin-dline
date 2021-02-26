## 安装
``npm i vuepress-plugin-linebg -D``
## 使用
```js
// docs/.vuepres/config.js
module.exports = {
  plugins: [
    [
      'linebg',
      {
        zIndex: -1, // 背景层级
        opacity: .9, // 背景透明度
        color: '#666', // 线条颜色 16进制
        count: 166 // 线条密度
      }
    ]
  ]
}

```