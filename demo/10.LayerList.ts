import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import MapImageLayer from "esri/layers/MapImageLayer";
import GroupLayer from "esri/layers/GroupLayer";
import LayerList from "esri/widgets/LayerList";
import ListItem from "esri/widgets/LayerList/ListItem";
import ActionToggle from "esri/support/actions/ActionToggle";
import Collection from "esri/core/Collection";

const USALayer = new MapImageLayer({
  url:
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
  title: "US Sample Data",
});

const censusLayer = new MapImageLayer({
  url:
    "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
  title: "US Sample Census",
  visible: false,
});

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
    item.actionsSections = new Collection<Collection<ActionToggle>>([
      new Collection<ActionToggle>([
        {
          title: "Go to full extent",
          className: "esri-icon-zoom-out-fixed",
          id: "full-extent",
        } as ActionToggle,
        {
          title: "Layer information",
          className: "esri-icon-description",
          id: "information",
        } as ActionToggle,
      ]),
      new Collection<ActionToggle>([
        {
          title: "Increase opacity",
          className: "esri-icon-up",
          id: "increase-opacity",
        } as ActionToggle,
        {
          title: "Decrease opacity",
          className: "esri-icon-down",
          id: "decrease-opacity",
        } as ActionToggle,
      ]),
    ]);
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
