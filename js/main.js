/* ===== 槍械資料庫：全站只有這一份資料，圖鑑、表格、詳細頁都從這裡讀 =====
   想新增一把槍，就複製一個 { ... } 區塊，改成新的內容。
   欄位說明：
   id          網址與程式用的代號（英文小寫，不能重複）
   type        槍種：hg 手槍、smg 衝鋒槍、ar 突擊步槍、rf 步槍、mg 機槍、sg 霰彈槍
   country     設計國家
   region      地區，請從固定清單選：北美、中南美、歐洲、俄羅斯與中亞、中東、非洲、南亞、東亞、東南亞、大洋洲
   year        設計或首次採用的年份
   activeFrom  主要活躍時期的起點
   activeTo    主要活躍時期的終點，null 代表至今仍在使用
   activeNote  活躍時期的文字說明
   caliber     口徑（子彈尺寸）
   action      作動方式（槍怎麼完成退殼與上膛）
   summary     白話簡介
   history     歷史背景
*/
const guns = [
  {
    id: "m1911", name: "M1911", type: "hg",
    country: "美國", region: "北美", year: 1911,
    activeFrom: 1911, activeTo: 1985,
    activeNote: "1911 至 1985 年為美軍制式手槍，之後仍有部隊與民間使用。",
    caliber: ".45 ACP", action: "半自動，短行程後座式",
    summary: "由約翰．白朗寧設計的大口徑半自動手槍，以結構堅固、威力大著稱。",
    history: "1911 年被美軍採用，歷經兩次世界大戰與韓戰、越戰，是二十世紀最具代表性的軍用手槍之一。"
  },
  {
    id: "glock17", name: "Glock 17", type: "hg",
    country: "奧地利", region: "歐洲", year: 1982,
    activeFrom: 1982, activeTo: null,
    activeNote: "1982 年起服役，至今仍廣泛使用。",
    caliber: "9×19mm", action: "半自動，短行程後座式",
    summary: "槍身大量使用聚合物材料，重量輕、零件少、維護簡單。",
    history: "為奧地利軍方的新式手槍需求而開發，1982 年被採用後，成為全球軍警與民間常見的手槍。"
  },
  {
    id: "mp5", name: "MP5", type: "smg",
    country: "德國", region: "歐洲", year: 1966,
    activeFrom: 1966, activeTo: null,
    activeNote: "1960 年代中期起服役，仍有許多警察與特種單位使用。",
    caliber: "9×19mm", action: "滾輪延遲反衝式",
    summary: "射擊穩定、精準度高的衝鋒槍，常見於警察與反恐部隊。",
    history: "由德國 Heckler & Koch 公司研發，1960 年代中期開始供應德國警察與邊境單位，後來外銷到許多國家。"
  },
  {
    id: "thompson1928", name: "湯普森 M1928", type: "smg",
    country: "美國", region: "北美", year: 1928,
    activeFrom: 1920, activeTo: 1945,
    activeNote: "1920 年代問世，二戰期間大量使用，後來被更簡化的型號取代。",
    caliber: ".45 ACP", action: "延遲反衝式",
    summary: "發射大口徑手槍子彈的衝鋒槍，木質槍托加上圓形彈鼓，外型很有辨識度。",
    history: "早期因警匪片與禁酒令時代的故事而聞名，1928 年型被美國海軍採用，二戰時期也大量出現在盟軍部隊。"
  },
  {
    id: "ak47", name: "AK-47", type: "ar",
    country: "蘇聯", region: "俄羅斯與中亞", year: 1947,
    activeFrom: 1949, activeTo: null,
    activeNote: "1949 年起服役，衍生型號至今仍在許多國家使用。",
    caliber: "7.62×39mm", action: "導氣式，迴轉式槍機",
    summary: "結構簡單、耐用、容易維修，是全世界生產與使用數量最多的步槍之一。",
    history: "由米哈伊爾．卡拉希尼可夫設計，1949 年成為蘇聯軍隊的制式武器，後來傳播到世界各地。"
  },
  {
    id: "m16", name: "M16", type: "ar",
    country: "美國", region: "北美", year: 1962,
    activeFrom: 1962, activeTo: null,
    activeNote: "1960 年代起服役，後續改良型號至今仍在使用。",
    caliber: "5.56×45mm", action: "直接導氣式，迴轉式槍機",
    summary: "使用小口徑高速子彈，槍身輕，後座力小。",
    history: "源自 AR-15，1960 年代起被美軍採用，並在越戰中大量使用，之後衍生出多種改良型號。"
  },
  {
    id: "kar98k", name: "Kar98k", type: "rf",
    country: "德國", region: "歐洲", year: 1935,
    activeFrom: 1935, activeTo: 1945,
    activeNote: "1935 年起成為德軍主力步槍，二戰結束後仍有部分國家使用。",
    caliber: "7.92×57mm 毛瑟", action: "栓動式",
    summary: "拉動槍栓來完成退殼與上膛，每次射擊要手動操作，精準又可靠。",
    history: "以毛瑟 Gewehr 98 為基礎縮短槍管改良而成，是二戰時期德軍最主要的制式步槍。"
  },
  {
    id: "m14", name: "M14", type: "rf",
    country: "美國", region: "北美", year: 1959,
    activeFrom: 1959, activeTo: 1970,
    activeNote: "1950 年代末採用，1960 年代中期後逐步被 M16 取代，之後以精準射手型號延續使用。",
    caliber: "7.62×51mm 北約", action: "導氣式，迴轉式槍機",
    summary: "使用威力較大的步槍子彈，射程遠，承襲了 M1 加蘭德步槍的設計。",
    history: "1959 年成為美軍制式步槍，但因全自動射擊時不好控制，很快就被 M16 取代。"
  },
  {
    id: "mg42", name: "MG42", type: "mg",
    country: "德國", region: "歐洲", year: 1942,
    activeFrom: 1942, activeTo: 1945,
    activeNote: "二戰期間大量使用，戰後的衍生型號仍在多國服役。",
    caliber: "7.92×57mm 毛瑟", action: "後座式，彈鏈供彈",
    summary: "射速極高，每分鐘約一千二百發上下，連發時的聲響很有特色。",
    history: "1942 年投入戰場，設計考慮了大量生產，戰後衍生出 MG3 等型號，沿用至今。"
  },
  {
    id: "m249", name: "M249（FN Minimi）", type: "mg",
    country: "比利時", region: "歐洲", year: 1974,
    activeFrom: 1974, activeTo: null,
    activeNote: "1970 年代開始生產，美軍於 1980 年代採用並命名為 M249。",
    caliber: "5.56×45mm 北約", action: "導氣式，彈鏈或彈匣供彈",
    summary: "步兵班用的輕機槍，可用彈鏈供彈，也可以使用步槍彈匣。",
    history: "原型是比利時 FN 公司的 Minimi，1980 年代被美軍採用，稱為班用自動武器。"
  },
  {
    id: "remington870", name: "Remington 870", type: "sg",
    country: "美國", region: "北美", year: 1950,
    activeFrom: 1950, activeTo: null,
    activeNote: "1950 年上市，軍警與民間狩獵、運動射擊都很常見。",
    caliber: "12 號", action: "泵動式",
    summary: "前後拉動護木來退殼上膛，結構可靠，用途廣泛。",
    history: "自 1950 年推出後累計生產數量龐大，是史上最暢銷的霰彈槍之一。"
  },
  {
    id: "benellim4", name: "Benelli M4", type: "sg",
    country: "義大利", region: "歐洲", year: 1998,
    activeFrom: 1998, activeTo: null,
    activeNote: "1990 年代末推出，至今仍有軍警使用。",
    caliber: "12 號", action: "半自動，導氣式",
    summary: "半自動霰彈槍，每扣一次扳機就自動退殼上膛，連續射擊更快。",
    history: "由義大利 Benelli 公司設計，美國海軍陸戰隊採用後命名為 M1014。"
  },
  {
    id: "cz75", name: "CZ 75", type: "hg",
    country: "捷克斯洛伐克", region: "歐洲", year: 1975,
    activeFrom: 1976, activeTo: null,
    activeNote: "1975 年推出，1976 年起服役，至今仍在生產與使用。",
    caliber: "9×19mm", action: "半自動，短行程後座式",
    summary: "全鋼槍身、彈匣容量大，握持穩定，常被視為射擊手感很好的手槍。",
    history: "1975 年由捷克斯洛伐克的 Česká zbrojovka 公司推出，原本主要為外銷設計，後來影響了許多手槍的設計。"
  },
  {
    id: "makarov", name: "馬卡洛夫 PM", type: "hg",
    country: "蘇聯", region: "俄羅斯與中亞", year: 1951,
    activeFrom: 1951, activeTo: null,
    activeNote: "1951 年起服役，之後在多國長期使用。",
    caliber: "9×18mm 馬卡洛夫", action: "半自動，直接反衝式",
    summary: "結構簡單、零件少的小型手槍，使用專門設計的 9×18mm 子彈。",
    history: "1951 年成為蘇聯軍隊與警察的制式手槍，之後在蘇聯與東歐國家長期使用。"
  },
  {
    id: "uzi", name: "Uzi", type: "smg",
    country: "以色列", region: "中東", year: 1950,
    activeFrom: 1954, activeTo: null,
    activeNote: "1950 年代初期設計完成，1954 年起服役，後來外銷到許多國家。",
    caliber: "9×19mm", action: "直接反衝式，開放式槍機",
    summary: "體積小、結構簡單的衝鋒槍，槍機包覆在槍管周圍，讓整支槍更緊湊。",
    history: "由以色列軍官烏茲．加爾設計，1950 年代被以色列軍隊採用，後來外銷到許多國家。"
  },
  {
    id: "ppsh41", name: "PPSh-41", type: "smg",
    country: "蘇聯", region: "俄羅斯與中亞", year: 1941,
    activeFrom: 1941, activeTo: 1960,
    activeNote: "1941 年投入生產，二戰期間大量使用，戰後在多國沿用一段時間。",
    caliber: "7.62×25mm 托卡列夫", action: "直接反衝式，開放式槍機",
    summary: "可裝 71 發大圓鼓彈匣，火力持續，是二戰蘇聯步兵的代表武器。",
    history: "1941 年開始生產，結構簡單、容易大量製造，二戰期間蘇聯生產了數百萬支。"
  },
  {
    id: "type56", name: "56 式", type: "ar",
    country: "中國", region: "東亞", year: 1956,
    activeFrom: 1956, activeTo: null,
    activeNote: "1956 年起生產，衍生型號至今仍在多國使用。",
    caliber: "7.62×39mm", action: "導氣式，迴轉式槍機",
    summary: "中國以 AK-47 為基礎生產的突擊步槍，外型與操作都很相近。",
    history: "1956 年開始生產，曾大量外銷，許多國家都曾使用。"
  },
  {
    id: "t91", name: "T91", type: "ar",
    country: "台灣（中華民國）", region: "東亞", year: 2002,
    activeFrom: 2003, activeTo: null,
    activeNote: "2002 年開發完成，2003 年起量產並服役，至今仍在使用。",
    caliber: "5.56×45mm 北約", action: "導氣式（短行程），迴轉式槍機",
    summary: "台灣自行設計生產的 5.56mm 突擊步槍，槍身較短、重量較輕。",
    history: "由 205 廠設計，2002 年開發完成，2003 年開始量產，用來取代舊的 T65 步槍。"
  },
  {
    id: "leeenfield", name: "Lee–Enfield", type: "rf",
    country: "英國", region: "歐洲", year: 1895,
    activeFrom: 1895, activeTo: 1957,
    activeNote: "1895 年起成為英軍步槍，英軍使用到 1950 年代，之後仍在許多國家服役。",
    caliber: ".303 British", action: "栓動式",
    summary: "栓動式步槍，裝彈量大、拉栓順手，射速在栓動步槍中算快。",
    history: "1895 年起成為英國軍隊的制式步槍，在兩次世界大戰中是英國與大英國協軍隊的主力步槍。"
  },
  {
    id: "type38", name: "三八式步槍", type: "rf",
    country: "日本", region: "東亞", year: 1905,
    activeFrom: 1906, activeTo: 1945,
    activeNote: "1905 年採用，1906 年起服役，使用到二戰結束。",
    caliber: "6.5×50mmSR 有坂", action: "栓動式",
    summary: "日本陸軍的主力步槍，使用後座力較小的 6.5mm 子彈，槍身很長。",
    history: "1905 年由日本陸軍採用，取代三十年式步槍，二戰時期部分被威力更大的九九式步槍補充。"
  },
  {
    id: "bren", name: "布倫輕機槍", type: "mg",
    country: "英國", region: "歐洲", year: 1935,
    activeFrom: 1938, activeTo: 1992,
    activeNote: "1938 年起服役，1992 年退出英軍制式裝備。",
    caliber: ".303 British", action: "導氣式，彈匣供彈",
    summary: "以彈匣供彈的輕機槍，彈匣裝在槍身上方，連發精準穩定。",
    history: "以捷克斯洛伐克的 ZB vz. 26 為基礎，英國於 1935 年選用並在恩菲爾德兵工廠生產，二戰時是英軍步兵班的主要火力。"
  },
  {
    id: "pkm", name: "PKM", type: "mg",
    country: "蘇聯", region: "俄羅斯與中亞", year: 1969,
    activeFrom: 1969, activeTo: null,
    activeNote: "1969 年起服役，至今仍在許多國家使用。",
    caliber: "7.62×54mmR", action: "導氣式，彈鏈供彈",
    summary: "蘇聯與俄羅斯的通用機槍，使用彈鏈供彈，能架在腳架上持續射擊。",
    history: "是 PK 機槍的改良型，1969 年開始服役，至今仍在許多國家使用。"
  },
  {
    id: "spas12", name: "SPAS-12", type: "sg",
    country: "義大利", region: "歐洲", year: 1979,
    activeFrom: 1979, activeTo: 2000,
    activeNote: "1979 年推出，2000 年停產。",
    caliber: "12 號", action: "半自動與泵動雙模式",
    summary: "可以在半自動和泵動兩種模式之間切換的霰彈槍，外型很有辨識度。",
    history: "由義大利 Franchi 公司在 1979 年推出，常出現在電影與遊戲中，2000 年停產。"
  },
  {
    id: "mossberg500", name: "Mossberg 500", type: "sg",
    country: "美國", region: "北美", year: 1961,
    activeFrom: 1961, activeTo: null,
    activeNote: "1961 年上市，狩獵、運動射擊與執法都很常見。",
    caliber: "12 號（另有其他口徑）", action: "泵動式",
    summary: "泵動式霰彈槍，結構簡單耐用，型號與配件很多。",
    history: "1961 年推出，用途涵蓋狩獵、運動射擊與執法，是美國相當普遍的霰彈槍之一。"
  },
  {
    id: "fiveseven", name: "Five-seveN", type: "hg",
    country: "比利時", region: "歐洲", year: 1998,
    activeFrom: 2000, activeTo: null,
    activeNote: "1998 年推出，2000 年起服役，至今仍在使用。",
    caliber: "5.7×28mm", action: "半自動，延遲反衝式",
    summary: "使用細長的小口徑高速子彈，彈匣容量大，後座力小。",
    history: "由比利時 FN 公司與 P90 衝鋒槍一同開發，1998 年推出，2000 年起服役，後來被二十多個國家的軍警採用。"
  },
  {
    id: "deserteagle", name: "沙漠之鷹", type: "hg",
    country: "美國", region: "北美", year: 1982,
    activeFrom: 1983, activeTo: null,
    activeNote: "1983 年開始量產，至今仍在生產，多用於射擊運動與收藏。",
    caliber: ".357 Magnum、.44 Magnum、.50 AE", action: "半自動，導氣式，迴轉式槍機",
    summary: "體型和重量都很大的半自動手槍，可使用大威力的手槍彈，常出現在電影與遊戲中。",
    history: "由美國 Magnum Research 設計，早期由以色列 IMI 生產，1979 到 1982 年設計，1983 年開始量產。"
  },
  {
    id: "suomi", name: "索米 KP/-31", type: "smg",
    country: "芬蘭", region: "歐洲", year: 1931,
    activeFrom: 1931, activeTo: 1945,
    activeNote: "1931 年起服役，二戰期間大量使用。",
    caliber: "9×19mm", action: "直接反衝式，開放式槍機",
    summary: "可裝大容量圓鼓彈匣的衝鋒槍，射擊穩定，是芬蘭軍隊的代表武器。",
    history: "1931 年被芬蘭軍隊採用，在冬季戰爭與繼續戰爭中大量使用，也影響了後來蘇聯 PPSh-41 的設計。"
  },
  {
    id: "ump45", name: "UMP45", type: "smg",
    country: "德國", region: "歐洲", year: 1999,
    activeFrom: 1999, activeTo: null,
    activeNote: "1999 年推出，至今仍在許多警察與特種單位使用。",
    caliber: ".45 ACP", action: "直接反衝式，閉膛擊發",
    summary: "使用聚合物槍身的衝鋒槍，比早期的 MP5 輕，也更便宜，使用大口徑的 .45 ACP 子彈。",
    history: "由德國 Heckler & Koch 公司在 1999 年推出，作為 MP5 的補充與後繼，被多國警察與特種部隊採用。"
  },
  {
    id: "hk416", name: "HK416", type: "ar",
    country: "德國", region: "歐洲", year: 2004,
    activeFrom: 2005, activeTo: null,
    activeNote: "2005 年起服役，至今仍在使用。",
    caliber: "5.56×45mm 北約", action: "導氣式（短行程活塞），迴轉式槍機",
    summary: "外型像 M4，但改用活塞式的導氣系統，在髒汙環境下比較可靠。",
    history: "由德國 Heckler & Koch 公司在 2000 年代初期開發，2004 年問世，被多國軍隊與特種部隊採用，美國海軍陸戰隊的 M27 也是它的衍生型。"
  },
  {
    id: "fal", name: "FN FAL", type: "ar",
    country: "比利時", region: "歐洲", year: 1953,
    activeFrom: 1953, activeTo: null,
    activeNote: "1953 年起服役，冷戰時期被許多國家採用，仍有部分國家沿用。",
    caliber: "7.62×51mm 北約", action: "導氣式，傾斜式槍機",
    summary: "威力較大的 7.62mm 自動步槍，常被歸類為戰鬥步槍，冷戰時期被數十個國家採用。",
    history: "由比利時 FN 公司設計，1953 年起服役，在冷戰時期被許多北約與其他國家採用，有「自由世界的右臂」的稱號。"
  },
  {
    id: "liu", name: "劉氏步槍", type: "rf",
    country: "台灣（中華民國）", region: "東亞", year: 1914,
    activeFrom: 1914, activeTo: 1918,
    activeNote: "1914 至 1918 年間在漢陽兵工廠生產。",
    caliber: "7.92×57mm 毛瑟", action: "半自動，導氣式",
    summary: "中華民國早期自行研發的半自動步槍，是用導氣方式自動裝填的嘗試。",
    history: "由漢陽兵工廠總辦劉慶恩將軍主持研發，約 1914 年完成，並向美國訂購機器準備生產，是中華民國第一款自行研發的半自動步槍。"
  },
  {
    id: "martinihenry", name: "馬提尼亨利步槍", type: "rf",
    country: "英國", region: "歐洲", year: 1871,
    activeFrom: 1871, activeTo: 1900,
    activeNote: "1871 年起成為英軍制式步槍，1880 年代末起逐步被連發步槍取代。",
    caliber: ".577/450 Martini–Henry", action: "單發，落閂式（下拉拉桿）",
    summary: "單發步槍，扳下槍機下方的拉桿就能退殼，再手動裝入下一發子彈。",
    history: "1871 年成為英國軍隊的制式步槍，用於許多殖民地戰爭，後來被 Lee–Metford 和 Lee–Enfield 等連發步槍取代。"
  },
  {
    id: "mg338", name: "MG338", type: "mg",
    country: "美國", region: "北美", year: 2018,
    activeFrom: 2020, activeTo: null,
    activeNote: "2018 年首度公開，2020 年起交付美國特種作戰司令部。",
    caliber: ".338 Norma Magnum", action: "導氣式，彈鏈供彈",
    summary: "使用 .338 Norma Magnum 子彈的輕量機槍，目標是比 7.62mm 機槍射程更遠，同時比重機槍輕。",
    history: "由 SIG Sauer 公司開發，2018 年首度公開，2020 年由美國特種作戰司令部取得。"
  },
  {
    id: "negev", name: "內格夫", type: "mg",
    country: "以色列", region: "中東", year: 1997,
    activeFrom: 1997, activeTo: null,
    activeNote: "1997 年起服役，後來也推出 7.62mm 的 NG-7，至今仍在使用。",
    caliber: "5.56×45mm 北約", action: "導氣式，迴轉式槍機，彈鏈或彈匣供彈",
    summary: "以色列的 5.56mm 輕機槍，可用彈鏈或步槍彈匣供彈，射速可以調整。",
    history: "由以色列 IMI（今 IWI）自 1985 年開始研發，用來取代 Galil 輕機槍，1997 年被以色列國防軍採用。"
  },
  {
    id: "mag7", name: "MAG-7", type: "sg",
    country: "南非", region: "非洲", year: 1995,
    activeFrom: 1995, activeTo: null,
    activeNote: "1995 年推出，至今仍在生產。",
    caliber: "12 號（60mm 專用彈）", action: "泵動式",
    summary: "體積很小的泵動式霰彈槍，彈匣插在握把裡，使用特製的 60mm 短霰彈。",
    history: "由南非 Techno Arms 公司在 1995 年推出，設計目標是結合衝鋒槍的小巧與霰彈槍的火力，主要用於近距離任務。"
  },
  {
    id: "uts15", name: "UTS-15", type: "sg",
    country: "土耳其", region: "中東", year: 2012,
    activeFrom: 2012, activeTo: null,
    activeNote: "2012 年起生產，至今仍在生產。",
    caliber: "12 號", action: "泵動式",
    summary: "把兩個彈管並排在槍管上方的泵動式霰彈槍，一次最多能裝 15 發。",
    history: "由土耳其 UTAŞ 公司生產，起因是美國 Smith & Wesson 在 2006 年提出的需求，採用無托式設計縮短全長，2012 年起量產。"
  },
  {
    id: "sigp210", name: "SIG P210", type: "hg",
    country: "瑞士", region: "歐洲", year: 1949,
    activeFrom: 1949, activeTo: 1975,
    activeNote: "1949 年起成為瑞士軍隊制式手槍，1970 年代被 SIG P220 取代，之後在射擊競技中仍受歡迎。",
    caliber: "9×19mm", action: "半自動，短行程後座式",
    summary: "以精密加工聞名的手槍，射擊精準，在射擊競技圈評價很高。",
    history: "由瑞士 SIG 公司設計，1949 年被瑞士軍隊採用，稱為 49 式手槍，後來也外銷到丹麥等國。"
  },
  {
    id: "fmk3", name: "FMK-3", type: "smg",
    country: "阿根廷", region: "中南美", year: 1974,
    activeFrom: 1975, activeTo: null,
    activeNote: "1974 年設計，1970 年代中期起服役，1993 年停產，阿根廷軍警仍有使用。",
    caliber: "9×19mm", action: "直接反衝式，開放式槍機",
    summary: "阿根廷生產的衝鋒槍，以美軍 M3「油槍」為基礎，改用 9mm 彈，成本低、容易大量製造。",
    history: "由阿根廷 Fabricaciones Militares 在 1974 年設計，用來取代軍中多種型號的衝鋒槍，阿根廷軍警長期使用。"
  },
  {
    id: "owen", name: "Owen 衝鋒槍", type: "smg",
    country: "澳洲", region: "大洋洲", year: 1941,
    activeFrom: 1942, activeTo: 1971,
    activeNote: "1942 年起服役，二戰期間大量使用，1971 年才退出澳洲軍隊。",
    caliber: "9×19mm", action: "直接反衝式，開放式槍機",
    summary: "彈匣裝在槍身上方的衝鋒槍，結構簡單，在叢林環境下相當可靠。",
    history: "由澳洲人伊夫林．歐文設計，1941 年起生產，二戰期間是澳洲軍隊的主力衝鋒槍之一。"
  },
  {
    id: "carlgustaf", name: "卡爾古斯塔夫 m/45", type: "smg",
    country: "瑞典", region: "歐洲", year: 1945,
    activeFrom: 1945, activeTo: null,
    activeNote: "1945 年起服役，後來外銷到許多國家。",
    caliber: "9×19mm", action: "直接反衝式，開放式槍機",
    summary: "結構簡單的衝鋒槍，槍管外有散熱孔護套，在冷戰時期被多國採用。",
    history: "由瑞典 Carl Gustafs 工廠設計，1945 年成為瑞典軍隊的衝鋒槍，後來也被許多國家採用或仿造。"
  },
  {
    id: "pm63", name: "wz. 63 衝鋒手槍", type: "smg",
    country: "波蘭", region: "歐洲", year: 1963,
    activeFrom: 1964, activeTo: null,
    activeNote: "1960 年代中期起服役，主要給特殊與支援單位使用。",
    caliber: "9×18mm 馬卡洛夫", action: "直接反衝式",
    summary: "小巧的衝鋒手槍，體積介於手槍與衝鋒槍之間，可單手射擊，也能展開槍托。",
    history: "由波蘭設計，1960 年代中期開始服役，原本為車組與特殊單位提供自衛用的輕便武器。"
  },
  {
    id: "insas", name: "INSAS", type: "ar",
    country: "印度", region: "南亞", year: 1990,
    activeFrom: 1990, activeTo: null,
    activeNote: "1990 年代起成為印度軍隊的制式步槍，近年逐步被新式步槍取代。",
    caliber: "5.56×45mm 北約", action: "導氣式，迴轉式槍機",
    summary: "印度自行研發的 5.56mm 步槍，設計融合了多款知名步槍的特點。",
    history: "由印度國防研究發展組織設計，1990 年代成為印度軍隊的制式步槍，近年逐步被新式步槍取代。"
  },
  {
    id: "k2", name: "K2", type: "ar",
    country: "南韓", region: "東亞", year: 1984,
    activeFrom: 1985, activeTo: null,
    activeNote: "1985 年前後起服役，至今仍是南韓軍隊的制式步槍之一。",
    caliber: "5.56×45mm 北約", action: "導氣式，迴轉式槍機",
    summary: "南韓自行研發的步槍，使用活塞式導氣系統，結合了多款步槍的設計特點。",
    history: "由大宇精密（Daewoo Precision）設計，1980 年代中期成為南韓軍隊的制式步槍，用來取代 M16A1。"
  },
  {
    id: "sar21", name: "SAR 21", type: "ar",
    country: "新加坡", region: "東南亞", year: 1999,
    activeFrom: 1999, activeTo: null,
    activeNote: "1999 年起裝備新加坡軍隊，至今仍在使用。",
    caliber: "5.56×45mm 北約", action: "導氣式，迴轉式槍機",
    summary: "無托式設計的步槍：機匣放在扳機後方，整把槍比較短，槍管卻不用縮短。",
    history: "由新加坡 ST Kinetics 設計，1999 年起裝備新加坡軍隊，用來取代舊的 M16S1。"
  },
  {
    id: "m70", name: "Zastava M70", type: "ar",
    country: "南斯拉夫", region: "歐洲", year: 1970,
    activeFrom: 1970, activeTo: null,
    activeNote: "1970 年起服役，南斯拉夫解體後仍在塞爾維亞等地使用。",
    caliber: "7.62×39mm", action: "導氣式，迴轉式槍機",
    summary: "以 AK 系列為基礎的南斯拉夫步槍，外型相近，機匣用料較厚。",
    history: "由南斯拉夫 Zastava 公司生產，1970 年代成為南斯拉夫軍隊的制式步槍，後來也外銷到多國。"
  },
  {
    id: "ia2", name: "IMBEL IA2", type: "ar",
    country: "巴西", region: "中南美", year: 2012,
    activeFrom: 2012, activeTo: null,
    activeNote: "2012 年起生產與服役，至今仍在使用。",
    caliber: "5.56×45mm 北約（另有 7.62×51mm）", action: "導氣式，迴轉式槍機",
    summary: "巴西自行設計的步槍，有 5.56mm 與 7.62mm 兩種口徑，用來取代老舊的 FAL。",
    history: "由巴西 IMBEL 在 2010 到 2012 年間設計，2012 年起生產，用來取代巴西軍隊使用的 FAL、M16A2 和 HK33。"
  },
  {
    id: "cetme", name: "CETME 步槍", type: "rf",
    country: "西班牙", region: "歐洲", year: 1957,
    activeFrom: 1957, activeTo: 1999,
    activeNote: "1950 年代末起成為西班牙軍隊步槍，1990 年代後陸續被新式步槍取代。",
    caliber: "7.62×51mm 北約", action: "滾輪延遲反衝式",
    summary: "使用滾輪延遲反衝式的步槍，這個機構後來被德國的 G3 步槍採用。",
    history: "由西班牙 CETME 公司發展，設計起源於二戰後德國工程師的構想，西班牙在 1950 年代末採用後，也成為德國 G3 步槍的基礎。"
  },
  {
    id: "ross", name: "Ross 步槍", type: "rf",
    country: "加拿大", region: "北美", year: 1903,
    activeFrom: 1905, activeTo: 1916,
    activeNote: "1905 年起成為加拿大軍隊步槍，1916 年起逐步被 Lee–Enfield 取代。",
    caliber: ".303 British", action: "直拉式栓動",
    summary: "直拉式步槍，不用旋轉槍栓，直接前後推拉就能退殼上膛，理論上速度更快。",
    history: "由加拿大人查爾斯．羅斯設計，第一次世界大戰初期配發給加拿大軍隊，但在泥濘的戰壕裡容易故障，1916 年起被 Lee–Enfield 取代。"
  },
  {
    id: "madsen", name: "Madsen 輕機槍", type: "mg",
    country: "丹麥", region: "歐洲", year: 1902,
    activeFrom: 1902, activeTo: null,
    activeNote: "1902 年起服役，被三十多個國家使用，至今仍有極少數單位沿用。",
    caliber: "6.5×55mm（另有多種口徑）", action: "混合式後座作動，彈匣供彈",
    summary: "世界上第一種成功的輕機槍，彈匣裝在槍身上方，使用很特別的後座作動機構。",
    history: "由丹麥人拉斯穆森與舒波設計，以丹麥陸軍部長麥登命名，1902 年被丹麥陸軍採用，之後外銷到數十個國家，使用多種口徑。"
  },
  {
    id: "hotchkiss", name: "霍奇基斯 M1914", type: "mg",
    country: "法國", region: "歐洲", year: 1914,
    activeFrom: 1914, activeTo: 1945,
    activeNote: "1914 年起服役，第一次世界大戰期間是法軍的主要機槍之一，二戰仍有使用。",
    caliber: "8×50mmR Lebel", action: "導氣式，彈板供彈",
    summary: "法國的中型機槍，用金屬彈板供彈，導氣式設計，在第一次世界大戰中以耐用著稱。",
    history: "1914 年成為法國軍隊的制式機槍，第一次世界大戰期間大量使用，也外銷到其他國家。"
  },
  {
    id: "zb26", name: "ZB vz. 26", type: "mg",
    country: "捷克斯洛伐克", region: "歐洲", year: 1926,
    activeFrom: 1926, activeTo: 1950,
    activeNote: "1926 年起服役，主要在二戰前與戰時使用，也外銷到許多國家。",
    caliber: "7.92×57mm 毛瑟", action: "導氣式，彈匣供彈",
    summary: "捷克斯洛伐克的輕機槍，彈匣裝在上方，影響了英國的布倫輕機槍。",
    history: "1926 年由捷克斯洛伐克布爾諾兵工廠完成，後來被英國改良成布倫輕機槍，Bren 這個名字就是取自 Brno（布爾諾）與 Enfield（恩菲爾德）。"
  },
  {
    id: "m2", name: "白朗寧 M2", type: "mg",
    country: "美國", region: "北美", year: 1933,
    activeFrom: 1933, activeTo: null,
    activeNote: "1933 年起成為美軍制式裝備，服役將近一百年，至今仍在使用。",
    caliber: ".50 BMG（12.7×99mm 北約）", action: "短行程後座式，彈鏈供彈",
    summary: "大口徑重機槍，可以裝在車輛、飛機或三腳架上，被暱稱為「Ma Deuce」。",
    history: "由約翰．白朗寧設計，原型來自第一次世界大戰末期，1933 年成為美軍制式裝備，之後在各種戰爭中使用。"
  },
  {
    id: "win1897", name: "Winchester M1897", type: "sg",
    country: "美國", region: "北美", year: 1897,
    activeFrom: 1897, activeTo: 1957,
    activeNote: "1897 年推出，一直生產到 1957 年，第一次世界大戰的戰壕槍型最有名。",
    caliber: "12 號", action: "泵動式，外露擊錘",
    summary: "早期的泵動式霰彈槍，有外露的擊錘，可以按住扳機、連續拉動護木快速連發。",
    history: "由約翰．白朗寧設計，1897 年由溫徹斯特公司推出，第一次世界大戰時，美軍使用加裝刺刀座與護罩的「戰壕槍」型號。"
  },
  {
    id: "saiga12", name: "Saiga-12", type: "sg",
    country: "俄羅斯", region: "俄羅斯與中亞", year: 1997,
    activeFrom: 1997, activeTo: null,
    activeNote: "1997 年起生產，至今仍在生產，俄軍也使用衍生型。",
    caliber: "12 號（另有 20 號與 .410）", action: "半自動，導氣式，迴轉式槍機",
    summary: "以 AK 步槍為基礎改造的半自動霰彈槍，外型像 AK，用彈匣供彈。",
    history: "由伊茲馬什（今卡拉什尼科夫集團）在 1990 年代設計，1997 年起生產，沿用 AK 的導氣系統。"
  },
  {
    id: "auto5", name: "Browning Auto-5", type: "sg",
    country: "比利時", region: "歐洲", year: 1902,
    activeFrom: 1902, activeTo: 1998,
    activeNote: "1902 年開始生產，是第一種成功的半自動霰彈槍，生產到 1990 年代末。",
    caliber: "12 號（另有 16 號與 20 號）", action: "半自動，長行程後座式",
    summary: "世界上第一種成功的半自動霰彈槍，駝背形的機匣很有辨識度。",
    history: "由約翰．白朗寧設計，在美國找不到廠商，轉由比利時 FN 公司在 1902 年開始製造，因此常被視為比利時的產品。"
  },
  {
    id: "ithaca37", name: "Ithaca 37", type: "sg",
    country: "美國", region: "北美", year: 1937,
    activeFrom: 1937, activeTo: null,
    activeNote: "1937 年上市，至今仍在生產，軍警與民間都有使用。",
    caliber: "12 號（另有其他口徑）", action: "泵動式，下方退殼",
    summary: "泵動式霰彈槍，彈殼從下方退出，左撇子與右撇子都能順手使用。",
    history: "1937 年由美國伊薩卡公司推出，在越戰等行動中被美軍使用，也長期被警察採用。"
  }
];

