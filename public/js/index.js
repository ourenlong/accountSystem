const maxAgeOfHours = 24;

$(function () {
    loadUserAccount();
    $("#login").click(function (ev) {
        let account = $("#inputAccount").val();
        let password = $("#inputPassword").val();
        $.ajax({
            url:"",
            type:"",
            data:{
                acc:account,
                pass:password
            },
            success(){
                let userAccount=account+'&'+password;
                if(isRemembered()){
                    if(!docCookies.hasItem('userAccount')){
                        docCookies.setItem('userAccount',userAccount,new Date(Date.now()+maxAgeOfHours*60*60*1000).toUTCString());
                    }
                }else
                    docCookies.removeItem('userAccount');
                }
        });
        ev.preventDefault();
    });
});

function isRemembered() {
    return $("#remember").prop("checked") === true ? true : false;
}

function loadUserAccount() {
    if (docCookies.hasItem('userAccount')) {
        let userAccount = docCookies.getItem("userAccount");
        let data = userAccount.split('&');
        $("#inputAccount").val(data[0]);
        $("#inputPassword").val(data[1]);
    }
}
