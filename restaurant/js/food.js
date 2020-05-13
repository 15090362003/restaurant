//最开始调用显示第一页的信息
loadData(1)
//根据页码查询菜单
function loadData(nowpage){
    $.ajax({
        type: 'post',
        url: 'http://39.105.232.109:3000/food/getInfoByPage',
        data: {
            pageSize: 5,
            page: nowpage
        },
        success: function (data) {
            console.log(data)
            var food = data.info.list;
            localStorage.setItem("allpage", data.info.allpage)
            var str = '';
            for (var i = 0; i < food.length; i++) {
                str += '<tr class="item" v-if="book.items">' +
                    '<td class="item-title">' + food[i].name + '</td>' +
                    '<td class="item-title">' + food[i].price + '</td>' +
                    '<td class="item-title">' + food[i].desc + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-success alter" style="margin-right: 20px" '+ 'data-id=' + food[i]._id + ' data-name=' + food[i].name + ' data-price=' + food[i].price + ' data-typename='+ food[i].typename + ' data-typeid='+ food[i].typeid + ' data-desc='+ food[i].desc +'>' + '修改' + '</button>' +
                    '<button type="button" class="btn btn-danger del" '+ 'data-id=' + food[i]._id + '>' + '删除' + '</button>' +
                    '</td>'
                '</tr>';
                pagintFactory(data, nowpage)
            }
            //输出菜单
            $('.food_tbody').html(str);
            //修改
            $(".alter").click(function () {
                localStorage.setItem("alter_id", $(this).data('id'))
                $(".alter_hidden").css("display", "block")
                $(".alter_name").val($(this).data('name'));
                $(".alter_price").val($(this).data('price'));
                $(".alter_desc").val($(this).data('desc'));
                $(".alter_typename").val($(this).data('typename'));
                $(".alter_typeid").val($(this).data('typeid'));
                // $(".alter_name").attr({"value": $(this).data('name')});
                // $(".alter_price").attr({"value": $(this).data('price')});
                // $(".alter_desc").attr({"value": $(this).data('desc')});
                // $(".alter_typename").attr({"value": $(this).data('typename')});
                // $(".alter_typeid").attr({"value": $(this).data('typeid')});
            })
            //运行删除函数
            $(".del").click(function () {
                localStorage.setItem("del_id", $(this).data('id'))
                $(".del_hidden").css("display", "block")
            })
        }
    })
}
//跳转的页码
function pagintFactory(data, nowpage){
    var html = "";
    document.getElementsByClassName("page").innerHTML=html;
    var pageHtml = "<li "+ "class=shang "  + (nowpage !== 1 ? "" : "disabled") + ">«</li>";
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
    // document.getElementsByClassName("page").innerHTML=pageHtml;
    $('.page').html(pageHtml);
}
//跳转页面
$(document).on('click', '.page li:not([disabled])', function () {
    //confirm 判断点击的是确定还是页码
    var pa =parseInt($('.entrance').val());
    if ($(this).hasClass('confirm')) {
        //是确定，要获取输入的是第几页。
        var apage = parseInt($('.entrance').val());
        if (apage <= 0 || apage > $(this).data('total') || isNaN(apage)) {
            alert('请输入正确的页码！');
        } else {
            loadData(apage);
            alert("aa")
        }
    }
    else {
        if ($(this).hasClass('shang')) {
            if(pa===1){
                $('shang').attr('disabled', true);
            }else {
                loadData(pa-1)
            }

        }else {
            //这里就是点击页码后的调用。
            var pageId = $(this).data('pageid');
            loadData(pageId);
        }
        if ($(this).hasClass('xia')) {
            var all=localStorage.getItem("allpage")
            if(pa===all){
                $('xia').attr('disabled', true);
            }else {
                loadData(pa+1)
            }
        }
    }
}),
//添加菜单显示
    $(".append").click(function () {
        $(".food_hidden").css("display", "block")
    }),
