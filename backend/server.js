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

    const response = await client.responses.create({
      model: "gpt-5.4-nano",
      instructions: "Tu esi augu kopšanas eksperts",
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
