//停止使用

function getStatus(){
    var pic = $(".BG").attr("src");
    var count = pic.substr(4,1);
    var obj ={
        "BG":count
    }

    return obj;
}

$("img").on("click",function(){
    var count = getStatus().BG;

    ++count;
    var newSrc = "BG/p"+count+".png";
    $(".BG").attr("src",newSrc);
})