// @ts-ignore
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.js";
import Camera from "esri/Camera";
import Point from "esri/geometry/Point";
import SpatialReference from "esri/geometry/SpatialReference";
import EsriMap from "esri/Map";
import * as externalRenderers from "esri/views/3d/externalRenderers";
import SceneView from "esri/views/SceneView";

const map = new EsriMap({
  basemap: "gray",
  ground: "world-elevation",
});

const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: new Camera({
    position: new Point({
      x: 12979966.298703134,
      y: 4884427.262489007,
      z: 2548.834649768658,
      spatialReference: {
        wkid: 102100,
      },
    }),
    heading: 352.94663895458274,
    tilt: 48.19183381946247,
  }),
});

const point = [116.5968704223633, 40.15447407601198, 100.2];

const externalRenderer = {
  renderer: null, // three.js renderer
  camera: null, // three.js camera
  scene: null, // three.js scene
  ambient: null, // three.js ambient light source
  sun: null, // three.js sun light source

  /**
   * Setup function, called once by the ArcGIS JS API.
   */
  setup: function (context: __esri.RenderContext) {
    // initialize the three.js renderer
    //////////////////////////////////////////////////////////////////////////////////////
    this.renderer = new THREE.WebGLRenderer({
      context: context.gl,
      premultipliedAlpha: false,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setViewport(0, 0, view.width, view.height);

    // prevent three.js from clearing the buffers provided by the ArcGIS JS API.
    this.renderer.autoClear = false;

    // The ArcGIS JS API renders to custom offscreen buffers, and not to the default framebuffers.
    // We have to inject this bit of code into the three.js runtime in order for it to bind those
    // buffers instead of the default ones.
    var originalSetRenderTarget = this.renderer.setRenderTarget.bind(
      this.renderer
    );
    this.renderer.setRenderTarget = function (target: any) {
      originalSetRenderTarget(target);
      if (target == null) {
        context.bindRenderTarget();
      }
    };

    // setup the three.js scene
    ///////////////////////////////////////////////////////////////////////////////////////

    this.scene = new THREE.Scene();
    // 添加辅助坐标轴，当只有一个三维模型的时候必须添加
    this.scene.add(new THREE.AxesHelper(9000000));
    // setup the camera
    this.camera = new THREE.PerspectiveCamera();

    // setup scene lighting
    this.ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambient);
    this.sun = new THREE.DirectionalLight(0xffffff, 0.5);
    this.scene.add(this.sun);

    this._createVideoTexture(point);

    // cleanup after ourselves
    context.resetWebGLState();
  },
  _createVideoTexture: function (geo: number[]) {
    // 创建面
    var geometry = new THREE.PlaneGeometry(500, 500); // 矩形平面

    // 创建视频
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.src = './demo/movie.mp4';
    video.play();

    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    var material = new THREE.MeshPhongMaterial({
      map: texture, // 设置纹理贴图
      side: THREE.DoubleSide
    });
    // 创建网格对象
    var meshObj = new THREE.Mesh(geometry, material);
    // 经纬度坐标转换为three.js坐标 start
    var transform = new THREE.Matrix4();
    transform.fromArray(
      externalRenderers.renderCoordinateTransformAt(
        view,
        geo,
        SpatialReference.WGS84,
        new Array(16)
      )
    );

    meshObj.position.x = transform.elements[12];
    meshObj.position.y = transform.elements[13];
    meshObj.position.z = transform.elements[14];
    // 旋转网格对象
    meshObj.rotation.z = -Math.asin(
      Math.cos((geo[1] / 180) * Math.PI) *
      Math.cos((geo[0] / 180) * Math.PI)
    );
    meshObj.rotation.x = Math.atan(
      Math.tan((geo[1] / 180) * Math.PI) /
      Math.sin((geo[0] / 180) * Math.PI)
    );
    this.scene.add(meshObj);
  },

  render: function (context: __esri.RenderContext) {
    // update camera parameters
    ///////////////////////////////////////////////////////////////////////////////////
    var cam = context.camera;

    this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2]);
    this.camera.up.set(cam.up[0], cam.up[1], cam.up[2]);
    this.camera.lookAt(
      new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2])
    );

    // Projection matrix can be copied directly
    this.camera.projectionMatrix.fromArray(cam.projectionMatrix);

    // update lighting
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // view.environment.lighting.date = Date.now();

    var l = context.sunLight;
    this.sun.position.set(l.direction[0], l.direction[1], l.direction[2]);
    this.sun.intensity = l.diffuse.intensity;
    this.sun.color = new THREE.Color(
      l.diffuse.color[0],
      l.diffuse.color[1],
      l.diffuse.color[2]
    );

    this.ambient.intensity = l.ambient.intensity;
    this.ambient.color = new THREE.Color(
      l.ambient.color[0],
      l.ambient.color[1],
      l.ambient.color[2]
    );

    // draw the scene
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    this.renderer.state.reset(); // this.renderer.resetGLState();
    this.renderer.render(this.scene, this.camera);

    // as we want to smoothly animate the ISS movement, immediately request a re-render
    externalRenderers.requestRender(view);

    // cleanup
    context.resetWebGLState();
  },
} as __esri.ExternalRenderer;

// register the external renderer
externalRenderers.add(view, externalRenderer);