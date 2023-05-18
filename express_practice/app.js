const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 2000;

const jsonData = require("./dev-data/data.json");

app.use(express.json());

app.get("/api/v1/tour", (req, res) => {
  res.status(200).json({
    status: "success",
    message: {
      jsonData: jsonData,
    },
  });
});
app.get("/api/v1/tour/:id", (req, res) => {
  const tourdata = jsonData.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: "success",
    message: {
      jsonData: tourdata,
    },
  });
});
app.post("/api/v1/tour", (req, res) => {
  const data = req.body;

  const dataId = jsonData[jsonData.length - 1].id + 1;
  data.id = dataId;
  jsonData.push(data);

  res.status(201).json({
    status: "success",
    message: "Tour Data is created",
  });
});

app.patch("/api/v1/tour/:id", (req, res) => {
  try {
    console.log(req.params.id);

    const updateDataIdFind = jsonData.find((el) => el.id === req.params.id * 1);

    updateDataIdFind.price = req.body.price;
    updateDataIdFind.productName = req.body.productName;
    updateDataIdFind.from = req.body.from;

    fs.appendFile("{__dirname}/dev-data/data.json", updateDataIdFind, (err) => {
      console.log("err");
    });

    res.status(200).json({
      status: "success",
      meassage: "Data updated",
    });
  } catch (error) {
    console.log("data update error");
    throw error;
  }
});

app.delete("/api/v1/tour/:id", (req, res) => {
  let detelDataIdFind = jsonData.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: "success",
    meassage: "Data Deleted",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
