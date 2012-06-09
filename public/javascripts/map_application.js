var centerLatitude = 33.0;
var centerLongitude = 36.0;
var initlatlng = new google.maps.LatLng(centerLatitude,centerLongitude);
var geocoder = new google.maps.Geocoder();
var startZoom = 4;
var myOptions = {
      zoom: startZoom,
      scaleControl: true,
      center: new google.maps.LatLng(centerLatitude,centerLongitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
var map;
var geosmap;
var tracks = new Array();
var nTracks;
var geosmarkers = new Array();
var geoscircles = new Array();
var geosrectangles = new Array();
var geospolygons = new Array(); 
var geospolylines = new Array(); 
var nGeosmarkers;
var infoCreateWindow = new google.maps.InfoWindow({
    disableAutoPan: false
    });
var image='';
var markerArray=new Array();
var geosmarkerArray=new Array();
var geoscircleArray=new Array();
var geosrectangleArray=new Array();
var geospolygonArray=new Array();
var geospolylineArray=new Array();
var infoUpdateWindow = new google.maps.InfoWindow({
    disableAutoPan: false
    });
var infoDeleteWindow = new google.maps.InfoWindow({
    disableAutoPan: false
    });
var hookOptions = {
      strokeColor: "#FF0000",
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: "#000000",
      fillOpacity: 0.10,
      radius: 800,
      clickable: false
    };
var hookForm = document.createElement("form");
var hookImage = new google.maps.MarkerImage("/images/hook.png",new google.maps.Size(90,90),new google.maps.Point(0,0),new google.maps.Point(45,45))
var hookMarker = new google.maps.Marker({
                        position: initlatlng,
                        map: map,
                        icon: hookImage});
var hookedTrack;
var hookedMarker;
var hookedGeosmarker;
var hookedGeoscircle;
var hookedGeosrectangle;
var hookedGeospolygon;
var hookedGeospolyline;
var hookedOverlay = null;
var hookMarkerForm = document.createElement("form");
var hookCircleForm = document.createElement("form");
var hookRectangleForm = document.createElement("form");
var hookPolylineForm = document.createElement("form");
var hookPolygonForm = document.createElement("form");
var trackHookVisibility = false;
var markerHookVisibility = false;
var circleHookVisibility = false;
var rectangleHookVisibility = false;
var polylineHookVisibility = false;
var polygonHookVisibility = false;
var geoForm = document.createElement("form");
var displayLat;
var displayLong;
var placesFlag = false;
var drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.CIRCLE,
                                           google.maps.drawing.OverlayType.RECTANGLE,
                                           google.maps.drawing.OverlayType.POLYLINE,
                                           google.maps.drawing.OverlayType.POLYGON]
      },
      circleOptions: {
        fillColor: '#000000',
        fillOpacity: 0.05,
        strokeWeight: 2,       
        clickable: true,
        zIndex: 1,
        editable: true
      },
      rectangleOptions: {
        fillColor: '#000000',
        fillOpacity: 0.05,
        strokeWeight: 2,       
        clickable: true,
        zIndex: 1,
        editable: true
      },
      polylineOptions: {
        strokeWeight: 2,       
        clickable: true,
        zIndex: 1,
        editable: true
      },
      polygonOptions: {
        fillColor: '#000000',
        fillOpacity: 0.05,
        strokeWeight: 2,       
        clickable: true,
        zIndex: 1,
        editable: true
      }
    });
