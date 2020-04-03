import WebTileLayer from "esri/layers/WebTileLayer";
import TileInfo from "esri/layers/support/TileInfo";
import SpatialReference from "esri/geometry/SpatialReference";

const tileInfoWebMercator = new TileInfo({
  dpi: 90.71428571427429,
  lods: [{
    level: 0,
    scale: 591657527.591555,
    resolution: 156543.033928
  },
  {
    level: 1,
    scale: 295828763.795777,
    resolution: 78271.5169639999
  },
  {
    level: 2,
    scale: 147914381.897889,
    resolution: 39135.7584820001
  },
  {
    level: 3,
    scale: 73957190.948944,
    resolution: 19567.8792409999
  },
  {
    level: 4,
    scale: 36978595.474472,
    resolution: 9783.93962049996
  },
  {
    level: 5,
    scale: 18489297.737236,
    resolution: 4891.96981024998
  },
  {
    level: 6,
    scale: 9244648.868618,
    resolution: 2445.98490512499
  },
  {
    level: 7,
    scale: 4622324.434309,
    resolution: 1222.99245256249
  },
  {
    level: 8,
    scale: 2311162.217155,
    resolution: 611.49622628138
  },
  {
    level: 9,
    scale: 1155581.108577,
    resolution: 305.748113140558
  },
  {
    level: 10,
    scale: 577790.554289,
    resolution: 152.874056570411
  },
  {
    level: 11,
    scale: 288895.277144,
    resolution: 76.4370282850732
  },
  {
    level: 12,
    scale: 144447.638572,
    resolution: 38.2185141425366
  },
  {
    level: 13,
    scale: 72223.819286,
    resolution: 19.1092570712683
  },
  {
    level: 14,
    scale: 36111.909643,
    resolution: 9.55462853563415
  },
  {
    level: 15,
    scale: 18055.954822,
    resolution: 4.77731426794937
  },
  {
    level: 16,
    scale: 9027.977411,
    resolution: 2.38865713397468
  },
  {
    level: 17,
    scale: 4513.988705,
    resolution: 1.19432856685505
  },
  {
    level: 18,
    scale: 2256.994353,
    resolution: 0.597164283559817
  },
  {
    level: 19,
    scale: 1128.497176,
    resolution: 0.298582141647617
  }],
  size: [256, 256],
  origin: {
    x: -20037508.342787,
    y: 20037508.342787
  },
  spatialReference: SpatialReference.WebMercator
});
const tileInfoWGS84 = new TileInfo({
  dpi: 90.71428571427429,
  lods: [
    {
      level: 0,
      levelValue: "1",
      scale: 295828763.79585470937713011037,
      resolution: 0.703125
    },
    {
      level: 1,
      levelValue: "2",
      scale: 147914381.89792735468856505518,
      resolution: 0.3515625
    },
    {
      level: 2,
      levelValue: "3",
      scale: 73957190.948963677344282527592,
      resolution: 0.17578125
    },
    {
      level: 3,
      levelValue: "4",
      scale: 36978595.474481838672141263796,
      resolution: 0.087890625
    },
    {
      level: 4,
      levelValue: "5",
      scale: 18489297.737240919336070631898,
      resolution: 0.0439453125
    },
    {
      level: 5,
      levelValue: "6",
      scale: 9244648.868620459668035315949,
      resolution: 0.02197265625
    },
    {
      level: 6,
      levelValue: "7",
      scale: 4622324.4343102298340176579745,
      resolution: 0.010986328125
    },
    {
      level: 7,
      levelValue: "8",
      scale: 2311162.2171551149170088289872,
      resolution: 0.0054931640625
    },
    {
      level: 8,
      levelValue: "9",
      scale: 1155581.1085775574585044144937,
      resolution: 0.00274658203125
    },
    {
      level: 9,
      levelValue: "10",
      scale: 577790.55428877872925220724681,
      resolution: 0.001373291015625
    },
    {
      level: 10,
      levelValue: "11",
      scale: 288895.2771443893646261036234,
      resolution: 0.0006866455078125
    },
    {
      level: 11,
      levelValue: "12",
      scale: 144447.63857219468231305181171,
      resolution: 0.00034332275390625
    },
    {
      level: 12,
      levelValue: "13",
      scale: 72223.819286097341156525905853,
      resolution: 0.000171661376953125
    },
    {
      level: 13,
      levelValue: "14",
      scale: 36111.909643048670578262952926,
      resolution: 0.0000858306884765625
    },
    {
      level: 14,
      levelValue: "15",
      scale: 18055.954821524335289131476463,
      resolution: 0.00004291534423828125
    },
    {
      level: 15,
      levelValue: "16",
      scale: 9027.977410762167644565738231,
      resolution: 0.000021457672119140625
    },
    {
      level: 16,
      levelValue: "17",
      scale: 4513.9887053810838222828691158,
      resolution: 0.0000107288360595703125
    },
    {
      level: 17,
      levelValue: "18",
      scale: 2256.9943526905419111414345579,
      resolution: 0.00000536441802978515625
    },
    {
      level: 18,
      levelValue: "19",
      scale: 1128.4971763452709555707172788,
      resolution: 0.000002682209014892578125
    }
  ],
  size: [256, 256],
  origin: {
    x: -180,
    y: 90
  },
  spatialReference: SpatialReference.WGS84
});
export default class TianDiTuLayer extends WebTileLayer {
  constructor(props: WebTileLayer) {
    super(props);
    this.tileInfo = this.generateTileInfo(props.urlTemplate);
    this.urlTemplate = this.generateUrlTemplate(props.urlTemplate);
    this.subDomains = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
  }
  
  private generateUrlTemplate(urlTemplate: string): string {
    const [layer, tileMatrixSet] = urlTemplate.split('/')[3].split('_');
    return `http://{subDomain}.tianditu.com/${layer}_${tileMatrixSet}/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=${layer}&STYLE=default&FORMAT=tiles&TILEMATRIXSET=${tileMatrixSet}&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ac0daf56728bbb77d9514ba3df69bcd3`;
  }

  private generateTileInfo(urlTemplate: string): TileInfo {
    const [layer, tileMatrixSet] = urlTemplate.split('/')[3].split('_');
    return tileMatrixSet === 'c' ? tileInfoWGS84 : tileInfoWebMercator;
  }
}