/* ===== 槍種資料：六大槍種的名稱與說明，圖鑑頁會用到 ===== */
const gunTypes = [
  { id: "hg",  code: "HG",  name: "手槍",
    desc: "單手握持射擊的短槍，體積小、重量輕，主要用於近距離自衛，也是軍警的備用武器。" },
  { id: "smg", code: "SMG", name: "衝鋒槍",
    desc: "使用手槍子彈的連發短槍，近距離的火力比手槍強，體積又比步槍小。" },
  { id: "ar",  code: "AR",  name: "突擊步槍",
    desc: "使用中等威力子彈的連發步槍，在射程、重量與火力之間取得平衡，是現代步兵最常見的主力武器。" },
  { id: "rf",  code: "RF",  name: "步槍",
    desc: "槍管較長，射程遠、精準度高。早期多為栓動式，後來也出現半自動型號。" },
  { id: "mg",  code: "MG",  name: "機槍",
    desc: "為提供持續火力而設計，射速高、供彈量大，通常架在腳架上使用。" },
  { id: "sg",  code: "SG",  name: "霰彈槍",
    desc: "發射內含多顆小彈丸的霰彈，近距離的涵蓋範圍較廣，也常用於狩獵與運動射擊。" }
];


/* =====================================================================
   以下是網站的程式：切換畫面、產生圖鑑、篩選表格、顯示詳細資料
   ===================================================================== */

// 小工具：建立一個元素，設定 class 與文字
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// 小工具：用代號找資料
const findGun = function (id) { return guns.find(function (g) { return g.id === id; }); };
const typeName = function (id) { return gunTypes.find(function (t) { return t.id === id; }).name; };

// 把年份分成三個年代（表格的「年代」篩選用）
const eras = ["1940 年以前", "1940–1969 年", "1970 年以後"];
function eraOf(year) {
  if (year < 1940) return eras[0];
  if (year < 1970) return eras[1];
  return eras[2];
}

/* ---------- 像素槍枝圖示 ----------
   每個槍種一個圖示，用幾個方塊拼成：[x, y, 寬, 高]，單位是一格像素。
   想修改造型，改這裡的數字就好。沒有照片時，卡片也會用它當作預設圖。 */
const SVG_NS = "http://www.w3.org/2000/svg";
const pixelGuns = {
  hg:  [[10,2,12,3],[10,5,4,6],[14,5,5,1],[18,5,1,2]],
  smg: [[8,2,14,4],[22,3,6,2],[2,3,6,2],[2,3,1,3],[13,6,3,6],[9,6,3,5],[20,1,2,1]],
  ar:  [[0,3,6,3],[6,2,12,4],[18,3,8,3],[26,3,6,2],[13,6,3,4],[15,9,2,2],[8,6,3,5],[28,1,1,2]],
  rf:  [[0,4,12,4],[0,8,3,3],[12,3,6,3],[18,3,14,2],[15,1,2,2]],
  mg:  [[0,3,6,4],[6,2,14,5],[20,3,12,2],[11,7,6,4],[24,5,1,6],[28,5,1,6],[8,1,8,1]],
  sg:  [[0,4,8,4],[0,8,3,3],[8,3,6,3],[14,3,18,2],[18,5,7,2],[9,6,3,2]]
};

// 用方塊畫出像素圖：rects 是 [x, y, 寬, 高] 的清單，w、h 是整張圖的格數
// 每個方塊都記下自己的順序（--i），動畫會依順序一塊一塊出現或亮起
function drawPixels(rects, w, h) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 " + w + " " + h);
  svg.setAttribute("shape-rendering", "crispEdges");
  svg.setAttribute("aria-hidden", "true");
  rects.forEach(function (r, i) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", r[0]);
    rect.setAttribute("y", r[1]);
    rect.setAttribute("width", r[2]);
    rect.setAttribute("height", r[3]);
    rect.setAttribute("fill", "currentColor");
    rect.style.setProperty("--i", i);
    svg.appendChild(rect);
  });
  return svg;
}

function pixelIcon(typeId) { return drawPixels(pixelGuns[typeId], 32, 12); }

// 網站標誌：像素準星，最後一個方塊是中心的黃點
const logoPixels = [[5,0,2,2],[5,10,2,2],[0,5,2,2],[10,5,2,2],[4,2,4,1],[4,9,4,1],[2,4,1,4],[9,4,1,4],[3,3,1,1],[8,3,1,1],[3,8,1,1],[8,8,1,1],[5,5,2,2]];

// 沒有照片時顯示的預設圖：點陣背景加上像素槍
function artPlaceholder(typeId) {
  const box = el("div", "art");
  box.appendChild(pixelIcon(typeId));
  return box;
}

/* ---------- 槍枝照片 ----------
   照片放在 images/ 資料夾，檔名用槍枝代號，例如 images/ak47.jpg（也可以是 .png）。
   找不到圖片檔時，會自動換成像素槍預設圖，版面不會壞掉，所以可以一張一張慢慢補。 */
function photo(gun) {
  const img = el("img");
  img.alt = gun.name;
  img.loading = "lazy";
  img.src = "images/" + gun.id + ".jpg";
  img.addEventListener("error", function () {
    if (img.src.endsWith(".jpg")) img.src = "images/" + gun.id + ".png";
    else img.replaceWith(artPlaceholder(gun.type));
  });
  return img;
}

// 圖片來源：下載照片後，把作者與授權寫在這裡，詳細畫面會自動顯示。
// 格式：代號: "作者，授權，Wikimedia Commons"
const imageCredits = {
  // ak47: "作者姓名，CC BY-SA 4.0，Wikimedia Commons",
};

// 延伸閱讀：每把槍對應的維基百科（英文）頁面名稱，詳細頁會產生「另開新視窗」的按鈕
const wikiPages = {
  m1911: "M1911_pistol",
  glock17: "Glock_17",
  mp5: "Heckler_%26_Koch_MP5",
  thompson1928: "Thompson_submachine_gun",
  ak47: "AK-47",
  m16: "M16_rifle",
  kar98k: "Karabiner_98k",
  m14: "M14_rifle",
  mg42: "MG_42",
  m249: "M249_light_machine_gun",
  remington870: "Remington_Model_870",
  benellim4: "Benelli_M4_Super_90",
  cz75: "CZ_75",
  makarov: "Makarov_pistol",
  uzi: "Uzi",
  ppsh41: "PPSh-41",
  type56: "Type_56_assault_rifle",
  t91: "T91_assault_rifle",
  leeenfield: "Lee%E2%80%93Enfield",
  type38: "Type_38_rifle",
  bren: "Bren_light_machine_gun",
  pkm: "PK_machine_gun",
  spas12: "SPAS-12",
  mossberg500: "Mossberg_500",
  fiveseven: "FN_Five-seven",
  deserteagle: "Desert_Eagle",
  suomi: "Suomi_KP/-31",
  ump45: "Heckler_%26_Koch_UMP",
  hk416: "HK416",
  fal: "FN_FAL",
  liu: "Special:Search?search=General+Liu+rifle",
  martinihenry: "Martini%E2%80%93Henry",
  mg338: "SIG_Sauer_MMG_338",
  negev: "IWI_Negev",
  mag7: "MAG-7",
  uts15: "UTAS_UTS-15",
  sigp210: "SIG_P210",
  fmk3: "FMK-3_submachine_gun",
  owen: "Owen_Gun",
  carlgustaf: "Carl_Gustaf_m/45",
  pm63: "PM-63_RAK",
  insas: "INSAS_rifle",
  k2: "Daewoo_K2",
  sar21: "SAR_21",
  m70: "Zastava_M70",
  ia2: "IMBEL_IA2",
  cetme: "CETME_rifle",
  ross: "Ross_rifle",
  madsen: "Madsen_machine_gun",
  hotchkiss: "Hotchkiss_M1914_machine_gun",
  zb26: "ZB_vz._26",
  m2: "M2_Browning",
  win1897: "Winchester_Model_1897",
  saiga12: "Saiga-12",
  auto5: "Browning_Auto-5",
  ithaca37: "Ithaca_37"
};

/* ---------- 世界地圖 ----------
   點陣地圖：worldRows 的每個 # 是一格陸地（每格 2.5 度），. 是海洋。
   有收錄槍枝的國家會亮起黃點。新增一個國家時，在 mapSpots 加一筆：
   countries 是資料裡 country 欄位的寫法，lat、lon 是緯度與經度，r 是要亮起的範圍（0 代表只亮一格）。 */
const worldRows = [
  "....................................#########...###############.................................................................................",
  "...................................##############################...............................................................................",
  "....................................#############################................................................##.............................",
  "...............................................#################...............................###........############..........................",
  "......................#########.......####.......###############.............................##.....#######################...####..............",
  ".......#########...#####.######......########.....#############................######..............###########################################..",
  "###..##########################################...###########................###########..######################################################",
  "###..####################################.#####....#######.....###..........##########..########################################################",
  "#.....##############################.....#..##......####..................######.###############################################################",
  "......############################.......####........##...................#####..######################################################.#####...",
  "........###.......#################......######.......................#.....###..################################################......###......",
  ".......#...........###################..########....................####...###.#################################################......###.......",
  "....................###################.##########..................#####.######################################################......##........",
  ".....................#############################.....................##########################################################...............",
  "......................########################..###...................###########################################################...............",
  "......................#########################........................#############.######..##################################.................",
  "......................######################........................#######.########....###.##################################..##..............",
  "......................#####################.........................####...#..#.############.###############################....#...............",
  ".......................###################..........................####..##.#..##.#########.###########################..##...##...............",
  ".......................###################...........................#######..........##################################...#.###................",
  ".........................################...........................##########..#.....###################################...#...................",
  "..........................##############............................#####################################################.......................",
  "..........................########.....#...........................######################################################.......................",
  "...........................######.................................####################.######.##########################........................",
  ".............................####.....##.........................###############################...####################.#.......................",
  "..............................###...#...##.#.....................######################.########.....######..######.............................",
  "...............................######......#.....................#######################.######......#####...######.....#.......................",
  "..................................#####..........................#######################.###.........###.......#####....#.......................",
  ".....................................##....#.....................#########################............##.......#####............................",
  "......................................#...#####...................##########################..........##.......#..#.............................",
  ".......................................##########..................#########################............#......#.........##.....................",
  ".........................................##########.................####..##################..................#.#.....##........................",
  ".........................................###########........................###############...................####...##.........................",
  "........................................#############......................###############.....................##..#######......................",
  "........................................################....................#############.......................##..###.#....#.#................",
  ".......................................##################...................############.........................##.....#.....####..............",
  "........................................##################...................###########..........................####.........#####............",
  ".........................................#################...................###########..........................................##............",
  ".........................................################....................############...................................##..#...............",
  "..........................................###############....................###########...#..............................#####.##..............",
  "...........................................##############....................##########...##.............................##########.............",
  "............................................############.....................#########...###...........................############.............",
  "............................................############.....................#########...##...........................##############............",
  "............................................#########.........................########....#..........................################...........",
  "...........................................##########.........................#######................................#################..........",
  "...........................................#########...........................######................................################...........",
  "...........................................#########...........................#####..................................###############...........",
  "...........................................#######..............................#.....................................###.....#######...........",
  "..........................................#######...............................................................................####.........##.",
  "..........................................#####...............................................................................................#.",
  "..........................................####....................................................................................##........##..",
  "..........................................####.............................................................................................##...",
  "..........................................####..................................................................................................",
  "..........................................###...................................................................................................",
  "..........................................###...................................................................................................",
  "...........................................###.................................................................................................."
];
const MAP_STEP = 2.5;
const MAP_TOP = 84;

const mapSpots = [
  { name: "美國", countries: ["美國"], lat: 39, lon: -98, r: 3 },
  { name: "奧地利", countries: ["奧地利"], lat: 47.5, lon: 14.5, r: 0 },
  { name: "德國", countries: ["德國"], lat: 51, lon: 10.3, r: 0 },
  { name: "俄羅斯（含蘇聯）", countries: ["蘇聯", "俄羅斯"], lat: 56, lon: 45, r: 3 },
  { name: "比利時", countries: ["比利時"], lat: 50.8, lon: 4.6, r: 0 },
  { name: "義大利", countries: ["義大利"], lat: 42.8, lon: 12.5, r: 0 },
  { name: "捷克（含捷克斯洛伐克）", countries: ["捷克斯洛伐克", "捷克"], lat: 49.8, lon: 15.5, r: 0 },
  { name: "以色列", countries: ["以色列"], lat: 31.5, lon: 35, r: 0 },
  { name: "中國", countries: ["中國"], lat: 35, lon: 103, r: 3 },
  { name: "台灣（中華民國）", countries: ["台灣（中華民國）", "台灣", "中華民國"], lat: 23.7, lon: 121, r: 0 },
  { name: "英國", countries: ["英國"], lat: 53, lon: -1.5, r: 0 },
  { name: "日本", countries: ["日本"], lat: 36, lon: 138, r: 0 },
  { name: "芬蘭", countries: ["芬蘭"], lat: 64, lon: 26, r: 0 },
  { name: "南非", countries: ["南非"], lat: -29, lon: 24, r: 1 },
  { name: "土耳其", countries: ["土耳其"], lat: 39, lon: 35, r: 1 },
  { name: "瑞士", countries: ["瑞士"], lat: 46.8, lon: 8.2, r: 0 },
  { name: "阿根廷", countries: ["阿根廷"], lat: -34, lon: -64, r: 2 },
  { name: "澳洲", countries: ["澳洲"], lat: -25, lon: 134, r: 3 },
  { name: "瑞典", countries: ["瑞典"], lat: 60, lon: 15, r: 0 },
  { name: "波蘭", countries: ["波蘭"], lat: 52, lon: 19, r: 0 },
  { name: "印度", countries: ["印度"], lat: 22, lon: 79, r: 2 },
  { name: "南韓", countries: ["南韓"], lat: 36.5, lon: 127.8, r: 0 },
  { name: "新加坡", countries: ["新加坡"], lat: 1.3, lon: 103.8, r: 0 },
  { name: "塞爾維亞（含南斯拉夫）", countries: ["南斯拉夫", "塞爾維亞"], lat: 44.5, lon: 20.8, r: 0 },
  { name: "西班牙", countries: ["西班牙"], lat: 40, lon: -3.7, r: 0 },
  { name: "加拿大", countries: ["加拿大"], lat: 56, lon: -100, r: 3 },
  { name: "巴西", countries: ["巴西"], lat: -10, lon: -52, r: 3 },
  { name: "丹麥", countries: ["丹麥"], lat: 56, lon: 9.5, r: 0 },
  { name: "法國", countries: ["法國"], lat: 46.5, lon: 2.5, r: 0 }
];

function renderMap() {
  const box = document.getElementById("world-map");
  const chips = document.getElementById("map-chips");
  const panel = document.getElementById("map-panel");
  const CELL = 10;
  const rowsN = worldRows.length;
  const colsN = worldRows[0].length;

  // 每個地點的槍枝，以及它要亮起的格子
  mapSpots.forEach(function (spot) {
    spot.guns = guns.filter(function (g) { return spot.countries.indexOf(g.country) >= 0; });
    const cr = Math.floor((MAP_TOP - spot.lat) / MAP_STEP);
    const cc = Math.floor((spot.lon + 180) / MAP_STEP);
    spot.cells = [[cr, cc]];
    if (spot.r > 0) {
      for (let r = cr - spot.r; r <= cr + spot.r; r++) {
        for (let c = cc - spot.r; c <= cc + spot.r; c++) {
          const inside = r >= 0 && r < rowsN && c >= 0 && c < colsN;
          const near = (r - cr) * (r - cr) + (c - cc) * (c - cc) <= spot.r * spot.r;
          if (inside && near && worldRows[r][c] === "#" && !(r === cr && c === cc)) spot.cells.push([r, c]);
        }
      }
    }
  });
  const shown = mapSpots.filter(function (spot) { return spot.guns.length > 0; });
  const lit = new Set();
  shown.forEach(function (spot) { spot.cells.forEach(function (rc) { lit.add(rc[0] + "," + rc[1]); }); });

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 " + (colsN * CELL) + " " + (rowsN * CELL));
  svg.setAttribute("role", "group");
  svg.setAttribute("aria-label", "點陣世界地圖，亮起的是有收錄槍枝的國家");
  function dot(parent, r, c, radius, cls) {
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", c * CELL + CELL / 2);
    circle.setAttribute("cy", r * CELL + CELL / 2);
    circle.setAttribute("r", radius);
    if (cls) circle.setAttribute("class", cls);
    parent.appendChild(circle);
  }
  worldRows.forEach(function (row, r) {
    for (let c = 0; c < colsN; c++) {
      if (row[c] === "#" && !lit.has(r + "," + c)) dot(svg, r, c, 3, "land");
    }
  });

  const groups = [];
  const buttons = [];
  let year = null;      // null 代表顯示全部時期
  let current = null;
  const nowYear = new Date().getFullYear();

  // 某把槍在指定年份是否在役
  function activeIn(gun, y) {
    return gun.activeFrom <= y && (gun.activeTo === null ? nowYear : gun.activeTo) >= y;
  }
  function gunsOf(spot) {
    return year === null ? spot.guns : spot.guns.filter(function (g) { return activeIn(g, year); });
  }

  function showPanel(spot) {
    panel.replaceChildren();
    const list = gunsOf(spot);
    const title = el("h3", "", spot.name);
    title.appendChild(el("span", "count", list.length + " 把"));
    panel.appendChild(title);
    if (year !== null) panel.appendChild(el("p", "map-year-note", year + " 年在役的槍"));
    if (list.length === 0) {
      panel.appendChild(el("p", "", "這個年份沒有在役的槍。"));
      return;
    }
    const ul = el("ul", "map-guns");
    list.forEach(function (gun) {
      const li = el("li");
      const a = el("a", "", gun.name + "（" + typeName(gun.type) + "，" + gun.year + "）");
      a.href = "#/gun/" + gun.id;
      li.appendChild(a);
      ul.appendChild(li);
    });
    panel.appendChild(ul);
  }

  function select(spot) {
    current = spot;
    groups.forEach(function (g) { g.group.classList.toggle("active", g.spot === spot); });
    buttons.forEach(function (b) { b.button.setAttribute("aria-pressed", b.spot === spot ? "true" : "false"); });
    showPanel(spot);
  }

  shown.forEach(function (spot) {
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "spot");
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", spot.name + "，" + spot.guns.length + " 把");
    spot.cells.forEach(function (rc) { dot(group, rc[0], rc[1], 4.6); });
    group.addEventListener("click", function () { select(spot); });
    group.addEventListener("mouseenter", function () { select(spot); });
    group.addEventListener("focus", function () { select(spot); });
    svg.appendChild(group);
    groups.push({ spot: spot, group: group });
  });
  box.appendChild(svg);

  // 地圖下方的按鈕列：給鍵盤與手機使用，也方便直接選國家
  shown.slice().sort(function (a, b) { return b.guns.length - a.guns.length; }).forEach(function (spot) {
    const button = el("button", "map-chip", spot.name + " ");
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    button.appendChild(el("span", "count", String(spot.guns.length)));
    button.addEventListener("click", function () { select(spot); });
    chips.appendChild(button);
    buttons.push({ spot: spot, button: button });
  });

  document.getElementById("map-chips-title").textContent = "國家列表（" + shown.length + " 個）";

  // 年代滑桿：拖到哪一年，就只有那一年有槍在役的國家亮起；也可以按播放自動前進
  const slider = document.getElementById("map-year");
  const yearOut = document.getElementById("map-year-out");
  const yearInfo = document.getElementById("map-year-info");
  const playBtn = document.getElementById("map-play");
  const allBtn = document.getElementById("map-all");
  slider.min = 1870;
  slider.max = nowYear;
  slider.value = nowYear;
  let timer = null;

  function applyYear(y) {
    year = y;
    let countries = 0, total = 0;
    groups.forEach(function (g) {
      const n = gunsOf(g.spot).length;
      g.group.classList.toggle("off", n === 0);
      g.group.setAttribute("tabindex", n === 0 ? "-1" : "0");
      if (n > 0) { countries++; total += n; }
    });
    buttons.forEach(function (b) { b.button.classList.toggle("off", gunsOf(b.spot).length === 0); });
    if (y === null) {
      yearOut.textContent = "全部";
      yearInfo.textContent = "目前顯示所有時期的收錄，拖動滑桿可以看某一年有哪些國家的槍在服役。";
    } else {
      yearOut.textContent = String(y);
      yearInfo.textContent = y + " 年：" + countries + " 個國家、" + total + " 把槍在役。";
      slider.setAttribute("aria-valuetext", y + " 年，" + countries + " 個國家有槍在役");
    }
    if (current) showPanel(current);
  }
  function stopPlay() {
    if (timer) { clearInterval(timer); timer = null; }
    playBtn.textContent = "播放";
  }
  slider.addEventListener("input", function () { stopPlay(); applyYear(Number(slider.value)); });
  playBtn.addEventListener("click", function () {
    if (timer) { stopPlay(); return; }
    if (year === null || year >= nowYear) slider.value = slider.min;
    playBtn.textContent = "暫停";
    applyYear(Number(slider.value));
    timer = setInterval(function () {
      const next = Number(slider.value) + 1;
      if (next > nowYear) { stopPlay(); return; }
      slider.value = next;
      applyYear(next);
    }, 70);
  });
  allBtn.addEventListener("click", function () {
    stopPlay();
    slider.value = nowYear;
    applyYear(null);
  });
  applyYear(null);

  panel.appendChild(el("p", "map-empty", "點選地圖上亮起的國家，或下方的國家按鈕，查看收錄的槍。"));
}

/* ---------- 首頁：今日一槍、資料統計、槍械簡史 ---------- */
// 資料統計：由資料自動計算，之後新增槍會自動更新
function renderFacts() {
  const box = document.getElementById("facts");
  const years = guns.map(function (g) { return g.year; });
  const countries = new Set(guns.map(function (g) { return g.country; }));
  [
    [String(guns.length), "收錄槍枝（把）"],
    [String(countries.size), "來自國家（個）"],
    [Math.min.apply(null, years) + "–" + Math.max.apply(null, years), "設計年代"]
  ].forEach(function (row) {
    const card = el("div", "stat-card");
    card.appendChild(el("span", "num", row[0]));
    card.appendChild(el("span", "", row[1]));
    box.appendChild(card);
  });
}

// 術語說明：首頁的小卡片，之後可以擴充成完整的小辭典
const glossary = [
  { term: "口徑", en: "Caliber", text: "槍管內徑的大小，也用來稱呼子彈的規格，例如 5.56mm、.45 吋。數字大不代表一定更強，還要看彈殼長度與火藥量。" },
  { term: "作動方式", en: "Action", text: "槍每發射一次，要自動或手動完成退殼與上膛。完成的方法不同，就是不同的作動方式。" },
  { term: "導氣式", en: "Gas-operated", text: "利用射擊時產生的一部分火藥氣體推動機件，完成退殼與上膛。AK-47 和 M16 都屬於這一類。" },
  { term: "反衝式與後座式", en: "Blowback / Recoil", text: "反衝式靠彈殼推動槍機後退；後座式則是槍管與槍機一起後退一小段。兩者都不需要導氣管，常見於手槍與衝鋒槍。" },
  { term: "栓動式", en: "Bolt-action", text: "每打一發，就要手動拉動槍栓退殼，再推回去上膛。速度較慢，但結構堅固，也比較精準。" },
  { term: "泵動式", en: "Pump-action", text: "前後拉動護木來退殼與上膛，是霰彈槍常見的作動方式。" },
  { term: "北約", en: "NATO", text: "北大西洋公約組織。「5.56×45mm 北約」是指北約成員國共同採用的標準彈藥規格，讓不同國家的槍可以通用彈藥。" },
  { term: "毛瑟", en: "Mauser", text: "德國的槍械公司。「7.92×57mm 毛瑟」是以毛瑟步槍命名的子彈規格，德軍在兩次世界大戰中大量使用。" },
  { term: "延遲反衝式", en: "Delayed blowback", text: "槍機後退前先被卡住一下，等膛壓降下來才打開，所以威力較大的子彈也能用反衝式。MP5 和 G3 用的滾輪延遲就是其中一種。" },
  { term: "開放式槍機", en: "Open bolt", text: "射擊前槍機停在後方，扣扳機才向前衝、推彈、擊發。散熱比較好，但槍機前衝會影響瞄準。Uzi 和 PPSh-41 都是這樣。" },
  { term: "彈鏈供彈", en: "Belt-fed", text: "子彈串在金屬彈鏈上送進槍膛，彈量大，所以機槍常用。" },
  { term: "彈藥名稱裡的人名", en: "Named cartridges", text: "像「7.62×25mm 托卡列夫」「9×18mm 馬卡洛夫」「6.5×50mmSR 有坂」，都是以設計者的名字命名。" }
];

function renderTerms() {
  const box = document.getElementById("terms");
  glossary.forEach(function (item) {
    const card = el("div", "term-card");
    const title = el("h3", "", item.term);
    title.appendChild(el("span", "en", item.en));
    card.appendChild(title);
    card.appendChild(el("p", "", item.text));
    box.appendChild(card);
  });
}

