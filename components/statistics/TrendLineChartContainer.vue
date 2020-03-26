<template>
  <div>
    <!--
      An addition line defining :style is used when the charts are in an inactive tab
      (display:none). In such case, the height would be zero and the canvas would be rendered with
      a height being zero, i.e., invisible. Defining :style would fix the height issue arised.
      :height attribute is meanwhile still required as it defines the max height of the chart.
    -->
    <line-chart
      v-if="!loading"
      :chart-data="chartData"
      :height="height"
      :style="`height: ${height}px`"
      :scale-x-axes="scaleXAxes"
    />
    <v-skeleton-loader v-else :height="height" type="image" />
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue'
import { timeframes, defaultTimeframe } from '@/utils/social-weather'

export default {
  components: {
    LineChart
  },
  props: {
    x: {
      type: Array[String],
      required: true
    },
    y: {
      type: Array[Array[Number]],
      required: true
    },
    color: {
      type: Array[String],
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    height: {
      type: Number,
      default: 300
    },
    label: {
      type: Array[String],
      required: true
    },
    timeframe: {
      type: String,
      default: defaultTimeframe
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.x,
        datasets: this.y.map((yValues, i) => {
          return {
            label: this.label[i],
            data: yValues,
            borderColor: this.color[i],
            backgroundColor: 'rgba(255, 255, 255, 0)',
            pointBackgroundColor: this.color[i],
            borderWidth: 3
          }
        })
      }
    },
    scaleXAxes() {
      return [
        {
          type: 'time',
          time: timeframes[this.timeframe],
          gridLines: {
            display: false
          }
        }
      ]
    }
  }
}
</script>
