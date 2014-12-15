var EBE_RadioManager = function(){
    var liEls = $(".common_mainPanel li>div");
    var inputEls = $(".common_mainPanel input[type='radio']");

    liEls.click(function(){
        inputEls.eq(liEls.index(this)).prop("checked",true);
    });
};
$(function(){
    new EBE_RadioManager();
});
