/* ============================================================
   showcase.js：3D 展示頁
   六種槍種的「示意」模型，用圓點雲組成，可以拖曳旋轉、滑過零件查看名稱、分解。
   不使用任何外部函式庫、也不讀圖片，所以雙擊 index.html 預覽也能運作。
   模型是用方塊與圓柱堆出來的簡化形狀，只表示各槍種的大致構造，不是精確尺寸。
   座標：x 沿槍管（槍口在 +x）、y 向上、z 向側面。單位約等於公分。
   ============================================================ */

/* ---------- 模型零件 ---------- */
const SHOW_MODELS = (function () {
  const B = function (cx, cy, sx, sy, sz, rot, cz) { return { k: "b", cx: cx, cy: cy, cz: cz || 0, sx: sx, sy: sy, sz: sz, rot: rot || 0 }; };
  const C = function (x0, x1, cy, r0, r1, cz) { return { k: "c", x0: x0, x1: x1, cy: cy, cz: cz || 0, r0: r0, r1: r1 === undefined ? r0 : r1 }; };
  // 彎曲的彈匣：沿著一段弧線堆疊小方塊（start 為起點，ang 為起始角度，bend 為每段轉的角度）
  function arc(px, py, ang, bend, n, len, w, d) {
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push(B(px + Math.sin(ang) * len / 2, py - Math.cos(ang) * len / 2, w, len * 1.04, d, ang));
      px += Math.sin(ang) * len; py -= Math.cos(ang) * len; ang += bend;
    }
    return out;
  }
  const P = function (name, en, desc, prims) { return { name: name, en: en, desc: desc, prims: prims }; };

  return {
    hg: {
      gap: 0.5,
      parts: [
        P("滑套", "Slide", "包住槍管上方的金屬外殼，射擊後會往後滑動，把空彈殼退出並重新上膛。", [B(0, 4.6, 19, 3, 2.8)]),
        P("槍管", "Barrel", "子彈通過的管子，內部有膛線讓子彈旋轉。", [C(8.5, 11.2, 4.6, 0.65)]),
        P("槍身", "Frame", "整把槍的骨架，連接握把、扳機與滑套。", [B(-1, 2.5, 15, 1.7, 2.6)]),
        P("握把", "Grip", "用手握住的部分，彈匣通常插在裡面，裡面可以容納十幾發子彈。", [B(-6.4, -3.3, 4.4, 11, 3, -0.2)]),
        P("扳機與護圈", "Trigger", "扣下扳機就會擊發；前面的護圈避免意外碰到。", [B(-1.2, -0.9, 5.6, 0.5, 1.6), B(1.4, 0.2, 0.5, 2.2, 1.6), B(-2.4, 1.1, 0.6, 2.2, 0.8, 0.25)]),
        P("照門與準星", "Sights", "後面的缺口與前面的凸點對齊，用來瞄準。", [B(-8.2, 6.5, 0.9, 0.9, 1.8), B(8.2, 6.5, 0.9, 0.9, 0.9)])
      ]
    },
    smg: {
      gap: 0.95,
      parts: [
        P("機匣", "Receiver", "容納槍機與擊發機構的主體，衝鋒槍多用開放式槍機，結構簡單。", [B(0, 0, 30, 6, 5)]),
        P("護管與槍管", "Barrel", "發射手槍彈的短槍管，外面包著護管，讓握持更穩。", [C(15, 30, 1.2, 2.2), C(30, 35, 1.2, 0.8)]),
        P("彎曲彈匣", "Magazine", "彎曲的長彈匣，容納三十發左右的手槍彈，這也是衝鋒槍最明顯的外觀。", arc(1, -3, 0, 0.13, 5, 5, 3.2, 2.4)),
        P("握把", "Grip", "手槍式握把，單手也能控制。", [B(-9, -6.5, 3.8, 11, 3.2, -0.25)]),
        P("前握把", "Foregrip", "輔助手握持的位置，連發時比較好壓住槍口。", [B(15, -3.6, 2.8, 4.4, 2.8)]),
        P("伸縮槍托", "Stock", "用鐵線做的可折疊槍托，攜帶時收起，射擊時抵肩。", [B(-22, 0.6, 14, 0.8, 0.8, 0, 2.4), B(-22, 0.6, 14, 0.8, 0.8, 0, -2.4), B(-29.4, 0, 0.8, 6, 5.6)]),
        P("瞄具", "Sights", "簡單的機械瞄具，因為交戰距離較近，不需要太精密。", [B(-12, 3.8, 1.6, 1.8, 2.4), B(26, 3.9, 1, 2, 1)]),
        P("槍機", "Bolt", "機匣裡來回滑動的零件，負責推彈、擊發與拉出空彈殼；從拋殼口可以看到它。", [B(2, 1, 9, 3.4, 0.9, 0, 3)])
      ]
    },
    ar: {
      gap: 1.05,
      parts: [
        P("上機匣", "Upper receiver", "容納槍機與槍管根部，上方的軌道可以裝瞄準鏡。", [B(-3, 2, 24, 5.5, 4.2)]),
        P("下機匣", "Lower receiver", "裝著扳機組、握把與彈匣插槽，在法律上常被視為「槍」本體。", [B(-4, -2.6, 20, 4.2, 4), B(-4, -5.4, 5, 0.5, 1.6)]),
        P("護木", "Handguard", "包住槍管的外殼，避免手被燙到，現代款式也能掛配件。", [C(8, 32, 1.9, 3.2)]),
        P("槍管", "Barrel", "發射中間型步槍彈的槍管，比手槍長很多，所以子彈更快、更遠。", [C(32, 50, 1.9, 0.9)]),
        P("槍口裝置", "Muzzle device", "控制槍口跳動或減少火焰的裝置。", [C(50, 55, 1.9, 1.5)]),
        P("準星與照門", "Sights", "前方的準星與後方的照門，構成基本瞄準線。", [B(41, 4.2, 1.6, 4.4, 0.8), B(-12, 5.8, 6, 1.6, 2)]),
        P("彈匣", "Magazine", "略微彎曲的盒狀彈匣，常見容量為三十發。", arc(-3, -4.6, 0.05, 0.06, 5, 5, 3.2, 2.8)),
        P("握把", "Pistol grip", "手握的位置，向後傾斜讓手腕比較自然。", [B(-12.5, -8, 3.8, 10, 3.4, -0.45)]),
        P("槍托", "Stock", "抵在肩膀上吸收後座力，內有緩衝器。", [C(-15, -29, 1.2, 1.8), B(-28, 0.2, 16, 7, 3.6)]),
        P("槍機", "Bolt carrier", "被氣體推動的零件，往後退時會旋轉解鎖、拉出空殼，回來時帶進下一發。", [B(-1, 2.2, 8, 3.4, 0.9, 0, 2.5)])
      ]
    },
    rf: {
      gap: 1.25,
      parts: [
        P("槍管", "Barrel", "又長又重的槍管讓子彈穩定加速，是遠距離精準度的關鍵。", [C(-5, 56, 3.1, 0.95, 0.8)]),
        P("機匣", "Receiver", "包住槍機的部分，槍機要手動前後推拉才能退殼、上膛。", [B(-6, 3, 14, 3.4, 3.2)]),
        P("槍機拉柄", "Bolt handle", "上膛時要把它抬起、向後拉、再推回，這是栓動步槍的特色。", [B(-9, 3.2, 0.8, 0.8, 3.5, 0, 3.2), B(-9, 3.2, 1.8, 1.8, 1.8, 0, 5.3)]),
        P("瞄準鏡", "Scope", "放大目標的光學瞄準器，遠距離射擊必備。", [C(-12, 8, 8, 1.5), C(8, 13, 8, 1.5, 2.3), C(-17, -12, 8, 2.2, 1.5), B(-8, 5.7, 1, 3, 1.4), B(2, 5.7, 1, 3, 1.4)]),
        P("木質槍托", "Stock", "傳統的木製槍托，包住槍管下方並抵在肩上。", [B(21, 1.4, 52, 3.2, 3.6), B(-33, -0.6, 36, 7.2, 3.6, 0.12), B(-15, -3, 5, 8, 3.2, -0.5)]),
        P("彈匣", "Magazine", "栓動步槍的彈匣通常藏在槍身下方，只裝幾發。", [B(-4, -1.3, 7, 2, 2.8), B(-10, -2, 6, 0.4, 1.6)])
      ]
    },
    mg: {
      gap: 1.15,
      parts: [
        P("機匣", "Receiver", "又長又厚，能承受連續射擊的熱與震動。", [B(-5, 1, 36, 8, 6), B(-2, 5.3, 18, 1.6, 5)]),
        P("槍管", "Barrel", "長而重的槍管，連續射擊時會很燙。", [C(13, 56, 3.1, 1.1), C(56, 60, 3.1, 1.6)]),
        P("散熱護套", "Heat shield", "包在槍管外的護套，避免高溫燙到手。", [C(14, 40, 3.1, 2.5)]),
        P("彈藥盒", "Ammo box", "裝著彈鏈，子彈一發接一發被送進槍膛，所以能長時間連續射擊。", [B(-2, -8.2, 14, 9, 9)]),
        P("兩腳架", "Bipod", "架在地面，讓機槍更穩定，這是它與步槍的一大差別。", [B(34, 0.2, 1.8, 1.6, 6), B(35.9, -5.5, 0.8, 12, 0.8, 0.3, 3), B(35.9, -5.5, 0.8, 12, 0.8, 0.3, -3)]),
        P("握把", "Grip", "手槍式握把，扳機在握把前方。", [B(-14, -6.4, 4, 10, 3.4, -0.3)]),
        P("提把", "Carry handle", "方便搬運，也能在槍管過熱時更換槍管。", [B(27, 7.2, 12, 1, 1.4), B(21, 5.2, 1, 3.6, 1.4), B(33, 5.2, 1, 3.6, 1.4)]),
        P("照門", "Rear sight", "後方的瞄準裝置。", [B(-6, 6.8, 2, 2, 2.4)]),
        P("槍托", "Stock", "抵肩的部位，用來吸收連射的後座力。", [B(-36, 0, 26, 8, 4)]),
        P("槍機", "Bolt", "往復運動的零件，每一次來回就送出一發彈鏈中的子彈並拉出空殼。", [B(-3, 2, 10, 4, 0.9, 0, 3.5)])
      ]
    },
    sg: {
      gap: 1.15,
      parts: [
        P("槍管", "Barrel", "口徑較大的平滑槍管，發射內含多顆小彈丸的霰彈。", [C(-5, 60, 3.1, 1.1), C(60, 63, 3.1, 1.1, 1.35)]),
        P("管狀彈倉", "Tube magazine", "在槍管下方的細管，霰彈一顆顆排成一列。", [C(0, 52, 0.2, 0.95)]),
        P("滑動護木", "Pump forearm", "來回拉動它就能退殼、上膛，這是泵動霰彈槍的特色。", [C(10, 32, 0.2, 2.3)]),
        P("機匣", "Receiver", "容納槍機與擊發機構，旁邊有拋殼口。", [B(-8, 1.5, 18, 6, 3.6), B(-12, -2.2, 6, 0.4, 1.6)]),
        P("槍托", "Stock", "較厚的槍托，抵肩吸收霰彈的後座力。", [B(-34, -0.5, 30, 8, 3.6, 0.15), B(-18, -1.6, 5, 8, 3.2, -0.4)]),
        P("準星", "Bead sight", "槍口上的小圓點，近距離只要大致對準就好。", [B(58, 4.5, 0.9, 0.9, 0.9)])
      ]
    }
  };
})();

