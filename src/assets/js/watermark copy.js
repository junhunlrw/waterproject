let watermark = {}
 /**
  * param str:佛山市律师远程会见中心（南海）
  */
let setWatermark = (str) => {
  let id = '1.23452384164.123412416';
  
  if (document.getElementById(id) !== null) {
  document.getElementById('printPdf').removeChild(document.getElementById(id));
  }
  
  //创建一个画布
  let can = document.createElement('canvas');
  //设置画布的长宽
  can.width = 350;
  can.height = 120;
  
  let cans = can.getContext('2d');
  //旋转角度
  cans.rotate(-15 * Math.PI / 180);
  cans.font = '18px Vedana';
  //设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = 'rgba(0, 0, 0, 0.50)';
  //设置文本内容的当前对齐方式
  cans.textAlign = 'left';
  //设置在绘制文本时使用的当前文本基线
  cans.textBaseline = 'Middle';
  //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  cans.fillText(str, can.width / 8, can.height / 2);

  //  let div = document.createElement('div');
  //  div.id = id;
  //  div.style.pointerEvents = 'none';
  //  div.style.top = '0px';
  //  div.style.left = '0px';
  //  div.style.position = 'fixed';
  //  div.style.zIndex = '100000';
  //  div.style.width = '100%';
  //  div.style.height = document.getElementById('printPdf').scrollHeight + 'px';
  //  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  //  document.body.appendChild(div);
  drawImg(can.toDataURL('image/png')).then(function(data){
    console.log(data)
    let imgUrl = data
    let div = document.createElement('img');
    div.id = id;
    div.classList.add("watermark")
    div.style.pointerEvents = 'none';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.position = 'fixed';
    div.style.zIndex = '1000000000';
    div.style.width = '100%';
    // div.style.opacity = '0.7';
    div.style.height = document.getElementById('printPdf').scrollHeight + 'px';
    // 背景图片
    // div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    div.src = imgUrl

    document.getElementById('printPdf').appendChild(div);
    return id;
  })
}
function drawImg(img){
  var p = new Promise(function(resolve, reject){ //做一些异步操作
    setTimeout(function(){
      //创建一个画布
      let canva = document.createElement('canvas');
      //设置画布的长宽
      canva.width = document.getElementById('printPdf').clientWidth;
      canva.height = document.getElementById('printPdf').clientHeight;
      let canvas = canva.getContext('2d');
      let width = 350
      let height = 120
      var xNum = Math.floor(canva.width / width);//向下取整
      var yNum = Math.floor(canva.height / height);//向下取整
      for(var x=0;x<xNum;x++){
        for(var y=0;y<yNum;y++){
          // imgObj.onload(function(){
            var imgObj = new Image()
            imgObj.src = img
            canvas.drawImage(imgObj,width * x,height * y,width,height)
          // })
        }
      }
      resolve(canva.toDataURL('image/png'));
    }, 10);
  }); return p;
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