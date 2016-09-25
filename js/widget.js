//错误弹窗
function openError(text) {
    var oDiv=document.createElement('div');
    oDiv.id='box';
    oDiv.innerHTML=text;
    document.body.appendChild(oDiv);
    position(oDiv);
};
function closeError() {
    var oDiv=document.getElementById('box');
    document.body.removeChild(oDiv);
};
//检查数字，弹窗提醒
function checkText(input,button,text,time) {
    var timer=null;
    var time=time || 2000;
    button.onclick=function () {
        isNaN(input.value) || input.value==''? openError(text):null;
        timer=setTimeout(closeError,time);
        oDiv=document.getElementById('box');
        oDiv.onmouseover=function () {
            clearTimeout(timer);
        }
        oDiv.onmouseout=function () {
            closeError();
        }
        if (input.value=='' || isNaN(input.value)){
            input.value='';
            return false;
        };
    };
};
//alertBox
function alertBox(text) {
    var oDiv=document.createElement('div');
    var oClose=document.createElement('button');
    oClose.innerHTML='确定';
    oDiv.innerHTML=text;
    oDiv.className='alertBox';
    document.body.appendChild(oDiv);
    oDiv.appendChild(oClose);
    position(oDiv);
    oClose.onclick=function () {
        document.body.removeChild(oDiv);
    }
}

//confirmBox
function confirmBox(text,callback) {
    var oDiv=document.createElement('div');
    oDiv.className='confirm';
    oDiv.innerHTML='<h2>'+text+'</h2><br><br><br><button type="button">确定</button><button type="button">取消</button>';
    var aButton=document.getElementsByTagName('button');
    document.body.appendChild(oDiv);
    aButton[0].onclick=function () {
        document.body.removeChild(oDiv);
        callback();
    };
    aButton[1].onclick=function () {
        document.body.removeChild(oDiv);
    };
};

//显示更多文本
function showMoreText(ele,conText,num) {
    var partText=conText.substr(0,num);
    var oBtn=document.createElement('Span');
    var show=1;
    ele.innerHTML=partText+'……';
    oBtn.innerHTML='[更多]';
    ele.appendChild(oBtn);
    oBtn.onclick=function () {
        if (show){
            ele.innerHTML=conText;
            ele.appendChild(this);
            this.innerHTML='[收起]';
            show=0;
        }
        else {
            ele.innerHTML=partText+'……';
            ele.appendChild(this);
            this.innerHTML='[更多]';
            show=1;
        }
    }
}

//坦克移动
function moveTank(ele) {
    var b_w=document.documentElement.clientWidth;
    var b_h=document.documentElement.clientHeight;
    var oDiv_w=ele.offsetWidth;
    var oDiv_h=ele.offsetHeight;
    ele.style.position='absolute';
    document.onkeydown=function (event) {
        oEve=event || window.event;
        switch (oEve.keyCode){
            case 39:
                var l=ele.offsetLeft+30;
                l<=b_w-oDiv_w? ele.style.left=l+'px':ele.style.left=b_w-oDiv_w+'px';
                ele.style.transform='rotate(0deg)';
                break;
            case 37:
                var l=ele.offsetLeft-30;
                l>=0? ele.style.left=l+'px':ele.style.left=0+'px';
                ele.style.transform='rotate(180deg)';
                break;
            case 38:
                var t=ele.offsetTop-30;
                t>=0? ele.style.top=t+'px':ele.style.top=0+'px';
                ele.style.transform='rotate(270deg)';
                break;
            case 40:
                var t=ele.offsetTop+30;
                t<=b_h-oDiv_h? ele.style.top=t+'px':ele.style.top=b_h-oDiv_h+'px';
                ele.style.transform='rotate(90deg)';
                break;
        }
    }
}

//运动框架
function StepMove(obj,modeJson,time,callback) {
    clearInterval(obj.timer);
    
    var speed={
        'slow':2000,
        'normal':1000,
        'fast':500
    };
    if (time){
        if(typeof time=='string'){
            time=speed[time];
        }
    }
    else {
        time=speed.normal;
    };
    var start={};
    var dis={};

    for (var key in modeJson){
        start[key]=getStyle(obj,key);
        dis[key]=modeJson[key]-start[key];
    }

    var n=0;

    //var speedSwitch=0; //往返开关

    var count=parseInt(time/30);


    obj.timer=setInterval(function () {
        n++;
        /*if (n==0) speedSwitch=1;
        if (n==count) speedSwitch=0;
        if (speedSwitch==1) n++;
        if (speedSwitch==0) n--;*/

        for (var key in modeJson){
            var stepDis=start[key]+dis[key]/count*n;
            if (key=='opacity'){
                obj.style.opacity=stepDis/100;
                obj.style.filter='alpha(opacity:'+stepDis+')';
            }
            else {
                obj.style[key]=stepDis+'px';
            }
        }
        if (n>=count){
            clearInterval(obj.timer);
            callback && callback();
        }
    },30)
}

