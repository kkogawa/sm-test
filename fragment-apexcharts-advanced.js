// fragment-apexcharts-advanced.js
(function () {
  // Dynamically load ApexCharts UMD bundle
  function loadApexCharts() {
    return new Promise((resolve, reject) => {
      if (window.ApexCharts) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/apexcharts@3.48.0/dist/apexcharts.min.js";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load ApexCharts library"));
      document.head.appendChild(script);
    });
  }

  // Global namespace
  window.ApexChartsFragment2 = window.ApexChartsFragment2 || {};

  /**
   * mount(container, props)
   * props.chartOptions
   */
  window.ApexChartsFragment2.mount = async function (container, props = {}) {
    if (!container) return;

    // Load ApexCharts if needed
    await loadApexCharts();

    // Cleanup before rendering
    container.innerHTML = "";

    // --- Default complex chartOptions based on your original code ---
    const defaultChartOptions = {
      chart: {
        type: "area",
        toolbar: { show: false },
        fontFamily: "system-ui, -apple-system, sans-serif",
        height: "100%",
        width: "100%",
      },
      series: [
        { name: "Sales", data: [31, 40, 28, 51, 42, 65, 72] },
        { name: "Leads", data: [11, 32, 45, 32, 34, 52, 41] },
      ],
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ["#3b82f6", "#10b981"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
        },
      },
      stroke: { curve: "smooth", width: 2 },
      dataLabels: { enabled: false },
      legend: { position: "top", horizontalAlign: "right" },
      grid: { borderColor: "#f3f4f6", strokeDashArray: 4 },
      title: {
        text: props.title || "ApexCharts External Fragment",
        align: "left",
      },
    };

    // Merge props.chartOptions over defaults
    const finalOptions = Object.assign({}, defaultChartOptions, props.chartOptions || {});

    // Create chart
    const chart = new window.ApexCharts(container, finalOptions);
    await chart.render();

    const handleResize = () => chart.updateOptions({}, false, false);
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.destroy();
      container.innerHTML = "";
    };
  };
})();
