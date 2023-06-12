const express = require("express");
const fs = require("fs");
const app = express();

require("dotenv").config()

const {port} = process.env;

const jsonData = require("./dev-data/data.json");
const { Console } = require("console");
const { prototype } = require("events");

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

    fs.readFile("./dev-data/data.json", (err, data) => {
      const deletedData = JSON.parse(data).filter(
        (el) => el.id != req.params.id * 1
      );
     const checkId=JSON.parse(data).filter(
      (el) => el.id === req.params.id * 1
    )
    console.log(checkId)
      if (checkId.length===0) {
        res.status(404).json({
          status: "Data not Found",
          meassage: " Id is not found",
        });
      } else {
        fs.writeFile(
          "./dev-data/data.json",
          JSON.stringify(deletedData)
          
        );
        res.status(200).json({
          status: "success",
          meassage: "Data Deleted",
        });
      }


    });
  
});

app.listen(port, () => {
  console.log(`server is running on ${PORT}`);
});
