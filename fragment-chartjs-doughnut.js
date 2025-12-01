// fragment-chartjs-doughnut.js
(function () {
  // Load Chart.js dynamically (UMD)
  function loadChartJs() {
    return new Promise((resolve, reject) => {
      if (window.Chart) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Chart.js"));
      document.head.appendChild(script);
    });
  }

  // Global namespace
  window.DonutChartJsFragment = window.DonutChartJsFragment || {};

  /**
   * mount(container, props)
   * props.chartOptions
   */
  window.DonutChartJsFragment.mount = async function (container, props = {}) {
    if (!container) return;

    await loadChartJs();

    // Cleanup
    container.innerHTML = "";

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // --- Default chartOptions ---
    const defaultChartOptions = {
      type: "doughnut",
      data: {
        labels: ["In Progress", "Pending Review", "Approved", "Declined"],
        datasets: [
          {
            data: [35, 25, 30, 10],
            backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    };

    // Merge default + overrides from props.chartOptions
    const finalOptions = Object.assign(
      {},
      defaultChartOptions,
      props.chartOptions || {}
    );

    // Create chart instance
    const chart = new window.Chart(ctx, finalOptions);

    // Cleanup function
    return () => {
      chart.destroy();
      container.innerHTML = "";
    };
  };
})();