//添加菜单并隐藏
$(".append_define").click(function () {
    var name = $('.name').val();
    var price = $('.price').val();
    var desc = $('.desc').val();
    var typename = $('.typename').val();
    var typeid = $('.typeid').val();
    if ($.isNumeric(price)){
        if (typename === "蔬菜" || typename === "水果" || typename === "热菜" || typename === "凉菜" || typename === "西餐"){
            if (typeid === "0" || typeid === "1" || typeid === "2" || typeid === "3" || typeid === "4"){
                $.ajax({
                    type: 'post',
                    url: 'http://39.105.232.109:3000/food/add',
                    data: {
                        name: name,
                        price: price,
                        desc: desc,
                        typename: typename,
                        typeid: typeid
                    },
                    success: function (data) {
                        loadData(1);
                        console.log(data)
                        //获取需要的数据
                    },
                    error: function (a) {
                        console.log(a)
                    }
                })
                alert("添加成功")
                $(".food_hidden").css("display", "none")
            }
            else {
                alert("请输入正确的菜品类型id")
            }
        }
        else {
            alert("请输入正确的菜品类型")
        }
    }
    else{
        alert("价格只能输入数字请重新输入")
    }
    });
//取消添加
$(".append_out").click(function () {
    $(".food_hidden").css("display", "none")
})
//修改的ajax
function alter() {
    var _id =localStorage.getItem("alter_id");
    var name = $('.alter_name').val();
    var price = $('.alter_price').val();
    var desc = $('.alter_desc').val();
    var typename = $('.alter_typename').val();
    var typeid = $('.alter_typeid').val();
    $.ajax({
        type: 'post',
        url: 'http://39.105.232.109:3000/food/updata',
        data: {
            _id:_id,
            name: name,
            price: price,
            desc: desc,
            typename: typename,
            typeid: typeid
        },
        success: function (data) {
            console.log(data)
            loadData(parseInt($('.entrance').val()))
            window.localStorage.removeItem('alter_id')
            //获取需要的数据
        },
        error: function (a) {
            console.log(a)
        }
    })
}
//删除菜品的ajax
function del() {
    var _id = localStorage.getItem("del_id");
    $.ajax({
        type: 'post',
        url: 'http://39.105.232.109:3000/food/del',
        data: {
            _id:_id,
        },
        success: function (data) {
            console.log(data)
            loadData(1);
            window.localStorage.removeItem('del_id')
            //获取需要的数据
        },
        error: function (a) {
            console.log(a)
        }
    })
}
//删除的确定与取消
$(".del_define").click(function () {
    del()
    $(".del_hidden").css("display", "none")
    alert("删除成功")
})
$(".del_out").click(function () {
    alert("你取消了删除")
    $(".del_hidden").css("display", "none")
})
//确定修改
$(".alter_define").click(function () {
    var price = $('.alter_price').val();
    var typename = $('.alter_typename').val();
    var typeid = $('.alter_typeid').val();
    if ($.isNumeric(price)) {
        if (typename === "蔬菜" || typename === "水果" || typename === "热菜" || typename === "凉菜" || typename === "西餐") {
            if (typeid === "0" || typeid === "1" || typeid === "2" || typeid === "3" || typeid === "4") {
                alter()
                $(".alter_hidden").css("display", "none")
                alert("修改成功")
                $(".alter_name").val("");
                $(".alter_price").val("");
                $(".alter_desc").val("");
                $(".alter_typename").val("");
                $(".alter_typeid").val("");
                // $(".alter_name").attr({"value": ""});
                // $(".alter_price").attr({"value": ""});
                // $(".alter_desc").attr({"value": ""});
                // $(".alter_typename").attr({"value": ""});
                // $(".alter_typeid").attr({"value": ""});
            } else {
                alert("请输入正确的菜品类型id")
            }
        } else {
            alert("请输入正确的菜品类型")
        }
    } else {
        alert("价格只能输入数字请重新输入")
    }
})
//取消修改
$(".alter_out").click(function () {
    alert('您取消了修改')
    $(".alter_hidden").css("display", "none")
})

