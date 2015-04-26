var gb_results = [];
var current_id;
var current_item;

function request_list(){
	$.getJSON( "../Restaurants?action=get", update_list);
}

function update_list(results){
	gb_results = results.results;
	results = gb_results;
	$('#list_box').empty();
	for (var i = 0; i < results.length; i++) {
		createList(i, results[i]);
		$('#myListRating').raty({ score: results[i].rating, scoreName: 'Rating', readOnly: true, numberMax: 5, number: 5});
		$('#myListRating').removeAttr( "id" );

	}
	$('#list_box > .list-group-item').on('click',function(e){
		var previous = $(this).closest(".list-group").children(".active");
		previous.removeClass('active');
		$(this).addClass('active');
	});
	
}


function createList(index, result){
    $('#list_box').append('<a href="#" class="list-group-item"><h4 class="list-group-item-heading">' + 
        result.name + '</h4><p class="list-group-item-text">' + result.vicinity + '</p>' + 
        '<br><button type="button"' +
         ' class="btn btn-info btn-sm" onclick="editItem(' + index + ');">Edit</button>' + 
         '<div style="float:right" id="myListRating"></div>' + '</a>');
}


function editItem(id){
	current_id = id;
	current_item = gb_results[id];
	showItem(current_item);
}

function addItem(){
	var new_item = { 
			name : $('#name').val(),
			vicinity : $('#vicinity').val(),
			more_info : $('#moreinfo').val(),
			rating : $('#myEditRating').find("input").val(),
			geometry : {
				location : {
					lat : parseFloat($('#lat').val()),
					lng : parseFloat($('#lng').val())
				}
			}
		};

	gb_results.push(new_item);
	$.getJSON( "../Restaurants?action=save&items=" + JSON.stringify(gb_results, null, 2),null);
}

function saveItem(){
	current_item.name = $('#name').val();
	current_item.vicinity = $('#vicinity').val();
	current_item.more_info = $('#moreinfo').val();
	current_item.geometry.location.lat = parseFloat($('#lat').val());
	current_item.geometry.location.lng = parseFloat($('#lng').val());
	current_item.rating = $('#myEditRating').find("input").val();
	gb_results[current_id] = current_item;
	$.getJSON( "../Restaurants?action=save&items=" + JSON.stringify(gb_results, null, 2),null);
}

function showItem(item){
	$('#name').val(item.name);
	$('#vicinity').val(item.vicinity);
	$('#moreinfo').text(item.more_info);
	$('#lat').val(item.geometry.location.lat);
	$('#lng').val(item.geometry.location.lng);
	$('#myEditRating').raty({ score: item.rating, scoreName: 'Rating', numberMax: 5, number: 5});
}



$( document ).ready(function() {
	request_list();
    $.fn.raty.defaults.path = "../js/raty/lib/images";
    

    $('#itemForm').validator({
    	custom : {
    		isfloat : function($el){
    			return isNaN(parseFloat($el.val())) ? false : true;
    		}
    	},
    	errors: {
    		isfloat: "Input is not a float number."
    	}
    });
});