///////////////////////////////////////////////////
function buildImage(track) {
  if (track.category == 'land') {
    if (track.icon == 'unknown') {image = new google.maps.MarkerImage("/images/unkland0.png",null,null, new google.maps.Point(17,17));}
    if (track.icon == 'enemy') { image = new google.maps.MarkerImage("/images/enemyland0.png",null,null, new google.maps.Point(17,17));}
    if (track.icon == 'friend') { image = new google.maps.MarkerImage("/images/friendland0.png",null,null, new google.maps.Point(17,12))}
    if (track.icon == 'neutral') { image =  new google.maps.MarkerImage("/images/neutralland0.png",null,null, new google.maps.Point(15,15));}
  }
  if (track.category == 'air') {
    if (track.icon == 'unknown') {image = new google.maps.MarkerImage("/images/unkair0.png",null,null, new google.maps.Point(17,17));}
    if (track.icon == 'enemy') { image = new google.maps.MarkerImage("/images/enemyair0.png",null,null, new google.maps.Point(14,17));}
    if (track.icon == 'friend') { image = new google.maps.MarkerImage("/images/friendair0.png",null,null, new google.maps.Point(17,12))}
    if (track.icon == 'neutral') { image =  new google.maps.MarkerImage("/images/neutralair0.png",null,null, new google.maps.Point(15,15));}
  }
  if (track.category == 'sea') {
    if (track.icon == 'unknown') {image = new google.maps.MarkerImage("/images/unksea0.png",null,null, new google.maps.Point(17,17));}
    if (track.icon == 'enemy') { image = new google.maps.MarkerImage("/images/enemysea0.png",null,null, new google.maps.Point(17,17));}
    if (track.icon == 'friend') { image = new google.maps.MarkerImage("/images/friendsea0.png",null,null, new google.maps.Point(17,17))}
    if (track.icon == 'neutral') { image =  new google.maps.MarkerImage("/images/neutralsea0.png",null,null, new google.maps.Point(15,15));}
  }
}
/////////////////////////////////////////////////////////
//input form for a marker  
/////////////////////////////////////////////////////////
function createDeleteTrackForm(track,marker,location) {

  //create an HTML DOM form element
  var inputForm = document.createElement("form");
  inputForm.id = 'form-' +track.id;
  inputForm.name = 'form-' +track.id;
  inputForm.setAttribute("action","");
  inputForm.onsubmit = function() {
    deleteTrack(location,track,marker); return false;
  };
  inputForm.innerHTML =  
    '<fieldset style="width:180px;">' +
    '<label for="id">Id </label>' + track.id +
    '<br>' +
    '<label for="cstId">TrackId </label>' + track.cstId +
    '<br>' +
    '<label for="cstName">Name </label>' + track.cstName +
    '<br>' +
    '<input type="submit" id="Delete" value="Delete" />' +
    '</fieldset>';
  return inputForm;
}
////////////////////////////////////////////////////////////////////
// on submit Update button click
///////////////////////////////////////////////////////////////////
function updateInfoWindow(marker,location,track) {
  var selectedOptionIdentity= 
    '<option value="unknown">Unknown</option> ' +
    '<option value="friend">Friend</option> ' +
    '<option value="enemy">Enemy</option>'+ 
    '<option value="neutral">Neutral</option>'; 
  var selectedOptionCategory= 
    '<option value="land">Land</option> ' +
    '<option value="air">Air</option> ' +
    '<option value="sea">Sea</option>'; 
  switch (track.icon)
  {
    case 'unknown':
      break;
    case 'friend':
      selectedOptionIdentity=
            '<option value="unknown">Unknown</option> ' +
    '<option value="friend" selected="selected">Friend</option> ' +
    '<option value="enemy">Enemy</option>'+
    '<option value="neutral">Neutral</option>';
      break;
    case 'enemy':
      selectedOptionIdentity=
            '<option value="unknown">Unknown</option> ' +
    '<option value="friend" >Friend</option> ' +
    '<option value="enemy"selected="selected">Enemy</option>'+
    '<option value="neutral">Neutral</option>';
      break;
    case 'neutral':
      selectedOptionIdentity=
            '<option value="unknown">Unknown</option> ' +
    '<option value="friend" >Friend</option> ' +
    '<option value="enemy">Enemy</option>'+
        '<option value="neutral"selected="selected">Neutral</option>';
      break;
  }
    switch (track.category)
  {
    case 'land':
      break;
    case 'air':
      selectedOptionCategory=
            '<option value="land">Land</option> ' +
    '<option value="air" selected="selected">Air</option> ' +
    '<option value="sea">Sea</option>';
      break;
    case 'sea':
      selectedOptionCategory=
            '<option value="land">Land</option> ' +
    '<option value="air" >Air</option> ' +
    '<option value="sea"selected="selected">Sea</option>';
      break;
  }
  //retrieve lat and long of the click point
  var lat = location.lat();
  var lng = location.lng();
  //create an HTML DOM form element
  var inputForm = document.createElement("form");
  inputForm.id = "updateFormId";
  inputForm.setAttribute("action","");
  inputForm.onsubmit = function() {updateTrack(marker,track.id); return false;};
  inputForm.innerHTML =  
    '<fieldset style="width:250px;">' +
    '<label for="cstId">TrackId </label>' +
    '<input type="text" id="cstId" name="m[cstId]" style="width:60%;"' +
    'value="'+  track.cstId + '"/>'+
    '<br>' +
    '<label for="cstName">Name </label>' + 
    '<input type="text" id="cstName" name="m[cstName]"style="width:60%;"' +
    'value="'+  track.cstName + '"/>'+
    '<br>' +
    '<label for="latitude">Lat </label>' +
    '<input type="text" id="lat" name="m[lat]" maxlength="10" style="width:60%;"' + 
     'value="'+ format_number(lat,4) + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' +
    '<input type="text" id="long" name="m[long]" style="width:60%;" maxlength="10" value="' +
      format_number(lng,4) + '"/>' +
    '<br>' +
    '<select name="m[category]">' +
       selectedOptionCategory +
    '</select>' + 
    '<br>' +
    '<select name="m[icon]">' +
       selectedOptionIdentity +
    '</select>' + 
    '<br>' +   
    '<label for="course">Course </label>' +
    '<input type="text" id="course" name="m[course]" style="width:60%;"' +
    'value="'+  track.course + '"/>'+
    '<br>' +
    '<label for="speed">Speed </label>' + 
    '<input type="text" id="speed" name="m[speed]" style="width:60%;"' +
    'value="'+  track.speed + '"/>'+
    '<br>' +

    '<input type="submit" value="Save" />' +
    '</fieldset>';

  infoUpdateWindow.setContent(inputForm);
  infoUpdateWindow.setPosition(location);
  infoUpdateWindow.open(map);
  return;

}
////////////////////////////////////////////////////////////////////
// on submit Save button click
///////////////////////////////////////////////////////////////////
function saveGeosmap() {

  //create an HTML DOM form element
  var saveForm = document.createElement("form");
  saveForm.id = "saveFormId";
  saveForm.setAttribute("action","");
  saveForm.onsubmit = function() {confirmSaveGeosmap(); return false;};
  saveForm.innerHTML =  
    '<fieldset style="width:250px;">' +
    '<label for="name">Name </label>' + 
    '<input type="text" id="geosmapName" name="geosmap[name]"' +
    'value="'+  geosmap.name + '"/>'+
    '<br>' +
    '<label for="latitude">Lat </label>' +
    '<input type="text" id="geosmapLat" name="geosmap[centerlat]" maxlength="10" ' + 
     'value="'+ geosmap.centerlat + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' +
    '<input type="text" id="geosmapLng" name="geosmap[centerlng]" maxlength="10" value="' +
      geosmap.centerlng + '"/>' +
    '<br>' +
    '<label for="zoom">Zoom </label>' +
    '<input type="text" id="geosmapZoom" name="geosmap[zoom]"' +
    'value="'+  geosmap.zoom + '"/>'+
    '<br>' +
    '<label for="maptype">MapType </label>' + 
    '<input type="text" id="geosmapMaptype" name="geosmap[maptype]"' +
    'value="'+  geosmap.maptype + '"/>'+
    '<br>' +

    '<input type="submit" value="Confirm" />' +
    '</fieldset>';
      document.getElementById("sidebar").appendChild(saveForm);
  return;

}
/////////////////////////////////////////////////////////
//double clicking on a track  
/////////////////////////////////////////////////////////
function createUpdateTrackForm(track,marker,location) {

  //create an HTML DOM form element
  var inputForm = document.createElement("form");
  inputForm.id = location.toUrlValue();
  inputForm.setAttribute("action","");
  inputForm.onsubmit = function() {updateInfoWindow(marker,location,track); return false;};
  inputForm.innerHTML =  
    '<fieldset style="width:250px;">' +
    '<label for="id">Id </label>' + track.id +
    '<br>' +
    '<label for="cstId">TrackId </label>' + track.cstId +
    '<br>' +
    '<label for="cstName">Name </label>' + track.cstName +
    '<br>' +
    '<label for="latitude">Lat </label>' + format_number(track.lat,4) +
    '<br>' +
    '<label for="longitude">Lng </label>' + format_number(track.long,4) +
    '<br>' +
    '<label for="category">Category </label>' + track.category +
    '<br>' +
    '<label for="icon">Identity </label>' + track.icon + 
    '<br>' +
    '<label for="course">Course </label>' + track.course +
    '<br>' +
    '<label for="speed">Speed </label>' + track.speed +
    '<br>' +
    '<input type="submit" id="update" value="Update" />' +
    '</fieldset>';

  return inputForm;
}

/////////////////////////////////////////////
//click on marker 
/////////////////////////////////////////////
function displayMarkerHook(marker,visibility,address,geosmarker)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   } 	
   hookedMarker = marker;
   hookedGeosmarker = geosmarker;
   var geosmarkername;
   var geosmarkeraddress;
   if (geosmarker == null) {
   	geosmarkername="";
   	geosmarkeraddress="";
   }
   else {
   	geosmarkername=geosmarker.name;
   	geosmarkeraddress=geosmarker.address;
   }
   hookMarker.setPosition(marker.getPosition());
   hookMarker.setMap(map);
  //Hook HTML DOM form element
  hookMarkerForm.id = "hookmarkerpanel";
  hookMarkerForm.setAttribute("action","");
  hookMarkerForm.onsubmit = function() {
  	                    deleteMarker(geosmarker,marker); 
  	                    hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookMarkerForm);
  	                    marker.setMap(null);
  	                    markerHookVisibility = false;
  	                    return false;};
  hookMarkerForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="name">Name </label>'  +
    '<input type="text" id="namemarkertxt" name="geosmarker[name]" value="' + geosmarkername + '"/>' +
    '<br>' +

    '<label for="latitude">Lat </label>' + marker.getPosition().lat().toFixed(4) +
    '<input type="hidden" id="markerlatid" name="geosmarker[lat]" value="' +
     marker.getPosition().lat().toFixed(4) + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' + marker.getPosition().lng().toFixed(4) +
    '<input type="hidden" id="markerlngid" name="geosmarker[lng]" value="' +
     marker.getPosition().lng().toFixed(4) + '"/>' +
    '<br>' +
    
    '<label for="category">Address </label>' +   
    '<br>' +
    '<input type="text" id="addresstxt" name="geosmarker[address]" style="width:90%;"' +
    'value="'+  geosmarkeraddress + '"/>'+   
    '<br>' +
    '<input type="submit" id="cancelMarker" value="Delete Marker" />' +
    '<input type="button" id="centerMarker" value="Center" onclick="centerMapOnMarkerHook();" />' +
    '<input type="button" id="addressMarker" value="Find Address" onclick="displayReverseGeocodeOnHook();" />' +
    '<input type="button" id="saveMarker" value="Update Marker" onclick="saveMarkerOnDB();" />' +
    '</fieldset>';

    if (trackHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookForm);
    	trackHookVisibility = false;
    }
    if (circleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookCircleForm);
    	circleHookVisibility = false;
    }
    if (rectangleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookRectangleForm);
    	rectangleHookVisibility = false;
    }    
    if (polylineHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolylineForm);
    	polylineHookVisibility = false;
    }
    if (polygonHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolygonForm);
    	polygonHookVisibility = false;
    }    
    document.getElementById("sidebar").appendChild(hookMarkerForm);
    markerHookVisibility = true;
 }
 else {
  hookMarker.setMap(null);
  document.getElementById("sidebar").removeChild(hookMarkerForm);
  markerHookVisibility = false;
 }
}
function centerMapOnMarkerHook() {
	map.setCenter(hookedMarker.getPosition());
}
function saveMarkerOnDB(){
    var formValues=$("form#hookmarkerpanel").serialize();
    $.ajax({
    	async: false,
    	type: "POST",
	    url: "updatemarker/"+hookedGeosmarker.id,
	    data: formValues,
        dataType: "json",
        success: function(data, status){
        	 hookedGeosmarker=data.content.geosmarker;
        	 google.maps.event.clearListeners(hookedMarker,'click');
        	 setEventsOnMarker(hookedMarker,hookedGeosmarker);          	    	
	    } // end on success
	}); // end of the new Ajax.Request() call
//	updateListTracks();	
}
////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
function deleteMarker(geosmarker,marker) {
    $.ajax({
    	async: false,
    	type: "PUT",
    	url: "destroymarker/"+geosmarker.id,
    	success: function(data,status){

    	}
    })
}/////////////////////////////////////////////
//click on circle 
/////////////////////////////////////////////
function displayCircleHook(circle,visibility,geoscircle)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
   hookedOverlay = circle;
   hookedGeoscircle = geoscircle;
   var geoscirclename;
   var geoscircleradius;
   if (geoscircle == null) {
   	geoscirclename="";
   	geoscircleradius=0;
   }
   else {
   	geoscirclename=geoscircle.name;
   	geoscircleradius=geoscircle.radius;
   }
