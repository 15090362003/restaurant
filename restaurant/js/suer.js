$(".revise_information").click(function () {
    $(".revise_information_hidden").css("display","block")
})
$(".no").click(function () {
    $(".revise_information_hidden").css("display","none")
})
// 修改
$(".define").click(function () {
    function alter(){
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
                tel:tel,
            },
            success: function(data) {
                $(".suer_name").text(data.name)
                $(".suer_sex").text(data.sex)
                $(".suer_tel").text(data.tel)
                get()
            }
        })
    }
    if($(".input_sex").val() === "1" || $(".input_sex").val() === "0"){
        if ($(".input_tel").val().length === 11){
            alter()
            $(".revise_information_hidden").css("display","none")
        }
        else {
            alert("请输入正确的电话号码")
        }
    }else{
        alert("请输入正确的性别")
    }

})