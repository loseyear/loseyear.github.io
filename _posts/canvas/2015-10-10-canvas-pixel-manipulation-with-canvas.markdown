---
layout: post
title:  "Canvas 像素操作"
category: canvas
description: 胡言乱语而已，看看就好
tags: [canvas]
---

# 像素操作
直到现在，我们仍然没了解画布的实际像素。通过ImageData对像，你可以读写一个数组以控制像素数据。我们也会去了解图片平滑（反锯齿）是如何被控制以及如何将图片保存在画布上。

# ImageData 对像
ImageData对像代表一个画布对像的基础像素数据。它包含了一下只读属性：
| - | - | 
| - | - |
| width | 图片的宽度像素 |
| height | 图片的高度像素 |
| data | 一个代表包含RGBA序列数据的一维数组Uint8ClampedArray，数据是整形，范围在0至255之间（包含255） |

Data属性返回一个 Uint8ClampedArray，它可以被使用作为查看初始像素数据。
每个像素用4个1byes值(按照红，绿，蓝和透明值的顺序; 这就是"RGBA"格式) 来代表。
每个颜色值部份用0至255来代表。
每个部份被分配到一个在数组内连续的索引，左上角像素的红色部份在数组的索引0位置。
像素从左到右被处理，然后往下，遍历整个数组。

Uint8ClampedArray  包含高度 × 宽度 × 4 bytes数据，索引值从0到(高度×宽度×4)-1

例如，从行50，纵200的像素中读取图片的蓝色部份，你会写以下代码：
```js
blueComponent = imageData.data[((50*(imageData.width*4)) + (200*4)) + 2];
```

你可能用会使用Uint8ClampedArray.length属性来读取像素数组的大小（以bytes为单位）：
```js
var numBytes = imageData.data.length;
```

# 创建一个ImageData对像
去创建一个新的，空白的ImageData对像，你应该会使用createImageData() 方法。
有2个版本的createImageData()方法。
```js
var myImageData = ctx.createImageData(width, height);
```
上面代码创建了一个新的具体特定尺寸的ImageData对像。所有像素被预设为透明黑。

你也可以创建一个被anotherImageData对像指定的相同像素的ImageData对像。
这个新的对像像素全部被预设为透明黑。
这个并非复制了图片数据。

```js
var myImageData = ctx.createImageData(anotherImageData);
```

# 得到场景像素数据
为了获得一个包含画布场景像素数据的ImageData对像，你可以用getImageData()方法：
```js
var myImageData = ctx.getImageData(left, top, width, height);
```
这个方法会返回一个ImageData对像，它代表了画布区域的像素数据，
此画布的四个角落分别表示为
(left, top), (left + width, top), (left, top + height), 以及(left + width, top + height)四个点。
这些坐标点被设定为画布坐标空间元素。
> 注：任何在画布以外的元素都会被返回成一个透明黑的ImageData对像。

# 颜色选择器
在这个例子里面，我们会使用 getImageData() 去世展示鼠标光标下的颜色。
为此，我们要当前鼠标的位置，记为 layerX 和 layerY，然后我们去查询 getImageData() 给我们提供的在那个位置的像数数组里面的像素数据。
最后我们使用数组数据去设置背景颜色和 div 的文字去展示颜色值。
```js
var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};
var color = document.getElementById('color');
function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')';
  color.style.background =  rgba;
  color.textContent = rgba;
}
canvas.addEventListener('mousemove', pick);
```

# 在场景中写入像素数据
你可以用putImageData()方法去对场景进行像素数据的写入。
```js
ctx.putImageData(myImageData, dx, dy);
```
dx和dy参数表示你希望在场景内左上角绘制的像素数据所得到的设备坐标。

例如，为了在场景内左上角绘制myImageData代表的图片，你可以写如下的代码：
```js
ctx.putImageData(myImageData, 0, 0);
```

# 图片灰度和反相颜色
在这个例子里，我们遍历所有像素以改变他们的数值。
然后我们将被修改的像素数组通过 putImageData() 放回到画布中去。
invert 函数仅仅是去减掉颜色的最大色值255.grayscale函数仅仅是用红绿和蓝的平均值。
你也可以用加权平均，例如x = 0.299r + 0.587g + 0.114b这个公式。
```js
var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
img.onload = function() {
  draw(this);
};

function draw(img) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
  var data = imageData.data;
    
  var invert = function() {
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = 225 - data[i];     // red
      data[i + 1] = 225 - data[i + 1]; // green
      data[i + 2] = 225 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  var grayscale = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  var invertbtn = document.getElementById('invertbtn');
  invertbtn.addEventListener('click', invert);
  var grayscalebtn = document.getElementById('grayscalebtn');
  grayscalebtn.addEventListener('click', grayscale);
}
```

# 缩放和反锯齿
在 drawImage() 方法， 第二个画布和 imageSmoothingEnabled
属性的帮助下，我们可以放大显示我们的图片及看到详情内容。

我们得到鼠标的位置并裁剪出距左和上5像素，距右和下5像素的图片。
然后我们将这幅图复制到另一个画布然后将图片调整到我们想要的大小。
在缩放画布里，我们将10×10像素的对原画布的裁剪调整为 200×200 。
```js
zoomctx.drawImage(canvas, Math.abs(x - 5), Math.abs(y - 5), 10, 10, 0, 0, 200, 200);
```
因为反锯齿默认是启用的，我们可能想要关闭它以看到清楚的像素。
你可以通过切换勾选框来看到imageSmoothingEnabled属性的效果（不同浏览器需要不同前缀）。
```js
var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
img.onload = function() {
  draw(this);
};

function draw(img) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  var zoomctx = document.getElementById('zoom').getContext('2d');
 
  var smoothbtn = document.getElementById('smoothbtn');
  var toggleSmoothing = function(event) {
    zoomctx.imageSmoothingEnabled = this.checked;
    zoomctx.mozImageSmoothingEnabled = this.checked;
    zoomctx.webkitImageSmoothingEnabled = this.checked;
    zoomctx.msImageSmoothingEnabled = this.checked;
  };
  smoothbtn.addEventListener('change', toggleSmoothing);

  var zoom = function(event) {
    var x = event.layerX;
    var y = event.layerY;
    zoomctx.drawImage(canvas,
                      Math.abs(x - 5),
                      Math.abs(y - 5),
                      10, 10,
                      0, 0,
                      200, 200);
  };

  canvas.addEventListener('mousemove', zoom);
}
```

# 保存图片
HTMLCanvasElement  提供一个 toDataURL() 方法，此方法在保存图片的时候非常有用。
它返回一个包含被类型参数规定的图像表现格式的数据链接。
返回的图片分辨率是96dpi。

| - | - |
| - | - |
| canvas.toDataURL('image/png') | 默认设定。创建一个PNG图片。 |
| canvas.toDataURL('image/jpeg', quality) |  创建一个JPG图片。你可以有选择地提供从0到1的品质量，1表示最好品质，0基本不被辨析但有比较小的文件大小。| 
| canvas.toBlob(callback, type, encoderOptions) | 这个创建了一个在画布中的代表图片的Blob对像。 |

当你从画布中生成了一个数据链接，
例如，你可以将它用于任何<image>元素，
或者将它放在一个有download属性的超链接里用于保存到本地。

你也可以从画布中创建一个Blob对像。
