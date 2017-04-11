window.onload = function () {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    function Clock(opt){

        for (var key in opt) {
            this[key]=opt[key];
        }

        this.singleRadian=2*Math.PI/60;//相邻刻度线之间的弧度差

        this.init();
    }

    Clock.prototype={
        constructor:Clock,

        init:function(){
            var self=this;
            var timer=setInterval(function(){
                ctx.clearRect(0,0,canvas.width,canvas.height);

                //1、绘制大圆
                self.drawBigCircle();
                //2、绘制刻度线 //3、绘制刻度线文字
                self.drawTicks();
                //4、绘制指针
                self.drawPoints();

                //5、绘制时间文字
                ctx.fillText(new Date().toLocaleString(),300,50);
            },1000);



        },

        //绘制大圆
        drawBigCircle:function(){
            ctx.save()

            ctx.beginPath();
            ctx.arc(this.bigX,this.bigY,this.bigRadius,0,2*Math.PI);

            ctx.lineWidth=10;
            ctx.strokeStyle="#335F9A";
            ctx.stroke();

            ctx.restore();

        },

        //绘制若干个刻度线
        drawTicks:function(){
            var bigRadius=this.bigRadius-5;

            ctx.font="20px 微软雅黑";
            ctx.textAlign="center";
            ctx.textBaseline="middle";

            for (var i = 0; i < 60; i++) {
                //每一个刻度线位于大圆的弧度值
                var radian=this.startRadian+this.singleRadian*i;

                //发现i可以被5整除是大刻度线，反之就是小刻度线
                var length;//刻度线的长度
                var width;//刻度线的线宽

                if(i%5==0){
                    length=this.bigLength;
                    width=this.bigWidth;

                    //绘制文字：
                    this.drawText(radian,i/5+1);
                }else{
                    length=this.smallLength;
                    width=this.smallWidth;
                }

                this.drawTick(bigRadius,radian,length,width);


            }
        },

        //绘制单个刻度线
        drawTick:function(bigRadius,radian,length,width){


            //公式1：
            var x1=this.bigX+Math.cos(radian)*(bigRadius-length);
            var y1=this.bigY+Math.sin(radian)*(bigRadius-length);

            //公式2：
            var x2=this.bigX+Math.cos(radian)*bigRadius;
            var y2=this.bigY+Math.sin(radian)*bigRadius;

            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);

            ctx.lineWidth=width;
            ctx.stroke();
        },

        //绘制单个文字
        drawText:function(radian,text){
            var radius=105;

            //公式：
            var x=this.bigX+Math.cos(radian)*radius;
            var y=this.bigY+Math.sin(radian)*radius;

            ctx.fillText(text,x,y);

        },

        //绘制指针
        drawPoints:function(){
            var date=new Date();
            var hour=date.getHours();//hour:0-23
            var minute=date.getMinutes();//minute:0-59
            var second=date.getSeconds();//secode:0-59

            //根据小时数绘制时针
            hour=hour%12;//0-11
            //知道12小时等分了1个圆，那么一小时的弧度差：2*PI/12
            //PI/6*i

            var hourRadian=hour*2*Math.PI/12-Math.PI/2;
            var hourLength=50;
            this.drawPoint(hourRadian,hourLength,"#daa520");


            //根据分钟数绘制分针
            //知道60分钟等分了1个圆，那么一分钟的弧度差：2*PI/60

            var minuteRadian=minute*2*Math.PI/60-Math.PI/2;
            var minuteLength=70;

            this.drawPoint(minuteRadian,minuteLength,"blue");

            //根据秒钟数绘制秒针
            //知道60秒钟等分了1个圆，那么一秒钟的弧度差：2*PI/60

            var secondRadian=second*2*Math.PI/60-Math.PI/2;
            var secondLength=80;
            this.drawPoint(secondRadian,secondLength,"pink");
        },

        //绘制单个指针
        drawPoint:function(radian,length,color){
            ctx.save();

            //时针的终点坐标：
            var x=this.bigX+Math.cos(radian)*length;
            var y=this.bigY+Math.sin(radian)*length;

            ctx.beginPath();
            ctx.moveTo(this.bigX,this.bigY);
            ctx.lineTo(x,y);

            ctx.strokeStyle=color;
            ctx.stroke();

            ctx.restore();
        }
    }


    var clock=new Clock({
        bigX:300,
        bigY:300,
        bigRadius:150,
        startRadian:-Math.PI/3,//-60度-->对应数字1的位置
        smallLength:10,
        smallWidth:4,
        bigLength:23,
        bigWidth:8
    })





}