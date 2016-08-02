---
layout: post
title:  "Canvas 基本动画"
category: canvas
description: 胡言乱语而已，看看就好
tags: [canvas]
---


由于我们是用脚本去操控 canvas 对象，这样要实现一些交互动画也是相当容易的。
只不过，canvas 从来都不是专门为动画而设计的（不像 Flash），难免会有些限制。

可能最大的限制就是图像一旦绘制出来，它就是一直保持那样了。
如果需要移动它，我们不得不对所有东西（包括之前的）进行重绘。
重绘是相当费时的，而且性能很依赖于电脑的速度。

# 基本动画的步骤 Basic animation steps
画一帧，你需要以下一些步骤：

* 清空 canvas
> 除非接下来要画的内容会完全充满 canvas （例如背景图），否则你需要清空所有。最简单的做法就是用 clearRect 方法。

* 保存 canvas 状态
> 如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。

* 绘制动画图形（animated shapes）
> 这一步才是重绘动画帧。

* 恢复 canvas 状态
> 如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

# 操控动画 Controlling an animation 
在 canvas 上绘制内容是用 canvas 提供的或者自定义的方法，而通常，我们仅仅在脚本执行结束后才能看见结果，
比如说，在 for 循环里面做完成动画是不太可能的。

我们需要一些可以定时的执行重绘的方法。有两种方法可以实现这样的动画操控。
首先可以通过 setInterval 和 setTimeout 方法来控制在设定的时间点上执行重绘。
```js
setInterval(animateShape,500);
setTimeout(animateShape,500);
```
如果你不需要任何交互操作，用 setInterval 方法定时执行重绘是最适合的了。
在上面的例子里 animateShape 方法每半秒执行一次。
setTimeout 方法只会在预设时间点上执行操作。

第二个方法，我们可以利用用户输入来实现操控。
如果需要做一个游戏，我们可以通过监听用户交互过程中触发的事件（如 keyboard，mouse）来控制动画效果。

下面的例子，我还使用第一种方式实现动画效果。
页面底部有些链接，那些是应用第二种方法的例子。

```html
<body onload="init();">
<canvas id="canvas" width="800" height="200"></canvas>
```
## 动画例子 1
这个例子里面，我会让一个小型的太阳系模拟系统动起来。
```js
var sun = new Image();
var moon = new Image();
var earth = new Image();
function init(){
  sun.src = 'images/sun.png';
  moon.src = 'images/moon.png';
  earth.src = 'images/earth.png';
  setInterval(draw,100);
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,300,300); // clear canvas

  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  ctx.save();
  ctx.translate(150,150);

  // Earth
  var time = new Date();
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  ctx.translate(105,0);
  ctx.fillRect(0,-12,50,24); // Shadow
  ctx.drawImage(earth,-12,-12);

  // Moon
  ctx.save();
  ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  ctx.translate(0,28.5);
  ctx.drawImage(moon,-3.5,-3.5);
  ctx.restore();

  ctx.restore();
  
  ctx.beginPath();
  ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
  ctx.stroke();
 
  ctx.drawImage(sun,0,0,300,300);
}
```

## 动画例子 2
```js
function init(){
  clock();
  setInterval(clock,1000);
}
function clock(){
  var now = new Date();
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.save();
  ctx.clearRect(0,0,150,150);
  ctx.translate(75,75);
  ctx.scale(0.4,0.4);
  ctx.rotate(-Math.PI/2);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  // Hour marks
  ctx.save();
  for (var i=0;i<12;i++){
    ctx.beginPath();
    ctx.rotate(Math.PI/6);
    ctx.moveTo(100,0);
    ctx.lineTo(120,0);
    ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5;
  for (i=0;i<60;i++){
    if (i%5!=0) {
      ctx.beginPath();
      ctx.moveTo(117,0);
      ctx.lineTo(120,0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI/30);
  }
  ctx.restore();
  
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr  = now.getHours();
  hr = hr>=12 ? hr-12 : hr;

  ctx.fillStyle = "black";

  // write Hours
  ctx.save();
  ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20,0);
  ctx.lineTo(80,0);
  ctx.stroke();
  ctx.restore();

  // write Minutes
  ctx.save();
  ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28,0);
  ctx.lineTo(112,0);
  ctx.stroke();
  ctx.restore();
  
  // Write seconds
  ctx.save();
  ctx.rotate(sec * Math.PI/30);
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30,0);
  ctx.lineTo(83,0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0,0,10,0,Math.PI*2,true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95,0,10,0,Math.PI*2,true);
  ctx.stroke();
  ctx.fillStyle = "#555";
  ctx.arc(0,0,3,0,Math.PI*2,true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#325FA2';
  ctx.arc(0,0,142,0,Math.PI*2,true);
  ctx.stroke();

  ctx.restore();
}
```

## 动画例子 3
这是一个从左到右滚动的全景动画的代码。请注意图片的大小需要比 canvas 大。
```js
var img = new Image();

//User Variables
img.src = 'Capitan_Meadows,_Yosemite_National_Park.jpg';
var CanvasXSize = 800;
var CanvasYSize = 200;
var speed = 30; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset
//End User Variables

var dx = 0.75;
var imgW = img.width*scale;
var imgH = img.height*scale;
var x = 0;
if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
var clearX;
var clearY;
if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
else { clearX = CanvasXSize; }
if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
else { clearY = CanvasYSize; }
var ctx;

function init() {
    //Get Canvas Element
    ctx = document.getElementById('canvas').getContext('2d');
    //Set Refresh Rate
    return setInterval(draw, speed);
}

function draw() {
    //Clear Canvas
    ctx.clearRect(0,0,clearX,clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = 0; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-imgW+1,y,imgW,imgH); }
    }
    //draw image
    ctx.drawImage(img,x,y,imgW,imgH);
    //amount to move
    x += dx;
}
```
