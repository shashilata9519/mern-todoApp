import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let result = await fetch("http://localhost:8000");
    result = await result.json();
    setTasks(result);
    console.log(result);
  };

  const addItem = async () => {
    try {
      if (!task) {
        alert("add item");
      } else {
        let result = await axios.post("http://localhost:8000/add", {
          item: task,
        });

        setTask((prev) => [...prev, result.data]);

        // console.log(result);
        setTask("");
        getItem();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteItem= async(id)=>{
    try{
      let result=await axios.delete(`http://localhost:8000/delete/${id}`)
      let newItem=tasks.filter(item=>item._id !==id);
      setTasks(newItem);
      getItem()

    }catch(err)
    {
      console.log(err.message)
    }

  }

  return (
    <>
      <div className="App w-25 container mt-5">
        <input
          type="text"
          className="form-control my-4"
          placeholder="enter the task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button className="btn btn-info" onClick={addItem}>
          add
        </button>
        <ul className="list-group my-5">
          {tasks.length > 0 ? (
            tasks.map((item) => (
              <>
              
              <li className="list-group-item d-flex justify-content-between container" key={item._id}>
                {item.item}
                <button onClick={()=>{deleteItem(item._id)}}>❌</button>
              </li>
              </>
            ))
          ) : (
            <h1>No Record</h1>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
