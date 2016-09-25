//鼠标拖拽
function drag(ele,title) {
    var b_w = document.documentElement.clientWidth;
    var b_h = document.documentElement.clientHeight;
    var oDiv_w = ele.offsetWidth;
    var oDiv_h = ele.offsetHeight;
    var handle = null;
    title ? handle = title : handle = ele;
    handle.onmousedown = function (event) {
        oEve = event || window.event;
        var disX = oEve.clientX - ele.offsetLeft;
        var disY = oEve.clientY - ele.offsetTop;
        document.onmousemove = function (event) {
            oEve = event || window.event;
            var l = oEve.clientX - disX;
            var t = oEve.clientY - disY;
            l <= b_w - oDiv_w && l >= 0 ? ele.style.left = l + 'px' : null;
            t <= b_h - oDiv_h && t >= 0 ? ele.style.top = t + 'px' : null;
            return false;
        }
    }
    document.onmouseup = function () {
        document.onmousemove = null;
    }
}
//移动方块
function moveDiv(ele) {
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
                break;
            case 37:
                var l=ele.offsetLeft-30;
                l>=0? ele.style.left=l+'px':ele.style.left=0+'px';
                break;
            case 38:
                var t=ele.offsetTop-30;
                t>=0? ele.style.top=t+'px':ele.style.top=0+'px';
                break;
            case 40:
                var t=ele.offsetTop+30;
                t<=b_h-oDiv_h? ele.style.top=t+'px':ele.style.top=b_h-oDiv_h+'px';
                break;
        }
    }
}

//旋转方块
function rotateDiv(ele) {
    document.onkeydown=function (event) {
        oEve=event || window.event;
        switch (oEve.keyCode){
            case 39:
                ele.style.transform='rotate(0deg)';
                break;
            case 37:
                ele.style.transform='rotate(180deg)';
                break;
            case 38:
                ele.style.transform='rotate(270deg)';
                break;
            case 40:
                ele.style.transform='rotate(90deg)';
                break;
        }
    }
}

//屏幕绝对居中
function position(ele) {
    ele.style.display='block';
    var l=(document.documentElement.clientWidth-ele.offsetWidth)/2;
    var t=(document.documentElement.clientHeight-ele.offsetHeight)/2;
    ele.style.left=l+'px';
    ele.style.top=t+'px';
}

//自定义滚动条
function scroll(box,scroll,artical) {
    scroll.onmousedown=function (event) {
        var oEv=event || window.event;
        var disY=oEv.clientY-scroll.offsetTop;
        document.onmousemove=function (event) {
            var oEv=event || window.event;
            var t=oEv.clientY-disY;
            var h=box.offsetHeight-scroll.offsetHeight;
            var hh=artical.offsetHeight-box.offsetHeight;
            var rota=hh/h;
            t<=h && t>=0? scroll.style.top=t+'px':null;
            t<=h && t>=0? artical.style.top=-t*rota+'px':null;
        }
    }
    document.onmouseup=function () {
        document.onmousemove=null;
    }
}

//放大镜
function scale(viewbox,minibox,bigbox,showbox,rota) {
    viewbox.onmousemove=function (event) {
        var oEve=event || window.event;
        minibox.style.display='block';
        showbox.style.display='block';
        var w=minibox.offsetWidth;
        var h=minibox.offsetHeight;
        var ww=viewbox.offsetWidth;
        var hh=viewbox.offsetHeight;
        showbox.style.width=w*rota+'px';
        showbox.style.height=h*rota+'px';
        bigbox.style.width=ww*rota+'px';
        bigbox.style.height=hh*rota+'px';
        minibox.style.display='block';
        minibox.style.cursor='move';
        var l=oEve.clientX-viewbox.offsetLeft-minibox.offsetWidth/2;
        var t=oEve.clientY-viewbox.offsetTop-minibox.offsetHeight/2;
        l<=ww-w && l>=0? minibox.style.left=l+'px':null;
        l<=ww-w && l>=0? bigbox.style.left=-l*rota+'px':null;
        t<=hh-h && t>=0? minibox.style.top=t+'px':null;
        t<=hh-h && t>=0? bigbox.style.top=-t*rota+'px':null;
    };
    viewbox.onmouseout=function () {
        minibox.style.display='none';
        showbox.style.display='none';
    };
}