// 槍械簡史：gun 有填代號的節點，會連到本站的詳細頁
const gunTimeline = [
  { year: 1807, title: "擊發式點火", text: "福賽斯取得擊發點火的專利，逐漸取代燧發槍機。", gun: null },
  { year: 1836, title: "柯爾特左輪", text: "柯爾特取得左輪手槍專利，連發手槍開始普及。", gun: null },
  { year: 1884, title: "馬克沁機槍", text: "利用射擊時的後座力自動裝填，是第一種成功的全自動機槍。", gun: null },
  { year: 1886, title: "Lebel 步槍", text: "法國的 Lebel 步槍使用無煙火藥彈，軍用步槍進入新階段。", gun: null },
  { year: 1911, title: "M1911 手槍", text: "成為美軍制式手槍，之後服役超過七十年。", gun: "m1911" },
  { year: 1928, title: "湯普森 M1928", text: "被美國海軍採用，二戰時期大量出現在盟軍部隊。", gun: "thompson1928" },
  { year: 1935, title: "Kar98k", text: "以毛瑟 Gewehr 98 為基礎改良，成為二戰德軍主力步槍。", gun: "kar98k" },
  { year: 1942, title: "MG42 機槍", text: "以極高的射速聞名，影響了戰後許多機槍的設計。", gun: "mg42" },
  { year: 1944, title: "StG 44", text: "德國的 StG 44 投入戰場，被視為突擊步槍的始祖。", gun: null },
  { year: 1947, title: "AK-47", text: "卡拉希尼可夫完成設計，之後成為產量最多的步槍之一。", gun: "ak47" },
  { year: 1950, title: "Remington 870", text: "上市後長銷數十年，是最暢銷的霰彈槍之一。", gun: "remington870" },
  { year: 1962, title: "M16", text: "AR-15 系列被美軍採用，並在越戰中大量使用。", gun: "m16" },
  { year: 1982, title: "Glock 17", text: "聚合物槍身的手槍問世，影響了後來的手槍設計。", gun: "glock17" },
  { year: 1998, title: "Benelli M4", text: "半自動霰彈槍推出，美國海軍陸戰隊採用後稱為 M1014。", gun: "benellim4" }
];

function renderTimeline() {
  const list = document.getElementById("timeline");
  gunTimeline.forEach(function (item) {
    const li = el("li", item.gun ? "has-gun" : "");
    li.appendChild(el("span", "year", String(item.year)));
    li.appendChild(el("h3", "", item.title));
    li.appendChild(el("p", "", item.text));
    if (item.gun) {
      const link = el("a", "text-link", "本站收錄，看詳細資料");
      link.href = "#/gun/" + item.gun;
      li.appendChild(link);
    }
    list.appendChild(li);
  });
}

// 像素箭頭：左右各一個（5 格寬、9 格高）
const arrowLeft = [[4,0,1,1],[3,1,2,1],[2,2,3,1],[1,3,4,1],[0,4,5,1],[1,5,4,1],[2,6,3,1],[3,7,2,1],[4,8,1,1]];
const arrowRight = [[0,0,1,1],[0,1,2,1],[0,2,3,1],[0,3,4,1],[0,4,5,1],[0,5,4,1],[0,6,3,1],[0,7,2,1],[0,8,1,1]];

const tlViewport = document.getElementById("timeline-viewport");
const tlPrev = document.getElementById("tl-prev");
const tlNext = document.getElementById("tl-next");
const reduceMotion = function () { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; };

// 捲到最左或最右時，對應的按鈕變成不能按
function updateTimelineNav() {
  tlPrev.disabled = tlViewport.scrollLeft <= 1;
  tlNext.disabled = tlViewport.scrollLeft + tlViewport.clientWidth >= tlViewport.scrollWidth - 1;
}

function scrollTimeline(direction) {
  tlViewport.scrollBy({
    left: direction * Math.round(tlViewport.clientWidth * 0.8),
    behavior: reduceMotion() ? "auto" : "smooth"
  });
}

function setupTimelineNav() {
  tlPrev.appendChild(drawPixels(arrowLeft, 5, 9));
  tlNext.appendChild(drawPixels(arrowRight, 5, 9));
  tlPrev.addEventListener("click", function () { scrollTimeline(-1); });
  tlNext.addEventListener("click", function () { scrollTimeline(1); });
  tlViewport.addEventListener("scroll", updateTimelineNav);
  window.addEventListener("resize", updateTimelineNav);
}

/* ---------- 畫面二：槍種圖鑑 ---------- */
// 一張槍枝卡片：圖鑑與槍種頁都用它

/* ---------- 收藏與比較（存在瀏覽器的 localStorage，不用登入） ---------- */
function readList(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(v) ? v.filter(function (id) { return findGun(id); }) : [];
  } catch (e) { return []; }
}
function writeList(key, list) { try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) {} }
let favs = readList("arsenal-favs");
let cmp = readList("arsenal-compare");
const CMP_MAX = 3;

// 像素星星：收藏時整顆填滿，沒收藏時只有外框
const starRows = ["....#....", "...###...", "...###...", "#########", ".#######.", "..#####..", "..##.##..", ".##...##.", ".#.....#."];
function starIcon(on) {
  const rects = [];
  starRows.forEach(function (row, y) {
    for (let x = 0; x < 9; x++) {
      if (row[x] !== "#") continue;
      const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(function (d) {
        const r = starRows[y + d[1]], c = x + d[0];
        return !r || c < 0 || c > 8 || r[c] !== "#";
      });
      if (on || edge) rects.push([x, y, 1, 1]);
    }
  });
  const svg = drawPixels(rects, 9, 9);
  svg.setAttribute("class", "star");
  return svg;
}
function favHas(id) { return favs.indexOf(id) >= 0; }
function cmpHas(id) { return cmp.indexOf(id) >= 0; }

let toastTimer = 0;
function toast(text) {
  let t = document.getElementById("toast");
  if (!t) { t = el("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = text; t.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove("on"); }, 1800);
}

// 把頁面上所有收藏、比較相關的按鈕與數字更新成目前的狀態
function refreshMarks() {
  document.querySelectorAll(".fav-btn").forEach(function (b) {
    const on = favHas(b.dataset.id);
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.classList.toggle("on", on);
    const icon = b.querySelector(".star");
    if (icon) icon.replaceWith(starIcon(on));
    const label = b.querySelector(".fav-label");
    if (label) label.textContent = on ? "已收藏" : "收藏";
  });
  document.querySelectorAll(".cmp-btn").forEach(function (b) {
    const on = cmpHas(b.dataset.id);
    b.setAttribute("aria-pressed", on ? "true" : "false");
    b.classList.toggle("on", on);
    const label = b.querySelector(".cmp-label");
    if (label) label.textContent = on ? "已加入比較" : "加入比較";
  });
  document.querySelectorAll(".cmp-check").forEach(function (c) { c.checked = cmpHas(c.dataset.id); });
  const badge = document.getElementById("fav-count");
  badge.textContent = String(favs.length);
  badge.hidden = favs.length === 0;
  const tray = document.getElementById("compare-tray");
  const onCompare = location.hash.indexOf("#/compare") === 0;
  tray.hidden = cmp.length === 0 || onCompare;
  document.body.classList.toggle("has-tray", !tray.hidden);
  const chips = document.getElementById("compare-chips");
  chips.replaceChildren();
  cmp.forEach(function (id) {
    const li = el("li");
    li.appendChild(el("span", "", findGun(id).name));
    const x = el("button", "chip-x", "×");
    x.type = "button"; x.setAttribute("aria-label", "移除 " + findGun(id).name);
    x.addEventListener("click", function () { cmpToggle(id); });
    li.appendChild(x);
    chips.appendChild(li);
  });
  const go = document.getElementById("compare-go");
  go.classList.toggle("disabled", cmp.length < 2);
  go.textContent = cmp.length < 2 ? "再選一把" : "開始比較（" + cmp.length + "）";
}
function favToggle(id) {
  favs = favHas(id) ? favs.filter(function (x) { return x !== id; }) : favs.concat(id);
  writeList("arsenal-favs", favs);
  refreshMarks();
  if (location.hash.indexOf("#/favorites") === 0) renderFavorites();
}
function cmpToggle(id) {
  if (cmpHas(id)) cmp = cmp.filter(function (x) { return x !== id; });
  else if (cmp.length >= CMP_MAX) { toast("最多同時比較 " + CMP_MAX + " 把，先移除一把"); refreshMarks(); return; }
  else cmp = cmp.concat(id);
  writeList("arsenal-compare", cmp);
  refreshMarks();
  if (location.hash.indexOf("#/compare") === 0) renderCompare();
}
function favButton(gun, withLabel) {
  const b = el("button", "fav-btn" + (withLabel ? " btn" : ""));
  b.type = "button"; b.dataset.id = gun.id;
  b.appendChild(starIcon(favHas(gun.id)));
  if (withLabel) b.appendChild(el("span", "fav-label", favHas(gun.id) ? "已收藏" : "收藏"));
  else b.setAttribute("aria-label", "收藏 " + gun.name);
  b.setAttribute("aria-pressed", favHas(gun.id) ? "true" : "false");
  b.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); favToggle(gun.id); });
  return b;
}
function cmpButton(gun) {
  const b = el("button", "cmp-btn btn");
  b.type = "button"; b.dataset.id = gun.id;
  b.appendChild(el("span", "cmp-label", cmpHas(gun.id) ? "已加入比較" : "加入比較"));
  b.setAttribute("aria-pressed", cmpHas(gun.id) ? "true" : "false");
  b.addEventListener("click", function () { cmpToggle(gun.id); });
  return b;
}
document.getElementById("compare-clear").addEventListener("click", function () { cmp = []; writeList("arsenal-compare", cmp); refreshMarks(); if (location.hash.indexOf("#/compare") === 0) renderCompare(); });
document.getElementById("compare-go").addEventListener("click", function (e) { if (cmp.length < 2) { e.preventDefault(); toast("再選一把槍就能比較了"); } });


/* ---------- 口徑對照：同一個比例尺的像素子彈 ---------- */
let calSort = "oal";
// 一把槍用到哪些子彈：口徑欄位裡出現的每一種都算；mainCaliber 是最先寫的那一種
function calibersOf(gun) { return calibers.filter(function (c) { return new RegExp(c.match).test(gun.caliber); }); }
function mainCaliber(gun) {
  let best = null, at = 1e9;
  calibers.forEach(function (c) { const m = new RegExp(c.match).exec(gun.caliber); if (m && m.index < at) { at = m.index; best = c; } });
  return best;
}
// 一顆子彈畫成像素圖：1 格 = 0.5 mm。彈殼用黃色、彈頭用深藍
function cartridgeSvg(c) {
  const U = 2;
  const L = Math.round(c.oal * U), cl = Math.round(c.case * U);
  const H = Math.round(Math.max(c.rim, c.base) * U) + 2;
  const mid = H / 2;
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 " + L + " " + H);
  svg.setAttribute("shape-rendering", "crispEdges");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", c.name + " 子彈，全長 " + c.oal + " 毫米");
  function rect(cls, x, w, h) {
    h = Math.max(1, Math.round(h)); const y = Math.round(mid - h / 2);
    const r = document.createElementNS(SVG_NS, "rect");
    r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", Math.max(1, w)); r.setAttribute("height", h);
    r.setAttribute("class", cls); svg.appendChild(r);
  }
  const bd = c.base * U;
  if (c.shape === "shell") {
    const brass = Math.round(24 * U);
    rect("c-hull", brass, L - brass - 2, (c.base - 1.5) * U);
    rect("c-hull", L - 2, 2, (c.base - 3.5) * U);
    rect("c-case", 0, brass, bd);
    rect("c-case", 0, 2, c.rim * U);
    rect("c-bullet", 2, 3, 6);
    return svg;
  }
  // 彈殼
  if (c.shape === "bottle") {
    const body = Math.round(cl * 0.68), shoulder = Math.max(2, Math.round(cl * 0.1));
    const neck = (c.bullet + 0.7) * U;
    rect("c-case", 0, body, bd);
    rect("c-case", body, shoulder, (bd + neck) / 2);
    rect("c-case", body + shoulder, cl - body - shoulder, neck);
  } else {
    rect("c-case", 0, cl, bd);
  }
  if (c.rim > c.base + 0.3 || c.shape === "straight") rect("c-case", 0, 2, c.rim * U);
  rect("c-primer", 1, 2, bd * 0.4);
  // 彈頭：露出彈殼的那一段，尖端分三階變細
  const bh = c.bullet * U, bl = L - cl;
  const tip = Math.max(3, Math.round(bl * 0.55));
  rect("c-bullet", cl, bl - tip, bh);
  const steps = [0.85, 0.6, 0.3];
  steps.forEach(function (f, i) {
    const w = Math.max(1, Math.round(tip / 3));
    rect("c-bullet", cl + bl - tip + i * w, i === 2 ? L - (cl + bl - tip + i * w) : w, bh * f);
  });
  return svg;
}
function renderCalibers(focusId) {
  const box = document.getElementById("caliber-body");
  box.replaceChildren();
  const maxOal = Math.max.apply(null, calibers.map(function (c) { return c.oal; }));

  const tip = el("p", "cal-tip", "數字大不代表更強：5.56mm 的彈頭比 9mm 細，槍口動能卻是 9mm 的三倍以上。彈殼裝的火藥多少，影響更大。");
  box.appendChild(tip);

  const bar = el("div", "cal-sort");
  bar.appendChild(el("span", "", "排序"));
  [["oal", "全長"], ["energy", "槍口動能"], ["bullet", "彈頭直徑"]].forEach(function (s) {
    const b = el("button", "map-chip", s[1]); b.type = "button";
    b.setAttribute("aria-pressed", calSort === s[0] ? "true" : "false");
    b.addEventListener("click", function () { calSort = s[0]; renderCalibers(focusId); });
    bar.appendChild(b);
  });
  box.appendChild(bar);

  const list = el("div", "cal-list");
  // 比例尺：10 mm
  const ruler = el("div", "cal-row cal-ruler");
  ruler.appendChild(el("span", "", ""));
  const rArt = el("div", "cal-art");
  const rBar = el("div", "ruler-bar"); rBar.style.width = (10 / maxOal * 100) + "%";
  rBar.appendChild(el("span", "", "10 mm"));
  rArt.appendChild(rBar);
  ruler.appendChild(rArt); ruler.appendChild(el("span", "", ""));
  list.appendChild(ruler);

  const sorted = calibers.slice().sort(function (a, b) { return calSort === "oal" ? a.oal - b.oal : calSort === "energy" ? a.energy - b.energy : a.bullet - b.bullet; });
  sorted.forEach(function (c) {
    const row = el("div", "cal-row" + (c.id === focusId ? " on" : ""));
    row.id = "cal-" + c.id;
    const label = el("div", "cal-label");
    label.appendChild(el("b", "", c.name));
    label.appendChild(el("span", "", c.note));
    row.appendChild(label);
    const art = el("div", "cal-art");
    const svg = cartridgeSvg(c);
    svg.style.width = (c.oal / maxOal * 100) + "%";
    art.appendChild(svg);
    row.appendChild(art);
    const info = el("div", "cal-info");
    info.appendChild(el("span", "", "全長 " + c.oal.toFixed(1) + " mm"));
    if (c.bullet) info.appendChild(el("span", "", "彈頭 " + c.bullet.toFixed(1) + " mm"));
    info.appendChild(el("span", "", "動能 約 " + c.energy.toLocaleString("en-US") + " J"));
    const users = guns.filter(function (g) { return new RegExp(c.match).test(g.caliber); });
    if (users.length) {
      const chips = el("div", "chip-row");
      users.slice(0, 3).forEach(function (g) { const a = el("a", "map-chip", g.name); a.href = "#/gun/" + g.id; chips.appendChild(a); });
      if (users.length > 3) chips.appendChild(el("span", "cal-more", "等 " + users.length + " 把"));
      info.appendChild(chips);
    }
    row.appendChild(info);
    list.appendChild(row);
  });
  box.appendChild(list);
  box.appendChild(el("p", "range-note", "尺寸是公開規格的約略值，不同廠牌的彈會有小差異；動能是常見裝填的約略值，霰彈依彈種差很多。.577/450、8×50mmR、6.5×50mmSR 這幾種老式彈找不到可靠尺寸，暫時沒有放。"));
  const target = focusId ? document.getElementById("cal-" + focusId) : null;
  if (target) setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "center" }); }, 50);
}

// 我的檔案夾
function renderFavorites() {
  const box = document.getElementById("fav-list");
  box.replaceChildren();
  if (!favs.length) {
    const p = el("div", "empty-state");
    p.appendChild(el("p", "", "目前還沒有收藏。點槍卡片或詳細頁的星星就能加入。"));
    const a = el("a", "btn btn-primary", "去圖鑑逛逛"); a.href = "#/catalog";
    p.appendChild(a);
    box.appendChild(p);
    return;
  }
  const bar = el("div", "fav-bar");
  bar.appendChild(el("p", "", "共 " + favs.length + " 把"));
  const toCmp = el("button", "btn", "把前三把加入比較"); toCmp.type = "button";
  toCmp.addEventListener("click", function () { cmp = favs.slice(0, CMP_MAX); writeList("arsenal-compare", cmp); refreshMarks(); location.hash = "#/compare"; });
  if (favs.length >= 2) bar.appendChild(toCmp);
  box.appendChild(bar);
  const cards = el("div", "cards");
  favs.forEach(function (id) { cards.appendChild(makeCard(findGun(id))); });
  box.appendChild(cards);
}

// 並排比較
function renderCompare() {
  const box = document.getElementById("compare-body");
  box.replaceChildren();
  const list = cmp.map(findGun).filter(Boolean);
  if (list.length < 2) {
    const p = el("div", "empty-state");
    p.appendChild(el("p", "", list.length ? "目前只選了一把，再加一把才能比較。" : "還沒有選槍。在比較表勾選，或在槍的詳細頁按「加入比較」。"));
    const a = el("a", "btn btn-primary", "到比較表選槍"); a.href = "#/table";
    p.appendChild(a);
    box.appendChild(p);
    return;
  }
  const data = list.map(function (g) { return { g: g, w: gunStats[g.id] ? weaponFor(g.id) : null }; });
  const wrap = el("div", "table-wrap");
  const t = el("table", "compare-table");
  const head = el("tr");
  head.appendChild(el("th", "", ""));
  data.forEach(function (d) {
    const th = el("th");
    const a = el("a", "", d.g.name); a.href = "#/gun/" + d.g.id;
    th.appendChild(a);
    const x = el("button", "chip-x", "×"); x.type = "button"; x.setAttribute("aria-label", "移除 " + d.g.name);
    x.addEventListener("click", function () { cmpToggle(d.g.id); });
    th.appendChild(x);
    head.appendChild(th);
  });
  const thead = el("thead"); thead.appendChild(head); t.appendChild(thead);
  const body = el("tbody");
  function addRow(label, values, better) {
    // better：數字越大越好填 "max"，越小越好填 "min"；找出最好的那一欄標起來
    const tr = el("tr");
    tr.appendChild(el("th", "row-label", label));
    let best = null;
    if (better) {
      const nums = values.filter(function (v) { return v !== null; });
      if (nums.length > 1) best = better === "max" ? Math.max.apply(null, nums.map(function (v) { return v.n; })) : Math.min.apply(null, nums.map(function (v) { return v.n; }));
    }
    values.forEach(function (v) {
      const td = el("td", v && best !== null && v.n === best && values.filter(function (x) { return x && x.n === best; }).length < values.length ? "best" : "", v ? v.text : "—");
      tr.appendChild(td);
    });
    body.appendChild(tr);
  }
  function plain(fn) { return data.map(function (d) { return { text: fn(d), n: 0 }; }); }
  addRow("槍種", plain(function (d) { return typeName(d.g.type); }));
  addRow("設計國家", plain(function (d) { return d.g.country; }));
  addRow("設計年份", plain(function (d) { return d.g.year + " 年"; }));
  addRow("口徑", plain(function (d) { return d.g.caliber; }));
  addRow("作動方式", plain(function (d) { return d.g.action; }));
  addRow("活躍時期", plain(function (d) { return d.g.activeNote; }));
  const sep = el("tr", "sep"); const sth = el("th", "", "試射資料（模擬值）"); sth.colSpan = data.length + 1; sep.appendChild(sth); body.appendChild(sep);
  function stat(fn, fmt) { return data.map(function (d) { if (!d.w) return null; const n = fn(d.w); return { n: n, text: fmt(n) }; }); }
  addRow("彈匣容量", stat(function (w) { return w.mag; }, function (n) { return n + " 發"; }), "max");
  addRow("射速", stat(function (w) { return w.mode === "auto" ? w.rpm : Math.round(60000 / w.rate); }, function (n) { return "約 " + n + " 發／分"; }), "max");
  addRow("裝填時間", stat(function (w) { return w.reload / 1000; }, function (n) { return n.toFixed(1) + " 秒"; }), "min");
  addRow("後座力", stat(function (w) { return w.kick; }, function (n) { return String(Math.round(n)); }), "min");
  addRow("射擊方式", data.map(function (d) { return d.w ? { n: 0, text: modeLabel[d.w.mode] } : null; }));
  t.appendChild(body); wrap.appendChild(t); box.appendChild(wrap);
  box.appendChild(el("p", "range-note", "標色的格子是這一列表現最好的。後座力是試射場用的模擬值，數字越小越穩。"));
  const act = el("div", "actions");
  const more = el("a", "btn", "再加一把"); more.href = "#/table";
  act.appendChild(more);
  box.appendChild(act);
}

/* ---------- 全站搜尋 ---------- */
(function setupSearch() {
  const input = document.getElementById("site-q");
  const list = document.getElementById("search-results");
  let items = [], active = -1;
  function find(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    const out = [];
    gunTypes.forEach(function (t) {
      if (t.name.toLowerCase().includes(q) || t.code.toLowerCase() === q) out.push({ href: "#/type/" + t.id, title: t.name, sub: "槍種・" + guns.filter(function (g) { return g.type === t.id; }).length + " 把", score: 5 });
    });
    guns.forEach(function (g) {
      let s = 0;
      if (g.name.toLowerCase().includes(q) || g.id.includes(q)) s = g.name.toLowerCase().startsWith(q) ? 6 : 4;
      else if (g.country.toLowerCase().includes(q)) s = 2;
      else if (g.caliber.toLowerCase().includes(q) || g.action.toLowerCase().includes(q)) s = 2;
      else if (String(g.year) === q) s = 2;
      else if (typeName(g.type).includes(q)) s = 1;
      if (s) out.push({ href: "#/gun/" + g.id, title: g.name, sub: typeName(g.type) + "・" + g.country + "・" + g.year, score: s });
    });
    return out.sort(function (a, b) { return b.score - a.score; }).slice(0, 8);
  }
  function close() { list.hidden = true; input.setAttribute("aria-expanded", "false"); active = -1; }
  function paint() {
    list.replaceChildren();
    if (!input.value.trim()) { close(); return; }
    items = find(input.value);
    if (!items.length) list.appendChild(el("li", "none", "找不到「" + input.value.trim() + "」"));
    items.forEach(function (it, i) {
      const li = el("li"); li.setAttribute("role", "option");
      const a = el("a"); a.href = it.href;
      a.appendChild(el("b", "", it.title)); a.appendChild(el("span", "", it.sub));
      a.addEventListener("click", function () { input.value = ""; close(); });
      li.appendChild(a); list.appendChild(li);
    });
    list.hidden = false; input.setAttribute("aria-expanded", "true"); active = -1;
  }
  function mark(i) {
    const links = list.querySelectorAll("a");
    links.forEach(function (a, k) { a.classList.toggle("on", k === i); });
    active = i;
  }
  input.addEventListener("input", paint);
  input.addEventListener("keydown", function (e) {
    const n = list.querySelectorAll("a").length;
    if (e.key === "ArrowDown" && n) { e.preventDefault(); mark((active + 1) % n); }
    else if (e.key === "ArrowUp" && n) { e.preventDefault(); mark((active - 1 + n) % n); }
    else if (e.key === "Enter" && n) { e.preventDefault(); location.hash = items[active >= 0 ? active : 0].href; input.value = ""; close(); input.blur(); }
    else if (e.key === "Escape") { input.value = ""; close(); input.blur(); }
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".site-search")) close(); });
  document.addEventListener("keydown", function (e) {
    const tag = (document.activeElement && document.activeElement.tagName) || "";
    if (e.key === "/" && !/INPUT|SELECT|TEXTAREA/.test(tag) && views.range.hidden && views.defense.hidden) { e.preventDefault(); input.focus(); }
  });
})();

function makeCard(gun) {
  const wrap = el("div", "card-wrap");
  const card = el("a", "card");
  card.href = "#/gun/" + gun.id;
  card.appendChild(photo(gun));
  card.appendChild(el("h3", "", gun.name));
  card.appendChild(el("p", "meta", gun.country + "，" + gun.year + " 年"));
  card.appendChild(el("p", "", gun.caliber + "，" + gun.action));
  card.appendChild(el("p", "", gun.summary));
  wrap.appendChild(card);
  wrap.appendChild(favButton(gun, false));
  return wrap;
}

// 槍種標題：像素槍加代號加名稱
function typeTitle(tag, type) {
  const title = el(tag, "", type.name);
  title.prepend(el("span", "code", type.code));
  const icon = el("span", "icon");
  icon.appendChild(pixelIcon(type.id));
  title.prepend(icon);
  return title;
}

// 圖鑑頁：六個槍種大磚，點進去看該槍種的全部槍枝
function renderCatalog() {
  const box = document.getElementById("catalog-tiles");
  gunTypes.forEach(function (type) {
    const list = guns.filter(function (g) { return g.type === type.id; });
    const li = el("li");
    const a = el("a");
    a.href = "#/type/" + type.id;
    const icon = el("span", "icon");
    icon.appendChild(pixelIcon(type.id));
    a.appendChild(icon);
    a.appendChild(el("span", "code", type.code));
    a.appendChild(el("span", "name", type.name));
    a.appendChild(el("span", "desc", type.desc));
    const names = list.slice(0, 2).map(function (g) { return g.name; }).join("、");
    a.appendChild(el("span", "examples", "共 " + list.length + " 把，含 " + names));
    li.appendChild(a);
    box.appendChild(li);
  });
}

// 單一槍種的頁面：列出這個槍種的全部槍枝，並可切到上一個、下一個槍種
function renderTypePage(typeId) {
  const box = document.getElementById("type-page");
  box.replaceChildren();
  const index = gunTypes.findIndex(function (t) { return t.id === typeId; });

  if (index < 0) {
    const msg = el("div", "page-title");
    msg.appendChild(el("h1", "", "找不到這個槍種"));
    const back = el("a", "back-link", "回到槍種圖鑑");
    back.href = "#/catalog";
    msg.appendChild(back);
    box.appendChild(msg);
    return null;
  }

  const type = gunTypes[index];
  const list = guns.filter(function (g) { return g.type === type.id; });

  const head = el("div", "page-title type-hero");
  head.appendChild(typeTitle("h1", type));
  head.appendChild(el("p", "", type.desc));
  head.appendChild(el("p", "type-count", "共 " + list.length + " 把"));
  const back = el("a", "back-link", "回到槍種圖鑑");
  back.href = "#/catalog";
  head.appendChild(back);
  box.appendChild(head);

  const cards = el("div", "cards");
  list.forEach(function (gun) { cards.appendChild(makeCard(gun)); });
  box.appendChild(cards);

  const prev = gunTypes[(index + gunTypes.length - 1) % gunTypes.length];
  const next = gunTypes[(index + 1) % gunTypes.length];
  const nav = el("div", "type-nav");
  const prevLink = el("a", "text-link", "上一個槍種：" + prev.name);
  prevLink.href = "#/type/" + prev.id;
  const nextLink = el("a", "text-link", "下一個槍種：" + next.name);
  nextLink.href = "#/type/" + next.id;
  nav.appendChild(prevLink);
  nav.appendChild(nextLink);
  box.appendChild(nav);
  return type;
}

/* ---------- 畫面三：篩選比較表 ---------- */
const fType = document.getElementById("f-type");
const fCountry = document.getElementById("f-country");
const fEra = document.getElementById("f-era");
const fQ = document.getElementById("f-q");

function fillSelect(select, options) {
  select.add(new Option("全部", ""));
  options.forEach(function (o) { select.add(new Option(o.label, o.value)); });
}

// 地區的顯示順序（資料裡有槍的地區才會出現在選單）
const regionOrder = ["北美", "中南美", "歐洲", "俄羅斯與中亞", "中東", "非洲", "南亞", "東亞", "東南亞", "大洋洲"];
const fRegion = document.getElementById("f-region");

// 國家選單：只列出目前選到的地區裡的國家，槍多的排前面，後面標示槍數
function fillCountries() {
  const keep = fCountry.value;
  const counts = {};
  guns.forEach(function (g) {
    if (!fRegion.value || g.region === fRegion.value) counts[g.country] = (counts[g.country] || 0) + 1;
  });
  fCountry.replaceChildren();
  fCountry.add(new Option("全部", ""));
  Object.keys(counts)
    .sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b, "zh-Hant"); })
    .forEach(function (c) { fCountry.add(new Option(c + "（" + counts[c] + "）", c)); });
  fCountry.value = counts[keep] ? keep : "";
}

function setupTable() {
  fillSelect(fType, gunTypes.map(function (t) { return { label: t.name, value: t.id }; }));
  const regions = regionOrder.filter(function (r) { return guns.some(function (g) { return g.region === r; }); });
  fillSelect(fRegion, regions.map(function (r) { return { label: r, value: r }; }));
  fillCountries();
  fillSelect(fEra, eras.map(function (e) { return { label: e, value: e }; }));

  // 任何一個篩選條件改變，就重新畫表格；選了地區，國家選單也跟著縮小
  fRegion.addEventListener("change", function () { fillCountries(); renderTable(); });
  [fType, fCountry, fEra].forEach(function (sel) { sel.addEventListener("change", renderTable); });
  fQ.addEventListener("input", renderTable);
  document.getElementById("f-reset").addEventListener("click", function () {
    fType.value = fRegion.value = fCountry.value = fEra.value = fQ.value = "";
    fillCountries();
    renderTable();
  });
  renderTable();
}

