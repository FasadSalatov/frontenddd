import axios from 'axios'
import { useState } from "react";
import { Icons, Title } from "../components";

const DailyTaskSubPage = ({isShow, click, setDayli,dailt}) => {

    // localStorage.removeItem("daily");

    const [daily, setDaily] = useState(JSON.parse(localStorage.getItem('subD')));

    const tg = window.Telegram.WebApp
    //const id = '6649152147'
    const id = tg?.initDataUnsafe?.user?.id
    
    const onHandleDailyGet = () => {
        console.log('onHandleDailyGet')
        axios.post('https://telegrams.su/api/api/update-personal-balance', {
            "user_id": id,
            "amount": 5000,
            "daily": true,
            "limit": 0
          })
        .then((resp) => {

            axios.get(`https://telegrams.su/api/api/user-data?user_id=${id}`).then((resp) => {
                setDayli({
                    id: 1,
                    title: "Daily Reward",
                    desc: "Today you will receive",
                    price: 5000,
                    icon: <Icons.CalendarIcon />,
                    completed: true,
                })
                localStorage.setItem('subD', resp.data.daily);
                setDaily(resp.data.daily)
                console.log('user-data', resp)
            });

            click(false)
            // return appState
        });
    };

    console.log('daily', daily)

    const onHandleClose  = () => {
        click(false)
    }

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
                <Icons.CalendarIcon size={250}/>
            </div>
            <Title fontSize="3xl">Daily task</Title>
            
            <span className="mt-7 mb-3 flex items-center gap-2 text-lg">
                    +5 000 <Icons.CircleMiniIcon/>
                </span>

            {!dailt ? (
                <button className="bg-[#194754]  rounded-3xl  py-3 px-10 text-center mt-4" onClick={() => onHandleDailyGet()}>Get it</button>
            ) : (
                <button className="bg-[#194754]  rounded-3xl  py-3 px-10 text-center mt-4" onClick={() => onHandleClose()}>Close</button>
            )}
        </div>
    );
};

export default DailyTaskSubPage;