/* ---------- 配件（可以開關，開啟後會長在模型上） ---------- */
const SHOW_ACC = (function () {
  const B = function (cx, cy, sx, sy, sz, rot, cz) { return { k: "b", cx: cx, cy: cy, cz: cz || 0, sx: sx, sy: sy, sz: sz, rot: rot || 0 }; };
  const C = function (x0, x1, cy, r0, r1, cz) { return { k: "c", x0: x0, x1: x1, cy: cy, cz: cz || 0, r0: r0, r1: r1 === undefined ? r0 : r1 }; };
  const T = {
    sup:   ["消音器", "Suppressor", "裝在槍口，讓氣體慢慢釋放，降低槍聲與火光，也稍微減少後座力。", "變長變重，槍口前端更沉；用過之後很燙。它只是把聲音變小，不是電影裡的「噗噗」聲。"],
    dot:   ["紅點瞄具", "Red dot", "把一個紅點投影在鏡片上，眼睛不用對齊照門與準星，瞄準更快。", "沒有放大倍率，遠距離不好用；需要電池。"],
    light: ["戰術燈", "Weapon light", "照亮暗處的目標，強光也能短暫讓對方睜不開眼。", "開燈會暴露自己的位置；增加重量與電池。"],
    fg:    ["前握把", "Foregrip", "給前手固定的握點，連發時更好壓住槍口。", "增加長度；握法不對時反而不好操作。"],
    ext:   ["擴充彈匣底板", "Mag extension", "把握把底部加長，多裝幾發子彈，也讓小指有地方放。", "增加重量與長度；穿著衣物時容易勾到。"],
    bipod: ["兩腳架", "Bipod", "架在地面，趴射時更穩，遠距離的精準度更好。", "只適合固定位置射擊；增加重量，機動性下降。"],
    cheek: ["貼腮墊", "Cheek rest", "墊高臉頰，讓眼睛每次都對準瞄準鏡中心。", "只對裝了瞄準鏡的人有幫助；多一點重量。"],
    tube:  ["延長彈倉管", "Extended tube", "把管狀彈倉加長，多裝幾發霰彈。", "槍管前端變重，影響平衡。"],
    saddle:["槍托彈套", "Stock shell holder", "把備用霰彈掛在槍托側面，不用翻彈藥袋就能補彈。", "槍托變厚；彈殼露在外面容易沾灰。"]
  };
  const A = function (k, prims) { return { id: k, name: T[k][0], en: T[k][1], desc: T[k][2], trade: T[k][3], prims: prims }; };
  return {
    hg:  [A("sup", [C(11.2, 22, 4.6, 1.5)]), A("dot", [B(0, 6.7, 4, 0.6, 2.2), B(0, 8, 4.6, 2, 2.4)]), A("light", [B(7.5, 0.7, 4.5, 2.2, 2.4)]), A("ext", [B(-7.5, -10, 4.8, 3, 3.6, -0.2)])],
    smg: [A("sup", [C(35, 52, 1.2, 2)]), A("dot", [B(-2, 3.4, 5, 0.8, 3), B(-2, 5, 4.6, 2.4, 2.8)]), A("light", [B(24, -2.5, 5, 2.2, 2.2)])],
    ar:  [A("sup", [C(55, 72, 1.9, 2.2)]), A("dot", [B(-3, 5.2, 6, 0.8, 3), B(-3, 6.8, 7, 2.6, 3.2)]), A("fg", [B(25, -3.8, 2.6, 4.8, 2.6)]), A("light", [B(31, 1.9, 6, 2.2, 2.2, 0, 4.3)])],
    rf:  [A("sup", [C(56, 72, 3.1, 1.6)]), A("bipod", [B(38, -1, 1.8, 1.6, 5), B(39.6, -6.3, 0.8, 11, 0.8, 0.3, 3), B(39.6, -6.3, 0.8, 11, 0.8, 0.3, -3)]), A("cheek", [B(-28, 4.3, 10, 1.2, 3.2, 0.12)])],
    mg:  [A("sup", [C(60, 78, 3.1, 2.4)]), A("dot", [B(-4, 6.5, 6, 0.6, 3), B(-4, 8.1, 6, 2.6, 3.2)]), A("fg", [B(24, -2.6, 2.6, 6, 2.6)])],
    sg:  [A("tube", [C(52, 59, 0.2, 0.95), B(59.5, 0.2, 1, 2.2, 2.2)]), A("dot", [B(-8, 4.9, 5, 0.8, 2.4), B(-8, 6.3, 5, 2, 2.6)]), A("light", [B(40, -1.9, 5, 2, 2)]), A("saddle", [B(-30, -0.2, 10, 3, 0.8, 0.15, 2.2)])]
  };
})();

