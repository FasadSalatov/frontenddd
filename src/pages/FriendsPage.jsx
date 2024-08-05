import { GiftBox, ListFriend, SubTitle, Title, WrapperPage } from "../components";
import { bonusForTasks } from "../constants";
import { useState, useEffect } from "react";
import axios from 'axios';

const FriendsPage = () => {
    const tg = window.Telegram.WebApp;
    const id = tg?.initDataUnsafe?.user?.id;

    const [ref, setRef] = useState('');
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (id) {
            // Получение данных пользователя, включая реферальную ссылку
            axios.get(`/api2/user/${id}`).then((resp) => {
                // Здесь используйте реальные данные, возвращаемые сервером
                // Например, resp.data может содержать поле ref_link
                setRef(resp.data.ref_link || ''); 
            }).catch(error => console.error('Ошибка при получении данных пользователя:', error));
            
            // Получение списка рефералов пользователя
            axios.get(`/api2/user-referrals?user_id=${id}`).then((resp) => {
                setFriends(resp.data.items || []);
            }).catch(error => console.error('Ошибка при получении списка рефералов:', error));
        }
    }, [id]);

    const inviteFriends = () => {
        let a = document.createElement('a');
        a.href = ref;
        a.click();
    };

    return (
        <WrapperPage>
            <Title fontSize="5xl">Пригласите друзей!</Title>
            <SubTitle>Вы и ваш друг получите бонусы</SubTitle>
            {bonusForTasks.map((bonus) => (
                <GiftBox key={bonus.id} data={bonus} />
            ))}
            {friends.length > 0 ? (
                <ListFriend data={friends}/>
            ) : (
                <SubTitle>У вас нет рефералов</SubTitle>
            )}

            <a href={`https://telegram.me/share/url?url=${ref}`}>
                <button className="bg-[#50BAD8] rounded-3xl btn py-3 px-10 text-center text-lg mt-8">
                    Пригласить друзей
                </button>
            </a>
        </WrapperPage>
    );
};

export default FriendsPage;
