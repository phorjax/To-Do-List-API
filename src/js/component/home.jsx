import React, {useState} from "react";
import FetchAPI from "./FetchAPI.jsx";

//include images into your bundle

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todo, setTodo] = useState([]);
	

	return (
		<div className="container">
			<h1>My to-dos</h1>
			<ul>
				<li> <input type="text" 
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyUp = {(e) => {
					if (e.key === 'Enter') {
						setTodo(todo.concat([inputValue]));
						setInputValue("");
					}
				}}
				placeholder="add to the to do list"></input>
				</li>
				
					{todo.map((item, index) => (
						<li>{item}{" "}
						<i class="fa-solid fa-trash-can" onClick={() =>
							 setTodo(
								todo.filter(
									(t, currentIndex) => 
									index != currentIndex
								)
							)
						}></i>
						
						
						
						</li>


					))}
			</ul>
			<div><p>{todo.length} tasks</p></div>

			<div><FetchAPI /></div>
		</div>
	);
};

export default Home;
