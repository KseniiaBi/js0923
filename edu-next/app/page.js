'use client'

import styles from './page.module.css';
import { useRef, useState } from 'react';
import  editBtn from './edit.png';
import  delBtn from './delete.png';
import Image from 'next/image';


export default function Home() {
  const inputRef = useRef(null);
  const [state, setTodos] = useState([]);

  const saveTask = (e) => {
    e.preventDefault();
    let task = inputRef.current.value;
    setTodos([...state, task]);
    inputRef.current.value = '';
  }

  const deleteTask = (id) => {
    const todosCopy = state.slice();
    todosCopy.forEach((item,index) => {
      debugger
      if(item.id === index){
        todosCopy.splice(index,1);
      }
    });
    setTodos(todosCopy);
    console.log(todosCopy);
  }

  const editTask = (id) => {

  }

    return (
    <main className={styles.main}>
      <div className='todoapp'>
        <form onSubmit={(e) =>saveTask(e)}>
          <input id="todoinput" ref={inputRef} placeholder='Type your task here' />
          <input type='submit' value="Save" />
        </form>

        {/* conditional rendering */}
        {
          state.length > 0 ? <ToDoList tasks={state} edt={editTask} del={deleteTask} />
                            : <h3>Any tasks yet. Type and save in form above</h3>
        }

      </div>
    </main>
  )
}

function ToDoList(props){
  return(
    <ol>
      {
        props.tasks.map((item, index) => <ToDo onDelete={props.del} onEdit={props.edt}  key={index} id={index} task={item} />)
      }
    </ol>
  )
}

function ToDo({task, id, onDelete, onEdit}) {
  return (
    <li data-id={id}>
      {task}
      <Image className='task_btn edit_btn' onClick={() =>onEdit(id)} src={editBtn} alt="" width={24} height={24} />
      <Image className='task_btn del_btn' onClick={()=>onDelete(id)} src={delBtn} alt="" width={24} height={24} />
    </li>
  )
}


