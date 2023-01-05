const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const nlp = require('compromise/three');
const fileUpload = require('express-fileupload');



// let doc = nlp("William Shakespeare (1564–1616) wrote sonnets on a variety of themes. When discussing or referring to Shakespeare's sonnets, it is almost always a reference to the 154 sonnets that were first published all together in a quarto in 1609.[1] However, there are six additional sonnets that Shakespeare wrote and included in the plays Romeo and Juliet, Henry V and Love's Labour's Lost. There is also a partial sonnet found in the play Edward III.");
// const nouns = doc.nouns().json().map(obj=>obj.noun.root);
// const verbs = doc.verbs().json().map(obj=>obj.verb.root);
// const adjectives = doc.adjectives().json().map(obj=>obj.text);
// const adverbs = doc.adverbs().json().map(obj=>obj.text);


const app = express();
app.use(fileUpload({
    limits: { fileSize: 6 * 1024 * 1024 },
}));
app.use(helmet());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

const port = Number(process.env.PORT || 8080);


app.post('/uploadFile',  (req, res)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files;
    console.log(sampleFile);
    // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;

    res.status(200).send('File uploaded');
})

app.listen(port, () => {
  try {
    console.log(`Started server at port: ${port}`);
  } catch(err) {
    console.error(`Error Starting server at port :${port}`);
    process.exit(1);
  }
});
