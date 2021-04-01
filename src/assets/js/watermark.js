let watermark = {}
 /**
  * param str:显示的水印文字
  */
let setWatermark = (str) => {
  let id = '1.23452384164.123412416';
  
  if (document.getElementById(id) !== null) {
  document.getElementById('printPdf').removeChild(document.getElementById(id));
  }
  
  //创建一个画布
  let can = document.createElement('canvas');
  //设置画布的长宽
  can.width = 1536;
  can.height = 2048;
  
  let cans = can.getContext('2d');
  //旋转角度
  cans.rotate(-15 * Math.PI / 180);
  cans.font = '50px Vedana';
  //设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = 'rgba(0, 0, 0, 0.40)';
  //设置文本内容的当前对齐方式
  cans.textAlign = 'left';
  //设置在绘制文本时使用的当前文本基线
  cans.textBaseline = 'Middle';
  //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  // cans.fillText(str, can.width / 8, can.height / 2);
  let width = 850
  let height = 320
  var xNum = Math.floor(can.width / width);//向下取整
  var yNum = Math.floor(can.height / height);//向下取整
  for(var i = 0; i < 20; i++){
    for(var j = 0; j < 20; j++){
      // cans.fillText(str, -10 + ((i-j)*width), 60+ (j*height));
      cans.fillText(str, (width * i)-200,(height * j)-200);
    }
  }
  
  let div = document.createElement('img');
  div.id = id;
  div.classList.add("watermark")
  div.style.pointerEvents = 'none';
  div.style.top = '0px';
  div.style.left = '0px';
  div.style.position = 'fixed';
  div.style.zIndex = '1000000000';
  div.style.width = '100%';
  div.style.opacity = '0.7';
  div.style.height = document.getElementById('printPdf').scrollHeight + 'px';
  // 背景图片
  // div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  div.src = can.toDataURL('image/png')
  document.getElementById('printPdf').appendChild(div);
  return id;
}
 
// 该方法只允许调用一次
watermark.set = (str) => {
 let id = setWatermark(str);
 setInterval(() => {
  if (document.getElementById(id) === null) {
    id = setWatermark(str);
  }
 }, 500);
 window.onresize = () => {
  setWatermark(str);
 };
}
 
export default watermark;