---
layout: post
title:  "canvas 元素"
category: canvas
description: 胡言乱语而已，看看就好
tags: [canvas]
---


# canvas 元素（Canvas Basic usage）

{% highlight html %}
    <canvas id="tutoriad" width="300" height="150"></canvas>
{% endhighlight %}
canvas 只有两个属性-宽度和高度。
默认宽300px，高150px;

# 替换内容
{% highlight html %}
<canvas>
    <!-- 如果浏览器不支持 -->
    文字提示
</canvas>

<canvas>
    <!-- 如果浏览器不支持 -->
    <img alt="" />
</canvas>
{% endhighlight %}

# 结束标签不可省

# 渲染上下文
getContext() 只有一个参数，

{% highlight js %}
// 获取元素
var can = document.getElementById('id');
// 2d 方式绘制
var ctx = can.getContext('2d');
{% endhighlight %}

# 检查支持性
{% highlight js %}
var can = document.getElementById('el');
if (can.getContext) {
    var ctx = can.getContext('2d');
    // drawing code here
} else {
    // canvas-unsupported code here
}
{% endhighlight %}

# 一个模板骨架

{% highlight html %}
<html>
  <head>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw(){
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
          var ctx = canvas.getContext('2d');
        }
      }
    </script>
    <style type="text/css">
      canvas { border: 1px solid black; }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="150" height="150"></canvas>
  </body>
</html>
{% endhighlight %}

# 一个简单例子
{% highlight html %}
<html>
 <head>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
      }
    }
  </script>
 </head>
 <body onload="draw();">
   <canvas id="canvas" width="150" height="150"></canvas>
 </body>
</html>
{% endhighlight %}
