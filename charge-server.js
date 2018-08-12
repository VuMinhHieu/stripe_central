const app = require("express")();
const api_key = require('./env.json');
const stripe = require("stripe")(api_key.sk_api);

app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
  try {
    let body = JSON.parse(req.body);
    let charge = await stripe.charges.create({
      amount: body.amount,
      currency: "usd",
      description: body.description,
      source: body.source
    });

    res.json({charge});
  } catch (err) {
    res.status(500).end();
  }
});

app.post("/charges", async (req, res) => {
  try {
    let charges = await stripe.charges.list({
      limit: req.body
    });
    res.json({charges});
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(9000, () => console.log("Listening on port 9000"));