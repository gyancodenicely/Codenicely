$(document).ready(function () {
   $('#register').keypress(function(e) {
        if (e.keyCode === 13) {
            formValidation();
        }
    });
});


            function formValidation() {

                var name = document.getElementById('name');
                var email = document.getElementById('email');
                var mobile = document.getElementById('mobile');
                var gender1 = document.getElementById("male").checked;
                var gender2 = document.getElementById("female").checked;
                var pass1 = document.getElementById('password');
                var pass2 = document.getElementById('password2');
                var mob = /^[789]{1}[0-9]{9}$/;


              if(name.value == ""){
                    Materialize.toast('Fill The Name', 2000,'rounded');
                    name.focus();
                    return false;
                }
                else if(!isNaN(name.value)){
                    Materialize.toast('Enter Only Character...','2000','rounded');
                   return false;
              }
                else if(name.value.length < 4 || name.value.length >20)
                {
                   // window.alert("Name must be Enter atleast 4 character");
                    Materialize.toast('Name must be Enter atleast 4 character', 2000,'rounded');
                    name.focus();
                    return false;
                }
                else if(email.value ==""){
                    Materialize.toast('Please Enter a Valid Email', 2000,'rounded');
                    email.focus();
                    return false;
                }
                else if(email.value.indexOf("@",0)<0){
                       Materialize.toast('Please enter a valid e-mail address.', 2000,'rounded');
                        email.focus();
                        return false;
                    }

                else if (email.value.indexOf(".", 0) < 0)
                    {
                        Materialize.toast('Please enter a valid e-mail address.', 2000,'rounded');
                        email.focus();
                        return false;
                    }
                else if(mobile.value===""){
                   Materialize.toast('Please enter Mobile No.', 2000,'rounded');
                    return false;
                }
                else if(mob.test(mobile.value) == false){
                    mobile.focus();
                    Materialize.toast("Enter Valid Mobile No. start with[7-9]",2000,'rounded');
                    return false;
              }
                else if(mobile.value.length != 10){
                    Materialize.toast("Please Enter 10 Digit Mobile No.",2000,'rounded');
                    mobile.focus();
                   return false;
              }

                else if((gender1=="")&&(gender2=="")){
                    Materialize.toast('Select Gender', 2000,'rounded');
                    return false;
                }

                else if(pass1.value === "") {
                    Materialize.toast('Enter a Password...!', 2000,'rounded');
                    pass1.focus();
                    return false;
                }

              else if(pass1.value != "" && pass1.value.length < 8){
                  Materialize.toast('Enter Password atleast 8 Character', 2000,'rounded');
                  pass1.focus();
                  return false;
                  }




               else if(pass2.value==""){
                   Materialize.toast('Re-Enter Password...!', 2000,'rounded');
                   pass2.focus();
                   return false;
               }
               else if(pass1.value != pass2.value){
                   Materialize.toast('Not Match Re-Enter Password...!', 2000,'rounded');
                   pass2.focus();
                   return false;
               }



              ajaxCalling()

            }
            function ajaxCalling(){
              $.ajax({
                  type:'POST',
                  url:/register_data_store/,
                  data:{
                      name:$('.name').val(),
                      email:$('.email').val(),
                      mobile:$('.mobile').val(),
                      gender:$('.gender').val(),
                      password:$('.password').val(),
                  },
                  success:function (data) {
                      if(data.mobile_exist){
                          Materialize.toast("Mobile No. Already Exist",2000,'rounded');
                          return false;
                      }
                      else if(data.email_exist){
                           Materialize.toast("Email Already Exist",2000,'rounded');
                           return false;

                      }
                      else if(data.success){
                          window.location='/admin_reg_success/'

                      }
                      else{
                          window.location='/admin_reg_failure/'
                      }
                      $('input[type="text"],input[type="email"],input[type="radio"],input[type="password"]').val('');

                  }
              })
            }
    //mobile no. only 10 digit allow
             function numberCheck(evt) {
            evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
             return true;

        }