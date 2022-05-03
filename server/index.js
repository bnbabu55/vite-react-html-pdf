const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const pdfTemplate = require("./templates/consent.js");

const app = express();

const port = process.env.PORT || 5000;
const options = {
  format: "A4",
  orientation: "portrait",
  border: {
    top: "0.5in",
    right: "0.5in",
    bottom: "0.5in",
    left: "0.5in",
  },
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/create-pdf", (req, res) => {
  const fileName = `${__dirname}/forms/${req.body.name.replace(
    /\s+/g,
    "-"
  )}-consent`;

  pdf
    .create(pdfTemplate(req.body), options)
    .toFile(`${fileName}.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