function renderTable() {
  const q = fQ.value.trim().toLowerCase();
  const list = guns.filter(function (g) {
    return (!fType.value || g.type === fType.value) &&
           (!fRegion.value || g.region === fRegion.value) &&
           (!fCountry.value || g.country === fCountry.value) &&
           (!fEra.value || eraOf(g.year) === fEra.value) &&
           (!q || g.name.toLowerCase().includes(q));
  });

  const body = document.getElementById("table-body");
  body.replaceChildren();
  list.forEach(function (g) {
    const tr = el("tr");
    const chkCell = el("td");
    const chk = el("input", "cmp-check"); chk.type = "checkbox"; chk.dataset.id = g.id; chk.checked = cmpHas(g.id);
    chk.setAttribute("aria-label", "加入比較：" + g.name);
    chk.addEventListener("change", function () { cmpToggle(g.id); });
    chkCell.appendChild(chk); tr.appendChild(chkCell);
    const nameCell = el("td");
    const link = el("a", "", g.name);
    link.href = "#/gun/" + g.id;
    nameCell.appendChild(link);
    tr.appendChild(nameCell);
    [typeName(g.type), g.country, g.year + " 年", g.caliber, g.action].forEach(function (text) {
      tr.appendChild(el("td", "", text));
    });
    body.appendChild(tr);
  });

  document.getElementById("count").textContent = "共 " + list.length + " 把";
  document.getElementById("empty").hidden = list.length > 0;
}

/* ---------- 畫面四：槍枝詳細 ---------- */
// 術語提示：文字裡出現術語時，滑過去（或用鍵盤停在上面）會顯示解釋
const termKeys = [
  ["延遲反衝", "延遲反衝式"], ["導氣式", "導氣式"], ["反衝式", "反衝式與後座式"], ["後座式", "反衝式與後座式"],
  ["栓動", "栓動式"], ["泵動", "泵動式"], ["北約", "北約"], ["毛瑟", "毛瑟"], ["開放式槍機", "開放式槍機"], ["彈鏈", "彈鏈供彈"]
];
function termText(parent, text) {
  const re = new RegExp(termKeys.map(function (k) { return k[0]; }).join("|"), "g");
  let last = 0, m;
  const used = {};      // 同一段文字裡，每個術語只標第一次
  while ((m = re.exec(text))) {
    const item = glossary.find(function (g) { return g.term === termKeys.find(function (k) { return k[0] === m[0]; })[1]; });
    if (!item || used[item.term]) continue;
    used[item.term] = true;
    parent.appendChild(document.createTextNode(text.slice(last, m.index)));
    const s = el("span", "term-hint", m[0]);
    s.tabIndex = 0;
    s.dataset.tip = item.term + "：" + item.text;
    parent.appendChild(s);
    last = m.index + m[0].length;
  }
  parent.appendChild(document.createTextNode(text.slice(last)));
  return parent;
}
function renderGun(id) {
  const box = document.getElementById("gun-detail");
  box.replaceChildren();
  const gun = findGun(id);

  if (!gun) {
    const msg = el("div", "page-title");
    msg.appendChild(el("h1", "", "找不到這把槍"));
    const back = el("a", "back-link", "回到槍種圖鑑");
    back.href = "#/catalog";
    msg.appendChild(back);
    box.appendChild(msg);
    return null;
  }

  const head = el("div", "page-title");
  head.appendChild(el("h1", "", gun.name));
  head.appendChild(el("p", "", typeName(gun.type)));
  const acts = el("div", "gun-actions");
  acts.appendChild(favButton(gun, true));
  acts.appendChild(cmpButton(gun));
  if (gunStats[gun.id]) {
    const t = el("a", "btn", "去試射"); t.href = "#/range/" + gun.id;
    acts.appendChild(t);
  }
  head.appendChild(acts);
  box.appendChild(head);

  const figure = el("figure", "gun-photo");
  figure.appendChild(photo(gun));
  if (imageCredits[gun.id]) figure.appendChild(el("figcaption", "", "圖片來源：" + imageCredits[gun.id]));
  box.appendChild(figure);

  // 活躍時期點陣條：每個點代表 5 年，亮的點表示那段時間仍在使用
  const life = el("div", "life");
  life.appendChild(el("h2", "", "活躍時期"));
  const dots = el("div", "dots");
  dots.setAttribute("role", "img");
  dots.setAttribute("aria-label", "活躍時期：" + gun.activeNote);
  const lastYear = gun.activeTo || new Date().getFullYear();
  for (let y = 1900; y < 2030; y += 5) {
    const lit = gun.activeFrom <= y + 4 && lastYear >= y;
    dots.appendChild(el("span", lit ? "dot lit" : "dot"));
  }
  life.appendChild(dots);
  const ticks = el("div", "ticks");
  ["1900", "1950", "2000"].forEach(function (t) { ticks.appendChild(el("span", "", t)); });
  life.appendChild(ticks);
  life.appendChild(el("p", "", gun.activeNote));
  box.appendChild(life);

  const info = el("dl", "info");
  [
    ["設計國家", gun.country + "（" + gun.region + "）"],
    ["設計年份", gun.year + " 年"],
    ["口徑", gun.caliber],
    ["作動方式", gun.action]
  ].forEach(function (row) {
    info.appendChild(el("dt", "", row[0]));
    info.appendChild(termText(el("dd"), row[1]));
  });
  const mc = mainCaliber(gun);
  if (mc) {
    info.appendChild(el("dt", "", "口徑大小"));
    const dd = el("dd");
    const a = el("a", "", "看 " + mc.name + " 實際多大 →"); a.href = "#/calibers/" + mc.id;
    dd.appendChild(a); info.appendChild(dd);
  }
  const ex = gunExtra[gun.id] || {};
  const sp = ex.specs || {};
  [["全長", sp.len, " mm"], ["空槍重量", sp.wt, " kg"], ["槍管長度", sp.barrel, " mm"], ["初速", sp.vel, " m/s"]].forEach(function (row) {
    if (!row[1]) return;
    info.appendChild(el("dt", "", row[0]));
    info.appendChild(el("dd", "", "約 " + row[1].toLocaleString("en-US") + row[2]));
  });
  box.appendChild(info);
  if (Object.keys(sp).length) box.appendChild(el("p", "range-note spec-note", "規格是常見型號的約略值，不同型號、不同槍管長度會有差異。"));

  // 試射數據：這把槍在同槍種裡排第幾（資料來自試射場的模擬值）
  if (gunStats[gun.id]) {
    const peers = guns.filter(function (g) { return g.type === gun.type && gunStats[g.id]; });
    const metric = function (g) { const w = weaponFor(g.id); return { mag: w.mag, rpm: w.mode === "auto" ? w.rpm : Math.round(60000 / w.rate), reload: w.reload / 1000, kick: w.kick, w: w }; };
    const mine = metric(gun);
    const all = peers.map(metric);
    const stats = el("div", "gun-stats");
    stats.appendChild(el("h2", "", "試射數據（模擬值）"));
    [
      ["彈匣容量", "mag", "max", mine.mag + " 發"],
      ["射速", "rpm", "max", "約 " + mine.rpm + " 發／分"],
      ["裝填時間", "reload", "min", mine.reload.toFixed(1) + " 秒"],
      ["後座力（越小越穩）", "kick", "min", String(Math.round(mine.kick))]
    ].forEach(function (s) {
      const better = all.filter(function (o) { return s[2] === "max" ? o[s[1]] > mine[s[1]] : o[s[1]] < mine[s[1]]; }).length;
      const rank = better + 1, total = all.length;
      const row = el("div", "stat-row");
      row.appendChild(el("span", "stat-label", s[0]));
      row.appendChild(el("b", "stat-value", s[3]));
      const bar = el("span", "rank-bar"); bar.setAttribute("role", "img"); bar.setAttribute("aria-label", "同槍種第 " + rank + " 名，共 " + total + " 把");
      const fill = el("i"); fill.style.width = (total > 1 ? (total - rank) / (total - 1) * 100 : 100) + "%";
      bar.appendChild(fill); row.appendChild(bar);
      row.appendChild(el("span", "stat-rank", "第 " + rank + " ／ " + total));
      stats.appendChild(row);
    });
    stats.appendChild(el("p", "range-note", "和同樣是" + typeName(gun.type) + "的 " + peers.length + " 把槍比較。數值是為了遊戲估的，不是官方規格。"));
    box.appendChild(stats);
  }

  const text = el("div", "detail-text");
  text.appendChild(el("h2", "", "簡介"));
  text.appendChild(termText(el("p"), gun.summary));
  text.appendChild(el("h2", "", "歷史背景"));
  text.appendChild(termText(el("p"), gun.history));
  if (ex.used) {
    text.appendChild(el("h2", "", "使用紀錄"));
    text.appendChild(el("p", "", ex.used));
  }
  if (ex.variants && ex.variants.length) {
    text.appendChild(el("h2", "", "衍生型號"));
    const ul = el("ul", "variant-list");
    ex.variants.forEach(function (v) { ul.appendChild(el("li", "", v)); });
    text.appendChild(ul);
  }
  const facts = ex.facts || (ex.fact ? [ex.fact] : []);
  if (facts.length) {
    const fact = el("aside", "fun-fact");
    fact.appendChild(el("b", "", "小知識"));
    if (facts.length === 1) fact.appendChild(el("p", "", facts[0]));
    else {
      const fl = el("ul", "fact-list");
      facts.forEach(function (f) { fl.appendChild(el("li", "", f)); });
      fact.appendChild(fl);
    }
    text.appendChild(fact);
  }
  if (wikiPages[gun.id]) {
    text.appendChild(el("h2", "", "延伸閱讀"));
    const more = el("a", "btn", "維基百科（英文）↗");
    more.href = "https://en.wikipedia.org/wiki/" + wikiPages[gun.id];
    more.target = "_blank";                      // 另開新視窗，不會離開網站
    more.rel = "noopener noreferrer";            // 外部連結的安全設定
    more.setAttribute("aria-label", "維基百科（英文），另開新視窗");
    text.appendChild(more);
  }
  // 相關槍枝：同國家、同口徑、同年代，方便順著看下去
  const mainCal = function (g) { return g.caliber.split(/[（(、，,]/)[0].trim(); };
  const groups = [
    ["同一個國家", guns.filter(function (g) { return g.id !== gun.id && g.country === gun.country; })],
    ["同一種口徑", guns.filter(function (g) { return g.id !== gun.id && mainCal(g) === mainCal(gun); })],
    ["差不多年代", guns.filter(function (g) { return g.id !== gun.id && Math.abs(g.year - gun.year) <= 5; })]
  ];
  const seen = {};
  const related = el("div", "related");
  groups.forEach(function (gr) {
    const list = gr[1].filter(function (g) { return !seen[g.id]; }).slice(0, 5);
    if (!list.length) return;
    related.appendChild(el("h3", "", gr[0]));
    const row = el("div", "chip-row");
    list.forEach(function (g) {
      seen[g.id] = true;
      const a = el("a", "map-chip", g.name + "（" + g.year + "）");
      a.href = "#/gun/" + g.id;
      row.appendChild(a);
    });
    related.appendChild(row);
  });
  if (related.children.length) { text.appendChild(el("h2", "", "相關槍枝")); text.appendChild(related); }
  const back = el("a", "back-link", "回到" + typeName(gun.type) + "圖鑑");
  back.href = "#/type/" + gun.type;
  text.appendChild(back);
  box.appendChild(text);
  return gun;
}

/* ---------- 切換畫面：看網址 # 後面是什麼 ---------- */
const views = {
  home: document.getElementById("view-home"),
  catalog: document.getElementById("view-catalog"),
  table: document.getElementById("view-table"),
  gun: document.getElementById("view-gun"),
  type: document.getElementById("view-type"),
  games: document.getElementById("view-games"),
  range: document.getElementById("view-range"),
  defense: document.getElementById("view-defense"),
  calibers: document.getElementById("view-calibers"),
  favorites: document.getElementById("view-favorites"),
  compare: document.getElementById("view-compare")
};
const pageTitles = { home: "", catalog: "槍種圖鑑｜", table: "篩選比較表｜", gun: "", type: "", games: "遊戲｜", range: "試射場｜", defense: "防線｜", calibers: "口徑對照｜", favorites: "我的檔案夾｜", compare: "並排比較｜" };

function route() {
  // 例如 "#/catalog/hg" 會變成 ["catalog", "hg"]
  const parts = location.hash.replace(/^#\/?/, "").split("/");
  const name = views[parts[0]] ? parts[0] : "home";

  Object.keys(views).forEach(function (key) { views[key].hidden = key !== name; });
  updateTimelineNav();
  if (name !== "range" && name !== "defense") stopRange();
  if (name === "games") renderGames();
  if (name === "range") renderRange(undefined, parts[1]);
  if (name === "calibers") renderCalibers(parts[1]);
  if (name === "favorites") renderFavorites();
  if (name === "compare") renderCompare();
  refreshMarks();
  if (name === "defense") renderRange("defense");

  // 導覽列標示目前所在的頁面（詳細頁算在圖鑑底下）
  const current = (name === "gun" || name === "type") ? "catalog" : ((name === "range" || name === "defense") ? "games" : (name === "compare" ? "table" : name));
  document.querySelectorAll("nav a").forEach(function (a) {
    if (a.dataset.route === current) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  let titlePart = pageTitles[name];
  if (name === "gun") {
    const gun = renderGun(parts[1]);
    titlePart = gun ? gun.name + "｜" : "";
  }
  if (name === "type") {
    const type = renderTypePage(parts[1]);
    titlePart = type ? type.name + "｜" : "";
  }
  document.title = titlePart + "槍械檔案館 Arsenal Archive";

  // 圖鑑頁可以直接跳到某個槍種，其他情況回到頁面最上方
  const target = name === "catalog" && parts[1] ? document.getElementById("type-" + parts[1]) : null;
  if (target) target.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "instant" });
}


// 首頁主視覺：大型像素槍，以及自動計算的收錄數量（之後新增槍會自動更新）
// 主視覺的大型像素槍：點一下換下一種槍，每次都會重新一塊一塊拼出來
const heroTypes = ["ar", "hg", "smg", "rf", "mg", "sg"];
let heroIndex = 0;
function showHeroGun() {
  const id = heroTypes[heroIndex];
  const type = gunTypes.find(function (t) { return t.id === id; });
  document.getElementById("hero-art-gun").replaceChildren(pixelIcon(id));
  document.getElementById("hero-art-label").textContent = type.code + "　" + type.name;
}
document.getElementById("hero-art").addEventListener("click", function () {
  heroIndex = (heroIndex + 1) % heroTypes.length;
  showHeroGun();
});
showHeroGun();

// 頁首標誌與跑馬燈
document.getElementById("logo").appendChild(drawPixels(logoPixels, 12, 12));
const marqueeText = "HG　SMG　AR　RF　MG　SG　".repeat(10);
document.getElementById("marquee-a").textContent = marqueeText;
document.getElementById("marquee-b").textContent = marqueeText;
document.getElementById("stat-guns").textContent = String(guns.length).padStart(2, "0");
document.getElementById("stat-types").textContent = String(gunTypes.length).padStart(2, "0");

renderMap();
document.getElementById("random-gun").addEventListener("click", function () {
  location.hash = "#/gun/" + guns[Math.floor(Math.random() * guns.length)].id;
});
renderFacts();
renderTerms();
renderTimeline();
setupTimelineNav();
renderCatalog();
setupTable();
// 首頁的快速入口：四個最常用的去處
(function renderQuick() {
  const box = document.getElementById("quick-tiles");
  [
    { href: "#/catalog", icon: pixelIcon("ar"), code: "CATALOG", name: "槍種圖鑑", desc: "依六大槍種瀏覽，了解每把槍的簡介與歷史背景。", extra: "共 " + guns.length + " 把" },
    { href: "#/table", icon: pixelIcon("smg"), code: "TABLE", name: "篩選比較表", desc: "依槍種、國家與年代篩選，並排比較多把槍的差異。", extra: "最多比較 3 把" },
    { href: "#/range", icon: drawPixels(logoPixels, 12, 12), narrow: true, code: "RANGE", name: "試射場", desc: "實際試射，感受每把槍不同的後座力吧。", extra: "六種槍種" },
    { href: "#/defense", icon: pixelIcon("mg"), code: "DEFENSE", name: "防線", desc: "用槍械守住防線，每一波挑選配件強化自己吧。", extra: "無盡模式" }
  ].forEach(function (t) {
    const li = el("li");
    const a = el("a");
    a.href = t.href;
    const icon = el("span", t.narrow ? "icon narrow" : "icon");
    icon.appendChild(t.icon);
    a.appendChild(icon);
    a.appendChild(el("span", "code", t.code));
    a.appendChild(el("span", "name", t.name));
    a.appendChild(el("span", "desc", t.desc));
    if (t.extra) a.appendChild(el("span", "examples", t.extra));
    li.appendChild(a);
    box.appendChild(li);
  });
})();
/* ---------- 遊戲：靶場與防線 ---------- */
const RANGE_KEY = "arsenal-range-v2";
const RANGE_SECONDS = 30;

// 靶場的最高分：每個槍種各記一筆，存成 {"hg": 12, "ar": 20} 這樣
function readRangeScores() {
  try { return JSON.parse(localStorage.getItem(RANGE_KEY)) || {}; } catch (e) { return {}; }
}
function readRangeBest(type) { return Number(readRangeScores()[type]) || 0; }
function writeRangeBest(type, n) {
  const all = readRangeScores();
  all[type] = n;
  try { localStorage.setItem(RANGE_KEY, JSON.stringify(all)); } catch (e) {}
}
function rangeBestAll() {
  const all = readRangeScores();
  return Math.max.apply(null, [0].concat(Object.keys(all).map(function (k) { return Number(all[k]) || 0; })));
}
// 挑戰模式的最高分：每把槍各一筆，存在瀏覽器裡
function readBest() {
  try { return JSON.parse(localStorage.getItem("arsenal-range-best") || "{}") || {}; } catch (e) { return {}; }
}
function writeBest(map) {
  try { localStorage.setItem("arsenal-range-best", JSON.stringify(map)); } catch (e) {}
}
function gradeFor(score) { return score >= 6000 ? "S" : score >= 4000 ? "A" : score >= 2500 ? "B" : score >= 1200 ? "C" : "D"; }

function readFlag(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : v === "1"; } catch (e) { return fallback; }
}
function writeFlag(key, on) {
  try { localStorage.setItem(key, on ? "1" : "0"); } catch (e) {}
}

// 遊戲首頁：兩張卡片，沿用索引大磚的樣式
function renderGames() {
  const box = document.getElementById("game-tiles");
  box.replaceChildren();
  [
    { href: "#/range", icon: drawPixels(logoPixels, 12, 12), narrow: true, code: "RANGE", name: "試射場",
      desc: "第一人稱試射。體驗後座力、看彈著點。"},
    { href: "#/defense", icon: drawPixels(lockPixels, 12, 12), narrow: true, code: "DEFENSE", name: "防線",
      desc: "用各式槍械守住防線，再靠各種配件撐到最後。"}
  ].forEach(function (g) {
    const li = el("li");
    const a = el("a");
    a.href = g.href;
    const icon = el("span", g.narrow ? "icon narrow" : "icon");
    icon.appendChild(g.icon);
    a.appendChild(icon);
    a.appendChild(el("span", "code", g.code));
    a.appendChild(el("span", "name", g.name));
    a.appendChild(el("span", "desc", g.desc));
    a.appendChild(el("span", "examples", g.extra));
    li.appendChild(a);
    box.appendChild(li);
  });
}

// ----- 試射場 -----
// 第一視角的像素槍：每支槍拆成可動的零件（槍身、滑套、彈匣……），資料由像素圖輸出
const VM_PAL = {"1": "#0B1822", "2": "#17303F", "3": "#2E4655", "4": "#4A6678", "5": "#6F8EA1", "6": "#9FB4C1", "7": "#CBD7DE", "8": "#EDF0EE", "a": "#F0DE86", "b": "#D9C45A", "c": "#A8942F", "d": "#7A6B22", "e": "#5A4E18"};
const viewmodels = {"hg": {"w": 58, "h": 46, "order": ["mag", "body", "slide"], "port": [27, 15], "flash": [-4, 4], "parts": {"mag": "34,35,11,1,1;33,36,1,7,1;34,36,11,1,7;45,36,1,7,1;34,37,11,1,6;34,38,1,1,6;35,38,9,1,5;44,38,1,1,6;34,39,11,3,6;34,42,11,1,5;34,43,11,1,1", "body": "39,14,3,1,1;38,15,1,2,1;39,15,3,1,6;42,15,1,2,1;39,16,3,1,4;6,17,33,1,1;39,17,3,1,3;42,17,2,1,1;5,18,1,4,1;6,18,38,1,3;44,18,1,1,1;6,19,38,1,2;44,19,1,18,4;45,19,1,18,1;6,20,23,1,2;29,20,1,1,b;30,20,14,1,2;6,21,30,1,2;36,21,1,1,4;37,21,2,1,2;39,21,1,1,4;40,21,2,1,2;42,21,1,1,4;43,21,1,1,2;5,22,26,1,1;31,22,13,1,2;6,23,12,1,1;18,23,26,1,2;17,24,1,5,1;18,24,1,4,2;19,24,6,1,1;25,24,2,1,6;27,24,9,1,1;36,24,1,1,4;37,24,2,1,1;39,24,1,1,4;40,24,2,1,1;42,24,1,1,4;43,24,1,1,1;19,25,1,2,1;24,25,1,2,1;25,25,2,2,4;27,25,1,2,1;31,25,1,2,1;32,25,12,1,3;32,26,12,1,2;19,27,6,1,1;25,27,2,1,3;27,27,5,1,1;32,27,4,1,2;36,27,1,1,4;37,27,2,1,2;39,27,1,1,4;40,27,2,1,2;42,27,1,1,4;43,27,1,1,2;18,28,26,1,2;18,29,14,1,1;32,29,12,1,2;31,30,1,2,1;32,30,4,1,2;36,30,1,1,4;37,30,2,1,2;39,30,1,1,4;40,30,2,1,2;42,30,1,1,4;43,30,1,1,2;32,31,12,1,2;31,32,13,1,1;32,33,1,4,1;33,33,3,1,3;36,33,1,1,4;37,33,2,1,3;39,33,1,1,4;40,33,2,1,3;42,33,1,1,4;43,33,1,1,3;33,34,11,3,2;32,37,14,1,1;33,38,12,1,1", "slide": "5,5,3,1,1;36,5,4,1,1;4,6,1,2,1;5,6,3,1,a;8,6,1,2,1;35,6,1,2,1;36,6,4,1,3;40,6,1,2,1;5,7,3,1,b;36,7,4,1,2;3,8,2,1,1;5,8,3,1,c;8,8,33,1,1;2,9,1,6,1;3,9,38,1,6;41,9,1,9,1;3,10,38,1,4;3,11,2,1,3;5,11,13,4,4;18,11,11,1,2;29,11,1,4,4;30,11,1,5,3;31,11,1,5,4;32,11,1,5,3;33,11,1,5,4;34,11,1,5,3;35,11,6,5,4;3,12,2,3,2;18,12,1,1,1;19,12,8,1,4;27,12,2,1,1;18,13,11,2,1;2,15,3,1,1;5,15,25,1,4;2,16,1,2,1;3,16,38,1,4;3,17,38,1,3;3,18,38,1,1", "flash": "9,5,2,1,1;8,6,1,4,1;9,6,2,1,a;11,6,1,3,1;9,7,2,4,b;13,8,5,1,1;11,9,2,2,1;13,9,5,2,b;18,9,1,2,1;5,10,4,1,1;3,11,2,1,1;5,11,4,1,7;9,11,2,1,c;11,11,4,1,7;15,11,3,1,1;2,12,1,2,1;3,12,4,2,b;7,12,8,2,6;15,12,1,4,1;3,14,2,1,1;5,14,4,1,5;9,14,2,1,a;11,14,4,1,5;5,15,4,1,1;9,15,2,4,b;11,15,3,1,1;14,15,1,1,b;8,16,1,4,1;11,16,1,4,1;14,16,1,1,1;9,19,2,1,c;9,20,2,1,1"}}, "smg": {"w": 78, "h": 52, "order": ["mag", "body", "bolt"], "port": [47, 15], "flash": [-6, 4], "parts": {"mag": "29,20,8,1,1;28,21,1,8,1;29,21,8,1,7;37,21,1,9,1;29,22,8,7,6;27,29,2,1,1;29,29,8,1,5;26,30,1,8,1;27,30,8,1,7;35,30,2,1,1;27,31,8,7,6;35,31,1,8,1;25,38,2,1,1;27,38,8,1,5;24,39,1,8,1;25,39,8,1,7;33,39,2,1,1;25,40,8,4,6;33,40,1,7,1;25,44,1,1,6;26,44,6,1,5;32,44,1,1,6;25,45,8,1,6;25,46,8,1,5;25,47,8,1,1", "body": "52,4,1,1,1;51,5,1,1,1;52,5,1,1,b;53,5,3,1,1;8,6,1,1,1;50,6,1,2,1;51,6,5,1,3;56,6,1,2,1;7,7,1,1,1;8,7,1,1,b;9,7,1,1,1;51,7,5,1,2;6,8,1,3,1;7,8,3,1,3;10,8,1,3,1;27,8,30,1,1;7,9,3,2,2;26,9,1,8,1;27,9,30,2,2;57,9,1,3,1;67,10,4,1,1;3,11,20,1,1;27,11,30,1,6;66,11,1,1,1;67,11,4,1,6;71,11,1,1,1;2,12,1,4,1;3,12,20,1,3;23,12,1,5,1;27,12,30,1,4;57,12,10,1,1;67,12,2,10,4;69,12,3,1,3;72,12,1,9,1;3,13,2,1,3;5,13,18,1,2;27,13,14,4,4;41,13,9,1,2;50,13,7,4,4;57,13,10,1,3;69,13,3,8,2;3,14,4,1,2;7,14,1,1,4;8,14,2,1,2;10,14,1,1,4;11,14,2,1,2;13,14,1,1,4;14,14,2,1,2;16,14,1,1,4;17,14,2,1,2;19,14,1,1,4;20,14,3,1,2;41,14,9,3,1;57,14,10,4,2;3,15,20,1,2;2,16,3,1,1;5,16,2,1,2;7,16,1,1,4;8,16,2,1,2;10,16,1,1,4;11,16,2,1,2;13,16,1,1,4;14,16,2,1,2;16,16,1,1,4;17,16,2,1,2;19,16,1,1,4;20,16,3,1,2;2,17,25,1,1;27,17,30,2,4;3,18,10,1,1;13,18,14,1,6;57,18,10,2,1;12,19,1,4,1;13,19,3,3,4;16,19,1,3,3;17,19,3,3,4;20,19,1,3,3;21,19,3,3,4;24,19,1,3,3;25,19,32,1,4;25,20,2,1,4;27,20,30,1,3;57,20,1,1,1;66,20,1,3,1;25,21,3,1,4;28,21,1,1,3;29,21,3,1,4;32,21,1,1,3;33,21,9,1,2;42,21,8,1,3;50,21,7,1,1;69,21,4,1,1;13,22,20,1,3;33,22,1,3,2;34,22,1,1,3;35,22,2,1,1;37,22,2,1,6;39,22,2,3,1;41,22,9,1,2;50,22,1,6,1;67,22,4,1,3;71,22,1,1,1;13,23,20,1,1;34,23,1,1,1;36,23,1,1,1;37,23,2,1,4;41,23,4,1,2;45,23,1,1,4;46,23,2,1,2;48,23,1,1,4;49,23,1,1,2;67,23,4,1,1;32,24,1,2,1;34,24,3,1,1;37,24,2,1,3;41,24,9,1,2;33,25,17,1,2;33,26,8,1,1;41,26,4,1,2;45,26,1,1,4;46,26,2,1,2;48,26,1,1,4;49,26,1,1,2;40,27,1,1,1;41,27,9,1,2;40,28,11,1,1;41,29,1,7,1;42,29,3,1,3;45,29,1,1,4;46,29,2,1,3;48,29,1,1,4;49,29,2,1,3;51,29,1,7,1;42,30,9,2,2;42,32,3,1,2;45,32,1,1,4;46,32,2,1,2;48,32,1,1,4;49,32,2,1,2;42,33,9,2,2;42,35,3,1,2;45,35,1,1,4;46,35,2,1,2;48,35,1,1,4;49,35,2,1,2;41,36,11,1,1;42,37,9,1,1", "bolt": "37,6,5,1,1;36,7,1,2,1;37,7,5,2,6;42,7,1,2,1;37,9,5,1,1;43,12,6,1,1;42,13,1,4,1;43,13,6,1,7;49,13,1,4,1;43,14,6,2,6;43,16,6,1,5;43,17,6,1,1", "flash": "10,5,2,1,1;9,6,1,4,1;10,6,2,1,a;12,6,1,4,1;10,7,2,4,b;15,8,5,1,1;14,9,1,1,1;15,9,5,2,b;20,9,1,2,1;5,10,5,1,1;12,10,3,1,1;3,11,2,1,1;5,11,5,1,7;10,11,2,1,c;12,11,5,1,7;17,11,3,1,1;2,12,1,2,1;3,12,5,2,b;8,12,9,2,6;17,12,1,3,1;3,14,2,1,1;5,14,5,1,5;10,14,2,1,a;12,14,5,1,5;5,15,5,1,1;10,15,2,4,b;12,15,5,1,1;9,16,1,4,1;12,16,1,4,1;10,19,2,1,c;10,20,2,1,1"}}, "ar": {"w": 92, "h": 54, "order": ["mag", "body", "bolt"], "port": [58, 13], "flash": [-6, 4], "parts": {"mag": "46,23,7,1,1;45,24,1,10,1;46,24,7,1,7;53,24,1,10,1;46,25,7,8,6;46,33,7,1,5;44,34,1,9,1;45,34,7,1,7;52,34,1,9,1;45,35,7,7,6;45,42,7,1,5;43,43,1,6,1;44,43,7,1,7;51,43,1,6,1;44,44,7,2,6;44,46,1,1,6;45,46,5,1,5;50,46,1,1,6;44,47,7,1,6;44,48,7,1,5;44,49,7,1,1", "body": "59,1,1,1,1;58,2,1,1,1;59,2,1,1,b;60,2,1,1,1;57,3,1,1,1;58,3,3,1,3;61,3,1,2,1;47,4,11,1,1;58,4,3,1,2;46,5,1,2,1;47,5,11,1,3;58,5,4,1,1;18,6,1,1,1;47,6,14,1,2;61,6,1,1,1;17,7,1,1,1;18,7,1,1,b;19,7,1,1,1;46,7,16,1,1;16,8,1,3,1;17,8,3,1,3;20,8,1,1,1;44,8,20,1,1;17,9,3,4,2;20,9,24,1,1;44,9,20,1,6;64,9,1,2,1;84,9,3,1,1;3,10,4,1,1;20,10,24,1,6;44,10,20,1,4;72,10,12,1,1;84,10,3,1,6;87,10,1,12,1;2,11,1,5,1;3,11,4,1,3;7,11,10,1,1;20,11,3,6,4;23,11,1,6,3;24,11,3,6,4;27,11,1,6,3;28,11,3,6,4;31,11,1,6,3;32,11,3,6,4;35,11,1,6,3;36,11,3,6,4;39,11,1,6,3;40,11,13,4,4;53,11,9,1,2;62,11,2,4,4;64,11,8,1,1;72,11,12,1,3;84,11,3,10,4;3,12,4,1,2;7,12,10,1,3;53,12,9,3,1;64,12,8,1,3;72,12,12,1,2;3,13,17,1,2;64,13,20,2,2;3,14,4,2,2;7,14,13,2,1;40,15,24,2,4;64,15,8,2,1;72,15,12,4,2;2,16,6,1,1;19,16,1,2,1;3,17,4,1,1;20,17,44,1,3;64,17,1,6,1;71,17,1,2,1;20,18,24,1,1;44,18,20,1,3;43,19,1,4,1;44,19,20,4,2;71,19,13,1,1;72,20,12,1,1;83,21,1,1,1;84,21,3,1,3;84,22,3,1,1;43,23,22,1,1;42,24,1,6,1;43,24,11,1,2;54,24,7,1,3;61,24,3,1,1;43,25,1,4,2;44,25,4,1,1;48,25,2,1,6;50,25,3,1,1;53,25,8,1,2;61,25,1,5,1;44,26,1,2,1;47,26,1,2,1;48,26,2,2,4;50,26,1,2,1;52,26,1,2,1;53,26,4,1,2;57,26,1,1,4;58,26,2,1,2;60,26,1,1,4;53,27,8,2,2;44,28,4,1,1;48,28,2,1,3;50,28,3,1,1;43,29,14,1,2;57,29,1,1,4;58,29,2,1,2;60,29,1,1,4;43,30,19,1,1;53,31,1,7,1;54,31,8,1,3;62,31,1,7,1;54,32,3,1,2;57,32,1,1,4;58,32,2,1,2;60,32,1,1,4;61,32,1,1,2;54,33,8,2,2;54,35,3,1,2;57,35,1,1,4;58,35,2,1,2;60,35,1,1,4;61,35,1,1,2;54,36,8,2,2;53,38,10,1,1;54,39,8,1,1", "bolt": "64,7,4,1,1;63,8,1,3,1;64,8,4,1,7;68,8,1,3,1;64,9,4,1,6;64,10,4,1,5;55,11,6,1,1;64,11,4,1,1;54,12,1,3,1;55,12,6,1,7;61,12,1,3,1;55,13,6,1,6;55,14,6,1,5;55,15,6,1,1", "flash": "10,5,2,1,1;9,6,1,4,1;10,6,2,1,a;12,6,1,4,1;10,7,2,4,b;15,8,6,1,1;14,9,1,1,1;15,9,6,2,b;21,9,1,2,1;5,10,5,1,1;12,10,3,1,1;3,11,2,1,1;5,11,5,1,7;10,11,2,1,c;12,11,5,1,7;17,11,4,1,1;2,12,1,2,1;3,12,5,2,b;8,12,9,2,6;17,12,1,2,1;3,14,2,1,1;5,14,5,1,5;10,14,2,1,a;12,14,5,1,5;17,14,3,1,1;5,15,5,1,1;10,15,2,4,b;12,15,3,1,1;15,15,5,2,b;20,15,1,2,1;9,16,1,4,1;12,16,1,4,1;14,16,1,1,1;15,17,5,1,1;10,19,2,1,c;10,20,2,1,1"}}, "rf": {"w": 104, "h": 62, "order": ["clip", "body", "bolt"], "port": [65, 25], "flash": [-4, 12], "parts": {"clip": "50,4,2,1,1;53,4,2,1,1;56,4,2,1,1;59,4,2,1,1;62,4,2,1,1;49,5,1,7,1;50,5,2,1,a;52,5,1,7,1;53,5,2,1,a;55,5,1,7,1;56,5,2,1,a;58,5,1,7,1;59,5,2,1,a;61,5,1,7,1;62,5,2,1,a;64,5,1,7,1;50,6,2,6,b;53,6,2,6,b;56,6,2,6,b;59,6,2,6,b;62,6,2,6,b;48,12,1,2,1;49,12,16,2,2;65,12,1,2,1;49,14,16,1,1", "body": "7,20,1,1,1;6,21,1,1,1;7,21,1,1,b;8,21,2,1,1;43,21,5,1,1;5,22,1,3,1;6,22,4,1,3;10,22,1,4,1;42,22,1,2,1;43,22,5,1,3;48,22,1,1,1;6,23,4,3,2;43,23,5,1,2;48,23,19,1,1;17,24,32,1,1;49,24,18,1,6;67,24,1,5,1;3,25,3,1,1;16,25,1,1,1;17,25,32,1,c;49,25,18,5,4;2,26,1,4,1;3,26,2,1,3;5,26,12,1,1;17,26,32,3,d;3,27,2,1,2;5,27,12,1,3;3,28,14,1,2;81,28,17,1,1;3,29,2,1,2;5,29,12,1,1;17,29,32,1,e;67,29,14,1,1;81,29,14,1,c;95,29,3,1,3;98,29,1,17,1;2,30,11,1,1;13,30,36,1,c;49,30,16,1,4;65,30,16,1,c;81,30,14,1,d;95,30,3,16,2;3,31,2,1,1;12,31,1,5,1;13,31,36,1,d;49,31,16,1,3;65,31,30,1,d;13,32,38,3,d;51,32,14,1,1;65,32,4,1,d;69,32,1,1,e;70,32,3,1,d;73,32,1,1,e;74,32,21,1,d;51,33,1,3,1;64,33,1,4,1;65,33,30,2,d;13,35,38,1,e;65,35,4,1,d;69,35,1,1,e;70,35,3,1,d;73,35,1,1,e;74,35,21,1,d;13,36,38,1,1;65,36,16,1,e;81,36,14,4,d;65,37,16,1,1;57,38,12,1,1;69,38,1,1,e;70,38,3,1,1;73,38,1,1,e;74,38,1,1,1;80,38,1,3,1;56,39,1,6,1;57,39,15,1,2;72,39,2,1,1;57,40,1,4,2;58,40,5,1,1;63,40,1,1,6;64,40,8,1,1;81,40,14,1,e;58,41,1,2,1;62,41,1,2,1;63,41,1,2,4;64,41,1,2,1;81,41,4,1,1;85,41,10,1,c;84,42,1,5,1;85,42,10,4,d;58,43,5,1,1;63,43,1,1,3;64,43,8,1,1;57,44,15,1,2;72,44,1,1,1;57,45,15,1,1;85,46,10,1,e;95,46,4,1,1;85,47,13,1,1", "bolt": "73,19,4,1,1;72,20,1,2,1;73,20,4,1,7;77,20,1,6,1;73,21,4,2,6;65,22,8,1,1;64,23,1,2,1;65,23,12,2,6;57,25,16,1,1;73,25,4,1,5;56,26,1,3,1;57,26,10,1,7;67,26,1,3,1;73,26,4,1,1;57,27,10,1,6;57,28,10,1,5;57,29,10,1,1", "flash": "9,19,2,1,1;8,20,1,4,1;9,20,2,1,a;11,20,1,3,1;9,21,2,4,b;13,22,5,1,1;11,23,2,2,1;13,23,5,2,b;18,23,1,2,1;5,24,4,1,1;3,25,2,1,1;5,25,4,1,7;9,25,2,1,c;11,25,4,1,7;15,25,3,1,1;2,26,1,2,1;3,26,4,2,b;7,26,8,2,6;15,26,1,3,1;3,28,2,1,1;5,28,4,1,5;9,28,2,1,a;11,28,4,1,5;5,29,4,1,1;9,29,2,4,b;11,29,4,1,1;8,30,1,4,1;11,30,1,4,1;9,33,2,1,c;9,34,2,1,1"}}, "mg": {"w": 108, "h": 60, "order": ["box", "belt", "body", "cover", "bolt"], "port": [55, 17], "flash": [-6, 8], "parts": {"box": "37,28,14,1,1;36,29,1,11,1;37,29,14,1,3;51,29,1,11,1;37,30,14,3,2;37,33,2,1,2;39,33,10,1,4;49,33,2,1,2;37,34,14,6,2;36,40,16,1,1;37,41,14,1,1", "belt": "40,14,7,1,1;39,15,1,2,1;40,15,7,2,b;47,15,1,2,1;40,17,7,1,1;39,18,1,2,1;40,18,7,2,b;47,18,1,2,1;40,20,7,1,1;39,21,1,2,1;40,21,7,2,b;47,21,1,2,1;40,23,7,1,1;39,24,1,2,1;40,24,7,2,b;47,24,1,2,1;40,26,7,1,1;39,27,1,2,1;40,27,7,2,b;47,27,1,2,1;40,29,7,1,1", "body": "12,9,1,1,1;11,10,1,1,1;12,10,1,1,b;13,10,1,1,1;10,11,1,3,1;11,11,3,1,3;14,11,1,3,1;11,12,3,2,2;31,12,36,1,1;87,12,10,1,1;30,13,1,1,1;31,13,36,1,6;67,13,1,1,1;86,13,1,1,1;87,13,7,1,c;94,13,3,1,3;97,13,1,13,1;3,14,28,1,1;31,14,36,2,4;67,14,20,1,1;87,14,7,2,d;94,14,3,12,2;2,15,1,6,1;3,15,28,1,3;67,15,20,1,c;3,16,3,1,3;6,16,25,1,2;31,16,20,5,4;51,16,10,1,2;61,16,6,5,4;67,16,27,6,d;3,17,5,1,2;8,17,1,1,4;9,17,2,1,2;11,17,1,1,4;12,17,2,1,2;14,17,1,1,4;15,17,2,1,2;17,17,1,1,4;18,17,2,1,2;20,17,1,1,4;21,17,2,1,2;23,17,1,1,4;24,17,2,1,2;26,17,1,1,4;27,17,4,1,2;51,17,10,4,1;3,18,28,2,2;3,20,5,1,2;8,20,1,1,4;9,20,2,1,2;11,20,1,1,4;12,20,2,1,2;14,20,1,1,4;15,20,2,1,2;17,20,1,1,4;18,20,2,1,2;20,20,1,1,4;21,20,2,1,2;23,20,1,1,4;24,20,2,1,2;26,20,1,1,4;27,20,4,1,2;2,21,4,1,1;6,21,25,1,2;31,21,36,3,4;2,22,29,1,1;67,22,20,1,e;87,22,7,4,d;3,23,10,1,1;13,23,2,1,3;15,23,6,1,1;21,23,2,1,3;23,23,8,1,1;67,23,20,1,1;12,24,1,12,1;13,24,2,10,2;15,24,1,9,1;20,24,1,9,1;21,24,2,10,2;23,24,1,12,1;30,24,1,4,1;31,24,36,2,3;67,24,1,4,1;86,24,1,3,1;31,26,36,2,2;87,26,7,1,e;94,26,4,1,1;87,27,10,1,1;30,28,38,1,1;31,29,16,1,1;47,29,11,1,2;58,29,8,1,3;66,29,1,7,1;46,30,1,5,1;47,30,1,4,2;48,30,4,1,1;52,30,2,1,6;54,30,3,1,1;57,30,9,1,2;48,31,1,2,1;51,31,1,2,1;52,31,2,2,4;54,31,1,2,1;56,31,1,2,1;57,31,4,1,2;61,31,1,1,4;62,31,2,1,2;64,31,1,1,4;65,31,1,1,2;57,32,9,2,2;15,33,6,1,1;48,33,4,1,1;52,33,2,1,3;54,33,3,1,1;13,34,10,2,2;47,34,14,1,2;61,34,1,1,4;62,34,2,1,2;64,34,1,1,4;65,34,1,1,2;47,35,10,1,1;57,35,9,1,2;13,36,10,1,1;56,36,11,1,1;57,37,1,7,1;58,37,3,1,3;61,37,1,1,4;62,37,2,1,3;64,37,1,1,4;65,37,2,1,3;67,37,1,7,1;58,38,9,2,2;58,40,3,1,2;61,40,1,1,4;62,40,2,1,2;64,40,1,1,4;65,40,2,1,2;58,41,9,2,2;58,43,3,1,2;61,43,1,1,4;62,43,2,1,2;64,43,1,1,4;65,43,2,1,2;57,44,11,1,1;58,45,9,1,1", "cover": "54,4,1,1,1;53,5,1,1,1;54,5,1,1,b;55,5,2,1,1;52,6,1,2,1;53,6,4,1,3;57,6,1,2,1;53,7,4,1,2;33,8,28,1,1;32,9,1,4,1;33,9,28,1,7;61,9,1,4,1;33,10,28,2,6;33,12,28,1,5;33,13,28,1,1", "bolt": "61,9,7,1,1;60,10,1,3,1;61,10,7,1,7;68,10,1,3,1;61,11,7,1,6;61,12,7,1,5;61,13,7,1,1", "flash": "10,5,2,1,1;9,6,1,4,1;10,6,2,1,a;12,6,1,4,1;10,7,2,4,b;15,8,6,1,1;14,9,1,1,1;15,9,6,2,b;21,9,1,2,1;5,10,5,1,1;12,10,3,1,1;3,11,2,1,1;5,11,5,1,7;10,11,2,1,c;12,11,5,1,7;17,11,4,1,1;2,12,1,2,1;3,12,5,2,b;8,12,9,2,6;17,12,1,2,1;3,14,2,1,1;5,14,5,1,5;10,14,2,1,a;12,14,5,1,5;17,14,3,1,1;5,15,5,1,1;10,15,2,4,b;12,15,3,1,1;15,15,5,2,b;20,15,1,2,1;9,16,1,4,1;12,16,1,4,1;14,16,1,1,1;15,17,5,1,1;10,19,2,1,c;10,20,2,1,1"}}, "sg": {"w": 104, "h": 54, "order": ["shell", "body", "pump"], "port": [59, 14], "flash": [-8, 4], "parts": {"shell": "49,26,14,1,1;48,27,1,5,1;49,27,4,1,a;53,27,10,1,3;63,27,1,4,1;49,28,4,3,b;53,28,1,1,2;54,28,8,1,4;62,28,1,1,2;53,29,10,2,2;49,31,4,1,c;53,31,11,1,1;49,32,14,1,1", "body": "5,7,2,1,1;4,8,1,2,1;5,8,2,1,a;7,8,1,3,1;5,9,2,1,b;45,9,20,1,1;3,10,2,1,1;5,10,2,1,c;44,10,1,1,1;45,10,20,1,3;65,10,1,2,1;2,11,1,4,1;3,11,2,1,3;5,11,40,1,1;45,11,20,2,2;79,11,17,1,1;3,12,2,1,2;5,12,40,1,3;65,12,14,1,1;79,12,14,1,c;93,12,3,1,3;96,12,1,19,1;3,13,50,1,2;53,13,1,1,1;54,13,8,1,3;62,13,1,1,1;63,13,2,3,2;65,13,14,1,c;79,13,14,1,d;93,13,3,18,2;3,14,2,1,2;5,14,40,1,1;45,14,8,2,2;53,14,10,2,1;65,14,28,1,d;2,15,43,1,1;65,15,4,1,d;69,15,1,1,e;70,15,3,1,d;73,15,1,1,e;74,15,19,1,d;2,16,1,2,1;3,16,4,1,3;7,16,38,1,6;45,16,20,5,2;65,16,28,2,d;3,17,4,1,2;7,17,38,1,4;2,18,5,1,1;7,18,38,1,3;65,18,4,1,d;69,18,1,1,e;70,18,3,1,d;73,18,1,1,e;74,18,19,1,d;3,19,42,1,1;65,19,14,1,e;79,19,14,5,d;44,20,1,1,1;65,20,14,1,1;44,21,25,1,1;69,21,1,1,e;70,21,1,1,1;72,21,1,1,1;73,21,1,1,e;74,21,1,1,1;78,21,1,4,1;45,22,10,1,1;55,22,14,1,2;69,22,1,1,1;73,22,1,1,1;54,23,1,5,1;55,23,1,4,2;56,23,5,1,1;61,23,1,1,6;62,23,7,1,1;56,24,1,2,1;60,24,1,2,1;61,24,1,2,4;62,24,1,2,1;79,24,14,1,e;79,25,4,1,1;83,25,10,1,c;56,26,5,1,1;61,26,1,1,3;62,26,7,1,1;82,26,1,6,1;83,26,10,5,d;55,27,14,1,2;69,27,1,1,1;55,28,14,1,1;83,31,10,1,e;93,31,4,1,1;83,32,13,1,1", "pump": "17,16,26,1,1;16,17,1,7,1;17,17,26,1,c;43,17,1,7,1;17,18,4,5,d;21,18,1,5,e;22,18,3,5,d;25,18,1,5,e;26,18,3,5,d;29,18,1,5,e;30,18,3,5,d;33,18,1,5,e;34,18,3,5,d;37,18,1,5,e;38,18,5,5,d;17,23,26,1,e;17,24,26,1,1", "flash": "10,3,3,1,1;9,4,1,5,1;10,4,3,1,a;13,4,1,3,1;10,5,3,5,b;15,6,6,1,1;13,7,2,3,1;15,7,6,1,a;21,7,1,3,1;15,8,6,1,b;3,9,7,1,1;15,9,6,1,c;2,10,1,6,1;3,10,6,1,a;9,10,1,1,1;10,10,3,1,c;13,10,8,1,1;3,11,6,4,b;9,11,8,1,7;17,11,1,3,1;9,12,8,2,6;9,14,8,1,5;17,14,4,1,1;3,15,6,1,c;9,15,1,1,1;10,15,3,1,a;13,15,2,3,1;15,15,6,1,a;21,15,1,3,1;3,16,7,1,1;10,16,3,5,b;15,16,6,1,b;9,17,1,5,1;15,17,6,1,c;13,18,1,4,1;15,18,6,1,1;10,21,3,1,c;10,22,3,1,1"}}};

// 把 "x,y,寬,高,顏色;..." 這種文字轉成方塊清單
function vmRects(text) {
  return text ? text.split(";").map(function (r) { const p = r.split(","); return [+p[0], +p[1], +p[2], +p[3], p[4]]; }) : [];
}

// 依槍種組出一支槍的 SVG：回傳整支槍、各個可動零件、火光與彈殼出口的位置
// ===== 第一人稱槍身（從槍的後方看）：用多邊形填成像素方格，槍口朝畫面中央、槍托靠近自己，雙手握住 =====
const FPS_W = 104, FPS_H = 64;
function fpsHelpers(parent) {
  function rect(g, x, y, w, h, key) {
    const r = document.createElementNS(SVG_NS, "rect");
    r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", w); r.setAttribute("height", h);
    r.setAttribute("fill", VM_PAL[key]);
    g.appendChild(r);
  }
  // 掃描線填色：把多邊形每一列切成一段段方格
  function poly(g, pts, key) {
    let minY = Infinity, maxY = -Infinity;
    pts.forEach(function (p) { minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]); });
    for (let y = Math.floor(minY); y < Math.ceil(maxY); y++) {
      const yc = y + 0.5, xs = [];
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i], b = pts[(i + 1) % pts.length];
        if ((a[1] <= yc && b[1] > yc) || (b[1] <= yc && a[1] > yc)) xs.push(a[0] + (yc - a[1]) * (b[0] - a[0]) / (b[1] - a[1]));
      }
      xs.sort(function (p, q) { return p - q; });
      for (let k = 0; k + 1 < xs.length; k += 2) {
        const x0 = Math.round(xs[k]), x1 = Math.round(xs[k + 1]);
        if (x1 > x0) rect(g, x0, y, x1 - x0, 1, key);
      }
    }
  }
  // 一條沿著槍管方向的帶子：上面是頂面（亮），下面是左側面（暗），外面一圈深色輪廓
  function ribbon(g, x0, y0, x1, y1, h0, h1, top, side, frac) {
    poly(g, [[x0 + 1, y0 - h0 / 2 - 1], [x1 - 1, y1 - h1 / 2 - 1], [x1 - 1, y1 + h1 / 2 + 1], [x0 + 1, y0 + h0 / 2 + 1]], "1");
    poly(g, [[x0, y0 - h0 / 2], [x1, y1 - h1 / 2], [x1, y1 - h1 / 2 + frac * h1], [x0, y0 - h0 / 2 + frac * h0]], top);
    poly(g, [[x0, y0 - h0 / 2 + frac * h0], [x1, y1 - h1 / 2 + frac * h1], [x1, y1 + h1 / 2], [x0, y0 + h0 / 2]], side);
    // 立體感：頂面前緣一條亮線、頂面與側面交界一條暗線、側面下緣一條更暗的陰影
    const up = { "3": "5", "4": "6", "5": "7", "6": "8", "b": "a", "c": "b", "d": "c" };
    const dn = { "3": "2", "4": "3", "5": "4", "6": "5", "b": "c", "c": "d", "d": "e" };
    const t = 1.6;
    poly(g, [[x0, y0 - h0 / 2], [x1, y1 - h1 / 2], [x1, y1 - h1 / 2 + t], [x0, y0 - h0 / 2 + t]], up[top] || "8");
    poly(g, [[x0, y0 - h0 / 2 + frac * h0 - 1], [x1, y1 - h1 / 2 + frac * h1 - 1], [x1, y1 - h1 / 2 + frac * h1 + 1], [x0, y0 - h0 / 2 + frac * h0 + 1]], dn[top] || "2");
    poly(g, [[x0, y0 + h0 / 2 - 2.5], [x1, y1 + h1 / 2 - 2.5], [x1, y1 + h1 / 2], [x0, y0 + h0 / 2]], dn[side] || "1");
  }
  return { rect: rect, poly: poly, ribbon: ribbon };
}

