---
layout: post
title:  "Canvas 组合"
category: canvas
description: 胡言乱语而已，看看就好
tags: [canvas]
---


# 组合 Compositing
之前的例子里面，我们总是将一个图形画在另一个之上，大多数情况下，这样是不够的。
比如说，它这样受制于图形的绘制顺序。
不过，我们可以利用 globalCompositeOperation 属性来改变这些做法。

# globalCompositeOperation
我们不仅可以在已有图形后面再画新图形，还可以用来遮盖，清除（比 clearRect 方法强劲得多）某些区域。
```js
globalCompositeOperation = type
```
type 是下面 12 种字符串值之一：
| type |   |
| ---- | - |
| source-over (default) | 这是默认设置，新图形会覆盖在原有内容之上。 |
| destination-over | 会在原有内容之下绘制新图形。 |
| source-in | 新图形会仅仅出现与原有内容重叠的部分。其它区域都变成透明的。 |
| destination-in | 原有内容中与新图形重叠的部分会被保留，其它区域都变成透明的。 |
| source-out | 结果是只有新图形中与原有内容不重叠的部分会被绘制出来。 |
| destination-out | 原有内容中与新图形不重叠的部分会被保留。 |
| source-atop | 新图形中与原有内容重叠的部分会被绘制，并覆盖于原有内容之上。 |
| destination-atop | 原有内容中与新内容重叠的部分会被保留，并会在原有内容之下绘制新图形 |
| lighter | 两图形中重叠部分作加色处理。 |
| darker | 两图形中重叠的部分作减色处理。 |
| xor | 重叠的部分会变成透明。 |
| copy | 只有新图形会被保留，其它都被清除掉。 |

> 注意：copy 和 darker 属性值在 Gecko 1.8 型的浏览器（Firefox 1.5 betas，等等）上暂时还无效。

# 裁切路径 Clipping paths
裁切路径和普通的 canvas 图形差不多，不同的是它的作用是遮罩，用来隐藏没有遮罩的部分。
如右图所示。红边五角星就是裁切路径，所有在路径以外的部分都不会在 canvas 上绘制出来。

如果和上面介绍的 globalCompositeOperation 属性作一比较，它可以实现与 source-in 和 source-atop 差不多的效果。
最重要的区别是裁切路径不会在 canvas 上绘制东西，而且它永远不受新图形的影响。
这些特性使得它在特定区域里绘制图形时相当好用。

在 绘制图形 一章中，我只介绍了 stroke 和 fill 方法，这里介绍第三个方法 clip。

```js
clip()
```
我们用 clip 方法来创建一个新的裁切路径。默认情况下，canvas 有一个与它自身一样大的裁切路径（也就是没有裁切效果）。
## clip 的例子
这个例子，我会用一个圆形的裁切路径来限制随机星星的绘制区域。

首先，我画了一个与 canvas 一样大小的黑色方形作为背景，然后移动原点至中心点。
然后用 clip 方法创建一个弧形的裁切路径。
裁切路径也属于 canvas 状态的一部分，可以被保存起来。
如果我们在创建新裁切路径时想保留原来的裁切路径，我们需要做的就是保存一下 canvas 的状态。

裁切路径创建之后所有出现在它里面的东西才会画出来。
在画线性渐变时这个就更加明显了。
然后在随机位置绘制 50 大小不一（经过缩放）的颗，当然也只有在裁切路径里面的星星才会绘制出来。

```js
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillRect(0,0,150,150);
  ctx.translate(75,75);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.arc(0,0,60,0,Math.PI*2,true);
  ctx.clip();

  // draw background
  var lingrad = ctx.createLinearGradient(0,-75,0,75);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');
  
  ctx.fillStyle = lingrad;
  ctx.fillRect(-75,-75,150,150);

  // draw stars
  for (var j=1;j<50;j++){
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.translate(75-Math.floor(Math.random()*150),
                  75-Math.floor(Math.random()*150));
    drawStar(ctx,Math.floor(Math.random()*4)+2);
    ctx.restore();
  }
  
}
function drawStar(ctx,r){
  ctx.save();
  ctx.beginPath()
  ctx.moveTo(r,0);
  for (var i=0;i<9;i++){
    ctx.rotate(Math.PI/5);
    if(i%2 == 0) {
      ctx.lineTo((r/0.525731)*0.200811,0);
    } else {
      ctx.lineTo(r,0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
```

