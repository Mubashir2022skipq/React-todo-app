import { useState } from 'react';
import { TodoList } from './TodoList.jsx';
import { TodoForm } from './TodoForm.jsx'
import './App.css'

function App() {

  const [task, setTask] = useState(() => {

    const addDataLocalStorage = localStorage.getItem("todoKey") ?? [];

    return JSON.parse(addDataLocalStorage);

  });

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    //to check if the input feild is empty or not.
    if (!content) return;

    //to check if the data is already existing or not.

    let ifTodoContentMatched = task.find((curTask) => curTask.content === content);
    if (ifTodoContentMatched) return;


    setTask((prevTask) => [...prevTask, { id, content, checked }])



  }

  localStorage.setItem("todoKey",JSON.stringify(task))


  const handleCheckedTodo = (content) => {

    const updatedTask = task.map((curTask) => {

      if (curTask.content === content) {

        return { ...curTask, checked: !curTask.checked };

      }
      else {
        return curTask;
      }

    })

    setTask(updatedTask)
  }

  

  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value)
    setTask(updatedTask);
  }

  const handleClearTodo = () => {
    setTask([]);
  }





  return (
    <section className='todo-container'>
      <header>
        <h1>Todo List</h1>
      </header>

      <TodoForm onAddTodo={handleFormSubmit} />

      {/* order list */}
      <section className='myUnOrdList'>
        <ul>
          {
            task.map((curTask) => {
              return (
                <TodoList key={curTask.id} data={curTask.content} checked={curTask.checked} onHandleDeleteTodo={handleDeleteTodo} onHandleCheckedTodo={handleCheckedTodo} />
              )
            })
          }
        </ul>
      </section>

      {/* clear button */}
      <section>
        <button className="clear-btn" onClick={handleClearTodo}>Clear all</button>
      </section>
    </section>
  );
}

export default App
