jQuery(function($) {
	
	function removeAllMarkers(map)
	{
		while(map.markers.length)
		{
			map.removeMarker( map.markers[0] );
		}
	}
	
	function fetchMarkersWithinStoreLocatorRadius(map)
	{
		var params = map.storeLocator.getFilteringParameters();
		var filter = $.extend({
			map_id: map.id
		}, params);
		filter.center = filter.center.toLatLngLiteral();
		
		map.showPreloader(true);
		map.settings.store_locator_hide_before_search = false;
		
		WPGMZA.restAPI.call("/markers/", {
			
			useCompressedPathVariable: true,
			
			data: {
				filter: JSON.stringify(filter)
			},
			
			success: function(data, status, xhr) {
				
				for(var i = 0; i < data.length; i++)
				{
					var marker = WPGMZA.Marker.createInstance(data[i]);
					map.addMarker(marker);
				}
				
				map.storeLocator.onFilteringComplete({
					filteringParams: filter
				});
				
				map.showPreloader(false);
				
			}
			
		});
	}
	
	// Prevent marker listing - the marker listing tries to read gallery data from markers on the map. Until a solution is established we prevent the marker listing initialising
	WPGMZA.ProMap.prototype.initMarkerListing = function() {}
	
	// Override this function to not call the marker filter to update
	WPGMZA.StoreLocator.prototype.onGeocodeComplete = function(event)
	{
		if(!event.results || !event.results.length)
		{
			this._center = null;
			this._bounds = null;

			return;
		}
		else
		{
			this._center = new WPGMZA.LatLng( event.results[0].latLng );
			this._bounds = new WPGMZA.LatLngBounds( event.results[0].bounds );
		}
		
		var map = event.target;
		
		removeAllMarkers(map);
		fetchMarkersWithinStoreLocatorRadius(map);
	}
	
	// Override this function to immediately call onMarkersFetched, allowing the map to fully initialise (enable store locator, etc.)
	WPGMZA.ProMap.prototype.fetchMarkers = function()
	{
		this.onMarkersFetched([]);	
	}
	
});