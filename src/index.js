const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const nlp = require("compromise/three");
const fileUpload = require("express-fileupload");

const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
  })
);
app.use(
    fileUpload({
      limits: { fileSize: 6 * 1024 * 1024 },
    })
  );

const port = Number(process.env.PORT || 8080);

app.post("/uploadFile", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ errors: "No file uploaded" });
  }

  const { sampleFile } = req.files;
  if (!sampleFile) {
    return res.status(400).send({ errors: "Invalid file uploaded" });
  }

  try {
    const data = Buffer.from(sampleFile.data, 'utf8').toString();
    const doc = nlp(data);
    const nouns = doc.nouns().json().map(obj=>obj.noun.root);
    const verbs = doc.verbs().json().map(obj=>obj.verb.root);
    const adjectives = doc.adjectives().json().map(obj=>obj.text);
    const adverbs = doc.adverbs().json().map(obj=>obj.text);
    res.status(200).send({ nouns, verbs, adjectives, adverbs});
  } catch(err) {
    res.status(400).send({ errors: "Internal Server Error"});
  }
});

app.listen(port, () => {
  try {
    console.log(`Started server at port: ${port}`);
  } catch (err) {
    console.error(`Error Starting server at port :${port}`);
    process.exit(1);
  }
});
