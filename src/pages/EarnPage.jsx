import { useEffect, useState } from "react";
import axios from "axios";
import { Title, DailyTasks, ListTasks, Logo, WrapperPage, Icons } from "../components";
import { SubPage, DailyTaskSubPage, XSubPage } from "./index.js";

const EarnPage = () => {
    const [dataPop, setDatapop] = useState({});
    const [isShow, setIsShow] = useState(false);
    const [isDailyShow, setIsDailyShow] = useState(false);
    const [isXShow, setIsXShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [dayli, setDayli] = useState({
        id: 1,
        title: "Daily Reward",
        desc: "Today you will receive",
        price: 5000,
        icon: <Icons.CalendarIcon />,
        completed: false,
    });

    const tg = window.Telegram.WebApp;
    const id = tg?.initDataUnsafe?.user?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get(`http://localhost:5000/api2/user/${id}`);
                const user = userRes.data;

                const tasksRes = await axios.get(`http://localhost:5000/api2/user-tasks/${id}`);
                const userTasks = tasksRes.data.tasks || [];

                const tasksWithDetails = await Promise.all(
                    userTasks.map(async (userTask) => {
                        const taskRes = await axios.get(`http://localhost:5000/api2/task/${userTask.id}`);
                        const task = taskRes.data;

                        return {
                            id: task.id,
                            title: task.title,
                            desc: task.desc,
                            price: task.price,
                            icon: task.id === 1 ? <Icons.TelegramIcon /> : <Icons.XIcon size={60} />,
                            completed: userTask.completed,
                        };
                    })
                );

                setDayli((prev) => ({
                    ...prev,
                    completed: user.day_claim,
                }));

                setTasks(tasksWithDetails);
                setIsLoad(true);
            } catch (error) {
                console.error("Ошибка загрузки данных", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleTaskCompletion = async (task) => {
        try {
            const response = await axios.get(`http://localhost:5000/api2/user/check-task/${id}/${task.id}`);
            if (response.data === 'Done') {
                setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
            } else {
                console.log(response.data); // Обработка ошибок
            }
        } catch (error) {
            console.error("Ошибка обновления задачи", error);
        }
    };

    return (
        <WrapperPage>
            <Logo width={200} />
            <Title fontSize="5xl">Earn more coins</Title>
            <DailyTasks 
                dayli={dayli} 
                click={() => setIsDailyShow(true)} 
            />
            <ListTasks 
                tasks={tasks} 
                isX={() => setIsXShow(true)} 
                setData={setDatapop} 
                click={() => setIsShow(true)} 
                handleTaskCompletion={handleTaskCompletion} 
            />
            <SubPage 
                setTask={setTasks} 
                dataPop={dataPop} 
                click={() => setIsShow(false)} 
                isShow={isShow} 
            />
            <DailyTaskSubPage 
                dailt={dayli.completed} 
                setDayli={setDayli} 
                click={() => setIsDailyShow(false)} 
                isShow={isDailyShow} 
            />
            <XSubPage 
                setTask={setTasks} 
                click={() => setIsXShow(false)} 
                isShow={isXShow} 
            />
        </WrapperPage>
    );
};

export default EarnPage;
