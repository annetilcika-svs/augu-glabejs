const btnPievienot = document.getElementById("btn-pievienot");
const lejupieladet = document.getElementById("lejupieladet");
const dzest = document.getElementById("dzest");
const saite = document.getElementById("saite");
const problema = document.getElementById("problema");
const auguNosaukums = document.getElementById("auguNosaukums");
const bilde = document.getElementById("bilde");

btnPievienot.addEventListener("click", jauns);
lejupieladet.addEventListener("click", saglabat);
dzest.addEventListener("click", dzesana);

async function jauns() {
  console.log("pievienošana");

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

  document.getElementById("auguNosaukums").innerText = info.nosaukums;

  document.getElementById("problema").value = "";
  document.getElementById("saite").value = "";
}

function saglabat() {
  console.log("saglabāt");
}

function dzesana() {
  console.log("dzēst");
}
