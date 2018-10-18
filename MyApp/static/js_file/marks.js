function update_marks() {
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