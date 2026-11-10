/* ============================================================
   防線：肉鴿塔防模式
   借用試射場的引擎（視角、後座力、開鏡、彈藥），由 main.js 的 renderRange("defense") 呼叫 createDefense(ctx)。
   訓練靶機器人從遠方排隊走向防線，每一波打完可以從三個「配件」裡挑一個裝到槍上。
   配件都是真實的槍械術語，卡片上會解釋它是什麼、為什麼有這個效果。
   ============================================================ */

// ---------- 透視：深度 d 越大越遠。d = 1 是防線，d = 8 是遠方的出生點 ----------
const DEF_FAR = 2.0;
const DEF_NEAR_Y = 520, DEF_FAR_Y = 100;               // 腳底的高度：出生點在畫面最上方，防線在畫面下方
function defGroundY(d) { return DEF_FAR_Y + (DEF_NEAR_Y - DEF_FAR_Y) * ((1 / d - 1 / DEF_FAR) / (1 - 1 / DEF_FAR)); }
function defLaneX(lane, d) { return lane * 76 / d; }  // 車道越遠越往中間收攏；d = 1 時最寬約 ±500

// ---------- 每把槍的基本傷害（依槍種），口徑很大的再加成 ----------
// ---------- 每把槍的單發傷害 ----------
// 做法：先用口徑的動能（焦耳）決定同類型槍之間誰比較痛，再把每一類槍調到
// 「30 秒內能打出的總傷害」差不多，避免彈匣超大、射速超快的槍直接壓過其他槍。
const defEnergy = [
  [/\.50 BMG|12\.7/, 18000], [/\.338/, 8000], [/\.577/, 4000], [/7\.62×54|7\.92|6\.5×55|\.303|8×50/, 3500], [/7\.62×51/, 3400],
  [/7\.62×39/, 2000], [/6\.5×50/, 2000], [/5\.56/, 1700], [/\.357|\.44|\.50 AE/, 1000], [/7\.62×25/, 700], [/5\.7×28/, 480],
  [/\.45/, 520], [/9×19/, 500], [/9×18/, 340], [/12 號/, 3000]
];
function defEnergyOf(cal) {
  // 口徑欄位常寫「主要口徑（另有…）」，所以取最先出現的那一個
  let best = 1000, at = 1e9;
  defEnergy.forEach(function (d) { const m = d[0].exec(cal || ""); if (m && m.index < at) { at = m.index; best = d[1]; } });
  return best;
}
const defAcc = { auto: 0.6, semi: 0.85, bolt: 1, pump: 0.9 };   // 全自動連射會因為後座力多少打偏
// 射程：手槍、衝鋒槍、霰彈的子彈打遠了威力會掉；步槍和機槍幾乎不受影響。霰彈在近距離特別痛
const defFall = { hg: 0.35, smg: 0.3, sg: 0.6, ar: 0.1, mg: 0.05, rf: 0 };
function defRange(w, d) {
  const t = w.gun.type;
  let f = 1 - (defFall[t] || 0) * Math.max(0, Math.min(1, (d - 1.05) / 0.95));
  if (t === "sg" && d < 1.4) f *= 1.3;
  return f;
}
const defTarget = { hg: 0.9, smg: 1, ar: 1, rf: 1.15, mg: 1, sg: 1.05 };
let defDmgCache = null;
// 開場滿彈匣，30 秒內的總輸出（含換彈時間）；傷害先當作 1
function defWindow(w) {
  const semiCap = { hg: 4.5, rf: 3.2, sg: 3.5 }[w.gun.type] || 5;      // 半自動不可能一直按到手速極限
  const cps = w.mode === "auto" ? 1000 / w.rate : Math.min(1000 / w.rate, semiCap);
  const per = w.pellets > 1 ? 5 : 1;          // 霰彈：平均約有一半彈丸打中
  let t = 0, shots = 0;
  while (t < 30) {
    const n = Math.min(w.mag, Math.floor((30 - t) * cps));
    shots += n; t += n / cps + w.reload / 1000;
    if (n <= 0) break;
  }
  return shots * per * (defAcc[w.mode] || 0.85) * (w.mode === "auto" && w.mag >= 50 ? 0.8 : 1);   // 大彈鼓連續掃射，後段會越打越散
}
function defBuildDmg() {
  const out = {}, byType = {};
  guns.forEach(function (g) {
    if (!gunStats[g.id]) return;
    const w = weaponFor(g.id);
    const e = defEnergyOf(g.caliber);
    const key = g.type + (w.mode === "bolt" ? ":bolt" : w.mode === "pump" ? ":pump" : "");   // 栓動、幫浦式和半自動分開比，各自調到同一水準
    (byType[key] = byType[key] || []).push({ id: g.id, e: e, win: defWindow(w) });
  });
  // 基準：突擊步槍的中位數。其他類型照倍率調整
  function median(a) { a = a.slice().sort(function (x, y) { return x - y; }); return a[Math.floor(a.length / 2)]; }
  const refType = "ar";
  const refE = median(byType[refType].map(function (r) { return r.e; }));
  const T = median(byType[refType].map(function (r) { return r.win * Math.sqrt(r.e / refE); })) * 24;
  Object.keys(byType).forEach(function (t) {
    const list = byType[t];
    const me = median(list.map(function (r) { return r.e; }));
    const raw = list.map(function (r) { return { r: r, f: Math.max(0.7, Math.min(1.35, Math.sqrt(r.e / me))) }; });
    const k = T * (defTarget[t.split(":")[0]] || 1) / median(raw.map(function (x) { return x.r.win * x.f; }));
    raw.forEach(function (x) { out[x.r.id] = k * x.f; });
  });
  return out;
}
function defGunDamage(w) {
  if (!defDmgCache) defDmgCache = defBuildDmg();
  const d = defDmgCache[w.gun.id];
  return d ? Math.round(d * 10) / 10 : 20;
}

// ---------- 配件：真實的槍械術語，每一個都附上說明與代價 ----------
const defParts = [
  { id: "extmag", slot: "彈匣", name: "延伸彈匣", en: "Extended Magazine",
    term: "比標準彈匣更長的彈匣，能多裝子彈，少換幾次彈；但更長更重，換彈時也比較慢。",
    up: "彈匣容量 +40%", down: "裝填時間 +10%",
    apply: function (w) { w.mag = Math.ceil(w.mag * 1.4) + (w.mag < 10 ? 1 : 0); w.reload = Math.round(w.reload * 1.1); } },
  { id: "magwell", slot: "彈匣", name: "喇叭口彈匣井", en: "Flared Magwell",
    term: "把彈匣插入口做成漏斗狀，換彈匣時更容易對準、插得更快。",
    up: "裝填時間 −25%", down: "",
    apply: function (w) { w.reload = Math.round(w.reload * 0.75); } },
  { id: "brake", slot: "槍口", name: "槍口制退器", en: "Muzzle Brake",
    term: "槍口的導流孔把火藥氣體往側邊排出，氣流的反推力抵銷一部分後座力；代價是噪音與火光往兩側擴散。",
    up: "後座力 −22%", down: "畫面震動 +20%",
    apply: function (w) { w.kick *= 0.78; w.shake *= 1.2; } },
  { id: "suppressor", slot: "槍口", name: "消音器", en: "Suppressor",
    term: "讓膛口的高壓氣體在內部慢慢釋放，降低槍聲與火光；因為氣體多被「吃掉」，彈頭初速會略降。",
    up: "畫面震動 −65%", down: "傷害 −7%",
    apply: function (w) { w.shake *= 0.35; w.dmg *= 0.93; } },
  { id: "foregrip", slot: "護木", name: "垂直握把", en: "Vertical Foregrip",
    term: "裝在護木下方的握把，讓前手能把槍口往下壓穩，減少上跳與晃動。",
    up: "後座力 −12%、散布 −10%", down: "",
    apply: function (w) { w.kick *= 0.88; w.spread *= 0.9; } },
  { id: "pad", slot: "槍托", name: "後座緩衝墊", en: "Recoil Pad",
    term: "槍托尾端的橡膠墊，吸收一部分撞向肩膀的衝擊，射手比較不會被頂歪。",
    up: "後座力 −10%、畫面震動 −40%", down: "",
    apply: function (w) { w.kick *= 0.9; w.shake *= 0.6; } },
  { id: "laser", slot: "側軌", name: "雷射指示器", en: "Laser Sight",
    term: "在槍上投射一個紅色光點，不用開鏡也看得出子彈大概會落在哪，腰射更穩。",
    up: "腰射散布 −35%", down: "",
    apply: function (w) { w.scope.hipMul *= 0.65; } },
  { id: "reddot", slot: "瞄具", name: "紅點瞄準鏡", en: "Red Dot Sight",
    term: "鏡片上投影一個紅點，不必同時對齊照門與準星，眼睛只看一個點就能瞄準，又快又準。",
    up: "開鏡散布 −20%（沒有瞄準鏡的槍會換上紅點）", down: "",
    apply: function (w) {
      if (w.scope.type === "iron") w.scope = { name: "紅點瞄準鏡", zoom: 1.25, type: "dot", hipMul: 1, adsMul: Math.min(w.scope.adsMul, 0.7) * 0.85 };
      else { w.scope.adsMul *= 0.8; w.scope.zoom *= 1.1; }
    } },
  { id: "optic", slot: "瞄具", name: "倍率瞄準鏡", en: "Magnified Optic",
    term: "用透鏡把遠方放大。倍率越高看得越遠，但視野也越窄、手抖也被放大。",
    up: "開鏡倍率 +40%（機械瞄具或紅點會換成 2 倍鏡）", down: "",
    apply: function (w) {
      if (w.scope.type === "iron" || w.scope.type === "dot") w.scope = { name: "2 倍瞄準鏡", zoom: 2, type: "optic", hipMul: 1, adsMul: Math.min(w.scope.adsMul, 0.7) * 0.9 };
      else { w.scope.zoom *= 1.4; w.scope.adsMul *= 0.9; }
    } },
  { id: "barrel", slot: "槍管", name: "加長槍管", en: "Long Barrel",
    term: "槍管越長，火藥氣體推彈頭的時間越久，初速越高、彈道也越穩；代價是槍更重、更難甩動。",
    up: "傷害 +10%、散布 −15%", down: "後座力 +5%",
    apply: function (w) { w.dmg *= 1.1; w.spread *= 0.85; w.kick *= 1.05; } },
  { id: "ap", slot: "彈藥", name: "穿甲彈", en: "Armor-Piercing (AP)",
    term: "彈頭內有鋼芯或鎢芯，硬度高，能穿過裝甲；打在沒有裝甲的目標上，傷害略低。",
    up: "無視 50% 裝甲", down: "傷害 −5%",
    apply: function (w) { w.pen += 0.5; w.dmg *= 0.95; } },
  { id: "hollow", slot: "彈藥", name: "空尖彈", en: "Hollow Point (HP)",
    term: "彈頭前端有凹洞，命中軟目標時會張開、把能量留在體內，傷害大；但遇到裝甲幾乎沒用。",
    up: "傷害 +30%", down: "裝甲更難打穿",
    apply: function (w) { w.dmg *= 1.3; w.pen -= 0.35; } },
  { id: "hotload", slot: "彈藥", name: "高壓彈", en: "+P Ammunition",
    term: "裝藥量比標準規格更多（+P）的子彈，初速和威力更高；後座力也跟著變大，槍的磨損也更快。",
    up: "傷害 +15%", down: "後座力 +12%",
    apply: function (w) { w.dmg *= 1.15; w.kick *= 1.12; } },
  { id: "tracer", slot: "彈藥", name: "曳光彈", en: "Tracer Round",
    term: "彈尾裝了會發光的藥劑，飛行時拖出一條亮線，方便看出彈道、修正瞄準，也能標示目標。",
    up: "被打中的敵人 3 秒內多受 15% 傷害", down: "",
    apply: function (w) { w.mark += 0.15; } },
  { id: "incendiary", slot: "彈藥", name: "燃燒彈", en: "Incendiary Round",
    term: "彈頭內含燃燒劑，命中後會點燃目標，持續造成傷害。",
    up: "命中後燃燒 3 秒（每秒 6 點傷害）", down: "",
    apply: function (w) { w.burn += 6; } }
];
const defPartById = {};
defParts.forEach(function (p) { defPartById[p.id] = p; });
const DEF_PART_MAX = 3;   // 同一個配件最多疊三層

