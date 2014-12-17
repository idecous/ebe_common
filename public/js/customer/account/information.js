var EBE_SubmitManager = function(patternEmail,patternPassword ){
    var formEl =$(".common_rightPanel form");
    var liEls = $(".common_rightPanel .formBlock li:gt(0)");
    var inputEls = $(".common_rightPanel .formBlock li input:not([type=checkbox],[type=submit]):gt(0)");
    var warnEls = $(".common_rightPanel .formBlock li .warn:gt(0)");
    var PWliEls = liEls.slice(3,6);
    var PW_changeSelectorEl = liEls.eq(2).children("input");
    var PW_changeSelectorLabelEl = liEls.eq(2).children("span");
    var isChangePW = PW_changeSelectorEl.prop("checked");




    formEl.submit(function(){
        var result = true;
        if( $.trim( inputEls.eq(0).val() ) == "" ){
            result = false;
            warnEls.eq(0).css("visibility","visible");
        }else{
            warnEls.eq(0).css("visibility","hidden");
        }
        if( $.trim( inputEls.eq(1).val() ) == "" ){
            result = false;
            warnEls.eq(1).css("visibility","visible");
        }else{
            warnEls.eq(1).css("visibility","hidden");
        }

        if( !isChangePW ){
            return result;
        }

        var pwResult = true;
        if( !patternPassword.test( $.trim( inputEls.eq(2).val())) ){
            pwResult = false;
            warnEls.eq(2).css("visibility","visible");
        }else{
            warnEls.eq(2).css("visibility","hidden");
        }
        if( !patternPassword.test( $.trim(inputEls.eq(3).val()) ) ){
            pwResult = false;
            warnEls.eq(3).css("visibility","visible");
        }else{
            warnEls.eq(3).css("visibility","hidden");
        }
        if( pwResult ){
            if(  $.trim(inputEls.eq(3).val()) != $.trim(inputEls.eq(4).val()) ){
                pwResult = false;
                warnEls.eq(4).css("visibility","visible");
            }else{
                warnEls.eq(4).css("visibility","hidden");
            }
        }else{
            warnEls.eq(4).css("visibility","hidden");
        }
        if(!pwResult){
            result = false;
        }
        return result;
    });

    PW_changeSelectorLabelEl.click(function(){
        isChangePW = !isChangePW;
        PW_changeSelectorEl.prop("checked",isChangePW);
        updatePWstatus();
    });
    PW_changeSelectorEl.change(function(){
        isChangePW = PW_changeSelectorEl.prop("checked");
        updatePWstatus();
    });
    function updatePWstatus(){
        if(isChangePW){
            PWliEls.show();
        }else{
            PWliEls.hide();
        }
    }
    updatePWstatus();
};

$(function(){
    new EBE_SubmitManager(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,/^[a-zA-Z0-9!@#$%^&*]{6,16}$/i);
});