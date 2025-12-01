// fragment-apexcharts.js
(function () {
  // Dynamically load ApexCharts (UMD)
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

  // Global namespace for the widget
  window.ApexChartsFragment = window.ApexChartsFragment || {};

  /**
   * mount(container, props)
   * Mounts an ApexCharts chart inside a container.
   * Returns a cleanup function.
   */
  window.ApexChartsFragment.mount = async function (container, props = {}) {
    if (!container) return;

    // Load ApexCharts if not loaded yet
    await loadApexCharts();

    // Cleanup container
    container.innerHTML = "";

    // Prepare default options (props override these)
    const defaultOptions = {
      chart: {
        type: props.chartType || "line",
        height: "100%",
        width: "100%",
      },
      series: [
        {
          name: props.seriesName || "Series 1",
          data: props.data || [10, 20, 15, 30, 25, 40],
        },
      ],
      xaxis: {
        categories:
          props.categories || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      title: {
        text: props.title || "ApexCharts Widget (External Fragment)",
        align: "left",
      },
      stroke: {
        curve: props.curve || "smooth",
      },
      colors: props.colors || ["#1E90FF"],
    };

    // Create chart instance
    const chart = new window.ApexCharts(
      container,
      props.options ? props.options : defaultOptions
    );

    // Render the chart
    await chart.render();

    // Cleanup (called by ScriptMountLoader on unmount)
    return () => {
      chart.destroy();
      container.innerHTML = "";
    };
  };
})();
