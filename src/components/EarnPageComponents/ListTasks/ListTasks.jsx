import ListTaskItem from "./ListTaskItem";

const ListTasks = ({ click, setData, isX, tasks }) => {
    // Проверяем, что массив задач существует и содержит элементы
    if (!tasks || tasks.length === 0) {
        return <div>No tasks available</div>;
    }

    return (
        <div className="w-full mt-4">
            <h2 className="font-semibold mb-3 text-white text-2xl text-left">List of tasks</h2>
            {tasks.length > 0 && (
                <ListTaskItem click={click} key={tasks[0].id} data={tasks[0]} />
            )}
            {tasks.length > 1 && (
                <ListTaskItem click={isX} key={tasks[1].id} data={tasks[1]} />
            )}
        </div>
    );
};

export default ListTasks;
