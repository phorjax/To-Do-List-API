import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);

  let apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/phorjax";

  const updateFetch = (newList) => {
    fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList),
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));
  };

  const getFetch = () => {
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((data) => setTodo(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getFetch();
  }, []);

  const addTodo = (e) => {
    if (e.key === "Enter" && inputValue !== "") {
      let newList = todo.concat([{ label: inputValue, done: false }]);
      setTodo(newList);
      updateFetch(newList);
      setInputValue("");
    }
  };

  const clearAllTasks =()=> {
    let sampleList = [{
      "label": "sample task",
      "done": false,
    }]
    setTodo(sampleList)
    updateFetch(sampleList);
  }

  const deleteTodo = (index) => {
    let newList= todo.filter((item, currentIndex) => index != currentIndex)
    setTodo(newList);
    updateFetch(newList);
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
            onKeyUp={(e) => addTodo(e)}
            placeholder="add to the to do list"
          ></input>
        </li>

        {todo.map((item, index) => (
          <li>
            {item.label}{" "}
            <i
              class="fa-solid fa-trash-can"
              onClick={() =>
                deleteTodo(index)
              }
            ></i>
          </li>
        ))}
      </ul>
      <div>
        <p>{todo.length} tasks</p>
      </div>

      <div>
        <button onClick={() => clearAllTasks()}> Clear all tasks</button>
      </div>
    </div>
  );
};

export default Home;