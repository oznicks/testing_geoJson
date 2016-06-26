function createMap()
{
	var mymap = L.map('mapid').setView([-27.466,153.022],12);
	
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'oznicks.0d67bcf4',
		accessToken: 'pk.eyJ1Ijoib3puaWNrcyIsImEiOiJjaXB0bXNiaXQwNXFtZnZtMnJubm9ubHFwIn0.k7hok4Iole-L7tlkMIKi2Q'
	}).addTo(mymap);

	var trafficIncidentData = new XMLHttpRequest();
	trafficIncidentData.onreadystatechange = function()
	{
		if(trafficIncidentData.readyState == 4 && trafficIncidentData.status == 200)
		{
			var myArr = trafficIncidentData.response;
			console.log(JSON.parse(trafficIncidentData.response));
			var geojsonMarkerOptions = 
			{
				radius: 8,
				fillColor: "red",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
			};
			var geoJsonLayer = L.geoJson(JSON.parse(trafficIncidentData.response),{
			pointToLayer:(feature,latlng) => L.circleMarker(latlng,geojsonMarkerOptions)
			}).addTo(mymap);
		}
	};
	trafficIncidentData.open("GET","http://131940.qld.gov.au/api/json/v1/events/incident?state=qld",true);
	trafficIncidentData.send();
}
