/* 子彈尺寸資料（單位 mm）。數值是公開規格的約略值，不同廠牌會有小差異。
   case 彈殼長、oal 全長（含彈頭）、bullet 彈頭直徑、base 彈殼底部直徑、rim 底緣直徑、
   shape：straight 直筒彈殼、bottle 瓶頸彈殼、shell 霰彈。energy：常見裝填的槍口動能（焦耳，約略值）。 */
const calibers = [
  { id: "9x19", name: "9×19mm", note: "手槍與衝鋒槍最常見的彈", match: "9×19", shape: "straight", case: 19.2, oal: 29.7, bullet: 9.0, base: 9.9, rim: 10.0, energy: 500 },
  { id: "45acp", name: ".45 ACP", note: "M1911 用的粗短大彈", match: "\\.45 ACP", shape: "straight", case: 22.8, oal: 32.4, bullet: 11.5, base: 12.1, rim: 12.1, energy: 500 },
  { id: "9x18", name: "9×18mm 馬卡洛夫", note: "比 9×19 短一點，東歐常見", match: "9×18", shape: "straight", case: 18.1, oal: 24.7, bullet: 9.3, base: 9.9, rim: 10.0, energy: 340 },
  { id: "762x25", name: "7.62×25mm 托卡列夫", note: "PPSh-41 用的細長手槍彈", match: "7\\.62×25", shape: "bottle", case: 24.9, oal: 34.9, bullet: 7.9, base: 9.9, rim: 9.9, energy: 700 },
  { id: "57x28", name: "5.7×28mm", note: "Five-seveN 用的小口徑高速彈", match: "5\\.7×28", shape: "bottle", case: 28.9, oal: 40.5, bullet: 5.7, base: 8.0, rim: 8.0, energy: 450 },
  { id: "357mag", name: ".357 Magnum", note: "左輪與沙漠之鷹用的強力手槍彈", match: "\\.357", shape: "straight", case: 32.8, oal: 40.4, bullet: 9.1, base: 9.6, rim: 11.2, energy: 800 },
  { id: "44mag", name: ".44 Magnum", note: "更粗的強力手槍彈", match: "\\.44 Magnum", shape: "straight", case: 32.6, oal: 41.0, bullet: 10.9, base: 11.6, rim: 13.0, energy: 1400 },
  { id: "50ae", name: ".50 AE", note: "手槍裡最大的彈之一", match: "\\.50 AE", shape: "straight", case: 32.6, oal: 40.9, bullet: 12.7, base: 13.9, rim: 14.0, energy: 1900 },
  { id: "556x45", name: "5.56×45mm 北約", note: "細小但很快，現代步槍的主流", match: "5\\.56×45", shape: "bottle", case: 44.7, oal: 57.4, bullet: 5.7, base: 9.5, rim: 9.5, energy: 1700 },
  { id: "762x39", name: "7.62×39mm", note: "AK 系列用的中型步槍彈", match: "7\\.62×39", shape: "bottle", case: 38.6, oal: 56.0, bullet: 7.9, base: 11.4, rim: 11.4, energy: 2000 },
  { id: "762x51", name: "7.62×51mm 北約", note: "全威力步槍彈", match: "7\\.62×51", shape: "bottle", case: 51.2, oal: 69.9, bullet: 7.8, base: 12.0, rim: 12.0, energy: 3400 },
  { id: "762x54r", name: "7.62×54mmR", note: "1891 年問世，還在用", match: "7\\.62×54", shape: "bottle", case: 53.7, oal: 77.2, bullet: 7.9, base: 12.4, rim: 14.5, energy: 3500 },
  { id: "792x57", name: "7.92×57mm 毛瑟", note: "德軍兩次大戰的主力彈", match: "7\\.92×57", shape: "bottle", case: 56.9, oal: 80.5, bullet: 8.2, base: 11.9, rim: 12.0, energy: 3700 },
  { id: "303", name: ".303 British", note: "英國與大英國協的步槍彈", match: "\\.303", shape: "bottle", case: 56.4, oal: 77.4, bullet: 7.9, base: 11.6, rim: 13.7, energy: 3000 },
  { id: "65x55", name: "6.5×55mm", note: "北歐常見的細長步槍彈", match: "6\\.5×55", shape: "bottle", case: 55.0, oal: 77.5, bullet: 6.7, base: 12.2, rim: 12.2, energy: 3500 },
  { id: "12ga", name: "12 號霰彈", note: "一發裝很多顆小彈丸", match: "12 號", shape: "shell", case: 70.0, oal: 70.0, bullet: 0, base: 20.5, rim: 21.5, energy: 3000 },
  { id: "338nm", name: ".338 Norma Magnum", note: "遠距離機槍用的大彈", match: "\\.338", shape: "bottle", case: 64.8, oal: 92.7, bullet: 8.6, base: 14.7, rim: 14.7, energy: 8000 },
  { id: "50bmg", name: ".50 BMG", note: "重機槍與反器材步槍用的巨大彈", match: "\\.50 BMG|12\\.7×99", shape: "bottle", case: 99.1, oal: 138.7, bullet: 13.0, base: 20.4, rim: 20.4, energy: 18000 }
];
