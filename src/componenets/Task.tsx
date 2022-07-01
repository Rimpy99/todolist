import {useState} from 'react';
import "./Task.css";
import { MdDeleteForever } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

//INTEFACES FOR TYPESCRIPT

interface Props{
    taskData: TaskTemplate;
    taskDeleteFunction: (id: string)=>void;
}

interface TaskTemplate {
    taskName: string;
    taskCategory: string;
    taskCategoryId: number;
    taskId: string;
}

//VARIANTS FOR ANIMATIONS

const taskVariant = {
    hidden: { 
        scale: .5,
    },
    visible: { 
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 50,
            duration: .5,
        }
    },
}

const Task: React.FC<Props> = ({taskData, taskDeleteFunction}) => {

    const [taskIsDone, setTaskIsDone] = useState<boolean>(false);

    return(
        <AnimatePresence>
            <motion.div 
                className={`task ${taskIsDone ? "task-done" : null}`} 
                variants={taskVariant}
                initial="hidden"
                animate="visible"
                exit={{y: 20}}
            >
                <div className="task-header">
                    <div className={`category-block category-id-${taskData.taskCategoryId}`}/>
                    <div className="task-buttons">
                        <div className="task-buttons-container">
                            <BsBookmarkCheckFill size="20" color="rgb(2, 0, 114)" cursor="pointer" onClick={()=>setTaskIsDone(!taskIsDone)}/>
                        </div>
                        <div className="task-buttons-container">
                            <MdDeleteForever size="27" color="rgb(2, 0, 114)" cursor="pointer" onClick={()=>taskDeleteFunction(taskData.taskId)}/>
                        </div>
                    </div>
                </div>
                <div className="task-name-container">
                    <h2>{taskData.taskName}</h2>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Task;