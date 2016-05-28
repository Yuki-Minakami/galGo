/**
 * Created by likai on 16/5/22.
 */
var text;
var CGList;
ipcRenderer.send("reqTxt",getStatus());
ipcRenderer.send("reqCG",getStatus());
var txtCount = 1;
var CGCount = 0;

$("img").on("click",function(){
    if(text){
        if(text[txtCount] == "&&"){
            CGCount ++;
            $(".CG").attr("src","CG/"+CGList[CGCount]+".png")
            txtCount++;
        }

        $(".text").val(text[txtCount])

        if(txtCount == text.length){
            changeBG();//背景改变，下面请求该BG的文字，人物，BGM等信息
            ipcRenderer.send("reqTxt",getStatus());
            ipcRenderer.send("reqCG",getStatus());
            text = false;
        }else{
            txtCount++;
        }
    }
})

ipcRenderer.on("reqTxtCallback",function(event,arg){
    text = arg;
    console.log(text);
    txtCount = 1;
    $(".text").val(text[0])

})

ipcRenderer.on("reqCGCallback",function(event,arg){
    CGList = arg;
    CGCount =0;
    $(".CG").attr("src","CG/"+CGList[0]+".png");
})

function getStatus(){
    var pic = $(".BG").attr("src");
    var pic2 = $(".CG").attr("src");
    var count = pic.substr(4,1);
    var count2 = pic.substr(4,1);
    var obj ={
        "BG":count,
        "CG":count2
    }
    return obj;
}

function changeBG(){
    var count = getStatus().BG;
    ++count;
    var newSrc = "BG/p"+count+".png";
    $(".BG").attr("src",newSrc);
}
