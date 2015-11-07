---
layout: post
title:  "Canvas API"
---


> 阅读 Canvas 笔记
[canvas mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

canvas 是 HTML5 的新增元素，可使用 JavaScript 脚本来绘制图形。
例如：画图，合成照片，创建动画甚至实现视频处理与渲染。

支持情况

| 浏览器 | 版本 | 备注 |
| ------ | ---- | ---- |
| Gecko(Firefox) | 1.8(1.5) |
| Safari | 4 |
| Internet Explorer | 9 |
| Chrome | all |
| Opera  | all |

  
  > canvas 元素可被 WebGL 用于网页上的 3D 图形硬件加速
 
## Example
{% highlight html %}
    <canvas id="canvas"></canvas>
{% endhighlight %}
{% highlight js %}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

{% endhighlight %}