//   hookMarker.setPosition(circle.getCenter());
  hookMarker.setMap(null);
  circle.setOptions({strokeColor: '#FF0000'});
  //Hook HTML DOM form element
  hookCircleForm.id = "hookcirclepanel";
  hookCircleForm.setAttribute("action","");
  hookCircleForm.onsubmit = function() {
  	                    deleteCircle(geoscircle,circle); 
  	                    hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookCircleForm);
  	                    circle.setMap(null);
  	                    circleHookVisibility = false;
  	                    hookedOverlay = null;
  	                    return false;};
  hookCircleForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="name">Name </label>'  +
    '<input type="text" id="namecircletxt" name="geoscircle[name]" value="' + geoscirclename + '"/>' +
    '<br>' +
    '<label for="latitude">Lat </label>' + circle.getCenter().lat().toFixed(4) +
    '<input type="hidden" id="circlelatid" name="geoscircle[lat]" value="' +
     circle.getCenter().lat().toFixed(4) + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' + circle.getCenter().lng().toFixed(4) +
    '<input type="hidden" id="circlelngid" name="geoscircle[lng]" value="' +
     circle.getCenter().lng().toFixed(4) + '"/>' +
    '<br>' +
    '<label for="radius">Rad. (m) </label>' + circle.getRadius().toFixed(0) +
    '<input type="hidden" id="namecircleradius" name="geoscircle[radius]" value="' + circle.getRadius() + '"/>' +
    '<br>' +    
    '<input type="submit" id="cancelcircle" value="Delete Circle" />' +
    '<input type="button" id="centercircle" value="Center" onclick="centerMapOnCircleHook();" />' +
    '<input type="button" id="saveCircle" value="Update Circle" onclick="saveCircleOnDB();" />' +
    '</fieldset>';

    if (trackHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookForm);
    	trackHookVisibility = false;
    }
    if (markerHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookMarkerForm);
    	markerHookVisibility = false;
    }
    if (rectangleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookRectangleForm);
    	rectangleHookVisibility = false;
    }
    if (polylineHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolylineForm);
    	polylineHookVisibility = false;
    }
    if (polygonHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolygonForm);
    	polygonHookVisibility = false;
    }    
    document.getElementById("sidebar").appendChild(hookCircleForm);
    circleHookVisibility = true;
 }
 else {
//  hookMarker.setMap(null);
  circle.setOptions({strokeColor: '#000000'});
  document.getElementById("sidebar").removeChild(hookCircleForm);
  circleHookVisibility = false;
 }
}
function centerMapOnCircleHook() {
	map.setCenter(hookedOverlay.getCenter());
}
////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
function deleteCircle(geoscircle,circle) {
    $.ajax({
    	async: false,
    	type: "PUT",
    	url: "destroycircle/"+geoscircle.id,
    	success: function(data,status){

    	}
    })
}
function saveCircleOnDB(){
    var formValues=$("form#hookcirclepanel").serialize();
    $.ajax({
    	async: false,
    	type: "POST",
	    url: "updatecircle/"+hookedGeoscircle.id,
	    data: formValues,
        dataType: "json",
        success: function(data, status){
        	 hookedGeoscircle=data.content.geoscircle;
        	 google.maps.event.clearListeners(hookedOverlay,'click');
        	 setEventsOnCircle(hookedOverlay,hookedGeoscircle);          	    	
	    } // end on success
	}); // end of the new Ajax.Request() call
//	updateListTracks();	
}
/////////////////////////////////////////////
//click on rectangle 
/////////////////////////////////////////////
function displayRectangleHook(rectangle,visibility,geosrectangle)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
   hookedOverlay = rectangle;
   hookedGeosrectangle = geosrectangle;
   var geosrectanglename;
   var geosrectanglelatSW;
   var geosrectanglelngSW;
   var geosrectanglelatNE;
   var geosrectanglelngNE;
   if (geosrectangle == null) {
   	geosrectanglename="";
   	geosrectanglelatSW=0;
   	geosrectanglelngSW=0;
   	geosrectanglelatNE=0;
   	geosrectanglelngNE=0;
   }
   else {
   	geosrectanglename=geosrectangle.name;
   	geosrectanglelatSW=geosrectangle.latSW;
   	geosrectanglelngSW=geosrectangle.lngSW;
   	geosrectanglelatNE=geosrectangle.latNE;
   	geosrectanglelngNE=geosrectangle.lngNE;
   }   
  hookMarker.setMap(null);
  rectangle.setOptions({strokeColor: '#FF0000'});
  //Hook HTML DOM form element
  hookRectangleForm.id = "hookrectanglepanel";
  hookRectangleForm.setAttribute("action","");
  hookRectangleForm.onsubmit = function() {
                            deleteRectangle(geosrectangle,rectangle); 
                            hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookRectangleForm);
  	                    rectangle.setMap(null);
  	                    rectangleHookVisibility = false;
  	                    hookedOverlay = null;
  	                    return false;};
  hookRectangleForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="name">Name </label>'  +
    '<input type="text" id="namerectangletxt" name="geosrectangle[name]" value="' + geosrectanglename + '"/>' +
    '<br>' +
    '<label for="latitudeSW">LatSW </label>' + rectangle.getBounds().getSouthWest().lat().toFixed(4) +
    '<input type="hidden" id="rectanglelatswid" name="geosrectangle[latSW]" value="' +
     rectangle.getBounds().getSouthWest().lat().toFixed(4) + '"/>' +
    '<br>' +
    '<label for="longitudeSW">LngSW </label>' + rectangle.getBounds().getSouthWest().lng().toFixed(4) +
    '<input type="hidden" id="rectanglelngswid" name="geosrectangle[lngSW]" value="' +
     rectangle.getBounds().getSouthWest().lng().toFixed(4) + '"/>' +
    '<br>' +
    '<label for="latitudeNE">LatNE </label>' + rectangle.getBounds().getNorthEast().lat().toFixed(4) +
    '<input type="hidden" id="rectanglelatneid" name="geosrectangle[latNE]" value="' +
     rectangle.getBounds().getNorthEast().lat().toFixed(4) + '"/>' +
    '<br>' +
    '<label for="longitudeNE">LngNE </label>' + rectangle.getBounds().getNorthEast().lng().toFixed(4) +
    '<input type="hidden" id="rectanglelngneid" name="geosrectangle[lngNE]" value="' +
     rectangle.getBounds().getNorthEast().lng().toFixed(4) + '"/>' +
    '<br>' +
    '<input type="submit" id="cancelrectangle" value="Delete Rectangle" />' +
    '<input type="button" id="centerrectangle" value="Center" onclick="centerMapOnRectangleHook();" />' +
    '<input type="button" id="saveRectangle" value="Update Rectangle" onclick="saveRectangleOnDB();" />' +
    '</fieldset>';

    if (trackHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookForm);
    	trackHookVisibility = false;
    }
    if (markerHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookMarkerForm);
    	markerHookVisibility = false;
    }
    if (circleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookCircleForm);
    	circleHookVisibility = false;
    }
    if (polylineHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolylineForm);
    	polylineHookVisibility = false;
    }
    if (polygonHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolygonForm);
    	polygonHookVisibility = false;
    }    
    document.getElementById("sidebar").appendChild(hookRectangleForm);
    rectangleHookVisibility = true;
 }
 else {

  rectangle.setOptions({strokeColor: '#000000'});
  document.getElementById("sidebar").removeChild(hookRectangleForm);
  rectangleHookVisibility = false;
 }
}
function centerMapOnRectangleHook() {
	map.setCenter(hookedOverlay.getBounds().getCenter());
}
////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
function deleteRectangle(geosrectangle,rectangle) {
    $.ajax({
    	async: false,
    	type: "PUT",
    	url: "destroyrectangle/"+geosrectangle.id,
    	success: function(data,status){

    	}
    })
}
function saveRectangleOnDB(){
    var formValues=$("form#hookrectanglepanel").serialize();
    $.ajax({
    	async: false,
    	type: "POST",
	    url: "updaterectangle/"+hookedGeosrectangle.id,
	    data: formValues,
        dataType: "json",
        success: function(data, status){
        	 hookedGeosrectangle=data.content.geosrectangle;
        	 google.maps.event.clearListeners(hookedOverlay,'click');
        	 setEventsOnRectangle(hookedOverlay,hookedGeosrectangle);          	    	
	    } // end on success
	}); // end of the new Ajax.Request() call
//	updateListTracks();	
}
/////////////////////////////////////////////
//click on polyline 
/////////////////////////////////////////////
function displayPolylineHook(polyline,visibility,geospolyline)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
 hookedOverlay = polyline;
 hookedGeospolyline = geospolyline;
 var geospolylinename;
 var geospolylinegeometry;
 if (geospolyline == null) {
 	geospolylinename="";
 	geospolylinegeometry="";
 }
 else {
 	geospolylinename=geospolyline.name;
 	geospolylinegeometry=geospolyline.geometry; 	
 }  
 hookMarker.setMap(null);
 polyline.setOptions({strokeColor: '#FF0000'});
 //Hook HTML DOM form element
 hookPolylineForm.id = "hookpolylinepanel";
 hookPolylineForm.setAttribute("action","");
 hookPolylineForm.onsubmit = function() {
 	                    deletePolyline (geospolyline,polyline);
 	                    hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookPolylineForm);
  	                    polyline.setMap(null);
  	                    polylineHookVisibility = false;
  	                    hookedOverlay = null;
  	                    return false;};
  hookPolylineForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="name">Name </label>'  +
    '<input type="text" id="namepolylinetxt" name="geospolyline[name]" value="' + geospolylinename + '"/>' +
    '<br>' +
    '<input type="hidden" id="polylinegeometryid" name="geospolyline[geometry]" value="' +
     google.maps.geometry.encoding.encodePath(polyline.getPath()) + '"/>' +
    '<br>' +
    '<input type="submit" id="cancelpolyline" value="Delete Polyline" />' +
    '<input type="button" id="savePolyline" value="Update Polyline" onclick="savePolylineOnDB();" />' +
    '</fieldset>';

    if (trackHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookForm);
    	trackHookVisibility = false;
    }
    if (markerHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookMarkerForm);
    	markerHookVisibility = false;
    }
    if (circleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookCircleForm);
    	circleHookVisibility = false;
    }
    if (rectangleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookRectangleForm);
    	rectangleHookVisibility = false;
    }
    if (polygonHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolygonForm);
    	polygonHookVisibility = false;
    }    
    document.getElementById("sidebar").appendChild(hookPolylineForm);
    polylineHookVisibility = true;
 }
 else {

  polyline.setOptions({strokeColor: '#000000'});
  document.getElementById("sidebar").removeChild(hookPolylineForm);
  polylineHookVisibility = false;
 }
}
function deletePolyline(geospolyline,polyline) {
    $.ajax({
    	async: false,
    	type: "PUT",
    	url: "destroypolyline/"+geospolyline.id,
    	success: function(data,status){

    	}
    })
}
function savePolylineOnDB(){
    var formValues=$("form#hookpolylinepanel").serialize();
    $.ajax({
    	async: false,
    	type: "POST",
	    url: "updatepolyline/"+hookedGeospolyline.id,
	    data: formValues,
        dataType: "json",
        success: function(data, status){
        	 hookedGeospolyline=data.content.geospolyline;
        	 google.maps.event.clearListeners(hookedOverlay,'click');
        	 setEventsOnPolyline(hookedOverlay,hookedGeospolyline);          	    	
	    } // end on success
	}); // end of the new Ajax.Request() call
//	updateListTracks();	
}


