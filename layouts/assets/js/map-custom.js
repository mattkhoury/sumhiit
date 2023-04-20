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

})(jQuery);

var ofcMapObj = [];
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
				'olcLocationInput' : olc_section.find('.olc-location-search-input')[0],
				'olcAutocomplete' : new google.maps.places.Autocomplete( olc_section.find('.olc-location-search-input')[0] ),
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
							olc_load_offices( 37.09024, -95.712891, olc_section, olcSectionID );
						}
						);
				}else{
					olc_load_offices( 37.09024, -95.712891, olc_section, olcSectionID );
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
	if( ofcMapObj[olcSectionID].wheel_zooming == 'yes'  ){
		olc_map_obj.scrollwheel = true;
	}
	
	ofcMapObj[olcSectionID].olc_map = new google.maps.Map(olc_section.find('.olc-google-map')[0], olc_map_obj );

	ofcMapObj[olcSectionID].olc_map.data.setMap(null);
	ofcMapObj[olcSectionID].olc_map.setOptions({
		styles: ofcMapObj[olcSectionID].OlcMapStyle
	});	
	var response = [
	{
		"office_id":"1",
		"office_title":"Coming Soon",
		"office_name":"DOWNTOWN SYDNEY",
		"office_phone":"0466 211 184",
		"office_fax":"",
		"office_email":"sydney@sumhiitfitness.com",
		"office_address":"101 William St",
		"office_city":"Brookvale",
		"office_state":"NSW",
		"office_country":"",
		"office_postal_code":"",
		"office_latitude":"-33.7695574",
		"office_longitude":"151.2730721",
		 "office_store_html": "<div class=\"office-locater-one-box office-locater-box py-4 md:py-7 px-2 md:px-8 \" id=\"office-locator-box-26\" data-office-id=\"26\">\r\n\t\t\t\t\
		 <span class=\"office-locater-one-title text-black uppercase font-bold block mb-3\">Coming Soon</span><h6 class=\"office-locater-contact text-md mb-2 text-black\">DOWNTOWN SYDNEY</h6>\
		 <div class=\"office-locater-one-address text-md text-dark-500\"><div class=\"address-one-list\">\
		 <span></span><p class=\" mb-2 text-md text-dark-500\">101 William St<br>Brookvale NSW </p></div>\
		 <div class=\"address-one-list text-md text-dark-500\"><span></span><p class=\" mb-2 text-md text-dark-500 \"><a href=\"tel:0466 211 184\">0466 211 184</a></p></div>\
		 <div class=\"address-one-list text-md text-dark-500\"><span></span><p class=\" mb-2 text-md text-dark-500 \"><a href=\"mailto:sydney@sumhiitfitness.com\">sydney@sumhiitfitness.com</a></p>\
		 </div></div></div>"
	}];
	olcLoadOffices( response, olc_section, 0, olcSectionID );
	
}

/* This function use to reload office */
function olcLoadOffices( response, olc_section, ajax = 0, olcSectionID ) {
	ofcMapObj[olcSectionID].load_olc_stores = [];
	ofcMapObj[olcSectionID].ofcMarker = [];
	if( ofcMapObj[olcSectionID].load_olc_markers.length > 0 ){
		for (let i = 0; i < ofcMapObj[olcSectionID].load_olc_markers.length; i++) {
			ofcMapObj[olcSectionID].load_olc_markers[i].setMap(null);
		}	
	}

	if( response.length > 0 ) {

		var address_html = '';
		jQuery( response ).each(function(office_key, store_data) {
			
			address_html += store_data.office_store_html;
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
					ofcMapObj[olcSectionID].ofcInfowindow.setContent(store_data.location_html);
					ofcMapObj[olcSectionID].ofcInfowindow.open(ofcMapObj[olcSectionID].olc_map, ofcMapObj[olcSectionID].ofcMarker);
			google.maps.event.addListener( ofcMapObj[olcSectionID].ofcMarker, 'click', (function(ofcMarker, office_key, location_html) {
				return function() {
					store_data.location_html = store_data.location_html.replace( 'office-locater-box', 'olc-store' );
					ofcMapObj[olcSectionID].ofcInfowindow.setContent(store_data.location_html);
					ofcMapObj[olcSectionID].ofcInfowindow.open(ofcMapObj[olcSectionID].olc_map, ofcMarker);
				}
			})( ofcMapObj[olcSectionID].ofcMarker, office_key));

			store_data.position = new google.maps.LatLng(store_data.office_latitude, store_data.office_longitude);
			ofcMapObj[olcSectionID].load_olc_stores.push(store_data);
		});
	} 
}