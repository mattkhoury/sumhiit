(function($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	 /* This form use to return all office locations */
	jQuery(document).on('change keypress keyup keydown', '.olc-location-search-input', function(e) {
		var input_val = jQuery(this).val();
		input_val = input_val.trim();		
		var olc_section = jQuery(this).closest('.olc-layout');
		var olcSectionID = olc_section.attr( 'data-id' );
		jQuery('.olc-result-cnt').remove();
		if( input_val ){
			input_val = input_val.toLowerCase();
			jQuery.getJSON( olc_section.attr('data-json'), function( response ) {
				if( response.length > 0 ){
					var search_obj = [];
					jQuery(response).each(function( key, value ){
						var address_val = value.office_address;
						var office_city = value.office_city;
						var office_state = value.office_state;
						var office_postal_code = value.office_postal_code;
						var office_country = value.office_country;
						var office_address_2 = value.office_address_2;
						address_val = address_val.toLowerCase();						
						office_state = office_state.toLowerCase();						
						office_city = office_city.toLowerCase();						
						office_country = office_country.toLowerCase();						
						office_postal_code = office_postal_code.toLowerCase();						
						office_address_2 = office_address_2.toLowerCase();						
						if( address_val.indexOf( input_val )!== -1 ){
						  search_obj.push( value );
						}else if( office_country.indexOf( input_val )!== -1 ){
						  search_obj.push( value );
						}else if( office_city.indexOf( input_val )!== -1 ){
						  search_obj.push( value );
						}else if( office_state.indexOf( input_val )!== -1 ){
						  search_obj.push( value );
						}else if( office_postal_code.indexOf( input_val )!== -1 ){
						  search_obj.push( value );
						}else if( office_address_2.indexOf( input_val )!== -1 ){
						  search_obj.push( value );
						}
					});
					jQuery('.olc-location-search').after('<div class="olc-result-cnt md:absolute rounded-full text-white font-medium ">'+search_obj.length+' Results</div>');
					olcLoadOffices( search_obj, olc_section, 0, olcSectionID )
				}
		 		
		 	});
		}else{
			jQuery.getJSON( olc_section.attr('data-json'), function( response ) {			
		 		olcLoadOffices( response, olc_section, 0, olcSectionID );
		 	});
		}
		

	});

	/* This click use to render direction on google map */
	jQuery(document).on('click', '.office-locater-one-box', function(e) {
		var office_id = jQuery(this).attr('data-office-id');		
		var olc_section = jQuery(this).closest('.olc-layout');		
		var olcSectionID = olc_section.attr( 'data-id' );
		if( loadAllOffices[office_id].location_html !== undefined ){
			var store_html = loadAllOffices[office_id].location_html;
			store_html = store_html.replace( 'office-locater-box', 'olc-store' );
			ofcMapObj[olcSectionID].ofcInfowindow.setContent(store_html);
			ofcMapObj[olcSectionID].ofcInfowindow.open(ofcMapObj[olcSectionID].olc_map, ofcMapObj[olcSectionID].ofcMarker );
		}
	});

})(jQuery);

	var ofcMapObj = [], loadAllOffices = [];
		ofcMapObj['olc_488086'] = {
				  "offices": "",
				  "custom_store_marker": "249",
				  "custom_start_location_marker": "171",
				  "custom_style": "",
				  "map_width": "100%",
				  "map_height": "100%",
				  "map_view_type": "roadmap",
				  "map_style": [
				  {
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#f5f5f5"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.icon",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#616161"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#f5f5f5"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.land_parcel",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#bdbdbd"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#eeeeee"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#757575"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#e5e5e5"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#9e9e9e"
				      }
				    ]
				  },
				  {
				    "featureType": "road",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#ffffff"
				      }
				    ]
				  },
				  {
				    "featureType": "road.arterial",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#757575"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#dadada"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#616161"
				      }
				    ]
				  },
				  {
				    "featureType": "road.local",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#9e9e9e"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.line",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#e5e5e5"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.station",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#eeeeee"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#c9c9c9"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#9e9e9e"
				      }
				    ]
				  }
				],
				  "store_marker": "assets/images/pin.svg",
				  "start_location_marker": "assets/images/pin.svg",
				  "no_result_msg": "No offices found.",
				  "start_location_marker_msg": "Your Start Office Location",
				  "back_btn_text": "Back",
				  "load_olc_stores": [],
				  "olc_zoom_map": "14",
				  "olc_inner_map": "11",
				  "street_view_control": "no",
				  "map_type_control": "no",
				  "wheel_zooming": "no",
				  "full_screen_control": "no",
				  "zoom_control": "no",
				  "zoom_position": "RIGHT_BOTTOM",
				  "full_screen_ctlr_pos": "RIGHT_TOP",
				  "street_view_ctlr_pos": "RIGHT_BOTTOM",
				  "olc_lat_long": [
				    "-33.7695574",
				    "151.2730721"
				  ],
				  "map_type_ctlr_pos": "TOP_LEFT",
				  "load_olc_markers": [],
				  "olc_view": "",
				  "olc_panel": "",
				  "olc_map": ""
		};