/////////////////////////////////////////////
//click on polygon 
/////////////////////////////////////////////
function displayPolygonHook(polygon,visibility,geospolygon)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
 hookedOverlay = polygon;
 hookedGeospolygon = geospolygon;
 var geospolygonname;
 var geospolygongeometry;
 if (geospolygon == null) {
 	geospolygonname="";
 	geospolygongeometry="";
 }
 else {
 	geospolygonname=geospolygon.name;
 	geospolygongeometry=geospolygon.geometry; 	
 }   
   
  hookMarker.setMap(null);
  polygon.setOptions({strokeColor: '#FF0000'});
  //Hook HTML DOM form element
  hookPolygonForm.id = "hookpolygonpanel";
  hookPolygonForm.setAttribute("action","");
  hookPolygonForm.onsubmit = function() {
  	                    deletePolygon(geospolygon, polygon); 
  	                    hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookPolygonForm);
  	                    polygon.setMap(null);
  	                    polygonHookVisibility = false;
  	                    hookedOverlay = null;
  	                    return false;};
  hookPolygonForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="name">Name </label>'  +
    '<input type="text" id="namepolygontxt" name="geospolygon[name]" value="' + geospolygonname + '"/>' +
    '<br>' +
    '<input type="hidden" id="polygongeometryid" name="geospolygon[geometry]" value="' +
     google.maps.geometry.encoding.encodePath(polygon.getPath()) + '"/>' +
    '<br>' +
    '<input type="submit" id="cancelpolygon" value="Delete Polygon" />' +
    '<input type="button" id="savePolygon" value="Update Polygon" onclick="savePolygonOnDB();" />' +
    '</fieldset>';

    if (trackHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookForm);
    	trackHookVisibility = false;
    }
    if (markerHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookMarkerForm);
    	markerHookVisibility = false;
    }
    if (circleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookCircleForm);
    	circleHookVisibility = false;
    }
    if (rectangleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookRectangleForm);
    	rectangleHookVisibility = false;
    }
    if (polylineHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolylineForm);
    	polylineHookVisibility = false;
    }    
    document.getElementById("sidebar").appendChild(hookPolygonForm);
    polygonHookVisibility = true;
 }
 else {

  polygon.setOptions({strokeColor: '#000000'});
  document.getElementById("sidebar").removeChild(hookPolygonForm);
  polygonHookVisibility = false;
 }
}
function deletePolygon(geospolygon,polygon) {
    $.ajax({
    	async: false,
    	type: "PUT",
    	url: "destroypolygon/"+geospolygon.id,
    	success: function(data,status){

    	}
    })
}
function savePolygonOnDB(){
    var formValues=$("form#hookpolygonpanel").serialize();
    $.ajax({
    	async: false,
    	type: "POST",
	    url: "updatepolygon/"+hookedGeospolygon.id,
	    data: formValues,
        dataType: "json",
        success: function(data, status){
        	 hookedGeospolygon=data.content.geospolygon;
        	 google.maps.event.clearListeners(hookedOverlay,'click');
        	 setEventsOnPolygon(hookedOverlay,hookedGeospolygon);          	    	
	    } // end on success
	}); // end of the new Ajax.Request() call
//	updateListTracks();	
}


