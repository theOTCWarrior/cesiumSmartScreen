<template>
    <div ref="chartDom" style="width: 800px; height: 400px;"></div>
</template>


<script lang="ts" setup>
import * as echarts from "echarts";

import { ref, onMounted, onUnmounted } from "vue";
type EChartsOption = echarts.EChartsOption;

// DOM 引用
const chartDom = ref<HTMLDivElement | null>(null);

// 图表实例
var myChart: echarts.ECharts | null = null;

// 数据
const names = [
    "Orange",
    "Tomato",
    "Apple",
    "Sakana",
    "Banana",
    "Iwashi",
    "Snappy Fish",
    "Lemon",
    "Pasta",
] as const;

const years = ["2001", "2002", "2003", "2004", "2005", "2006"];

const shuffle = <T>(array: T[]): T[] => {
    let currentIndex = array.length;
    let randomIndex = 0;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
};

const generateRankingData = (): Map<string, number[]> => {
    const map: Map<string, number[]> = new Map();
    const defaultRanking: number[] = Array.from(
        { length: names.length },
        (_, i) => i + 1
    );

    for (const _ of years) {
        const shuffleArray = shuffle(defaultRanking);
        names.forEach((name, i) => {
            map.set(name, (map.get(name) || []).concat(shuffleArray[i]));
        });
    }
    return map;
};

const generateSeriesList = (): echarts.SeriesOption[] => {
    const seriesList: echarts.SeriesOption[] = [];
    const rankingMap = generateRankingData();

    rankingMap.forEach((data, name) => {
        const series: echarts.SeriesOption = {
            name,
            symbolSize: 20,
            type: "line",
            smooth: true,
            emphasis: {
                focus: "series",
            },
            endLabel: {
                show: true,
                formatter: "{a}",
                distance: 20,
                color: 'rgb(255,255,255)',
                textBorderColor: 'rgb(255,255,255)',
            },
            lineStyle: {
                width: 4,
            },
            data,
        };
        seriesList.push(series);
    });
    return seriesList;
};

onMounted(() => {
    if (!chartDom.value) return;

    // 初始化图表
    myChart = echarts.init(chartDom.value);
    console.log("seccess init");
    const option: EChartsOption = {
        title: {
            text: "Providence Crime Statistic",
            textStyle: {
                color: 'rgb(255,255,255)',
            }
        },
        tooltip: {
            trigger: "item",
        },
        grid: {
            left: 30,
            right: 110,
            bottom: 30,
            containLabel: true,
        },
        xAxis: {
            type: "category",
            splitLine: {
                show: true,
            },
            axisLabel: {
                margin: 30,
                fontSize: 16,
                color: 'rgb(255,255,255)'
            },
            boundaryGap: false,
            data: years,
        },
        yAxis: {
            type: "value",
            axisLabel: {
                margin: 30,
                fontSize: 16,
                formatter: "#{value}",
                color: 'rgb(255,255,255)',
            },
            inverse: true,
            interval: 1,
            min: 1,
            max: names.length,

        },
        series: generateSeriesList(),
    };

    myChart.setOption(option);

    // 监听窗口大小变化
    window.addEventListener("resize", () => {
        //myChart?.resize();
    });
});




onUnmounted(() => {
    // 销毁图表实例
    if (myChart) {
        myChart.dispose();
        myChart = null;
    }
});

</script>
