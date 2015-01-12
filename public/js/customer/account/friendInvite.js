var EBE_SubmitManager = function(warnMessage,patternEmail){
    var formEl = $(".common_mainPanel .bottomBlock .emailInputRow form");
    var inputEl = formEl.find("input[type='text']");
    var inputHiddenEl = formEl.find("input[type='hidden']");
    var infoEl = $(".common_mainPanel .bottomBlock .emailInputRow .cell .inputBorder span");
    inputEl.focus(function(){
        infoEl.hide();
    }).blur(function(){
        var val = $.trim( inputEl.val() );
        if( val == ""){
            infoEl.show();
        }
    });
    formEl.submit(function(){
        if(  !patternEmail.test( $.trim( inputEl.val() )  )  ){
            alert(warnMessage);
            return false;
        }
        inputHiddenEl.val( $.trim( inputEl.val() ) );
    });
};
$(function(){
    new EBE_SubmitManager("邮件地址错误!",/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

});