/* This function use to initialize office map layout. */
function ofcMpInitialize() {	
	if( jQuery('.olc-layout').length > 0 ){
		jQuery('.olc-layout').each(function(){
			var olc_section = jQuery(this);
			var olcSectionID = jQuery(this).attr( 'data-id' );				
			var olcMapExtra = {
				'directionsService' : new google.maps.DirectionsService(),
				'directionsRenderer' : new google.maps.DirectionsRenderer(),
				'geocoder' : new google.maps.Geocoder(),
				'ofcInfowindow' : new google.maps.InfoWindow(),
				'ofcMarker' : '',
				'olcPanelDiv' : olc_section.find('.office-panel'),
				'olcDefaultLatLong' : {} ,
				'olcPlace' : '',
				'olc_map_id' : '',
				'OlcMapStyle' : [],
				'officeLatLongCenter' : '',
				'ofc_lat' : '',
				'ofc_long' : '',
				
			};
			ofcMapObj[olcSectionID].olcDefaultZoom = ofcMapObj[olcSectionID].olc_zoom_map;

			ofcMapObj[olcSectionID] = jQuery.extend({}, ofcMapObj[olcSectionID], olcMapExtra );
			if( ofcMapObj[olcSectionID].olc_lat_long.length > 0 ){
				olc_load_offices( ofcMapObj[olcSectionID].olc_lat_long[0], ofcMapObj[olcSectionID].olc_lat_long[1], olc_section, olcSectionID );
			}else{
				if( navigator.geolocation ) {
					navigator.geolocation.getCurrentPosition(
						function(position) {				
							olc_load_offices( position.coords.latitude, position.coords.longitude, olc_section, olcSectionID );
						},
						function() {
							olc_load_offices( -25.274398, 133.775136, olc_section, olcSectionID );
						}
						);
				}else{
					olc_load_offices( -25.274398, 133.775136, olc_section, olcSectionID );
				}
			}	
		});
	}
}

