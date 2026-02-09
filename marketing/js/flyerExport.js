// /marketing/js/flyerExport.js
// Exports a flyer template (HTML) to a print-ready PNG.
// Default: US Letter Portrait @ 300 DPI = 2550x3300

export const PRINT = {
  width: 2550,
  height: 3300,
  dpi: 300
};

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-src="${src}"]`);
    if (existing) return resolve();

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });
}

function waitForIframeReady(iframe, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("Flyer render timeout")), timeoutMs);

    function done() {
      clearTimeout(t);
      resolve();
    }

    iframe.addEventListener("load", async () => {
      try {
        const win = iframe.contentWindow;
        if (!win) return done();

        if (win.__flyerReady && typeof win.__flyerReady.then === "function") {
          await win.__flyerReady;
        } else {
          await new Promise(r => setTimeout(r, 300));
        }
        done();
      } catch (e) {
        done();
      }
    });
  });
}

function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = dataUrl;
  a.click();
}

export async function exportFlyerPng({
  templatePath,
  qrLink,
  filename = "movethatcouch-flyer.png",
  onStatus = () => {},
  // ✅ NEW (optional): override export dimensions per flyer
  print = null
}) {
  onStatus("Preparing flyer…");

  const P = print && Number.isFinite(print.width) && Number.isFinite(print.height)
    ? { width: Math.round(print.width), height: Math.round(print.height) }
    : PRINT;

  // 1) Ensure html2canvas is loaded (in parent page)
  await loadScriptOnce("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js");

  // 2) Build iframe
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "0";
  iframe.style.width = `${P.width}px`;
  iframe.style.height = `${P.height}px`;
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  iframe.setAttribute("aria-hidden", "true");

  const url = new URL(templatePath, window.location.origin);
  url.searchParams.set("qr", qrLink);

  // Cache-bust to avoid stale GitHub Pages caching while iterating
  url.searchParams.set("v", Date.now().toString());

  iframe.src = url.toString();
  document.body.appendChild(iframe);

  try {
    await waitForIframeReady(iframe);
    onStatus("Rendering image…");

    const doc = iframe.contentDocument;
    if (!doc) throw new Error("Unable to access flyer document");

    const flyerEl = doc.getElementById("flyer");
    if (!flyerEl) throw new Error("Flyer root #flyer not found");

    // 3) Render to canvas at 1:1 pixels (we sized the iframe to P.width x P.height)
    const canvas = await window.html2canvas(flyerEl, {
      backgroundColor: "#ffffff",
      scale: 1,
      width: P.width,
      height: P.height,
      useCORS: true,
      allowTaint: true,
      logging: false
    });

    const dataUrl = canvas.toDataURL("image/png");
    downloadDataUrl(dataUrl, filename);
    onStatus("Download started ✅");
  } finally {
    iframe.remove();
  }
}
