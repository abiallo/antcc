var centerLatitude = 33.0;
var centerLongitude = 36.0;
var initlatlng = new google.maps.LatLng(centerLatitude,centerLongitude);
var geocoder = new google.maps.Geocoder();
var startZoom = 4;
var map;
var tracks = new Array();
var nTracks;
var infoCreateWindow = new google.maps.InfoWindow({
    disableAutoPan: false
    });
var image='';
var markerArray=new Array();
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
    '<input type="text" id="cstId" name="m[cstId]"' +
    'value="'+  track.cstId + '"/>'+
    '<br>' +
    '<label for="cstName">Name </label>' + 
    '<input type="text" id="cstName" name="m[cstName]"' +
    'value="'+  track.cstName + '"/>'+
    '<br>' +
    '<label for="latitude">Lat </label>' +
    '<input type="text" id="lat" name="m[lat]" maxlength="10" ' + 
     'value="'+ format_number(lat,4) + '"/>' +
    '<br>' +
    '<label for="longitude">Lng </label>' +
    '<input type="text" id="long" name="m[long]" maxlength="10" value="' +
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
    '<input type="text" id="course" name="m[course]"' +
    'value="'+  track.course + '"/>'+
    '<br>' +
    '<label for="speed">Speed </label>' + 
    '<input type="text" id="speed" name="m[speed]"' +
    'value="'+  track.speed + '"/>'+
    '<br>' +

    '<input type="submit" value="Save" />' +
    '</fieldset>';

  infoUpdateWindow.setContent(inputForm);
  infoUpdateWindow.setPosition(location);
  infoUpdateWindow.open(map);
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
function displayMarkerHook(marker,visibility,address)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   } 	
   hookedMarker = marker;
   hookMarker.setPosition(marker.getPosition());
   hookMarker.setMap(map);
  //Hook HTML DOM form element
  hookMarkerForm.id = "hookmarkerpanel";
  hookMarkerForm.setAttribute("action","");
  hookMarkerForm.onsubmit = function() { hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookMarkerForm);
  	                    marker.setMap(null);
  	                    markerHookVisibility = false;
  	                    return false;};
  hookMarkerForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="latitude">Lat </label>' + marker.getPosition().lat().toFixed(4) +
    '<br>' +
    '<label for="longitude">Lng </label>' + marker.getPosition().lng().toFixed(4) +
    '<br>' +
    '<label for="category">Address </label>' +   
    '<br>' +
    '<input type="text" id="addresstxt" name="m[addresstxt]" style="width:100%;"' +
    'value="'+  address + '"/>'+   
    '<br>' +
    '<input type="submit" id="cancelMarker" value="Delete Marker" />' +
    '<input type="button" id="centerMarker" value="Center" onclick="centerMapOnMarkerHook();" />' +
    '<input type="button" id="addressMarker" value="Find Address" onclick="displayReverseGeocodeOnHook();" />' +
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
/////////////////////////////////////////////
//click on circle 
/////////////////////////////////////////////
function displayCircleHook(circle,visibility)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
   hookedOverlay = circle;
//   hookMarker.setPosition(circle.getCenter());
  hookMarker.setMap(null);
  circle.setOptions({strokeColor: '#FF0000'});
  //Hook HTML DOM form element
  hookCircleForm.id = "hookcirclepanel";
  hookCircleForm.setAttribute("action","");
  hookCircleForm.onsubmit = function() { hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookCircleForm);
  	                    circle.setMap(null);
  	                    circleHookVisibility = false;
  	                    hookedOverlay = null;
  	                    return false;};
  hookCircleForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="latitude">Lat </label>' + format_number(circle.getCenter().lat(),4) +
    '<br>' +
    '<label for="longitude">Lng </label>' + format_number(circle.getCenter().lng(),4) +
    '<br>' +
    '<label for="radius">Radius (m) </label>' + format_number(circle.getRadius(),0) +
    '<br>' +    
    '<label for="category">Category </label>' +   
    '<br>' +
    '<label for="icon">Identity </label>' +  
    '<br>' +
    '<input type="submit" id="cancelcircle" value="Delete Circle" />' +
    '<input type="button" id="centercircle" value="Center" onclick="centerMapOnCircleHook();" />' +
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

