<template>
  <div class="chart">
    <canvas ref="purchase-chart" width="100" height="50"></canvas>
    <div ref="chartjsLegend" class="chartjsLegend"></div>
  </div>
</template>

<script>
import Chartjs from "chart.js";
import { chartPurchaseByColor } from "@/api";

export default {
  async mounted() {
    let canvas = this.$refs["purchase-chart"].getContext("2d");

    let response = await chartPurchaseByColor();
    let labels = [];
    let blue = {
      label: "Blå",
      borderColor: "#57d2fb",
      backgroundColor: "#d4f2fe",
      borderWidth: 2,
      data: []
    };
    let yellow = {
      label: "Gul",
      borderColor: "#ffde5d",
      backgroundColor: "#fff6d6",
      borderWidth: 2,
      data: []
    };
    let red = {
      label: "Rød",
      borderColor: "#ef5878",
      backgroundColor: "#fbd7de",
      borderWidth: 2,
      data: []
    };
    let green = {
      label: "Grønn",
      borderColor: "#10e783",
      backgroundColor: "#c8f9df",
      borderWidth: 2,
      data: []
    };

    if (response.length == 1) {
      labels.push("");
      blue.data.push(0);
      yellow.data.push(0);
      red.data.push(0);
      green.data.push(0);
    }

    let highestNumber = 0;

    for (let i = 0; i < response.length; i++) {
      let thisDate = response[i];
      let dateObject = new Date(thisDate.date);
      labels.push(this.getPrettierDateString(dateObject));

      blue.data.push(thisDate.blue);
      yellow.data.push(thisDate.yellow);
      red.data.push(thisDate.red);
      green.data.push(thisDate.green);

      if (thisDate.blue > highestNumber) {
        highestNumber = thisDate.blue;
      }
      if (thisDate.yellow > highestNumber) {
        highestNumber = thisDate.yellow;
      }
      if (thisDate.green > highestNumber) {
        highestNumber = thisDate.green;
      }
      if (thisDate.red > highestNumber) {
        highestNumber = thisDate.red;
      }
    }
    let datasets = [blue, yellow, green, red];
    let chartdata = {
      labels: labels,
      datasets: datasets
    };
    let chart = new Chart(canvas, {
      type: "line",
      data: chartdata,
      options: {
        maintainAspectRatio: false,
        animation: {
          duration: 0 // general animation time
        },
        title: {
          display: true,
          text: "Antall kjøpt",
          fontSize: 20
        },
        legend: {
          display: true,
          boxWidth: 3,
          usePointStyle: true,
          borderRadius: 10,
          labels: {
            padding: 12,
            boxWidth: 20,
            usePointStyle: true
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: highestNumber + 5
              }
            }
          ]
        }
      }
    });
  },
  methods: {
    getPrettierDateString(date) {
      return `${this.pad(date.getDate())}.${this.pad(
        date.getMonth() + 1
      )}.${this.pad(date.getYear() - 100)}`;
    },
    pad(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/media-queries.scss";

.chart {
  height: 40vh;
  max-height: 500px;

  @include mobile {
    position: relative;
    width: 90vw !important;
    max-height: unset;
    height: 30vh;
    margin-bottom: 2rem;
  }
}
</style>
