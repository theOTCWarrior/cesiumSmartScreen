<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <div>

        <div id="cesiumContainer" class="cesiumContainer"></div>
        <div ref="chartDomP" class="chartContainer">
            <BumpView ref="bumpview" id="left-up-bump" class="left-up-bump" />
            <HeatView class="left-down-heat" />
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { initCesium } from '../components/BaseCesium';
import * as Cesium from 'cesium'
import BumpView from './chartView/BumpView.vue';
import HeatView from './chartView/HeatView.vue';
let viewer: Cesium.Viewer

const chartDomP = ref<HTMLDivElement | null>(null);
export default defineComponent({
    components: {
        BumpView,
        HeatView,
    },
    setup() {
        onMounted(() => {

            viewer = initCesium("cesiumContainer");
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(-71.408858, 41.811009),
                label: {
                    text: "Providence",
                },
            });
        });

    },
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
<style lang="scss" scoped>
.cesiumContainer {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    /* 确保 Cesium 全屏显示 */
    z-index: 0;
    /* 层级控制 */
}


.left-up-bump {
    position: absolute;
    top: 0px;
    left: 0px;

    z-index: 10;
    /* 图表在 Cesium 之上 */
    background-color: oklch(50% 0.2 220deg /0.8)
        /* 半透明背景 */
        //border-radius: 8px;
        //padding: 10px;
}

.left-down-heat {
    position: absolute;
    top: 400px;
    left: 0px;

    z-index: 10;
    /* 图表在 Cesium 之上 */
    background-color: oklch(50% 0.2 220deg /0.8)
        /* 半透明背景 */
        //border-radius: 8px;
        //padding: 10px;
}

.chartContainer {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 30%;
    height: 100%;
}
</style>
