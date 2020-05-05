//最开始调用显示第一页的信息
loadData(1)
//根据页码查询菜单

function loadData(nowpage){
    $.ajax({
        type: 'post',
        url: 'http://39.105.232.109:3000/order/getInfoByPage',
        data: {
            pageSize: 4,
            page: nowpage
        },
        success: function (data) {
            console.log(data)
            var order = data.info.list;
            var str = '';
            for (var i = 0; i < order.length; i++) {
                str += '<tr class="item" v-if="book.items">' +
                    '<td class="item-title">' + order[i].drawee + '</td>' +
                    '<td class="item-title">' + order[i].receivables + '</td>' +
                    '<td class="item-title">' + order[i].food + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-success alter" style="margin-right: 20px" '+ 'data-id=' + order[i]._id + ' >' + '修改' + '</button>' +
                    '</td>'
                '</tr>';
                pagintFactory(data, nowpage)
            }
            //输出菜单
            $('.order_tbody').html(str);
            //显示修改
            $(".alter").click(function () {
                $(".alter_hidden").css("display", "block")
            });
        }
    })
}
//跳转的页码
function pagintFactory(data, nowpage){
    var html = "";
    $(".page").html(html);
    var pageHtml = "<li "+ "class=shang " + (data.page !== 1 ? "" : "disabled") + ">«</li>";
    var pageTotal = data.info.allpage >= 6 ? 6 : data.info.allpage;
    if (nowpage < 6) {
        for (var j = 1; j <= pageTotal; j++) {
            pageHtml += "<li " + (nowpage === j ? "disabled" : "") + "class=num" + " data-pageid='" + j + "'>" + j + "</li>";
        }
    } else {
        for (var j = 1; j <= pageTotal; j++) {
            if (j < 3) {
                pageHtml += "<li " + (nowpage === j ? "disabled" : "") + " data-pageid='" + j + "'>" + j + "</li>";
            }
            if (j === 3) {
                pageHtml += "<li disabled class='jump'>...</li>";
            }
            if (nowpage > 3) {
                if (j === 4) {
                    if (nowpage === data.info.allpage) {
                        pageHtml += "<li data-pageid='" + (nowpage - 2) + "'>" + (nowpage - 2) + "</li>";
                    }
                    pageHtml += "<li data-pageid='" + (nowpage - 1) + "'>" + (nowpage - 1) + "</li>";
                }
                if (j === 5) {
                    pageHtml += "<li disabled data-pageid='" + nowpage + "'>" + nowpage + "</li>";
                }
                if (j === 6 && nowpage < data.info.allpage) {
                    pageHtml += "<li data-pageid='" + (nowpage + 1) + "'>" + (nowpage + 1) + "</li>";
                }
            }
            if (j === 6 && nowpage < (data.info.allpage - 1)) {
                pageHtml += "<li disabled class='jump'>...</li>";
            }
        }
    }
    pageHtml += "            <li "+"class=xia " + (nowpage >= data.info.allpage ? "disabled" : "") + " data-pageid='" +  "'>»</li>";
    pageHtml += "<li class='jump' disabled>共" + data.info.allpage + "页, 到第<input class='entrance' value='" + nowpage + "' type='text'>页</li><li data-total='" + data.info.allpage + "' class='confirm'>确定</li>"
    $('.page').html(pageHtml);
}
//跳转页面
$(document).on('click', '.page li:not([disabled])', function () {
    //confirm 判断点击的是确定还是页码
    if ($(this).hasClass('confirm')) {
        //是确定，要获取输入的是第几页。
        var apage = parseInt($('.entrance').val());
        if (apage <= 0 || apage > $(this).data('total') || isNaN(apage)) {
            layer.msg('请输入正确的页码！');
        } else {
            loadData(apage);
        }
    }
    else {
        //这里就是点击页码后的调用。
        var pageId = $(this).data('pageid');
        loadData(pageId);
    }
}),
//添加订单显示
    $(".append").click(function () {
        $(".order_hidden").css("display", "block")
    }),
//添加订单并隐藏
    $(".define").click(function () {
        $(".order_hidden").css("display", "none")
        var food = $('.food').val();
        var receivables = $('.receivables').val();
        var drawee = $('.drawee').val();
        $.ajax({
            type: 'post',
            url: 'http://39.105.232.109:3000/order/add',
            data: {
                food: food,
                receivables: receivables,
                drawee: drawee,
            },
            success: function (data) {
                console.log(data)
                loadData(1)
                //获取需要的数据
            },
            error: function (a) {
                console.log(a)
            }
        })
    });
//确定
$(".alter_define").click(function () {
    $(".alter_hidden").css("display", "none")
    alter()
})
//修改的ajax
function alter() {
    var _id = $('.alter').data('id');
    var food = $('.alter_food').val();
    var receivables = $('.alter_receivables').val();
    var drawee = $('.alter_drawee').val();
    $.ajax({
        type: 'post',
        url: 'http://39.105.232.109:3000/order/updata',
        data: {
            _id:_id,
            food: food,
            receivables: receivables,
            drawee: drawee,
        },
        success: function (data) {
            loadData(1)
            console.log(data)
            //获取需要的数据
        },
        error: function (a) {
            console.log(a)
        }
    })
}

