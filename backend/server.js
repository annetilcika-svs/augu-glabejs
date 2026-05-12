const express = require("express");
var cors = require("cors");
const path = require("path");
const OpenAI = require("openai");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

//aktivizēt Express
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

const port = 3000;
//lietot CORS
app.use(cors());

app.listen(port, function (req, res) {
  console.log(`Server is running at port ${port}`);
});

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});
//mākslīgais intelekts
app.post("/ask-ai", async (req, res) => {
  try {
    const saite = req.body.saite;
    const problema = req.body.problema;
    //pagaidām nedarbojas izvērtēšana vai augam patiešām vajag palīdzību vai nē, vajag uzrakstīt kautkādus kritērijus kuriem viņam sekot
    const response = await client.responses.create({
      model: "gpt-5.4-nano",
      instructions: `Tu esi augu un augu kopšanas eksperts. Tev ir svarīgi jaizvērtē vai augam patiešām ir vajadzīga palīdzība.

      Tava loģika:
      1.Ja auga lapas ir zaļas, iskatās stingras un nav bojājumu tad palīdzību nevajag.

Atbildi TIKAI JSON formātā. 
Struktūra: {
"palidziba": "vajag" vai "nevajag"(Ja nevajag palīdzību tālāk neturpini analizēt),
  "nosaukums": "TIKAI Auga nosaukums",
  "apraksts": "Īss apraksts(viens vai divi teikumi), kas ar augu ir netā",
  "plans": ["...", "...", "...", "...", "...", "..."] (Raksti 6 dienu plānu (nemini kura diena pēts kārtas) tā , lai cilvēks, kuram nav pieredze ar augu kopšanu varētu VIENKĀRŠI saprast.)
}`,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Augu problēmas apraksts: ${problema}`,
            },
            {
              type: "input_image",
              image_url: saite,
            },
          ],
        },
      ],
    });
    res.json({ answer: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with the AI" });
  }
});
