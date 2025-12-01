// fragment-chartjs.js
(function () {
  // Utility: dynamically load Chart.js UMD build
  function loadChartJs() {
    return new Promise((resolve, reject) => {
      if (window.Chart) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Chart.js"));
      document.head.appendChild(script);
    });
  }

  // Create global namespace
  window.ChartJsFragment = window.ChartJsFragment || {};

  /**
   * External mount API
   * @param {HTMLElement} container - container DOM from ScriptMountLoader
   * @param {Object} props - passed from ScriptMountLoader (user, accessToken, chartOptions, etc)
   * @returns cleanup function
   */
  window.ChartJsFragment.mount = async function (container, props = {}) {
    if (!container) return;

    // Load Chart.js if needed
    await loadChartJs();

    // Cleanup container first
    container.innerHTML = "";

    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Default dataset (props can override this)
    const defaultData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: props.datasetLabel || "Weekly Data",
          data: props.data || [12, 19, 3, 5, 2, 3, 7],
          borderColor: props.borderColor || "rgb(75, 192, 192)",
          backgroundColor: props.backgroundColor || "rgba(75, 192, 192, 0.3)",
          tension: 0.3,
        },
      ],
    };

    // Default options (props can override)
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: props.title || "Chart.js Widget (External Fragment)",
        },
        legend: {
          labels: {
            color: props.legendColor || "#333",
          },
        },
      },
      scales: {
        x: {
          ticks: { color: props.tickColor || "#555" },
        },
        y: {
          ticks: { color: props.tickColor || "#555" },
        },
      },
    };

    // Chart.js instance
    const chart = new window.Chart(ctx, {
      type: props.chartType || "line",
      data: props.dataConfig || defaultData,
      options: props.options || defaultOptions,
    });

    // Return cleanup function
    return () => {
      chart.destroy();
      container.innerHTML = "";
    };
  };
})();