/* ---------- 把方塊與圓柱取樣成圓點 ---------- */
function showSamplePart(part, g) {
  const pts = [];
  const push = function (x, y, z, nx, ny, nz) { pts.push({ x: x, y: y, z: z, nx: nx, ny: ny, nz: nz }); };
  part.prims.forEach(function (p) {
    if (p.k === "b") {
      const cs = Math.cos(p.rot), sn = Math.sin(p.rot);
      const put = function (lx, ly, lz, nx, ny, nz) {
        push(p.cx + lx * cs - ly * sn, p.cy + lx * sn + ly * cs, p.cz + lz, nx * cs - ny * sn, nx * sn + ny * cs, nz);
      };
      const dims = [p.sx, p.sy, p.sz];
      for (let axis = 0; axis < 3; axis++) {
        const a1 = (axis + 1) % 3, a2 = (axis + 2) % 3;
        const n1 = Math.max(1, Math.round(dims[a1] / g)), n2 = Math.max(1, Math.round(dims[a2] / g));
        for (let side = -1; side <= 1; side += 2) {
          for (let i = 0; i < n1; i++) for (let j = 0; j < n2; j++) {
            const q = [0, 0, 0], nn = [0, 0, 0];
            q[axis] = side * dims[axis] / 2;
            q[a1] = ((i + 0.5) / n1 - 0.5) * dims[a1];
            q[a2] = ((j + 0.5) / n2 - 0.5) * dims[a2];
            nn[axis] = side;
            put(q[0], q[1], q[2], nn[0], nn[1], nn[2]);
          }
        }
      }
    } else {
      const L = p.x1 - p.x0, nx = Math.max(1, Math.round(Math.abs(L) / g));
      for (let i = 0; i < nx; i++) {
        const t = (i + 0.5) / nx, x = p.x0 + L * t, r = p.r0 + (p.r1 - p.r0) * t;
        const na = Math.max(6, Math.round(6.2832 * r / g));
        for (let k = 0; k < na; k++) {
          const a = (k + (i % 2) * 0.5) / na * 6.2832;
          push(x, p.cy + Math.cos(a) * r, p.cz + Math.sin(a) * r, 0, Math.cos(a), Math.sin(a));
        }
      }
      [[p.x0, p.r0, p.x0 < p.x1 ? -1 : 1], [p.x1, p.r1, p.x0 < p.x1 ? 1 : -1]].forEach(function (e) {
        for (let r = g * 0.6; r <= e[1] + 0.001; r += g) {
          const na = Math.max(5, Math.round(6.2832 * r / g));
          for (let k = 0; k < na; k++) {
            const a = k / na * 6.2832;
            push(e[0], p.cy + Math.cos(a) * r, p.cz + Math.sin(a) * r, e[2], 0, 0);
          }
        }
        if (e[1] < g * 0.6) push(e[0], p.cy, p.cz, e[2], 0, 0);
      });
    }
  });
  return pts;
}

