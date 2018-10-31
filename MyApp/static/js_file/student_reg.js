
//create Student Record
$(document).ready( function() {
            var now = new Date();
            var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
            $('.dob').val(today);
});
$(document).ready(function () {
   $('#formData').keypress(function(e) {
       alert("hi");
            if (e.keyCode === 13) {
                alert("hi");
                formValidation();
            }
    });
});
function formValidation(){
         var roll_no = document.getElementById('roll_no').value;
         var name = document.getElementById('name').value;
         var email = document.getElementById('email').value;
         var mobile = document.getElementById('mobile').value;
         var password = document.getElementById('password').value;
         var gender1 = document.getElementById('male').checked;
         var gender2 = document.getElementById('female').checked;
         var dob = document.getElementById('dob').value;
         var address = document.getElementById('address').value;
         var mob = /^[7-9]{1}[0-9]{9}$/;



         //Student Id Validation
         if(roll_no == ""){
              Materialize.toast('Please Fill Student Roll No....!', 2000,'rounded');
             return false;
         }

         //Student Name Validation
         if(name == ""){
             Materialize.toast('Please Fill The Student Name...!', 2000,'rounded');
             return false;
         }
         if((name.length < 3) || (name.length >20)){
            Materialize.toast('Please Fill The Student Name Between 3 and 20', 2000,'rounded');
             return false;
         }
         if(!isNaN(name)){
             Materialize.toast('Name Only Character..! ', 2000,'rounded');
             return false;
         }
         //Email Validation

         if(email == ""){
             Materialize.toast('Please Fill the Student Email..! ', 2000,'rounded');
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




         //Mobile no. validation
         if(mobile == ""){
             Materialize.toast('Please Fill The Mobile Number', 2000,'rounded');
             return false;
         }
         if(mobile.length !=10){
             Materialize.toast('Please Enter Only 10 Digits"', 2000,'rounded');
             return false;
         }
         if(isNaN(mobile)){
             Materialize.toast('Mobile Number Should Contains Only Digit', 2000,'rounded');
             return false;
         }
         if(mob.test(mobile) == false){
             Materialize.toast("Enter Valid Mobile No. first digit [7-9]",2000,'rounded');
             mobile.focus();
             return false;
         }


         //password Validation

         if(password == "") {
             Materialize.toast('Please Fill the Student Password', 2000,'rounded');
             return false;
         }
         if((password.length < 6) || (password.length >20)){
             Materialize.toast('Please Fill The Student password Between 6 and 20', 2000,'rounded');
             return false;
         }
         //Gender validation
         if((gender1=="")&&(gender2=="")){
             Materialize.toast('Please select Gender', 2000,'rounded');
             return false;
         }
         /*if((genderdata != "male") || (genderdata!="female"))
         {
           document.getElementById('gender1').innerHTML="** Please select Either Male or Female";
             return false;
         }*/
         //DOB Validation
         if(dob==""){
             Materialize.toast('Please Fill the Student Date Of Birth', 2000,'rounded');
             return false;

         }



         //Address Validation
         if(address==""){
             Materialize.toast('Please Fill the Student Address', 2000,'rounded');
             return false;
         }
         else if(!isNaN(address)){
             Materialize.toast("Enter Proper Address..",2000,'rounded');
             return false;

         }


         studentRegistration();




     }
     function  studentRegistration() {
    var formdata = new FormData();
       var image = $('#image')[0].files[0];
       var roll_no = $('.roll_no').val();
       var name = $('.name').val();
       var email = $('.email').val();
       var mobile = $('.mobile').val();
       var password = $('.password').val();
       var gender = $('.gender').val();
       var dob = $('.dob').val();
       var address = $('.address').val();
       formdata.append("image",image);
       formdata.append("roll_no",roll_no);
       formdata.append("name",name);
       formdata.append("email",email);
       formdata.append("mobile",mobile);
       formdata.append("password",password);
       formdata.append("gender",gender);
       formdata.append("dob",dob);
       formdata.append("address",address);


         $.ajax({
             type:'POST',
             url:/student_data_store/,
             data:formdata,
             catch: false,
             processData: false,
             contentType: false,
             success:function (data) {
                 console.log(data);
                 if(data.roll_exist === true){
                     Materialize.toast("Roll No. Already Exist",2000,'rounded');
                     return false;
                 }
                 if(data.success){
                     Materialize.toast("Registration Success..!",4000,'rounded');
                     window.location='/dashboard/'
                 }else{
                     Materialize.toast("Registration Failed..!",2000,'rounded');
                 }
                 $('input[type="text"],input[type="number"],input[type="email"],input[type="password"]').val('');
                 $("input:radio").removeAttr("checked");
             }


         });

     }





     //Update Student Record


  function updateValidation() {
         //var id = document.getElementById('id').value;
         var roll_no=document.getElementById('roll_no').value;
         var name = document.getElementById('name').value;
         var email = document.getElementById('email').value;
         var mobile = document.getElementById('mobile').value;
         var password = document.getElementById('password').value;
         var dob = document.getElementById('dob1').value;
         var address = document.getElementById('address').value;



         if(roll_no == ""){
             Materialize.toast("Fill Student Roll No.",2000,'rounded');
             return false;
         }
         else if(isNaN(roll_no)){
             Materialize.toast("Enter Only Digit",2000,'rounded');
             return false;
         }

         if(name == ""){
             Materialize.toast('Fill Student Name...!', 2000,'rounded');
             return false;
         }
         else if(!isNaN(name)){
             Materialize.toast('Please Only Character..! ', 2000,'rounded');
             return false;
         }
         else if(email == ""){
             Materialize.toast('Fill Student Email...!', 2000,'rounded');
             return false;
         }
         else if(email.indexOf('@')<=0)
         {
             Materialize.toast('Please Fill the Email Id Proper Formate @', 2000,'rounded');
             return false;
         }
         else if((email.charAt(email.length-4) != '.') && (email.charAt(email.length-3)!='.')){
           Materialize.toast('Please Fill the Email Id Proper Formate .', 2000,'rounded');
             return false;
         }

         else if(mobile == ""){
             Materialize.toast('Please Fill the Mobile No. .', 2000,'rounded');
             return false;
         }

         else if(password == ""){
             Materialize.toast('Please Fill the Password. .', 2000,'rounded');
             return false;
         }
         else if(dob == ""){
             Materialize.toast('Please Fill the Date of Birthday. .', 2000,'rounded');
             return false;
         }
         else if(address == ""){
             Materialize.toast('Please Fill the Address. .', 2000,'rounded');
             return false;
         }





         updateRecord()

     }
     function updateRecord(){
         $.ajax({
             type: 'POST',
             url:/student_data_update/,
             data:{
                 id:$('.id').val(),
                roll_no:$('.roll_no').val(),
               name:$('.name').val(),
               email:$('.email').val(),
               mobile:$('.mobile').val(),
               password:$('.password').val(),
               dob:$('.dob1').val(),
                 address:$('.address').val(),
             },
             success:function (data) {
                 if(data.success == true){
                     Materialize.toast("Student Recore Update Successfully...!",3000,'rounded');
                     window.location=/dashboard/
                 }else{
                     Materialize.toast("Record Updat Failed...!",3000,'rounded')
                 }
             }
         })
     }


    function numberCheck(evt) {
            evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    return false;
                }
             return true;

        }



    ;

