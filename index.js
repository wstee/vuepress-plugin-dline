const { path } = require('@vuepress/shared-utils')
function color2Rgb(color) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var sColor = color.toLowerCase();
  if(sColor && reg.test(sColor)){
      if(sColor.length === 4){
          var sColorNew = "#";
          for(var i=1; i<4; i+=1){
              sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   
          }
          sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for(var i=1; i<7; i+=2){
          sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  
      }
      return sColorChange.join(",");
  }else{
      return sColor;  
  }
}
module.exports = (options ={}, ctx) => ({
  define() {
    let {
      zIndex = -1,
      opacity = .9,
      color = '#666',
      count = 166
    } = options;
    color = color2Rgb(color);
    return {
      LB_OPTIONS: { zIndex, opacity, color, count }
    }
  },
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js')
  ],

  globalUIComponents: 'DLine'

})