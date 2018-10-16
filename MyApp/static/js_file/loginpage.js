





        function formValidation() {
            var mobile = document.getElementById('mobile').value;
            var user_pass = document.getElementById('password').value;

            if(mobile ==""){
                Materialize.toast('Enter a Mobile Number...!', 2000,'rounded');
                mobile.focus();
                return false;
            }
            else if(isNaN(mobile)){

                Materialize.toast('Enter Only Digit...!',2000,'rounded');
                mobile.focus();
                return false;
            }
            else if(mobile.length != 10){
                Materialize.toast("Enter 10 Digit Mobile No.",2000,'rounded');
                return false;
            }
            else if(user_pass == ""){
                Materialize.toast('Fill The Password.', 3000,'rounded');
                password.focus();
                return false;
            }
            else{
                ajaxSubmit();
            }


        }
        //Ajax calling

        function ajaxSubmit() {
            $.ajax({
               type:'POST',
               url:'/loginUser/',
               data:{
                   mobile:$(".mobile").val(),
                   password:$(".password").val(),
               },
               success:function (data) {
                    if(data.success == true){
                        window.location=/dashboard/;
                    }else {

                       Materialize.toast('Wrong ID or Password..!', 3000,'rounded');
                    }
               },

               });
            }
            ///Allow only Enteger Value

             function numberCheck(evt) {
            evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
             return true;

        }