/////////////////////////////////////////////
//click on track 
/////////////////////////////////////////////
function displayTrackHook(marker,track,location,visibility)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
   hookedTrack = track;
   hookMarker.setPosition(location);
   hookMarker.setMap(map);
  //Hook HTML DOM form element
  hookForm.id = "hookpanel";
  hookForm.setAttribute("action","");
  hookForm.onsubmit = function() { hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookForm);
  	                    trackHookVisibility = false;
  	                    deleteTrack(location,track,marker);
  	                    return false;};
  hookForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="id">Id </label>' + track.id +
    '<br>' +
    '<label for="cstId">TrackId </label>' + track.cstId +
    '<br>' +
    '<label for="cstName">Name </label>' + track.cstName +
    '<br>' +
    '<label for="latitude">Lat </label>' + format_number(track.lat,4) +
    '<br>' +
    '<label for="longitude">Lng </label>' + format_number(track.long,4) +
    '<br>' +
    '<label for="category">Category </label>' + track.category + 
    '<br>' +
    '<label for="icon">Identity </label>' + track.icon + 
    '<br>' +
    '<label for="course">Course </label>' + track.course + 
    '<br>' +
    '<label for="speed">Speed </label>' + track.speed + 
    '<br>' +
    '<input type="submit" id="cancel" value="Delete Track" />' +
    '<input type="button" id="prova" value="Center" onclick="centerMapOnHook();" />' +
    '</fieldset>';
    if (markerHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookMarkerForm);
    	markerHookVisibility = false;
    }
    if (circleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookCircleForm);
    	circleHookVisibility = false;
    }
    if (rectangleHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookRectangleForm);
    	rectangleHookVisibility = false;
    }
    if (polylineHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolylineForm);
    	polylineHookVisibility = false;
    }
    if (polygonHookVisibility == true){
    	document.getElementById("sidebar").removeChild(hookPolygonForm);
    	polygonHookVisibility = false;
    }    
    document.getElementById("sidebar").appendChild(hookForm);
    trackHookVisibility = true;
 }
 else {
  hookMarker.setMap(null);
  document.getElementById("sidebar").removeChild(hookForm);
  trackHookVisibility = false;
 }
}
function centerMapOnHook() {
    centerLatitude = hookedTrack.lat;
    centerLongitude = hookedTrack.long;
    var hooklatlng = new google.maps.LatLng(centerLatitude,centerLongitude); 
	map.setCenter(hooklatlng);
}
function setEventsOnTrack(marker,latlng,track,inputDeleteForm,inputUpdateForm) {

  google.maps.event.addListener(marker,'click',function(){
   displayTrackHook(marker,track,latlng,true);
  });

  google.maps.event.addListener(marker,'rightclick',function(){
    infoDeleteWindow.setContent(inputDeleteForm);
    infoDeleteWindow.setPosition(marker.getPosition());
    infoDeleteWindow.open(map);
  });
  google.maps.event.addListener(marker,'dblclick',function(){
    infoUpdateWindow.setContent(inputUpdateForm);
    infoUpdateWindow.setPosition(marker.getPosition());
    infoUpdateWindow.open(map);
  });

  google.maps.event.addListener(marker,'dragstart',function(){
  	hookMarker.setMap(null);

  });
  google.maps.event.addListener(marker,'dragend',function(event){
    updateInfoWindow(marker,event.latLng,track);
  });
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnMarker(marker,geosmarker) {

  google.maps.event.addListener(marker,'click',function(){
   displayMarkerHook(marker,true,"",geosmarker);
  });
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnCircle(circle,geoscircle) {
  google.maps.event.addListener(circle,'click',function(){
   displayCircleHook(circle,true,geoscircle);
  });
  google.maps.event.addListener(circle,'radius_changed',function(){
   displayCircleHook(circle,true,geoscircle);
  });
  google.maps.event.addListener(circle,'center_changed',function(){
   displayCircleHook(circle,true,geoscircle);
  });    
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnRectangle(rectangle,geosrectangle) {
  google.maps.event.addListener(rectangle,'click',function(){
   displayRectangleHook(rectangle,true,geosrectangle);
  });
  google.maps.event.addListener(rectangle,'bounds_changed',function(){
   displayRectangleHook(rectangle,true,geosrectangle);
  });
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnPolyline(polyline,geospolyline) {
  google.maps.event.addListener(polyline,'click',function(){
   displayPolylineHook(polyline,true,geospolyline);
  });
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnPolygon(polygon,geospolygon) {
  google.maps.event.addListener(polygon,'click',function(){
   displayPolygonHook(polygon,true,geospolygon);
  });
}
////////////////////////////////////////////////////////////////////////////
//after track creation to create a marker
///////////////////////////////////////////////////////////////////////////

function createMarker(track) {
    buildImage(track);// set image with the correct symbol
    var lat=track.lat;
    var lng=track.long;
    var latlng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        title:track.cstId,
                        draggable: true,
                        icon: image});
    markerArray.push(marker);
    var inputDeleteForm=createDeleteTrackForm(track,marker,latlng);
    var inputUpdateForm=createUpdateTrackForm(track,marker,latlng);
    setEventsOnTrack(marker,latlng,track,inputDeleteForm,inputUpdateForm);

    image = '';

    return marker;  
}
////////////////////////////////////////////////////////////////////////////
//after marker creation to create a marker
///////////////////////////////////////////////////////////////////////////

function createGeosmarker(geosmarker) {
//    buildImage(marker);// set image with the correct symbol
    var lat=geosmarker.lat;
    var lng=geosmarker.lng;
    var latlng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        title:geosmarker.name,
                        draggable: true});
//                        icon: image});
    geosmarkerArray.push(marker);
    setEventsOnMarker(marker,geosmarker);

//    image = '';

    return marker;  
}
////////////////////////////////////////////////////////////////////////////
//after circle creation to create a geoscircle
///////////////////////////////////////////////////////////////////////////

function createGeoscircle(geoscircle) {
//    buildImage(marker);// set image with the correct symbol
    var lat=geoscircle.lat;
    var lng=geoscircle.lng;
    var latlng = new google.maps.LatLng(lat,lng);
    var circleoptions = {
    	                center: latlng,
                        editable: true,
                        map: map,
                        radius: geoscircle.radius,
                        title:geoscircle.name,
                        fillColor: '#000000',
                        fillOpacity: 0.05,
                        strokeWeight: 2,       
                        clickable: true,
                        zIndex: 1,
                        draggable: true
                        };
    var circle = new google.maps.Circle(circleoptions);
    geoscircleArray.push(circle);
    setEventsOnCircle(circle,geoscircle);
    return circle;  
}
////////////////////////////////////////////////////////////////////////////
//after rectangle creation to create a geosrectangle
///////////////////////////////////////////////////////////////////////////

function createGeosrectangle(geosrectangle) {
//    buildImage(marker);// set image with the correct symbol
    var latSW=geosrectangle.latSW;
    var lngSW=geosrectangle.lngSW;
    var latlngSW = new google.maps.LatLng(latSW,lngSW);
    var latNE=geosrectangle.latNE;
    var lngNE=geosrectangle.lngNE;
    var latlngNE = new google.maps.LatLng(latNE,lngNE);
    var geosrectanglebounds = new google.maps.LatLngBounds(latlngSW,latlngNE);
    var rectangleoptions = {
    	                bounds: geosrectanglebounds,
                        editable: true,
                        map: map,
                        title:geosrectangle.name,
                        fillColor: '#000000',
                        fillOpacity: 0.05,
                        strokeWeight: 2,       
                        clickable: true,
                        zIndex: 1,
                        draggable: true
                        };
    var rectangle = new google.maps.Rectangle(rectangleoptions);
    geosrectangleArray.push(rectangle);
    setEventsOnRectangle(rectangle,geosrectangle);
    return rectangle;  
}
////////////////////////////////////////////////////////////////////////////
//after polyline creation to create a geospolyline
///////////////////////////////////////////////////////////////////////////

function createGeospolyline(geospolyline) {
//    buildImage(marker);// set image with the correct symbol
    var geometry=geospolyline.geometry;
    var polylineoptions = {
    	                path: google.maps.geometry.encoding.decodePath(geometry),
                        editable: true,
                        map: map,
                        title:geospolyline.name,
 //                       fillColor: '#000000',
 //                       fillOpacity: 0.05,
                        strokeWeight: 2,       
                        clickable: true,
                        zIndex: 1,
                        draggable: true
                        };
    var polyline = new google.maps.Polyline(polylineoptions);
    geospolylineArray.push(polyline);
    setEventsOnPolyline(polyline,geospolyline);
    return polyline;  
}
////////////////////////////////////////////////////////////////////////////
//after polygon creation to create a geospolygon
///////////////////////////////////////////////////////////////////////////

function createGeospolygon(geospolygon) {
//    buildImage(marker);// set image with the correct symbol
    var geometry=geospolygon.geometry;
    var polygonoptions = {
    	                path: google.maps.geometry.encoding.decodePath(geometry),
                        editable: true,
                        map: map,
                        title:geospolygon.name,
                        fillColor: '#000000',
                        fillOpacity: 0.05,
                        strokeWeight: 2,       
                        clickable: true,
                        zIndex: 1,
                        draggable: true
                        };
    var polygon = new google.maps.Polygon(polygonoptions);
    geospolygonArray.push(polygon);
    setEventsOnPolygon(polygon,geospolygon);
    return polygon;  
}
//////////////////////////////////////////////////////////
// mouse mouvement on the map 
//////////////////////////////////////////////////////////
function displayLatLong(location) {
  //retrieve lat and long of the click point
  displayLat = location.lat().toFixed(4);
  displayLong = location.lng().toFixed(4);
  document.getElementById("geolat").setAttribute("value",displayLat);
  document.getElementById("geolng").setAttribute("value",displayLong);  
}
//////////////////////////////////////////////////////////
// on click on the map in empty position
//////////////////////////////////////////////////////////
function createTrackInfoWindow(location) {
  //retrieve lat and long of the click point
  var lat = location.lat();
  var lng = location.lng();
  //create an HTML DOM form element
  var inputForm = document.createElement("form");
  inputForm.id = "createFormId";
  inputForm.setAttribute("action","");
  inputForm.onsubmit = function() {createTrack(location); return false;};
  inputForm.innerHTML =  
    '<fieldset style="width:250px;">' +
    '<label for="cstId">TrkId </label>' +
    '<input type="text" id="cstID" name="track[cstId]" style="width:60%;"/>'+
    '<br>' +
    '<label for="cstName">Name </label>' +
    '<input type="text" id="cstName" name="track[cstName]" style="width:60%;"/>'+
    '<br>' +
    '<label for="latitude">Lat </label>' + format_number(lat,4) + 
    '<input type="hidden" id="latitude" name="track[lat]" maxlength="10" value="' +
      lat + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' + format_number(lng,4) +
    '<input type="hidden" id="longitude" name="track[long]" maxlength="10" value="' +
      lng + '"/>' +
    '<br>' +
    '<label for="category">Category </label>' +
    '<select name="track[category]">' +
    '<option value="land">Land</option> ' +
    '<option value="air">Air</option> ' +
    '<option value="sea">Sea</option>' +
    '</select>' +
    '<br>' +
    '<label for="icon">Identity  </label>'+
    '<select name="track[icon]">' +
    '<option value="unknown">Unknown</option> ' +
    '<option value="friend">Friend</option> ' +
    '<option value="enemy">Enemy</option>' +
    '<option value="neutral">Neutral</option>' +
    '</select>' +
    '<br>' +
    '<label for="course">Course </label>' +
    '<input type="text" id="course" name="track[course]" style="width:60%;"/>'+
    '<br>' +
    '<label for="speed">Speed </label>' +
    '<input type="text" id="speed" name="track[speed]" style="width:60%;"/>'+
    '<br>' +
    '<input type="submit" value="Create" />' +
    '</fieldset>';
    infoCreateWindow.setContent(inputForm);
    infoCreateWindow.setPosition(location);
    infoCreateWindow.open(map);

  return;

}
///////////////////////////////////////////////////////////////////////////////
// during initialisation of page
///////////////////////////////////////////////////////////////////////////////
function listTracks() {
  $.ajax({
  	async: false,
  	type: "GET",
	url: "list",
	dataType: "json",
    success: function(data, status){
		var track;
		var marker;
		tracks = data;
		nTracks = tracks.length;
        document.getElementById("ntracks").setAttribute("value",nTracks);
        for (var i = 0 ; i < tracks.length ; i++) {
          track = tracks[i].track;  
          marker=createMarker(track);

        }; // end of for loop
	} // end of function
  }); //end of .ajax request
  initPostime();
}
///////////////////////////////////////////////////////////////////////////////
// during initialisation of page
///////////////////////////////////////////////////////////////////////////////
function listMarkers() {
  $.ajax({
  	async: false,
  	type: "GET",
	url: "listmarkers",
	dataType: "json",
    success: function(data, status){
        var geosmarker;
		var marker;
		geosmarkers = data;
		nGeosmarkers = geosmarkers.length;
        for (var i = 0 ; i < geosmarkers.length ; i++) {
          geosmarker = geosmarkers[i].geosmarker;  
          marker=createGeosmarker(geosmarker);

        }; // end of for loop
	} // end of function
  }); //end of .ajax request
}
///////////////////////////////////////////////////////////////////////////////
// during initialisation of page
///////////////////////////////////////////////////////////////////////////////
function listCircles() {
  $.ajax({
  	async: false,
  	type: "GET",
	url: "listcircles",
	dataType: "json",
    success: function(data, status){
        var geoscircle;
		var circle;
		geoscircles = data;
        for (var i = 0 ; i < geoscircles.length ; i++) {
          geoscircle = geoscircles[i].geoscircle;  
          circle=createGeoscircle(geoscircle);
        }; // end of for loop
	} // end of function
  }); //end of .ajax request
}
function listRectangles() {
  $.ajax({
  	async: false,
  	type: "GET",
	url: "listrectangles",
	dataType: "json",
    success: function(data, status){
        var geosrectangle;
	var rectangle;
	geosrectangles = data;
        for (var i = 0 ; i < geosrectangles.length ; i++) {
          geosrectangle = geosrectangles[i].geosrectangle;  
          rectangle=createGeosrectangle(geosrectangle);
        }; // end of for loop
	} // end of function
  }); //end of .ajax request
}
function listPolylines() {
  $.ajax({
  	async: false,
  	type: "GET",
	url: "listpolylines",
	dataType: "json",
    success: function(data, status){
        var geospolyline;
	var polyline;
	geospolylines = data;
        for (var i = 0 ; i < geospolylines.length ; i++) {
          geospolyline = geospolylines[i].geospolyline;  
          polyline=createGeospolyline(geospolyline);
        }; // end of for loop
	} // end of function
  }); //end of .ajax request
}
function listPolygons() {
  $.ajax({
  	async: false,
  	type: "GET",
	url: "listpolygons",
	dataType: "json",
    success: function(data, status){
        var geospolygon;
	var polygon;
	geospolygons = data;
        for (var i = 0 ; i < geospolygons.length ; i++) {
          geospolygon = geospolygons[i].geospolygon;  
          polygon=createGeospolygon(geospolygon);
        }; // end of for loop
	} // end of function
  }); //end of .ajax request
}
////////////////////////////////////////////
function initPostime(){
	   var track;
	   var updatedTrack;
	   for (var i = 0 ; i < tracks.length ; i++) {
          track = tracks[i].track;  
          $.ajax({
          	async: false,
    	    type: "PUT",
	        url: "updatepostime/" + track.id,
	        data: track,
            dataType: "json",
            success: function(data, status){ 
//               updatedTrack=data.content.track;
	        } // end on success
	      }); // end of the new Ajax.Request() call
        }; // end of for loop
        updateListTracks();
}
///////////////////////////////////////////////////////////////////////////////
// periodical presentation of the tracks
///////////////////////////////////////////////////////////////////////////////
function updateListTracks() {
  $.ajax({
  	type: "GET",
	url: "list",
	dataType: "json",
    success: function(data, status){
		tracks = data;
        nTracks = tracks.length;
        document.getElementById("ntracks").setAttribute("value",nTracks);
        for (var j = 0; j<markerArray.length;j++){
          markerArray[j].setMap(null);
        }
        markerArray = [];
        var track;
        var marker;
        for (var i = 0 ; i < tracks.length ; i++) {
          track = tracks[i].track; 
          marker=createMarker(track);
        }; // end of for loop
	} // end of function
  }); //end of .ajax request
    t=setTimeout("updateListTracks()",30000);
}
/////////////////////////////////////////////////////////////
// on submit Create button click
/////////////////////////////////////////////////////////////
function createTrack (location) {
    lat = location.lat();
    lng = location.lng();
    var formValues=$("form#createFormId").serialize();
    $.ajax({
    	async: false,
    	type: "POST",
	    url: "create",
	    data: formValues,
        dataType: "json",
        success: function(data, status){    	
             infoCreateWindow.close();
	    } // end on success
	}); // end of the new Ajax.Request() call
	updateListTracks();
	initPostime();
}
////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
function deleteTrack(location,track,marker) {
    $.ajax({
    	async: false,
    	type: "PUT",
    	url: "destroy/"+track.id,
    	success: function(data,status){
    		marker.setMap(null);
    		hookMarker.setMap(null);
            document.getElementById("sidebar").removeChild(hookForm);
    	}
    })
}
/////////////////////////////////////////////////////////////////////////
// on submit Save (after update) button click
/////////////////////////////////////////////////////////////////////////
function updateTrack(marker,id) {
    var formValues=$("form#updateFormId").serialize();
    var updatedTrack;
    $.ajax({
    	async: false,
    	type: "PUT",
	    url: "update/" + id,
	    data: formValues,
        dataType: "json",
        success: function(data, status){    	
             updatedTrack=data.content.track;
	    } // end on success
	}); // end of the new Ajax.Request() call
}
/////////////////////////////////////////////////////////////////////////
// on submit Confirm (after Save) button click
/////////////////////////////////////////////////////////////////////////
function confirmSaveGeosmap() {
    var formValues=$("form#saveFormId").serialize();
    $.ajax({
    	async: false,
    	type: "PUT",
	    url: "save",
	    data: formValues,
        dataType: "json",
        success: function(data, status){    	
//             geosmap=data.content.track;
	    } // end on success
	}); // end of the new Ajax.Request() call
    document.getElementById("sidebar").removeChild(saveForm);
}
//////////////////////////////////////////////////////////////////////
function displayGeoPanel() {
	  //Hook HTML DOM form element
  geoForm.id = "geopanel";
  geoForm.setAttribute("action","");
  geoForm.onsubmit = function() {  
  	                    document.getElementById("sidebar").removeChild(geoForm);
  	                    return false;};
  geoForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="map">Map: </label>' +  geosmap.name +   
    '<input type="button" id="savemap" value="Save Map" style="width:90%;" onclick="saveMap()"/>' +
    '<br>' +
    '<label for="latitude">Lat </label>' +
    '<input type="text" id="geolat" name="geo[lat]" maxlength="10" style="width:90%;' + 
     'value="'+ centerLatitude.toFixed(4) + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' +
    '<input type="text" id="geolng" name="geo[lng]" maxlength="10" style="width:90%;' + 
     'value="'+ centerLongitude.toFixed(4) + '"/>' +
    '<br>' +
    '<input type="button" id="geo1" value="Find Address" style="width:90%;" onclick="displayReverseGeocode()"/>' +
    '<br>' +
    '<input type="text" id="geocodetxt" name="geo[geocodetxt]" style="width:90%;" ' + 
    '<br>' +
    '<input type="button" id="geocode" value="Geocode" style="width:90%;" onclick="displayGeocode()"/>' +
    '<input type="button" id="myposition" value="My Position" style="width:90%;" onclick="displayMyPosition()"/>' +
    '<label for="ntracks">NTracks </label>' +
    '<input type="text" id="ntracks" name="geo[ntracks]" maxlength="4" style="width:90%;' + 
     'value="'+ nTracks + '"/>' +
    '</fieldset>';
    document.getElementById("sidebar").appendChild(geoForm);
 }
//////////////////////////////////////////////////////////////////////
function saveMap() {
//    var formValues=$("form#updateFormId").serialize();
//    var updatedTrack;
geosmap.zoom = map.getZoom();
geosmap.centerlat = map.getCenter().lat();
geosmap.centerlng = map.getCenter().lng();
geosmap.maptype = map.getMapTypeId();

saveGeosmap();	
}

//////////////////////////////////////////////////////////////////////

function displayMyPosition()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showMyPosition);
    }
  else{alert("Geolocation is not supported by this browser.");}
  }
  
