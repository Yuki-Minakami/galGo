function getStatus(){
    var pic = $(".BG").attr("src");
    var count = pic.substr(4,1);
    return count;
}

$("img").on("click",function(){
    var count = getStatus();
    ++count;
    var newSrc = "BG/p"+count+".png";
    $(".BG").attr("src",newSrc);
})