// ---------- 流派：每個配件帶有流派標籤，湊滿一定數量就會解鎖額外效果 ----------
const defTags = {
  extmag: { sup: 2 }, magwell: { sup: 1 }, brake: { sup: 1 }, suppressor: { sup: 1 }, foregrip: { sup: 1 }, pad: { sup: 1 },
  laser: { crit: 1 }, reddot: { crit: 1 }, optic: { crit: 2 }, hollow: { crit: 1 }, tracer: { crit: 1, fire: 1 }, barrel: { crit: 1, pierce: 1 },
  ap: { pierce: 2 }, hotload: { pierce: 1, fire: 1 }, incendiary: { fire: 2 }
};
defParts.forEach(function (p) { p.tags = defTags[p.id] || {}; });
const defStyles = [
  { id: "fire", mark: "火", name: "火焰流", t: [3, 6], desc: ["燃燒中的敵人死亡時會爆炸，波及並點燃周圍的敵人", "燃燒傷害 ×2，爆炸範圍與傷害更大"] },
  { id: "crit", mark: "準", name: "精準流", t: [3, 6], desc: ["連續打中靶心會疊「專注」，每層傷害 +8%（最多 10 層）", "靶心傷害 ×4，靶心擊殺會回補 2 發子彈"] },
  { id: "sup", mark: "壓", name: "火力流", t: [3, 6], desc: ["開火時有 15% 機率不消耗子彈", "不耗彈機率 30%，裝填完成後 3 秒傷害 +30%"] },
  { id: "pierce", mark: "穿", name: "重火力流", t: [3, 6], desc: ["子彈會穿過敵人，對後方的敵人造成 50% 傷害", "穿透傷害 100%，額外無視 25% 裝甲"] }
];
const defStyleById = {};
defStyles.forEach(function (st) { defStyleById[st.id] = st; });
const defRoman = ["", "I", "II"];

// ---------- 流派圖示：9×9 像素。# 是主色、o 是副色 ----------
const defIconRows = {
  fire: ["....#....", "...##....", "...###..#", "..####.##", ".########", ".###oo###", ".##oooo##", "..#ooooo.", "...ooo..."],
  crit: ["..#####..", ".#.....#.", "#..ooo..#", "#.o...o.#", "#.o.#.o.#", "#.o...o.#", "#..ooo..#", ".#.....#.", "..#####.."],
  sup: ["..o.o.o..", "..o.o.o..", ".#######.", ".#ooooo#.", ".#######.", ".#ooooo#.", ".#######.", ".#ooooo#.", ".#######."],
  pierce: ["....#....", "....#....", "....#.o..", "....#..o.", "ooooooooo", "....#..o.", "....#.o..", "....#....", "....#...."]
};
function defIcon(id, dark) {
  const svg = newSvg("def-icon", "0 0 9 9");
  const hi = dark ? VM_PAL.b : VM_PAL["2"], lo = dark ? VM_PAL["8"] : VM_PAL.b;
  defIconRows[id].forEach(function (row, y) {
    for (let x = 0; x < 9; x++) {
      const c = row[x];
      if (c === "#") svgRect(svg, x, y, 1, 1, hi);
      else if (c === "o") svgRect(svg, x, y, 1, 1, lo);
    }
  });
  return svg;
}
// ---------- 永久升級（兵工廠）：每局結算會獲得 XP ----------
const defShop = [
  { id: "hp", name: "防線加固", max: 5, cost: [150, 250, 350, 450, 550], desc: "防線血量 +10" },
  { id: "start", name: "後勤補給", max: 2, cost: [300, 600], desc: "開局先隨機裝上一個配件" },
  { id: "slots", name: "戰術背包", max: 1, cost: [500], desc: "每次多一張候選配件" },
  { id: "react", name: "反應訓練", max: 3, cost: [200, 300, 400], desc: "完美裝填的時機範圍變寬" },
  { id: "reroll", name: "情報網", max: 3, cost: [250, 400, 550], desc: "每局多一次重抽候選配件" }
];
function defMetaRead() {
  let m = null;
  try { m = JSON.parse(localStorage.getItem("arsenal-defense-meta") || "null"); } catch (e) {}
  m = m || {};
  m.xp = Number(m.xp) || 0;
  m.lv = m.lv || {};
  defShop.forEach(function (u) { m.lv[u.id] = Math.min(u.max, Number(m.lv[u.id]) || 0); });
  return m;
}
function defMetaWrite(m) { try { localStorage.setItem("arsenal-defense-meta", JSON.stringify(m)); } catch (e) {} }


// ---------- 敵人種類 ----------
// u：d = 1 時每個像素格的大小；hp：血量；armor：身體被打的減傷（靶心不受影響）
const defKinds = {
  walker: { name: "步行靶人", w: 16, h: 28, u: 8, hp: 60, speed: 0.037, armor: 0, hit: 6, pts: 100, cost: 1, body: [2, 0, 14, 28], bull: [8.5, 13.5, 3.5] },
  runner: { name: "衝刺靶人", w: 14, h: 26, u: 8, hp: 45, speed: 0.07, armor: 0, hit: 5, pts: 130, cost: 1.4, body: [1, 0, 13, 26], bull: [6.5, 11.5, 2.5] },
  swarm:  { name: "蜂群小靶", w: 8, h: 9, u: 10, hp: 20, speed: 0.054, armor: 0, hit: 2, pts: 40, cost: 0.45, body: [0, 0, 8, 9], bull: [4, 3, 2] },
  tank:   { name: "重裝靶人", w: 26, h: 36, u: 7, hp: 300, speed: 0.022, armor: 0.6, hit: 15, pts: 400, cost: 4, body: [1, 0, 25, 36], bull: [12.5, 17.5, 4.5] },
  drone:  { name: "飛行靶機", w: 18, h: 11, u: 8, hp: 40, speed: 0.048, armor: 0, hit: 8, pts: 200, cost: 1.8, body: [0, 0, 18, 11], bull: [8.5, 5.5, 2.5], fly: 130 },
  boss:   { name: "靶車", w: 48, h: 40, u: 6, hp: 1800, speed: 0.022, armor: 0.7, hit: 40, pts: 2500, cost: 0, body: [0, 4, 48, 40], bull: [16.5, 19.5, 7.5] }
};

