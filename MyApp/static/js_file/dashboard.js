
        $(document).ready(function () {
            $('#form_button').click(function () {
              $('.form_page').toggle();
            });
            $('.form_page').hide();

            student_record();


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
                            '<td class="counterCell"></td>' +
                            '<td   onclick="show_student_record(' + data.student_records[i].id + ')" >' + data.student_records[i].roll_no + '</td>' +
                            '<td   onclick="show_student_record(' + data.student_records[i].id + ')"  >' + data.student_records[i].name + '</td>' +
                            '<td   onclick="show_student_record(' + data.student_records[i].id + ')"  >' + data.student_records[i].email + '</td>' +
                            '<td   onclick="show_student_record(' + data.student_records[i].id + ')" >' + data.student_records[i].mobile + '</td>' +
                            '<td   onclick="show_student_record(' + data.student_records[i].id + ')"  >' + data.student_records[i].gender + '</td>' +
                            '<td   onclick="show_student_record(' + data.student_records[i].id + ')" >' + data.student_records[i].dob + '</td>' +
                            '<td   onclick="show_student_record(' + data.student_records[i].id + ')" >' + data.student_records[i].address + '</td>' +
                            // '<td>'+ data.student_records[i].id +'</td>'
                            '<td>' + '<a href="/studentpage/?id=' + data.student_records[i].id + ' " class="btn waves-effect waves-light green" style="width: 8px;padding-left: inherit;border-radius: 5px">Edit</a>'
                            + '<a class="waves-effect waves-light modal-trigger red btn" style="margin-left: 3%;width: 30px;padding-left: inherit;border-radius: 5px;"  data-toggle="modal" data-target="modal1" id="delete_id"  onclick="delete_Data(' + data.student_records[i].id + ')">Delete</a> ' + '</td>' +

                            '<td>' + '<a class="waves-effect waves-light modal-trigger green btn" data-toggle="modal" data-target="modal2" id="add_marks" onclick="add_marks(' + data.student_records[i].id + ',' + data.student_records[i].roll_no + ')" style="width: 10px;padding-left: inherit;border-radius: 5px;">Add Marks </a>' +
                            '<a class="waves-effect waves-light green btn" href="/marks/?sid=' + data.student_records[i].id + ' " style="margin-left: 2%;width: 32px;padding-left: inherit;border-radius: 5px;" >Update</a>' + '</td>'

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
            //alert(id);
            //alert(roll);
            //alert(name);
            document.getElementById('sid').value=id;
            document.getElementById('roll_no').value=roll;
            //document.getElementById('sname').value=name;

}

function show_student_record(id) {
     var sid = id;
     console.log(sid);
     $.ajax({
         type:'POST',
         url:/student_profile/,
         data:{
             id:sid
         },
         success:function (data) {
             if(data.success){
                 Materialize.toast("Student Profile Showing",1000,'rounded');
             }else{
                 Materialize.toast("Student Profile Not Showing",2000,'rounded');
             }
         }

     })



}