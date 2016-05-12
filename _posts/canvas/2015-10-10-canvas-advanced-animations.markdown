---
layout: post
title:  "Canvas Advanced animations"
category: canvas
tags: [canvas]
---

# 高级动画
在上一章，我们制作了基本动画以及我们知道让物件移动的方式。
在这一部份，我们将会对动作有更深入的了解以及会添加一些物理现像让我们的动画更高级。

# 绘制小球
我们将会画一个小球用于动画学习。好让他们先将球画在canvas（画布）上面。下面的代码会帮我们建立画布。
```html
<canvas id="canvas" width="600" height="300"></canvas>
```
跟平常一样，我们需要先画一个context（画布场景），我们将会创建一个球对像，对像包括一些属性及将小球画在画布上的draw()函数。
```js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ball = {
  x: 100,
  y: 100,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

ball.draw();
```
这里并没有什么特别的。小球实际上是一个简单的圆形，是在arc()函数的帮助下画出来的。

# 添加速率
现在我们有了一个小球，我们准备将添加一些基本动画，正如我们上一章学到的东西那些。
再一次，window.requestAnimationFrame()帮助我们控制动画。
小球依靠添加速率矢量进行移动。
在每一帧里面，我们也用clear 清理掉之前帧里旧的圆形。
```js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mouseover', function(e){
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf);
});

ball.draw();
```

# 边界
没有任何边界碰撞测试，我们的小球很快会超出画布。我们需要检查小球的x和y位置是否已经超出画布的尺寸，以及需要将速度矢量反转。处理这个的时候，我们添加下面的检查代码到draw函数中：

```js
if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
  ball.vy = -ball.vy;
}
if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
  ball.vx = -ball.vx;
}
```

# 加速
为了让动作更真实，你可以像这样处理速度，例如：
```js
ball.vy *= .99;
ball.vy += .25;
```
这个会在逐帧减少速度，所以小球最终会在地板上弹跳。

# 长尾效果
直到现在，我们已经使用clearRect 函数当我们清除前一帧动画。
当你用一个半透明的fillRect函数取代这个函数的时候，你可以轻松获得长尾效果。
```js
ctx.fillStyle = 'rgba(255,255,255,0.3)';
ctx.fillRect(0,0,canvas.width,canvas.height);
```

# 添加鼠标控制 
为了获得一些对小球的控制，例如，我们可以用 mousemove 事伯让它跟随我们的鼠标活动。
click事件会释放小球以及让它重新弹跳起来。

```js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;
var running = false;

var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

function clear() {
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw() {
  clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function(e){
  if (!running) {
    clear();
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
  }
});

canvas.addEventListener("click",function(e){
  if (!running) {
    raf = window.requestAnimationFrame(draw);
    running = true;
  }
});

canvas.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf);
  running = false;
});

ball.draw();
```
用你的鼠标移动小球，点击可以释放。