// 沒有手臂：只有槍。握把畫在機匣後下方，讓槍看起來是被握著的
function fpsGrip(g, h) {
  h.poly(g, [[74, 51], [94, 47], [106, 66], [86, 72]], "1");
  h.poly(g, [[75, 52], [93, 48], [104, 65], [86, 70]], "3");
  h.poly(g, [[75, 52], [93, 48], [94, 52], [76, 56]], "4");
  for (let i = 0; i < 4; i++) h.rect(g, 80 + i * 4, 58 + i * 1, 2, 2, "2");
}

const fpsBuilders = {
  // 長槍（步槍、衝鋒槍、機槍、霰彈槍）與手槍共用同一套畫法，用 cfg 決定長度、材質與零件
  build: function (g, h, cfg) {
    const parts = {};
    function grp(name) { const n = document.createElementNS(SVG_NS, "g"); g.appendChild(n); if (name) parts[name] = n; return n; }
    const body = grp();
    const fx = cfg.fx, fy = cfg.fy;   // 準星位置
    const wTop = cfg.wood ? "b" : "5", wSide = cfg.wood ? "d" : "3";
    // 護木與槍管
    if (!cfg.pistol) {
      h.ribbon(body, cfg.recX, cfg.recY, fx + 8, fy + 4, cfg.hgH0, cfg.hgH1, wTop, wSide, 0.4);
      h.ribbon(body, fx + 8, fy + 4, fx - 4, fy - 2, 7, 6, "3", "2", 0.4);
      for (let i = 0; i < cfg.vents; i++) {
        const t = (i + 0.5) / cfg.vents;
        h.rect(body, Math.round(cfg.recX + (fx + 8 - cfg.recX) * t) - 1, Math.round(cfg.recY + (fy + 4 - cfg.recY) * t) - 1, 2, 3, "1");
      }
    }
    if (cfg.tube) {   // 霰彈槍的彈倉管：在槍管下面
      h.ribbon(body, 66, 51, fx + 6, fy + 14, 9, 6, "4", "3", 0.4);
    }
    // 頂部導軌的小齒、護木的接縫
    if (!cfg.pistol) {
      for (let i = 0; i < 9; i++) {
        const t = (i + 0.5) / 9;
        h.rect(body, Math.round(cfg.recX + (fx + 8 - cfg.recX) * t), Math.round(cfg.recY + (fy + 4 - cfg.recY) * t - (cfg.hgH0 + (cfg.hgH1 - cfg.hgH0) * t) / 2) - 1, 1, 2, "2");
      }
    }
    // 機匣、槍托端
    if (cfg.pistol) {
      h.ribbon(body, 92, 59, 58, 44, 20, 9, "3", "2", 0.4);   // 槍身（滑套下面的框架）
    } else {
      h.ribbon(body, 92, 54, cfg.recX, cfg.recY, 40, cfg.hgH0, cfg.wood ? "c" : "6", cfg.wood ? "d" : "4", 0.4);
    }
    if (!cfg.pistol) {   // 機匣側面的退殼口與保險桿
      h.rect(body, cfg.recX + 6, cfg.recY + 1, 9, 4, "1");
      h.rect(body, cfg.recX + 8, cfg.recY + 2, 5, 1, "3");
      h.rect(body, cfg.recX + 17, cfg.recY + 6, 6, 2, "7");
    }
    // 準星
    h.poly(body, [[fx - 3, fy + 3], [fx, fy - 7], [fx + 3, fy + 3]], "1");
    h.rect(body, fx - 1, fy - 6, 2, 6, cfg.bead ? "b" : "3");
    // 照門
    if (!cfg.noRear) {
      h.rect(body, cfg.rsX, cfg.rsY, 15, 12, "1");
      h.rect(body, cfg.rsX + 1, cfg.rsY + 1, 13, 10, "3");
      h.rect(body, cfg.rsX + 1, cfg.rsY + 1, 13, 2, "5");
      h.rect(body, cfg.rsX + 5, cfg.rsY + 3, 5, 6, "1");
    }
    // 彈匣（彈匣掉出、換入的動畫用）
    const mag = grp("mag");
    h.poly(mag, cfg.mag, "1");
    h.poly(mag, cfg.mag.map(function (q) { return [q[0] + (q[0] > cfg.mag[0][0] ? -1 : 1), q[1] + (q[1] > cfg.mag[0][1] + 4 ? -1 : 1)]; }), "3");
    // 槍機（拉柄）；手槍是整片滑套；步槍有伸到右側的拉柄
    const bolt = grp("bolt");
    if (cfg.pistol) {
      parts.slide = bolt;
      h.ribbon(bolt, 92, 50, fx + 2, fy + 4, 26, 12, "6", "4", 0.42);
      h.rect(bolt, 77, 29, 4, 5, "1"); h.rect(bolt, 86, 30, 4, 5, "1");   // 後照門的兩個缺口柱
      for (let i = 0; i < 5; i++) h.rect(bolt, 80 + i * 3, 44, 1, 7, "3");
    } else if (cfg.knob) {
      h.rect(bolt, 84, 41, 10, 3, "7"); h.rect(bolt, 84, 41, 10, 1, "8");
      h.rect(bolt, 93, 38, 5, 6, "5"); h.rect(bolt, 93, 38, 5, 1, "7"); h.rect(bolt, 93, 43, 5, 1, "1");
    } else if (!cfg.noBolt) {
      h.rect(bolt, 84, 39, 7, 3, "7"); h.rect(bolt, 84, 39, 7, 1, "8"); h.rect(bolt, 90, 40, 2, 5, "1");
    }
    // 機槍的上蓋、彈鏈、彈箱
    grp("cover"); const box = grp("box"), belt = grp("belt");
    if (cfg.belt) {
      h.poly(box, [[60, 56], [72, 52], [72, 66], [56, 66]], "1");
      h.poly(box, [[61, 57], [71, 53], [71, 65], [58, 65]], "3");
      for (let i = 0; i < 5; i++) h.rect(belt, 62 + i, 47 - i * 2 + 6, 2, 4, i % 2 ? "b" : "c");
      h.ribbon(parts.cover, 84, 44, 64, 34, 5, 4, "7", "5", 0.5);
    }
    // 步槍裝填用的彈夾（平時看不見）
    const clip = grp("clip"); clip.style.opacity = "0";
    h.rect(clip, 64, 30, 10, 2, "b"); h.rect(clip, 64, 32, 10, 3, "d");
    // 霰彈槍裝填的那顆彈（平時看不見）與前護木（拉動時會往後）
    const shell = grp("shell"); shell.style.opacity = "0";
    h.rect(shell, 66, 50, 8, 4, "b"); h.rect(shell, 66, 54, 8, 2, "c"); h.rect(shell, 64, 50, 2, 6, "7");
    const pump = grp("pump");
    if (cfg.pump) {
      h.ribbon(pump, 66, 49, 52, 41, 17, 12, "b", "d", 0.4);
      for (let i = 0; i < 4; i++) h.rect(pump, 54 + i * 3, 42 + Math.round(i * 1.6), 1, 6, "e");
    }
    fpsGrip(g, h);
    // 槍口火光與彈殼出口
    const flash = grp("flash"); flash.style.opacity = "0";
    h.poly(flash, [[fx - 18, fy - 2], [fx - 6, fy - 5], [fx - 2, fy - 16], [fx + 2, fy - 5], [fx + 14, fy - 10], [fx + 6, fy], [fx + 14, fy + 8], [fx + 2, fy + 4], [fx - 2, fy + 12], [fx - 6, fy + 3]], "b");
    h.poly(flash, [[fx - 10, fy - 1], [fx - 2, fy - 8], [fx + 6, fy - 1], [fx - 2, fy + 6]], "8");
    return { parts: parts, flash: flash, port: [cfg.rsX + 10, cfg.rsY + 4] };
  }
};

