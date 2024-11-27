<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <div id="cesiumContainer" class="cesiumContainer"></div>

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { initCesium } from '../components/BaseCesium';
import * as Cesium from 'cesium'
let viewer: Cesium.Viewer

export default defineComponent({
    components: {

    },
    setup() {
        onMounted(async () => {
            viewer = initCesium("cesiumContainer");
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(-71.408858,41.811009),
                label: {
                    text: "Philadelphia",
                },
            });
        })
    }

})
</script>

<style lang="scss" scoped>
.cesiumContainer {
    width: 100%;
    height: 100vh;
    // 自定义背景图--样式start
    // background-image: url(../assets/back.jpg);
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    // 自定义背景图--样式end
}
</style>
<style>
/* 去除版权信息 */
.cesium-viewer-bottom {
    display: none;
}

.cesium-viewer-animationContainer {
    display: none;
}

.cesium-viewer-timelineContainer {
    display: none;
}
</style>