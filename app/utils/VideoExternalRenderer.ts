// @ts-ignore
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.min.js";
import SpatialReference from "esri/geometry/SpatialReference";
import * as helpers from "./helpers";
import * as externalRenderers from "esri/views/3d/externalRenderers";

interface VideoExternalRendererProps {
  location: __esri.Point;
  videoSrc: string;
  view: __esri.SceneView;
  observer: __esri.Point;
}

export default class VideoExternalRenderer {
  renderer: any; // three.js renderer
  camera: any; // three.js camera
  scene: any; // three.js scene
  ambient: any; // three.js ambient light source
  sun: any; // three.js sun light source

  location: __esri.Point;
  videoSrc: string;
  view: __esri.SceneView;
  observer: __esri.Point;

  constructor(props: VideoExternalRendererProps) {
    this.location = props.location;
    this.observer = props.observer;
    this.videoSrc = props.videoSrc;
    this.view = props.view;
  }
  public setup(context: __esri.RenderContext) {
    // initialize the three.js renderer
    //////////////////////////////////////////////////////////////////////////////////////
    this.renderer = new THREE.WebGLRenderer({
      context: context.gl,
      premultipliedAlpha: false,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setViewport(0, 0, this.view.width, this.view.height);

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

    this._createVideoTexture(this.location, this.observer);

    // cleanup after ourselves
    context.resetWebGLState();
  }

  public render(context: __esri.RenderContext) {
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
    externalRenderers.requestRender(this.view);

    // cleanup
    context.resetWebGLState();
  }

  private _createVideoTexture(location: __esri.Point, observer: __esri.Point) {
    const geographicCoordinates = [
      location.longitude,
      location.latitude,
      location.z,
    ];
    // 创建面
    var geometry = new THREE.PlaneGeometry(10, 10); // 矩形平面,范围跟摄像头焦距相关

    // 创建视频
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.src = this.videoSrc;
    video.play();

    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    var material = new THREE.MeshPhongMaterial({
      map: texture, // 设置纹理贴图
      side: THREE.DoubleSide,
    });
    // 创建网格对象
    var meshObj = new THREE.Mesh(geometry, material);
    // 经纬度坐标转换为three.js坐标 start
    var transform = new THREE.Matrix4();
    transform.fromArray(
      externalRenderers.renderCoordinateTransformAt(
        this.view,
        geographicCoordinates,
        SpatialReference.WGS84,
        new Array(16)
      )
    );
    transform.decompose(meshObj.position, meshObj.quaternion, meshObj.scale);

    const horizontalAngle = helpers.bearing(observer, geographicCoordinates);
    meshObj.rotateOnAxis(new THREE.Vector3(0, 0, 1), -horizontalAngle); // 逆时针

    this.scene.add(meshObj);
  }
}
