'use client'

import styles from './page.module.css';
import { createRef, useRef, useState } from 'react';
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
      if(id === index){
        todosCopy.splice(index,1);
      }
    });
    setTodos(todosCopy);
  }

  const editTask = (id, newtask) => {
    const todosCopy = state.slice();
    todosCopy.forEach((item, index) => {
      if(id === index){
        todosCopy[index] = newtask;
      }
    });
    setTodos(todosCopy);
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
  let inEditMode = false;
  const editRef = createRef(null);

  function setEditMode(){
    inEditMode = true;
    const inp = editRef.current;
    inp.classList.remove('hidden');
    inp.value = task;

    inp.onkeyup = (e) => {
      if(e.key === 'Enter'){
        let newtask = inp.value;
        inp.classList.add('hidden');
        onEdit(id, newtask);
      }
    }
  }


  return (
    <li data-id={id}>
      {task}
      <input ref={editRef} className='hidden' type="text" />
      <Image className='task_btn edit_btn' onClick={()=>setEditMode()} src={editBtn} alt="" width={24} height={24} />
      <Image className='task_btn del_btn' onClick={()=>onDelete(id)} src={delBtn} alt="" width={24} height={24} />
    </li>
  )
}