function showMyPosition(position){
//   var myLatlng=position.coords.latitude+","+position.coords.longitude;
   var myLat = parseFloat(position.coords.latitude);
   var myLng = parseFloat(position.coords.longitude);
   var myLatLng = new google.maps.LatLng(myLat,myLng);
   map.setCenter(myLatLng);
   var marker = new google.maps.Marker({
                map: map,
                position: myLatLng
          });
	
  	      displayMarkerHook(marker,true," ",null);
          var geosmarker;
          var formValues=$("form#hookmarkerpanel").serialize();
          $.ajax({
    	      async: false,
    	      type: "POST",
	          url: "createmarker",
	          data: formValues,
              dataType: "json",
              success: function(data, status){ 
            	geosmarker = data.geosmarker;

              	displayMarkerHook(marker,true,"",geosmarker); 
  	            setEventsOnMarker(marker,geosmarker);    	
                	    } // end on success
	         }); // end of the new Ajax.Request() call

}

//////////////////////////////////////////////////////////////////////
function displayGeocode(){
	var geoTxt = document.getElementById("geopanel").geocodetxt.value;
    geocoder.geocode( { 'address': geoTxt}, function(results, status) {
       
       if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
             map: map,
             position: results[0].geometry.location
          });

  	      displayMarkerHook(marker,true,results[0].formatted_address,null);

          var geosmarker;
          var formValues=$("form#hookmarkerpanel").serialize();
          $.ajax({
    	      async: false,
    	      type: "POST",
	          url: "createmarker",
	          data: formValues,
              dataType: "json",
              success: function(data, status){ 
              geosmarker = data.geosmarker;
 	
              displayMarkerHook(marker,true,"",geosmarker);
              setEventsOnMarker(marker,geosmarker);    	
                	    } // end on success
	         }); // end of the new Ajax.Request() call


       } 
       else {
         alert("Geocode was not successful for the following reason: " + status);
       }
    }); 
}
//////////////////////////////////////////////////////////////////////
function displayReverseGeocodeOnHook() {

var latlng = hookedMarker.getPosition();
geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
           if (results[0]) {
           	  hookedGeosmarker.address = results[0].formatted_address;
           	  hookedGeosmarker.name = document.getElementById("hookmarkerpanel").namemarkertxt.value;
              displayMarkerHook(hookedMarker, true, results[0].formatted_address,hookedGeosmarker)
           } else {
               alert("No results found");
             }
         } else {
             alert("Geocoder failed due to: " + status);
           }
        });
} 
//////////////////////////////////////////////////////////////////////
function displayReverseGeocode() {
var lat = parseFloat(document.getElementById("geolat").value);
var lng = parseFloat(document.getElementById("geolng").value);
var latlng = new google.maps.LatLng(lat, lng);
geocoder.geocode({'latLng': latlng}, function(results, status) {

        var marker = new google.maps.Marker({
               position: latlng,
               map: map
              });
        map.setCenter(latlng);
          	      displayMarkerHook(marker,true," ",null);
          var geosmarker;
          var formValues=$("form#hookmarkerpanel").serialize();
          $.ajax({
    	      async: false,
    	      type: "POST",
	          url: "createmarker",
	          data: formValues,
              dataType: "json",
              success: function(data, status){ 
            	geosmarker = data.geosmarker;
            	hookedGeosmarker = geosmarker;
 
              	displayMarkerHook(marker,true,"",geosmarker);
   	            setEventsOnMarker(marker,geosmarker);               	   	
                	    } // end on success
	         }); // end of the new Ajax.Request() call
        if (status == google.maps.GeocoderStatus.OK) {
           if (results[0]) {
           	  hookedGeosmarker.address = results[0].formatted_address;
           	  hookedGeosmarker.name = document.getElementById("hookmarkerpanel").namemarkertxt.value;
              displayMarkerHook(marker, true, results[0].formatted_address,hookedGeosmarker)
           } else {
               alert("No results found");
           	  hookedGeosmarker.address = "";
           	  hookedGeosmarker.name = document.getElementById("hookmarkerpanel").namemarkertxt.value;    
               displayMarkerHook(marker, true, "", hookedGeosmarker);
             }
         } else {
             alert("Geocoder status: " + status);
           	  hookedGeosmarker.address = "";
           	  hookedGeosmarker.name = document.getElementById("hookmarkerpanel").namemarkertxt.value;   
               displayMarkerHook(marker, true, "", hookedGeosmarker);
           }
        });
} 
//////////////////////////////////////////////////////////////////////
function placesOnOff(){
	if (placesFlag == false) {
		placesFlag = true;
		$("#geo1").prop('value','Search');
		drawingManager.setOptions({
            drawingControlOptions: {
                   position: google.maps.ControlPosition.TOP_CENTER,
                   drawingModes: [google.maps.drawing.OverlayType.CIRCLE]
            }
        });
	}
	else {
	    placesFlag = false;
//        document.getElementById("geo1").value = "Places";
		$("#geo1").prop("value","Places");
		drawingManager.setOptions({
           drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.MARKER,
                                           google.maps.drawing.OverlayType.CIRCLE,
                                           google.maps.drawing.OverlayType.RECTANGLE,
                                           google.maps.drawing.OverlayType.POLYLINE,
                                           google.maps.drawing.OverlayType.POLYGON] 
           }
        });
	};

}
//////////////////////////////////////////////////////////////////////
// when the page is loaded
/////////////////////////////////////////////////////////////////////
function initialize() {
//  handleResize();
  loadCurrentMap();
   
//  var ge = new GoogleEarth(map);
 ////////////////////////////////////////////////////
 ////
    drawingManager.setMap(map);
/////////////////////////////////////////////////////////////
    displayGeoPanel();
//////////////////////////////////////////////////////////////
    listTracks();
    listMarkers();
    listCircles();
    listRectangles();
    listPolygons();
    listPolylines();
    google.maps.event.addListener(map,'click',function(event){
           createTrackInfoWindow(event.latLng);});  
    google.maps.event.addListener(map,'mousemove',function(event){
           displayLatLong(event.latLng);});  
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
       switch(event.type) {
          case google.maps.drawing.OverlayType.CIRCLE :
            var geoscircle;
  	        displayCircleHook(event.overlay,true,null);
  	        var formValues=$("form#hookcirclepanel").serialize();
            $.ajax({
    	      async: false,
    	      type: "POST",
	          url: "createcircle",
	          data: formValues,
              dataType: "json",
              success: function(data, status){
              	geoscircle = data.geoscircle;
              	displayCircleHook(event.overlay,true,geoscircle); 
  	          	setEventsOnCircle(event.overlay,geoscircle);  	
                	    } // end on success
	         }); // end of the new Ajax.Request() call
            break;
          case google.maps.drawing.OverlayType.MARKER :
            var geosmarker;

  	        displayMarkerHook(event.overlay,true,"",null);
  	        var formValues=$("form#hookmarkerpanel").serialize();
            $.ajax({
    	      async: false,
    	      type: "POST",
	          url: "createmarker",
	          data: formValues,
              dataType: "json",
              success: function(data, status){ 
              	geosmarker = data.geosmarker;
              	displayMarkerHook(event.overlay,true,"",geosmarker); 
  	          	setEventsOnMarker(event.overlay,geosmarker);  	
                	    } // end on success
	         }); // end of the new Ajax.Request() call
  	        break;
          case google.maps.drawing.OverlayType.RECTANGLE :
            var geosrectangle;
  	        displayRectangleHook(event.overlay,true,null);
  	        var formValues=$("form#hookrectanglepanel").serialize();
                $.ajax({
         	      async: false,
        	      type: "POST",
	              url: "createrectangle",
	              data: formValues,
                      dataType: "json",
                      success: function(data, status){
              	                  geosrectangle = data.geosrectangle;
              	                  displayRectangleHook(event.overlay,true,geosrectangle); 
  	          	          setEventsOnRectangle(event.overlay,geosrectangle);  	
                      } // end on success
	            }); // end of the new Ajax.Request() call
  	        break;
          case google.maps.drawing.OverlayType.POLYLINE :
            var geospolyline;
  	        displayPolylineHook(event.overlay,true,null);
  	        var formValues=$("form#hookpolylinepanel").serialize();
                $.ajax({
         	      async: false,
        	      type: "POST",
	              url: "createpolyline",
	              data: formValues,
                      dataType: "json",
                      success: function(data, status){
              	                  geospolyline = data.geospolyline;
              	                  displayPolylineHook(event.overlay,true,geospolyline); 
  	          	          setEventsOnPolyline(event.overlay,geospolyline);  	
                      } // end on success
	            }); // end of the new Ajax.Request() call

  	        break;  	      
          case google.maps.drawing.OverlayType.POLYGON :
            var geospolygon;
  	        displayPolygonHook(event.overlay,true,null);
  	        var formValues=$("form#hookpolygonpanel").serialize();
                $.ajax({
         	      async: false,
        	      type: "POST",
	              url: "createpolygon",
	              data: formValues,
                      dataType: "json",
                      success: function(data, status){
              	                  geospolygon = data.geospolygon;
              	                  displayPolygonHook(event.overlay,true,geospolygon); 
  	          	          setEventsOnPolygon(event.overlay,geospolygon);  	
                      } // end on success
	            }); // end of the new Ajax.Request() call
  	        break;  	      
  	      default:
       } //switch
    });
 }
