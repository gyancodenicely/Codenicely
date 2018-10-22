$(document).ready(function () {
    $('#submit').click(function () {


    var formdata = new FormData();

    var file = $('#image')[0].files[0];
    var mobile = $('#mobile').val();

    formdata.append("file", file);
    formdata.append("mobile", mobile);
    $.ajax({
        url: /imageupload/,
        type: 'POST',
        data: formdata,
        catch: false,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.success) {
                window.location=/dashboard/
            } else {
                Materialize.toast("Upload Failed...", 2000, 'rounded')
            }

        }
      });


    });




});


    //var data = new FormData($('#formdata').get())




         // alert(formdata);

         //Ajax Post




