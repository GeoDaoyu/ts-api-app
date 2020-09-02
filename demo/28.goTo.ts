import EsriMap from "esri/Map";
import SceneView from "esri/views/SceneView";

import domConstruct from "dojo/dom-construct";
import on from "dojo/on";

const map = new EsriMap({
  basemap: "streets",
  ground: "world-elevation"
});

const view = new SceneView({
  container: "viewDiv",
  map,
  zoom: 8,
  center: [104.07, 30.67]
});

// [104.07, 30.67] chengdu
// [116.40, 39.90] beijing
// [121.47, 31.23] shanghai

const html = `
  <div style="position: absolute; left: 50px; bottom: 50px">
    <button id="then">then</button>
    <button id="await">await</button>
  </div>`
domConstruct.place(html, view.container, "last");

const options: __esri.GoToOptions3D = {
  speedFactor: 0.5,
  easing: "linear"
};

const btnOfThen = document.getElementById("then");
on(btnOfThen, "click", () => {
  view.goTo([116.40, 39.90], options).then(() => {
    view.goTo([121.47, 31.23], options).then(() => {
      view.goTo([104.07, 30.67], options);
    });
  });
});

const btnOfAwait = document.getElementById("await");
// @ts-ignore
on(btnOfAwait, "click", async () => {
  await view.goTo([116.40, 39.90], options);
  await view.goTo([121.47, 31.23], options);
  await view.goTo([104.07, 30.67], options);
});
