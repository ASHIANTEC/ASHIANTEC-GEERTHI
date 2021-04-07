
    $(document).ready(function(){

            $('#exampleModalLong').modal({backdrop: 'static', keyboard: false,show:false})

        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });

$(document).on('click', '.edit', function() {
  $(this).parent().siblings('td.data').each(function() {
    var content = $(this).html();
    $(this).html('<input value="' + content + '" />');
  });
  
  $(this).siblings('.save').show();
  $(this).siblings('.delete').hide();
  $(this).hide();
});

$(document).on('click', '.save', function() {
  
  $('input').each(function() {
    var content = $(this).val();
    $(this).html(content);
    $(this).contents().unwrap();
  });
  $(this).siblings('.edit').show();
  $(this).siblings('.delete').show();
  $(this).hide();
  
});


$(document).on('click', '.delete', function() {
  $(this).parents('tr').remove();
});
        let tBody = document.getElementById('myTable');
let modal = document.getElementById('myModal');
let tr = tBody.getElementsByTagName('TR');
let span = document.getElementsByClassName("close")[1];


// When the user clicks on the button, open the modal 
for (let i = 0; i < tr.length; i++) {
  tr[i]. onclick = function() {
    modal.style.display = "block";
    modal.style.overflow = "auto";
    modal.style.overflowX= "auto";


    console.log(this.firstElementChild.innerHTML + ' Selected'); 
  };
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



// To make elements readonly
$('#myModal :input').prop('readonly', true); 
$('#sign12').prop('readonly', true);
$("#fileo").prop('disabled', true);

$(document).on('click', '.browse', function(){
  var file = $(this).parent().parent().parent().find('.file');
  file.trigger('click');
});
$(document).on('change', '#browse', function(){
  $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});

$('.clickable').click(function(){
  if($(this).hasClass('collapsed'))  {
    $(this).text('Less');
    alert('Add more certificate');
  } 
});



$("#myTable tr").click(function(){
  $(this).addClass("selected").siblings().removeClass("selected");
});

$('#editdrop').change(function () {
  if ($(this).closest('.table').find('option[value=' + $(this).val() + ']:selected').length > 1)
  {
      alert('option is already selected');
      $(this).val($(this).find("option:first").val());
  }
});

UPLOADCARE_LOCALE_TRANSLATIONS = {
  buttons: {
    choose: {
      files: {
        one: '<i class ="fa fa-upload"></i>',
        other: '<i class ="fa fa-upload"></i> '
      },
      images: {
        one: '<i class ="fa fa-upload"></i>',
        other: '<i class ="fa fa-upload"></i>'
      }
      
    }
  
  }
};

      });
      
      $(function () {
        // $("#btnAddd").bind("click", function () {
        //     var div = $("<tr />");
        //     div.html(GetDynamicTextBox(""));
        //     $("#TextBoxContainerr").append(div);
        // });
        $("body").on("click", "#closee", function () {
          var table = document.getElementById("TextBoxContainerr");
          var rowCount = table.rows.length;

          if (rowCount > 1) {
            
      
            $(this).closest("tr").remove();
          }
            else {
              alert("You have to upload at least one document.");
              return GetDynamicTextBox(value) ;

            } 
           
        });
        
       
      
      });
      // function GetDynamicTextBox(value) {
      //   return '<td > <div class="form-group"style="position: relative;top: -7px;"><i class="fa fa-caret-down "id="drop"></i><select class="form-control" id="editdrop" style="width: 200px;"><option hidde="" selected="">&nbsp;</option><option>Community Certificate</option><option>Transfer Certificate</option><option>Conduct Certificate</option><option>Eligiblity Certificate</option><option>Migration Certificate</option><option>Admission Commitee Form</option><option>Others</option></select></div></td>'
      //  + '<td><input style="position: relativ;top: -10px;" type="text" name="" class="form-control"></td>' + 
      //  '<td><input style="position: relativ;top: -10px;"type="Date" name="" class="form-control"></td>' + 
      //  '<td><input style="position: relativ;top: -10px;"type="text" name="" class="form-control"></td>' + 
      //  '<td><input style="position: relativ;top: -10px;" type="text" name="" class="form-control"></td>' + 
      
      //  '<td id="td"> <p><input style="position: relativ;top: -10px;" type="hidden" id="images" name="images"role="uploadcare-uploader" data-clearable=""   data-max-width="2048"data-max-height="2048"data-integration="" /></p> <button type="button"id="closee" class="btn-sm btn-danger remove ml-3"><i class="fa fa-times" aria-hidden="true"></i></button></td>'
      
      // }
      
