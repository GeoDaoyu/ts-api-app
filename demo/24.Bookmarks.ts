import MapView from "esri/views/MapView";
import Expand from "esri/widgets/Expand";
import WebMap from "esri/WebMap";
import Bookmarks from "esri/widgets/Bookmarks";
import domConstruct from "dojo/dom-construct";
import on from "dojo/on";
import dom from "dojo/dom";
import Viewpoint from "esri/Viewpoint";

const webmap = new WebMap({
  portalItem: {
    id: "aa1d3f80270146208328cf66d022e09c"
  }
});

const view = new MapView({
  container: "viewDiv",
  map: webmap
});

const bookmarks = new Bookmarks({
  view: view,
  editingEnabled: true
});

const bkExpand = new Expand({
  view: view,
  content: bookmarks,
  expanded: true
});

view.ui.add(bkExpand, "top-right");

const html = `
  <div id="bar" class="esri-widget">
    <button
      id="save"
    >
      保存书签
    </button>
    <button
      id="goto"
    >
      查看书签
    </button>
  </div>`;
domConstruct.place(html, view.container, "last");
view.ui.add("bar", "bottom-left");

const viewpoints: Array<Viewpoint> = [];
on(dom.byId("save"), "click", () => {
  viewpoints.push(view.viewpoint);
});
let i = 0;
on(dom.byId("goto"), "click", () => {
  const len = viewpoints.length;
  view.goTo(viewpoints[++i % len]);
});
