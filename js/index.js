window.onload = function () {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    function Clock(opt){

        for (var key in opt) {
            this[key]=opt[key];
        }

        this.singleRadian=2*Math.PI/60;//���ڿ̶���֮��Ļ��Ȳ�

        this.init();
    }

    Clock.prototype={
        constructor:Clock,

        init:function(){
            var self=this;
            var timer=setInterval(function(){
                ctx.clearRect(0,0,canvas.width,canvas.height);

                //1�����ƴ�Բ
                self.drawBigCircle();
                //2�����ƿ̶��� //3�����ƿ̶�������
                self.drawTicks();
                //4������ָ��
                self.drawPoints();

                //5������ʱ������
                ctx.fillText(new Date().toLocaleString(),300,50);
            },1000);



        },

        //���ƴ�Բ
        drawBigCircle:function(){
            ctx.save()

            ctx.beginPath();
            ctx.arc(this.bigX,this.bigY,this.bigRadius,0,2*Math.PI);

            ctx.lineWidth=10;
            ctx.strokeStyle="#335F9A";
            ctx.stroke();

            ctx.restore();

        },

        //�������ɸ��̶���
        drawTicks:function(){
            var bigRadius=this.bigRadius-5;

            ctx.font="20px ΢���ź�";
            ctx.textAlign="center";
            ctx.textBaseline="middle";

            for (var i = 0; i < 60; i++) {
                //ÿһ���̶���λ�ڴ�Բ�Ļ���ֵ
                var radian=this.startRadian+this.singleRadian*i;

                //����i���Ա�5�����Ǵ�̶��ߣ���֮����С�̶���
                var length;//�̶��ߵĳ���
                var width;//�̶��ߵ��߿�

                if(i%5==0){
                    length=this.bigLength;
                    width=this.bigWidth;

                    //�������֣�
                    this.drawText(radian,i/5+1);
                }else{
                    length=this.smallLength;
                    width=this.smallWidth;
                }

                this.drawTick(bigRadius,radian,length,width);


            }
        },

        //���Ƶ����̶���
        drawTick:function(bigRadius,radian,length,width){


            //��ʽ1��
            var x1=this.bigX+Math.cos(radian)*(bigRadius-length);
            var y1=this.bigY+Math.sin(radian)*(bigRadius-length);

            //��ʽ2��
            var x2=this.bigX+Math.cos(radian)*bigRadius;
            var y2=this.bigY+Math.sin(radian)*bigRadius;

            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);

            ctx.lineWidth=width;
            ctx.stroke();
        },

        //���Ƶ�������
        drawText:function(radian,text){
            var radius=105;

            //��ʽ��
            var x=this.bigX+Math.cos(radian)*radius;
            var y=this.bigY+Math.sin(radian)*radius;

            ctx.fillText(text,x,y);

        },

        //����ָ��
        drawPoints:function(){
            var date=new Date();
            var hour=date.getHours();//hour:0-23
            var minute=date.getMinutes();//minute:0-59
            var second=date.getSeconds();//secode:0-59

            //����Сʱ������ʱ��
            hour=hour%12;//0-11
            //֪��12Сʱ�ȷ���1��Բ����ôһСʱ�Ļ��Ȳ2*PI/12
            //PI/6*i

            var hourRadian=hour*2*Math.PI/12-Math.PI/2;
            var hourLength=50;
            this.drawPoint(hourRadian,hourLength,"#daa520");


            //���ݷ��������Ʒ���
            //֪��60���ӵȷ���1��Բ����ôһ���ӵĻ��Ȳ2*PI/60

            var minuteRadian=minute*2*Math.PI/60-Math.PI/2;
            var minuteLength=70;

            this.drawPoint(minuteRadian,minuteLength,"blue");

            //������������������
            //֪��60���ӵȷ���1��Բ����ôһ���ӵĻ��Ȳ2*PI/60

            var secondRadian=second*2*Math.PI/60-Math.PI/2;
            var secondLength=80;
            this.drawPoint(secondRadian,secondLength,"pink");
        },

        //���Ƶ���ָ��
        drawPoint:function(radian,length,color){
            ctx.save();

            //ʱ����յ����꣺
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
        startRadian:-Math.PI/3,//-60��-->��Ӧ����1��λ��
        smallLength:10,
        smallWidth:4,
        bigLength:23,
        bigWidth:8
    })





}