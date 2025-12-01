// fragment.js

(function () {
  // Create global namespace like: window.TestWidget
  window.TestWidget = window.TestWidget || {};

  // Main mount function
  window.TestWidget.mount = function (container, props) {
    if (!container) return;

    // If container already has content, clear it
    container.innerHTML = "";

    const now = new Date().toLocaleString();

    // Create widget DOM
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
      background: #eef;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #99a;
      font-family: Arial, sans-serif;
    `;

    wrapper.innerHTML = `
      <h3 style="margin-top:0;">External Script-Mount Fragment</h3>
      <p>This fragment is dynamically rendered using the Script + Mount pattern.</p>

      <h4>Props received:</h4>
      <pre style="
        background:#fff;
        padding:10px;
        border-radius:6px;
        border:1px solid #ccc;
        overflow:auto;
        white-space: pre-wrap;
      ">${JSON.stringify(props, null, 2)}</pre>

      <p style="font-size:12px;color:#666;">
        Rendered at: ${now}
      </p>
    `;

    container.appendChild(wrapper);

    // Provide cleanup function back to the loader
    return function unmount() {
      if (container.contains(wrapper)) {
        container.removeChild(wrapper);
      }
    };
  };
})();
