---
layout: post
title:  "Canvas Drawing shapes"
---

# 栅格
画布栅格以及坐标空间

# 绘制矩形

不同于 SVG， HTML 中的元素 canvas 只支持一种原生的图形绘制：矩形

canvas 提供三种绘制矩形方法

{% highlight js %}
// 绘制一个填充矩形
fillRect(x, y, width, height);
// 绘制一个矩形的边框
strokeRect(x, y, width, height);
// 清楚指定矩形区域，让清楚部分完全透明
clearRect(x, y, width, height);
{% endhighlight %}

> 参数 x，y 左上坐标点

> 参数 width， height 矩形的尺寸

## 矩形例子
{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(25,25,100,100);
    ctx.clearRect(45,45,60,60);
    ctx.strokeRect(50,50,50,50);
  }
}
{% endhighlight %}

# 绘制路径
使用路径绘制图形

* 生成路径
* 绘图命令绘制
* 闭合路径
* 渲染图形


    beginPath()

新建一条路径，生成之后，图形绘制命令被指向路径上生成路径

    closePath()

闭合路径之后图形绘制命令又重新指向到上下文中。

    stroke()

通过线条来绘制轮廓

    fill()

通过填充路径的内容区域生成实心的图形。

生成路径的第一步是 beginPath()，路径是由很多子路径构成，这些子路径在一个列表中，所有的子路径构成图形。
而每次这个方法调用后，列表清空重置，

> 注意：当前路径为空，即调用 beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是 moveTo(),无论最后的是什么，处于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。

第二步，就是调用函数指定绘制路径
第三步，就是闭合路径，这个方法是通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是闭合的，即当前点为开始点，该函数什么也不做。
> 调用 fill() 函数，自动闭合，
> 调用 stroke() 函数，不自动闭合。
## 绘制一个三角形
{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(75,50);
    ctx.lineTo(100,75);
    ctx.lineTo(100,25);
    ctx.fill();
  }
}
{% endhighlight %}

# 移动笔触
设置起点
{% highlight js %}
moveTo(x, y);
{% endhighlight %}

{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
    ctx.moveTo(110,75);
    ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
    ctx.moveTo(65,65);
    ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
    ctx.moveTo(95,65);
    ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
    ctx.stroke();
  }
}
{% endhighlight %}

# 线
绘制一条从当前位置到指定位置的直线
{% highlight js %}
lineTo(x, y);
{% endhighlight %}

{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    // 填充三角形
    ctx.beginPath();
    ctx.moveTo(25,25);
    ctx.lineTo(105,25);
    ctx.lineTo(25,105);
    ctx.fill();

    // 描边三角形
    ctx.beginPath();
    ctx.moveTo(125,125);
    ctx.lineTo(125,45);
    ctx.lineTo(45,125);
    ctx.closePath();
    ctx.stroke();
  }
}
{% endhighlight %}

# 圆弧
{% highlight js %}
arc(x, y, radius, startAngle, endAngle, anticlockwise)
// x,y 圆心
// radius 半径
// startAngle， endAngle 开始以及结束弧度，以x轴为基准
// anticlockwise true逆时针，false顺时针
{% endhighlight %}

> arc() 函数中的角度单位是弧度，不是度数

> 角度与弧度的js表达式： radians = (Math.PI/180) * degress

