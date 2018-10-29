
        $(document).ready(function () {
            $('#form_button').click(function () {
              $('.form_page').toggle();
            });
            $('.form_page').hide();

            student_record();
            //pre loader every ajax calling
            $(document).ajaxStart(function(){
                $.LoadingOverlay("show");
                });
                $(document).ajaxStop(function(){
                    $.LoadingOverlay("hide");
                });


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

        if(math === ""){
            Materialize.toast("Enter Mathematic Marks",2000,'rounded');
            math.focus();
            return false;
        }

        if(science === ""){
            Materialize.toast("Enter science Marks",2000,'rounded');
            science.focus();
            return false;
        }

        if(socal === ""){
            Materialize.toast("Enter socal Science Marks",2000,'rounded');
            socal.focus();
            return false;
        }

        if(english === ""){
            Materialize.toast("Enter English Marks",2000,'rounded');
            english.focus();
            return false;
        }

        if(hindi === ""){
            Materialize.toast("Enter Hindi Marks",2000,'rounded');
            hindi.focus();
            return false;
        }

        if(sanskrit === ""){
            Materialize.toast("Enter Sanskrit Marks",2000,'rounded');
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
                    roll_no:$('.student_roll_no').val(),
                    //name:$('.name').val(),
                    math:$('.math').val(),
                    science:$('.science').val(),
                    socal:$('.socal').val(),
                    english:$('.english').val(),
                    hindi:$('.hindi').val(),
                    sanskrit:$('.sanskrit').val(),
                    obtain:$('.obtain').val(),
                    percentage:$('.percentage').val(),
                    result:$('.result').val(),

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
            percentage = ((math + science + socal + english + hindi + sanskrit)  / 6);
        }
        if(math > 29 && science > 29 && socal >= 30 && english >= 30 && hindi >= 30 && sanskrit >= 30){
            result="Pass";
        }
        else{
            result="Fail";
        }

        $('#obtain').val(obtain);
        $('#percentage').val(percentage);
        $('#result').val(result);
    }
       
   });
        //call DataTable and modal
        var table;
        $(document).ready(function () {
          table =  $('#table_rec').DataTable();
            $('.modal').modal();

        });





 function student_record() {
     var table_data="";
     var result = $('#select_student option:selected').val();
     //alert(result);
    $.ajax({
        type:'POST',
        url:/dashboard/,
        data:{
            result:result
        },
        success:function(data) {
            if(data.success){
                 table.destroy();
                if(data.student_records.length>0) {
                    $('#table_body').html("");
                    $.each(data.student_records, function (i, item) {
                        //console.log(data.student_records[i].roll_no);
                        table_data ='<tr>'+
                           // <a class=" modal-trigger " data-toggle="modal" data-target="modal4" id="add_marks">Test</a>
                            '<td class="counterCell"></td>' +
                            '<td style="cursor: pointer" class="modal-trigger" data-toggle="modal" data-target="modal4" onclick="show_student_record(' + data.student_records[i].id + ')" >' + data.student_records[i].roll_no + '</td>' +
                            '<td style="cursor: pointer" class="modal-trigger" data-toggle="modal" data-target="modal4"  onclick="show_student_record(' + data.student_records[i].id + ')"  >' + data.student_records[i].name + '</td>' +
                            '<td style="cursor: pointer" class="modal-trigger" data-toggle="modal" data-target="modal4"  onclick="show_student_record(' + data.student_records[i].id + ')"  >' + data.student_records[i].email + '</td>' +
                            '<td style="cursor: pointer" class="modal-trigger" data-toggle="modal" data-target="modal4"  onclick="show_student_record(' + data.student_records[i].id + ')" >' + data.student_records[i].mobile + '</td>' +
                            '<td style="cursor: pointer" class="modal-trigger" data-toggle="modal" data-target="modal4" onclick="show_student_record(' + data.student_records[i].id + ')"  >' + data.student_records[i].gender + '</td>' +
                            '<td style="cursor: pointer" class="modal-trigger" data-toggle="modal" data-target="modal4" onclick="show_student_record(' + data.student_records[i].id + ')" >' + data.student_records[i].dob + '</td>' +
                            '<td style="cursor: pointer" class="modal-trigger" data-toggle="modal" data-target="modal4" onclick="show_student_record(' + data.student_records[i].id + ')" >' + data.student_records[i].address + '</td>' +
                            // '<td>'+ data.student_records[i].id +'</td>'
                            '<td>' + '<a href="/studentpage/?id=' + data.student_records[i].id + ' " class="btn waves-effect waves-light green" style="width: 8px;padding-left: inherit;border-radius: 5px;text-transform: none">Edit</a>'
                            + '<a class="waves-effect waves-light modal-trigger red btn" style="margin: 4%;width: 30px;padding-left: inherit;border-radius: 5px; text-transform: none"  data-toggle="modal" data-target="modal1" id="delete_id"  onclick="delete_Data(' + data.student_records[i].id + ')">Delete</a> ' + '</td>' +

                            '<td>' + '<a class="waves-effect waves-light modal-trigger green btn" data-toggle="modal" data-target="modal2" id="add_marks" onclick="add_marks(' + data.student_records[i].id + ',' + data.student_records[i].roll_no + ')" style="width: 10px;padding-left: inherit;border-radius: 5px; text-transform: none">Add Marks </a>' +
                            '<a class="waves-effect waves-light green btn" href="/marks/?sid=' + data.student_records[i].id + ' " style="margin: 4%;width: 32px;padding-left: inherit;border-radius: 5px;text-transform: none" >Update</a>' + '</td>'

                            + '</tr>';
                        $('#table_body').append(table_data)

                    });
                    table = $('#table_rec').DataTable();

                }


                }


        }
    })
}