// ---------- 像素敵人：用 VM_PAL 的色碼堆方格，每種都有一個圓形靶心 ----------
function defG(svg) { const g = document.createElementNS(SVG_NS, "g"); svg.appendChild(g); return g; }
function defSprite(kind) {
  const k = defKinds[kind];
  const svg = newSvg("def-svg", "0 0 " + k.w + " " + k.h);
  svg.style.width = (k.w * k.u) + "px";
  svg.style.height = (k.h * k.u) + "px";
  function P(g, x, y, w, h, c) { svgRect(g, x, y, w, h, VM_PAL[c]); }
  function leg(g, x, len, y0) { P(g, x, y0, 4, len, "1"); P(g, x + 1, y0, 2, len - 1, "3"); P(g, x - 1, y0 + len - 2, 6, 2, "1"); }
  const frames = [defG(svg), defG(svg)];     // 腳／輪子／旋翼的兩個動作，輪流顯示
  frames[1].style.display = "none";
  const body = defG(svg);
  if (kind === "walker") {
    leg(frames[0], 3, 8, 19); leg(frames[0], 9, 5, 19);
    leg(frames[1], 3, 5, 19); leg(frames[1], 9, 8, 19);
    P(body, 0, 8, 2, 10, "1"); P(body, 0, 9, 1, 8, "4"); P(body, 14, 8, 2, 10, "1"); P(body, 15, 9, 1, 8, "4");
    P(body, 2, 7, 12, 12, "1"); P(body, 3, 8, 10, 10, "4"); P(body, 3, 8, 10, 1, "5"); P(body, 12, 9, 1, 9, "3"); P(body, 3, 17, 10, 1, "3");
    P(body, 5, 0, 6, 7, "1"); P(body, 6, 1, 4, 5, "5"); P(body, 7, 3, 2, 1, "b");
    P(body, 5, 10, 7, 7, "1"); P(body, 6, 11, 5, 5, "8"); P(body, 7, 12, 3, 3, "1"); P(body, 8, 13, 1, 1, "b");
  } else if (kind === "runner") {
    leg(frames[0], 3, 9, 17); leg(frames[0], 8, 6, 17);
    leg(frames[1], 3, 6, 17); leg(frames[1], 8, 9, 17);
    P(body, 1, 7, 2, 8, "3"); P(body, 11, 7, 2, 8, "3");
    P(body, 3, 6, 8, 11, "1"); P(body, 4, 7, 6, 9, "4"); P(body, 3, 6, 8, 1, "b"); P(body, 4, 8, 6, 1, "5");
    P(body, 4, 0, 6, 6, "1"); P(body, 5, 1, 4, 4, "5"); P(body, 5, 2, 4, 1, "b");
    P(body, 4, 9, 5, 5, "1"); P(body, 5, 10, 3, 3, "8"); P(body, 6, 11, 1, 1, "b");
  } else if (kind === "swarm") {
    P(frames[0], 1, 7, 2, 2, "1"); P(frames[0], 5, 7, 2, 2, "1");
    P(frames[1], 2, 7, 2, 2, "1"); P(frames[1], 4, 7, 2, 2, "1");
    P(body, 0, 0, 8, 7, "1"); P(body, 1, 1, 6, 5, "4"); P(body, 1, 1, 6, 1, "5");
    P(body, 2, 1, 4, 4, "1"); P(body, 3, 2, 2, 2, "8"); P(body, 3, 2, 1, 1, "b");
  } else if (kind === "tank") {
    P(frames[0], 3, 31, 2, 3, "2"); P(frames[0], 9, 31, 2, 3, "2"); P(frames[0], 15, 31, 2, 3, "2"); P(frames[0], 21, 31, 2, 3, "2");
    P(frames[1], 6, 31, 2, 3, "2"); P(frames[1], 12, 31, 2, 3, "2"); P(frames[1], 18, 31, 2, 3, "2");
    P(body, 2, 28, 22, 8, "1"); P(body, 3, 29, 20, 6, "3");
    P(body, 1, 8, 24, 21, "1"); P(body, 2, 9, 22, 19, "4");
    P(body, 2, 9, 6, 19, "6"); P(body, 18, 9, 6, 19, "6"); P(body, 2, 9, 6, 1, "7"); P(body, 18, 9, 6, 1, "7");
    P(body, 4, 13, 1, 1, "2"); P(body, 4, 23, 1, 1, "2"); P(body, 20, 13, 1, 1, "2"); P(body, 20, 23, 1, 1, "2");
    P(body, 8, 10, 10, 17, "3");
    P(body, 8, 0, 10, 9, "1"); P(body, 9, 1, 8, 7, "6"); P(body, 10, 3, 6, 2, "b");
    P(body, 8, 13, 9, 9, "1"); P(body, 9, 14, 7, 7, "8"); P(body, 10, 15, 5, 5, "1"); P(body, 11, 16, 3, 3, "8"); P(body, 12, 17, 1, 1, "b");
  } else if (kind === "drone") {
    P(frames[0], 0, 1, 6, 1, "1"); P(frames[0], 12, 1, 6, 1, "1");
    P(frames[1], 1, 0, 4, 1, "1"); P(frames[1], 13, 0, 4, 1, "1");
    P(body, 5, 9, 1, 2, "1"); P(body, 12, 9, 1, 2, "1"); P(body, 8, 0, 2, 2, "b");
    P(body, 3, 2, 12, 7, "1"); P(body, 4, 3, 10, 5, "4"); P(body, 4, 3, 10, 1, "5");
    P(body, 6, 3, 5, 5, "1"); P(body, 7, 4, 3, 3, "8"); P(body, 8, 5, 1, 1, "b");
  } else {   // boss：載著大靶心的靶車
    P(frames[0], 7, 33, 2, 6, "4"); P(frames[0], 31, 33, 2, 6, "4");
    P(frames[1], 5, 35, 6, 2, "4"); P(frames[1], 29, 35, 6, 2, "4");
    P(body, 4, 32, 8, 8, "1"); P(body, 6, 34, 4, 4, "3"); P(body, 28, 32, 8, 8, "1"); P(body, 30, 34, 4, 4, "3");
    P(body, 0, 8, 36, 25, "1"); P(body, 1, 9, 34, 23, "4"); P(body, 1, 9, 34, 1, "5");
    P(body, 1, 12, 7, 1, "3"); P(body, 1, 28, 7, 1, "3"); P(body, 26, 12, 8, 1, "3"); P(body, 26, 28, 8, 1, "3");
    P(body, 36, 12, 12, 21, "1"); P(body, 37, 13, 10, 19, "3"); P(body, 39, 15, 7, 6, "a"); P(body, 40, 4, 6, 3, "b"); P(body, 41, 7, 4, 5, "1");
    P(body, 9, 12, 15, 15, "1"); P(body, 10, 13, 13, 13, "8"); P(body, 11, 14, 11, 11, "1"); P(body, 12, 15, 9, 9, "8"); P(body, 13, 16, 7, 7, "1"); P(body, 15, 18, 3, 3, "b");
  }
  return { svg: svg, frames: frames };
}

// ---------- 地面上的防線：一排沙包 ----------
function defBuildWall() {
  const svg = newSvg("def-wall", "0 0 350 16");
  for (let r = 0; r < 3; r++) {
    const off = r % 2 ? 6 : 0;
    for (let x = -12 + off; x < 350; x += 12) {
      const y = r * 5;
      svgRect(svg, x, y, 12, 6, "#17303F");
      svgRect(svg, x + 1, y + 1, 10, 4, r === 0 ? "#B1C0CA" : "#9FB4C1");
      svgRect(svg, x + 1, y + 1, 10, 1, "#CBD7DE");
      svgRect(svg, x + 1, y + 4, 10, 1, "#6F8EA1");
    }
  }
  return svg;
}

// ---------- 紀錄 ----------
function defReadBest() {
  try { return JSON.parse(localStorage.getItem("arsenal-defense-best") || "{}") || {}; } catch (e) { return {}; }
}
function defWriteBest(v) {
  try { localStorage.setItem("arsenal-defense-best", JSON.stringify(v)); } catch (e) {}
}