/* This function use to load offices */
function olc_load_offices( olc_lat, olc_long, olc_section, olcSectionID ) {

	olc_section.find(".olc_latitude").val( olc_lat );
	olc_section.find(".olc_longitude").val( olc_long );
	olc_section.find('.olc_office_ids').val( ofcMapObj[olcSectionID].offices );

	ofcMapObj[olcSectionID].olc_map_id = google.maps.MapTypeId.ROADMAP;
	if(ofcMapObj[olcSectionID].map_view_type !== undefined) {
		ofcMapObj[olcSectionID].olc_map_id = ofcMapObj[olcSectionID].map_view_type;
	}

	if(ofcMapObj[olcSectionID].map_style) {		
		ofcMapObj[olcSectionID].OlcMapStyle = ofcMapObj[olcSectionID].map_style;
		if(typeof ofcMapObj[olcSectionID].OlcMapStyle == 'object') {			
			ofcMapObj[olcSectionID].OlcMapStyle = ofcMapObj[olcSectionID].OlcMapStyle;
		}else{
			ofcMapObj[olcSectionID].OlcMapStyle = jQuery.parseJSON( ofcMapObj[olcSectionID].OlcMapStyle );
		}
	}

	ofcMapObj[olcSectionID].olcDefaultLatLong = new google.maps.LatLng(olc_lat, olc_long);

	var olc_map_obj = {
		center: ofcMapObj[olcSectionID].olcDefaultLatLong,
		zoom: parseInt(ofcMapObj[olcSectionID].olc_zoom_map),
		mapTypeId: ofcMapObj[olcSectionID].olc_map_id,
		mapTypeControl: false,
		zoomControl : false,
		streetViewControl : false,		
		scrollwheel: false,		
		fullscreenControl : false
	};

	if( ofcMapObj[olcSectionID].zoom_control == 'yes'  ){
		olc_map_obj.zoomControl = true;
		olc_map_obj.zoomControlOptions = {
			position: google.maps.ControlPosition[ofcMapObj[olcSectionID].zoom_position],
		};
		
	}
	if( ofcMapObj[olcSectionID].street_view_control == 'yes'  ){
		olc_map_obj.streetViewControl = true;
		olc_map_obj.streetViewControlOptions = {
			position: google.maps.ControlPosition[ofcMapObj[olcSectionID].street_view_ctlr_pos],
		};
	}
	if( ofcMapObj[olcSectionID].full_screen_control == 'yes'  ){
		olc_map_obj.fullscreenControl = true;
		olc_map_obj.fullscreenControlOptions = {
			position: google.maps.ControlPosition[ofcMapObj[olcSectionID].full_screen_ctlr_pos]
		}
	}
	if( ofcMapObj[olcSectionID].map_type_control == 'yes'  ){
		olc_map_obj.mapTypeControl = true;
		olc_map_obj.mapTypeControlOptions = {
			position: google.maps.ControlPosition[ofcMapObj[olcSectionID].map_type_ctlr_pos],
		};
	}
	olc_map_obj.scrollwheel = true;
	
	ofcMapObj[olcSectionID].olc_map = new google.maps.Map(olc_section.find('.olc-google-map')[0], olc_map_obj );

	ofcMapObj[olcSectionID].olc_map.data.setMap(null);
	ofcMapObj[olcSectionID].olc_map.setOptions({
		styles: ofcMapObj[olcSectionID].OlcMapStyle
	});
	jQuery.getJSON( olc_section.attr('data-json'), function( response ) {		
 		olcLoadOffices( response, olc_section, 0, olcSectionID );
 	});
	
}

