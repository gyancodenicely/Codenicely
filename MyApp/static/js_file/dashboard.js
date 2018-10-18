
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

 //add Marks in table

    function save_marks() {
        var math = document.getElementById('math').value;
        var science = document.getElementById('science').value;
        var socal = document.getElementById('socal').value;
        var hindi = document.getElementById('hindi').value;
        var sanskrit = document.getElementById('sanskrit').value;
        var english = document.getElementById('english').value;

        if(math == ""){
            Materialize.toast("Enter Mathematic Marks",2000,'rounded');
            math.focus();
            return false;
        }
        else if(math > 100){
            Materialize.toast("Enter Marks Maximum 100",2000,'rounded');
            math.focus();
            return false;
        }
        if(science == ""){
            Materialize.toast("Enter science Marks",2000,'rounded');
            science.focus();
            return false;
        }
        else if(science > 100){
            Materialize.toast("Enter Marks Maximum 100",2000,'rounded');
            science.focus();
            return false;
        }
        if(socal == ""){
            Materialize.toast("Enter socal Science Marks",2000,'rounded');
            socal.focus();
            return false;
        }
        else if(socal > 100){
            Materialize.toast("Enter Marks Maximum 100",2000,'rounded');
            socal.focus();
            return false;
        }
        if(english == ""){
            Materialize.toast("Enter English Marks",2000,'rounded');
            english.focus();
            return false;
        }
        else if(english > 100){
            Materialize.toast("Enter Marks Maximum 100",2000,'rounded');
            english.focus();
            return false;
        }
        if(hindi == ""){
            Materialize.toast("Enter Hindi Marks",2000,'rounded');
            hindi.focus();
            return false;
        }
        else if(hindi > 100){
            Materialize.toast("Enter Marks Maximum 100",2000,'rounded');
            hindi.focus();
            return false;
        }
        if(sanskrit == ""){
            Materialize.toast("Enter Sanskrit Marks",2000,'rounded');
            socal.focus();
            return false;
        }
        else if(sanskrit > 100){
            Materialize.toast("Enter Marks Maximum 100",2000,'rounded');
            socal.focus();
            return false;
        }

         add_ajaxMarks()

    }
    function add_ajaxMarks() {
            $.ajax({
                type:'POST',
                url:/add_marks/,
                data:{
                    sid:$('.sid').val(),
                    roll_no:$('.roll_no').val(),
                    //name:$('.name').val(),
                    math:$('.math').val(),
                    science:$('.science').val(),
                    socal:$('.socal').val(),
                    english:$('.english').val(),
                    hindi:$('.hindi').val(),
                    sanskrit:$('.sanskrit').val(),
                    obtain:$('.obtain').val(),
                    percentage:$('.percentage').val(),

                },
                success:function (data) {
                    if(data.success == true){
                        Materialize.toast("Marks Save In Database",2000,'rounded');
                        window.location=/dashboard/;
                    }
                    else{
                        Materialize.toast("Marks Not Saved",2000,'rounded');
                    }
                }
            })

    }
//calculate total marks
   $(function () {
        $('#math').on('input', function() {
      calculate();
    });
    $('#science').on('input', function() {
     calculate();
    });
    $('#socal').on('input', function() {
      calculate();
    });
    $('#english').on('input', function() {
     calculate();
    });
    $('#hindi').on('input', function() {
      calculate();
    });
    $('#sanskrit').on('input', function() {
     calculate();
    });
    function calculate() {
        var math = parseFloat($('#math').val());
        var science = parseFloat($('#science').val());
        var socal = parseFloat($('#socal').val());
        var english = parseFloat($('#english').val());
        var hindi = parseFloat($('#hindi').val());
        var sanskrit = parseFloat($('#sanskrit').val());
        var percentage = "";
        var obtain = "";
        var result="";
        if (isNaN(math) || isNaN(science) || isNaN(socal) || isNaN(english) || isNaN(hindi) || isNaN(sanskrit)) {
            obtain = " ";
        } else {
            obtain = (math + science + socal + english + hindi + sanskrit);
        }
        if (isNaN(math) || isNaN(science) || isNaN(socal) || isNaN(english) || isNaN(hindi) || isNaN(sanskrit)) {
            percentage = " ";
        } else {
            percentage = (((math + science + socal + english + hindi + sanskrit) * 100) / 600);
        }
        if(percentage >= 30  ){
            result="Pass"
        }
        else{
            result="Fail"
        }

        $('#obtain').val(obtain);
        $('#percentage').val(percentage);
        $('#result').val(result);
    }
       
   });






