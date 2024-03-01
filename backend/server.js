const express = require("express");
const app = express();
const mysql = require("mysql");

const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "task_manager1",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/addTask", async (req, res) => {
  try {
    const task = req.body.task;
    const query = "INSERT INTO tasks (task) VALUES (?)";
    connection.query(query, [task], (err, results) => {
      if (err) {
        console.error("Error adding task: ", err);
        res.status(500).json({ success: false, error: "500, Server Error" });
        return;
      }
      res.json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "500, Server Error" });
  }
});

app.get("/getTasks", async (req, res) => {
  try {
    const query = "SELECT * FROM tasks";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching tasks: ", err);
        res.status(500).json({ error: "500, Server Error" });
        return;
      }
      const tasks = results.map((row) => row.task);
      res.json({ tasks,results });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "500, Server Error" });
  }
});

app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log("Deleting task with ID:", taskId);
    const query = "DELETE FROM tasks WHERE id = ?";
    connection.query(query, [taskId], (err, results) => {
      if (err) {
        console.error("Error deleting task: ", err);
        res.status(500).json({ error: "500, Server Error" });
        return;
      }
      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).json({ error: "500, Server Error" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