// ---------- 音效（沿用試射場的 AudioContext） ----------
function defTone(freq, dur, type, vol, slideTo, delay) {
  if (rangeAudio === null) {
    try { rangeAudio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { rangeAudio = false; }
  }
  if (!rangeAudio) return;
  const o = rangeAudio.createOscillator(), g = rangeAudio.createGain();
  const t0 = rangeAudio.currentTime + (delay || 0);
  o.type = type || "square";
  o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(vol || 0.07, t0);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  o.connect(g); g.connect(rangeAudio.destination);
  o.start(t0); o.stop(t0 + dur + 0.02);
}


// ---------- 配件插圖：像素側視圖，48×24 的小畫面 ----------
function defPartArt(id) {
  const svg = newSvg("def-art", "0 0 48 24");
  function P(x, y, w, h, c) { svgRect(svg, x, y, w, h, VM_PAL[c]); }
  function bullet(x, y) {
    P(x, y, 9, 5, "1"); P(x + 1, y + 1, 7, 3, "b"); P(x + 1, y + 1, 7, 1, "a");
    P(x + 9, y + 1, 4, 3, "1"); P(x + 9, y + 2, 3, 1, "6"); P(x + 13, y + 2, 1, 1, "1");
  }
  function box(x, y, w, h, fill, top) { P(x, y, w, h, "1"); P(x + 1, y + 1, w - 2, h - 2, fill); if (top) P(x + 1, y + 1, w - 2, 1, top); }
  P(0, 0, 48, 24, "7"); P(0, 21, 48, 3, "6");
  if (id === "extmag") {
    box(9, 8, 8, 13, "3", "4"); P(10, 6, 6, 2, "b");
    box(25, 2, 10, 19, "4", "5"); P(26, 0, 8, 2, "b");
    [8, 12, 16].forEach(function (y) { P(26, y, 8, 1, "3"); });
    P(19, 11, 4, 2, "b"); P(21, 9, 1, 6, "b"); P(22, 10, 1, 4, "b");
  } else if (id === "magwell") {
    P(8, 3, 32, 1, "1");
    for (let r = 1; r < 6; r++) { const x = 8 + r * 2, w = 32 - r * 4; P(x, 3 + r, w, 1, r === 1 ? "6" : "5"); P(x - 1, 3 + r, 2, 1, "1"); P(x + w - 1, 3 + r, 2, 1, "1"); }
    P(17, 9, 14, 1, "1"); box(18, 10, 12, 11, "3", "4"); P(20, 5, 1, 1, "b"); P(27, 5, 1, 1, "b"); P(23, 12, 2, 5, "b");
  } else if (id === "brake") {
    box(3, 9, 15, 6, "4", "5");
    box(18, 6, 20, 12, "5", "7");
    [22, 27, 32].forEach(function (x) { P(x, 7, 2, 10, "1"); P(x - 1, 3, 4, 1, "b"); P(x, 2, 2, 1, "b"); P(x - 1, 20, 4, 1, "b"); P(x, 21, 2, 1, "b"); });
    P(39, 11, 6, 2, "a"); P(43, 9, 2, 6, "b");
  } else if (id === "suppressor") {
    box(3, 10, 11, 5, "4", "5");
    box(14, 5, 30, 14, "3", "5");
    [19, 24, 29, 34, 39].forEach(function (x) { P(x, 6, 1, 12, "2"); });
    P(15, 7, 28, 1, "6");
  } else if (id === "foregrip") {
    box(3, 5, 42, 9, "4", "5");
    [8, 14, 20, 26, 32, 38].forEach(function (x) { P(x, 8, 3, 2, "3"); });
    box(18, 14, 11, 9, "3", "4");
    [17, 19, 21].forEach(function (y) { P(19, y, 9, 1, "2"); });
  } else if (id === "pad") {
    box(4, 4, 31, 16, "4", "5");
    P(8, 8, 20, 2, "3"); P(8, 13, 20, 2, "3");
    box(35, 3, 7, 18, "2", "3");
    [7, 10, 13, 16].forEach(function (y) { P(36, y, 5, 1, "4"); });
    P(44, 6, 1, 12, "b"); P(46, 8, 1, 8, "a");
  } else if (id === "laser") {
    box(3, 13, 28, 7, "4", "5");
    box(29, 9, 9, 8, "3", "4"); P(37, 12, 1, 2, "b");
    for (let x = 39; x < 45; x += 3) P(x, 13, 2, 1, "b");
    P(45, 11, 2, 5, "b"); P(46, 12, 1, 3, "a");
  } else if (id === "reddot") {
    box(6, 17, 36, 4, "4", "5");
    box(12, 5, 24, 13, "1", "3"); P(13, 6, 22, 11, "6"); P(15, 8, 18, 8, "8"); P(15, 8, 18, 1, "7");
    P(23, 11, 3, 3, "1"); P(24, 12, 1, 1, "b"); P(23, 11, 1, 1, "a");
  } else if (id === "optic") {
    box(5, 9, 38, 7, "4", "5");
    box(2, 6, 7, 13, "3", "4"); P(2, 8, 2, 9, "8");
    box(39, 7, 7, 11, "3", "4"); P(44, 9, 2, 7, "8");
    box(22, 4, 5, 5, "5", "6"); P(23, 14, 3, 1, "2");
    P(20, 11, 9, 1, "1"); P(24, 8, 1, 7, "1");
  } else if (id === "barrel") {
    box(2, 5, 18, 6, "4", "5"); P(2, 6, 1, 4, "1");
    box(2, 13, 44, 7, "5", "7"); P(44, 14, 1, 5, "1");
    P(22, 7, 4, 2, "b"); P(26, 6, 1, 4, "b"); P(27, 7, 1, 2, "b");
  } else if (id === "ap") {
    bullet(4, 9);
    box(22, 2, 7, 20, "6", "7"); P(23, 5, 5, 1, "4"); P(23, 17, 5, 1, "4");
    P(28, 10, 6, 4, "1"); P(29, 11, 4, 2, "6"); P(34, 12, 2, 1, "1"); P(22, 9, 1, 6, "2"); P(24, 8, 1, 1, "2"); P(24, 15, 1, 1, "2");
    P(37, 9, 4, 1, "b"); P(37, 14, 4, 1, "b");
  } else if (id === "hollow") {
    P(5, 9, 10, 7, "1"); P(6, 10, 8, 5, "b"); P(6, 10, 8, 1, "a");
    P(15, 8, 10, 9, "1"); P(16, 9, 8, 7, "6"); P(23, 11, 3, 3, "1");
    P(31, 11, 11, 3, "1"); P(30, 5, 3, 15, "1"); P(31, 6, 1, 13, "6"); P(33, 8, 2, 9, "1"); P(34, 9, 1, 7, "6");
    P(41, 6, 3, 4, "1"); P(42, 7, 1, 2, "6"); P(41, 15, 3, 4, "1"); P(42, 16, 1, 2, "6");
  } else if (id === "hotload") {
    bullet(4, 10);
    P(21, 11, 3, 3, "b"); P(24, 8, 4, 9, "1"); P(25, 9, 2, 7, "b"); P(28, 5, 4, 15, "1"); P(29, 6, 2, 13, "a"); P(32, 8, 4, 9, "1"); P(33, 9, 2, 7, "b");
    P(38, 6, 2, 10, "1"); P(35, 9, 8, 2, "1"); P(39, 7, 1, 8, "b"); P(36, 10, 6, 1, "b");
  } else if (id === "tracer") {
    P(2, 12, 6, 1, "b"); P(10, 12, 5, 1, "a"); P(17, 12, 4, 1, "b"); P(23, 12, 2, 1, "a");
    P(2, 14, 4, 1, "c"); P(8, 14, 3, 1, "c");
    bullet(28, 10);
    P(26, 9, 1, 7, "a"); P(25, 10, 1, 5, "b");
  } else if (id === "incendiary") {
    bullet(3, 11);
    P(22, 14, 10, 7, "1"); P(23, 15, 8, 6, "b"); P(25, 9, 6, 8, "1"); P(26, 10, 4, 7, "b"); P(27, 5, 3, 7, "1"); P(28, 6, 1, 5, "a"); P(33, 12, 5, 9, "1"); P(34, 13, 3, 8, "b"); P(35, 10, 1, 4, "b");
    P(25, 18, 5, 3, "a"); P(35, 17, 1, 3, "a");
  }
  return svg;
}

// =====================================================================
function createDefense(ctx) {
  const field = ctx.field, world = ctx.world;
  const S = {
    state: "idle",       // idle 開始前｜count 倒數｜run 進行中｜clearing 剛清完｜cards 選配件｜ready 等待繼續｜over 結束
    wave: 0, hp: 100, hpMax: 100, score: 0, kills: 0, streak: 0, streakAt: 0, crits: 0, pellets: 0, hits: 0, bestStreak: 0,
    picks: {}, layers: {}, learned: [], enemies: [], queue: [], t: 0, countLeft: 0, hitstop: 0, slow: 0, endless: false,
    focus: 0, focusT: 0, buffUntil: 0, odUntil: 0, rerolls: 1, xpGain: 0
  };
  let meta = defMetaRead();
  const parts = [], timers = [];
  let uid = 0, offered = [], clock = 0;
  function later(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id; }

  // ===== 畫面元素 =====
  const wall = defBuildWall();
  wall.style.left = "-1400px"; wall.style.top = "506px";
  world.appendChild(wall);

  const hud = el("div", "def-hud");
  const waveLabel = el("b", "def-wave", "WAVE 1");
  const left = el("span", "def-left", "");
  const hpBar = el("div", "def-hp"); const hpFill = el("i"); hpBar.appendChild(hpFill);
  const hpText = el("span", "def-hptext", "防線 100");
  hud.appendChild(waveLabel); hud.appendChild(hpBar); hud.appendChild(hpText); hud.appendChild(left);
  const scoreBox = el("div", "def-score");
  const scoreNum = el("b", "", "0");
  const streakEl = el("span", "def-streak", "");
  scoreBox.appendChild(el("span", "", "SCORE")); scoreBox.appendChild(scoreNum); scoreBox.appendChild(streakEl);
  const radar = el("div", "def-radar");
  const radarView = el("i", "def-radar-view"); radar.appendChild(radarView);
  const banner = el("div", "def-banner"); banner.hidden = true;
  const countEl = el("div", "def-count"); countEl.hidden = true;
  const cardsEl = el("div", "def-cards"); cardsEl.hidden = true;
  const panel = el("div", "def-panelwrap"); panel.hidden = true;
  const stylesEl = el("div", "def-styles");
  const rbar = el("div", "def-rbar"); rbar.hidden = true;
  const rzone = el("b"); const rfill = el("i");
  rbar.appendChild(rzone); rbar.appendChild(rfill); rbar.appendChild(el("span", "", "完美裝填：在亮區再按一次 R"));
  [hud, scoreBox, stylesEl, radar, rbar, banner, countEl, cardsEl, panel].forEach(function (n) { field.appendChild(n); });
  [cardsEl, panel].forEach(function (n) {
    n.addEventListener("mousedown", function (e) { e.stopPropagation(); });
    n.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
  });
  // 賽場下方：目前配件
  const loadout = el("section", "range-panel def-loadout");
  const loadoutBody = el("div", "def-loadout-body");
  loadout.appendChild(el("h2", "", "目前配件"));
  loadout.appendChild(loadoutBody);

  // ===== 配件效果：把加成套到槍的設定上（main.js 每次換槍、選完配件都會呼叫） =====
  function mod(w) {
    w.dmg = defGunDamage(w); w.pen = 0; w.burn = 0; w.mark = 0;
    w.spread *= 0.6;       // 防線的敵人比靶紙小又會動，散布調小一些
    w.scope = Object.assign({}, w.scope);
    defParts.forEach(function (p) {
      const n = S.layers[p.id] || 0;
      for (let i = 0; i < n; i++) p.apply(w);
    });
    w.mag = Math.max(1, w.mag);
    // 流派加成
    w.bullMul = (styleLv("crit") >= 2 ? 4 : 3) + (w.mode === "bolt" ? 2 : 0);      // 栓動步槍精準，打中靶心特別痛
    if (styleLv("pierce") >= 2) w.pen += 0.25;
    if (w.gun.type !== "sg") w.pen += Math.max(0, Math.min(0.5, (defEnergyOf(w.gun.caliber) - 500) / 6000));     // 彈藥動能越大，越能打穿裝甲（手槍彈幾乎打不穿）
    w.through = w.gun.type === "rf" ? (w.mode === "bolt" ? 2 : 1) : 0;                      // 步槍彈會穿過去，打到後面的敵人
    w.pierceLv = styleLv("pierce");
    w.free = [0, 0.15, 0.3][styleLv("sup")];
    return w;
  }
  // 越後面的波次，同一個配件裝上去效果越強：第 6 波起算兩層、第 12 波起算三層
  function tierGain() { return S.wave >= 12 ? 3 : S.wave >= 6 ? 2 : 1; }
  function tierName() { return S.wave >= 12 ? "頂級" : S.wave >= 6 ? "精良" : ""; }
  function addPart(p) { S.picks[p.id] = (S.picks[p.id] || 0) + 1; S.layers[p.id] = (S.layers[p.id] || 0) + tierGain(); }
  function styleCount(id) {
    let n = 0;
    defParts.forEach(function (p) { n += (S.layers[p.id] || 0) * (p.tags[id] || 0); });
    return n;
  }
  function levelOf(n, st) { return n >= st.t[1] ? 2 : n >= st.t[0] ? 1 : 0; }
  function styleLv(id) { return levelOf(styleCount(id), defStyleById[id]); }
  function dmgMult() {
    let m = 1;
    if (styleLv("crit") >= 1) m += 0.08 * S.focus;
    if (clock < S.buffUntil) m *= 1.25;
    if (clock < S.odUntil) m *= 1.3;
    return m;
  }
  function paintStyles() {
    stylesEl.replaceChildren();
    defStyles.forEach(function (st) {
      const lv = styleLv(st.id);
      if (lv) { const c = el("span", "def-style-chip"); c.appendChild(defIcon(st.id, true)); c.appendChild(document.createTextNode(st.name + " " + defRoman[lv])); stylesEl.appendChild(c); }
    });
    if (styleLv("crit") >= 1 && S.focus > 0) stylesEl.appendChild(el("span", "def-style-chip focus", "專注 ×" + S.focus));
    if (clock < S.buffUntil) stylesEl.appendChild(el("span", "def-style-chip focus", "完美裝填 +25%"));
    if (clock < S.odUntil) stylesEl.appendChild(el("span", "def-style-chip focus", "超載 +30%"));
  }
  function paintLoadout() {
    loadoutBody.replaceChildren();
    const ids = Object.keys(S.picks).filter(function (id) { return S.picks[id] > 0; });
    if (ids.length) {
      defStyles.forEach(function (st) {
        const n = styleCount(st.id), lv = levelOf(n, st);
        if (!n) return;
        const r = el("div", "def-part-row def-style-row");
        const rb = el("b"); rb.appendChild(defIcon(st.id, false)); rb.appendChild(document.createTextNode(st.name + " " + (lv ? defRoman[lv] : "（未解鎖）")));
        r.appendChild(rb);
        r.appendChild(el("span", "def-part-en", n + " / " + (lv < 2 ? st.t[lv] : st.t[1])));
        r.appendChild(el("span", "", lv ? st.desc.slice(0, lv).join("；") : "再湊 " + (st.t[0] - n) + " 點解鎖：" + st.desc[0]));
        loadoutBody.appendChild(r);
      });
    }
    if (!ids.length) { loadoutBody.appendChild(el("p", "range-note", "還沒有配件。每清掉一波，就能從三個配件裡挑一個。")); return; }
    ids.forEach(function (id) {
      const p = defPartById[id];
      const r = el("div", "def-part-row");
      r.appendChild(el("b", "", p.name + " ×" + S.picks[id] + (S.layers[id] > S.picks[id] ? "（效果 ×" + S.layers[id] + "）" : "")));
      r.appendChild(el("span", "def-part-en", p.en));
      r.appendChild(el("span", "", p.up + (p.down ? "；" + p.down : "")));
      loadoutBody.appendChild(r);
    });
  }

  // ===== 小工具：浮動數字、粒子、橫幅 =====
  function floatNum(x, y, text, big) {
    const f = el("span", "def-num" + (big ? " big" : ""), text);
    f.style.left = x + "px"; f.style.top = y + "px";
    world.appendChild(f);
    later(function () { f.remove(); }, 800);
  }
  function burst(x, y, n, opts) {
    if (reduceMotion()) return;
    opts = opts || {};
    const colors = opts.colors || ["#17303F", "#4A6678", "#EDF0EE", "#D9C45A"];
    for (let i = 0; i < n && parts.length < 170; i++) {
      const a = (opts.dir !== undefined ? opts.dir + (Math.random() - 0.5) * 1.6 : Math.random() * Math.PI * 2);
      const sp = (opts.power || 220) * (0.4 + Math.random() * 0.8);
      const size = (opts.size || 8) * (0.6 + Math.random() * 0.8);
      const node = el("span", "def-part");
      node.style.width = node.style.height = size + "px";
      node.style.background = colors[Math.floor(Math.random() * colors.length)];
      world.appendChild(node);
      parts.push({ node: node, x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (opts.up || 60), life: 0.45 + Math.random() * 0.35, max: 0.8, grav: opts.grav === undefined ? 700 : opts.grav, r: Math.random() * 360, vr: (Math.random() - 0.5) * 900, size: size });
    }
  }
  function stepParts(dt) {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life -= dt;
      if (p.life <= 0) { p.node.remove(); parts.splice(i, 1); continue; }
      p.vy += p.grav * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
      p.node.style.transform = "translate(" + p.x + "px," + p.y + "px) rotate(" + p.r + "deg) scale(" + Math.min(1, p.life * 3) + ")";
    }
  }
  let bannerTimer = null;
  function say(text, ms, big) {
    banner.textContent = text;
    banner.className = "def-banner" + (big ? " big" : "");
    banner.hidden = false;
    void banner.offsetWidth;
    banner.classList.add("on");
    clearTimeout(bannerTimer);
    bannerTimer = later(function () { banner.hidden = true; }, ms || 1100);
  }
  function hurtFlash() {
    field.classList.remove("is-hurt"); void field.offsetWidth; field.classList.add("is-hurt");
    later(function () { field.classList.remove("is-hurt"); }, 450);
  }

  // ===== 敵人 =====
  function spawn(kind, laneOverride, d0) {
    const k = defKinds[kind];
    const spr = defSprite(kind);
    const node = el("div", "def-enemy def-" + kind);
    const bar = el("div", "def-ebar"); const fill = el("i"); bar.appendChild(fill); bar.hidden = true;
    node.appendChild(bar); node.appendChild(spr.svg);
    world.appendChild(node);
    const dot = el("span", "def-dot def-dot-" + kind);
    radar.appendChild(dot);
    const hpMul = 1 + 0.22 * (S.wave - 1) + 0.03 * (S.wave - 1) * (S.wave - 1);
    const e = {
      id: ++uid, kind: kind, k: k, node: node, bar: bar, fill: fill, dot: dot, frames: spr.frames,
      lane: laneOverride !== undefined ? laneOverride : (Math.random() * 2 - 1) * 6.5,
      d: d0 || (kind === "boss" ? 1.8 : DEF_FAR),
      hp: Math.round(k.hp * hpMul * (kind === "boss" ? 1 + 0.5 * (Math.floor(S.wave / 5) - 1) : 1)), mark: 0, burn: 0, burnT: 0, flash: 0, phase: Math.random() * 6, swayAmp: kind === "drone" ? 0.9 : 0, jolt: 0, minionAt: 4
    };
    if (S.wave > 10 && kind !== "boss" && Math.random() < Math.min(0.4, 0.05 * (S.wave - 10))) { e.elite = true; e.hp *= 2; node.classList.add("is-elite"); }
    e.max = e.hp;
    S.enemies.push(e);
    placeEnemy(e);
  }
  function geom(e) {
    const s = 1 / e.d, k = e.k;
    const bob = e.kind === "drone" ? Math.sin(clock * 3 + e.phase) * 10 * s : Math.abs(Math.sin(clock * 9 * (e.k.speed / 0.037 + 0.5) + e.phase)) * -3 * s;
    const lane = e.lane + (e.swayAmp ? Math.sin(clock * 1.4 + e.phase) * e.swayAmp : 0);
    const cx = defLaneX(lane, e.d);
    const gy = defGroundY(e.d) - (k.fly ? k.fly * s : 0) + bob;
    const w = k.w * k.u * s, h = k.h * k.u * s;
    return { s: s, x: cx - w / 2, y: gy - h, w: w, h: h, cx: cx, gy: gy };
  }
  function placeEnemy(e) {
    const g = geom(e);
    e.g = g;
    const squash = e.jolt > 0 ? 1 + e.jolt * 0.08 : 1;
    // 原點放在左上角，畫面上的位置才會和判定用的 (g.x, g.y) 完全一致；被打到時往下壓扁，腳底不動
    e.node.style.transform = "translate(" + g.x + "px," + (g.y + g.h * (1 - squash)) + "px) scale(" + g.s + "," + (g.s * squash) + ")";
    e.node.style.transformOrigin = "0 0";
    e.node.style.zIndex = String(100 + Math.round((DEF_FAR + 1 - e.d) * 100));
    e.dot.style.left = Math.max(0, Math.min(100, (g.cx / 640 + 1) * 50)) + "%";
    e.dot.classList.toggle("near", e.d < 2.2);
  }

  // ===== 傷害與擊殺 =====
  function damage(e, amount, crit, x, y) {
    if (e.mark > 0) amount *= 1.15 + 0;
    e.hp -= amount; e.hitsTaken = (e.hitsTaken || 0) + 1;
    e.flash = 0.07; e.node.classList.add("is-flash");
    e.bar.hidden = false;
    e.fill.style.width = Math.max(0, e.hp / e.max * 100) + "%";
    e.jolt = 1;
    burst(x, y, crit ? 9 : 4, { power: crit ? 320 : 180, size: crit ? 8 : 5, colors: crit ? ["#D9C45A", "#F0DE86", "#EDF0EE"] : ["#EDF0EE", "#9FB4C1", "#4A6678"] });
    floatNum(x, y - 14, (crit ? "靶心 " : "") + Math.max(1, Math.round(amount)), crit);
    if (e.hp <= 0) kill(e, crit);
  }
  function kill(e, crit) {
    const i = S.enemies.indexOf(e);
    if (i < 0) return;
    S.enemies.splice(i, 1);
    S.kills++;
    S.streak++; S.streakAt = clock; S.bestStreak = Math.max(S.bestStreak, S.streak);
    const far = 1 + 0.5 * Math.max(0, Math.min(1, (e.d - 1.3) / 0.7));      // 在遠處就解決，分數最多 ×1.5
    const once = e.hitsTaken === 1 && e.kind !== "swarm" && e.kind !== "walker" || (e.hitsTaken === 1 && e.max >= 100);   // 一槍就倒：多給分
    const pts = Math.round(e.k.pts * (1 + Math.min(S.streak, 20) * 0.05) * (crit ? 1.5 : 1) * (once ? 1.5 : 1) * (e.elite ? 2 : 1) * far);
    S.score += pts;
    const g = e.g;
    if (e.burnT > 0 && styleLv("fire") >= 1) explode(e);
    if (crit && styleLv("crit") >= 2) { ctx.addAmmo(2); floatNum(g.cx, g.gy - g.h - 34, "+2 彈", false); }
    burst(g.cx, g.gy - g.h / 2, e.kind === "boss" ? 70 : e.kind === "tank" ? 34 : 20, { power: e.kind === "boss" ? 520 : 380, size: Math.max(7, 22 * g.s), grav: 900, up: 160 });
    floatNum(g.cx, g.gy - g.h - 8, (once ? "一擊 +" : far > 1.2 ? "遠距 +" : "+") + pts, true);
    e.dot.remove();
    e.node.classList.add("is-dead");
    const nd = e.node;
    later(function () { nd.remove(); }, 260);
    S.hitstop = Math.max(S.hitstop, e.kind === "boss" ? 0.16 : crit ? 0.07 : 0.045);
    ctx.shake(e.kind === "boss" ? 14 : e.kind === "tank" ? 9 : 5);
    ctx.hitmark.classList.add("kill");
    if (ctx.soundOn()) { defTone(180, 0.14, "sawtooth", 0.09, 60); defTone(900 + Math.min(S.streak, 12) * 70, 0.07, "square", 0.05, undefined, 0.02); }
    if ([3, 5, 8, 12, 16, 20, 30].indexOf(S.streak) >= 0) say("連殺 ×" + S.streak, 900);
    if (e.kind === "boss") { S.slow = 0.9; say("靶車擊毀！", 1500, true); }
    paintScore();
  }
  // 火焰流：燃燒中的敵人死亡時爆炸，波及周圍並點燃（可以連鎖）
  function explode(e) {
    const lv = styleLv("fire"), g = e.g, cx = g.cx, cy = g.gy - g.h / 2;
    const R = (lv >= 2 ? 240 : 160) * (0.55 + 0.45 * g.s);
    const dmg = Math.max(30, e.max * (lv >= 2 ? 0.5 : 0.3));
    burst(cx, cy, 26, { power: 460, size: 12, colors: ["#D9C45A", "#F0DE86", "#EDF0EE", "#17303F"], grav: 300 });
    floatNum(cx, cy - 36, "爆炸！", true);
    ctx.shake(8);
    if (ctx.soundOn()) { defTone(110, 0.3, "sawtooth", 0.12, 40); defTone(700, 0.12, "square", 0.04, 200); }
    S.enemies.slice().forEach(function (o) {
      if (o === e || !o.g) return;
      const ox = o.g.cx, oy = o.g.gy - o.g.h / 2;
      if (Math.hypot(ox - cx, oy - cy) > R) return;
      o.burn = Math.max(o.burn, 6 * (lv >= 2 ? 2 : 1)); o.burnT = 3;
      damage(o, dmg, false, ox, oy);
    });
  }
  // 敵人撞到防線
  function reachBase(e) {
    const i = S.enemies.indexOf(e);
    if (i < 0) return;
    S.enemies.splice(i, 1);
    S.hp = Math.max(0, S.hp - e.k.hit);
    S.streak = 0;
    const g = e.g;
    burst(g.cx, g.gy - 10, 22, { power: 420, size: 10, colors: ["#D9C45A", "#EDF0EE", "#17303F"], dir: -Math.PI / 2 });
    floatNum(g.cx, g.gy - g.h, "防線 −" + e.k.hit, true);
    e.dot.remove(); e.node.remove();
    hurtFlash();
    ctx.shake(10 + e.k.hit * 0.4);
    S.hitstop = Math.max(S.hitstop, 0.05);
    if (ctx.soundOn()) defTone(140, 0.28, "sawtooth", 0.12, 50);
    paintHud();
    if (S.hp <= 0) later(gameOver, 350);
  }

  // 不同打擊用不同的聲音：身體是悶響、裝甲是金屬聲、靶心是清脆雙音
  let lastBodyAt = 0;
  function hitSound(type) {
    if (!ctx.soundOn()) return;
    if (type === "body") { if (clock - lastBodyAt < 0.04) return; lastBodyAt = clock; defTone(240, 0.05, "square", 0.05, 120); }
    else if (type === "armor") { defTone(1900, 0.1, "triangle", 0.07, 1200); defTone(2900, 0.05, "square", 0.025); }
    else { playTick(true); defTone(1500 + S.focus * 60, 0.12, "triangle", 0.05, undefined, 0.03); }
  }
  function setHitmark(bull) {
    ctx.hitmark.classList.remove("on", "bull", "kill"); void ctx.hitmark.offsetWidth;
    ctx.hitmark.classList.add("on"); if (bull) ctx.hitmark.classList.add("bull");
  }

  // 玩家的一顆彈丸落在 world 座標 (x, y)
  function hit(x, y) {
    const w = ctx.getW();
    S.pellets++;
    const order = S.enemies.slice().sort(function (a, b) { return a.d - b.d; });
    const sniper = w.gun.type === "rf" && ctx.getZoom() >= 2.5;      // 用狙擊鏡瞄準：靶心更痛，子彈多穿一個
    for (let i = 0; i < order.length; i++) {
      const e = order[i], g = e.g, k = e.k;
      if (!g) continue;
      const u = k.u * g.s;
      const lx = (x - g.x) / u, ly = (y - g.y) / u;
      const pad = 14 * (1 - g.s) / u;        // 越遠的敵人越小，判定範圍就多放寬一些
      const bull = Math.hypot(lx - k.bull[0], ly - k.bull[1]) <= Math.max(k.bull[2] * 1.25 + 0.4, 14 / u);
      const body = lx >= k.body[0] - 0.3 - pad && lx <= k.body[2] + 0.3 + pad && ly >= k.body[1] - 0.3 - pad && ly <= k.body[3] + 0.3 + pad;
      if (!bull && !body) continue;
      S.hits++;
      ctx.markPull();
      let amount;
      if (bull) {
        amount = w.dmg * w.bullMul * (sniper ? 1.2 : 1);
        S.crits++;
        S.focus = Math.min(10, S.focus + 1); S.focusT = clock;
        setHitmark(true); hitSound("bull");
      } else {
        const armor = Math.max(0, Math.min(0.95, k.armor * (1 - w.pen)));
        amount = w.dmg * (1 - armor);
        setHitmark(false); hitSound(armor > 0.3 ? "armor" : "body");
        if (armor > 0.3) { floatNum(x, y - 28, "裝甲！", false); burst(x, y, 4, { colors: ["#D9C45A", "#EDF0EE"], power: 260, size: 4, grav: 400 }); }
      }
      amount *= dmgMult() * defRange(w, e.d);
      if (w.mark) e.mark = 3;
      if (w.burn) { e.burn = w.burn * (styleLv("fire") >= 2 ? 2 : 1); e.burnT = 3; }
      damage(e, amount, bull, x, y);
      // 重火力流：子彈穿過去，打到後面那個
      const passes = Math.max(w.pierceLv >= 1 ? 1 : 0, (w.through || 0) + (sniper ? 1 : 0));
      if (passes > 0) {
        const f = Math.max(w.pierceLv >= 2 ? 1 : 0.5, w.through ? 0.7 : 0);
        let left = passes;
        for (let j = i + 1; j < order.length && left > 0; j++) {
          const o = order[j];
          if (S.enemies.indexOf(o) < 0 || !o.g) continue;
          if (Math.abs(o.g.cx - g.cx) <= (g.w + o.g.w) / 2 * 0.8) {
            const oa = Math.max(0, Math.min(0.95, o.k.armor * (1 - w.pen)));
            damage(o, w.dmg * f * (1 - oa) * dmgMult(), false, o.g.cx, o.g.gy - o.g.h / 2);
            left--;
          }
        }
      }
      return bull ? 10 : 5;
    }
    // 沒打到：地面揚起一點灰塵
    burst(x, y, 2, { colors: ["#9FB4C1", "#CBD7DE"], power: 90, size: 4, grav: 200 });
    return 0;
  }

  // 主動裝填：裝填進行到亮區時再按一次 R，立刻完成並獲得傷害加成；按錯時機會卡彈
  let rel = null;
  function reloadWindow() { const lv = meta.lv.react; return [0.5 - 0.02 * lv, 0.72 + 0.02 * lv]; }
  function reloadStart(ms) {
    rel = { t0: performance.now(), ms: ms, done: false };
    const w = reloadWindow();
    rzone.style.left = (w[0] * 100) + "%"; rzone.style.width = ((w[1] - w[0]) * 100) + "%";
    rfill.style.width = "0%";
    rbar.className = "def-rbar"; rbar.hidden = false;
  }
  function reloadEnd() { rel = null; rbar.hidden = true; }
  function activeReload() {
    if (!rel || rel.done) return null;
    rel.done = true;
    const p = (performance.now() - rel.t0) / rel.ms, w = reloadWindow();
    if (p >= w[0] && p <= w[1]) {
      S.buffUntil = clock + 4;
      say("完美裝填！傷害 +25%", 1000);
      if (ctx.soundOn()) { defTone(880, 0.06, "square", 0.06); defTone(1320, 0.1, "square", 0.06, undefined, 0.06); }
      return "perfect";
    }
    rbar.classList.add("bad");
    say("卡彈！", 800);
    if (ctx.soundOn()) defTone(120, 0.25, "sawtooth", 0.08, 60);
    return "fail";
  }
  function onReloaded() {      // 裝填完成（不論是否完美）
    if (styleLv("sup") >= 2) S.odUntil = clock + 3;
  }
  function onFire() { return Math.random() < (ctx.getW().free || 0); }

  // ===== 波次 =====
  function makeWave(n) {
    const q = [];
    let budget = 6 + n * 3.5 + n * n * 0.2;
    const pool = [["walker", 1.0]];
    if (n >= 2) pool.push(["runner", 0.55]);
    if (n >= 3) pool.push(["swarm", 0.4]);
    if (n >= 3) pool.push(["drone", 0.35]);
    if (n >= 4) pool.push(["tank", 0.3 + Math.min(0.3, n * 0.02)]);
    const gap = Math.max(0.3, 1.5 - n * 0.08);
    let t = 1;
    while (budget > 0.4) {
      const opts = pool.filter(function (p) { return (p[0] === "swarm" ? 2.25 : defKinds[p[0]].cost) <= budget + 0.5; });
      if (!opts.length) break;
      let sum = 0; opts.forEach(function (p) { sum += p[1]; });
      let r = Math.random() * sum, pick = opts[0];
      for (let i = 0; i < opts.length; i++) { r -= opts[i][1]; if (r <= 0) { pick = opts[i]; break; } }
      const kind = pick[0];
      if (kind === "swarm") {
        const lane = (Math.random() * 2 - 1) * 5.5;
        for (let j = 0; j < 5; j++) q.push({ kind: "swarm", at: t + j * 0.12, lane: lane + (j - 2) * 0.55 });
        budget -= 2.25; t += gap * 1.6;
      } else {
        q.push({ kind: kind, at: t }); budget -= defKinds[kind].cost; t += gap * Math.pow(defKinds[kind].cost, 0.5);
      }
    }
    if (n % 5 === 0) q.push({ kind: "boss", at: 2, lane: 0 });
    q.sort(function (a, b) { return a.at - b.at; });
    return q;
  }
  function paintHud() {
    waveLabel.textContent = "WAVE " + S.wave + (S.endless ? "　無盡" : "");
    const remain = S.queue.length + S.enemies.length;
    left.textContent = S.state === "run" ? "剩餘 " + remain : "";
    hpFill.style.width = (S.hp / S.hpMax * 100) + "%";
    hpText.textContent = "防線 " + S.hp;
    hpBar.classList.toggle("low", S.hp <= 35);
  }
  function paintScore() {
    scoreNum.textContent = String(S.score);
    streakEl.textContent = S.streak >= 2 ? "連殺 ×" + S.streak : "";
  }

  function beginCount() {
    if (S.state === "count" || S.state === "run") return;
    S.state = "count"; S.countLeft = 3;
    S.queue = makeWave(S.wave); S.t = 0; S.enemies.forEach(removeEnemy); S.enemies = [];
    panel.hidden = true; cardsEl.hidden = true; countEl.hidden = false;
    countEl.textContent = "3";
    paintHud();
    ctx.showMsg();
  }
  function removeEnemy(e) { e.node.remove(); e.dot.remove(); }
  function startWaveRun() {
    S.state = "run"; S.t = 0;
    countEl.textContent = "第 " + S.wave + " 波"; countEl.hidden = false; countEl.classList.add("small");
    later(function () { if (S.state === "run") countEl.hidden = true; countEl.classList.remove("small"); }, 900);
    if (ctx.soundOn()) { defTone(660, 0.08, "square", 0.06); defTone(990, 0.12, "square", 0.06, undefined, 0.09); }
    paintHud();
  }
  function clearWave() {
    S.state = "clearing"; S.slow = 0.8;
    const bonus = 500 + S.hp * 10;
    S.score += bonus; paintScore();
    say("第 " + S.wave + " 波清除　+" + bonus, 1500, true);
    if (ctx.soundOn()) [523, 659, 784, 1047].forEach(function (f, i) { defTone(f, 0.16, "square", 0.06, undefined, i * 0.09); });
    if (S.wave === 10 && !S.endless) { S.endless = true; later(function () { say("10 波通關！繼續挑戰無盡波", 2200, true); }, 1700); }
    later(showCards, S.wave === 10 ? 3300 : 1700);
  }

  // ===== 配件選擇 =====
  function drawOffers() {
    const n = 3 + meta.lv.slots;
    const pool = defParts.filter(function (p) { return (S.picks[p.id] || 0) < DEF_PART_MAX; });
    const mine = {};
    defStyles.forEach(function (st) { mine[st.id] = styleCount(st.id); });
    const out = [];
    while (out.length < n && pool.length) {
      // 已經有的流派，同流派的配件比較容易出現，讓玩家比較容易湊成一套
      const ws = pool.map(function (p) { let g = 1; Object.keys(p.tags).forEach(function (t) { if (mine[t] > 0) g += 1.2; }); return g; });
      let r = Math.random() * ws.reduce(function (a, b) { return a + b; }, 0), k = 0;
      for (; k < pool.length - 1; k++) { r -= ws[k]; if (r <= 0) break; }
      out.push(pool.splice(k, 1)[0]);
    }
    return out;
  }
  // 這張卡裝上去之後，各流派的進度
  function styleHint(p) {
    const lines = [];
    Object.keys(p.tags).forEach(function (id) {
      const st = defStyleById[id], cur = styleCount(id), nxt = cur + p.tags[id] * tierGain();
      const l0 = levelOf(cur, st), l1 = levelOf(nxt, st);
      let t = st.name + " " + cur + " → " + nxt;
      if (l1 > l0) t += "　★ 解鎖 " + defRoman[l1] + "：" + st.desc[l1 - 1];
      lines.push({ text: t, hot: l1 > l0, id: id });
    });
    return lines;
  }
  function showCards(reroll) {
    S.state = "cards";
    if (!reroll) ctx.refill();
    offered = drawOffers();
    if (!offered.length) { S.hp = Math.min(S.hpMax, S.hp + 15); say("配件全滿，防線修復 +15", 1200); afterPick(); return; }
    cardsEl.replaceChildren();
    cardsEl.appendChild(el("h2", "def-cards-title", "第 " + S.wave + " 波完成：挑一個配件"));
    const row = el("div", "def-cardrow");
    row.style.gridTemplateColumns = "repeat(" + offered.length + ", minmax(0, 1fr))";
    offered.forEach(function (p, i) {
      const b = el("button", "def-card");
      b.type = "button";
      b.appendChild(el("span", "def-card-key", String(i + 1)));
      b.appendChild(defPartArt(p.id));
      b.appendChild(el("span", "def-card-slot", p.slot + (S.picks[p.id] ? "・已裝 ×" + S.picks[p.id] : "")));
      b.appendChild(el("b", "def-card-name", p.name));
      b.appendChild(el("span", "def-card-en", p.en));
      b.appendChild(el("span", "def-card-term", p.term));
      if (tierGain() > 1) b.appendChild(el("span", "def-card-tier", tierName() + "：效果 ×" + tierGain()));
      b.appendChild(el("span", "def-card-up", "＋ " + p.up));
      if (p.down) b.appendChild(el("span", "def-card-down", "－ " + p.down));
      styleHint(p).forEach(function (h) {
        const line = el("span", "def-card-style" + (h.hot ? " hot" : ""));
        line.appendChild(defIcon(h.id, false)); line.appendChild(document.createTextNode(h.text));
        b.appendChild(line);
      });
      b.addEventListener("click", function () { pick(i); });
      row.appendChild(b);
    });
    cardsEl.appendChild(row);
    const foot = el("div", "def-cards-foot");
    if (S.hp < S.hpMax) {
      const rb = el("button", "map-chip", "［" + (offered.length + 1) + "］不選配件，修復防線 +25");
      rb.type = "button";
      rb.addEventListener("click", function () { repair(); });
      foot.appendChild(rb);
    }
    const rr = el("button", "map-chip", "［R］重抽（剩 " + S.rerolls + " 次）");
    rr.type = "button"; rr.disabled = S.rerolls <= 0;
    rr.addEventListener("click", function () { doReroll(); });
    foot.appendChild(rr);
    foot.appendChild(el("span", "range-note", "用滑鼠點選或按數字鍵。配件會留在身上，換槍也有效。"));
    cardsEl.appendChild(foot);
    cardsEl.hidden = false;
    ctx.showMsg();
    ctx.unlock();      // 放開滑鼠，才能用游標點卡片；選完會自動再鎖回去
  }
  function doReroll() {
    if (S.state !== "cards" || S.rerolls <= 0) return;
    S.rerolls--;
    showCards(true);
  }
  function afterPick() {
    cardsEl.hidden = true;
    S.wave++;
    S.state = "ready";
    ctx.applyMods();
    paintLoadout(); paintStyles();
    ctx.refill();
    paintHud();
    if (ctx.canPlay()) beginCount();
    else {
      showPanel("第 " + S.wave + " 波準備", ["配件已裝上，彈藥補滿。", "準備好就按下開始。"], "開始第 " + S.wave + " 波", go);
      ctx.requestLock();            // 點選卡片或按鍵都算「使用者操作」，可以直接把滑鼠鎖回去
      if (ctx.canPlay()) beginCount();
    }
  }
  function pick(i) {
    if (S.state !== "cards" || !offered[i]) return;
    const p = offered[i];
    addPart(p);
    if (S.learned.indexOf(p.id) < 0) S.learned.push(p.id);
    if (ctx.soundOn()) { defTone(784, 0.07, "square", 0.06); defTone(1175, 0.1, "square", 0.06, undefined, 0.07); }
    say("裝上：" + p.name, 900);
    afterPick();
  }
  function repair() {
    if (S.state !== "cards") return;
    S.hp = Math.min(S.hpMax, S.hp + 25);
    say("防線修復 +25", 900);
    afterPick();
  }

  // ===== 開始、繼續、結束 =====
  function showPanel(title, lines, btnText, onBtn, extra, btnFirst) {
    panel.replaceChildren();
    const card = el("div", "range-lockcard def-panel");
    card.appendChild(el("h2", "", title));
    lines.forEach(function (t) { card.appendChild(el("p", "", t)); });
    const back = el("a", "back-link", "回到遊戲");
    back.href = "#/games";
    let b = null;
    if (btnText) {
      b = el("button", "btn", btnText);
      b.type = "button";
      b.addEventListener("click", function (e) { e.stopPropagation(); onBtn(); });
    }
    if (btnFirst) { if (b) card.appendChild(b); card.appendChild(back); if (extra) card.appendChild(extra); }
    else { if (extra) card.appendChild(extra); if (b) card.appendChild(b); card.appendChild(back); }
    panel.appendChild(card);
    panel.hidden = false;
    ctx.showMsg();
  }
  // 按下「開始」：先鎖定滑鼠；鎖定成功（或不需要鎖定）後才真的開始
  function go() {
    ctx.requestLock();
    if (ctx.canPlay()) proceed();
  }
  function proceed() {
    if (S.state === "idle") newRun();
    else if (S.state === "ready") beginCount();
  }
  function newRun() {
    S.enemies.forEach(removeEnemy);
    parts.forEach(function (p) { p.node.remove(); }); parts.length = 0;
    meta = defMetaRead();
    Object.assign(S, { wave: 1, hp: 100, score: 0, kills: 0, streak: 0, crits: 0, pellets: 0, hits: 0, bestStreak: 0, picks: {}, layers: {}, learned: [], enemies: [], queue: [], endless: false, focus: 0, focusT: 0, buffUntil: 0, odUntil: 0, xpGain: 0 });
    S.hpMax = 100 + 10 * meta.lv.hp; S.hp = S.hpMax;
    S.rerolls = 1 + meta.lv.reroll;
    for (let n = 0; n < meta.lv.start; n++) {          // 後勤補給：開局先送一個配件
      const pool = defParts.filter(function (p) { return (S.picks[p.id] || 0) < DEF_PART_MAX; });
      const p = pool[Math.floor(Math.random() * pool.length)];
      addPart(p);
      if (S.learned.indexOf(p.id) < 0) S.learned.push(p.id);
    }
    S.state = "ready";
    ctx.applyMods(); ctx.refill(); paintLoadout(); paintStyles(); paintScore(); paintHud();
    beginCount();
  }
  function gameOver() {
    if (S.state === "over") return;
    S.state = "over";
    S.enemies.forEach(removeEnemy); S.enemies = [];
    countEl.hidden = true; cardsEl.hidden = true;
    ctx.releaseFire(); ctx.setAds(false);
    const reached = S.wave;
    const best = defReadBest();
    const gid = ctx.getGunId();
    const prevWave = best.wave || 0, prevScore = best.score || 0;
    const record = reached > prevWave || (reached === prevWave && S.score > prevScore);
    if (reached > prevWave) best.wave = reached;
    if (S.score > prevScore) best.score = S.score;
    best.kills = (best.kills || 0) + S.kills;
    best.guns = best.guns || {};
    const gp = best.guns[gid] || { wave: 0, score: 0 };
    if (reached > gp.wave || (reached === gp.wave && S.score > gp.score)) best.guns[gid] = { wave: reached, score: S.score };
    defWriteBest(best);
    meta = defMetaRead();
    S.xpGain = Math.floor(S.score / 100) + S.kills + reached * 20;
    meta.xp += S.xpGain; defMetaWrite(meta);

    function paintOver() {
    const box = el("div", "range-result-lines");
    const acc = S.pellets ? Math.round(S.hits / S.pellets * 100) : 0;
    [["撐到", "第 " + reached + " 波"], ["得分", String(S.score)], ["獲得 XP", "+" + S.xpGain], ["擊倒", S.kills + " 個（靶心 " + S.crits + "）"], ["命中率", acc + "%"], ["最高連殺", String(S.bestStreak)]].forEach(function (r) {
      const l = el("div", "range-row"); l.appendChild(el("span", "", r[0])); l.appendChild(el("b", "", r[1])); box.appendChild(l);
    });
    const extra = el("div", "def-over");
    extra.appendChild(box);
    if (record) extra.appendChild(el("p", "range-record", prevWave ? "新紀錄！上次最遠第 " + prevWave + " 波" : "第一次紀錄！"));
    if (S.learned.length) {
      extra.appendChild(el("h3", "", "這局學到的術語"));
      const ul = el("ul", "def-learned");
      S.learned.forEach(function (id) {
        const p = defPartById[id];
        const li = el("li");
        li.appendChild(el("b", "", p.name + "（" + p.en + "）"));
        li.appendChild(document.createTextNode("　" + p.term));
        ul.appendChild(li);
      });
      extra.appendChild(ul);
    }
    const entries = Object.keys(best.guns).map(function (id) { const g = guns.find(function (x) { return x.id === id; }); return g ? { name: g.name, wave: best.guns[id].wave, score: best.guns[id].score, me: id === gid } : null; })
      .filter(Boolean).sort(function (a, b) { return b.wave - a.wave || b.score - a.score; }).slice(0, 5);
    if (entries.length > 1) {
      extra.appendChild(el("h3", "", "各槍最遠波數"));
      const ol = el("ol", "range-board");
      entries.forEach(function (e) { ol.appendChild(el("li", e.me ? "me" : "", e.name + "　第 " + e.wave + " 波・" + e.score)); });
      extra.appendChild(ol);
    }
    paintShop();
    showPanel("防線失守", ["用 " + ctx.getW().name + " 撐到第 " + reached + " 波。"], "再來一局", function () { S.state = "idle"; go(); }, extra, true);
    }
    paintOver();
    ctx.unlock();
  }
  // 兵工廠放在賽場下方的獨立區塊，不會擋到開場畫面
  const shopBox = el("section", "range-panel def-shopbox");
  function paintShop() { shopBox.replaceChildren(buildShop(paintShop)); }
  // 兵工廠：用 XP 買永久升級
  function buildShop(onChange) {
    meta = defMetaRead();
    const box = el("div", "def-shop");
    box.appendChild(el("h3", "", "兵工廠（永久升級）　XP：" + meta.xp));
    defShop.forEach(function (u) {
      const lv = meta.lv[u.id] || 0;
      const row = el("div", "def-shop-row");
      row.appendChild(el("b", "", u.name + " " + lv + "/" + u.max));
      row.appendChild(el("span", "", u.desc));
      const b = el("button", "map-chip", lv >= u.max ? "已滿級" : "升級 " + u.cost[lv] + " XP");
      b.type = "button";
      b.disabled = lv >= u.max || meta.xp < u.cost[lv];
      b.addEventListener("click", function (e) { e.stopPropagation(); meta.xp -= u.cost[lv]; meta.lv[u.id] = lv + 1; defMetaWrite(meta); onChange(); });
      row.appendChild(b);
      box.appendChild(row);
    });
    return box;
  }

  // ===== 每一幀 =====
  function tick(now, rdt) {
    const real = Math.min(0.05, rdt / 1000);
    clock += real;
    stepParts(real);
    // 敵人受擊的閃白與擠壓，不受暫停影響也沒關係
    S.enemies.forEach(function (e) {
      if (e.flash > 0) { e.flash -= real; if (e.flash <= 0) e.node.classList.remove("is-flash"); }
      if (e.jolt > 0) e.jolt = Math.max(0, e.jolt - real * 8);
    });
    if (rel) rfill.style.width = Math.min(100, (performance.now() - rel.t0) / rel.ms * 100) + "%";
    if (S.focus > 0 && clock - S.focusT > 1.5) { S.focus--; S.focusT = clock; paintStyles(); }
    if (S.state === "count") {
      if (!ctx.canPlay()) return;
      S.countLeft -= real;
      if (S.countLeft <= 0) startWaveRun();
      else {
        const n = String(Math.ceil(S.countLeft));
        if (countEl.textContent !== n) { countEl.textContent = n; if (ctx.soundOn()) defTone(440, 0.08, "square", 0.05); }
      }
      return;
    }
    if (S.state !== "run" && S.state !== "clearing") return;
    if (!ctx.canPlay()) return;           // 滑鼠被放開＝暫停
    let dt = real;
    if (S.hitstop > 0) { S.hitstop -= real; dt = 0; }
    else if (S.slow > 0) { S.slow -= real; dt = real * 0.3; }
    if (S.streak && clock - S.streakAt > 4) { S.streak = 0; paintScore(); }
    if (S.focus !== S.lastFocus || (clock < S.buffUntil) !== S.lastBuff || (clock < S.odUntil) !== S.lastOd) { S.lastFocus = S.focus; S.lastBuff = clock < S.buffUntil; S.lastOd = clock < S.odUntil; paintStyles(); }
    if (S.state === "run") S.t += dt;
    const spd = Math.min(1.9, 1 + 0.05 * (S.wave - 1));
    while (S.state === "run" && S.queue.length && S.queue[0].at <= S.t) { const q = S.queue.shift(); spawn(q.kind, q.lane); }
    // 用快照走訪：中途有敵人被炸死、被擊殺時，不會讀到已經不在清單裡的敵人
    S.enemies.slice().forEach(function (e) {
      if (S.enemies.indexOf(e) < 0) return;
      if (e.mark > 0) e.mark -= dt;
      if (e.burnT > 0) {
        e.burnT -= dt;
        e.hp -= e.burn * dt;
        e.fill.style.width = Math.max(0, e.hp / e.max * 100) + "%"; e.bar.hidden = false;
        if (e.hp <= 0) { kill(e, false); return; }
      }
      e.d -= e.k.speed * spd * dt;
      // 腳步與輪子、旋翼：輪流顯示兩個動作
      const f = Math.floor(clock * 4 * (e.k.speed / 0.037 + 0.6) + e.phase) % 2;
      e.frames[0].style.display = f ? "none" : ""; e.frames[1].style.display = f ? "" : "none";
      if (e.kind === "boss") {
        e.minionAt -= dt;
        if (e.minionAt <= 0 && S.state === "run") { e.minionAt = 5; spawn("walker", e.lane + (Math.random() - 0.5) * 2, e.d); ctx.shake(3); }
      }
      if (e.d <= 1.05) { reachBase(e); return; }
      placeEnemy(e);
    });
    // 雷達上的視野框
    const cam = ctx.getCam(), z = ctx.getZoom();
    const viewW = field.clientWidth / z;
    radarView.style.width = Math.min(100, viewW / 1280 * 100) + "%";
    radarView.style.left = Math.max(0, Math.min(100, ((cam.x + ctx.getRx()) / 640 + 1) * 50)) + "%";
    if (S.state === "run") {
      paintHud();
      if (!S.queue.length && !S.enemies.length) clearWave();
    }
  }

  // 鎖定狀態改變：鎖定成功時，開始或繼續
  function lockChanged(locked) {
    if (locked) proceed();
  }
  function onKey(e) {
    if (S.state === "cards") {
      if (e.key >= "1" && e.key <= String(offered.length)) { pick(Number(e.key) - 1); return true; }
      if (e.key === String(offered.length + 1)) { repair(); return true; }
      if (e.key === "r" || e.key === "R") { doReroll(); return true; }
    }
    return false;
  }
  function destroy() {
    timers.forEach(clearTimeout);
    parts.forEach(function (p) { p.node.remove(); });
  }

  // 一開始的說明卡
  function showIntro() {
    showPanel("防線",
      ["擋住一波波敵人。打中身上的圓形靶心，傷害 ×3。",
       "左鍵開火　右鍵開鏡　R 裝填　滾輪換槍　Esc 暫停"],
      "開始", go, null, true);
  }
  showIntro();
  paintShop(); paintHud(); paintLoadout();

  return {
    panel: loadout,
    shop: shopBox,
    mod: mod,
    say: say,
    onFire: onFire,
    onReloaded: onReloaded,
    reloadStart: reloadStart,
    reloadEnd: reloadEnd,
    activeReload: activeReload,
    hit: hit,
    tick: tick,
    key: onKey,
    lockChanged: lockChanged,
    destroy: destroy,
    // 目前是不是「進行中」：進行中不能換槍，也只有這時候開火有效
    active: function () { return S.state === "run"; },
    busy: function () { return S.state === "run" || S.state === "count" || S.state === "clearing"; },
    // 面板由防線自己管理時，試射場原本的「已暫停」卡片要讓開
    owns: function () { return S.state !== "run" && S.state !== "count"; },
    blockFire: function () { return S.state !== "run"; }
  };
}
