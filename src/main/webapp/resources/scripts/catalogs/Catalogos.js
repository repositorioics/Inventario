var ProcessSearch = function () {
	
return {
  //main function to initiate the module
  init: function (parametros) {	
	  
	  var table  = $('#lista_mensajes').DataTable({
          // set the initial value
      	"bPaginate": false,
      	"aaSorting": [[ 2, "asc" ]] ,
          "iDisplayLength": 10,
          "oLanguage": {
  			"sUrl": parametros.dataTablesLang
          },
      });

  $('#search-catalog-form').validate( {
	    rules: {
	    	descCatalogo: {
	    	  required: true
	      }
	    },
	    errorElement: 'em',
	    errorPlacement: function ( error, element ) {
	      // Add the `help-block` class to the error element
	      error.addClass( 'form-control-feedback' );
	      if ( element.prop( 'type' ) === 'checkbox' ) {
	        error.insertAfter( element.parent( 'label' ) );
	      } else {
	        error.insertAfter( element );
	      }
	    },
	    highlight: function ( element, errorClass, validClass ) {
	      $( element ).addClass( 'form-control-danger' ).removeClass( 'form-control-success' );
	      $( element ).parents( '.form-group' ).addClass( 'has-danger' ).removeClass( 'has-success' );
	    },
	    unhighlight: function (element, errorClass, validClass) {
	      $( element ).addClass( 'form-control-success' ).removeClass( 'form-control-danger' );
	      $( element ).parents( '.form-group' ).addClass( 'has-success' ).removeClass( 'has-danger' );
	    },
        submitHandler: function (form) {
        	table.fnClearTable();
            processReport();
        }
	  });
	  
  function processReport(){
	  App.blockUI();
	  $.getJSON(parametros.catalogosUrl, $('#search-catalog-form').serialize(), function(data) {
		if (data == ''){
			toastr.info(data, parametros.noResults, {
				closeButton: true,
				progressBar: true,
			 });
		}
		else{
			for (var row in data) {
				var editUrl = parametros.editCatalogoUrl + data[row].messageKey+'/';
				btnEdit = '<a title="edit" href=' + editUrl + ' class="btn btn-xs btn-primary" ><i class="fa fa-edit"></i></a>';
				if(data[row].pasive=='0'){
					spanHab = '<span class="badge badge-success"><i class="fa fa-check"></i></span>'
				}
				else{
					spanHab = '<span class="badge badge-danger"><i class="fa fa-close"></i></span>'
				}
				table.fnAddData([data[row].messageKey, data[row].spanish, data[row].english, spanHab , btnEdit]);
			}
		}
	})
	.fail(function() {
	    alert( "error" );
	    App.unblockUI();
	});
	  App.unblockUI();
  }
  }
 };
}();
