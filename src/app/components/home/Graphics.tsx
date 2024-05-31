import React, { useRef, useEffect } from "react";
import ApexCharts from "apexcharts";
const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [1.1, 2, 5, 1.3, 3.1, 5.5, 8.8], 
};
const getChartOptions = (data: any) => {
  const labelColor = "#9aa0ac";
  const borderColor = "#e0e6ed";
  const baseColor = "#000";
  const lightColor = "transparent";

  return {
    series: [
      {
        name: "",
        data: data.values.map((item: any) => item) || [],
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "transparent",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      
      categories: data?.labels.map((item: any) => item) || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "11px",      
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "9px",
     
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      max: 10,
      min: 0,
      labels: {
        formatter: function (val: any) {
          if (val === 0) {
            return 0;
          } else if (val === 2.5) {
            return 1 + "GB";
          } else if (val === 5) {
            return 3 + "GB";
          } else if (val === 7.5) {
            return 5 + "GB";
          } else if (val === 10) {
            return 10 + "GB";
          }
        },
        
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,

        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      theme: "dark",
      marker: {
        show: false,
      },
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val: any, index: any) {
          return `${chartData.labels[index.dataPointIndex]}: ${Number(val).toFixed(1)} GB`;
        },
      },
      x: {
        show: false,
      },


    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 0,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 0,
      },
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
};

const Graphics: React.FC = () => {
  const chartRef = useRef(null);
  const refreshMode = () => {
    if (!chartRef.current) {
      return;
    }
    const chart = new ApexCharts(chartRef.current, getChartOptions(chartData));
    if (chart) {
      chart.render();
    }
    return chart;
  };
  useEffect(() => {
    const chart = refreshMode();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef]);

  return <div ref={chartRef} style={{ height: "350px", width: "100%" }}></div>;
};

export default Graphics;
