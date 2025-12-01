window.mountSmTest = (el, props) => {
  const now = new Date().toLocaleString();

  el.innerHTML = `
    <div style="
      background:#eef;
      padding:15px;
      border-radius:8px;
      font-family:Arial, sans-serif;
      border: 1px solid #88a;
    ">
      <h3 style="margin-top:0;">External Fragment Loaded</h3>
      <p>This UI is rendered from an external JavaScript fragment (MFE test).</p>

      <h4>Props received:</h4>
      <pre style="
        background:#fff;
        padding:10px;
        border-radius:6px;
        border:1px solid #ccc;
        overflow:auto;
      ">${JSON.stringify(props, null, 2)}</pre>

      <p style="font-size:12px;color:#666;">
        Rendered at: ${now}
      </p>
    </div>
  `;
};