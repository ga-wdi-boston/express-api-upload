'use strict';
$(function(){
  $('#upload').on('click', function (e) {
    var formData = new FormData($('#upload-form')[0]);
    $.ajax({
//      url: 'http://httpbin.org/post',
      url: 'http://localhost:3000/images',
      type: 'POST',
      data: formData,
      //next two required for `enctype="multipart/form-data"`
      contentType: false,
      processData: false,
      success: function (data) {
        $('#result').html(JSON.stringify(data, null, 2));
      },
      error: function(jqxhr){
        console.error(jqxhr);
      }
    });
    return false;
  });
});
