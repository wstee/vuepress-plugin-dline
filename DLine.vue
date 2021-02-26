<template>
  <transition name="fade">
    <canvas id="DLine" class="line-bg"></canvas>
  </transition>
</template>
<script>
export default {
  name: 'DLine',
  data() {
    return {
      ...LB_OPTIONS
    }
  },
  mounted () {
    let winWidth, winHeight, u, s = [], oCanvas = document.getElementById("DLine"),
      zIndex = this.zIndex,
      opacity = this.opacity,
      color = this.color,
      count = this.count,
      l,
      ctx = oCanvas.getContext("2d"),
      animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (n) {
          window.setTimeout(n, 1e3 / 45)
        },
      move = {
        x: null,
        y: null,
        max: 20000
      }; // 鼠标移动坐标
    function getWindowSize () {
      winWidth = oCanvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        winHeight = oCanvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    function dwawLine () {
      ctx.clearRect(0, 0, winWidth, winHeight);
      s.forEach(function (i, x) {
        i.x += i.xa;
        i.y += i.ya;
        i.xa *= i.x > winWidth || i.x < 0 ? -1 : 1;
        i.ya *= i.y > winHeight || i.y < 0 ? -1 : 1;
        ctx.fillRect(i.x - .5, i.y - .5, 1, 1);
        for ( let e = x + 1; e < u.length; e++) {
          let n = u[e];
          if(null !== n.x&& null !== n.y) {
            let o = i.x - n.x;
            let m = i.y - n.y;
            let  l = o * o + m * m;
            if(l < n.max ) {
              n === move && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m)
            }
            let t = (n.max - l) / n.max;
            ctx.beginPath();
            ctx.lineWidth = t / 2;
            ctx.strokeStyle = "rgba(" + color + "," + (t + .2) + ")";
            ctx.moveTo(i.x, i.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }),
        animate(dwawLine)
    }
    oCanvas.style.cssText = "z-index:" + zIndex + ";opacity:" + opacity;
    getWindowSize();
    window.onresize = getWindowSize;
    window.onmousemove = function (e) {
      e = e || window.event;
      move.x = e.clientX;
      move.y = e.clientY;
    };
    window.onmouseout = function () {
      move.x = null;
      move.y = null;
    };
      // 随机产生线条
    for (let f = 0; count > f; f++) {
      let x = Math.random() * winWidth,
        y = Math.random() * winHeight,
        xa = 2 * Math.random() - 1,
        ya = 2 * Math.random() - 1;
      s.push({
        x,
        y,
        xa,
        ya,
        max: 6000
      })
    }
    u = s.concat([move]),
      setTimeout(function () {
        dwawLine()
      },
        100)
  }
}
</script>
<style scoped>
  .line-bg {
    position:fixed;
    top:0;
    left:0;
  }
</style>