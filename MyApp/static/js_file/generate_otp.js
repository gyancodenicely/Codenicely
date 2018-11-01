
$(document).ready(function () {
     $(document).ajaxStart(function(){
                $.LoadingOverlay("show");
                });
                $(window).load(function () {
                   $(document).ajaxStop(function(){
                    $.LoadingOverlay("hide");
                });
     });
});


 function formValidation() {
            //alert("hi");
            var email = document.getElementById('email').value;
            if(email == ""){
             Materialize.toast('Please Fill the Admin Email..! ', 2000,'rounded');
             return false;
             }
             if(email.indexOf('@')<=0){
                 Materialize.toast('Please Fill the Email Id Proper Formate @', 2000,'rounded');
                 return false;
             }
             if((email.charAt(email.length-4)!='.') && (email.charAt(email.length-3)!='.')){
                 Materialize.toast('Please Fill the Email Id Proper Formate .', 2000,'rounded');
                 return false;
             }
                ajaxRest();
        }
        function ajaxRest() {
            $.ajax({
               type:'POST',
               url:'/generate_otp/',
               data:{
                   email:$('#email').val(),
                   otp:$('#otp').val(),
               },
               success:function (data) {
                    if(data.success){
                       window.location=/verify_password_page/
                    }else {
                       Materialize.toast('Email Id Not Exist', 2000,'rounded');
                    }
               },

               });
            }

