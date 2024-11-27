import * as Cesium from 'cesium'
import CesiumNavigation from "cesium-navigation-es6";

const options = <any>{
    // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和Cesium.Rectangle.
    defaultResetView: Cesium.Cartographic.fromDegrees(110, 30, 2000000),
    // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
    enableCompass: true,
    // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
    enableZoomControls: true,
    // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
    enableDistanceLegend: true,
    // 于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效
    enableCompassOuterRing: true
};
let viewer:any;
const initCesium = (cesiumId: string) => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZDY5NDdkZS04NjU5LTQxOGUtYWY2Zi1iNWJlNTJkMTVkNzAiLCJpZCI6MjU2OTQ1LCJpYXQiOjE3MzIxNzIwMTd9.iR1mPpRFfRAGGJWtmSM7LA4ctCfBfPyfvmnp3rt29oY';
    viewer = new Cesium.Viewer(cesiumId, {
        selectionIndicator: false, //是否启用地图选择
        geocoder: false,   //搜索按钮，地名查找
        navigationHelpButton: false,  //帮助按钮
        baseLayerPicker: false,   //底图选择按钮
        homeButton: false,   //主页按钮
        sceneModePicker: true, //二三维切换按钮（场景选择）
        infoBox: false,           //是否显示弹窗
        // 禁用OIT机制设置透明度
        orderIndependentTranslucency:false, //去掉大气层黑圈
        contextOptions: {
            webgl:{
                alpha:true,
            }
        },
        //默认展示天地图
        
    })
    
    // viewer.scene.skyBox.show = false; //隐藏天空盒
    // viewer.scene.backgroundColor = new Cesium.Color(0,0,0,0); //设置背景透明
    new CesiumNavigation(viewer, options);
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-71.408858,41.811009, 10000.0)
    })
    //fly to providence,  RI
    //灰色三维球
    // viewer.imageryLayers.removeAll(true); //删除所有底图 
    // viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#7f7f7f");
    return viewer;
}
export{
    viewer,
    initCesium
}