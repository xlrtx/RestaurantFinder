var google_map = null;
var gb_markers = [];
var gb_results = [];
var map_change_timeout = null;
var test_detail = null;
var service = null;

function revGeo(latlng){
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            map.setZoom(11);
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
            infowindow.setContent(results[1].formatted_address);
            infowindow.open(map, marker);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
    });
}

/**
 * Initialize google map without input position
 * @return {[type]} [description]
 */
function map_init_nopos(err) {

    var mapOptions = {
      center:  new google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    google_map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);

    map_event_setup(google_map);
}

/**
 * Initialize google map with input position
 * @return {[type]} [description]
 */
function map_init_pos(pos) {

    var location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);


    //Initialize the map with given location
    var mapOptions = {
      center: location,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    google_map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);



    //Define the marker shape
    var symbol = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: 'red',
        fillOpacity: 0.8,
        scale: 5,
        strokeColor: 'red',
        strokeWeight: 2
    };



    //Init the maker
    var marker = new google.maps.Marker({
        icon: symbol,
        position: location,
        map: google_map,
        animation: google.maps.Animation.BOUNCE,
        title: 'You are here!'
    });



    //Info window and reverse geo-coding
    var infowindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': location}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            $('#location').text(results[1].formatted_address);
            infowindow.setContent('Your are at: ' + results[1].formatted_address);
            infowindow.open(google_map, marker);
          } else {
            console.debug('No results found');
          }
        } else {
          console.debug('Geocoder failed due to: ' + status);
        }
    });



    //Set map event
    map_event_setup(google_map);
}


function request_map_data(){
	$.getJSON( "Restaurants?action=get", update_map_data);
}

function update_map_data(results){
	gb_results = results.results;
	results = gb_results;
	deletegb_markers();
	deleteList();
	for (var i = 0; i < results.length; i++) {
		console.log(results[i]);
		createMarker(google_map, results[i]);
		createList(i, results[i]);
		$('#myListRating').raty({ score: results[i].rating, scoreName: 'Rating', readOnly: true, numberMax: 5, number: 5});
		$('#myListRating').removeAttr( "id" );

	}
	$('#list_box > .list-group-item').on('click',function(e){
		var previous = $(this).closest(".list-group").children(".active");
		previous.removeClass('active');
		$(this).addClass('active');

		stop_others_animation($(this).index());
		if(gb_markers[$(this).index()].getAnimation() != google.maps.Animation.BOUNCE)
			gb_markers[$(this).index()].setAnimation(google.maps.Animation.BOUNCE);
		//console.log( $(this).index() );
	});
	
}


function stop_others_animation(index){
  for (var i = 0; i < gb_markers.length; i++) {
    if (i != index)
        gb_markers[i].setAnimation(null);
  }
}


function updateModal(index){
    $('#myModalLabel').text(gb_results[index].name);

    var request = { reference:  gb_results[index].reference };
    service = new google.maps.places.PlacesService(google_map);
    service.getDetails(request, updateModalCallback);
}

function showMore(caller){
	item = $('#list_box').children().eq(caller);
	button = item.find('button');
	button.text('Less');
	button.attr('onclick','$(this).text("More Info");$(this).parent().find(".moreinfo").remove();$(this).attr("onclick","showMore(' + caller + ')");');
	more = '<div class = "moreinfo"></br><p class="list-group-item-text">' + gb_results[caller].more_info + '</p></div>';
	item.append(more);
}

function updateModalCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    test_detail = place;
    $('#myModalRating').raty({ score: place.rating, scoreName: 'Rating', readOnly: true, numberMax: 5, number: 5});
    $('#myModalLocation').text('Location: ' + place.vicinity);
    $('#myModalPhone').text('Ph: ' + place.international_phone_number);
    $('#myModalWebSite').empty();
    $('#myModalWebSite').append('<a href="' + place.website + '">' + place.website + '</a>');
    $('#myModalImages').empty();

    if(place.photos != null){
        $.each(place.photos, function(index, object){
            var url = object.getUrl({'maxWidth': 800, 'maxHeight': 600});
            $('#myModalImages').append('<a href="' + url + 
                '" data-lightbox="image"><img class="img-rounded thumbnail-image" src="' + url + '" alt=""/></a>');
        });
        $('#myModalImagesCount').text(place.photos.length + " images found.");
    }else{
        $('#myModalImagesCount').text("No Image Found.");
    }

    
  }
}




function createList(index, result){
    $('#list_box').append('<a href="#" class="list-group-item"><h4 class="list-group-item-heading">' + 
        result.name + '</h4><p class="list-group-item-text">' + result.vicinity + '</p>' + 
        '<br><button type="button"' +
         ' class="btn btn-info btn-sm" onclick="showMore(' + index + ');">More Info</button>' + 
         '<div style="float:right" id="myListRating"></div>' + '</a>');
}

function deleteList(){
    $('#list_box').empty();
}

function createMarker(map, result){
    var marker = new google.maps.Marker({
        position: result.geometry.location,
        map: map,
        title: 'Hello World!'
    });
    gb_markers.push(marker);
}

// Sets the map on all gb_markers in the array.
function setAllMap(map) {
  for (var i = 0; i < gb_markers.length; i++) {
    gb_markers[i].setMap(map);
  }
}

// Removes the gb_markers from the map, but keeps them in the array.
function cleargb_markers() {
  setAllMap(null);
}

// Shows any gb_markers currently in the array.
function showgb_markers() {
  setAllMap(map);
}

// Deletes all gb_markers in the array by removing references to them.
function deletegb_markers() {
  cleargb_markers();
  gb_markers = [];
}

function map_event_setup(map){
    google.maps.event.addListener(map, 'center_changed', function() {

        clearTimeout(map_change_timeout);
        map_change_timeout = setTimeout('request_map_data()', 500);
    });

}

$( document ).ready(function() {


    $.fn.raty.defaults.path = "js/raty/lib/images";

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };


    navigator.geolocation.getCurrentPosition(map_init_pos, map_init_nopos, options);

});








