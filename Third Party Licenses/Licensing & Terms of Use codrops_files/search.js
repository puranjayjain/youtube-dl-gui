jQuery(document).ready(function($) {
	var $ctsearch = $( '#ct-search' ),
		$ctsearchinput = $ctsearch.find('input.ct-search-input'),
		$body = $('html,body'),
		openSearch = function() {
			$ctsearch.data('open',true).addClass('ct-search-open');
			$ctsearchinput.focus();
			return false;
		},
		closeSearch = function() {
			$ctsearch.data('open',false).removeClass('ct-search-open');
		};

	$ctsearchinput.on('click',function(e) { e.stopPropagation(); $ctsearch.data('open',true); });

	$ctsearch.on('click',function(e) {
		e.stopPropagation();
		if( !$ctsearch.data('open') ) {

			openSearch();

			$body.off( 'click' ).on( 'click', function(e) {
				closeSearch();
			} );

		}
		else {
			if( $ctsearchinput.val() === '' ) {
				closeSearch();
				return false;
			}
		}
	});

});