/////////////////////////////////////////////////////////////
function loadCurrentMap() {

  $.ajax({
  	async: false,
  	type: "GET",
	url: "currentmap",
	dataType: "json",
    success: function(data, status){
    	geosmap = data.geosmap;
    	myOptions = {
           zoom: geosmap.zoom,
           scaleControl: true,
           center: new google.maps.LatLng(geosmap.centerlat,geosmap.centerlng),
           mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"),
                        myOptions);              
        switch (geosmap.maptype) {
          case 'ROADMAP':
                  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
          break;
          case 'HYBRID':
                  map.setMapTypeId(google.maps.MapTypeId.HYBRID);
          break;
          case 'TERRAIN':
                  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
          break;
          case 'SATELLITE':
                  map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;
          case 'roadmap':
                  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
          break;
          case 'hybrid':
                  map.setMapTypeId(google.maps.MapTypeId.HYBRID);
          break;
          case 'terrain':
                  map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
          break;
          case 'satellite':
                  map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
          break;        };        
    }        
  }); //end of .ajax request

}
/////////////////////////////////////////////////////////////
function format_number(pnumber,decimals){
	    if (isNaN(pnumber)) { return 0};
	    if (pnumber=='') { return 0};
	    var snum = new String(pnumber);
	    var sec = snum.split('.');
	    var whole = parseFloat(sec[0]);
	    var result = '';
	    if(sec.length > 1){
	        var dec = new String(sec[1]);
	        dec = String(parseFloat(sec[1])/Math.pow(10,(dec.length - decimals)));
	        dec = String(whole + Math.round(parseFloat(dec))/Math.pow(10,decimals));
	        var dot = dec.indexOf('.');
	        if(dot == -1){
	            dec += '.';
	            dot = dec.indexOf('.');
	        }
	        while(dec.length <= dot + decimals) { dec += '0'; }
	        result = dec;
	    } else{
	        var dot;
	        var dec = new String(whole);
	        dec += '.';
	        dot = dec.indexOf('.');
	        while(dec.length <= dot + decimals) { dec += '0'; }
	        result = dec;
	    }
	    return result;
	}
//////////////////////////////////////////////////////////////
window.onload = initialize;