// ===== 瞄準鏡畫面：160×100 的像素格，鋪滿整個試射場。三種：狙擊鏡、光學瞄具（ACOG 式）、紅點／全像瞄具 =====
const scopeCache = {};
function buildScopeSvg(type) {
  const W = 160, H = 100, cx = 80, cy = 50;
  const svg = newSvg("range-scope-svg", "0 0 " + W + " " + H);
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  const D = "#0B1822", D2 = "#17303F", L = "#4A6678", Y = "#D9C45A", SHADE = "rgba(11,24,34,0.5)";
  function band(y, x0, x1, c) { if (x1 > x0) svgRect(svg, x0, y, x1 - x0, 1, c); }
  function ringed(R, thick) {
    // 鏡片以外全黑；鏡筒的內緣是一圈棋盤格漸層，像鏡片邊緣的暗角
    for (let y = 0; y < H; y++) {
      const dy = y + 0.5 - cy;
      if (Math.abs(dy) >= R) { band(y, 0, W, D); continue; }
      const dx = Math.sqrt(R * R - dy * dy);
      band(y, 0, Math.round(cx - dx), D); band(y, Math.round(cx + dx), W, D);
    }
    for (let y = Math.floor(cy - R); y < Math.ceil(cy + R); y++) for (let x = Math.floor(cx - R); x < Math.ceil(cx + R); x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      if (d >= R || d < R - thick - 3) continue;
      if (d >= R - 1) svgRect(svg, x, y, 1, 1, L);
      else if (d >= R - thick) svgRect(svg, x, y, 1, 1, (x + y) % 2 ? D2 : D);
      else if ((x + y) % 2 === 0) svgRect(svg, x, y, 1, 1, SHADE);
    }
  }
  function hline(y, x0, x1, c) { svgRect(svg, x0, y, x1 - x0, 1, c); }
  function vline(x, y0, y1, c) { svgRect(svg, x, y0, 1, y1 - y0, c); }
  if (type === "sniper") {
    ringed(47, 4);
    // 十字線＋粗外框＋密位點：和真的狙擊鏡一樣
    hline(cy, cx - 44, cx - 5, D); hline(cy, cx + 5, cx + 44, D); vline(cx, cy - 44, cy - 5, D); vline(cx, cy + 5, cy + 44, D);
    hline(cy - 1, cx - 44, cx - 22, D); hline(cy + 1, cx - 44, cx - 22, D); hline(cy - 1, cx + 22, cx + 44, D); hline(cy + 1, cx + 22, cx + 44, D);
    vline(cx - 1, cy - 44, cy - 22, D); vline(cx + 1, cy - 44, cy - 22, D); vline(cx - 1, cy + 22, cy + 44, D); vline(cx + 1, cy + 22, cy + 44, D);
    for (let o = 6; o <= 20; o += 4) { [[-o, 0], [o, 0], [0, -o], [0, o]].forEach(function (q) { svgRect(svg, cx + q[0] - 0.5 + (q[0] ? 0 : -0.5), cy + q[1] - 0.5 + (q[1] ? 0 : -0.5), 2, 2, D); }); }
    svgRect(svg, cx - 1, cy - 1, 2, 2, Y);
  } else if (type === "optic") {
    ringed(38, 6);
    // 黃色人字形分劃＋下方的距離刻度，兩側有細橫線
    hline(cy + 4, cx - 34, cx - 12, D); hline(cy + 4, cx + 12, cx + 34, D);
    for (let i = 0; i < 9; i++) { svgRect(svg, cx - i - 1, cy - 6 + i, 2, 1, Y); svgRect(svg, cx + i - 1, cy - 6 + i, 2, 1, Y); }
    svgRect(svg, cx - 1, cy + 4, 2, 2, Y);
    [[12, 8], [20, 6], [28, 6], [36, 4]].forEach(function (b, i) { hline(cy + 4 + b[0] - 4 * (i === 0 ? 0 : 0), cx - b[1] / 2, cx + b[1] / 2, Y); });
    vline(cx - 1, cy + 6, cy + 14, Y);
  } else if (type === "iron") {
    // 機械瞄具：不畫槍，只留一個小準心；畫面四周有輕微暗角（棋盤格）
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const d = Math.hypot((x + 0.5 - cx) / 1.6, y + 0.5 - cy);
      if (d >= 64 && ((x + y) % 2 === 0 || d >= 76)) svgRect(svg, x, y, 1, 1, "rgba(11,24,34,0.28)");
    }
    hline(cy, cx - 9, cx - 3, D); hline(cy, cx + 3, cx + 9, D); vline(cx, cy - 9, cy - 3, D); vline(cx, cy + 3, cy + 9, D);
    svgRect(svg, cx - 1, cy - 1, 2, 2, Y);
  } else {
    // 紅點瞄具：視野幾乎全開，只有四周一圈很薄的鏡框；紅點（這裡用黃色）本身就是準心
    const x0 = 14, x1 = 146, y0 = 8, y1 = 92;
    svgRect(svg, 0, 0, W, y0 - 2, SHADE); svgRect(svg, 0, y1 + 2, W, H - y1 - 2, SHADE);
    svgRect(svg, 0, y0 - 2, x0 - 2, y1 - y0 + 4, SHADE); svgRect(svg, x1 + 2, y0 - 2, W - x1 - 2, y1 - y0 + 4, SHADE);
    svgRect(svg, x0 - 2, y0 - 2, x1 - x0 + 4, 2, D); svgRect(svg, x0 - 2, y1, x1 - x0 + 4, 2, D);
    svgRect(svg, x0 - 2, y0, 2, y1 - y0, D); svgRect(svg, x1, y0, 2, y1 - y0, D);
    svgRect(svg, x0, y0, x1 - x0, 1, L); svgRect(svg, x0, y1 - 1, x1 - x0, 1, L);
    svgRect(svg, cx - 1, cy - 1, 3, 3, Y); svgRect(svg, cx, cy - 2, 1, 1, Y); svgRect(svg, cx, cy + 2, 1, 1, Y); svgRect(svg, cx - 2, cy, 1, 1, Y); svgRect(svg, cx + 2, cy, 1, 1, Y);
  }
  return svg;
}

function buildFpsGun(type, pixel) {
  const svg = newSvg("vm-svg fps", "0 0 " + FPS_W + " " + FPS_H);
  svg.style.width = Math.round(FPS_W * pixel) + "px";
  const h = fpsHelpers(svg);
  const cfgs = {
    hg:  { pistol: true, noRear: true, fx: 54, fy: 35, recX: 70, recY: 44, rsX: 74, rsY: 30, mag: [[72, 56], [82, 58], [82, 66], [72, 66]], bead: true },
    ar:  { fx: 46, fy: 32, recX: 71, recY: 45, hgH0: 26, hgH1: 13, vents: 3, rsX: 75, rsY: 30, mag: [[68, 52], [84, 58], [86, 68], [70, 66]] },
    smg: { fx: 52, fy: 35, recX: 73, recY: 46, hgH0: 24, hgH1: 13, vents: 2, rsX: 77, rsY: 32, mag: [[62, 52], [72, 56], [72, 68], [60, 66]] },
    rf:  { wood: true, knob: true, fx: 48, fy: 33, recX: 72, recY: 45, hgH0: 24, hgH1: 11, vents: 0, rsX: 76, rsY: 30, mag: [[70, 54], [78, 57], [78, 59], [70, 57]] },
    mg:  { fx: 42, fy: 29, recX: 70, recY: 43, hgH0: 28, hgH1: 15, vents: 4, rsX: 74, rsY: 26, belt: true, mag: [[70, 52], [76, 54], [76, 56], [70, 54]] },
    sg:  { wood: true, bead: true, tube: true, pump: true, noRear: true, noBolt: true, fx: 46, fy: 31, recX: 70, recY: 44, hgH0: 24, hgH1: 9, vents: 0, rsX: 74, rsY: 30, mag: [[70, 56], [74, 57], [74, 58], [70, 57]] }
  };
  const out = fpsBuilders.build(svg, h, cfgs[type] || cfgs.ar);
  const port = document.createElementNS(SVG_NS, "rect");
  port.setAttribute("x", out.port[0]); port.setAttribute("y", out.port[1]); port.setAttribute("width", 1); port.setAttribute("height", 1); port.setAttribute("fill", "none");
  svg.appendChild(port);
  return { svg: svg, parts: out.parts, flash: out.flash, port: port };
}

// 持槍的手與袖子：握在握把上，前臂往右下角延伸出畫面。位置 [x, y, 寬, 高] 是各槍握把在點陣圖裡的位置
const vmHands = { hg: [29, 24, 17, 15], smg: [38, 26, 16, 13], ar: [49, 27, 15, 13], rf: [55, 36, 19, 11], mg: [54, 34, 15, 12], sg: [50, 20, 22, 11] };
function buildHand(type) {
  const h = vmHands[type];
  const g = document.createElementNS(SVG_NS, "g");
  function r(x, y, w, hh, c) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", x); rect.setAttribute("y", y); rect.setAttribute("width", w); rect.setAttribute("height", hh);
    rect.setAttribute("fill", VM_PAL[c]);
    g.appendChild(rect);
  }
  const x = h[0], y = h[1], w = h[2], hh = h[3];
  // 前臂（袖子）：一階一階往右下走；左右各一格深色輪廓，中間一條黃色袖口
  const ax = x + w - 7, ay = y + hh - 3;
  for (let i = 0; i < 22; i++) {
    const cx = ax + i, cy = ay + i * 2;
    const cuff = i >= 5 && i <= 6;
    r(cx, cy, 15, 2, cuff ? "b" : "2");
    r(cx, cy, 1, 2, "1");
    r(cx + 14, cy, 1, 2, "1");
    if (!cuff) r(cx + 2, cy, 2, 2, "3");
  }
  // 手：深色手套，四條指縫，拇指在握把上方
  r(x, y, w, hh, "2");
  r(x, y, w, 1, "1"); r(x, y + hh - 1, w, 1, "1"); r(x, y, 1, hh, "1"); r(x + w - 1, y, 1, hh, "1");
  for (let j = 1; j <= 3; j++) r(x + 1, y + Math.round(j * hh / 4), w - 2, 1, "1");
  r(x + 2, y + 1, w - 4, 1, "3");
  r(x + 3, y - 3, 5, 3, "2"); r(x + 3, y - 3, 5, 1, "1"); r(x + 3, y - 3, 1, 3, "1");
  return g;
}

function buildViewmodel(type, pixel) {
  const spec = viewmodels[type];
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 " + spec.w + " " + spec.h);
  svg.setAttribute("shape-rendering", "crispEdges");
  svg.setAttribute("class", "vm-svg");
  svg.setAttribute("aria-hidden", "true");
  svg.style.width = Math.round(spec.w * pixel) + "px";
  function group(parent, text) {
    const g = document.createElementNS(SVG_NS, "g");
    vmRects(text).forEach(function (r) {
      const rect = document.createElementNS(SVG_NS, "rect");
      rect.setAttribute("x", r[0]);
      rect.setAttribute("y", r[1]);
      rect.setAttribute("width", r[2]);
      rect.setAttribute("height", r[3]);
      rect.setAttribute("fill", VM_PAL[r[4]]);
      g.appendChild(rect);
    });
    parent.appendChild(g);
    return g;
  }
  const parts = {};
  spec.order.forEach(function (name) { parts[name] = group(svg, spec.parts[name]); });
  svg.appendChild(buildHand(type));
  const flashBox = document.createElementNS(SVG_NS, "g");
  flashBox.setAttribute("transform", "translate(" + spec.flash[0] + " " + spec.flash[1] + ")");
  const flash = group(flashBox, spec.parts.flash);
  flash.style.opacity = "0";
  svg.appendChild(flashBox);
  // 彈殼出口：一個看不見的小方塊，用來算出彈殼在畫面上的起點
  const port = document.createElementNS(SVG_NS, "rect");
  port.setAttribute("x", spec.port[0]);
  port.setAttribute("y", spec.port[1]);
  port.setAttribute("width", 1);
  port.setAttribute("height", 1);
  port.setAttribute("fill", "none");
  svg.appendChild(port);
  // 沒有用到的零件先藏起來（步槍的彈夾、霰彈槍的待裝彈殼）
  if (parts.clip) parts.clip.style.opacity = "0";
  if (parts.shell) parts.shell.style.opacity = "0";
  return { svg: svg, parts: parts, flash: flash, port: port };
}

// 六個槍種的射擊設定：射速、彈匣、裝填、後座力（準心上飄）、散布，以及槍身後座的視覺幅度
const rangeWeapons = {
  hg:  { name: "手槍", mode: "semi", rate: 160, mag: 12, reload: 1500, kick: 28, spread: 5, pellets: 1, shake: 2, vib: 15, kx: 16, ky: 22, kr: 5, zoom: 1,
         eject: "shot", desc: "半自動，每按一下發射一發。每一發視角都會往上頂一下，滑套也會後退再彈回，彈匣打空後要換彈匣。" },
  smg: { name: "衝鋒槍", mode: "auto", rate: 85, mag: 30, reload: 1900, kick: 12, spread: 10, pellets: 1, shake: 1.5, vib: 8, kx: 9, ky: 14, kr: 2.5, zoom: 1,
         eject: "shot", desc: "全自動，按住不放連續射擊。單發後座力小，但射速快，視角會一路緩緩上飄，散布也比較大。" },
  ar:  { name: "突擊步槍", mode: "auto", rate: 110, mag: 30, reload: 2100, kick: 20, spread: 7, pellets: 1, shake: 2, vib: 12, kx: 14, ky: 20, kr: 3.5, zoom: 1,
         eject: "shot", desc: "全自動，射速與準度均衡。連射時後座力會累積，視角越跳越高，要用滑鼠往下壓。" },
  rf:  { name: "步槍", mode: "bolt", rate: 900, mag: 5, reload: 2600, kick: 60, spread: 1, pellets: 1, shake: 4, vib: 40, kx: 40, ky: 40, kr: 9, zoom: 1,
         eject: "cycle", desc: "栓動式，附 4 倍狙擊鏡，按住右鍵開鏡才打得準（不開鏡時散布很大）。每發之間要手動拉栓，彈殼在拉栓時才退出。後座力很大，每開一槍都要重新瞄準，但幾乎沒有散布。" },
  mg:  { name: "機槍", mode: "auto", rate: 70, mag: 60, reload: 3600, kick: 15, spread: 14, pellets: 1, shake: 2.5, vib: 10, kx: 14, ky: 20, kr: 3.5, zoom: 1,
         eject: "shot", desc: "全自動，射速極高、彈匣大，換彈時要掀開上蓋、裝入彈鏈。後座力累積得很快，需要點放控制。" },
  sg:  { name: "霰彈槍", mode: "pump", rate: 800, mag: 6, reload: 2400, kick: 70, spread: 38, pellets: 9, shake: 5, vib: 50, kx: 48, ky: 44, kr: 11, zoom: 1,
         eject: "cycle", desc: "泵動式，一發散成多顆彈丸。後座力很大，每發之間要拉動護木才會退殼上膛，裝填時一顆一顆塞彈，塞到一半也能直接開火。" }
};
// 瞄準鏡（按住滑鼠右鍵開鏡）：type 決定畫面樣式；zoom 倍率；hipMul 是不開鏡時的散布倍率；adsMul 是開鏡時
const rangeScopes = {
  ar:  { name: "2 倍光學瞄具", zoom: 2, type: "optic", hipMul: 1, adsMul: 0.5 },
  rf:  { name: "4 倍狙擊鏡", zoom: 4, type: "sniper", hipMul: 12, adsMul: 1 }
};
// ---- 每把槍自己的試射數據（模擬值，依公開資料與口徑、重量、作動方式估算）----
// rpm：理論射速（發／分，只有全自動用）；ms：半自動、栓動、泵動時兩發之間最短的間隔（毫秒）；
// mag：彈匣／彈鏈／彈筒容量；reload：換彈秒數；kick：相對後座力（和上面各槍種的數值同一把尺）；scope: 0 代表只有機械瞄具
const gunStats = {
  m1911: { ms: 170, mag: 7, reload: 1.7, kick: 26 }, glock17: { ms: 150, mag: 17, reload: 1.5, kick: 17 },
  cz75: { ms: 150, mag: 15, reload: 1.6, kick: 17 }, makarov: { ms: 160, mag: 8, reload: 1.6, kick: 15 },
  fiveseven: { ms: 140, mag: 20, reload: 1.5, kick: 9 }, deserteagle: { ms: 260, mag: 7, reload: 2.0, kick: 46 },
  sigp210: { ms: 160, mag: 8, reload: 1.7, kick: 16 },
  mp5: { rpm: 800, mag: 30, reload: 2.2, kick: 9 }, thompson1928: { rpm: 700, mag: 30, reload: 2.6, kick: 14, scope: 0 },
  uzi: { rpm: 600, mag: 32, reload: 2.2, kick: 10, scope: 0 }, ppsh41: { rpm: 900, mag: 71, reload: 3.6, kick: 11, scope: 0 },
  suomi: { rpm: 900, mag: 71, reload: 3.6, kick: 10, scope: 0 }, ump45: { rpm: 600, mag: 25, reload: 2.2, kick: 12 },
  fmk3: { rpm: 650, mag: 40, reload: 2.4, kick: 10, scope: 0 }, owen: { rpm: 700, mag: 33, reload: 2.4, kick: 10, scope: 0 },
  carlgustaf: { rpm: 600, mag: 36, reload: 2.4, kick: 10, scope: 0 }, pm63: { rpm: 600, mag: 25, reload: 2.0, kick: 9, scope: 0 },
  ak47: { rpm: 600, mag: 30, reload: 2.4, kick: 24, scope: 0 }, m16: { rpm: 800, mag: 30, reload: 2.1, kick: 14, scope: 0 },
  type56: { rpm: 600, mag: 30, reload: 2.4, kick: 24, scope: 0 }, t91: { rpm: 750, mag: 30, reload: 2.1, kick: 15 },
  hk416: { rpm: 850, mag: 30, reload: 2.0, kick: 14 }, fal: { rpm: 675, mag: 20, reload: 2.3, kick: 28, scope: 0 },
  insas: { rpm: 650, mag: 20, reload: 2.2, kick: 14, scope: 0 }, k2: { rpm: 750, mag: 30, reload: 2.1, kick: 14 },
  sar21: { rpm: 650, mag: 30, reload: 2.3, kick: 13, scope: { name: "內建 1.5 倍瞄具", zoom: 1.5, type: "optic", hipMul: 1, adsMul: 0.6 } },
  m70: { rpm: 650, mag: 30, reload: 2.4, kick: 22, scope: 0 }, ia2: { rpm: 750, mag: 30, reload: 2.1, kick: 14 },
  kar98k: { ms: 1500, mag: 5, reload: 3.0, kick: 62 }, m14: { mode: "semi", ms: 190, mag: 20, reload: 2.3, kick: 40 },
  leeenfield: { ms: 900, mag: 10, reload: 3.2, kick: 52 }, type38: { ms: 1300, mag: 5, reload: 3.0, kick: 38 },
  liu: { mode: "semi", ms: 220, mag: 10, reload: 2.8, kick: 55 }, martinihenry: { ms: 2000, mag: 1, reload: 1.8, kick: 78, spread: 3, scope: 0 },
  cetme: { mode: "semi", ms: 190, mag: 20, reload: 2.3, kick: 38 }, ross: { ms: 1100, mag: 5, reload: 3.0, kick: 55 },
  mg42: { rpm: 1200, mag: 50, reload: 5.5, kick: 14, scope: 0 }, m249: { rpm: 850, mag: 200, reload: 7.0, kick: 13 },
  bren: { rpm: 500, mag: 30, reload: 3.0, kick: 17, scope: 0 }, pkm: { rpm: 650, mag: 100, reload: 6.0, kick: 22 },
  mg338: { rpm: 650, mag: 100, reload: 6.5, kick: 38 }, negev: { rpm: 850, mag: 150, reload: 5.5, kick: 14 },
  madsen: { rpm: 450, mag: 30, reload: 3.0, kick: 15, scope: 0 }, hotchkiss: { rpm: 480, mag: 30, reload: 4.0, kick: 24, scope: 0 },
  zb26: { rpm: 500, mag: 20, reload: 3.2, kick: 20, scope: 0 }, m2: { rpm: 550, mag: 100, reload: 8.0, kick: 46, scope: 0 },
  remington870: { ms: 800, mag: 7, reload: 3.0, kick: 66 }, benellim4: { mode: "semi", ms: 220, mag: 6, reload: 2.6, kick: 62 },
  spas12: { ms: 750, mag: 8, reload: 3.2, kick: 66 }, mossberg500: { ms: 800, mag: 6, reload: 2.8, kick: 66 },
  mag7: { ms: 800, mag: 5, reload: 2.4, kick: 84, spread: 44 }, uts15: { ms: 750, mag: 15, reload: 6.0, kick: 62 },
  win1897: { ms: 800, mag: 5, reload: 2.6, kick: 80 }, saiga12: { mode: "semi", ms: 200, mag: 8, reload: 2.6, kick: 56 },
  auto5: { mode: "semi", ms: 260, mag: 5, reload: 2.6, kick: 72 }, ithaca37: { ms: 800, mag: 5, reload: 2.6, kick: 66 }
};
const defaultGun = { hg: "glock17", smg: "mp5", ar: "ak47", rf: "kar98k", mg: "m249", sg: "remington870" };
const modeDesc = { semi: "半自動，每按一下發射一發。", auto: "全自動，按住不放連續射擊。", bolt: "栓動式，每發之間要手動拉栓，彈殼在拉栓時才退出。", pump: "泵動式，每發之間要拉動護木才會退殼上膛。" };
const typeTail = { hg: "每一發視角都會往上頂一下，彈匣打空後要換彈匣。", smg: "單發後座力小，但射速快，視角會緩緩上飄。", ar: "連射時後座力會累積，視角越跳越高，要用滑鼠往下壓。",
  rf: "後座力很大，每開一槍都要重新瞄準。", mg: "射速高、彈量大，換彈時要掀開上蓋、裝入彈鏈，需要點放控制。", sg: "一發散成多顆彈丸，裝填時一顆一顆塞彈，塞到一半也能直接開火。" };
// 把「槍種的基本動作」和「這把槍自己的數據」合成一份設定
function weaponFor(id) {
  const g = guns.find(function (x) { return x.id === id; });
  const st = gunStats[id];
  const base = rangeWeapons[g.type];
  const w = Object.assign({}, base);
  w.name = g.name;
  w.mode = st.mode || (st.rpm ? "auto" : base.mode);
  if (st.rpm) { w.rpm = st.rpm; w.rate = Math.round(60000 / st.rpm); } else { w.rate = st.ms; }
  w.mag = st.mag;
  w.reload = Math.round(st.reload * 1000);
  w.kick = st.kick;
  if (st.spread) w.spread = st.spread;
  w.eject = (w.mode === "bolt" || w.mode === "pump") ? "cycle" : "shot";
  w.scope = st.scope === 0 ? rangeIron[g.type] : (st.scope || rangeScopes[g.type] || rangeIron[g.type]);
  w.desc = modeDesc[w.mode] + typeTail[g.type];
  w.gun = g;
  return w;
}
// 沒有瞄準鏡的槍：瞄準時只剩準心（不顯示槍身），視角稍微拉近、散布縮小
const rangeIron = {
  hg: { name: "機械瞄具", zoom: 1.15, type: "iron", hipMul: 1.5, adsMul: 0.65 },
  smg: { name: "機械瞄具", zoom: 1.2, type: "iron", hipMul: 1.5, adsMul: 0.65 },
  ar: { name: "機械瞄具", zoom: 1.25, type: "iron", hipMul: 1.5, adsMul: 0.6 },
  rf: { name: "機械瞄具", zoom: 1.3, type: "iron", hipMul: 1.5, adsMul: 0.6 },
  mg: { name: "機械瞄具", zoom: 1.2, type: "iron", hipMul: 1.5, adsMul: 0.7 },
  sg: { name: "機械瞄具", zoom: 1.1, type: "iron", hipMul: 1.4, adsMul: 0.7 }
};
const RECOIL = 0.4;   // 全域後座力倍率：越小視角被頂得越少
const modeLabel = { semi: "半自動", auto: "全自動", bolt: "栓動", pump: "泵動" };
// 三張靶紙同時在場上：距離越遠，靶紙越小、位置越高（越靠近地平線）。x、y 是 world 裡的座標，stand 是支架長度
const rangeTargets = [
  { m: 10, size: 200, x: -330, y: 20, stand: 150 },
  { m: 25, size: 110, x: 0, y: 8, stand: 100 },
  { m: 50, size: 60, x: 330, y: 8, stand: 70 }
];

let rangeTimer = null;
let rangeSpawn = null;
let rangeFire = null;
let rangeFrame = null;
let rangeKeyHandler = null;
let rangeAudio = null;
let rangeCleanup = null;

function stopRange() {
  if (rangeTimer) { clearInterval(rangeTimer); rangeTimer = null; }
  if (rangeSpawn) { clearTimeout(rangeSpawn); rangeSpawn = null; }
  if (rangeFire) { clearInterval(rangeFire); rangeFire = null; }
  if (rangeFrame) { cancelAnimationFrame(rangeFrame); rangeFrame = null; }
  if (rangeKeyHandler) { document.removeEventListener("keydown", rangeKeyHandler); rangeKeyHandler = null; }
  if (rangeCleanup) { rangeCleanup(); rangeCleanup = null; }
}

// 槍聲：用 Web Audio 現場合成一小段雜訊，越大的槍聲音越低、越長。預設關閉，要自己打開。
function playShot(type) {
  if (rangeAudio === null) {
    try { rangeAudio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { rangeAudio = false; }
  }
  if (!rangeAudio) return;
  const dur = { hg: 0.12, smg: 0.08, ar: 0.1, rf: 0.25, mg: 0.09, sg: 0.3 }[type];
  const cutoff = { hg: 2500, smg: 2800, ar: 2200, rf: 1600, mg: 1800, sg: 1200 }[type];
  const len = Math.floor(rangeAudio.sampleRate * dur);
  const buffer = rangeAudio.createBuffer(1, len, rangeAudio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  const source = rangeAudio.createBufferSource();
  source.buffer = buffer;
  const filter = rangeAudio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = cutoff;
  const gain = rangeAudio.createGain();
  gain.gain.value = 0.3;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(rangeAudio.destination);
  source.start();
}

// 命中提示音：短促的「叮」，打中靶心時是兩聲高音
function playTick(bull) {
  if (!rangeAudio) return;
  [bull ? [1760, 0] : [1100, 0], bull ? [2350, 0.06] : null].forEach(function (n) {
    if (!n) return;
    const o = rangeAudio.createOscillator(), g = rangeAudio.createGain();
    o.type = "square"; o.frequency.value = n[0];
    const t0 = rangeAudio.currentTime + n[1];
    g.gain.setValueAtTime(0.07, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.07);
    o.connect(g); g.connect(rangeAudio.destination);
    o.start(t0); o.stop(t0 + 0.08);
  });
}

// 動畫小工具：減少動態時不播放；播放失敗也不會讓遊戲壞掉
function anim(node, frames, ms) {
  if (!node || reduceMotion() || !node.animate) return null;
  try { return node.animate(frames, { duration: ms, easing: "linear" }); } catch (e) { return null; }
}
function move(x, y) { return { transform: "translate(" + x + "px," + y + "px)" }; }
function key(frame, offset) { frame.offset = offset; return frame; }

// ---- 試射場的像素場景：全部用 8 像素的方格堆出來，顏色只用深藍、紙白與黃色的深淺 ----
function seeded(seed) { let a = seed; return function () { a = (a * 1664525 + 1013904223) % 4294967296; return a / 4294967296; }; }
function svgRect(parent, x, y, w, h, fill) {
  const r = document.createElementNS(SVG_NS, "rect");
  r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", w); r.setAttribute("height", h); r.setAttribute("fill", fill);
  parent.appendChild(r);
  return r;
}
function newSvg(cls, vb) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", cls);
  svg.setAttribute("viewBox", vb);
  svg.setAttribute("shape-rendering", "crispEdges");
  svg.setAttribute("aria-hidden", "true");
  return svg;
}
// 背景：天空色階（交界處用棋盤格抖色）、像素雲、兩層遠山、土堤、松樹、靶場小屋與旗桿
function buildScenery() {
  const U = 8, X0 = -1600, Y0 = -760, W = 3200;
  const svg = newSvg("range-scenery", X0 + " " + Y0 + " " + W + " 800");
  const rnd = seeded(7);
  const sky = ["#AEBFCA", "#B9C9D2", "#C5D3DA", "#D0DCE1", "#DBE5E8", "#E5ECEC"];
  const bandH = 120;
  sky.forEach(function (c, i) {
    const y = Y0 + i * bandH;
    svgRect(svg, X0, y, W, i === sky.length - 1 ? 760 - i * bandH : bandH, c);
    if (i < sky.length - 1) for (let x = X0, k = 0; x < X0 + W; x += U, k++) if (k % 2 === 0) svgRect(svg, x, y + bandH - U, U, U, sky[i + 1]);
  });
  // 雲
  const shapes = [[3, 6, 8, 5], [2, 5, 7, 4], [4, 8, 6]];
  for (let i = 0; i < 9; i++) {
    const rows = shapes[i % 3];
    const cx = X0 + 100 + i * 340 + rnd() * 120;
    const cy = -620 + (i % 4) * 90 + rnd() * 40;
    rows.forEach(function (n, r) {
      svgRect(svg, Math.round((cx - n * U / 2) / U) * U, cy + r * U, n * U, U, r === rows.length - 1 ? "#D9E3E7" : "#F6F8F7");
    });
  }
  // 遠山、近山
  function ridge(base, amp, f1, f2, color, edge) {
    for (let x = X0; x < X0 + W; x += U) {
      const h = Math.round((base + amp * (0.55 * Math.sin(x * f1) + 0.45 * Math.sin(x * f2 + 1.7))) / U) * U;
      svgRect(svg, x, -64 - h, U, h + 4, color);
      svgRect(svg, x, -64 - h, U, U, edge);
    }
  }
  ridge(150, 70, 0.0042, 0.0113, "#A3B6C2", "#BCCBD4");
  ridge(80, 40, 0.0071, 0.0173, "#8BA2B1", "#A3B6C2");
  // 土堤
  svgRect(svg, X0, -64, W, 64, "#4A6678");
  svgRect(svg, X0, -64, W, U, "#6F8EA1");
  for (let i = 0; i < 520; i++) svgRect(svg, X0 + Math.floor(rnd() * W / U) * U, -56 + Math.floor(rnd() * 7) * U, U, U, rnd() < 0.5 ? "#3A5262" : "#587486");
  // 松樹：一層比一層寬
  for (let x = X0 + 40; x < X0 + W; x += 56 + Math.floor(rnd() * 5) * 16) {
    const hgt = 4 + Math.floor(rnd() * 3);
    for (let r = 0; r < hgt; r++) svgRect(svg, x - r * U / 2 - U / 2 + 4, -64 - (hgt - r) * U - 8, U + r * U, U, r % 2 ? "#2E4655" : "#3A5262");
    svgRect(svg, x, -64 - 8, U, U, "#17303F");
  }
  // 靶場小屋（右）與旗桿（左）
  const bx = 600, by = -64;
  svgRect(svg, bx, by - 72, 200, 72, "#D5DFE3");
  svgRect(svg, bx, by - 72, 200, U, "#B8C8D1");
  svgRect(svg, bx - 16, by - 96, 232, 24, "#4A6678");
  svgRect(svg, bx - 8, by - 104, 216, U, "#6F8EA1");
  svgRect(svg, bx + 24, by - 48, 40, 48, "#17303F");
  svgRect(svg, bx + 96, by - 56, 80, 32, "#17303F");
  svgRect(svg, bx + 100, by - 52, 72, 24, "#9FB4C1");
  svgRect(svg, bx + 134, by - 52, 4, 24, "#17303F");
  svgRect(svg, -840, -64 - 200, 8, 200, "#17303F");
  svgRect(svg, -832, -64 - 200, 56, 32, "#D9C45A");
  svgRect(svg, -832, -64 - 176, 40, 8, "#A8942F");
  svgRect(svg, -776 - 8, -64 - 192, 8, 8, "#D5DFE3");
  return svg;
}

// 像素靶紙：25×25 方格，用到靶心距離決定顏色；右下角那一側用淡一點的灰藍，看起來有立體感
function buildTargetSvg(gold) {
  const N = 25, c = (N - 1) / 2;
  const svg = newSvg("range-paper-svg", "0 0 " + N + " " + N);
  for (let y = 0; y < N; y++) {
    let runStart = 0, runColor = null;
    for (let x = 0; x <= N; x++) {
      let color = null;
      if (x < N) {
        const d = Math.hypot(x - c, y - c) / (N / 2);
        if (d <= 1) {
          if (d > 0.94 || (d >= 0.2 && d < 0.3) || (d >= 0.5 && d < 0.6) || (d >= 0.8 && d < 0.88)) color = "#17303F";
          else if (d < 0.2) color = "#D9C45A";
          else color = gold ? ((x - c) + (y - c) > 4 ? "#A8942F" : "#F0DE86") : ((x - c) + (y - c) > 4 ? "#CBD7DE" : "#EDF0EE");
        }
      }
      if (color !== runColor) {
        if (runColor) svgRect(svg, runStart, y, x - runStart, 1, runColor);
        runStart = x; runColor = color;
      }
    }
  }
  return svg;
}

// 靶場的透視：從地平線的消失點往下散開的車道線，加上 10／25／50 公尺的橫線，讓視角像站在長長的靶場一端
function buildLane() {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "range-lane");
  svg.setAttribute("viewBox", "-1400 0 2800 1300");
  svg.setAttribute("aria-hidden", "true");
  function line(x1, y1, x2, y2, cls) {
    const l = document.createElementNS(SVG_NS, "line");
    l.setAttribute("x1", x1); l.setAttribute("y1", y1); l.setAttribute("x2", x2); l.setAttribute("y2", y2);
    l.setAttribute("class", cls);
    svg.appendChild(l);
  }
  // 地面：越近的色階越寬、方格越大；交界用棋盤格抖色；再撒一些深色小方塊當草地與碎石
  const bands = [[40, 70, 8, "#C3CFD6"], [70, 110, 8, "#BAC8D0"], [110, 170, 10, "#B1C0CA"], [170, 260, 12, "#A8B9C4"], [260, 400, 16, "#9FB1BD"], [400, 600, 20, "#96AAB7"], [600, 900, 28, "#8DA2B0"], [900, 1300, 36, "#8499A8"]];
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("shape-rendering", "crispEdges");
  bands.forEach(function (b, i) {
    svgRect(g, -1400, b[0], 2800, b[1] - b[0], b[3]);
    if (i > 0) for (let x = -1400, k = 0; x < 1400; x += b[2], k++) if (k % 2 === 0) svgRect(g, x, b[0], b[2], Math.min(b[2], b[1] - b[0]), bands[i - 1][3]);
  });
  const rnd = seeded(21);
  for (let i = 0; i < 420; i++) {
    const t = Math.pow(rnd(), 1.6);
    const y = 50 + t * 1240;
    const sz = Math.max(4, Math.round(y / 38 / 2) * 2);
    svgRect(g, Math.round((-1400 + rnd() * 2800) / sz) * sz, Math.round(y / sz) * sz, sz, Math.max(2, sz / 2), rnd() < 0.7 ? "rgba(23,48,63,0.16)" : "rgba(237,240,238,0.35)");
  }
  svg.appendChild(g);
  for (let i = -9; i <= 9; i++) line(0, 40, i * 330, 1300, i % 3 === 0 ? "lane-main" : "lane-thin");
  rangeTargets.forEach(function (t) { const y = t.y + t.size / 2 + t.stand; line(-1400, y, 1400, y, "lane-dist"); });
  return svg;
}

