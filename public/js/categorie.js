//passing data when showing modal 
function removeCat(idCat){
    $('#body-remove').attr('role',idCat);
}
function editCat(idCat,libelle){
    $('#body-edit').attr('role',idCat);
    $('#editCatName').val(libelle);
}
/* fin */
        
           var manageCat = $("#gererCat").DataTable({
              destroy: true,

            'ajax': 'getCat',
             'order': []   
             });
            $("#submitCatForm").unbind('submit').bind('submit', function() {
              var catLib = $("#catLib").val();
              if(catLib == "") {
                  $(".text-danger").remove();
                  $('.form-group').removeClass('has-error').removeClass('has-success');
                  $("#catLib").after('<p class="text-danger">Saissisz le libellé</p>');
                  $('#catLib').closest('.form-group').addClass('has-error');
              }
              else{
                var form = $(this);
                $("#createCatBtn").button('loading');
                $.ajax({
                  url : form.attr('action'),
                  type: form.attr('method'),
                  data: {"_token": $('meta[name="csrf-token"]').attr('content'),"catLib":catLib},
                  dataType: 'json',
                  success:function(response) {
                   $("#createCatBtn").button('reset');
                     if(response.success == true) {
                           manageCat.ajax.reload(null, false);
                           $("#submitCatForm")[0].reset();
                           $(".text-danger").remove();
                           $('.form-group').removeClass('has-error').removeClass('has-success');
                           $('#add-cat-messages').html('<div class="alert alert-success">'+
            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
          '</div>');
                    $(".alert-success").delay(500).show(10, function() {
                       $(this).delay(3000).hide(10, function() {
                       $(this).remove();
                        });
                       }); // /.alert
                    }  // if
                    else{
                      $('#add-cat-messages').html('<div class="alert alert-danger">'+
            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
            '<strong><i class="glyphicon glyphicon-remove"></i></strong> '+ response.messages +
          '</div>');
                    $(".alert-danger").delay(500).show(10, function() {
                       $(this).delay(5000).hide(10, function() {
                       $(this).remove();
                        });
                       }); // /.alert
                    }
                  } // /success
                  }); // /ajax
               }
              return false;
           });
        
        $('#removeCategoriesBtn').on('click',function(e){
             var idCat = $("#body-remove").attr('role');
              $.ajax({
                url: 'deleteCat',
                type: 'post',
                dataType: 'json',
                data: {"_token": $('meta[name="csrf-token"]').attr('content'),"idCat":idCat},
                success:function(response) {
                  $('#removeCategoriesModal').modal('hide');
                  manageCat.ajax.reload(null, false);
                  $('.remove-messages').html('<div class="alert alert-success">'+
                  '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                  '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> Suppression Effectuée</div>');

                  $(".alert-success").delay(500).show(10, function() {
                    $(this).delay(3000).hide(10, function() {
                          $(this).remove();
                    });
                  }); // /.alert
                }
             });
        });
        
        $('#editCatBtn').on('click',function(e){
             var idCat = $("#body-edit").attr('role');
             var nvCatLib = $("#editCatName").val();
             if(nvCatLib == ""){
                $("#editCatName").after('<p class="text-danger">Saissisz le libellé</p>');
                $('#editCatName').closest('.form-group').addClass('has-error');
             }
             else{
              $.ajax({
                url: 'editCat/'+idCat,
                type: 'post',
                dataType: 'json',
                data: {"_token": $('meta[name="csrf-token"]').attr('content'),"catLib":nvCatLib},
                success:function(response) {
                  manageCat.ajax.reload(null, false);
                           $(".text-danger").remove();
                           $('.form-group').removeClass('has-error').removeClass('has-success');
                           $('#edit-cat-messages').html('<div class="alert alert-success">'+
            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.message +
          '</div>');
                    $(".alert-success").delay(500).show(10, function() {
                       $(this).delay(3000).hide(10, function() {
                       $(this).remove();
                        });
                       }); // /.alert
                }
             });
           }
            return false;
        });


