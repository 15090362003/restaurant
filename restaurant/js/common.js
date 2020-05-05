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
            var sex
            console.log(data)
            $(".name").text(data.list[0].name)
            $(".suer_name").text(data.list[0].name)
            if(data.list[0].sex===0){
                sex="男"
            }
            if (data.list[0].sex===1)
            {
                sex="女"
            }
            $(".suer_sex").text(sex)
            $(".suer_tel").text(data.list[0].tel)
            $(".input_name").attr({"value": data.list[0].name});
            $(".input_sex").attr({"value": sex});
            $(".input_tel").attr({"value": data.list[0].tel});
        }
    })
}