var EBE_VideoManager = function( swfID ){
    if($("<video></video>").prop("canPlayType")){return;}
    var videoPlayerEl = $(".videoBlock");
    var bgEl = videoPlayerEl.find(".bg");
    var videoUrl = $(".video").attr("src");
    videoPlayerEl.empty();
    bgEl.appendTo(videoPlayerEl);
    $("<div id='"+swfID+"'></div>").appendTo(videoPlayerEl);

    var flashvars = {};
    flashvars.title = "";
    flashvars.description = "";
    flashvars.video = videoUrl;
    var params = {};
    params.quality = "high";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    params.allowScriptAccess = "always";
    params.allowFullScreen = "true";

    var attributes = {};
    attributes.id = swfID;
    attributes.name = swfID;
    attributes.align = "middle";

    swfobject.embedSWF(
        "../public/swf/videoPlayer.swf", swfID,
        "100%", "100%", "11.4.0",null,flashvars,params,attributes);
    swfobject.createCSS("#"+swfID, "display:block;position: absolute;left:0;top:0;");

    setTimeout(function(){
        $("#"+swfID)[0].firstPlay();
    },1000);



}

$(function(){
    new EBE_VideoManager("swf____ID");
});