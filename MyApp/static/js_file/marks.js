//form validation
var obtain="";
var percentage="";
var result="";
function update_marks() {
        var math = document.getElementById('math').value;
        var science = document.getElementById('science').value;
        var socal = document.getElementById('socal').value;
        var hindi = document.getElementById('hindi').value;
        var sanskrit = document.getElementById('sanskrit').value;
        var english = document.getElementById('english').value;
        obtain = (parseFloat(math)+parseFloat(science)+parseFloat(socal)+parseFloat(hindi)+parseFloat(sanskrit)+parseFloat(english));
        percentage= ((parseFloat(math)+parseFloat(science)+parseFloat(socal)+parseFloat(hindi)+parseFloat(sanskrit)+parseFloat(english))*100)/600;
        if(math > 29 && science > 29 && socal >= 30 && english >= 30 && hindi >= 30 && sanskrit >= 30)
        {
            result="Pass"
        }
        else{
            result="Fail"
        }
        //  alert(obtain);
        //  alert(percentage);
        // alert(result);
        document.getElementById('obtain').value=obtain;
        document.getElementById('percentage').value=percentage;
        document.getElementById('result').value=result;

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
         update_ajaxMarks()

    }
    function update_ajaxMarks() {
            $.ajax({
                type:'POST',
                url:/update_marks/,
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



//auto update obtain marks
//calculate total marks
//  $(function () {
//      $('#math').keyup('input', function() {
//       calculate();
//     });
//     $('#science').keyup('input', function() {
//      calculate();
//     });
//     $('#socal').keyup('input', function() {
//       calculate();
//     });
//     $('#english').keyup('input', function() {
//      calculate();
//     });
//     $('#hindi').keyup('input', function() {
//       calculate();
//     });
//     $('#sanskrit').keyup('input', function() {
//      calculate();
//     });
//     function calculate() {
//         var math = parseFloat($('#math').val());
//         var science = parseFloat($('#science').val());
//         var socal = parseFloat($('#socal').val());
//         var english = parseFloat($('#english').val());
//         var hindi = parseFloat($('#hindi').val());
//         var sanskrit = parseFloat($('#sanskrit').val());
//         var percentage = "";
//         var obtain = "";
//
//
//         if (isNaN(math) || isNaN(science) || isNaN(socal) || isNaN(english) || isNaN(hindi) || isNaN(sanskrit)) {
//             obtain = " ";
//         } else {
//             obtain = (math + science + socal + english + hindi + sanskrit);
//         }
//         if (isNaN(math) || isNaN(science) || isNaN(socal) || isNaN(english) || isNaN(hindi) || isNaN(sanskrit)) {
//             percentage = " ";
//         } else {
//             percentage = (((math + science + socal + english + hindi + sanskrit) * 100) / 600);
//         }
//
//
//         $('#obtain').val(obtain);
//         $('#percentage').val(percentage);
//
//     }
//
//    });
