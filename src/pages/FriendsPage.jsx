import { GiftBox, ListFriend, SubTitle, Title, WrapperPage } from "../components";
import { bonusForTasks } from "../constants";
import { useState, useEffect } from "react";
import axios from 'axios'

const FriendsPage = () => {
    const tg = window.Telegram.WebApp
    //const id = '286133104'
    const id = tg?.initDataUnsafe?.user?.id

    const [ref, setRef] = useState();
    const [friends, setFriends] = useState();

    useEffect(() => {

        axios.get(`https://telegrams.su/api/api/user-data?user_id=${id}`).then((resp) => {
            setRef(resp.data.ref_link);
        });
        
        if (!friends) {
            axios.get(`https://telegrams.su/api/api/user-referrals?user_id=${id}`).then((resp) => {
                // setRef(resp.data.ref_link);
                console.log('>>>', resp.data.items)
                setFriends(resp.data.items)
            });
        }
    });


    const inviteFriends = () => {
        let a = document.createElement('a')
        console.log(ref)
        a.href = ref
        a.click()
    }


    return (
        <WrapperPage>
            <Title fontSize="5xl">Invite friends!</Title>
            <SubTitle>You and your friend will receive bonuses</SubTitle>
            {bonusForTasks.map((bonus) => (
                <GiftBox key={bonus.id} data={bonus} />
            ))}
            {friends ? (
                <ListFriend data={friends}/>
            ) : (
                <SubTitle>
                    you have not referrals
                </SubTitle>
            )}

            <a href={`https://telegram.me/share/url?url=${ref}`}> <button className="bg-[#50BAD8] rounded-3xl btn py-3 px-10 text-center text-lg mt-8">Invite Friends</button></a>
        </WrapperPage>
    );
};

export default FriendsPage;