//浮窗组件
function overWindow(list,window) {
    var showTimer,hideTimer,moveTimer;//定义计时器备用变量

    for (var i=0; i<list.length; i++){
        list[i].index=i;//给所有的li一个index标识属性
        //给所有的li绑定鼠标移入事件函数
        list[i].onmouseover=function () {
            var a=this.index;//定义一个变量a记录当前li的index标识属性
            clearTimeout(hideTimer);//清除鼠标移出的计时器
            clearTimeout(moveTimer);//清除鼠标从浮窗移回菜单栏的计时器
            //设置鼠标移入的计时器
            showTimer=setTimeout(function () {
                //初始化所有样式
                for (var j=0; j<list.length; j++){
                    window[j].style.display='none';
                    list[j].className='';
                }
                list[a].className='active';//给当前li加上class
                window[a].style.display='block';//使对应的浮窗出现
            },300);
        }
        //给所有的li绑定鼠标移出事件函数
        list[i].onmouseout=function () {
            clearTimeout(showTimer);//清除鼠标移入的计时器
            clearTimeout(moveTimer);//清除鼠标从浮窗移回菜单栏的计时器
            //设置鼠标移出的计时器
            hideTimer=setTimeout(function () {
                //初始化所有样式
                for (var j=0; j<list.length; j++){
                    window[j].style.display='none';
                    list[j].className='';
                }
            },50);
        }
        //给所有的浮窗绑定鼠标移入事件函数
        window[i].onmouseover=function () {
            clearTimeout(hideTimer);//清除鼠标移出的计时器
            clearTimeout(moveTimer);//清除鼠标从浮窗移回菜单栏的计时器
            this.style.display='block';//使当前浮窗不会消失
        }
        //给所有的浮窗绑定鼠标移出事件函数
        window[i].onmouseout=function () {
            //设置鼠标从浮窗移回菜单栏的计时器
            moveTimer=setTimeout(function () {
                //初始化所有样式
                for (var j=0; j<list.length; j++){
                    window[j].style.display='none';
                    list[j].className='';
                }
            },50);
        }
    }
}

//选项卡
function slide(bth,pic,deFn,acFn) {
    for (var i=0; i<aLi.length; i++){
        (function (index) {
            bth[i].onclick=function () {
                for (var j=0; j<aLi.length; j++){
                    bth[j].className='';
                    pic[j].className='productList';
                }
                this.className='ac';
                pic[index].className='productList ac';
            }
        })(i);
    }
}

//列表切换
function tabSlide(tabId,picId) {
    var tabList=document.getElementById(tabId);
    var tab=tabList.getElementsByTagName('a');
    var pic=document.getElementById(picId);
    tab[0].className='ac';
    pic.src="images/"+tabId+"tab1.jpg";
    for (var i=0; i<tab.length; i++){
        (function (index) {
            tab[i].onmouseover=function () {
                for (var j=0; j<tab.length; j++){
                    tab[j].className='';
                }
                this.className='ac';
                pic.src="images/"+tabId+"tab"+(index+1)+".jpg";
            }
        })(i);
    }
}

//banne轮播
function autoBanner(aPic,aA,btnLeft,btnRight) {
    StepMove(aPic[0],{opacity:100});
    aA[0].className='ac';
    var num=0;
    for (var i=0; i<aA.length; i++){
        (function (index) {
            aA[i].onclick=function () {
                for (var j=0; j<aA.length; j++){
                    aA[j].className='';
                    StepMove(aPic[j],{opacity:0})
                }
                num=index;
                this.className='ac';
                StepMove(aPic[index],{opacity:100})
            }
        })(i);
    }
    btnLeft.onclick=function () {
        num==0? num=5:num--;
        for (var j=0; j<aA.length; j++){
            aA[j].className='';
            StepMove(aPic[j],{opacity:0})
        }
        aA[num].className='ac';
        StepMove(aPic[num],{opacity:100})
    }
    btnRight.onclick=function () {
        num==5? num=0:num++;
        for (var j=0; j<aA.length; j++){
            aA[j].className='';
            StepMove(aPic[j],{opacity:0})
        }
        aA[num].className='ac';
        StepMove(aPic[num],{opacity:100})
    }
    function autoRun() {
        num==5? num=0:num++;
        for (var j=0; j<aA.length; j++){
            aA[j].className='';
            StepMove(aPic[j],{opacity:0})
        }
        aA[num].className='ac';
        StepMove(aPic[num],{opacity:100});
    }
    setInterval(autoRun,3000);
}