/* ---------- 射擊循環：哪些零件會動、動多少、拋殼位置、槍口位置（座標與上面的模型相同） ---------- */
const SHOW_CYCLE = {
  hg:  { move: [{ i: 0 }, { i: 5 }, { acc: "dot" }], dx: -4.2, port: [2, 6.2, 1.4], muzzle: [12, 4.6, 0], sup: 10.8, v: [-6, 8, 14],
         ph: [["擊發", "扣下扳機，擊針打擊底火，子彈被推出槍管。"], ["後座・退殼", "火藥氣體把滑套往後推，空彈殼從側邊被拋出。"], ["復進・上膛", "彈簧把滑套推回，同時從彈匣帶出下一發進入槍膛。"], ["待機", "回到原位，可以再次擊發。"]] },
  smg: { move: [{ i: 7 }], dx: -8, port: [2, 2, 2.5], muzzle: [35, 1.2, 0], sup: 17, v: [-8, 10, 16],
         ph: [["擊發", "槍機往前衝到底，擊針撞擊底火。"], ["後座・退殼", "氣體把槍機推向後方，空彈殼被拋出。"], ["復進・上膛", "彈簧把槍機推回，從彈匣帶出下一發。"], ["待機", "槍機停在原位，準備再次擊發。"]] },
  ar:  { move: [{ i: 9 }], dx: -6, port: [-2, 2.5, 2.2], muzzle: [55, 1.9, 0], sup: 17, v: [-8, 10, 16],
         ph: [["擊發", "子彈離開槍管，一部分氣體經導氣管推向槍機。"], ["後座・退殼", "槍機被往後推，旋轉解鎖並拉出空彈殼。"], ["復進・上膛", "復進彈簧把槍機推回，帶入下一發。"], ["待機", "鎖好，準備再次擊發。"]] },
  rf:  { move: [{ i: 2 }], dx: -7, port: [-6, 4.5, 2], muzzle: [56, 3.1, 0], sup: 16, v: [-8, 8, 14],
         ph: [["擊發", "扣下扳機擊發，接下來全靠手動操作。"], ["手動後拉・退殼", "抬起拉柄往後拉，空彈殼被拋出。"], ["推回・上膛", "向前推、壓下拉柄，下一發進入膛室。"], ["待機", "鎖好，準備再次射擊。"]] },
  mg:  { move: [{ i: 9 }], dx: -9, port: [-3, 2, 3.2], muzzle: [60, 3.1, 0], sup: 18, v: [-8, 10, 16],
         ph: [["擊發", "子彈從彈鏈送進槍膛並擊發。"], ["後座・退殼", "氣體推動槍機後退，空彈殼被拋出。"], ["復進・上膛", "槍機回位，同時拉進下一發。"], ["待機", "持續扣著扳機就會不斷重複這個循環。"]] },
  sg:  { move: [{ i: 2 }], dx: -9, port: [-8, 3, 2], muzzle: [63, 3.1, 0], sup: 0, v: [-8, 10, 16],
         ph: [["擊發", "霰彈擊發，一群小彈丸同時射出。"], ["後拉護木・退殼", "手動把護木往後拉，空的彈殼被拋出。"], ["推回・上膛", "推回護木，下一發霰彈進入膛室。"], ["待機", "鎖好，準備再次擊發。"]] }
};
// 動作曲線：0 = 原位，1 = 退到最後。擊發 → 退到底 → 推回原位 → 待機
function showCycleCurve(t) {
  const ease = function (x) { return x * x * (3 - 2 * x); };
  if (t < 0.05) return 0;
  if (t < 0.35) return ease((t - 0.05) / 0.3);
  if (t < 0.7) return 1 - ease((t - 0.35) / 0.35);
  return 0;
}
function showPhaseIndex(t) { return t < 0.05 ? 0 : (t < 0.35 ? 1 : (t < 0.7 ? 2 : 3)); }

/* 組出整個模型：置中、算每個零件的分解方向 */
function showBuild(typeId) {
  const m = SHOW_MODELS[typeId];
  const parts = m.parts.map(function (p, i) {
    return { idx: i, name: p.name, en: p.en, desc: p.desc, pts: showSamplePart(p, m.gap), off: [0, 0, 0], acc: false };
  });
  (SHOW_ACC[typeId] || []).forEach(function (a) {
    parts.push({ idx: parts.length, name: a.name, en: a.en, desc: a.desc, trade: a.trade, pts: showSamplePart(a, m.gap), off: [0, 0, 0], acc: true, aid: a.id, on: false, t: 0 });
  });
  const nBase = m.parts.length;
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  parts.forEach(function (p) { if (p.acc) return; p.pts.forEach(function (q) { x0 = Math.min(x0, q.x); x1 = Math.max(x1, q.x); y0 = Math.min(y0, q.y); y1 = Math.max(y1, q.y); }); });
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const total = [];
  parts.forEach(function (p) {
    let mx = 0, my = 0, mz = 0;
    p.pts.forEach(function (q) { q.x -= cx; q.y -= cy; mx += q.x; my += q.y; mz += q.z; });
    const n = p.pts.length || 1;
    p.c = [mx / n, my / n, mz / n];
    // 分解：從模型中心往零件中心的方向推開，並額外往上或往下，讓重疊的零件也分得開
    const lift = (p.c[1] >= 0 ? 1 : -1) * 3 + (p.idx % 2 ? 3 : -1);
    p.off = [p.c[0] * 0.3, p.c[1] * 0.5 + lift, p.c[2] * 1.2 + ((p.idx % 3) - 1) * 2];
    p.pts.forEach(function (q) {
      q.part = p.idx;
      q.rx = (Math.random() * 2 - 1) * 38; q.ry = (Math.random() * 2 - 1) * 38; q.rz = (Math.random() * 2 - 1) * 38;
      q.dl = Math.random() * 0.25 + (q.x + 60) / 120 * 0.35;
      total.push(q);
    });
  });
  let rxz = 1, ry = 1, rxzE = 1, ryE = 1;
  total.forEach(function (q) {
    const o = parts[q.part].off;
    rxz = Math.max(rxz, Math.hypot(q.x, q.z)); ry = Math.max(ry, Math.abs(q.y));
    rxzE = Math.max(rxzE, Math.hypot(q.x + o[0], q.z + o[2])); ryE = Math.max(ryE, Math.abs(q.y + o[1]));
  });
  return { cx: cx, cy: cy, parts: parts, nBase: nBase, pts: total, rxz: rxz, ry: ry, rxzE: rxzE, ryE: ryE, gap: m.gap };
}

