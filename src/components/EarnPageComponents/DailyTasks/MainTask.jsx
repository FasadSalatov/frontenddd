import { Icons } from "../..";

const MainTask = ({ data, click }) => {
    console.log('MainTask', data)
    return (
        <div onClick={() => click(true)} className=" w-full mt-3 bg-[#0B1B28]  rounded-[22px] py-3  border-t-8 border-solid  border-[#24acce] px-3  flex items-center justify-between gap-1 text-white">
            <div className="flex items-center">
                <div className="min-w-14">{data.icon}</div>
                <div>
                    <div className="flex items-end gap-1 text-xl font-semibold">
                        <h4 className="max-w-[175px]">{data.title}</h4>
                        <div className="min-w-7  pb-1">
                            <Icons.CircleMiniIcon />
                        </div>
                    </div>
                    <p className="text-sm">
                        {data.desc} <span className="text-[#EEA274]">{data.price}</span>
                    </p>
                </div>
            </div>
            {data.completed ? (
                <div className="w-5 h-5 bg-custom-gradient rounded-full"></div>
            ) : (
                <div className="w-5 h-5  border-4 border-solid border-cyan-500 rounded-full"></div>
            )}
        </div>
    );
};

export default MainTask;
