/*! Easy Field Auto Advance (c) Aaron Gustafson (@AaronGustafson). MIT License. https://github.com/easy-designs/jquery.easy-field-auto-advance.js */

/* Easy Field Auto Advance
 * 
 * To use the script, add the `data-auto-advance-to` attribute to the
 * field you want to advance from and assign the id of the field to 
 * move to:
 * 
 * The API
 * =======
 * 
 * To use the script, add the `data-auto-advance` attribute to the
 * field you want to advance from:
 * 
 * 	<input type="text" name="username" required="required"
 * 		maxlenght="3" data-auto-advance-to="NEXT_FIELD_ID" />
 * 
 **/
;(function( $, UNDEFINED ){
	
	var script_name = 'auto-advance-to',
		data_attr = '[data-' + script_name + ']',
		$fields = $( data_attr ),
		cmd_kys = num_range( 8, 46 )
					.concat( num_range( 91, 93 ) )
					.concat( num_range( 112, 145 ) );
		
	$fields.on( 'keydown', function( e ){
		
		var key = e.which,
			$field = $(this),
			val = $field.val(),
			len = val.length + 1,
			max = $field.attr( 'maxlength' ),
			$next = $( '#' + $field.data( script_name ) );
		
		// only pay attention to data entry keys
		if ( $.inArray( key, cmd_kys ) > -1 )
		{
			return;
		}
		
		// enforce maxlength
		if ( $field.is( '[type=number][maxlength]' ) &&
			 len > max &&
			 ! has_text_selected( this ) )
		{
			// check to make sure if the target is a number field,
			// it would not be over-capacity
			len = $next.val().length + 1;
			max = $next.attr( 'maxlength' );
			if ( $next.is( '[type=number][maxlength]' ) &&
				 len > max )
			{
				e.preventDefault();
				return false;
			}
			// otherwise focus it and insert the value
			$next.focus();
		}
		
	});
	
	// enforce maxlength on all numbers
	$( '[type=number][maxlength]:not(' + data_attr + ')' ).on( 'keydown', function( e ){
		
		var key = e.which,
			$field = $(this),
			val = $field.val(),
			len = val.length + 1,
			max = $field.attr( 'maxlength' );
		
		// enforce maxlength
		if ( $.inArray( key, cmd_kys ) < 0 &&
			 len > max &&
			 ! has_text_selected( this ) )
		{
			e.preventDefault();
			return false;
		}
		
	});
	
	function has_text_selected( el )
	{
		if ( typeof el.selectionStart == "number" )
		{
			return ( el.selectionStart >= 0 &&
					 el.selectionEnd <= el.value.length &&
					 el.selectionEnd - el.selectionStart > 0 );
		}
		else if ( typeof document.selection != "undefined" )
		{
			var text = document.selection.createRange().text;
			return ( text.length &&
					 el.value.indexOf( text ) > -1 );
		}
	};
	
	function num_range( start, end )
	{
		var a = [];
		do {
			a.push( start++ );
		} while ( start <= end )
		return a;
	}
	
}( jQuery ));