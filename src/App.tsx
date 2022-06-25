import Task from './componenets/Task';
import {useState} from 'react';
import './App.css';
import './App-responsive.css';
import { SiAddthis } from "react-icons/si";

interface TaskTemplate {
  taskName: string;
  taskCategory: string;
  taskCategoryId: number;
  taskId: string;
}

interface CategoryTemplate {
  categoryName: string;
  categoryId: number;
}

interface Functions {
  deleteTask: (id: string)=>void;
}

const App: React.FC = () =>{

  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskCategory, setNewTaskCategory] = useState<CategoryTemplate>({
    categoryName: '',
    categoryId: 1,
  });

  const [tasks, setTasks] = useState<TaskTemplate[]>([]);
  
  const [inputIsChecked, setInputIsChecked] = useState<boolean>(false);

  const [sort, setSort] = useState<string>("ascending");

  const categoryInputs: CategoryTemplate[] = [
    {
      categoryName:'Low Priority',
      categoryId:1,
    },
    {
      categoryName:'Medium Priority', 
      categoryId: 2,
    },
    {
      categoryName: 'High Priority', 
      categoryId: 3,
    }];

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(e=>e.taskId !== id);
    setTasks(newTasks);
  }

  const sortTable = () =>{
    if(sort === "descending"){
      setSort("ascending");
    }else if(sort === "ascending"){
      setSort("descending");
    }

    if(sort === "ascending"){
      setTasks(tasks.sort((p1,p2)=>{
        return p2["taskCategoryId"] - p1["taskCategoryId"];
      }))
    }else if(sort === "descending"){
      setTasks(tasks.sort((p1,p2)=>{
        return p1["taskCategoryId"] - p2["taskCategoryId"];
      }))
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>TO DO LIST</h1>
      </header>
      <div className="task-creator">
        <div className="task-creator__input-container">
          <input type="text" value={newTaskName} placeholder="Add a task" maxLength={35} className="task-creator__input" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setNewTaskName(event.target.value)}/>
          <div className={inputIsChecked && (newTaskName !== "") ? "" : "input-not-checked"}>
            <SiAddthis size="55" color="rgb(2, 0, 114)" cursor="pointer"
              onClick={()=>{
                setTasks((current)=>[...current,{
                  taskName: newTaskName,
                  taskCategory: newTaskCategory.categoryName ? newTaskCategory.categoryName : 'Low Priority',
                  taskCategoryId: newTaskCategory.categoryId ? newTaskCategory.categoryId : 1,
                  taskId: Date.now().toString(),
                }])
                
                setNewTaskName("");
              }}
            />
          </div>
        </div>
        <div className="task-creator__categories-container">
          {categoryInputs.map(({categoryName, categoryId})=>{
            return (
              <div>
                <input type="radio" name="category-input" value={categoryName} id={`${categoryId}`} className={`category-input input-${categoryId}`} onChange={()=>setInputIsChecked(true)} onClick={()=>setNewTaskCategory({
                  categoryName: categoryName,
                  categoryId: categoryId,
                })}/>
                <label htmlFor={`${categoryId}`} className={`category-label category-${categoryId}`}>{categoryName}</label>
              </div>
            )
          })}
        </div>
      </div>
      <div className="sort-container">
        <button className="sort-btn" onClick={()=>sortTable()}>Sort by priority</button>
      </div>
      <div className="task-container">
        {tasks.map(taskData=>{
          return <Task taskData={taskData} taskDeleteFunction={deleteTask}/>
        })}
      </div>
    </div>
  );
}

export default App;
