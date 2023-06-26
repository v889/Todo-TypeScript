/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
import {v4 as uuidv4} from 'uuid'

//console.log(uuidv4())
const list=document.querySelector<HTMLUListElement>('#list')
const form=document.querySelector('#task-form') as HTMLFormElement | null
const input=document.querySelector<HTMLInputElement>('#task-title')
type Task={
  id:string
  title:string
  isComplete:boolean
  createdAt:Date
}
const tasks:Task[]=loadTasks()
tasks.forEach(addTask)

form?.addEventListener("submit",e=>{
  console.log(input?.value)
  e.preventDefault()
  if(input?.value==='' || input?.value===null) return
  const task:Task={
    id:uuidv4(),
    title:input.value,
    isComplete:false,
    createdAt:new Date(),

  }
  tasks.push(task)
  saveTasks()
  addTask(task)
  input.value=""
}
)
function addTask(task:Task):boolean{
  const todo=document.createElement('li')
  const label=document.createElement('label')
  const checkbox=document.createElement('input')
  checkbox.type='checkbox'
  checkbox.addEventListener("change",()=>{
    task.isComplete=!task.isComplete
    saveTasks()
  })
  label.append(checkbox,task.title)
  checkbox.checked=task.isComplete
  todo.append(label)
  list?.append(todo)
  return true

}
function saveTasks()
{
  localStorage.setItem("Tasks",JSON.stringify(tasks))
}

function loadTasks():Task[]{
  const taskLocal=localStorage.getItem("Tasks")
  if(taskLocal===null) return []
  return JSON.parse(taskLocal)
}