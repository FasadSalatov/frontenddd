import axios from 'axios';
import { useState, useEffect } from "react";
import { Icons, Title } from "../components";

const SubPage = ({ isShow, click, dataPop, setTask }) => {
    const tg = window.Telegram.WebApp;
    const id = tg?.initDataUnsafe?.user?.id;

    const [subscribed, setSubscribe] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api2/user/${id}`);
                const userData = response.data;
                setSubscribe(userData.tg_sub || false);

                setTask([
                    {
                        id: 1,
                        title: "Sub to us on Telegram",
                        desc: "Today you will receive",
                        price: 5000,
                        icon: <Icons.TelegramIcon />,
                        completed: userData.tg_sub || false,
                    },
                    {
                        id: 2,
                        title: "Sub to us on X",
                        desc: "Today you will receive",
                        price: 5000,
                        icon: <Icons.XIcon size={60} />,
                        completed: localStorage.getItem('subX') || false,
                    },
                ]);

            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id, setTask]);

    const onHandleChekSubscription = () => {
        axios.post('https://telegrams.su/api/api/check_subscription', null, {
            params: {
                "user_id": id,
                "telegram_channel_id": '-1002161356301',
            }
        })
            .then((resp) => {
                const isSubscribed = resp.data.subscribed;

                setSubscribe(isSubscribed);
                localStorage.setItem('subT', isSubscribed);

                if (isSubscribed) {
                    axios.get(`/api2/user/check-task/${id}/1`)  // Проверка задачи
                        .then(() => {
                            axios.post('/api2/user/update-balance', {
                                "user_id": id,
                                "amount": 5000,
                                "daily": true,
                                "limit": 0
                            });
                        });
                }

                setTask((prevTasks) => prevTasks.map(task =>
                    task.id === 1 ? { ...task, completed: isSubscribed } : task
                ));

                click(false);
            })
            .catch(error => {
                console.error("Error checking subscription", error);
            });
    };

    const onHandleClose = () => {
        click(false);
    };

    const onHandleSubscribe = () => {
        window.location.href = 'https://t.me/test_clicker';
    };

    return (
        <div
            style={{
                position: "fixed",
                zIndex: 100,
                transition: "0.8s",
                top: isShow === true ? "30vh" : "100vh"
            }}
            className="flex items-center flex-col  w-[100vw] h-full mt-3 bg-[#0B1B28]  rounded-[22px] pb-3  border-t-8 border-solid  border-[#24acce] px-5  gap-1 text-white">
            <div className="-mt-8">
                <Icons.TelegramIcon size={250} />
            </div>
            <Title fontSize="3xl">Sub to us on Telegram</Title>
            {!subscribed ? (
                <button className="bg-[#50BAD8] rounded-3xl btn py-3 px-10 text-center text-lg mt-4" onClick={onHandleSubscribe}>Subscribe</button>
            ) : null}

            <span className="mt-5 flex items-center gap-2 text-lg">
                +5 000 <Icons.CircleMiniIcon />
            </span>

            {!subscribed ? (
                <button className="bg-[#194754]  rounded-3xl  py-3 px-10 text-center mt-4" onClick={onHandleChekSubscription}>Check it</button>
            ) : (
                <button className="bg-[#194754]  rounded-3xl  py-3 px-10 text-center mt-4" onClick={onHandleClose}>Close</button>
            )}
        </div>
    );
};

export default SubPage;
