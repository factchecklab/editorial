<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true
    },
    scaleXAxes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.3
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: this.scaleXAxes,
          yAxes: [
            {
              display: false
            }
          ]
        },
        layout: {
          padding: {
            left: 16,
            right: 16
          }
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
