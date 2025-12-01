
(function () {
  class ConstructorWidget {
    constructor(container, options = {}) {
      this.container = container;
      this.options = options;

      this.render();
    }

    render() {
      const now = new Date().toLocaleString();

      this.container.innerHTML = `
        <div style="
          background:#e9f7ff;
          padding:16px;
          border-radius:8px;
          border:1px solid #7ab0d6;
          font-family:Arial, sans-serif;
        ">
          <h3 style="margin-top:0;">Constructor-Based Widget</h3>
          <p>This widget is created via <code>new ConstructorWidget(el, props)</code>.</p>

          <h4>Options received:</h4>
          <pre style="
            background:white;
            padding:10px;
            border-radius:6px;
            border:1px solid #ccc;
            overflow:auto;
            white-space: pre-wrap;
          ">${JSON.stringify(this.options, null, 2)}</pre>

          <p style="font-size:12px;color:#666;">
            Rendered at: ${now}
          </p>
        </div>
      `;
    }

    destroy() {
      // Cleanup logic
      if (this.container) {
        this.container.innerHTML = "";
      }
    }
  }

  // Register global constructor (important!)
  window.TestConstructorWidget = ConstructorWidget;
})();