function renderRange(mode, startGun) {
  stopRange();
  const DEF = mode === "defense";
  const box = document.getElementById(DEF ? "defense-app" : "range-app");
  box.replaceChildren();

  let weaponId = "ar", gunId = defaultGun.ar;
  if (!DEF && startGun && findGun(startGun) && gunStats[startGun]) { weaponId = findGun(startGun).type; gunId = startGun; }   // 從槍的詳細頁「去試射」進來
  let w = weaponFor(gunId);
  let soundOn = readFlag("arsenal-range-sound", false);
  let vibrateOn = readFlag("arsenal-range-vibrate", true);
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const canVibrate = !!(navigator.vibrate && coarse);

  // ===== 控制列：槍種、音效與震動、換靶紙 =====
  const controls = el("div", "range-controls");
  const weaponRow = el("div", "range-weapons");
  const weaponBtns = [];
  gunTypes.forEach(function (t) {
    const b = el("button", "range-weapon");
    b.type = "button";
    const icon = el("span", "icon");
    icon.appendChild(pixelIcon(t.id));
    b.appendChild(icon);
    b.appendChild(el("span", "", rangeWeapons[t.id].name));
    b.addEventListener("click", function () { setWeapon(t.id); });
    weaponRow.appendChild(b);
    weaponBtns.push({ id: t.id, b: b });
  });
  const extra = el("div", "range-extra");
  function toggle(label, getOn, flip) {
    const b = el("button", "map-chip");
    b.type = "button";
    function paint() { b.textContent = label + (getOn() ? "：開" : "：關"); b.setAttribute("aria-pressed", getOn() ? "true" : "false"); }
    b.addEventListener("click", function () { flip(); paint(); });
    paint();
    extra.appendChild(b);
  }
  toggle("音效", function () { return soundOn; }, function () { soundOn = !soundOn; writeFlag("arsenal-range-sound", soundOn); });
  if (canVibrate) toggle("震動", function () { return vibrateOn; }, function () { vibrateOn = !vibrateOn; writeFlag("arsenal-range-vibrate", vibrateOn); });
  const clearBtn = el("button", "map-chip", "換靶紙");
  clearBtn.type = "button";
  clearBtn.addEventListener("click", function () { resetTargets(); });
  if (!DEF) extra.appendChild(clearBtn);
  const chalBtn = el("button", "map-chip range-chal-btn", "開始挑戰（60 秒）");
  chalBtn.type = "button";
  chalBtn.addEventListener("click", function () { if (chal && (chal.state === "run" || chal.state === "count" || chal.state === "ready")) exitChallenge(); else startChallenge(); });
  if (!DEF) extra.appendChild(chalBtn);
  const modelSel = el("select", "range-model");
  modelSel.setAttribute("aria-label", "選擇槍款");
  modelSel.addEventListener("change", function () { setWeapon(weaponId, modelSel.value); });
  const modelRow = el("div", "range-models");
  modelRow.appendChild(el("span", "", "槍款"));
  modelRow.appendChild(modelSel);
  controls.appendChild(weaponRow);
  controls.appendChild(modelRow);
  controls.appendChild(extra);
  box.appendChild(controls);

  // ===== 場地：持槍者的視角。world 是整座靶場，準心固定在畫面正中央，轉動視角時 world 反向移動 =====
  const field = el("div", "range-field");
  if (DEF) field.classList.add("is-def");
  const world = el("div", "range-world");
  world.appendChild(buildScenery());
  world.appendChild(el("div", "range-ground"));
  world.appendChild(buildLane());
  const papers = (DEF ? [] : rangeTargets).map(function (t) {
    const p = el("div", "range-paper");
    p.style.left = (t.x - t.size / 2) + "px";
    p.style.top = (t.y - t.size / 2) + "px";
    p.style.width = t.size + "px";
    p.style.height = t.size + "px";
    p.style.setProperty("--stand", t.stand + "px");
    p.setAttribute("data-label", t.m + " M");
    p.appendChild(buildTargetSvg());
    world.appendChild(p);
    return p;
  });
  const scope = el("div", "range-scope");
  scope.hidden = true;
  const ring = el("div", "range-aim");
  const cross = el("div", "range-cross");
  const crossSvg = drawPixels(logoPixels, 12, 12);
  cross.appendChild(crossSvg);
  const flash = el("div", "range-flash");
  const gunWrap = el("div", "range-gun");
  const gunKick = el("div", "range-gun-kick");
  const gunPose = el("div", "range-gun-pose");
  gunPose.appendChild(gunKick);
  gunWrap.appendChild(gunPose);
  // 地面上的距離標線：每張靶紙的腳下一條線與「10 M」字樣，像射擊遊戲的靶場
  (DEF ? [] : rangeTargets).forEach(function (t) {
    const m = el("div", "range-mark");
    m.style.left = (t.x - 70) + "px";
    m.style.top = (t.y + t.size / 2 + t.stand) + "px";
    m.appendChild(el("span", "", t.m + " M"));
    world.appendChild(m);
  });
  // 右下角的彈藥顯示（HUD）：槍名、射擊方式、大字彈數
  const hud = el("div", "range-hud");
  const hudName = el("span", "range-hud-name");
  const hudAmmo = el("b", "range-hud-ammo");
  hud.appendChild(hudName);
  hud.appendChild(hudAmmo);
  // 滑鼠被鎖住時，畫面上方提醒怎麼放開
  const escChip = el("div", "range-esc", "按 Esc 放開滑鼠（也可以按 Tab）");
  escChip.hidden = true;
  // 開始／暫停面板：只有中間的卡片會擋住畫面，滑鼠游標一直看得到
  const lockMsg = el("div", "range-lockmsg");
  const lockCard = el("div", "range-lockcard");
  const lockTitle = el("h2", "", "準備好了嗎？");
  const lockText = el("p", "", "左鍵開火　右鍵開鏡　R 裝填　滾輪換槍　Esc 放開滑鼠");
  const lockBtn = el("button", "btn", "開始瞄準");
  lockBtn.type = "button";
  const lockExit = el("a", "back-link", "回到遊戲");
  lockExit.href = "#/games";
  lockCard.appendChild(lockTitle);
  lockCard.appendChild(lockText);
  lockCard.appendChild(lockBtn);
  lockCard.appendChild(lockExit);
  lockMsg.appendChild(lockCard);
  // 挑戰模式：左上角的分數、倒數數字、命中標記、結算畫面
  const chalHud = el("div", "range-chal");
  const chalScore = el("b", "range-chal-score", "0");
  const chalTime = el("span", "range-chal-time", "1:00");
  const chalCombo = el("span", "range-chal-combo", "");
  chalHud.appendChild(el("span", "range-chal-label", "SCORE"));
  chalHud.appendChild(chalScore);
  chalHud.appendChild(chalTime);
  chalHud.appendChild(chalCombo);
  chalHud.hidden = true;
  const countEl = el("div", "range-count");
  countEl.hidden = true;
  const hitmark = el("div", "range-hitmark");
  const resultBox = el("div", "range-result");
  resultBox.hidden = true;
  [world, scope, ring, cross, flash, gunWrap, hitmark, hud, chalHud, countEl, escChip, lockMsg, resultBox].forEach(function (n) { field.appendChild(n); });

  // 觸控裝置：拖曳畫面轉動視角，右下角有開火與裝填按鈕
  let fireBtn = null, reloadBtn = null, adsBtn = null, fieldFullOff = null;
  if (coarse) {
    lockMsg.hidden = true;
    const pad = el("div", "range-touch");
    fireBtn = el("button", "range-touch-btn fire", "開火");
    reloadBtn = el("button", "range-touch-btn", "裝填");
    adsBtn = el("button", "range-touch-btn", "開鏡");
    adsBtn.type = "button";
    fireBtn.type = "button";
    reloadBtn.type = "button";
    const swapBtn = el("button", "range-touch-btn", "換槍");
    swapBtn.type = "button";
    swapBtn.addEventListener("click", function (e) { e.stopPropagation(); cycleGun(1, false); });
    swapBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    pad.appendChild(swapBtn);
    pad.appendChild(adsBtn);
    pad.appendChild(reloadBtn);
    pad.appendChild(fireBtn);
    field.appendChild(pad);
    field.classList.add("has-touch");
    // 手機：全螢幕按鈕。畫面很小，全螢幕玩比較好操作
    const fullBtn = el("button", "range-full-btn", "全螢幕");
    fullBtn.type = "button";
    function setFull(on) {
      field.classList.toggle("is-full", on);
      document.body.classList.toggle("no-scroll", on);
      fullBtn.textContent = on ? "退出全螢幕" : "全螢幕";
      try {
        if (on && field.requestFullscreen) field.requestFullscreen().catch(function () {});
        if (!on && document.fullscreenElement) document.exitFullscreen().catch(function () {});
      } catch (e) {}
    }
    fullBtn.addEventListener("click", function (e) { e.stopPropagation(); setFull(!field.classList.contains("is-full")); });
    fullBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    document.addEventListener("fullscreenchange", function () { if (!document.fullscreenElement && field.classList.contains("is-full")) setFull(false); });
    field.appendChild(fullBtn);
    fieldFullOff = function () { if (field.classList.contains("is-full")) setFull(false); };
  }
  field.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  // 防線：滾輪換槍。滾動＝切換槍種（記得每個槍種上次用的槍款），按住 Shift 滾動＝同槍種換槍款
  let lastWheel = 0;
  field.addEventListener("wheel", function (e) {
    if (!(locked || fallbackMode || coarse)) return;
    e.preventDefault();
    const dy = e.deltaY || e.deltaX;
    const now = performance.now();
    if (!dy || now - lastWheel < 140) return;
    lastWheel = now;
    cycleGun(dy > 0 ? 1 : -1, e.shiftKey);
  }, { passive: false });
  box.appendChild(field);
  box.appendChild(el("p", "range-hint", DEF ? "滾輪切換槍種，Shift＋滾輪切換槍款。" : "開槍時會模擬後座力，視角會往上跳，要用滑鼠壓回來。中間的虛線圓是子彈會落的範圍。右鍵開鏡：視野變窄、散布變小。滾輪切換槍種，Shift＋滾輪切換槍款。"));

  // ===== 資料面板 =====
  const panels = el("div", "range-panels");
  const statPanel = el("section", "range-panel");
  const specPanel = el("section", "range-panel");
  panels.appendChild(statPanel);
  panels.appendChild(specPanel);
  if (DEF) statPanel.hidden = true;
  box.appendChild(panels);

  const ui = {};
  function row(parent, label, node) {
    const r = el("div", "range-row");
    r.appendChild(el("span", "", label));
    r.appendChild(node);
    parent.appendChild(r);
    return node;
  }
  statPanel.appendChild(el("h2", "", "彈著統計"));
  ui.ammo = row(statPanel, "彈藥", el("b", "num", ""));
  ui.shots = row(statPanel, "射擊", el("b", "num", "0"));
  ui.last = row(statPanel, "最後一發", el("b", "num", "—"));
  ui.table = el("div", "range-table");
  statPanel.appendChild(ui.table);
  statPanel.appendChild(el("p", "range-note", "彈著群是模擬值，以直徑 40 公分的靶紙計算。"));
  specPanel.appendChild(el("h2", "", "試射設定（模擬值）"));
  const specBody = el("div", "range-spec-body");
  specPanel.appendChild(specBody);

  function meter(level) {
    const m = el("span", "meter");
    m.setAttribute("role", "img");
    m.setAttribute("aria-label", level + " / 5");
    for (let i = 1; i <= 5; i++) m.appendChild(el("span", i <= level ? "on" : ""));
    return m;
  }
  function paintSpec() {
    specBody.replaceChildren();
    const g = w.gun;
    row(specBody, "槍款", el("b", "", g.name));
    row(specBody, "國家・年份", el("b", "", g.country + "・" + g.year));
    row(specBody, "口徑", el("b", "", g.caliber));
    row(specBody, "作動方式", el("b", "", g.action));
    row(specBody, "射擊方式", el("b", "", modeLabel[w.mode]));
    row(specBody, w.mode === "auto" ? "理論射速" : "每發間隔", el("b", "", w.mode === "auto" ? "約 " + w.rpm + " 發／分" : (w.rate / 1000).toFixed(2) + " 秒"));
    row(specBody, "彈匣", el("b", "", w.mag + " 發，裝填約 " + (w.reload / 1000).toFixed(1) + " 秒"));
    row(specBody, "後座力", meter(Math.max(1, Math.min(5, Math.round(Math.sqrt(w.kick) / 1.5)))));
    row(specBody, "散布", meter(Math.max(1, Math.min(5, Math.round(w.spread / 8)))));
    const sc = w.scope;
    row(specBody, "瞄準", el("b", "", sc.name + "（按住右鍵）"));
    if (!DEF) {
      const bestMap = readBest();
      row(specBody, "挑戰最高分", el("b", "", bestMap[g.id] ? bestMap[g.id].score + "（" + bestMap[g.id].grade + "）" : "尚無紀錄"));
    }
    specBody.appendChild(el("p", "", w.desc));
    const link = el("a", "back-link", "看這把槍的完整檔案");
    link.href = "#/gun/" + g.id;
    specBody.appendChild(link);
  }
  function paintControls() {
    weaponBtns.forEach(function (x) { x.b.setAttribute("aria-pressed", x.id === weaponId ? "true" : "false"); });
  }

  // ===== 狀態 =====
  let ammo = w.mag, reloading = false, reloadTimer = null, lastShot = 0, flashTimer = null;
  let cam = { x: 0, y: DEF ? 244 : 30 };                 // 視角（對準 world 的哪一點）
  let rx = 0, ry = 0;                        // 後座力造成的暫時偏移，會自己慢慢回復
  let shakeX = 0, shakeY = 0, gx = 0, gy = 0, lastFrame = 0, prevX = 0, prevY = 0;
  let zoom = 1, ads = false, locked = false, fallbackMode = false;
  let shots = 0, holes = [], gun = null, kickAnim = null, reloadAnims = [];
  let chal = null, pullHit = false, reloadAt = 0;
  const tstats = rangeTargets.map(function () { return { hits: 0, ringSum: 0, pts: [] }; });

  // 防線模式：借用這裡的引擎（視角、後座力、開鏡、彈藥），規則寫在 js/defense.js
  let def = null;
  const ammoMem = {}, lastGun = {};
  let swapUntil = 0;                          // 防線：換槍後要等舉槍完成，才能再換、才能開火
  const drawMs = { hg: 180, smg: 220, ar: 260, sg: 300, rf: 360, mg: 420 };
  if (DEF) {
    def = createDefense({
      field: field, world: world, hitmark: hitmark,
      getW: function () { return w; },
      getGunId: function () { return gunId; },
      getCam: function () { return cam; },
      getRx: function () { return rx; },
      getZoom: function () { return zoom; },
      soundOn: function () { return soundOn; },
      markPull: function () { pullHit = true; },
      shake: function (px) { if (reduceMotion()) return; shakeX = (Math.random() - 0.5) * 2 * px; shakeY = (Math.random() - 0.5) * 2 * px; },
      canPlay: function () { return locked || fallbackMode || coarse; },
      requestLock: function () { requestLock(); },
      unlock: function () { unlock(); },
      showMsg: function () { showMsg(); },
      releaseFire: function () { release(); },
      setAds: function (on) { setAds(on); },
      addAmmo: function (n) { ammo = Math.min(w.mag, ammo + n); paintAmmo(); },
      refill: function () { cancelReload(); Object.keys(ammoMem).forEach(function (k) { delete ammoMem[k]; }); ammo = w.mag; paintAmmo(); },
      applyMods: function () { w = def.mod(weaponFor(gunId)); cancelReload(); ammo = Math.min(ammo, w.mag); paintSpec(); paintAmmo(); }
    });
    panels.insertBefore(def.panel, specPanel);     // 「試射設定」旁邊的空位，放目前的配件
    box.appendChild(def.shop);
  }

  function clampCam() {
    cam.x = Math.max(-520, Math.min(520, cam.x));
    cam.y = DEF ? Math.max(-30, Math.min(480, cam.y)) : Math.max(-120, Math.min(200, cam.y));
  }

  function paintAmmo() {
    ui.ammo.textContent = (reloading && weaponId !== "sg") ? "裝填中" : ammo + " / " + w.mag;
    hudName.textContent = w.name + "・" + modeLabel[w.mode];
    hudAmmo.textContent = (reloading && weaponId !== "sg") ? "RELOAD" : String(ammo);
    hudAmmo.setAttribute("data-mag", "/ " + w.mag);
    hud.classList.toggle("is-low", ammo <= Math.ceil(w.mag * 0.25));
    hud.classList.toggle("is-reload", reloading && weaponId !== "sg");
  }
  function paintStats() {
    ui.shots.textContent = String(shots);
    ui.table.replaceChildren();
    ["距離", "命中", "平均環數", "彈著群"].forEach(function (t) { ui.table.appendChild(el("span", "head", t)); });
    rangeTargets.forEach(function (t, i) {
      const s = tstats[i];
      let group = "—";
      if (s.pts.length >= 3) {
        let mx = 0, my = 0;
        s.pts.forEach(function (p) { mx += p.x; my += p.y; });
        mx /= s.pts.length; my /= s.pts.length;
        let d = 0;
        s.pts.forEach(function (p) { d += Math.hypot(p.x - mx, p.y - my); });
        group = (d / s.pts.length * 2 * 40 / t.size).toFixed(1) + " 公分";
      }
      [t.m + " 公尺", String(s.hits), s.hits ? (s.ringSum / s.hits).toFixed(1) : "—", group].forEach(function (text) {
        ui.table.appendChild(el("span", "", text));
      });
    });
  }

  // ===================== 限時挑戰 =====================
  // 60 秒：靶紙會從地面冒出來，越遠的靶越小、分數倍率越高；打中才會得分，連續命中有連擊加成。
  // 每把槍的最高分都會記錄下來，結算畫面有各槍排行，可以比較哪一把最適合這種玩法。
  const CHAL_MS = 60000;
  const rows = [
    { i: 0, mult: 1, size: 120, life: 2600, weight: 0.35, move: 0 },
    { i: 1, mult: 2, size: 76, life: 2100, weight: 0.4, move: 0.35 },
    { i: 2, mult: 3, size: 46, life: 1800, weight: 0.25, move: 0.5 }
  ];
  function paintChalBtn() {
    chalBtn.textContent = chal && (chal.state === "run" || chal.state === "count" || chal.state === "ready") ? "結束挑戰" : "開始挑戰（60 秒）";
  }
  function setPapers(show) { papers.forEach(function (p) { p.style.display = show ? "" : "none"; }); }
  function clearPops() { if (chal) chal.targets.forEach(function (t) { t.node.remove(); }); if (chal) chal.targets = []; }
  function startChallenge() {
    resetTargets();
    resultBox.hidden = true;
    setAds(false);
    setPapers(false);
    chal = { state: "ready", t0: 0, nextSpawn: 0, nextGold: 0, targets: [], score: 0, combo: 0, maxCombo: 0, hits: 0, bulls: 0, pulls: 0, pullHits: 0, missed: 0, paused: 0, goldHits: 0 };
    chalHud.hidden = false;
    chalScore.textContent = "0"; chalTime.textContent = "1:00"; chalCombo.textContent = "";
    paintChalBtn();
    if (ammo < w.mag) { cancelReload(); ammo = w.mag; paintAmmo(); }
    if (locked || fallbackMode || coarse) { beginCount(); }
    else {
      lockTitle.textContent = "挑戰準備好了";
      lockText.textContent = "集中精神打靶吧。靶紙越遠越小，分數倍率越高。";
      lockBtn.textContent = "開始挑戰";
      showMsg();
    }
  }
  function beginCount() {
    chal.state = "count";
    chal.countAt = performance.now();
    countEl.hidden = false;
    paintChalBtn();
  }
  function exitChallenge() {
    if (chal) clearPops();
    chal = null;
    chalHud.hidden = true; countEl.hidden = true; resultBox.hidden = true;
    setPapers(true);
    paintChalBtn();
    resetTargets();
    paintSpec();
    showMsg();
  }
  function spawnTarget(now, gold) {
    const progress = Math.min(1, (now - chal.t0) / CHAL_MS);
    let row;
    if (gold) row = rows[1 + Math.floor(Math.random() * 2)];
    else { let r = Math.random(), acc = 0; row = rows[0]; for (let k = 0; k < rows.length; k++) { acc += rows[k].weight; if (r <= acc) { row = rows[k]; break; } } }
    const base = rangeTargets[row.i];
    const size = gold ? Math.round(row.size * 0.8) : row.size;
    const stand = Math.round(base.stand * 0.8);
    const y = base.y + base.size / 2 + base.stand - stand - size / 2;
    let x = 0, ok = false;
    for (let tries = 0; tries < 12 && !ok; tries++) {
      x = Math.round((Math.random() * 2 - 1) * 560);
      ok = chal.targets.every(function (t) { return t.row !== row.i || Math.abs(t.x - x) > size; });
    }
    const node = el("div", "range-paper range-pop" + (gold ? " gold" : ""));
    node.style.width = size + "px"; node.style.height = size + "px";
    node.style.setProperty("--stand", stand + "px");
    node.style.left = (x - size / 2) + "px"; node.style.top = (y - size / 2) + "px";
    node.appendChild(buildTargetSvg(gold));
    world.appendChild(node);
    const t = { node: node, row: row.i, mult: gold ? 5 : row.mult, gold: gold, size: size, x: x, y: y, born: now,
      life: Math.round(row.life * (gold ? 0.7 : 1 - 0.35 * progress)), vx: 0 };
    if (!gold && Math.random() < row.move * (0.4 + progress)) t.vx = (Math.random() < 0.5 ? -1 : 1) * (50 + Math.random() * 90);
    chal.targets.push(t);
  }
  function floatText(x, y, text, gold) {
    const f = el("span", "range-float" + (gold ? " gold" : ""), text);
    f.style.left = x + "px"; f.style.top = y + "px";
    world.appendChild(f);
    setTimeout(function () { f.remove(); }, 800);
  }
  function challengeHit(x, y) {
    for (let i = chal.targets.length - 1; i >= 0; i--) {
      const t = chal.targets[i];
      const r = Math.hypot(x - t.x, y - t.y) / (t.size / 2);
      if (r > 1) continue;
      const ring = Math.max(1, 10 - Math.floor(r * 10));
      const pts = Math.round(ring * 10 * t.mult * (1 + Math.min(chal.combo, 10) * 0.1));
      chal.score += pts; chal.combo++; chal.maxCombo = Math.max(chal.maxCombo, chal.combo);
      chal.hits++; if (ring === 10) chal.bulls++; if (t.gold) chal.goldHits++;
      pullHit = true;
      floatText(t.x, t.y - t.size / 2 - 10, (ring === 10 ? "靶心 " : "") + "+" + pts, t.gold || ring === 10);
      t.node.classList.add("is-hit");
      (function (n) { setTimeout(function () { n.remove(); }, 160); })(t.node);
      chal.targets.splice(i, 1);
      hitmark.classList.remove("on", "bull"); void hitmark.offsetWidth;
      hitmark.classList.add("on"); if (ring === 10) hitmark.classList.add("bull");
      if (soundOn) playTick(ring === 10);
      return ring;
    }
    addHole(x, y);
    return 0;
  }
  function tickChallenge(now, dt) {
    if (chal.state === "count") {
      const left = 3000 - (now - chal.countAt);
      if (left <= 0) {
        chal.state = "run"; chal.t0 = now; chal.nextSpawn = now + 300; chal.nextGold = now + 11000;
        countEl.textContent = "GO!"; countEl.hidden = false;
        setTimeout(function () { if (chal && chal.state === "run") countEl.hidden = true; }, 700);
      } else countEl.textContent = String(Math.ceil(left / 1000));
      return;
    }
    if (chal.state !== "run" || chal.paused) return;
    const elapsed = now - chal.t0;
    if (elapsed >= CHAL_MS) { endChallenge(); return; }
    const progress = elapsed / CHAL_MS;
    if (now >= chal.nextGold) { spawnTarget(now, true); chal.nextGold = now + 11000 + Math.random() * 3000; }
    if (now >= chal.nextSpawn && chal.targets.length < 4) { spawnTarget(now, false); chal.nextSpawn = now + 900 - 380 * progress + Math.random() * 250; }
    for (let i = chal.targets.length - 1; i >= 0; i--) {
      const t = chal.targets[i];
      if (t.vx) {
        t.x += t.vx * dt / 1000;
        if (t.x > 700 || t.x < -700) { t.vx = -t.vx; t.x = Math.max(-700, Math.min(700, t.x)); }
        t.node.style.left = (t.x - t.size / 2) + "px";
      }
      if (now - t.born > t.life) {
        t.node.classList.add("is-gone");
        (function (n) { setTimeout(function () { n.remove(); }, 200); })(t.node);
        chal.targets.splice(i, 1);
        chal.missed++; chal.combo = 0;
      }
    }
    const sec = Math.max(0, Math.ceil((CHAL_MS - elapsed) / 1000));
    chalTime.textContent = Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
    chalScore.textContent = String(chal.score);
    chalCombo.textContent = chal.combo >= 2 ? "連擊 ×" + (1 + Math.min(chal.combo, 10) * 0.1).toFixed(1) : "";
  }
  function endChallenge() {
    chal.state = "done";
    clearPops();
    release();
    setAds(false);
    const score = chal.score, grade = gradeFor(score);
    const best = readBest();
    const prev = best[gunId] ? best[gunId].score : 0;
    const record = score > prev;
    if (record) { best[gunId] = { score: score, grade: grade }; writeBest(best); }
    const acc = chal.pulls ? Math.round(chal.pullHits / chal.pulls * 100) : 0;
    resultBox.replaceChildren();
    const card = el("div", "range-lockcard range-resultcard");
    card.appendChild(el("h2", "", "挑戰結束・" + w.name));
    const big = el("div", "range-grade");
    big.appendChild(el("b", "range-grade-letter", grade));
    big.appendChild(el("b", "range-grade-score", String(score)));
    card.appendChild(big);
    if (record) card.appendChild(el("p", "range-record", prev ? "新紀錄！上次最高 " + prev : "第一次紀錄！"));
    const lines = el("div", "range-result-lines");
    [["命中", chal.hits + " 張靶（靶心 " + chal.bulls + "）"], ["扣扳機", chal.pulls + " 次，命中率 " + acc + "%"], ["最高連擊", String(chal.maxCombo)], ["漏掉的靶", String(chal.missed)], ["金靶", chal.goldHits + " 張"]].forEach(function (r) {
      const l = el("div", "range-row"); l.appendChild(el("span", "", r[0])); l.appendChild(el("b", "", r[1])); lines.appendChild(l);
    });
    card.appendChild(lines);
    // 各槍排行：換一把槍再挑戰，就能比較哪一把最適合
    const entries = Object.keys(best).map(function (id) { const g = guns.find(function (x) { return x.id === id; }); return g ? { name: g.name, score: best[id].score, grade: best[id].grade, me: id === gunId } : null; }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 5);
    if (entries.length > 1) {
      card.appendChild(el("h3", "", "各槍最高分"));
      const list = el("ol", "range-board");
      entries.forEach(function (e) { const li = el("li", e.me ? "me" : "", e.name + "　" + e.score + "（" + e.grade + "）"); list.appendChild(li); });
      card.appendChild(list);
    }
    const btns = el("div", "range-result-btns");
    const again = el("button", "btn", "再挑戰一次"); again.type = "button";
    again.addEventListener("click", function () { startChallenge(); });
    const back = el("button", "map-chip", "回到自由練習"); back.type = "button";
    back.addEventListener("click", function () { exitChallenge(); });
    btns.appendChild(again); btns.appendChild(back);
    card.appendChild(btns);
    resultBox.appendChild(card);
    resultBox.hidden = false;
    countEl.hidden = true;
    paintChalBtn();
    unlock();
    showMsg();
    paintSpec();
  }

  function resetTargets() {
    holes.forEach(function (h) { h.remove(); });
    holes = [];
    tstats.forEach(function (s) { s.hits = 0; s.ringSum = 0; s.pts = []; });
    shots = 0; rx = 0; ry = 0;
    ui.last.textContent = "—";
    paintStats();
  }

  function mountGun() {
    gunKick.replaceChildren();
    // 槍要大：占畫面寬度一半以上，高度不超過畫面的八成，右下角會被畫面邊緣切掉一點（像射擊遊戲）
    const spec = viewmodels[weaponId];
    const pixel = Math.min(12, (field.clientWidth * 0.78) / FPS_W, (field.clientHeight * 0.92) / FPS_H);
    gun = buildFpsGun(weaponId, pixel);
    gunWrap.setAttribute("data-type", weaponId);
    gunKick.appendChild(gun.svg);
  }

  function cancelReload() {
    if (def) def.reloadEnd();
    clearTimeout(reloadTimer);
    reloadAnims.forEach(function (a) { try { a.cancel(); } catch (e) {} });
    reloadAnims = [];
    reloading = false;
  }

  // 開鏡：視角放大、散布改變、槍身隱藏；狙擊鏡會蓋上圓形鏡片與十字線，其他瞄具是較淡的鏡片
  function setAds(on) {
    const sc = w.scope;
    if (on && (!sc || reloading)) return;
    ads = on;
    zoom = on ? sc.zoom : 1;
    // 開鏡：槍隱藏，畫面換成這支瞄具看出去的樣子（狙擊鏡、光學瞄具、紅點各有自己的畫面）
    scope.hidden = !on;
    if (on) {
      scope.className = "range-scope " + sc.type;
      scope.replaceChildren(scopeCache[sc.type] || (scopeCache[sc.type] = buildScopeSvg(sc.type)));
    }
    cross.hidden = on;
    gunWrap.classList.toggle("ads", on);
    field.classList.toggle("is-ads", on);
  }

  function cycleGun(dir, withinType) {
    if (withinType) {
      const list = guns.filter(function (g) { return g.type === weaponId && gunStats[g.id]; });
      const i = list.findIndex(function (g) { return g.id === gunId; });
      setWeapon(weaponId, list[(i + dir + list.length) % list.length].id);
    } else {
      const ids = gunTypes.map(function (t) { return t.id; });
      const nt = ids[(ids.indexOf(weaponId) + dir + ids.length) % ids.length];
      setWeapon(nt, lastGun[nt]);
    }
    if (def) def.say(w.name, 700);
  }
  function fillModels() {
    modelSel.replaceChildren();
    guns.filter(function (g) { return g.type === weaponId && gunStats[g.id]; }).forEach(function (g) {
      const o = el("option", "", g.name + "（" + g.country + "，" + g.year + "）");
      o.value = g.id;
      modelSel.appendChild(o);
    });
    modelSel.value = gunId;
  }
  function setWeapon(id, gid) {
    if (chal && (chal.state === "run" || chal.state === "count")) { modelSel.value = gunId; return; }
    if (DEF && gunId && performance.now() < swapUntil) { modelSel.value = gunId; return; }
    if (DEF && gunId) ammoMem[gunId] = ammo;          // 防線：每把槍記住自己剩幾發
    cancelReload();
    weaponId = id;
    gunId = gid || defaultGun[id];
    w = weaponFor(gunId);
    if (def) w = def.mod(w);
    fillModels();
    lastGun[weaponId] = gunId;
    ammo = (DEF && ammoMem[gunId] !== undefined) ? Math.min(ammoMem[gunId], w.mag) : w.mag;
    if (DEF) { const dm = drawMs[weaponId] || 600; swapUntil = performance.now() + dm; lastShot = performance.now() + dm; }   // 防線：舉槍要時間，越重的槍越久
    else lastShot = 0;
    setAds(false);
    mountGun();
    paintControls();
    paintSpec();
    paintAmmo();
    resetTargets();
  }

  // 一顆彈孔：留在靶場上，最多保留 400 個（座標是 world 的座標，所以會跟著靶紙移動）
  function addHole(x, y) {
    const h = el("span", "range-hole");
    h.style.left = x + "px";
    h.style.top = y + "px";
    world.appendChild(h);
    holes.push(h);
    if (holes.length > 400) holes.shift().remove();
  }

  // 一顆彈丸落在 (x, y)：留下彈孔，檢查有沒有打中任何一張靶紙，依離靶心的距離算 1 到 10 環
  function hitAt(x, y) {
    if (def) return def.active() ? def.hit(x, y) : 0;
    if (chal && chal.state === "run") return challengeHit(x, y);
    addHole(x, y);
    for (let i = 0; i < rangeTargets.length; i++) {
      const t = rangeTargets[i];
      const r = Math.hypot(x - t.x, y - t.y) / (t.size / 2);
      if (r <= 1) {
        const ring = Math.max(1, 10 - Math.floor(r * 10));
        const s = tstats[i];
        s.hits++;
        s.ringSum += ring;
        s.pts.push({ x: x, y: y });
        ui.last.textContent = t.m + " 公尺 " + ring + " 環";
        return ring;
      }
    }
    return 0;
  }

  // 彈殼：從槍的退殼口飛出，拋物線落下、彈跳、淡出。步槍與霰彈槍要等拉栓或拉護木時才拋
  function ejectShell(big) {
    if (reduceMotion() || !gun || ads) return;
    const pr = gun.port.getBoundingClientRect();
    const fr = field.getBoundingClientRect();
    const x0 = pr.left - fr.left;
    const y0 = pr.top - fr.top;
    const s = el("span", big ? "range-shell big" : "range-shell");
    s.style.left = x0 + "px";
    s.style.top = y0 + "px";
    field.appendChild(s);
    const dx = 50 + Math.random() * 80;
    const up = 50 + Math.random() * 50;
    const fall = Math.max(40, field.clientHeight - y0 - 14 - Math.random() * 18);
    const spin = (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 360);
    const fly = anim(s, [
      key({ transform: "translate(0px,0px) rotate(0deg)", easing: "ease-out" }, 0),
      key({ transform: "translate(" + dx * 0.55 + "px," + -up + "px) rotate(" + spin * 0.5 + "deg)", easing: "ease-in" }, 0.38),
      key({ transform: "translate(" + dx + "px," + fall + "px) rotate(" + spin + "deg)" }, 1)
    ], 620);
    const end = "translate(" + dx + "px," + fall + "px) rotate(" + spin + "deg)";
    s.style.transform = end;
    if (fly) {
      fly.onfinish = function () {
        anim(s, [{ transform: end }, { transform: "translate(" + (dx + 14) + "px," + (fall - 12) + "px) rotate(" + (spin + 90) + "deg)" }, { transform: "translate(" + (dx + 24) + "px," + fall + "px) rotate(" + (spin + 160) + "deg)" }], 240);
      };
    }
    setTimeout(function () { s.remove(); }, 1500);
  }

  // 開槍的視覺回饋：槍身後座、火光、零件動作與彈殼
  function fireAnim() {
    if (kickAnim) { try { kickAnim.cancel(); } catch (e) {} }
    kickAnim = anim(gunKick, [
      { transform: "translate(0px,0px) rotate(0deg)" },
      { transform: "translate(" + w.kx * 0.6 + "px," + w.ky * 0.6 + "px) rotate(" + w.kr * 0.5 + "deg)" },
      { transform: "translate(0px,0px) rotate(0deg)" }
    ], Math.min(170, w.rate * 0.9 + 40));
    if (reduceMotion() || !gun) return;
    gun.flash.style.opacity = "1";
    clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { gun.flash.style.opacity = "0"; }, 45);
    const p = gun.parts;
    if (weaponId === "hg") {
      anim(p.slide, [move(0, 0), key(move(4, 2), 0.35), move(0, 0)], 110);
    } else if (weaponId === "smg" || weaponId === "ar" || weaponId === "mg" || (weaponId === "rf" && w.mode !== "bolt")) {
      anim(p.bolt, [move(0, 0), key(move(5, 0), 0.4), move(0, 0)], Math.min(80, w.rate * 0.8));
    } else if (weaponId === "rf") {
      // 栓動：開火後手動拉栓，抬起、後拉（退殼）、推回、壓下
      const d = Math.round(w.rate * 0.85);
      anim(p.bolt, [key(move(0, 0), 0), key(move(0, -4), 0.15), key(move(8, -3), 0.5), key(move(8, -3), 0.55), key(move(0, -4), 0.85), key(move(0, 0), 1)], d);
      setTimeout(function () { ejectShell(false); }, d * 0.5);
    } else if (weaponId === "sg" && w.mode !== "pump") {
      // 半自動霰彈槍：不用拉護木，槍機自己動
    } else if (weaponId === "sg") {
      // 泵動：護木往後拉（退殼）再推回
      const d = Math.round(w.rate * 0.85);
      anim(p.pump, [key(move(0, 0), 0), key(move(8, 5), 0.4), key(move(8, 5), 0.5), key(move(0, 0), 1)], d);
      setTimeout(function () { ejectShell(true); }, d * 0.45);
    }
    if (w.eject === "shot") ejectShell(weaponId === "sg");
  }

  // 裝填動畫：每種槍的動作都不一樣
  function reloadAnim(ms) {
    if (reduceMotion() || !gun) return;
    const p = gun.parts;
    const tilt = "translate(40px,50px) rotate(9deg)";
    function add(a) { if (a) reloadAnims.push(a); }
    add(anim(gunKick, [key({ transform: "none" }, 0), key({ transform: tilt }, 0.12), key({ transform: tilt }, 0.88), key({ transform: "none" }, 1)], ms));
    if (weaponId === "hg" || weaponId === "smg" || weaponId === "ar") {
      add(anim(p.mag, [key(move(0, 0), 0), key(move(0, 0), 0.28), key(move(0, 56), 0.42), key(move(0, 56), 0.52), key(move(0, 0), 0.66), key(move(0, 0), 1)], ms));
      const racker = weaponId === "hg" ? p.slide : p.bolt;
      add(anim(racker, [key(move(0, 0), 0), key(move(0, 0), 0.78), key(move(7, 0), 0.86), key(move(0, 0), 0.94), key(move(0, 0), 1)], ms));
    } else if (weaponId === "mg") {
      add(anim(p.cover, [key(move(0, 0), 0), key(move(0, -10), 0.12), key(move(0, -10), 0.72), key(move(0, 0), 0.82), key(move(0, 0), 1)], ms));
      const swap = [key(move(0, 0), 0), key(move(0, 0), 0.15), key(move(0, 60), 0.3), key(move(0, 60), 0.42), key(move(0, 0), 0.58), key(move(0, 0), 1)];
      add(anim(p.box, swap, ms));
      add(anim(p.belt, swap, ms));
      add(anim(p.bolt, [key(move(0, 0), 0), key(move(0, 0), 0.86), key(move(9, 0), 0.92), key(move(0, 0), 0.98), key(move(0, 0), 1)], ms));
    } else if (weaponId === "rf") {
      add(anim(p.bolt, [key(move(0, 0), 0), key(move(0, -4), 0.1), key(move(8, -3), 0.22), key(move(8, -3), 0.62), key(move(0, -4), 0.8), key(move(0, 0), 0.9), key(move(0, 0), 1)], ms));
      add(anim(p.clip, [key({ opacity: 0, transform: "translate(0px,0px)" }, 0), key({ opacity: 0, transform: "translate(0px,0px)" }, 0.22), key({ opacity: 1, transform: "translate(0px,0px)" }, 0.26),
        key({ opacity: 1, transform: "translate(0px,0px)" }, 0.34), key({ opacity: 1, transform: "translate(0px,17px)" }, 0.5), key({ opacity: 0, transform: "translate(0px,17px)" }, 0.52), key({ opacity: 0, transform: "translate(0px,17px)" }, 1)], ms));
    }
  }

  // 霰彈槍：一顆一顆塞彈，每塞一顆就多一發，塞到一半也可以直接開火
  function loadShell() {
    const each = Math.round(w.reload / w.mag);
    const a = anim(gun.parts.shell, [key({ opacity: 0, transform: "translate(0px,16px)" }, 0), key({ opacity: 1, transform: "translate(0px,10px)" }, 0.15),
      key({ opacity: 1, transform: "translate(0px,0px)" }, 0.7), key({ opacity: 0, transform: "translate(0px,0px)" }, 1)], each);
    if (a) reloadAnims.push(a);
    const t = anim(gunKick, [key({ transform: "none" }, 0), key({ transform: "translate(10px,22px) rotate(5deg)" }, 0.2), key({ transform: "translate(10px,22px) rotate(5deg)" }, 0.8), key({ transform: "none" }, 1)], each);
    if (t) reloadAnims.push(t);
    reloadTimer = setTimeout(function () {
      ammo++;
      paintAmmo();
      if (ammo >= w.mag) { reloading = false; return; }
      loadShell();
    }, each);
  }

  function reload() {
    if (reloading || ammo === w.mag) return;
    setAds(false);
    reloading = true;
    if (weaponId === "sg") { paintAmmo(); loadShell(); return; }
    paintAmmo();
    reloadAnim(w.reload);
    reloadAt = performance.now();
    if (def) def.reloadStart(w.reload);
    reloadTimer = setTimeout(function () {
      ammo = w.mag;
      reloading = false;
      reloadAnims = [];
      paintAmmo();
      if (def) { def.reloadEnd(); def.onReloaded(); }
    }, w.reload);
  }

  function feedback() {
    if (soundOn) playShot(weaponId);
    if (canVibrate && vibrateOn) navigator.vibrate(w.vib);
    if (reduceMotion()) return;
    shakeX = (Math.random() - 0.5) * 2 * w.shake * 1.5;
    shakeY = (Math.random() - 0.5) * 2 * w.shake * 1.5;
    flash.classList.remove("on");
    void flash.offsetWidth;
    flash.classList.add("on");
  }

  function fire() {
    if (def && def.blockFire()) return;
    // 霰彈槍裝填到一半有子彈就可以開火，並中斷裝填
    if (reloading && weaponId === "sg" && ammo > 0) cancelReload();
    if (reloading) return;
    const now = performance.now();
    if (now - lastShot < w.rate) return;
    if (ammo <= 0) { reload(); return; }
    lastShot = now;
    ammo--;
    if (def && def.onFire()) ammo++;        // 火力流：有機率不耗彈
    paintAmmo();

    // 落點 = 視角正中央（含後座力造成的偏移）加上隨機散布；視角被頂得越高，散布越大
    const sc = w.scope;
    const bloom = w.spread * (sc ? (ads ? sc.adsMul : sc.hipMul) : 1) * (1 + Math.abs(ry) / (DEF ? 120 : 60));
    const ax = cam.x + rx - (DEF ? shakeX / zoom : 0);     // 防線：子彈落在準心「看起來」的位置（扣掉畫面震動）
    const ay = cam.y + ry - (DEF ? shakeY / zoom : 0);
    pullHit = false;
    for (let i = 0; i < w.pellets; i++) {
      const angle = Math.random() * Math.PI * 2;
      const d = Math.sqrt(Math.random()) * bloom;
      hitAt(ax + Math.cos(angle) * d, ay + Math.sin(angle) * d);
    }
    if (chal && chal.state === "run") { chal.pulls++; if (pullHit) chal.pullHits++; else chal.combo = 0; }
    shots++;
    paintStats();

    // 後座力：視角往上頂，七成會自己慢慢回來，三成要靠滑鼠往下壓回去，左右也會隨機偏一點
    const rc = DEF ? RECOIL * 0.5 : RECOIL;      // 防線的敵人比靶紙小，後座力減半
    ry = Math.max(-120, ry - w.kick * rc * 0.7);
    cam.y -= w.kick * rc * 0.3;
    rx += (Math.random() - 0.5) * w.kick * rc * 0.5;
    cam.x += (Math.random() - 0.5) * w.kick * rc * 0.15;
    clampCam();
    feedback();
    fireAnim();
    if (ammo <= 0) setTimeout(reload, 250);
  }

  // 每一幀：後座力回復、更新畫面（world 反向移動）、散布圓圈與槍的擺動
  function frame(t) {
    const dt = Math.min(50, t - (lastFrame || t));
    lastFrame = t;
    const k = dt / 16.7;
    const decay = Math.pow(0.93, k);
    rx *= decay;
    ry *= decay;
    shakeX *= Math.pow(0.8, k);
    shakeY *= Math.pow(0.8, k);
    const vx = cam.x + rx;
    const vy = cam.y + ry;
    world.style.transform = "translate(" + (-vx * zoom + shakeX) + "px," + (-vy * zoom + shakeY) + "px) scale(" + zoom + ")";
    const sc = w.scope;
    const size = Math.max(10, w.spread * (sc ? (ads ? sc.adsMul : sc.hipMul) : 1) * (1 + Math.abs(ry) / 60) * 2 * zoom);
    ring.style.width = size + "px";
    ring.style.height = size + "px";
    // 槍會稍微落後於視角：視角往右轉，槍就往左偏一點，再慢慢跟上
    gx = Math.max(-60, Math.min(60, gx - (vx - prevX) * zoom * 0.5)) * Math.pow(0.82, k);
    gy = Math.max(-60, Math.min(60, gy - (vy - prevY) * zoom * 0.5)) * Math.pow(0.82, k);
    prevX = vx; prevY = vy;
    if (chal) tickChallenge(t, dt);
    if (def) def.tick(t, dt);
    gunWrap.style.transform = "translate(" + gx + "px," + gy + "px)";
    rangeFrame = requestAnimationFrame(frame);
  }

  // ===== 操作：桌機用滑鼠鎖定（轉動視角），不支援時改成滑鼠位置控制視角；觸控用拖曳 =====
  const SENS = 0.9;
  const lockSupported = !!field.requestPointerLock && !coarse;
  let everLocked = false, lockErrors = 0;
  // 面板只在「沒鎖住」時出現；鎖住時畫面乾淨，上方只留一行放開滑鼠的提示
  function showMsg() {
    lockMsg.hidden = coarse || locked || fallbackMode || !!(chal && chal.state === "done") || !!(def && def.owns());
    escChip.hidden = !locked;
    field.classList.toggle("is-locked", locked);
  }
  function release() { if (rangeFire) { clearInterval(rangeFire); rangeFire = null; } }
  function startFire() { fire(); if (w.mode === "auto") { release(); rangeFire = setInterval(fire, w.rate); } }
  function unlock() { try { if (document.pointerLockElement === field) document.exitPointerLock(); } catch (e) {} }
  function requestLock() {
    if (!lockSupported) { fallbackMode = true; showMsg(); return; }
    function failed() {
      // 剛按完 Esc 的一秒內瀏覽器會拒絕再鎖定：請使用者再按一次，不要直接切換成別的模式。
      // 連續失敗又從沒成功過（例如被嵌在不允許鎖定的頁面裡）才改成「滑鼠位置控制視角」。
      lockErrors++;
      if (!everLocked && lockErrors >= 3) { fallbackMode = true; } else { lockTitle.textContent = "再按一次就好"; lockText.textContent = "瀏覽器剛放開滑鼠，需要等一秒才能再次鎖定。"; }
      showMsg();
    }
    try {
      const r = field.requestPointerLock();
      if (r && r.catch) r.catch(failed);
    } catch (e) { failed(); }
  }
  function onLockChange() {
    const was = locked;
    locked = document.pointerLockElement === field;
    if (locked) {
      everLocked = true; lockErrors = 0;
      if (def) def.lockChanged(true);
      if (chal && chal.state === "ready") beginCount();
      if (chal && chal.paused) { const d = performance.now() - chal.paused; chal.t0 += d; chal.nextSpawn += d; chal.targets.forEach(function (t) { t.born += d; }); chal.paused = 0; }
    }
    if (!locked) {
      release();
      if (was && chal && chal.state === "run" && !chal.paused) chal.paused = performance.now();
      if (was) {
        lockTitle.textContent = "已暫停";
        lockText.textContent = "現在可以自由移動滑鼠、切換槍種或離開。按「繼續瞄準」回到遊戲。";
        lockBtn.textContent = "繼續瞄準";
      }
    }
    showMsg();
  }
  function onLockError() { lockErrors++; if (!everLocked && lockErrors >= 3) { fallbackMode = true; } showMsg(); }
  function onMouseMove(e) {
    if (!locked) return;
    cam.x += (e.movementX || 0) * SENS / zoom;
    cam.y += (e.movementY || 0) * SENS / zoom;
    clampCam();
  }
  function onHide() { if (document.hidden) { release(); setAds(false); unlock(); } }
  rangeKeyHandler = function (e) {
    if (def && def.key(e)) return;
    if (e.key === "r" || e.key === "R") {
      if (def && reloading && weaponId !== "sg") {
        // 防線的主動裝填：裝填途中再按一次 R，時機對了立刻完成，時機錯了會卡彈
        const res = def.activeReload();
        if (res === "perfect") { cancelReload(); ammo = w.mag; paintAmmo(); def.onReloaded(); }
        else if (res === "fail") {
          clearTimeout(reloadTimer);
          const wait = Math.max(0, reloadAt + w.reload - performance.now()) + 700;
          reloadTimer = setTimeout(function () { ammo = w.mag; reloading = false; reloadAnims = []; paintAmmo(); def.reloadEnd(); def.onReloaded(); }, wait);
        }
      } else reload();
    }
    // Esc 由瀏覽器處理；另外給一個保險的鍵：Tab 或 Q 也能放開滑鼠
    if (locked && (e.key === "Tab" || e.key === "q" || e.key === "Q")) { e.preventDefault(); unlock(); }
  };
  document.addEventListener("keydown", rangeKeyHandler);
  document.addEventListener("pointerlockchange", onLockChange);
  document.addEventListener("pointerlockerror", onLockError);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("visibilitychange", onHide);
  window.addEventListener("blur", release);
  // 畫面太小時，把介面縮小一點，不要蓋住戰場（--ui 是縮放比例）
  let fieldRO = null;
  if (window.ResizeObserver) {
    fieldRO = new ResizeObserver(function () {
      const ui = Math.max(0.5, Math.min(1, field.clientWidth / 960, field.clientHeight / 560));
      field.style.setProperty("--ui", ui.toFixed(2));
    });
    fieldRO.observe(field);
  }
  rangeCleanup = function () {
    document.removeEventListener("pointerlockchange", onLockChange);
    document.removeEventListener("pointerlockerror", onLockError);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("visibilitychange", onHide);
    document.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("blur", release);
    if (def) def.destroy();
    if (fieldFullOff) fieldFullOff();
    document.body.classList.remove("no-scroll");
    if (fieldRO) fieldRO.disconnect();
    unlock();
  };
  lockBtn.addEventListener("click", function (e) { e.stopPropagation(); requestLock(); });
  lockMsg.addEventListener("pointerdown", function (e) { e.stopPropagation(); });

  let dragId = null, lastX = 0, lastY = 0;
  field.addEventListener("pointerdown", function (e) {
    if (coarse) { dragId = e.pointerId; lastX = e.clientX; lastY = e.clientY; }
  });
  // 桌機的左右鍵用 mousedown／mouseup：按住右鍵開鏡時，pointerdown 不會再為左鍵觸發，所以不能用它
  field.addEventListener("mousedown", function (e) {
    if (coarse) return;
    if (!locked && !fallbackMode) return;   // 沒鎖住時，只有「開始瞄準」按鈕能鎖定滑鼠
    if (e.button === 2) { setAds(true); return; }
    if (e.button === 0) startFire();
  });
  function onMouseUp(e) {
    if (coarse) return;
    if (e.button === 2) setAds(false);
    else if (e.button === 0) release();
  }
  document.addEventListener("mouseup", onMouseUp);
  field.addEventListener("pointermove", function (e) {
    if (coarse) {
      if (e.pointerId !== dragId) return;
      cam.x += (e.clientX - lastX) * 0.8 / zoom;
      cam.y += (e.clientY - lastY) * 0.8 / zoom;
      lastX = e.clientX; lastY = e.clientY;
      clampCam();
    } else if (fallbackMode && !locked) {
      const r = field.getBoundingClientRect();
      cam.x = ((e.clientX - r.left) / r.width - 0.5) * 1000;
      cam.y = DEF ? 244 + ((e.clientY - r.top) / r.height - 0.5) * 500 : 30 + ((e.clientY - r.top) / r.height - 0.5) * 300;
      clampCam();
    }
  });
  field.addEventListener("pointerup", function (e) { if (!coarse) return; release(); if (e.pointerId === dragId) dragId = null; });
  field.addEventListener("pointercancel", function () { if (coarse) { release(); dragId = null; } });
  field.addEventListener("pointerleave", function () { if (!locked) release(); });
  if (fireBtn) {
    fireBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); startFire(); });
    fireBtn.addEventListener("pointerup", function (e) { e.stopPropagation(); release(); });
    fireBtn.addEventListener("pointercancel", release);
    reloadBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); reload(); });
    adsBtn.addEventListener("pointerdown", function (e) { e.stopPropagation(); setAds(!ads); });
  }

  setWeapon(weaponId, gunId);
  showMsg();
  rangeFrame = requestAnimationFrame(frame);
}