$(function () {
  // $("#btnAdd").bind("click", function () {
  //     var div = $("<tr />");
  //     div.html(GetDynamicTextBoxx(""));
  //     $("#TextBoxContainer").append(div);
  // });
  $("body").on("click", "#close", function () {
    var table = document.getElementById("TextBoxContainer");
    var rowCountt = table.rows.length;

    if (rowCountt > 1) {
      

      $(this).closest("tr").remove();
    }
      else {
        alert("You have to upload at least one document.");
        return GetDynamicTextBoxx(value) ;

      } 
     
  });
 
});

// function GetDynamicTextBoxx(value) {
//   return '<td> <div class="form-group"style="position: relative;top: -7px;"><i class="fa fa-caret-down "id="drop"></i><select class="form-control" id="editdrop" style="width: 200px;"><option hidde="" selected="">&nbsp;</option><option>Community Certificate</option><option>Transfer Certificate</option><option>Conduct Certificate</option><option>Eligiblity Certificate</option><option>Migration Certificate</option><option>Admission Commitee Form</option><option>Others</option></select></div></td>'
//  + '<td><input style="position: relativ;top: 10px;" type="text" name="" class="form-control"></td>' + 
//  '<td><input style="position: relativ;top: 10px;" type="Date" name="" class="form-control"></td>' + 
//  '<td><input style="position: relativ;top: 10px;"  type="text" name="" class="form-control"></td>' + 
//  '<td><input style="position: relativ;top: 10px;"  type="text" name="" class="form-control"></td>' + 

//  '<td id="td"> <p  style="position: relativ;top: 10px;"><input  type="hidden" id="images" name="images"role="uploadcare-uploader" data-clearable=""   data-max-width="2048"data-max-height="2048"data-integration="" /></p> <button style="position: relativ;top: 10px;" type="button"id="close" class="btn-sm btn-danger remove ml-3"><i class="fa fa-times" aria-hidden="true"></i></button></td>'

// }
// function getInputValue(){
//   // Selecting the input element and get its value 
//   var inputVal = document.getElementById("name").value;
//   document.getElementById("p").innerHTML=inputVal;
//   // Displaying the value
//   alert(inputVal);
// }

function do_resize(textbox) {

  var maxrows=4; 
   var txt=textbox.value;
   var cols=textbox.cols;
 
  var arraytxt=txt.split('\n');
   var rows=arraytxt.length; 
 
  for (i=0;i<arraytxt.length;i++) 
   rows+=parseInt(arraytxt[i].length/cols);
 
  if (rows>maxrows) textbox.rows=maxrows;
   else textbox.rows=rows;
  }
function myFunction() {
  
  document.getElementById("description_id").rows = 3;
  document.getElementById("description_id").cols = 10;

}
function desc3(){
  document.getElementById("description3").rows = 3;

  document.getElementById("description3").cols = 10;
}
function desc4(){
  document.getElementById("description4").rows = 3;

  document.getElementById("description4").cols = 10;
}
function desc2(){
  document.getElementById("description2").rows = 3;

  document.getElementById("description2").cols = 10;
}

// $(document).ready(function(){
//   $(".announce").click(function(){ // Click to only happen on announce links
//     $("#name").val($(this).data('id'));
//     $('#edit').modal('sho');
//   });
// });
// $(document).ready(function(){
//   $("#relv-tab").click(function(){ // Click to only happen on announce links
//   alert('hey buddy');

//   });
// });
function relv() {
  $('#collapse-195').collapse('show')

};
function surety() {
  $('#collapse-1100').collapse('show')

};
function home() {
  $('#collapse-15').collapse('show')

}
function profile() {
  $('#collapse-1-25').collapse('show')

}
function bank() {
  $('#collapse-115').collapse('show')

}
function contact() {
  $('#collapse-125').collapse('show')

}
