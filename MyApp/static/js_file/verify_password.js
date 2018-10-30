
        function formValidation() {
            var otp = document.getElementById('otp').value;
            var password = document.getElementById('password').value;
            var password1 = document.getElementById('password1').value;
            if(otp ==="") {
                Materialize.toast('Enter OTP Number...!', 2000, 'rounded');
                otp.focus();
                return false;
            }

            else if(password === ""){
                Materialize.toast('Fill The Password.', 3000,'rounded');
                password.focus();
                return false;
            }
            else if(password1 === ""){
                Materialize.toast("Fill The Re_Enter Password",2000,'rounded');
                return false;
            }
            else if(password != password1){
                Materialize.toast("Password Not Match",2000,'rounded');
                return false;
            }
            else{
                ajaxCalling();
            }
        }
        function ajaxCalling() {
            $.ajax({
                type: 'POST',
                url: '/verify_password/',
                data: {
                    otp: $("#otp").val(),
                    password: $("#password").val(),
                },
                success: function (data) {
                    if (data.success === true) {
                        Materialize.toast("Password Reset Successfully ", 2000, 'rounded');
                        window.location=/login/

                    } else {
                        Materialize.toast('Not Verify User', 3000, 'rounded');
                        return false;
                    }
                },
            });
        }