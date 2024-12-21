import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await fs.promises.readFile("data.json", "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await fs.promises.readFile("data.json", "utf8");
    const parsedData = JSON.parse(data);
    const foundItem = parsedData.find(
      (item) => item.id === parseInt(req.params.id)
    );
    if (!foundItem) {
      return res.status(404).send("Item not found");
    }
    res.json(foundItem);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await fs.promises.readFile("data.json", "utf8");
    const parsedData = JSON.parse(data);
    parsedData.push(req.body);
    await fs.promises.writeFile(
      "data.json",
      JSON.stringify(parsedData, null, 2)
    );
    res.json(parsedData);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await fs.promises.readFile("data.json", "utf8");
    const parsedData = JSON.parse(data);
    const index = parsedData.findIndex(
      (item) => item.id === parseInt(req.params.id)
    );
    if (!index) {
      return res.status(404).send("Item not found");
    }
    parsedData[index] = req.body;
    await fs.promises.writeFile(
      "data.json",
      JSON.stringify(parsedData, null, 2)
    );
    res.json(parsedData);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await fs.promises.readFile("data.json", "utf8");
    const parsedData = JSON.parse(data);
    const index = parsedData.findIndex(
      (item) => item.id === parseInt(req.params.id)
    );
    if (!index) {
      return res.status(404).send("Item not found");
    }
    parsedData.splice(index, 1);
    await fs.promises.writeFile(
      "data.json",
      JSON.stringify(parsedData, null, 2)
    );
    res.sendStatus(204).send("Item deleted");
  } catch (error) {
    res.send(error);
  }
});

export default router;
