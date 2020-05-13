import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import MapImageLayer from "esri/layers/MapImageLayer";
import GroupLayer from "esri/layers/GroupLayer";
import LayerList from "esri/widgets/LayerList";
import ListItem from "esri/widgets/LayerList/ListItem"

const USALayer = new MapImageLayer({
  url:
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  title: "US Sample Data",
});

// Create layer showing sample census data of the United States.
// Set visibility to false so it's not visible on startup.

const censusLayer = new MapImageLayer({
  url:
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
  title: "US Sample Census",
  visible: false,
});

// Create GroupLayer with the two MapImageLayers created above
// as children layers.

const demographicGroupLayer = new GroupLayer({
  title: "US Demographics",
  visible: true,
  visibilityMode: "exclusive",
  layers: [USALayer, censusLayer],
  opacity: 0.75,
});

const map = new EsriMap({
  basemap: "dark-gray",
  layers: [demographicGroupLayer],
});

const view = new MapView({
  center: [-98.5795, 39.8282],
  zoom: 5,
  container: "viewDiv",
  map: map,
});
function defineActions(event: any) {
  const item = event.item as ListItem;

  if (item.title === "US Demographics") {
    // item.actionsSections = [
    //   [
    //     {
    //       title: "Go to full extent",
    //       className: "esri-icon-zoom-out-fixed",
    //       id: "full-extent",
    //     },
    //     {
    //       title: "Layer information",
    //       className: "esri-icon-description",
    //       id: "information",
    //     },
    //   ],
    //   [
    //     {
    //       title: "Increase opacity",
    //       className: "esri-icon-up",
    //       id: "increase-opacity",
    //     },
    //     {
    //       title: "Decrease opacity",
    //       className: "esri-icon-down",
    //       id: "decrease-opacity",
    //     },
    //   ],
    // ];
  }
}

view.when(function () {
  const layerList = new LayerList({
    view: view,
    listItemCreatedFunction: defineActions,
  });

  layerList.on("trigger-action", function (event) {
    const visibleLayer = USALayer.visible ? USALayer : censusLayer;

    const id = event.action.id;

    if (id === "full-extent") {
      view.goTo(visibleLayer.fullExtent);
    } else if (id === "information") {
      window.open(visibleLayer.url);
    } else if (id === "increase-opacity") {
      if (demographicGroupLayer.opacity < 1) {
        demographicGroupLayer.opacity += 0.25;
      }
    } else if (id === "decrease-opacity") {
      if (demographicGroupLayer.opacity > 0) {
        demographicGroupLayer.opacity -= 0.25;
      }
    }
  });

  view.ui.add(layerList, "top-right");
});
view.ui.remove("attribution");
