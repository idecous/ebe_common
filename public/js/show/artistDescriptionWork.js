var EBE_MultipleViewManager = function(){
    var winEl = $(window);
    var el = $(".common_mainPanel .multipleViewBlock");
    var bgEl = el.find(".holderBG");
    var blockEls = el.find("a");
    var indexEls = el.find("a .index");

    var blockCount = blockEls.length;
    var elWidth = 0;
    var elHeight = 0;
    var spaceH = 0;
    var minWidth = 40;

    blockEls.each(function(index){
        blockEls.eq(index).css("zIndex",index);
    });
    function resizeHandler(){
        elWidth = el.width();
        elHeight = el.height();
        spaceH = elWidth/blockEls.length;
        blockEls.width(elWidth);
        var i,blockEl;
        for(i=0; i <blockCount;i++  ){
            blockEl = blockEls.eq(i);
            blockEl.css( "left" , i*spaceH  );
        }
    };
    function initHandler(){
        resizeHandler();
        el.css("visibility","visible");
        winEl.resize(resizeHandler);

        blockEls.mouseenter(function(){
            var tIndex  = blockEls.index(this);
            indexEls.stop();
            blockEls.stop().each(function(index){
                var blockEl = blockEls.eq(index);
                if(  index < tIndex){
                    blockEl.animate({"left": index * minWidth});
                    indexEls.eq(index).animate({"opacity":1});
                }else if( index > tIndex){
                    blockEl.animate({"left":elWidth - (blockCount-index)*minWidth });
                    indexEls.eq(index).animate({"opacity":1});
                }else{
                    blockEl.animate({"left":index * minWidth });
                    indexEls.eq(index).animate({"opacity":0});
                }
            });
        });
        el.mouseleave(function(){
            indexEls.stop();
            blockEls.stop().each(function(index){
                blockEls.eq(index).animate({ "left" :index * spaceH } );
                indexEls.eq(index).animate({"opacity":1});
            });
        });
    };
    if( bgEl.prop("complete") ){
        initHandler();
    }else{
        bgEl[0].onload = initHandler;
    }
};
var EBE_VideoHtml5 = function(){
    var videoEl = $(".top_videoBlock video");
    var playBtnEl = $(".top_videoBlock a");

    playBtnEl.click(function(){
        playBtnEl.hide();
        videoEl[0].play();
    });
};
var EBE_VideoSwf = function(swfID){
    var videoPlayerEl = $(".top_videoBlock");
    var bgEl = videoPlayerEl.children("img");
    var playBtnEl = videoPlayerEl.children("a");
    var videoUrl = videoPlayerEl.children("video").attr("src");
    videoPlayerEl.empty().append(bgEl);
    $("<div id='"+swfID+"'></div>").appendTo(videoPlayerEl);
    playBtnEl.appendTo(videoPlayerEl);

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
    params.wmode = "opaque";

    var attributes = {};
    attributes.id = swfID;
    attributes.name = swfID;
    attributes.align = "middle";

    swfobject.embedSWF(
        "public/swf/videoPlayer.swf", swfID,
        "100%", "100%", "11.4.0",null,flashvars,params,attributes);
    swfobject.createCSS("#"+swfID, "display:block;position: absolute;left:0;top:0;z-index:0");

    playBtnEl.click(function(){
        playBtnEl.hide();
        $("#"+swfID)[0].firstPlay();
    });
};
var EBE_VideoManager = function(){
    if(!$("<video></video>").prop("canPlayType")){
        new EBE_VideoSwf("swf____ID");
    }else{
        new EBE_VideoHtml5();
    }
};

$(function(){
    new EBE_MultipleViewManager();
    new EBE_VideoManager();
});