/* ---------- 準心鼠標 ----------
   用一個跟著滑鼠移動的準心取代原本的游標：平常是完整準心，滑到可以點的東西上變成「鎖定框」，
   中心的黃點會一閃一閃。只在有滑鼠的裝置啟用；輸入框裡會顯示原本的文字游標。 */
const lockPixels = [[1,1,3,1],[1,1,1,3],[8,1,3,1],[10,1,1,3],[1,10,3,1],[1,8,1,3],[8,10,3,1],[10,8,1,3],[5,5,2,2]];

function setupReticle() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const reticle = el("div", "reticle");
  const normal = drawPixels(logoPixels, 12, 12);
  normal.setAttribute("class", "normal");
  const lock = drawPixels(lockPixels, 12, 12);
  lock.setAttribute("class", "lock");
  reticle.appendChild(normal);
  reticle.appendChild(lock);
  document.body.appendChild(reticle);
  document.documentElement.classList.add("has-reticle");

  let x = 0, y = 0, queued = false;
  document.addEventListener("mousemove", function (e) {
    x = e.clientX;
    y = e.clientY;
    reticle.classList.add("on");
    const t = e.target;
    reticle.classList.toggle("is-lock", !!(t.closest && t.closest("a, button:not(:disabled), select, summary, .hero-art, .spot, input[type=range]")));
    reticle.classList.toggle("is-text", !!document.pointerLockElement || !!(t.closest && t.closest("input:not([type=range]), textarea")));
    if (!queued) {
      queued = true;
      requestAnimationFrame(function () {
        reticle.style.transform = "translate(" + x + "px, " + y + "px)";
        queued = false;
      });
    }
  });
  document.addEventListener("mouseleave", function () { reticle.classList.remove("on"); });
  // 試射場鎖住滑鼠時，隱藏跟著滑鼠的準心（畫面中央有自己的準心）；放開後立刻回來
  document.addEventListener("pointerlockchange", function () {
    if (document.pointerLockElement) reticle.classList.add("is-text");
    else { reticle.classList.remove("is-text"); reticle.classList.add("on"); }
  });
}

/* ---------- 捲到才浮現 ----------
   挑出要浮現的元素加上 reveal，進入畫面時改成 in，由 CSS 做淡入與上移。
   同一組的元素會依序延遲（--n），看起來是一個接一個出現。 */
function setupReveal() {
  if (reduceMotion() || !("IntersectionObserver" in window)) return;
  const groups = [
    ".marquee", ".intro h2, .intro .lead", ".index-list li", ".home-section > h2", ".world-map",
    ".term-card", ".stat-card", ".timeline-section", ".type-section"
  ];
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      observer.unobserve(node);
      node.classList.add("in");
      // 動畫結束後移除標記，還原元素原本的樣式（例如索引大磚的滑過上浮）
      setTimeout(function () { node.classList.remove("reveal", "in"); }, 1200);
    });
  }, { threshold: 0.15 });
  groups.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (node, i) {
      node.classList.add("reveal");
      node.style.setProperty("--n", Math.min(i, 5));
      observer.observe(node);
    });
  });
}

setupReveal();
setupReticle();
window.addEventListener("hashchange", route);
route();
