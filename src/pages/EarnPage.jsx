import { Title, DailyTasks, ListTasks, Logo, WrapperPage, Icons } from "../components";
import { SubPage, DailyTaskSubPage, XSubPage } from "./index.js";
import { useEffect, useState } from "react";
import axios from "axios";

const EarnPage = () => {
    const [dataPop, setDatapop] = useState({});
    const [isShow, setIsShow] = useState(false);
    const [isDailyShow, setIsDailyShow] = useState(false);
    const [isXShow, setIsXShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const tg = window.Telegram.WebApp;
    const id = tg?.initDataUnsafe?.user?.id;

    const [dayli, setDayli] = useState({
        id: 1,
        title: "Daily Reward",
        desc: "Today you will receive",
        price: 5000,
        icon: <Icons.CalendarIcon />,
        completed: localStorage.getItem('subD'),
    });
    const ListTasks = ({ tasks, isX, setData, click, handleTaskCompletion }) => {
        return (
            <div>
                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        <div className="task-icon">{task.icon}</div>
                        <div className="task-details">
                            <h3>{task.title}</h3>
                            <p>{task.desc}</p>
                        </div>
                        <div className="task-reward">
                            <span>{task.price}</span>
                            <button onClick={() => handleTaskCompletion(task)}>Complete</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const userRes = await axios.get(`https://telegrams.su/api/api/user-data?user_id=${id}`);
                const userTasksRes = await axios.get(`https://telegrams.su/api/api/user-tasks?user_id=${id}`);
                
                const user = userRes.data;
                const userTasks = await Promise.all(
                    userTasksRes.data.map(async (userTask) => {
                        const taskRes = await axios.get(`https://telegrams.su/api/api/task/${userTask.task_id}`);
                        const task = taskRes.data;

                        return {
                            id: task.id,
                            title: task.title,
                            desc: task.description,
                            price: task.price,
                            icon: task.id === 1 ? <Icons.TelegramIcon /> : <Icons.XIcon size={60} />,
                            completed: userTask.completed,
                        };
                    })
                );

                setDayli({
                    id: 1,
                    title: "Daily Reward",
                    desc: "Today you will receive",
                    price: 5000,
                    icon: <Icons.CalendarIcon />,
                    completed: user.daily,
                });

                setTasks(userTasks);
                setIsLoad(true);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchTasks();
    }, [id]);

    const handleTaskCompletion = async (task) => {
        try {
            await axios.put(`https://telegrams.su/api/api/update-user-task/${task.id}`, {
                user_id: id,
                task_id: task.id,
                completed: true,
                date_completed: new Date().toISOString().split('T')[0]
            });

            // Плавное удаление выполненной задачи
            setTasks((prevTasks) => prevTasks.filter(t => t.id !== task.id));
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    return (
        <WrapperPage>
            <Logo width={200} />
            <Title fontSize="5xl">Earn more coins</Title>
            <DailyTasks dayli={dayli} click={setIsDailyShow} />
            <ListTasks tasks={tasks} isX={setIsXShow} setData={setDatapop} click={setIsShow} handleTaskCompletion={handleTaskCompletion} />

            <SubPage setTask={setTasks} dataPop={dataPop} click={setIsShow} isShow={isShow} />
            <DailyTaskSubPage dailt={dayli.completed} setDayli={setDayli} click={setIsDailyShow} isShow={isDailyShow} />
            <XSubPage setTask={setTasks} click={setIsXShow} isShow={isXShow} />
        </WrapperPage>
    );
};


export default EarnPage;
