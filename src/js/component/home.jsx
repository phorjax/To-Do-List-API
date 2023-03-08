import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);

  let apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/phorjax";
  const apiGet = () => {
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((data) => setTodo(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    apiGet();
  }, []);

 function clearAllTasks() {
	let newTodo =   {
        label: "sample task",
        done: false
    };	
	fetch(apiUrl,
		{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
			body: JSON.stringify(newTodo)
        }
    )
	.then((resp) => console.log( resp.json()))
	.then(()=>setTodo([]))
	.catch((error) =>console.log(error))
  }

  return (
    <div className="container">
      <h1>My to-dos</h1>
      <ul>
        <li>
          {" "}
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setTodo(todo.concat([inputValue]));
                setInputValue("");
              }
            }}
            placeholder="add to the to do list"
          ></input>
        </li>

        {todo.map((item, index) => (
          <li>
            {item.label}{" "}
            <i
              class="fa-solid fa-trash-can"
              onClick={() =>
                setTodo(todo.filter((t, currentIndex) => index != currentIndex))
              }
            ></i>
          </li>
        ))}
      </ul>
      <div>
        <p>{todo.length} tasks</p>
      </div>

      <div>
        <button onClick={()=>clearAllTasks()}> Clear all tasks</button>
      </div>
    </div>
  );
};

export default Home;
