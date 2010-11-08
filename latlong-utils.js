
GoogleMapsV3_LatLon_Utils = (function () {

	// radius of earth if different value is required from standard 6,371km
	var radius = 6371;

	function toRad(value) {
	    return value * Math.PI / 180;
	}

	/**
	 * Returns the distance from this point to the supplied point, in km
	 * (using Haversine formula)
	 *
	 * from: Haversine formula - R. W. Sinnott, "Virtues of the Haversine",
	 *       Sky and Telescope, vol 68, no 2, 1984
	 *
	 * @param   {LatLon} point: Latitude/longitude of destination point
	 * @param   {Number} [precision=4]: no of significant digits to use for returned value
	 * @returns {Number} Distance in km between this point and destination point
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

	return {
		calcDistance: calcDistance
	}
}());