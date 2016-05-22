/**
 * Created by likai on 16/5/22.
 */
var text;
ipcRenderer.send("reqTxt",getStatus());
var txtCount = 1;

$("img").on("click",function(){
    if(text){
        $(".text").val(text[txtCount])
        if(txtCount == text.length){
            changeBG();
            ipcRenderer.send("reqTxt",getStatus());
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

function getStatus(){
    var pic = $(".BG").attr("src");
    var count = pic.substr(4,1);
    var obj ={
        "BG":count
    }
    return obj;
}

function changeBG(){
    var count = getStatus().BG;
    ++count;
    var newSrc = "BG/p"+count+".png";
    $(".BG").attr("src",newSrc);
}