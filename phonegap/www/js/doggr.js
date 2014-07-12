/* I need to be able to make a PARSE call from here. */


function set(selector, value) {
	console.debug( value );
	$( "#debug" ).html( value );
}

$( document ).ready(function() {
	console.debug( "App load" );
	navigator.notification.vibrate(10);

    //var mapCanvas = document.getElementById('map_canvas');
    //var mapOptions = {
    //  center: new google.maps.LatLng(44.5403, -78.5463),
    //  zoom: 8,
    //  mapTypeId: google.maps.MapTypeId.ROADMAP
    //}
    //var map = new google.maps.Map(mapCanvas, mapOptions	);

	/** location based stuff */
  	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(found_location, no_location);
  	} else {
  		no_location();
  	}

	function found_location(position) {
		string = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
		set( "loading", string );
	}

	function no_location() {
		string = "No location service";	
		set( "loading", string );

	} 

	/** update picture bindings */
	counter = 1;
	function next_image(){
		if(counter < 22	) {
			counter = Math.floor((Math.random()*22)+1);;
		} else {
			counter = 1;
		}

		img_str = 'https://s3-us-west-2.amazonaws.com/dog-tinder/dog' + counter.toString() +  '.jpg';		
		$( "#profile_img" ).attr('src', img_str);
	}	
	
	/** the okay, info, and no button bindings */
	$( "#no_img" ).click(function() {
		string = "NO - NO THANKS";
	  	set( "no_img", string );
		next_image(); 		
	});

	$( "#info_img" ).click(function() {
		string = "PROFILE INFO.";
	  	set( "info_img", string );
	});

	$( "#yes_img" ).click(function() {
		string = "YES - TOO CUTE!";
	  	set( "yes_img", string);
		next_image();
	});

	$( "#profile_img").draggable({ snap: true });

	next_image();
});