/////////////////////////////////////////////
//click on rectangle 
/////////////////////////////////////////////
function displayRectangleHook(rectangle,visibility)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
   hookedOverlay = rectangle;
  hookMarker.setMap(null);
  rectangle.setOptions({strokeColor: '#FF0000'});
  //Hook HTML DOM form element
  hookRectangleForm.id = "hookrectanglepanel";
  hookRectangleForm.setAttribute("action","");
  hookRectangleForm.onsubmit = function() { hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookRectangleForm);
  	                    rectangle.setMap(null);
  	                    rectangleHookVisibility = false;
  	                    hookedOverlay = null;
  	                    return false;};
  hookRectangleForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="latitude">Lat </label>' + format_number(rectangle.getBounds().getCenter().lat(),4) +
    '<br>' +
    '<label for="longitude">Lng </label>' + format_number(rectangle.getBounds().getCenter().lng(),4) +
    '<br>' +
    '<label for="category">Category </label>' +   
    '<br>' +
    '<label for="icon">Identity </label>' +  
    '<br>' +
    '<input type="submit" id="cancelrectangle" value="Delete Rectangle" />' +
    '<input type="button" id="centerrectangle" value="Center" onclick="centerMapOnRectangleHook();" />' +
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
/////////////////////////////////////////////
//click on polyline 
/////////////////////////////////////////////
function displayPolylineHook(polyline,visibility)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
   hookedOverlay = polyline;
  hookMarker.setMap(null);
  polyline.setOptions({strokeColor: '#FF0000'});
  //Hook HTML DOM form element
  hookPolylineForm.id = "hookpolylinepanel";
  hookPolylineForm.setAttribute("action","");
  hookPolylineForm.onsubmit = function() { hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookPolylineForm);
  	                    polyline.setMap(null);
  	                    polylineHookVisibility = false;
  	                    hookedOverlay = null;
  	                    return false;};
  hookPolylineForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="category">Category </label>' +   
    '<br>' +
    '<label for="icon">Identity </label>' +  
    '<br>' +
    '<input type="submit" id="cancelpolyline" value="Delete Polyline" />' +
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
/////////////////////////////////////////////
//click on polygon 
/////////////////////////////////////////////
function displayPolygonHook(polygon,visibility)
{
 if (visibility==true){
   if (hookedOverlay != null) {	
   	hookedOverlay.setOptions({strokeColor: '#000000'});
   	hookedOverlay.setMap(map);
   }
   hookedOverlay = polygon;
  hookMarker.setMap(null);
  polygon.setOptions({strokeColor: '#FF0000'});
  //Hook HTML DOM form element
  hookPolygonForm.id = "hookpolygonpanel";
  hookPolygonForm.setAttribute("action","");
  hookPolygonForm.onsubmit = function() { hookMarker.setMap(null); 
  	                    document.getElementById("sidebar").removeChild(hookPolygonForm);
  	                    polygon.setMap(null);
  	                    polygonHookVisibility = false;
  	                    hookedOverlay = null;
  	                    return false;};
  hookPolygonForm.innerHTML =  
    '<fieldset style="width:100%;">' +
    '<label for="category">Category </label>' +   
    '<br>' +
    '<label for="icon">Identity </label>' +  
    '<br>' +
    '<input type="submit" id="cancelpolygon" value="Delete Polygon" />' +
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
function setEventsOnMarker(marker) {

  google.maps.event.addListener(marker,'click',function(){
   displayMarkerHook(marker,true,"");
  });
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnCircle(circle) {
  google.maps.event.addListener(circle,'click',function(){
   displayCircleHook(circle,true);
  });
  google.maps.event.addListener(circle,'radius_changed',function(){
   displayCircleHook(circle,true);
  });
  google.maps.event.addListener(circle,'center_changed',function(){
   displayCircleHook(circle,true);
  });    
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnRectangle(rectangle) {
  google.maps.event.addListener(rectangle,'click',function(){
   displayRectangleHook(rectangle,true);
  });
  google.maps.event.addListener(rectangle,'bounds_changed',function(){
   displayRectangleHook(rectangle,true);
  });
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnPolyline(polyline) {
  google.maps.event.addListener(polyline,'click',function(){
   displayPolylineHook(polyline,true);
  });
}
////////////////////////////////////////////////////////////////////////////
function setEventsOnPolygon(polygon) {
  google.maps.event.addListener(polygon,'click',function(){
   displayPolygonHook(polygon,true);
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
    t=setTimeout("updateListTracks()",10000);
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
//             var marker = createMarker(data.track);
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
//    lat = location.lat();
//    lng = location.lng();
//    var locationString = location.toUrlValue();
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
//             updateListTracks();
	    } // end on success
	}); // end of the new Ajax.Request() call
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
          setEventsOnMarker(marker);  	
  	      displayMarkerHook(marker,true," ");
}

//////////////////////////////////////////////////////////////////////
function displayGeocode(){
	var geoTxt = document.getElementById("geopanel").geocodetxt.value;
//    alert("display geocode " + geoTxt);
//    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': geoTxt}, function(results, status) {
       
       if (status == google.maps.GeocoderStatus.OK) {
//       	  alert(results[0].formatted_address);
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
             map: map,
             position: results[0].geometry.location
          });
          setEventsOnMarker(marker);  	
  	      displayMarkerHook(marker,true,results[0].formatted_address);
       } 
       else {
         alert("Geocode was not successful for the following reason: " + status);
       }
    }); 
}
//////////////////////////////////////////////////////////////////////
function displayReverseGeocodeOnHook() {
//var input = document.getElementById("latlng").value;
//var geoTxt = document.getElementById("geopanel").geocodetxt.value;
var latlng = hookedMarker.getPosition();
//var latlngStr = input.split(",",2);
//var lat = parseFloat(latlngStr[0]);
//var lng = parseFloat(latlngStr[1]);
//var latlng = new google.maps.LatLng(lat, lng);
geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
           if (results[1]) {
//map.setZoom(11);
//marker = new google.maps.Marker({
//position: latlng,
//map: map
//});
//infowindow.setContent(results[1].formatted_address);
//infowindow.open(map, marker);
              displayMarkerHook(hookedMarker, true, results[1].formatted_address)
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
//var input = document.getElementById("geocodetxt").value;
//var latlngStr = input.split(",",2);
//var lat = parseFloat(latlngStr[0]);
//var lng = parseFloat(latlngStr[1]);
var lat = parseFloat(document.getElementById("geolat").value);
var lng = parseFloat(document.getElementById("geolng").value);
var latlng = new google.maps.LatLng(lat, lng);
//alert (latlng);
geocoder.geocode({'latLng': latlng}, function(results, status) {

        var marker = new google.maps.Marker({
               position: latlng,
               map: map
//map.setZoom(11);
              });
        map.setCenter(latlng);
        if (status == google.maps.GeocoderStatus.OK) {
           if (results[1]) {
//infowindow.setContent(results[1].formatted_address);
//infowindow.open(map, marker);
              displayMarkerHook(marker, true, results[1].formatted_address)
           } else {
               alert("No results found");
               displayMarkerHook(marker, true, "");
             }
         } else {
             alert("Geocoder status: " + status);
             displayMarkerHook(marker, true, "");
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

  var myOptions = {
      zoom: startZoom,
      scaleControl: true,
      center: new google.maps.LatLng(centerLatitude,centerLongitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
//  var ge = new GoogleEarth(map);
 ////////////////////////////////////////////////////
 ////
    drawingManager.setMap(map);
/////////////////////////////////////////////////////////////
    displayGeoPanel();
//////////////////////////////////////////////////////////////
    listTracks();
    google.maps.event.addListener(map,'click',function(event){
           createTrackInfoWindow(event.latLng);});  
    google.maps.event.addListener(map,'mousemove',function(event){
           displayLatLong(event.latLng);});  
    }
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
       switch(event.type) {
          case google.maps.drawing.OverlayType.CIRCLE :
            setEventsOnCircle(event.overlay);
            displayCircleHook(event.overlay,true);
            break;
          case google.maps.drawing.OverlayType.MARKER :
          	setEventsOnMarker(event.overlay);  	
  	        displayMarkerHook(event.overlay,true,"");
  	        break;
          case google.maps.drawing.OverlayType.RECTANGLE :
          	setEventsOnRectangle(event.overlay);  	
  	        displayRectangleHook(event.overlay,true);
  	        break;
          case google.maps.drawing.OverlayType.POLYLINE :
          	setEventsOnPolyline(event.overlay);  	
  	        displayPolylineHook(event.overlay,true);
  	        break;  	      
          case google.maps.drawing.OverlayType.POLYGON :
          	setEventsOnPolygon(event.overlay);  	
  	        displayPolygonHook(event.overlay,true);
  	        break;  	      
  	      default:
       } //switch
    });
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