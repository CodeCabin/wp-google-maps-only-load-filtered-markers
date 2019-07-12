# WP Google Maps - Only Load Filtered Markers

## Description

Prevents the map from loading any markers outside the searched radius. Please note this plugin is not compatible with the marker listing feature. Requires WP Google Maps 8.0.0 and Pro 8.0.0 or above.

## Implementation

This plugin overrides three functions in order to achieve this behaviour:

- `WPGMZA.ProMap.prototype.initMarkerListing` - The marker listing uses data from the markers themselves. Since this data is not available, because no markers are initially loaded, this feature is disabled pending a future solution.
- `WPGMZA.StoreLocator.prototype.onGeocodeComplete` - This function fires when the store locator has found it's center lat/lng based on the address field. We override this to implement our custom behaviour, remove all markers, then only fetch the markers within the radius about the found center.

In normal operation,

- All markers are initially loaded
- The marker filter contacts the REST API for marker ID's that match the filtering criteria
- All markers are iterated over and hidden/shown based on whether they are present in the returned list of ID's

When running this plugin, that behaviour is overridden

- No markers are initially loaded
- The marker filter is not used. When a search is performed, our override contacts the REST API for *all marker data* for markers that match the filtering criteria
- We then create markers with the returned data and add them to the map