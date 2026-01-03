// ==== PLAYER INIT ====
let player = {
  name: "Đệ Tử",
  level: 1,
  realmIndex: 0,      // 0:Luyện Khí, 1:Trúc Cơ, 2:Kim Đan, 3:Nguyên Anh
  body: 1,
  soul: 1,
  dao: 1,
  hp: 100,
  mp: 50,
  root: ["Ngũ Hành", "Đơn Linh Căn", "Thiên Linh Căn", "Ma Linh Căn"][Math.floor(Math.random()*4)]
};

// ==== MAP ====
const maps = [
  { name:"Phàm Cốc", power:50 },
  { name:"Linh Sơn", power:150 },
  { name:"Huyền Cảnh", power:400 }
];
let currentMap = 0;

// ==== LOG HÀNH ĐỘNG ====
function log(msg){
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

// ==== STATS RENDER ====
function renderStats(){
  document.getElementById("realm").innerText = ["Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh"][player.realmIndex]+" "+player.level;
  document.getElementById("hp").innerText = player.hp;
  document.getElementById("mp").innerText = player.mp;
  document.getElementById("root").innerText = player.root;
  document.getElementById("map").innerText = maps[currentMap].name;
}

// ==== TU LUYỆN ====
function cultivate(){
  player.body += 0.5;
  player.soul += 0.5;
  player.dao += 0.5;
  player.hp += 10;
  player.mp += 5;
  player.level += 0.2;
  log("🧘 Tu luyện tăng tu vi!");
  renderStats();
}

// ==== ĐỘT PHÁ ====
function breakthrough(){
  if(player.level >= 5){
    if(player.realmIndex < 3){
      log("⚡ Đột phá thành công!");
      player.realmIndex++;
      player.level = 1;
      renderStats();
    } else {
      log("🌈 Ngươi đã đạt Nguyên Anh – cap v1.0");
    }
  } else {
    log("💀 Cấp quá thấp, không thể đột phá");
  }
}

// ==== CHIẾN ĐẤU ====
function fight(){
  let power = player.body*10 + player.soul*8 + player.dao*12;
  let enemyPower = maps[currentMap].power;

  if(power >= enemyPower){
    log("🏆 Đánh bại quái vật ở "+maps[currentMap].name+"!");
    player.level += 1;
  } else {
    log("💀 Thua trận… giảm 1 level");
    player.level = Math.max(1, player.level-1);
  }

  // Tự động chuyển map khi thắng
  if(power >= enemyPower && currentMap < maps.length-1){
    currentMap++;
    log("➡️ Tiến tới "+maps[currentMap].name);
  }

  renderStats();
}

// ==== GẮN NÚT ====
document.getElementById("cultivateBtn").onclick = cultivate;
document.getElementById("breakBtn").onclick = breakthrough;
document.getElementById("fightBtn").onclick = fight;

// ==== INIT RENDER ====
renderStats();
log("🎮 Chào mừng đến Huyền Thiên Tu Tiên Lộ – Public v1.0");
