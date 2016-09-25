
DocumentReady(function () {
    var oUlList=$('#ulList');
    var aLi=oUlList.children;
    var aDiv=$('.overwindow');
    overWindow(aLi,aDiv);
});
DocumentReady(function () {
    var aPic=$('.bannerPic');
    var oBox=$('#listBanner');
    var aA=oBox.children;
    var btnLeft=$('#leftBtn');
    var btnRight=$('#rightBtn');
    autoBanner(aPic,aA,btnLeft,btnRight);
});
DocumentReady(function () {
    tabSlide('f1','f1Tab');
    tabSlide('f2','f2Tab');
    tabSlide('f3','f3Tab');
    tabSlide('f4','f4Tab');
    tabSlide('f5','f5Tab');
});













