
        $(document).ready(function () {
            $('#form_button').click(function () {
              $('.form_page').toggle();
            });
            $('.form_page').hide();




        });


        function updateLogedUser() {
            var mobile = document.getElementById('mobile').value;
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var mob = /^[7-9]{1}[0-9]{9}$/;


            if(mobile == ""){
                Materialize.toast("** Fill The Mobile No....",2000,'rounded');
                return false;
            }
            else if(mob.test(mobile) == false){

                Materialize.toast("Enter Valid Mobile No. Start With[7-9]",2000,'rounded');
                return false;
            }
            else if(mobile.length != 10){
                Materialize.toast('Enter 10 Digit Only',2000,'rounded');
                return false;
            }

            if(name == ""){
                Materialize.toast("**Fill The Name...!",2000,'rounded');
                return false;
            }
            else if(email == ""){
             Materialize.toast('Fill Student Email...!', 2000,'rounded');
             return false;
         }
         else if(email.indexOf('@')<=0)
         {
             Materialize.toast('** Please Fill the Email Id Proper Formate @', 2000,'rounded');
             return false;
         }
         else if((email.charAt(email.length-4) != '.') && (email.charAt(email.length-3)!='.')){
           Materialize.toast('** Please Fill the Email Id Proper Formate .', 2000,'rounded');
             return false;
         }
         else if(password == ""){
             Materialize.toast('** Please Fill the Password .', 2000,'rounded');
             return false;
            }
            logedUser()
        }
        function logedUser() {
           $.ajax({
               type:'POST',
               url:'/profile_update/',
               data:{
                   id:$('.id').val(),
                   mobile:$('.mobile').val(),
                   name:$('.name').val(),
                   email:$('.email').val(),
                   password:$('.password').val()
               },
               success:function (data) {
                   if (data.success == true){
                      Materialize.toast("Update Profile.",2000,'rounded') ;
                      window.location=/dashboard/;

                   }else {
                       Materialize.toast('Update Failes.',2000,'rounded');

                   }
               }
           })
        }
        //check enter only integer no.
        function numberCheck(evt) {
            evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
             return true;

        }
//Ajax calling for deletion
 function ajaxCalling() {
     $.ajax({
         type:'POST',
         url:/student_data_delete/,
         data:{
             sid:$('.s_id').val(),

         },
        success:function (data) {
          if(data.success==true){
              Materialize.toast("Delete Record SuccessFully",2000,'rounded');
              window.location=/dashboard/
          }else{
              Materialize.toast("Delete Failed",2000,'rounded');
          }

        }

     })
 }
 function delete_Data(id) {
       //var id = document.getElementById('sid').value;

       //alert(id);
       document.getElementById('s_id').value=id;
    }






