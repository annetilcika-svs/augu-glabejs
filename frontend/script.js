const btnPievienot = document.getElementById("btn-pievienot");
const lejupieladet = document.getElementById("lejupieladet");
const dzest = document.getElementById("dzest");

const saite = document.getElementById("saite");
const problema = document.getElementById("problema");

const auguNosaukums = document.getElementById("auguNosaukums");
const apraksts = document.getElementById("apraksts");
const bilde = document.getElementById("bilde");

const diena1 = document.getElementById("diena1");
const diena2 = document.getElementById("diena2");
const diena3 = document.getElementById("diena3");
const diena4 = document.getElementById("diena4");
const diena5 = document.getElementById("diena5");
const diena6 = document.getElementById("diena6");

btnPievienot.addEventListener("click", jauns);
lejupieladet.addEventListener("click", saglabat);
dzest.addEventListener("click", dzesana);

async function jauns() {
  console.log("pievienošana");
  const saitesBilde = saite.value;
  bilde.innerHTML = `<img src="${saitesBilde}" alt="Augs" style="max-width: 100%; max-height: 100%;">`;

  const atbilde = await fetch("/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      saite: saite.value,
      problema: problema.value,
    }),
  });
  const dati = await atbilde.json();
  const info = JSON.parse(dati.answer);
  console.log(dati.answer);

  document.getElementById("problema").value = "";
  document.getElementById("saite").value = "";

  document.getElementById("auguNosaukums").innerText = info.nosaukums;
  document.getElementById("apraksts").innerText = info.apraksts;
  const plāns = info.plans || info.diena;

  if (info.palidziba === "nevajag") {
    alert("Augam viss kārtībā!");
    return;
  } else {
    diena1.innerText = plāns[0] || "";
    diena2.innerText = plāns[1] || "";
    diena3.innerText = plāns[2] || "";
    diena4.innerText = plāns[3] || "";
    diena5.innerText = plāns[4] || "";
    diena6.innerText = plāns[5] || "";
  }
}

function saglabat() {
  console.log("saglabāt");
}

function dzesana() {
  console.log("dzēst");
  //notīra bildi un nosaukumu
  auguNosaukums.innerText = "__________________";
  bilde.innerHTML = "";

  //notīra plāna lauciņus un aprakstu
  diena1.innerText = "";
  diena2.innerText = "";
  diena3.innerText = "";
  diena4.innerText = "";
  diena5.innerText = "";
  diena6.innerText = "";
  apraksts.innerText = "";
}
