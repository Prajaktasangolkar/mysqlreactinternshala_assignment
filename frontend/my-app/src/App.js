
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/getTasks");
    setTasks(response.data.results);
    // console.log(response.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:5000/addTask", { task });
    fetchTasks();
    setTask("");
  };

  const deleteTask = async (taskId) => {
    try {
      console.log("Deleting task with ID:", taskId);
      await axios.delete(`http://localhost:5000/deleteTask/${taskId}`);
      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task: ", error);
      // Handle error
    }
  };

  return (
    <>
      <div className=" container rounded-3 border border-2 border-dark my-5 bg-white">
        <div className="text-center">
          <h1 className="h1 my-3">To Do List App</h1>

          <div className="row">
            <div className=" col-8">
              <input
                className=" py-3 form-control shadow"
                placeholder="Input your task"
                type="text"
                id="inputText"
                value={task.task}
                onChange={(e) => setTask(e.target.value)}
                onKeyUp={(e) => {
                  if (e.code === "Space" || e.code === "Enter") {
                    if (task !== "") {
                      addTask();
                    }
                  }
                }}
              />
            </div>
            <div className="col-2">
              <button onClick={addTask} className=" mt-2 btn btn-dark">
                {" "}
                Add{" "}
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row rounded bg-white">
          <div className=" col-8">
          
               <ul>
       {tasks.map((task, index) => (
          <li key={index} 
          className="list-group-item d-flex justify-content-between ">
                                <div className="py-6 px-4 my-0.5 form-control shadow align-items-center">
                      {task.task}
                    </div>

            <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

