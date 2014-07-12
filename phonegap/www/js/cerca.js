function set(selector, value) {
	console.debug( value );
	$( "#debug" ).html( value );
}

$( document ).ready(function() {
	console.debug( "App load" );        /* This doesn't show up in the compiled app */
	navigator.notification.vibrate(10); /* Doesn't seeem to be working */ 

	/* Think of a way to embad a carto db polygon view etc */

	/* location based stuff */
  	if(navigator.geolocation){  /* Callbacks specified in (http://docs.phonegap.com/en/1.0.0/phonegap_geolocation_geolocation.md.html) */
		navigator.geolocation.getCurrentPosition(found_location, no_location);
	}else{
  		no_location();
  	}
	// Callback for navigator.geolocation.getCurrentPosition(), used above
	function found_location(position){
		string = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
		set( "loading", string ); /* Defined at the top */
	}
	function no_location() {
		string = "No location service";	
		set( "loading", string );
	} 

	/* Bindings to the buttons (for picture updates) */
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

	// Change this to navigate to a new page 
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
