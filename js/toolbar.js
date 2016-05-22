/**
 * Created by likai on 16/5/21.
 */
$(".save").on("click",function(){
    ipcRenderer.send('save','');
})

$(".load").on("click",function(){
    ipcRenderer.send('load','');
})

$(".qSave").on("click",function(){
    ipcRenderer.send('qSave',getStatus());
})

$(".qLoad").on("click",function(){
    ipcRenderer.send('qLoad','');
})




function showSLList(arg,func,currentSrc){
    $(".sl").css("display","block");
    $(".sl").empty();
    $(".sl").append('<ul class="slList"></ul>');
    var countId = 0
    $.each(arg,function(n,v){
        console.log(v.length)
        countId++;
        if(v.length>0){
            var li = $('<li class="slItem"></li>');

            var img = $( '<img class="slImg"/>');
            img.attr("src", "BG/"+v[0]+".png")
            li.append(img);

        }else{
            var li = $('<li class="slItem">empty</li>');
        }

        li.attr("id",countId)
        li.on("click",function(){
            func(this,currentSrc,$(this).attr("id"));
        });
        $(".slList").append(li);
    })
    var li = $('<li class="slItem" ><button class="slBtn slNext">下一页</button><button class="slBtn slCancle" onclick="hideSL()">返回</button></li>')
    $(".slList").append(li);
}

function hideSL(){
    $(".sl").css("display","none");
}

function load(thiz){
    var position = $(thiz).find("img").attr("src");
    if(position){
        hideSL();
        $(".BG").attr("src",position);
    }
}

function save(thiz,currentSrc,id){
    var position = $(thiz).find("img").attr("src");
    if(position){
        alert("确认覆盖吗");
        $(thiz).find("img").attr("src",currentSrc);
    }else{
        $(thiz).empty();
        var img = $('<img class="slImg"/>');
        img.attr("src", currentSrc)
        $(thiz).append(img);
    }

    var bg = currentSrc.substr(4,1);
    var count = "save"+id;
    var obj= {
        "BG":bg,
        "count":count
    }

    ipcRenderer.send('saveFinished',obj);

}



ipcRenderer.on("loadCallback",function(event,arg){
    showSLList(arg,load)
})

ipcRenderer.on("saveCallback",function(event,arg){
    var currentSrc = $(".BG").attr("src")
    showSLList(arg,save,currentSrc)
})

ipcRenderer.on("saveFinishedCallback",function(event,arg){
    alert("保存成功");
})

ipcRenderer.on("qSaveCallback",function(event,arg){
    alert("快速保存成功");
})

ipcRenderer.on("qLoadCallback",function(event,arg){
    var BGSrc = "BG/"+arg[0]+".png";
    $(".BG").attr("src",BGSrc);
})