function delete_Data(id) {
       //var id = document.getElementById('sid').value;

       //alert(id);
       document.getElementById('s_id').value=id;
    }



function add_marks(id,roll) {
            document.getElementById('sid').value=id;
            document.getElementById('student_roll_no').value=roll;


}

function show_student_record(id) {
     //document.getElementById('s_id').value=id;
     $.ajax({
         type:'POST',
         url:/student_profile/,
         data:{
             id:id
         },
         success:function (data) {
             if(data.success){
             //console.log(data);
             //      table_data=
             //         "Image :"+data.student_rec.image+
             //         "Roll No :"+data.student_rec.roll_no+
             //         "name :"+data.student_rec.name;
             //
             //     $('#student_body').append(table_data)

                 document.getElementById('image').src="/media/photo/p.jpg";
                 document.getElementById('roll_no').value = data.student_rec.roll_no;
                 document.getElementById('student_name').value=data.student_rec.name;
                 document.getElementById('student_email').value = data.student_rec.email;
                 document.getElementById('student_mobile').value=data.student_rec.mobile;
                 document.getElementById('student_gender').value = data.student_rec.gender;
                 document.getElementById('student_dob').value=data.student_rec.dob;
                 document.getElementById('student_address').value = data.student_rec.address;
                 document.getElementById('student_result').value=data.student_rec.result;




             }
         }

     });




}





    function marks_math() {
        var math = $('#math').val();
        if (math > 100) {
            document.getElementById('math').value = 100;
        }
        else if (math < 0) {
            document.getElementById('math').value = 0;
        }
    }
    function marks_science() {
        var science = $('#science').val();
        if (science > 100) {
            document.getElementById('science').value = 100;
        }
        else if (science < 0) {
            document.getElementById('science').value = 0;
        }
    }
    function marks_socal() {
     var socal = $('#socal').val();
        if (socal > 100) {
            document.getElementById('socal').value = 100;
        }
        else if (socal < 0) {
            document.getElementById('socal').value = 0;
        }
    }
    function marks_english() {
     var english = $('#english').val();
        if (english > 100) {
            document.getElementById('english').value = 100;
        }
        else if (english < 0) {
            document.getElementById('english').value = 0;
        }
    }
    function marks_hindi() {
     var hindi = $('#hindi').val();
        if (hindi > 100) {
            document.getElementById('hindi').value = 100;
        }
        else if (hindi < 0) {
            document.getElementById('hindi').value = 0;
        }
    }
    function marks_sanskrit() {
      var sanskrit = $('#sanskrit').val();
        if(sanskrit > 100){
           document.getElementById('sanskrit').value = 100;
        }
        else if(sanskrit < 0)
        {
            document.getElementById('sanskrit').value = 0;
        }
    }

