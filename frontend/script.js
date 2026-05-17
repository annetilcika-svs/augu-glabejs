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

const loder = document.getElementById("loder");

const saitesParbaude =
  /^(data:image\/|\bhttps?:\/\/.*\.(jpg|jpeg|png|webp|gif)$)/i;

btnPievienot.addEventListener("click", jauns);
lejupieladet.addEventListener("click", saglabat);
dzest.addEventListener("click", dzesana);

async function jauns() {
  console.log("pievienošana");

  if (!saite.value || !problema.value) {
    alert("Lūdzu ievadiet visu informāciju!");
    return;
  }

  //pārbauda vai saite ir attēla vai nē
  if (!saitesParbaude.test(saite.value.trim())) {
    alert("Lūdzu ievadiet saiti uz īstu attēlu");
    return;
  }

  loder.innerHTML = `
  <div class="loader-overlay">
    <div class="loader-box">
      <div class="spinner"></div>
      <p>Analizēju augu...</p>
    </div>
  </div>
`;

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
  loder.innerHTML = "";
  console.log(dati.answer);

  const plan = info.plans || info.diena;

  if (info.palidziba === "nevajag") {
    alert("Augam viss kārtībā!");
    document.getElementById("problema").value = "";
    document.getElementById("saite").value = "";
    return;
  }
  //nosaukums, apraksts
  document.getElementById("auguNosaukums").innerText = info.nosaukums;
  document.getElementById("apraksts").innerText = info.apraksts;
  //ievieto dienu plānu
  diena1.innerText = plan[0] || "";
  diena2.innerText = plan[1] || "";
  diena3.innerText = plan[2] || "";
  diena4.innerText = plan[3] || "";
  diena5.innerText = plan[4] || "";
  diena6.innerText = plan[5] || "";
  //bilde
  const saitesBilde = saite.value;
  bilde.innerHTML = `<img src="${saitesBilde}" alt="Augs" style="max-width: 100%; max-height: 100%;">`;

  document.getElementById("problema").value = "";
  document.getElementById("saite").value = "";
}

function saglabat() {
  console.log("saglabāt");

  const nosaukums = auguNosaukums.innerText;
  const aprakstaTeksts = apraksts.innerText;

  if (
    !diena1.innerText ||
    !diena2.innerText ||
    !diena3.innerText ||
    !diena4.innerText ||
    !diena5.innerText ||
    !diena6.innerText ||
    !nosaukums ||
    !aprakstaTeksts
  ) {
    alert("Nav informācijas ko saglabāt");
    return;
  }

  const plani = `
    1. diena: ${diena1.innerText}
    2. diena: ${diena2.innerText}
    3. diena: ${diena3.innerText}
    4. diena: ${diena4.innerText}
    5. diena: ${diena5.innerText}
    6. diena: ${diena6.innerText}
  `;

  const fails = `
AUGU KOPŠANAS PLĀNS

Augs: ${nosaukums}

Apraksts: ${aprakstaTeksts}

Kopšanas soļi:
${plani}
  `;

  var myFile = new Blob([fails], { type: "text/plain" });
  const fileurl = URL.createObjectURL(myFile);
  const link = document.createElement("a");
  link.download = `${nosaukums}_kopšanas_plāns.txt`;
  link.href = fileurl;
  link.click();
  URL.revokeObjectURL(fileurl);
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