/* ---------- 畫面 ---------- */
let showType = "hg";
let showSession = 0;

function renderShowcase(typeId) {
  const body = document.getElementById("showcase-body");
  if (!body) return;
  if (typeId && SHOW_MODELS[typeId]) showType = typeId;
  const my = ++showSession;
  body.replaceChildren();
  const no = function (n) { return String(n).padStart(2, "0"); };

  const lab = el("div", "bullet-lab show-lab");
  const tip = el("p", "show-note", "模型是簡化的示意形狀，不是精確尺寸。");
  const chips = el("div", "map-chips lab-chips");
  const cv = document.createElement("canvas");
  cv.className = "lab-canvas show-canvas";
  cv.setAttribute("role", "img");
  const info = el("div", "lab-info show-info");
  const list = el("div", "map-chips show-parts");
  const tools = el("div", "map-chips show-tools");
  const btnExp = el("button", "map-chip", "分解");
  btnExp.type = "button"; btnExp.setAttribute("aria-pressed", "false");
  const btnReset = el("button", "map-chip", "重設視角");
  btnReset.type = "button";
  const link = el("a", "map-chip", "");
  const accRow = el("div", "map-chips show-acc");
  tools.append(btnExp, btnReset, link);
  const cyc = el("div", "show-cycle");
  const btnCyc = el("button", "map-chip", "射擊循環");
  btnCyc.type = "button"; btnCyc.setAttribute("aria-pressed", "false");
  const slider = document.createElement("input");
  slider.type = "range"; slider.min = "0"; slider.max = "1000"; slider.value = "0"; slider.className = "show-slider";
  slider.setAttribute("aria-label", "射擊循環進度，拖動可以一格一格看");
  const phaseTxt = el("p", "show-phase", "");
  cyc.append(btnCyc, slider, phaseTxt);
  // 版面：上面是槍種切換；下面左邊是模型與射擊循環，右邊是說明與控制（手機會變成上下排）
  const grid = el("div", "show-grid");
  const stage = el("div", "show-stage");
  const side = el("div", "show-side");
  stage.append(cv, cyc);
  side.append(info, el("p", "show-label", "零件"), list, accRow, tools);
  grid.append(stage, side);
  lab.append(chips, grid, tip);
  body.appendChild(lab);

  const reduced = reduceMotion();
  let model = null, ctx = null, W = 0, H = 0;
  let phase = 0, playing = false, cycView = false, lastPhaseIdx = -1;
  let tr = { ca: 1, sa: 0, cb: 1, sb: 0, scale: 1, cx: 0, cy: 0 };
  let yaw = -0.55, pitch = 0.16, explode = 0, explodeTarget = 0, built = reduced ? 1 : 0;
  let hover = -1, lock = -1, dragging = false, moved = 0, lastX = 0, lastY = 0, mx = -999, my2 = -999;
  let colors = { ink: "#17303F", signal: "#D9C45A", paper: "#EDF0EE", t: 0 };
  let proj = [];
  const chipBtns = {}, accBtns = {};

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    colors.ink = cs.getPropertyValue("--ink").trim() || colors.ink;
    colors.paper = cs.getPropertyValue("--paper").trim() || colors.paper;
    colors.signal = cs.getPropertyValue("--signal").trim() || colors.signal;
    colors.font = cs.getPropertyValue("--font-body").trim() || "sans-serif";
  }

  function active() { return lock >= 0 ? lock : hover; }

  // 把第 a 個零件的說明放進說明框（a = -1 是預設的提示）
  function fillInfo(a) {
    info.replaceChildren();
    if (a < 0) {
      const t = gunTypes.find(function (x) { return x.id === showType; });
      const r = el("p", "lab-read");
      r.append(el("b", "", t.code), el("span", "", t.name + "　" + no(model.nBase) + " PARTS"));
      info.append(r, el("p", "show-hint", window.matchMedia("(pointer: coarse)").matches ? "點模型上的零件，或從下方挑一個。" : "滑到零件上，或從下方挑一個零件。"));
    } else {
      const p = model.parts[a];
      const r = el("p", "lab-read");
      r.append(el("b", "", (p.acc ? "ACC " + no(a - model.nBase + 1) : "PART " + no(a + 1))), el("span", "", p.name + "　" + p.en));
      info.append(r, el("p", "lab-diff", p.desc));
      if (p.trade) info.append(el("p", "show-trade", "取捨：" + p.trade));
    }
  }
  // 說明框固定成「最長那一段說明」的高度，這樣滑過按鈕時下面的按鈕不會被擠下去
  function fitInfo() {
    if (!model || !info.isConnected) return;
    info.style.minHeight = "";
    // 只有電腦（有滑鼠、左右版面）才需要固定高度；手機是用點的，不會因為滑過而跳動，就不留空白
    if (!window.matchMedia("(hover: hover) and (min-width: 901px)").matches) { setInfo(); return; }
    let max = 0;
    for (let i = -1; i < model.parts.length; i++) { fillInfo(i); max = Math.max(max, info.offsetHeight); }
    info.style.minHeight = max + "px";
    setInfo();
  }
  function setInfo() {
    fillInfo(active());
    Object.keys(chipBtns).forEach(function (k) { chipBtns[k].setAttribute("aria-pressed", String(+k === lock)); chipBtns[k].classList.toggle("is-hover", +k === hover && +k !== lock); });
    Object.keys(accBtns).forEach(function (k) {
      const on = model.parts[+k].on;
      accBtns[k].setAttribute("aria-pressed", String(on));
      accBtns[k].classList.toggle("is-hover", on && +k === hover);
    });
  }

  function setPhaseText() {
    const c = SHOW_CYCLE[showType];
    if (!c) { phaseTxt.textContent = ""; return; }
    phaseTxt.replaceChildren();
    if (!cycView && !playing) { phaseTxt.append(el("span", "", "按「射擊循環」播放，或拖動滑桿一格一格看。")); return; }
    const i = showPhaseIndex(phase);
    phaseTxt.append(el("b", "", "0" + (i + 1) + " " + c.ph[i][0]), el("span", "", c.ph[i][1]));
    lastPhaseIdx = i;
  }
  function moveRefs() {
    // 把設定裡的零件（序號或配件代號）換成實際的零件物件
    const c = SHOW_CYCLE[showType], out = [];
    if (!c) return out;
    c.move.forEach(function (m) {
      const p = m.acc ? model.parts.find(function (x) { return x.aid === m.acc; }) : model.parts[m.i];
      if (p) out.push(p);
    });
    return out;
  }

  function load(id) {
    showType = id;
    model = showBuild(id);
    built = reduced ? 1 : 0; hover = -1; lock = -1;
    phase = 0; playing = false; cycView = false; slider.value = "0"; btnCyc.setAttribute("aria-pressed", "false"); lastPhaseIdx = -1; setPhaseText();
    const t = gunTypes.find(function (x) { return x.id === id; });
    cv.setAttribute("aria-label", t.name + "的示意 3D 模型，可拖曳旋轉。");
    list.replaceChildren();
    Object.keys(chipBtns).forEach(function (k) { delete chipBtns[k]; });
    Object.keys(accBtns).forEach(function (k) { delete accBtns[k]; });
    accRow.replaceChildren();
    if (model.parts.length > model.nBase) accRow.appendChild(el("span", "show-label", "配件"));
    model.parts.forEach(function (p, i) {
      if (!p.acc) return;
      const b = el("button", "map-chip", p.name);
      b.type = "button"; b.setAttribute("aria-pressed", "false");
      b.addEventListener("mouseenter", function () { if (p.on) { hover = i; setInfo(); } });
      b.addEventListener("mouseleave", function () { hover = -1; setInfo(); });
      b.addEventListener("click", function () {
        p.on = !p.on;
        if (reduced) p.t = p.on ? 1 : 0;
        lock = p.on ? i : -1; hover = -1; setInfo();
      });
      accRow.appendChild(b); accBtns[i] = b;
    });
    model.parts.forEach(function (p, i) {
      if (p.acc) return;
      const b = el("button", "map-chip", no(i + 1) + " " + p.name);
      b.type = "button";
      b.addEventListener("mouseenter", function () { hover = i; setInfo(); });
      b.addEventListener("mouseleave", function () { hover = -1; setInfo(); });
      b.addEventListener("focus", function () { hover = i; setInfo(); });
      b.addEventListener("blur", function () { hover = -1; setInfo(); });
      b.addEventListener("click", function () { lock = lock === i ? -1 : i; setInfo(); });
      list.appendChild(b); chipBtns[i] = b;
    });
    link.href = "#/type/" + id;
    link.textContent = "看" + t.name + "圖鑑 →";
    Object.keys(tabBtns).forEach(function (k) { tabBtns[k].setAttribute("aria-pressed", String(k === id)); });
    try { history.replaceState(null, "", "#/showcase/" + id); } catch (e) { /* file:// 某些瀏覽器不允許，忽略 */ }
    setInfo();
    fitInfo();
  }

  const tabBtns = {};
  gunTypes.forEach(function (t) {
    if (!SHOW_MODELS[t.id]) return;
    const b = el("button", "map-chip", t.name);
    b.type = "button";
    b.addEventListener("click", function () { if (t.id !== showType) load(t.id); });
    chips.appendChild(b); tabBtns[t.id] = b;
  });

  btnExp.addEventListener("click", function () {
    explodeTarget = explodeTarget ? 0 : 1;
    btnExp.setAttribute("aria-pressed", String(!!explodeTarget));
    if (reduced) explode = explodeTarget;
  });
  btnReset.addEventListener("click", function () { yaw = -0.55; pitch = 0.16; cycView = playing; });
  btnCyc.addEventListener("click", function () {
    if (reduced) { playing = false; cycView = true; phase = phase > 0.1 && phase < 0.4 ? 0 : 0.2; slider.value = String(Math.round(phase * 1000)); setPhaseText(); return; }
    playing = !playing; cycView = true;
    if (playing && phase > 0.95) phase = 0;
    btnCyc.setAttribute("aria-pressed", String(playing));
    setPhaseText();
  });
  slider.addEventListener("input", function () {
    phase = (+slider.value) / 1000; playing = false; cycView = true;
    btnCyc.setAttribute("aria-pressed", "false");
    setPhaseText();
  });

  /* 取目前每個圓點的畫面座標 */
  function project() {
    const ca = Math.cos(yaw), sa = Math.sin(yaw), cb = Math.cos(pitch), sb = Math.sin(pitch);
    const ex = explode * explode * (3 - 2 * explode);
    const R = (model.rxz + (model.rxzE - model.rxz) * ex), RY = (model.ry + (model.ryE - model.ry) * ex);
    const scale = Math.min(W * 0.47 / R, H * 0.44 / (RY + R * Math.abs(Math.sin(pitch)) * 0.5));
    const cx = W / 2, cy = H / 2;
    const pts = model.pts, n = pts.length;
    if (proj.length !== n) proj = new Array(n);
    for (let i = 0; i < n; i++) {
      const q = pts[i], o = model.parts[q.part].off;
      const pt = model.parts[q.part];
      let bi = pt.acc ? Math.min(1, Math.max(0, (pt.t - q.dl * 0.5) / 0.5)) : (reduced ? 1 : Math.min(1, Math.max(0, (built - q.dl) / 0.4)));
      bi = 1 - Math.pow(1 - bi, 3);
      const f = 1 - bi;
      const x = q.x + (pt.mv || 0) + o[0] * ex + q.rx * f * f, y = q.y + o[1] * ex + q.ry * f * f, z = q.z + o[2] * ex + q.rz * f * f;
      const X = x * ca + z * sa, Z1 = -x * sa + z * ca;
      const Y = y * cb - Z1 * sb, Z = y * sb + Z1 * cb;
      const nX = q.nx * ca + q.nz * sa, nZ1 = -q.nx * sa + q.nz * ca;
      const nZ = q.ny * sb + nZ1 * cb;
      const d = (proj[i] = proj[i] || {});
      d.x = cx + X * scale; d.y = cy - Y * scale; d.z = Z; d.front = nZ > -0.05; d.part = q.part; d.b = bi;
    }
    tr = { ca: ca, sa: sa, cb: cb, sb: sb, scale: scale, cx: cx, cy: cy };
    return scale;
  }
  function projectPoint(x, y, z) {
    const X = x * tr.ca + z * tr.sa, Z1 = -x * tr.sa + z * tr.ca;
    return { x: tr.cx + X * tr.scale, y: tr.cy - (y * tr.cb - Z1 * tr.sb) * tr.scale, z: y * tr.sb + Z1 * tr.cb };
  }

  // 射擊循環的特效：槍口火光、被拋出的彈殼
  let casePts = null;
  function drawCycleFx(base) {
    const c = SHOW_CYCLE[showType];
    if (!c || !cycView || explode > 0.05) return;
    const supOn = model.parts.some(function (p) { return p.aid === "sup" && p.on; });
    if (phase < 0.12) {
      const f = 1 - phase / 0.12, k = supOn ? 0.35 : 1;
      const m = projectPoint(c.muzzle[0] + (supOn ? c.sup : 0) - model.cx, c.muzzle[1] - model.cy, c.muzzle[2]);
      ctx.globalAlpha = 1; ctx.fillStyle = colors.signal; ctx.strokeStyle = colors.ink; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let j = 0; j < 16; j++) {
        const ang = j / 16 * 6.2832 + 0.3, dist = 46 * f * k * (0.35 + 0.65 * (((j * 37) % 11) / 11)) + 4;
        const r = (1.5 + 3 * f) * Math.max(0.6, k);
        ctx.moveTo(m.x + Math.cos(ang) * dist + r, m.y + Math.sin(ang) * dist); ctx.arc(m.x + Math.cos(ang) * dist, m.y + Math.sin(ang) * dist, r, 0, 6.2832);
      }
      ctx.moveTo(m.x + 9 * f * k + 3, m.y); ctx.arc(m.x, m.y, 9 * f * k + 3, 0, 6.2832);
      ctx.fill(); ctx.stroke();
    }
    const u = (phase - 0.12) / 0.85;
    if (u > 0 && u < 1) {
      if (!casePts) casePts = showSamplePart({ prims: [{ k: "c", x0: -1.2, x1: 1.2, cy: 0, cz: 0, r0: 0.55, r1: 0.55 }] }, 0.5);
      const ang = u * 9, ca2 = Math.cos(ang), sa2 = Math.sin(ang);
      const ox = c.port[0] - model.cx + c.v[0] * u, oy = c.port[1] - model.cy + c.v[1] * u - 11 * u * u, oz = c.port[2] + c.v[2] * u;
      ctx.globalAlpha = 1; ctx.fillStyle = colors.signal; ctx.strokeStyle = colors.ink; ctx.lineWidth = 1; ctx.beginPath();
      const r = Math.max(1.4, base * 1.1);
      casePts.forEach(function (q) {
        const p = projectPoint(ox + q.x * ca2 - q.y * sa2, oy + q.x * sa2 + q.y * ca2, oz + q.z);
        ctx.moveTo(p.x + r, p.y); ctx.arc(p.x, p.y, r, 0, 6.2832);
      });
      ctx.fill(); ctx.stroke();
    }
  }

  function draw() {
    const scale = project();
    ctx.clearRect(0, 0, W, H);
    const a = active();
    const base = Math.max(0.8, scale * model.gap * 0.3);
    const R = Math.max(model.rxz, 1);
    const groups = { back: [], front: [], dim: [], hot: [], mover: [] };
    for (let i = 0; i < proj.length; i++) {
      const d = proj[i];
      if (d.b <= 0.01) continue;
      if (cycView && model.parts[d.part].mover && d.front && !(a >= 0 && d.part === a)) groups.mover.push(d);
      else if (a >= 0 && d.part === a) { if (d.front) groups.hot.push(d); else groups.back.push(d); }
      else if (!d.front) groups.back.push(d);
      else if (a >= 0) groups.dim.push(d);
      else groups.front.push(d);
    }
    const fillGroup = function (arr, color, alpha, mul) {
      if (!arr.length) return;
      ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.beginPath();
      for (let i = 0; i < arr.length; i++) {
        const d = arr[i], r = Math.max(0.2, base * mul * Math.max(0.3, 1 + 0.4 * d.z / R) * d.b);
        ctx.moveTo(d.x + r, d.y); ctx.arc(d.x, d.y, r, 0, 6.2832);
      }
      ctx.fill();
    };
    fillGroup(groups.back, colors.ink, 0.16, 0.8);
    fillGroup(groups.dim, colors.ink, 0.3, 1);
    fillGroup(groups.front, colors.ink, 1, 1);
    if (groups.mover.length) {
      ctx.globalAlpha = 1; ctx.strokeStyle = colors.ink; ctx.lineWidth = 1; ctx.fillStyle = colors.signal; ctx.beginPath();
      groups.mover.forEach(function (d) { const r = Math.max(0.3, base * 1.15 * Math.max(0.3, 1 + 0.4 * d.z / R)); ctx.moveTo(d.x + r, d.y); ctx.arc(d.x, d.y, r, 0, 6.2832); });
      ctx.fill(); ctx.stroke();
    }
    if (groups.hot.length) {
      ctx.globalAlpha = 1; ctx.strokeStyle = colors.ink; ctx.lineWidth = 1.2;
      ctx.fillStyle = colors.signal; ctx.beginPath();
      groups.hot.forEach(function (d) { const r = Math.max(0.3, base * 1.25 * Math.max(0.3, 1 + 0.4 * d.z / R)); ctx.moveTo(d.x + r, d.y); ctx.arc(d.x, d.y, r, 0, 6.2832); });
      ctx.fill(); ctx.stroke();
      // 名稱標籤
      let sx = 0, sy = 0;
      groups.hot.forEach(function (d) { sx += d.x; sy += d.y; });
      sx /= groups.hot.length; sy /= groups.hot.length;
      const p = model.parts[a], text = (p.acc ? "+" + no(a - model.nBase + 1) : no(a + 1)) + " " + p.name;
      ctx.font = "700 16px " + colors.font;
      const tw = ctx.measureText(text).width + 16, th = 26;
      let lx = Math.min(W - tw - 6, Math.max(6, sx + 14)), ly = Math.min(H - th - 6, Math.max(6, sy - 40));
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(lx + 8, ly + th); ctx.strokeStyle = colors.ink; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = colors.ink; ctx.fillRect(lx, ly, tw, th);
      ctx.fillStyle = colors.paper; ctx.textBaseline = "middle"; ctx.fillText(text, lx + 8, ly + th / 2 + 1);
    }
    ctx.globalAlpha = 1;
    drawCycleFx(base);
  }

  function pick(px, py) {
    let best = -1, bd = 1e9;
    const limit = Math.max(10, Math.min(18, W * 0.03));
    for (let i = 0; i < proj.length; i++) {
      const d = proj[i];
      if (!d.front || d.b < 0.5) continue;
      const dx = d.x - px, dy = d.y - py, dist = Math.sqrt(dx * dx + dy * dy) - d.z * 0.02;
      if (dist < limit && dist < bd) { bd = dist; best = d.part; }
    }
    return best;
  }

  let lastFitW = 0;
  function resize() {
    const r = cv.getBoundingClientRect();
    if (!r.width) return;
    W = r.width; H = r.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    readColors();
    if (model) { project(); draw(); }
    if (W !== lastFitW) { lastFitW = W; fitInfo(); }
  }

  cv.addEventListener("pointerdown", function (e) {
    dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
    try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
  });
  cv.addEventListener("pointermove", function (e) {
    const r = cv.getBoundingClientRect();
    mx = e.clientX - r.left; my2 = e.clientY - r.top;
    if (dragging) {
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      yaw += dx * 0.01; pitch = Math.max(-0.6, Math.min(0.6, pitch + dy * 0.006));
      lastX = e.clientX; lastY = e.clientY;
    }
    if (e.pointerType !== "touch" && !dragging) {
      const p = pick(mx, my2);
      if (p !== hover) { hover = p; setInfo(); }
    }
  });
  cv.addEventListener("pointerup", function (e) {
    dragging = false;
    if (moved < 6) {   // 沒有拖動 = 點一下：選取或取消選取零件（手機也靠這個）
      const r = cv.getBoundingClientRect();
      const p = pick(e.clientX - r.left, e.clientY - r.top);
      lock = (p >= 0 && p !== lock) ? p : -1;
      hover = -1; setInfo();
    }
  });
  cv.addEventListener("pointerleave", function () { if (!dragging) { mx = -999; if (hover !== -1) { hover = -1; setInfo(); } } });
  cv.addEventListener("pointercancel", function () { dragging = false; });

  let last = performance.now();
  function frame(now) {
    if (my !== showSession || !cv.isConnected) return;
    if (cv.offsetParent === null) { return; }   // 頁面被隱藏就停止，回到這頁時會重新建立
    const dt = Math.min(50, now - last); last = now;
    if ((colors.t = (colors.t + 1) % 90) === 0) readColors();
    if (!reduced) {
      built = Math.min(1.6, built + dt / 900);
      if (cycView) {
        // 看射擊循環時，鏡頭慢慢轉到側面，比較看得出零件前後移動
        yaw = ((yaw + Math.PI) % 6.2832 + 6.2832) % 6.2832 - Math.PI;
        if (!dragging) { yaw += (-0.3 - yaw) * Math.min(1, dt / 220); pitch += (0.1 - pitch) * Math.min(1, dt / 220); }
      } else if (!dragging && active() < 0) yaw += dt * 0.00035;
      explode += (explodeTarget - explode) * Math.min(1, dt / 140);
      if (Math.abs(explodeTarget - explode) < 0.002) explode = explodeTarget;
    } else explode = explodeTarget;
    if (playing) {
      phase = (phase + dt / 3600) % 1;
      slider.value = String(Math.round(phase * 1000));
      if (showPhaseIndex(phase) !== lastPhaseIdx) setPhaseText();
    }
    { const sc = showCycleCurve(phase), mv = moveRefs(); model.parts.forEach(function (p) { p.mv = 0; p.mover = false; }); const c = SHOW_CYCLE[showType]; if (c) mv.forEach(function (p) { p.mv = c.dx * sc; p.mover = true; }); }
    if (!reduced) model.parts.forEach(function (p) { if (p.acc) p.t = Math.max(0, Math.min(1, p.t + (p.on ? 1 : -1) * dt / 650)); });
    if (ctx) draw();
    requestAnimationFrame(frame);
  }

  load(showType);
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(function () { if (my === showSession) resize(); }).observe(cv);
  else window.addEventListener("resize", resize);
  // 換深淺色時，重新讀取顏色
  if ("MutationObserver" in window) {
    new MutationObserver(function () { if (my === showSession) readColors(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  if (reduced) { draw(); }
  requestAnimationFrame(function (t) { last = t; frame(t); });
}
