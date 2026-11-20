/* ============================================================
   fx.js：滑鼠互動特效（圓點風格）
   1. 背景圓點：游標靠近時，附近的圓點變大、發亮、被推開
   2. 漣漪與點擊衝擊波：滑鼠移進按鈕／卡片、或點擊時，一圈圓點向外擴散
   3. 解碼文字：滑鼠移到導覽列、標題、數字上，字會像解碼一樣閃動後定格
   4. 首頁圓點變形：圓點組成一把槍，按「換一把」時整群圓點飛過去重組
   全部都是用 canvas 畫出來的，不讀取圖片，所以雙擊 index.html 預覽也能運作。
   系統設定「減少動態」時，會自動關閉動畫。
   ============================================================ */
(function () {
  "use strict";

  const reduced = function () { return document.documentElement.dataset.motion === "off"; };
  const SIGNAL = "#D9C45A", PAPER = "#EDF0EE";

  function cssColor(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function rgba(hex, a) {
    const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
    if (!m) return "rgba(23,48,63," + a + ")";
    return "rgba(" + parseInt(m[1], 16) + "," + parseInt(m[2], 16) + "," + parseInt(m[3], 16) + "," + a + ")";
  }
  function makeCanvas(cls, z) {
    const cv = document.createElement("canvas");
    cv.className = cls;
    cv.setAttribute("aria-hidden", "true");
    return cv;
  }
  function fitCanvas(cv, w, h) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }
  const inGame = function (t) { return !!(t && t.closest && t.closest(".range-field")); };

  /* ---------- 2. 首頁圓點變形 ---------- */
  (function heroMorph() {
    const wrap = document.getElementById("hero-art");
    const cv = document.getElementById("hero-dots");
    if (!wrap || !cv || typeof DOTDATA === "undefined") return;
    const label = document.getElementById("hero-art-label");
    const next = document.getElementById("hero-next");
    const noMotion = reduced();
    const ids = Object.keys(DOTDATA).filter(function (id) { return findGun(id); });
    if (!ids.length) return;

    let ctx = null, W = 0, H = 0;
    let dots = [], cur = null, last = null;
    let mx = -9999, my = -9999, raf = 0, visible = true, startT = 0;
    const cache = {};

    // 把某把槍的格子資料轉成圓點清單，依「由左到右、由上到下」排序，變形時才會有順暢的流動感
    function cells(id) {
      if (cache[id]) return cache[id];
      const d = DOTDATA[id], out = [];
      for (let c = 0; c < d.c; c++) {
        for (let r = 0; r < d.r; r++) {
          const v = d.d.charCodeAt(r * d.c + c) - 48;
          if (v > 0) out.push({ c: c + 0.5, r: r + 0.5, v: v });
        }
      }
      return (cache[id] = { cols: d.c, rows: d.r, pts: out });
    }
    function layout(g) {
      const pad = 22;
      const cell = Math.min((W - pad * 2) / g.cols, (H - pad * 2) / g.rows);
      return { cell: cell, ox: (W - g.cols * cell) / 2, oy: (H - g.rows * cell) / 2 };
    }
    function pick(not) {
      let id;
      do { id = ids[Math.floor(Math.random() * ids.length)]; } while (id === not && ids.length > 1);
      return id;
    }

    function setLabel(id) {
      const gun = findGun(id), no = guns.indexOf(gun) + 1;
      label.replaceChildren();
      const tag = document.createElement("b"); tag.textContent = "FILE " + String(no).padStart(2, "0") + " / " + guns.length;
      const a = document.createElement("a"); a.href = "#/gun/" + id; a.textContent = gun.name + "　" + gun.country + "・" + gun.year;
      label.appendChild(tag); label.appendChild(a);
      cv.setAttribute("aria-label", gun.name + " 的圓點圖。點一下換下一把槍。");
    }

    function go(id, from) {
      const g = cells(id), L = layout(g), M = Math.max(dots.length, g.pts.length);
      const old = dots, fresh = [], seen = {};
      for (let i = 0; i < M; i++) {
        const src = old.length ? old[Math.floor(i * old.length / M)] : null;
        const ti = Math.floor(i * g.pts.length / M);
        const first = !seen[ti]; seen[ti] = true;   // 多個圓點對到同一個位置時，只留一個，其餘縮小消失
        const p = g.pts[ti];
        const tx = L.ox + p.c * L.cell, ty = L.oy + p.r * L.cell;
        const d = {
          x: src ? src.x : (noMotion ? tx : Math.random() * W),
          y: src ? src.y : (noMotion ? ty : Math.random() * H),
          vx: src ? src.vx : 0, vy: src ? src.vy : 0,
          r: src ? src.r : 0,
          tx: tx, ty: ty, tr: first ? (0.14 + 0.4 * p.v / 9) * L.cell * 0.95 : 0,
          delay: (tx / W) * 320 + Math.random() * 140
        };
        if (noMotion) { d.x = tx; d.y = ty; d.r = d.tr; }
        fresh.push(d);
      }
      dots = fresh; cur = id; last = g;
      startT = performance.now();
      setLabel(id);
      wake();
    }
    // 視窗大小改變：同一把槍重新排版，圓點直接移到新位置
    function relayout() {
      if (!cur) return;
      const g = last, L = layout(g), M = dots.length;
      dots.forEach(function (d, i) {
        const ti = Math.floor(i * g.pts.length / M), p = g.pts[ti];
        d.tx = L.ox + p.c * L.cell; d.ty = L.oy + p.r * L.cell;
        d.tr = d.tr > 0 ? (0.14 + 0.4 * p.v / 9) * L.cell * 0.95 : 0;
        if (noMotion) { d.x = d.tx; d.y = d.ty; d.r = d.tr; }
      });
      wake();
    }

    function step(now) {
      const el = now - startT, R = 90;
      let moving = false;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (el >= d.delay) {
          d.vx = (d.vx + (d.tx - d.x) * 0.05) * 0.84;
          d.vy = (d.vy + (d.ty - d.y) * 0.05) * 0.84;
          d.r += (d.tr - d.r) * 0.14;
        }
        const dx = d.x - mx, dy = d.y - my, d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const dist = Math.sqrt(d2) || 1, f = Math.pow(1 - dist / R, 2) * 3.2;
          d.vx += dx / dist * f; d.vy += dy / dist * f;
        }
        d.x += d.vx; d.y += d.vy;
        if (Math.abs(d.vx) + Math.abs(d.vy) > 0.03 || Math.abs(d.tr - d.r) > 0.03 || el < d.delay) moving = true;
      }
      draw();
      raf = (moving || (mx > -9000 && visible)) && visible ? requestAnimationFrame(step) : 0;
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = PAPER;
      ctx.beginPath();
      const hot = [];
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (d.r < 0.25) continue;
        const dx = d.x - mx, dy = d.y - my;
        if (dx * dx + dy * dy < 130 * 130) { hot.push(d); continue; }
        ctx.moveTo(d.x + d.r, d.y); ctx.arc(d.x, d.y, d.r, 0, 6.2832);
      }
      ctx.fill();
      if (hot.length) {
        ctx.fillStyle = SIGNAL; ctx.beginPath();
        hot.forEach(function (d) { ctx.moveTo(d.x + d.r, d.y); ctx.arc(d.x, d.y, d.r, 0, 6.2832); });
        ctx.fill();
      }
    }
    function wake() {
      if (noMotion) { draw(); return; }
      startT = startT || performance.now();
      if (!raf && visible) raf = requestAnimationFrame(step);
    }

    function resize() {
      const rect = cv.getBoundingClientRect();
      if (!rect.width) return;
      W = rect.width; H = rect.height;
      ctx = fitCanvas(cv, W, H);
      if (!cur) go(pick(null), null); else relayout();
      draw();
    }

    cv.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; wake();
    });
    cv.addEventListener("pointerleave", function () { mx = my = -9999; wake(); });
    cv.addEventListener("pointerdown", function (e) {
      const r = cv.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
      // 衝擊波：點到的位置附近的圓點被炸開，再一起飛向下一把槍
      dots.forEach(function (d) {
        const dx = d.x - px, dy = d.y - py, dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = Math.max(0, 1 - dist / 240) * 16;
        d.vx += dx / dist * f; d.vy += dy / dist * f;
      });
      go(pick(cur), { x: px, y: py });
    });
    next.addEventListener("click", function () { go(pick(cur), null); });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (ents) {
        visible = ents[0].isIntersecting;
        if (visible) wake();
      }).observe(cv);
    }
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(cv);
    else window.addEventListener("resize", resize);
    resize();
  })();
})();
