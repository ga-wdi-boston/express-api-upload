'use strict';
$(function() {
  $('#upload-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
//      url: 'http://httpbin.org/post',
      url: 'http://localhost:3000/images',
      type: 'POST',
      contentType: false,
      processData: false,
      data: formData
    })
    .done(function(data) {
      $('#result').html(JSON.stringify(data, null, 2));
    })
    .fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
});
