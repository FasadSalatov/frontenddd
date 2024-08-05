import { dailyTaskItems } from "../../../constants";
import MainTask from "./MainTask";

const DailyTasks = ({click, dayli}) => {
    console.log('DailyTasks?');
    return (
        <div className="w-full mt-8">
            <h2 className="font-semibold mb-3 text-white text-2xl text-left">Daily tasks</h2>
            <MainTask key={dayli.id} click={click}  data={dayli} />
        </div>
    );
};

export default DailyTasks;
