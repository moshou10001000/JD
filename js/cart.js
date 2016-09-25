/**
 * Created by Administrator on 2016/7/24.
 */

$(function () {
    $.ajax({
        type:"GET",
        url:"data/product.json",
        success:showProduct
    });

    function showProduct(data) {
        var html="";
        for (var i=0;i<data.length;i++){
            html+='<li class="cartList"> ' +
                '<div class="checkbox"><input type="checkbox"></div> ' +
                '<div class="product">'+ data[i].product+'</div> ' +
                '<div class="style">'+ data[i].props+'</div> ' +
                '<div class="price">'+ data[i].price+'</div> ' +
                '<div class="quantity"><input type="button" value="-"><input type="text" value="'+ data[i].quantity+'"><input type="button" value="+"></div> ' +
                '<div class="sum">'+ data[i].price*data[i].quantity+'</div> ' +
                '<div class="action"><a href="javascript:;">删除</a><br><a href="javascript:;">移到我的关注</a></div> ' +
                '</li>';
        }
        $(".cartLists").html(html);
    }
});









