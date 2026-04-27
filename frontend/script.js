const btnPievienot = document.getElementById("btn-pievienot");
const lejupieladet = document.getElementById("lejupieladet");
const dzest = document.getElementById("dzest");
const saite = document.getElementById("saite");
const problema = document.getElementById("problema");

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
  console.log(dati.answer);
}

function saglabat() {
  console.log("saglabāt");
}

function dzesana() {
  console.log("dzēst");
}
