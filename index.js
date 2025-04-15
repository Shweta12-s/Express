import express from "express";
const app = express();
const port = 5000;

app.use(express.json());

let coffeeData = [];
let nextId = 1;

app.post("/coffee", (req, res) => {
  const { name, price } = req.body;
  const newCoffee = { id: nextId++, name, price };
  coffeeData.push(newCoffee);
  res.status(201).send(newCoffee);
});

app.get("/coffee", (req, res) => {
  res.status(200).send(coffeeData);
});

app.get("/coffee/:id", (req, res) => {
  const coffees = coffeeData.find((c) => c.id === parseInt(req.params.id));
  if (!coffees) {
    res.status(404).send("No coffee");
  } else {
    res.send(coffees);
  }
});

app.put("/coffee/:id", (req, res) => {
  // const coffeeId = req.params.id;
  const coffees = coffeeData.find((c) => c.id === parseInt(req.params.id));
  if (!coffees) {
    res.status(404).send("No coffee");
  }
  const { name, price } = req.body;
  coffees.name = name;
  coffees.price = price;
  res.status(202).send(coffees);
});

app.delete("/coffee/:id", (req, res) => {
  const index = coffeeData.findIndex((c) => c.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Coffee not found");
  } else {
    coffeeData.splice(index, 1);
    return res.status(204).send("Deleted");
  }
});
app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.listen(port, () => {
  console.log(`✅ Server is running at port ${port}...`);
});
