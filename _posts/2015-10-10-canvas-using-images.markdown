---
layout: post
title:  "Using images"
tags: [canvas]
---


canvas更有意思的一项特性就是图像操作能力。可以用于动态的图像合成或者作为图形的背景，以及游戏界面（Sprites）等等。浏览器支持的任意格式的外部图片都可以使用，比如PNG、GIF或者JPEG。 你甚至可以将同一个页面中其他canvas元素生成的图片作为图片源。

引入图像到canvas里需要以下两步基本操作：

* 获得一个指向 HTMLImageElement 的对象或者另一个canvas元素的引用作为源，也可以通过提供一个URL的方式来使用图片（参见例子）
* 使用drawImage()函数将图片绘制到画布上

# 获得需要绘制的图片
>   HTMLImageElement
>   这些图片是由Image()函数构造出来的，或者任何的<img>元素
>   HTMLVideoElement
>   用一个HTML的 video元素作为你的图片源，可以从视频中抓取当前帧作为一个图像
>   HTMLCanvasElement
>   可以使用另一个 canvas 元素作为你的图片源。
>   ImageBitmap
>   这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。
    
> 这些源统一由 CanvasImageSource类型来引用。

有几种方式可以获取到我们需要在canvas上使用的图片。
## 使用相同页面内的图片
我们可以通过下列方法的一种来获得与canvas相同页面内的图片的引用：
* document.images集合
* document.getElementsByTagName()方法
* 如果你知道你想使用的指定图片的ID，你可以用document.getElementById()获得这个图片

## 使用其它域名下的图片
在 HTMLImageElement上使用crossOrigin属性，你可以请求加载其它域名上的图片。如果图片的服务器允许跨域访问这个图片，那么你可以使用这个图片而不污染canvas，否则，使用这个图片将会污染canvas。

## 使用其它 canvas 元素
和引用页面内的图片类似地，用 document.getElementsByTagName 或 document.getElementById 方法来获取其它 canvas 元素。但你引入的应该是已经准备好的 canvas。

一个常用的应用就是将第二个canvas作为另一个大的 canvas 的缩略图。

## 由零开始创建图像
或者我们可以用脚本创建一个新的 HTMLImageElement 对象。要实现这个方法，我们可以使用很方便的Image()构造函数。

{% highlight js %}
var img = new Image();   // 创建一个img元素
img.src = 'myImage.png'; // 设置图片源地址
{% endhighlight %}
当脚本执行后，图片开始装载。

若调用 drawImage 时，图片没装载完，那什么都不会发生（在一些旧的浏览器中可能会抛出异常）。因此你应该用load时间来保证不会在加载完毕之前使用这个图片：

{% highlight js %}
var img = new Image();   // 创建img元素
img.onload = function(){
  // 执行drawImage语句
}
img.src = 'myImage.png'; // 设置图片源地址
{% endhighlight %}

如果你只用到一张图片的话，这已经够了。但一旦需要不止一张图片，那就需要更加复杂的处理方法，但图片预装载策略超出本教程的范围，感兴趣的话可以参考 [JavaScript Image Preloader](http://www.webreference.com/programming/javascript/gr/column3/)。

## 通过 data: url 方式嵌入图像
我们还可以通过 data: url 方式来引用图像。Data urls 允许用一串 Base64 编码的字符串的方式来定义一个图片。

{% highlight js %}
var img_src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
{% endhighlight %}

其优点就是图片内容即时可用，无须再到服务器兜一圈。（还有一个优点是，可以将 CSS，JavaScript，HTML 和 图片全部封装在一起，迁移起来十分方便。）缺点就是图像没法缓存，图片大的话内嵌的 url 数据会相当的长：

## 使用视频帧
你还可以使用 video 中的视频帧（即便视频是不可见的）。例如，如果你有一个ID为“myvideo”的
{% highlight html %}
<video> 元素，你可以这样做：
{% endhighlight %}
{% highlight js %}
function getMyVideo() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    return document.getElementById('myvideo');
  }
}
{% endhighlight %}

# 绘制图片
一旦获得了源图对象，我们就可以使用 drawImage 方法将它渲染到 canvas 里。drawImage 方法有三种形态，下面是最基础的一种。

{% highlight js %}
drawImage(image, x, y)
其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
{% endhighlight %}

例子：一个简单的线图
 > 下面一个例子我用一个外部图像作为一线性图的背景。用背景图我们就不需要绘制负责的背景，省下不少代码。这里只用到一个 image 对象，于是就在它的 onload 事件响应函数中触发绘制动作。drawImage 方法将背景图放置在 canvas 的左上角 (0,0) 处。

{% highlight js %}
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.onload = function(){
      ctx.drawImage(img,0,0);
      ctx.beginPath();
      ctx.moveTo(30,96);
      ctx.lineTo(70,66);
      ctx.lineTo(103,76);
      ctx.lineTo(170,15);
      ctx.stroke();
    }
    img.src = 'images/backdrop.png';
  }
{% endhighlight %}

## 缩放 Scaling
drawImage 方法的又一变种是增加了两个用于控制图像在 canvas 中缩放的参数。

{% highlight js %}
drawImage(image, x, y, width, height)
当中 width 和 height 分别是图像在 canvas 中显示大小。
{% endhighlight %}

{% highlight js %}
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.onload = function(){
      for (i=0;i<4;i++){
        for (j=0;j<3;j++){
          ctx.drawImage(img,j*50,i*38,50,38);
        }
      }
    }
    img.src = 'images/rhino.jpg';
  }
{% endhighlight %}

## 切片 Slicing
drawImage 方法的第三个也是最后一个变种有8个新参数，用于控制做切片显示的。

{% highlight js %}
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。
其它8个参数最好是参照右边的图解，前4个是定义图像源的切片位置和大小，
后4个则是定义切片的目标显示位置和大小。
{% endhighlight %}

{% highlight js %}
function draw() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // Draw slice
  ctx.drawImage(document.getElementById('source'),
                33,71,104,124,21,20,87,104);

  // Draw frame
  ctx.drawImage(document.getElementById('frame'),0,0);
}
{% endhighlight %}

{% highlight js %}
function draw() {

  // Loop through all images
  for (i=0;i<document.images.length;i++){

    // Don't add a canvas for the frame image
    if (document.images[i].getAttribute('id')!='frame'){

      // Create canvas element
      canvas = document.createElement('CANVAS');
      canvas.setAttribute('width',132);
      canvas.setAttribute('height',150);

      // Insert before the image
      document.images[i].parentNode.insertBefore(canvas,document.images[i]);

      ctx = canvas.getContext('2d');

      // Draw image to canvas
      ctx.drawImage(document.images[i],15,20);

      // Add frame
      ctx.drawImage(document.getElementById('frame'),0,0);
    }
  }
}
{% endhighlight %}

# 控制图像的缩放行为 
Gecko 1.9.2 引入了 mozImageSmoothingEnabled 属性，值为 false 时，图像不会平滑地缩放。默认是 true 。

{% highlight js %}
cx.mozImageSmoothingEnabled = false;
{% endhighlight %}