/* This function use to reload office */
function olcLoadOffices( response, olc_section, ajax = 0, olcSectionID ) {
	var load_css = "<style>.office-locater-one-title{color:#E80088;}.address-one-list p a:hover{color:#E80088;}.gm-ui-hover-effect{top: 0 !important;right: 1px !important;}.olc-google-map .gm-style,.olc-google-map .gm-style>div + div{z-index: inherit;} .olc-result-cnt{bottom: 0;left: 0;background: #222222;display: inline-block;margin-top: 20px;font-size: 12px;padding: 5px 10px;line-height: normal;}.open-text{color:#0824F5;}.opening-text{color:#3CC13B;}.coming-text{color:#F3BB1C;} .wc-soon{display: flex;align-items: center;}.wc-soon:after{content:'•'; color:#fff; margin:0 5px; } .office-locater-one-left{height: calc(100% - 140px);}.olc-address-list::-webkit-scrollbar{width: 5px;}.olc-address-list::-webkit-scrollbar-thumb{background-color: #111111;} .olc-address-list{overflow-y: auto;} .mile-count{top:16px; right:2px;} .mile-count .fa{margin-left: 5px;font-weight: 300;font-size: 16px;vertical-align: middle;} .olc-address-list{counter-reset: list-number;border-color:#111111; } .search-list{border-bottom: 1px solid #111;} .search-list h6 {position: relative;padding-left: 25px;}.search-list h6:before{display: inline-block;content: counter(list-number) \" \";counter-increment: list-number;width: 16px; height: 16px; position:absolute; top:1px; left:0; background:#E80088;border-radius: 100px;font-size: 10px;line-height: 9px;display: flex;align-items: center;justify-content:center; }</style>";
	ofcMapObj[olcSectionID].load_olc_stores = [];
	ofcMapObj[olcSectionID].ofcMarker = [];
	if( ofcMapObj[olcSectionID].load_olc_markers.length > 0 ){
		for (let i = 0; i < ofcMapObj[olcSectionID].load_olc_markers.length; i++) {
			ofcMapObj[olcSectionID].load_olc_markers[i].setMap(null);
		}	
	}
	var loadNewStore = [];
	if( response.length > 0 ) {

		var address_html = '';
		jQuery( response ).each(function(office_key, store_data) {			
			store_data['office_store_html'] = "<div class=\"office-locater-one-box office-locater-box py-4 md:py-7 px-2 md:px-8 \" id=\"office-locator-box-"+store_data.office_id+"\" data-office-id=\""+store_data.office_id+"\">\r\n\t\t\t\t\
		 <span class=\"office-locater-one-title text-black uppercase font-bold block mb-3\">"+store_data.office_title+"</span><h6 class=\"office-locater-contact text-md mb-2 text-black\">"+store_data.office_name+"</h6>\
		 <div class=\"office-locater-one-address text-md text-dark-500\"><div class=\"address-one-list\">\
		 <span></span><p class=\" mb-3 text-md text-dark-500 leading-5\">"+store_data.office_address+"<br>"+store_data.office_address_2+"</p></div>\
		 <div class=\"address-one-list text-md text-dark-500\"><span></span><p class=\" mb-2 text-md text-dark-500 leading-5\"><a href=\"tel:"+store_data.office_phone+"\" class=\" focus:outline-none hover:text-pink-900\">"+store_data.office_phone+"</a></p></div>\
		 <div class=\"address-one-list text-md text-dark-500\"><span></span><p class=\" mb-2 text-md text-dark-500 leading-5\"><a href=\"mailto:"+store_data.office_email+"\" class=\" focus:outline-none hover:text-pink-900\">"+store_data.office_email+"</a></p>\
		 </div></div></div>";

		 var store_address = store_data.office_address;
		 if( store_data.office_address_2 ){		 	
		 	if( store_address ){
		 		store_address +=', '
		 	}
		 	store_address += store_data.office_address_2;
		 }
		 if( store_address ){
		 	store_address += '<br>';
		 }
		 if( store_data.office_country ){
		 	store_data.office_country = ', ' + store_data.office_country;
		 }
		 var open_html = '', coming_soon_html = '', opening_open_html = '', office_mile_html = '';
		 if( store_data.office_open ){
		 	open_html = '<p class=\" text-sm text-dark-400 flex leading-normal mb-0 \"><span class=\" wc-soon open-text\">Open</span> Closes at '+ store_data.office_open+'</p>';
		 }if( store_data.office_open_soon ){
		 	opening_open_html = '<p class=\" text-sm text-dark-400 flex leading-normal mb-0 \"><span class=\" wc-soon opening-text\">Opening Soon</span> '+ store_data.office_open_soon+'</p>';
		 }
		 if( store_data.office_coming_soon ){
		 	coming_soon_html = '<p class=\" text-sm text-dark-400 flex leading-normal mb-0\"><span class=\" wc-soon coming-text\">Coming Soon</span> ' + store_data.office_coming_soon+'</p>';
		 } 
		 if( store_data.office_mile ){
		 	office_mile_html = '<div class=\"mile-count text-sm text-white leading-normal absolute right-0 font-bold \">' + store_data.office_mile+'<i class="fa fa-angle-right ml-1 inline-block"></i></div>';
		 }

		 store_address += store_data.office_city + store_data.office_state + store_data.office_country + " " + store_data.office_postal_code;
		 store_data['office_map_html'] = "<div class=\"search-list office-locater-one-box relative office-locater-box py-4 border-b border-dark-200 \" id=\"office-locator-box-"+store_data.office_id+"\" data-office-id=\""+store_data.office_id+"\">\r\n\t\t\t\t\
		 <h6 class=\"office-locater-contact normal-case tracking-normal text-sm font-bold font-inter mb-2 text-white pr-10\">"+store_data.office_name+"</h6>\
		 <div class=\"office-locater-one-address text-sm text-dark-400\"><div class=\"address-one-list\">\
		 <span></span><p class=\" mb-2 text-sm text-dark-400 leading-5\">"+store_address+"</p>"+open_html+opening_open_html+coming_soon_html+office_mile_html+"</div>\
		 </div></div> ";

			address_html += store_data.office_map_html;
			store_data.location_html = store_data.office_store_html;

			if( store_data.office_latitude == '' && store_data.office_longitude == '' ){
				ofcMapObj[olcSectionID].geocoder.geocode( { 'address': store_data.office_address }, function(results, status) {
					if (status == 'OK') {
						store_data.office_latitude = results[0].geometry['location'].lat();
						store_data.office_longitude = results[0].geometry['location'].lng();
					} 
				});
			}

			var markerOptions = {
				position: new google.maps.LatLng( store_data.office_latitude, store_data.office_longitude ),
				title: store_data.office_title,
				map: ofcMapObj[olcSectionID].olc_map
			}

			if( ofcMapObj[olcSectionID].store_marker !== undefined ) {
				if( ofcMapObj[olcSectionID].store_marker ) {
					const olc_marker_icon = {
						url: ofcMapObj[olcSectionID].store_marker,
						scaledSize: new google.maps.Size(38, 38),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(0, 0)
					};
					markerOptions.icon = olc_marker_icon;
				}
			}

			ofcMapObj[olcSectionID].ofcMarker = new google.maps.Marker(markerOptions);
			ofcMapObj[olcSectionID].load_olc_markers.push( ofcMapObj[olcSectionID].ofcMarker );
			store_data.location_html = store_data.location_html.replace( 'office-locater-box', 'olc-store' );
			google.maps.event.addListener( ofcMapObj[olcSectionID].ofcMarker, 'click', (function(ofcMarker, office_key, location_html) {
				return function() {
					store_data.location_html = store_data.location_html.replace( 'office-locater-box', 'olc-store' );
					ofcMapObj[olcSectionID].ofcInfowindow.setContent(store_data.location_html);
					ofcMapObj[olcSectionID].ofcInfowindow.open(ofcMapObj[olcSectionID].olc_map, ofcMarker);
				}
			})( ofcMapObj[olcSectionID].ofcMarker, office_key));

			store_data.position = new google.maps.LatLng(store_data.office_latitude, store_data.office_longitude);
			ofcMapObj[olcSectionID].load_olc_stores.push(store_data);
			loadNewStore[store_data.office_id] = store_data;

			if( olc_section.attr('data-studio-list') == 'no' ){
				
				ofcMapObj[olcSectionID].ofcInfowindow.setContent(store_data.location_html);
				ofcMapObj[olcSectionID].ofcInfowindow.open(ofcMapObj[olcSectionID].olc_map, ofcMapObj[olcSectionID].ofcMarker);
			}

		});
		if( olc_section.attr('data-studio-list') == 'yes' ){
			olc_section.find(".office-panel").html('<div class="olc-address-list overflow-y-auto h-full w-full">' + address_html + '</div>'+load_css);	
			loadAllOffices = loadNewStore;		
		}
		
	}else{
		if( olc_section.attr('data-studio-list') == 'yes' ){
			olc_section.find(".office-panel").html('<div class="olc-address-list no-address-found"></div>'+load_css);
		}
		
	} 
	loadAllOffices = loadNewStore;	
}