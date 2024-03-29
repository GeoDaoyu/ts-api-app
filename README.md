# ts-api-app

参照[AcrGIS官网示例](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/ )搭建的typescript开发环境，用以写一些简单入门的WebGIS demo。

## 环境准备

+ 安装typescript ``` npm install -g typescript```

## 目录结构

```
ts-api-app
├── app
│   ├──  utils (工具类)
│   │    ├──  TianDiTuLayer.ts
│   │    └──  ...
│   └──  main.ts (当前装载的demo)
├── demo (demo列表)
│   ├──  01.HellowWorld.ts
│   └──  ...
├── node_modules (依赖)
├── .gitattributes (git配置)
├── .gitignore (git忽略配置)
├── index.html (入口文件)
├── LICENSE (许可)
├── package.json (包管理)
└── tsconfig (ts配置)
```

## 安装

~~~ shell
git clone https://github.com/GeoDaoyu/ts-api-app.git
cd ts-api-app
npm install
~~~

## 运行启动

部署到Web服务器下，并替换`index.html`中的api路径。

~~~ shell
cd ts-api-app
tsc -w
~~~

## 检索

列表提供检索功能，可检索感兴趣的关键字，也可通过bilibili BV号观看对应视频。

| FileName                  | Keyword                                                      | BV                                                          |
| ------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| 01.HelloWorld             | Map,MapView                                                  | [BV1JE411g7Wm](https://www.bilibili.com/video/BV1JE411g7Wm) |
| 02.Basemap-baseLayers     | Basemap,TileLayer                                            | [BV147411f7rs](https://www.bilibili.com/video/BV147411f7rs) |
| 03.Basemap-tianditu-4326  | SpatialReference,WebTileLayer,<br />TileInfo,天地图          | [BV1y7411R7cS](https://www.bilibili.com/video/BV1y7411R7cS) |
| 04.Basemap-tianditu-3857  | SpatialReference,WebTileLayer,<br />TileInfo,天地图          | [BV1y7411R7cS](https://www.bilibili.com/video/BV1y7411R7cS) |
| 05.BasemapToggle          | BasemapToggle                                                | [BV1dg4y1b7Xg](https://www.bilibili.com/video/BV1dg4y1b7Xg) |
| 06.BasemapToggleViewModel | BasemapToggleViewModel                                       | [BV1eZ4y1j7Se](https://www.bilibili.com/video/BV1eZ4y1j7Se) |
| 07.BasemapGallery         | Basemap,BasemapGallery,<br />BasemapGalleryViewModel,<br />LocalBasemapsSource | [BV1r5411471d](https://www.bilibili.com/video/BV1r5411471d) |
| 08.TianDiTuLayer          | WebTileLayer,天地图                                          | [BV1st4y1U7VB](https://www.bilibili.com/video/BV1st4y1U7VB) |
| 09.BasemapLayerList       | BasemapLayerList,GroupLayer                                  | [BV1LT4y1G7x9](https://www.bilibili.com/video/BV1LT4y1G7x9) |
| 10.LayerList              | LayerList,MapImageLayer,GroupLayer                           | [BV1Dt4y117KS](https://www.bilibili.com/video/BV1Dt4y117KS) |
| 11.FeatureLayer           | FeatureLayer                                                 | [BV1dK4y1475e](https://www.bilibili.com/video/BV1dK4y1475e) |
| 12.Graphic                | Graphic,Point,Polyline,Polygon                               | [BV14Z4y1p76Y](https://www.bilibili.com/video/BV14Z4y1p76Y) |
| 13.RailwayLine            | Graphic,Polyline,SimpleLineSymbol                            | [BV1mz411v7Kj](https://www.bilibili.com/video/BV1mz411v7Kj) |
| 14.VectorTileLayer        | VectorTileLayer                                              | [BV1Za4y1e7zr](https://www.bilibili.com/video/BV1Za4y1e7zr) |
| 15.Draw-Polyline          | Draw,DrawAction                                              | [BV15p4y1D7UG](https://www.bilibili.com/video/BV15p4y1D7UG) |
| 16.Measure-Polyline       | Draw,DrawAction,geometryEngine                               | [BV1hT4y1g7ze](https://www.bilibili.com/video/BV1hT4y1g7ze) |
| 17.Sketch                 | Sketch,GraphicsLayer                                         | [BV1Zz411i7fn](https://www.bilibili.com/video/BV1Zz411i7fn) |
| 18.Measurement2D          | DistanceMeasurement2D,<br />AreaMeasurement2D                | [BV1Zz411i7fn](https://www.bilibili.com/video/BV1Zz411i7fn) |
| 19.CoordinateConversion   | CoordinateConversion,<br />MapViewPointerMoveEvent           | [BV19Z4y1M73T](https://www.bilibili.com/video/BV19Z4y1M73T) |
| 20.PopupTemplate          | PopupTemplate,ActionButton                                   | [BV1eK4y1s7Me](https://www.bilibili.com/video/BV1eK4y1s7Me) |
| 21.LaberClass             | LabelClass                                                   | [BV1bt4y1Q7Rd](https://www.bilibili.com/video/BV1bt4y1Q7Rd) |
| 22.ScaleBar               | ScaleBar,ScaleRangeSlider,<br />minScale,maxScale            | [BV17a4y1a7Xr](https://www.bilibili.com/video/BV17a4y1a7Xr) |
| 23.Swipe                  | Swipe,Expand,destroy                                         | [BV1ri4y1u7wj](https://www.bilibili.com/video/BV1ri4y1u7wj) |
| 24.Bookmarks              | Bookmarks,Viewpoint,WebMap                                   | [BV1Nv411i7oH](https://www.bilibili.com/video/BV1Nv411i7oH) |
| 25.reorder                | reorder,LayerList                                            | [BV1y54y1i7Tv](https://www.bilibili.com/video/BV1y54y1i7Tv) |
| 26.Daylight               | Daylight,Camera,Date                                         | [BV1aa4y177rt](https://www.bilibili.com/video/BV1aa4y177rt) |
| 27.PopupWithEcharts       | PopupTemplate,echarts                                        | [BV1vf4y1Q7NC](https://www.bilibili.com/video/BV1vf4y1Q7NC) |
| 28.goTo                   | goTo,Promise                                                 | [BV1b54y127wX](https://www.bilibili.com/video/BV1b54y127wX) |
| 29.queryFeatureWithSketch | Sketch,FeatureLayer,queryFeatures<br />highlight,Query,spatialRelationship | [BV1jK4y1a7P8](https://www.bilibili.com/video/BV1jK4y1a7P8) |
| 30.queryFeatureBySQL      | FeatureLayer,Query                                           | [BV1kD4y1o7Yz](https://www.bilibili.com/video/BV1kD4y1o7Yz) |
| 31.Legend                 | Legend                                                       | [BV1Qz4y1C7ma](https://www.bilibili.com/video/BV1Qz4y1C7ma) |
| 32.UniqueValueRenderer    | UniqueValueRenderer,Legend                                   | [BV1my4y1B7Dm](https://www.bilibili.com/video/BV1my4y1B7Dm) |
| 33.searchWithCustomsource | esriRequest,Search,SearchSource                              | [BV1N54y1k7N7](https://www.bilibili.com/video/BV1N54y1k7N7) |
| 34.VideoFusion            | externalRenderers,THREE,video                                | [BV1RV411h7Tv](https://www.bilibili.com/video/BV1RV411h7Tv) |
| 35.hitTest                | hitTest                                                      | [BV1TT4y1T71J](https://www.bilibili.com/video/BV1TT4y1T71J) |
|                           |                                                              |                                                             |

## 后续计划

- 根据工作情况更新
- 微件为主

