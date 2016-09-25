/**
 * Created by Administrator on 2016/7/9.
 */

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


DocumentReady(function () {
    var arrPic=['url("images/moreShowPic01.jpg")'];
    arrPic.push('url("images/moreShowPic02.jpg")');
    arrPic.push('url("images/moreShowPic03.jpg")');
    arrPic.push('url("images/moreShowPic01.jpg")');
    arrPic.push('url("images/moreShowPic02.jpg")');
    var oShowPic=$('#showPic');
    var oShowBox=$('#showBox');
    var oViewBox=$('#viewBox');
    var oViewPic=$('#viewPic');
    var timer=null;
    oViewPic.onmousemove=function () {
        timer=setTimeout(scale(oViewPic,oViewBox,oShowPic,oShowBox,4),1000);
    }
    oViewPic.onmouseout=function () {
        clearTimeout(timer);
    }
    var aSmallPic=$('.smallPic');
    for (var i=0; i<aSmallPic.length; i++){
        aSmallPic[i].style.backgroundImage=arrPic[i];
        (function (index) {
            aSmallPic[i].onclick=function () {
                for (var j=0; j<aSmallPic.length; j++){
                    aSmallPic[j].className='smallPic';
                }
                this.className='smallPic ac';
                oShowPic.style.backgroundImage=arrPic[index];
                oViewPic.style.backgroundImage=arrPic[index];
            }
        })(i)
    }
});


DocumentReady(function () {
    var aProductType=$('.selectMicroBox');
    for (var i=0; i<aProductType.length; i++){
        aProductType[i].onclick=function () {
            for (var j=0; j<aProductType.length; j++) {
                aProductType[j].className='selectMicroBox';
            }
            this.className = 'selectMicroBox ac';
        }
    }
});


DocumentReady(function () {
    var otitleList=$('.titleList')[0];
    var aLi=otitleList.children;
    var aProductList=$('.productList');
    for (var i=0; i<aLi.length; i++){
        (function (index) {
            aLi[i].onclick=function () {
                for (var j=0; j<aLi.length; j++){
                    aLi[j].className='';
                    aProductList[j].className='productList';
                }
                this.className='ac';
                aProductList[index].className='productList ac';
            }
        })(i);
    }
})
DocumentReady(function () {
    var oBuyCar=$('#buyCarBtn');
    var oInput=oBuyCar.children[0];
    var addBtn=oBuyCar.children[1];
    var minusBtn=oBuyCar.children[2];
    var num=0;
    oInput.value=num;
    addBtn.onclick=function () {
        num++;
        oInput.value=num;
    }
    minusBtn.onclick=function () {
        num>0 && num--;
        oInput.value=num;
    }
})










