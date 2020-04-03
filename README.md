# ts-api-app

参照[AcrGIS官网示例](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/ )搭建的typescript开发环境，用以写一些简单入门的WebGIS demo。

## 环境准备

+ 安装typescript ``` npm install -g typescript```

## 目录结构

```
ts-api-app
├── app (当前装载的demo)
│   └──  main.ts
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

~~~ shell
cd ts-api-app
tsc -w
~~~

## 检索

列表提供检索功能，可检索感兴趣的关键字，也可通过bilibili BV号观看对应视频。

| FileName                  | Keyword                                                      | BV           |
| ------------------------- | ------------------------------------------------------------ | ------------ |
| 01.HelloWorld             | Map,MapView                                                  | BV1JE411g7Wm |
| 02.Basemap-baseLayers     | Basemap,TileLayer                                            | BV147411f7rs |
| 03.Basemap-tianditu-4326  | SpatialReference,WebTileLayer,<br />TileInfo,天地图          | BV1y7411R7cS |
| 04.Basemap-tianditu-3857  | SpatialReference,WebTileLayer,<br />TileInfo,天地图          | BV1y7411R7cS |
| 05.BasemapToggle          | BasemapToggle                                                | BV1dg4y1b7Xg |
| 06.BasemapToggleViewModel | BasemapToggleViewModel                                       | BV1eZ4y1j7Se |
| 07.BasemapGallery         | Basemap,BasemapGallery,<br />BasemapGalleryViewModel,<br />LocalBasemapsSource | BV1r5411471d |
|                           |                                                              |              |

## 后续计划

+ 封装天地图图层
+ Swipe
