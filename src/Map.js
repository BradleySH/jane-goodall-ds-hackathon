import React, { useRef, useEffect } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
//import esriConfig from "@arcgis/core/config";

import "./app.scss"; 

function DataMap() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      //esriConfig.apiKey = "AAPK560aca4b3ebb4ecb91b509b7869b30c2sEqoxgjUNqKblO52_XY5yZh2ar1WDooMgg-HMhtzeHo-9yKZaJ4eabnNe0Bs7_x7";

    const layer = new VectorTileLayer({
      url: "https://vectortileservices7.arcgis.com/3bqugizTugjwpQW2/arcgis/rest/services/species_data/VectorTileServer/resources/styles/root.json"
    });

    const map = new WebMap({
      basemap: "arcgis-dark-gray",
      layers: [layer]
    });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [21.758663, -4.038333],
        zoom: 4.5, // scale: 72223.819286

      });
      
      

      const bookmarks = new Bookmarks({
        view,
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true
      });

      const bkExpand = new Expand({
        view,
        content: bookmarks,
        expanded: true
      });

      // Add the widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-right");

      // bonus - how many bookmarks in the webmap?
      map.when(() => {
        if (map.bookmarks && map.bookmarks.length) {
          console.log("Bookmarks: ", map.bookmarks.length);
        } else {
          console.log("No bookmarks in this webmap.");
        }
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default DataMap;