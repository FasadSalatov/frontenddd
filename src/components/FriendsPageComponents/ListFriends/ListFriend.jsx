
import { Title, ListFriendCard } from "../../index";

const ListFriend = (data) => {
    const lenght = [data.data].length
    console.log('lenght', data.data)
    return (
        <div className="mt-3 w-full">
            <Title fontSize="2xl">A list of your friends ({lenght})</Title>
            <div>
                {data?.data?.map((friend) => (
                    <ListFriendCard key={friend.ref_id} data={friend} />
                ))}
            </div>
        </div>
    );
};

export default ListFriend;
