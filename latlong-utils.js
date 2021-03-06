/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	This is a Google Maps V3 port of Chris Veness awesome LatLong library
	the original script can be found here www.movable-type.co.uk/scripts/latlong.html
*/


GoogleMapsV3_LatLon_Utils = (function () {

	// radius of earth if different value is required from standard 6,371km
	var radius = 6371;

	function toRad(value) {
	    return value * Math.PI / 180;
	}

	function toDeg(value) {
		return value * 180 / Math.PI;
	}


	/**
	 * Returns the distance between two points, in km
	 * (using Haversine formula)
	 *
	 * from: Haversine formula - R. W. Sinnott, "Virtues of the Haversine",
	 *       Sky and Telescope, vol 68, no 2, 1984
	 *
	 */
	function calcDistance(point1, point2, precision) {

	  var lat1 = toRad(point1.lat()),
		  lng1 = toRad(point1.lng());

	  var lat2 = toRad(point2.lat()),
		  lng2 = toRad(point2.lng());

	  var dLat = lat2 - lat1,
		  dLng = lng2 - lng1;

	  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	          Math.cos(lat1) * Math.cos(lat2) *
	          Math.sin(dLng/2) * Math.sin(dLng/2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	  var d = radius * c;
	  return d;
	}


	/**
	 * Returns the (initial) bearing between two points, in degrees
	 *   see http://williams.best.vwh.net/avform.htm#Crs
	 *
	 */
	function calcBearingTo(point1, point2) {

	  var lat1 = toRad(point1.lat()),
	  	  lat2 = toRad(point2.lat()),
		  dLng = toRad(point2.lng()-point1.lng());

	  var y = Math.sin(dLng) * Math.cos(lat2),
	  		  x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLng),
	  		  brng = Math.atan2(y, x);

	  return (toDeg(brng) + 360) % 360;
	}


	return {
		calcDistance: calcDistance,
		calcBearingTo: calcBearingTo
	};
}());