import { infoSectionTitleItemsMinePage } from "../../../constants";

const InfoSectionTitle = () => {
    return (
        <div className="w-full mt-3 bg-[#0B1B28]  rounded-t-3xl py-2  border-t-[3px] border-solid border-[#24acce] px-4  flex items-center justify-between gap-3 text-white">
            <ul className="grid grid-cols-4 w-full font-semibold">
                {infoSectionTitleItemsMinePage.map((item) => (
                    <li className="text-center text-sm" key={item.id}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InfoSectionTitle;
