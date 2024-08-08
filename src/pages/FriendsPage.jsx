import { GiftBox, ListFriend, SubTitle, Title, WrapperPage } from "../components";
import { bonusForTasks } from "../constants";
import { useState, useEffect } from "react";
import axios from 'axios';

const FriendsPage = () => {
    const tg = window.Telegram.WebApp;
    const id = tg?.initDataUnsafe?.user?.id; // Get the user ID from the Telegram WebApp

    const [ref, setRef] = useState(''); // State to store the referral link
    const [friends, setFriends] = useState([]); // State to store the list of referred friends

    useEffect(() => {
        if (id) {
            // Fetching user data, including the referral link
            axios.get(`/api2/user/${id}`)
                .then((resp) => {
                    // Generate the referral link
                    const referralLink = `https://t.me/zibuuu_bot?start=${id}`;
                    setRef(referralLink);
                })
                .catch(error => console.error('Error fetching user data:', error));

            // Fetching the list of user's referrals
            axios.get(`/api2/user-referrals?user_id=${id}`)
                .then((resp) => {
                    // Set the list of friends returned by the server
                    setFriends(resp.data.items || []);
                })
                .catch(error => console.error('Error fetching referral list:', error));
        }
    }, [id]);

    const inviteFriends = () => {
        window.location.href = `https://telegram.me/share/url?url=${ref}`;
    };

    return (
        <WrapperPage>
            <Title fontSize="5xl">Invite your friends!</Title>
            <SubTitle>You and your friend will receive bonuses</SubTitle>
            {/* Display bonuses for tasks */}
            {bonusForTasks.map((bonus) => (
                <GiftBox key={bonus.id} data={bonus} />
            ))}
            {/* Display the list of referred friends */}
            {friends.length > 0 ? (
                <ListFriend data={friends} />
            ) : (
                <SubTitle>You have no referrals</SubTitle>
            )}
            {/* Button to share the referral link via Telegram */}
            <button className="bg-[#50BAD8] rounded-3xl btn py-3 px-10 text-center text-lg mt-8" onClick={inviteFriends}>
                Invite Friends
            </button>
        </WrapperPage>
    );
};

export default FriendsPage;
