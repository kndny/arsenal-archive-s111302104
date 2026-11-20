/* ============================================================
   feel.js：手感（滑鼠與聲音）
   （準星游標在 main.js，已經存在）
   音效：很輕的「滴」聲，預設關閉，右上角可以開關（用瀏覽器內建的 Web Audio 合成，不需要音檔）
   1. 卡片傾斜：滑鼠在圖鑑卡片上移動時，卡片微微傾斜，並有一小塊黃色光斑
   3. 卡片圓點：滑鼠經過卡片照片時，圓點會被游標推開，離開後彈回原位；點一下會整片炸開
   系統設定「減少動態」或觸控裝置時，1 和 3 不啟用。
   ============================================================ */
(function () {
  "use strict";
  const reduced = function () { return document.documentElement.dataset.motion === "off"; };
  const root = document.documentElement;

  // 開場讀取畫面：點一下或按任意鍵就跳過
  const boot = document.getElementById("boot");
  if (boot) {
    const skip = function () { boot.style.display = "none"; };
    boot.addEventListener("pointerdown", skip);
    document.addEventListener("keydown", skip, { once: true });
  }

  const fine = function () { return window.matchMedia("(pointer: fine)").matches; };

  /* ---------- 1. 卡片傾斜 ---------- */
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse" || reduced() || !e.target.closest) return;
    const card = e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--ry", ((x - 0.5) * 10).toFixed(2) + "deg");
    card.style.setProperty("--rx", ((0.5 - y) * 10).toFixed(2) + "deg");
    card.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
    card.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
  });
  document.addEventListener("pointerout", function (e) {
    if (!e.target.closest) return;
    const card = e.target.closest(".card");
    if (!card || (e.relatedTarget && card.contains(e.relatedTarget))) return;
    card.style.removeProperty("--rx"); card.style.removeProperty("--ry");
  });

  /* ---------- 動態效果開關 ----------
     預設照系統的「減少動態」設定；按下去就改用自己的選擇，存在這台電腦的瀏覽器裡。
     很多特效是在頁面載入時建立的，所以切換後直接重新整理頁面，讓設定一次全部生效。 */
  (function motionToggle() {
    const tools = document.getElementById("theme-toggle");
    if (!tools) return;
    const on = document.documentElement.dataset.motion !== "off";
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "theme-toggle motion-toggle"; btn.id = "motion-toggle";
    // 「開／關」放在 span 裡：手機上空間不夠時只顯示「動態」，用按鈕底色表示開或關
    btn.append("動態");
    const st = document.createElement("span"); st.className = "tg-state"; st.textContent = on ? " 開" : " 關";
    btn.appendChild(st);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.title = "切換動畫與特效（預設跟著電腦的「減少動態」設定）";
    btn.addEventListener("click", function () {
      try { localStorage.setItem("arsenal-motion", on ? "off" : "on"); } catch (e) {}
      location.reload();
    });
    tools.parentNode.insertBefore(btn, tools);
  })();

  /* ---------- 2. 音效 ---------- */
  (function sound() {
    const KEY = "arsenal-sound";
    let on = false, ctx = null;
    try { on = localStorage.getItem(KEY) === "1"; } catch (e) {}
    const tools = document.getElementById("theme-toggle");
    if (!tools || !(window.AudioContext || window.webkitAudioContext)) return;
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "theme-toggle sound-toggle"; btn.id = "sound-toggle";
    function label() {
      btn.replaceChildren("音效");
      const st = document.createElement("span"); st.className = "tg-state"; st.textContent = on ? " 開" : " 關";
      btn.appendChild(st);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
    label();
    tools.parentNode.insertBefore(btn, tools);
    function audio() {
      if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; ctx = new AC(); }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }
    // 一個短短的方波「滴」：freq 起始頻率、to 結束頻率、len 長度（秒）
    function blip(freq, to, len, vol) {
      if (!on) return;
      try {
        const a = audio(), t = a.currentTime;
        const o = a.createOscillator(), g = a.createGain();
        o.type = "square";
        o.frequency.setValueAtTime(freq, t);
        o.frequency.exponentialRampToValueAtTime(to, t + len);
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + len);
        o.connect(g); g.connect(a.destination);
        o.start(t); o.stop(t + len + 0.02);
      } catch (e) {}
    }
    btn.addEventListener("click", function () {
      on = !on;
      try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
      label();
      if (on) blip(660, 990, 0.09, 0.05);
    });
    document.addEventListener("pointerdown", function (e) {
      if (!on || e.target === btn || !e.target.closest) return;
      if (e.target.closest("a, button, .card, .map-chip, [role=button]")) blip(1200, 700, 0.05, 0.035);
    });
    window.addEventListener("hashchange", function () { blip(420, 840, 0.12, 0.03); });
  })();

  /* ---------- 3. 卡片圓點：會被游標推開的圓點 ---------- */
  (function cardDots() {
    if (typeof DOTDATA === "undefined") return;
    document.addEventListener("pointerover", function (e) {
      if (e.pointerType !== "mouse" || reduced() || !fine() || !e.target.closest) return;
      const dm = e.target.closest(".card .dm");
      if (!dm || dm.classList.contains("fx-live")) return;
      const card = dm.closest(".card");
      const id = card && (card.getAttribute("href") || "").split("/").pop();
      if (id && DOTDATA[id]) start(dm, DOTDATA[id]);
    });

    function start(dm, data) {
      const W = dm.clientWidth, H = dm.clientHeight;
      if (!W || !H) return;
      const cv = document.createElement("canvas");
      cv.className = "dot-live"; cv.setAttribute("aria-hidden", "true");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      dm.appendChild(cv); dm.classList.add("fx-live");

      // 和圖片一樣留 6% 邊距，等比例放進框內
      const pad = Math.min(W, H) * 0.06;
      const cell = Math.min((W - pad * 2) / data.c, (H - pad * 2) / data.r);
      const ox = (W - data.c * cell) / 2, oy = (H - data.r * cell) / 2;
      const dots = [];
      for (let r = 0; r < data.r; r++) for (let c = 0; c < data.c; c++) {
        const v = data.d.charCodeAt(r * data.c + c) - 48;
        if (v > 0) {
          const hx = ox + (c + 0.5) * cell, hy = oy + (r + 0.5) * cell;
          dots.push({ hx: hx, hy: hy, x: hx, y: hy, vx: 0, vy: 0, r: cell * (0.2 + 0.033 * v) });
        }
      }
      const R = Math.max(54, W * 0.17);
      let mx = -9999, my = -9999, inside = true, raf = 0;

      function onMove(e) { const b = dm.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top; inside = true; wake(); }
      function onLeave() { mx = my = -9999; inside = false; wake(); }
      function onDown(e) {
        const b = dm.getBoundingClientRect(), px = e.clientX - b.left, py = e.clientY - b.top, RR = W * 0.45;
        dots.forEach(function (d) {
          const dx = d.x - px, dy = d.y - py, dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const f = Math.max(0, 1 - dist / RR) * 14;
          d.vx += dx / dist * f; d.vy += dy / dist * f;
        });
        wake();
      }
      dm.addEventListener("pointermove", onMove);
      dm.addEventListener("pointerleave", onLeave);
      dm.addEventListener("pointerdown", onDown);

      function wake() { if (!raf) raf = requestAnimationFrame(step); }
      function step() {
        raf = 0;
        if (!cv.isConnected) return;
        let energy = 0;
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          const dx = d.x - mx, dy = d.y - my, d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const dist = Math.sqrt(d2) || 1, f = Math.pow(1 - dist / R, 2) * 2.4;
            d.vx += dx / dist * f; d.vy += dy / dist * f;
          }
          d.vx = (d.vx + (d.hx - d.x) * 0.07) * 0.82;
          d.vy = (d.vy + (d.hy - d.y) * 0.07) * 0.82;
          d.x += d.vx; d.y += d.vy;
          energy += Math.abs(d.vx) + Math.abs(d.vy) + Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy);
        }
        g.clearRect(0, 0, W, H);
        g.fillStyle = "#17303F"; g.beginPath();
        for (let i = 0; i < dots.length; i++) { const d = dots[i]; g.moveTo(d.x + d.r, d.y); g.arc(d.x, d.y, d.r, 0, 6.2832); }
        g.fill();
        // 滑鼠離開、圓點也都回到原位：拿掉畫布，換回原本的圖片
        if (!inside && energy < dots.length * 0.02) { stop(); return; }
        if (inside || energy > 0) raf = requestAnimationFrame(step);
      }
      function stop() {
        dm.removeEventListener("pointermove", onMove);
        dm.removeEventListener("pointerleave", onLeave);
        dm.removeEventListener("pointerdown", onDown);
        cv.remove(); dm.classList.remove("fx-live");
      }
      wake();
    }
  })();
})();