//碰撞
function drag(A,B) {
    var b_w=document.documentElement.clientWidth;
    var b_h=document.documentElement.clientHeight;
    var oA_w=A.offsetWidth;
    var oA_h=A.offsetHeight;
    var oB_w=B.offsetWidth;
    var oB_h=B.offsetHeight;
    var num=0;
    A.onmousedown=function (event) {
        oEve=event || window.event;
        var disX=oEve.clientX-A.offsetLeft;
        var disY=oEve.clientY-A.offsetTop;
        document.onmousemove=function (event) {
            oEve=event || window.event;
            var l=oEve.clientX-disX;
            var t=oEve.clientY-disY;
            l<=b_w-oA_w && l>=0? A.style.left=l+'px':null;
            t<=b_h-oA_h && t>=0? A.style.top=t+'px':null;
            var oA_l=A.offsetLeft;
            var oA_t=A.offsetTop;
            var oA_r=A.offsetLeft+oA_w;
            var oA_b=A.offsetTop+oA_h;
            var oB_l=B.offsetLeft;
            var oB_t=B.offsetTop;
            var oB_r=B.offsetLeft+oB_w;
            var oB_b=B.offsetTop+oB_h;
            if (oA_l>oB_r || oA_t>oB_b || oA_r<oB_l || oA_b < oB_t){
                A.style.background=B.style.background='';
            }else {
                A.style.background=B.style.background='red';
                oA_l==oB_r || oA_t==oB_b || oA_r==oB_l || oA_b==oB_t? num++:null;
                A.innerHTML=B.innerHTML=num;
            }
        }
    }
    B.onmousedown=function (event) {
        oEve=event || window.event;
        var disX=oEve.clientX-B.offsetLeft;
        var disY=oEve.clientY-B.offsetTop;
        document.onmousemove=function (event) {
            oEve=event || window.event;
            var l=oEve.clientX-disX;
            var t=oEve.clientY-disY;
            l<=b_w-oA_w && l>=0? B.style.left=l+'px':null;
            t<=b_h-oA_h && t>=0? B.style.top=t+'px':null;
            var oA_l=A.offsetLeft;
            var oA_t=A.offsetTop;
            var oA_r=A.offsetLeft+oA_w;
            var oA_b=A.offsetTop+oA_h;
            var oB_l=B.offsetLeft;
            var oB_t=B.offsetTop;
            var oB_r=B.offsetLeft+oB_w;
            var oB_b=B.offsetTop+oB_h;
            if (oA_l>oB_r || oA_t>oB_b || oA_r<oB_l || oA_b < oB_t){
                A.style.background=B.style.background='';
            }else {
                A.style.background=B.style.background='red';
                oA_l==oB_r || oA_t==oB_b || oA_r==oB_l || oA_b==oB_t? num++:null;
                A.innerHTML=B.innerHTML=num;
            }
        }
    }
    document.onmouseup=function () {
        document.onmousemove=null;
    }
}
//清除空白节点
function cleanSpace(ele) {
    for (var i=0; i<ele.childNodes.length; i++){
        var node=ele.childNodes[i];
        node.nodeType==3 && !/\s/.test(node.nodeValue)? node.parentNode.removeChild(node):null;
    }
}
//insertAfter
function insertAfter(newEle,targetEle) {
    var parentEle=targetEle.parentNode;
    parentEle.lastChild==targetEle? parentEle.appendChild(newEle):parentEle.insertBefore(newEle,targetEle.nextSibling);
}
//insertBefore
function insertBefore(newEle,targetEle) {
    var parentEle=targetEle.parentNode;
    parentEle.insertBefore(newEle,targetEle);
}
//getByClass兼容IE 5、6、7、8
function getByClass(elm,cls) {
    var arr=[];
    var all=document.getElementsByTagName('*');
    if (elm.getElementsByClassName){
        return elm.getElementsByClassName(cls)
    }
    else {
        for (var i=0; i<all.length; i++){
            all[i].className==cls? arr.push(all[i]):null;
        }
        return arr;
    }
}

//从样式表中取值
function getStyle(obj,name) {
    var value=obj.currentStyle? obj.currentStyle[name]:getComputedStyle(obj,false)[name];
    if (name=='opacity'){
        value=Math.round(parseFloat(value)*100);
    }
    else {
        value=parseInt(value);
    }
    return value;
}

//$选择器
function $(str){
    var sOne=str.charAt(0);
    switch(sOne){
        case '#':
            return document.getElementById(str.substring(1));
            break;
        case '.':
            return getByClass(document.body,str.substring(1));
            break;
        default:
            return document.getElementsByTagName(str);
    }
};

//DocumentReady
function DocumentReady(fn) {
    if (document.addEventListener) document.addEventListener('DOMContentLoaded',fn,false)
    else {
        document.attachEvent('onreadystatechange',function () {
            if (document.readyState=='complete') fn && fn();
        })
    }
}
