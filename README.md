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

## 后续计划

+ 底图切换
+ 鹰眼图
