import { Icons } from "../..";

const ListFriendCard = ({data}) => {
    console.log('ListFriendCard', data)
    return (
        <div className="bg-[#0B1B28]  rounded-lg py-5 px-5 flex justify-between gap-2 items-center mt-3">
            <div className="flex items-center">
                <div className="min-w-[40px]">
                    <Icons.UserIcon />
                </div>
                <h3 className="text-white font-semibold line-clamp-1">{data.user_name}</h3>
            </div>
            <span className="text-[#57D9FC] font-semibold">+{data.mined_money}</span>
        </div>
    );
};

export default ListFriendCard;
