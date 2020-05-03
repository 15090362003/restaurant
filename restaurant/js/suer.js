$(".revise_information").click(function () {
    $(".revise_information_hidden").css("display","block")
})
//获取
get()
function get(){
    $.ajax({
        url: 'http://39.105.232.109:3000/user/getInfoById',
        type: 'post',
        data: {
            _id:localStorage.getItem("id")
        },
        success: function (data) {
            console.log(data)
            $(".suer__id").text(data.list[0]._id)
            $(".suer_name").text(data.list[0].name)
            if(data.list[0].sex===0){
                $(".suer_sex").text('男')
            }
            if (data.list[0].sex===1)
            {
                $(".suer_sex").text('女')
            }
            $(".suer_tel").text(data.list[0].tel)
        }
    })
}
//修改
$(".define").click(function () {
    var _id=localStorage.getItem("id")
    var name=$(".input_name").val()
    var sex=$(".input_sex").val()
    var tel=$(".input_tel").val()
    $.ajax({
        url: 'http://39.105.232.109:3000/user/updata',
        type: 'post',
        data: {
            _id:_id,
            name:name,
            sex:sex,
            tel:tel
        },
        success: function(data){
            $(".suer__id").text(data._id)
            $(".suer_name").text(data.name)
            $(".suer_sex").text(data.sex)
            $(".suer_tel").text(data.tel)
            get()
        }
    })
    $(".revise_information_hidden").css("display","none")
})
//退出
$(".out").click(function () {
    localStorage.getItem("data")
    $.ajax({
        url: 'http://39.105.232.109:3000/user/logout',
        type: 'post',
        data: {},
        success: function(data){
            console.log(data)
        }
    })
})