import Task from './componenets/Task';
import {useState} from 'react';
import './App.css';
import './App-responsive.css';
import { SiAddthis } from "react-icons/si";
import { motion } from 'framer-motion';

//INTERFACES FOR TYPESCRIPT

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

//VARIANTS FOR ANIMATIONS

const headerH1Variants = {
  hidden: { y: "-100vh" },
  visible: { 
    y: 0,
    transition: { 
      ease: "easeInOut",
      duration: 1.5, 
    }
  },
}

const inputVariants = {
  hidden: { x: "-100vw" },
  visible: { 
    x: 0,
    transition: { 
      duration: .5, 
    }
  },
}

const addBtnVariants = {
  hidden: { x: "100vw" },
  visible: { 
    x: 0,
    transition: { 
      duration: .5, 
    }
  },
}

const categoryVariants = {
  hidden: {
    y: "100vh",
    opacity: 0, 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { 
      duration: 1.2, 
    }
  },
}

const sortContainerVaraints = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      delay: 1.5,
    }
  }
}

//MAIN APP

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
        <motion.h1
          variants={headerH1Variants}
          initial="hidden"
          animate="visible"
        >
          TO DO LIST
        </motion.h1>
      </header>
      <div className="task-creator">
        <div className="task-creator__input-container">
          <motion.input 
            type="text" 
            value={newTaskName} 
            placeholder="Add a task" 
            maxLength={35} 
            className="task-creator__input" 
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setNewTaskName(event.target.value)}
          />
          <motion.div className={inputIsChecked && (newTaskName !== "") ? "" : "input-not-checked"} variants={addBtnVariants} initial="hidden" animate="visible" whileHover={{scale:1.1}}>
            <SiAddthis 
              size="55" 
              color="rgb(2, 0, 114)" 
              cursor="pointer"
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
          </motion.div>
        </div>
        <div className="task-creator__categories-container">
          {categoryInputs.map(({categoryName, categoryId})=>{
            return (
              <motion.div variants={categoryVariants} initial="hidden" animate="visible" whileHover={{scale: 1.1}}>
                <input type="radio" name="category-input" value={categoryName} id={`${categoryId}`} className={`category-input input-${categoryId}`} onChange={()=>setInputIsChecked(true)} onClick={()=>setNewTaskCategory({
                  categoryName: categoryName,
                  categoryId: categoryId,
                })}/>
                <motion.label 
                  htmlFor={`${categoryId}`} 
                  className={`category-label category-${categoryId}`}
                >{categoryName}</motion.label>
              </motion.div>
            )
          })}
        </div>
      </div>
      <motion.div className="sort-container" variants={sortContainerVaraints} initial="hidden" animate="visible">
        <motion.button className="sort-btn" onClick={()=>sortTable()} whileHover={{scale: 1.1}} transition={{type: "easeInOut", duration: .2}}>Sort by priority</motion.button>
      </motion.div>
      <div className="task-container">
        {tasks.map(taskData=>{
          return <Task taskData={taskData} taskDeleteFunction={deleteTask}/>
        })}
      </div>
    </div>
  );
}

export default App;
