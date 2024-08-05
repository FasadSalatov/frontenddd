import { Icons } from "..";

const GiftBox = ({ data }) => {
    return (
        <div className=" w-full mt-3 bg-[#0B1B28]  rounded-[22px] py-3  border-t-8 border-solid border-[#eca275] px-4  flex items-center justify-start gap-3 text-white">
            <div className="min-w-14">
                <Icons.GiftIcon />
            </div>
            <div>
                <div className="flex items-end gap-1 text-xl font-semibold">
                    <h4 className="max-w-[175px] line-clamp-2">{data.title} </h4>
                    <div className="min-w-7  pb-1">
                        <Icons.CircleMiniIcon />
                    </div>
                </div>
                <p className="text-sm">
                    <span className="text-[#EEA274]">+{data.price}</span> for you and your friend
                </p>
            </div>
        </div>
    );
};

export default GiftBox;