{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    for(var i=0;i<4;i++){
      for(var j=0;j<3;j++){
        ctx.beginPath();
        var x              = 25+j*50;               // x 坐标值
        var y              = 25+i*50;               // y 坐标值
        var radius         = 20;                    // 圆弧半径
        var startAngle     = 0;                     // 开始点
        var endAngle       = Math.PI+(Math.PI*j)/2; // 结束点
        var anticlockwise  = i%2==0 ? false : true; // 顺时针或逆时针

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1){
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}
{% endhighlight %}

# 贝塞尔（bezier）以及二次贝塞尔
绘制二次贝塞尔曲线，x,y为结束点，cp1x,cp1y为控制点
{% highlight js %}
quadraticCurveTo(cp1x, cp1y, x, y);
{% endhighlight %}
绘制三次贝塞尔曲线， x,y为结束点， cp1x,cp1y为控制点一，cp2x,cp2y为控制点二

## 二次贝塞尔曲线
这个例子使用多个贝塞尔曲线来渲染对话气泡。
{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // Quadratric curves example
    ctx.beginPath();
    ctx.moveTo(75,25);
    ctx.quadraticCurveTo(25,25,25,62.5);
    ctx.quadraticCurveTo(25,100,50,100);
    ctx.quadraticCurveTo(50,120,30,125);
    ctx.quadraticCurveTo(60,120,65,100);
    ctx.quadraticCurveTo(125,100,125,62.5);
    ctx.quadraticCurveTo(125,25,75,25);
    ctx.stroke();
  }
}
{% endhighlight %}
## 三次贝塞尔曲线
这个例子使用贝塞尔曲线绘制心形。
{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    // Quadratric curves example
    ctx.beginPath();
    ctx.moveTo(75,40);
    ctx.bezierCurveTo(75,37,70,25,50,25);
    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
    ctx.bezierCurveTo(20,80,40,102,75,120);
    ctx.bezierCurveTo(110,102,130,80,130,62.5);
    ctx.bezierCurveTo(130,62.5,130,25,100,25);
    ctx.bezierCurveTo(85,25,75,37,75,40);
    ctx.fill();
  }
}
{% endhighlight %}

# 矩形
将一个矩形路径增加到当前路径上
{% highlight js %}
rect(x, y, width, height)
{% endhighlight %}
> 当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。也就是说，当前笔触自动重置会默认坐标。 # 组合使用
目前为止，每一个例子中的每个图形都只用到一种类型的路径。然而，绘制一个图形并没有限制使用数量以及类型。所以在最后的一个例子里，让我们组合使用所有的路径函数来重现一组著名的游戏人物。

{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    roundedRect(ctx,12,12,150,150,15);
    roundedRect(ctx,19,19,150,150,9);
    roundedRect(ctx,53,53,49,33,10);
    roundedRect(ctx,53,119,49,16,6);
    roundedRect(ctx,135,53,49,33,10);
    roundedRect(ctx,135,119,25,49,10);

    ctx.beginPath();
    ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
    ctx.lineTo(31,37);
    ctx.fill();

    for(var i=0;i<8;i++){
      ctx.fillRect(51+i*16,35,4,4);
    }

    for(i=0;i<6;i++){
      ctx.fillRect(115,51+i*16,4,4);
    }

    for(i=0;i<8;i++){
      ctx.fillRect(51+i*16,99,4,4);
    }

    ctx.beginPath();
    ctx.moveTo(83,116);
    ctx.lineTo(83,102);
    ctx.bezierCurveTo(83,94,89,88,97,88);
    ctx.bezierCurveTo(105,88,111,94,111,102);
    ctx.lineTo(111,116);
    ctx.lineTo(106.333,111.333);
    ctx.lineTo(101.666,116);
    ctx.lineTo(97,111.333);
    ctx.lineTo(92.333,116);
    ctx.lineTo(87.666,111.333);
    ctx.lineTo(83,116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91,96);
    ctx.bezierCurveTo(88,96,87,99,87,101);
    ctx.bezierCurveTo(87,103,88,106,91,106);
    ctx.bezierCurveTo(94,106,95,103,95,101);
    ctx.bezierCurveTo(95,99,94,96,91,96);
    ctx.moveTo(103,96);
    ctx.bezierCurveTo(100,96,99,99,99,101);
    ctx.bezierCurveTo(99,103,100,106,103,106);
    ctx.bezierCurveTo(106,106,107,103,107,101);
    ctx.bezierCurveTo(107,99,106,96,103,96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101,102,2,0,Math.PI*2,true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89,102,2,0,Math.PI*2,true);
    ctx.fill();
  }
}

// A utility function to draw a rectangle with rounded corners.

function roundedRect(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.stroke();
}
{% endhighlight %}