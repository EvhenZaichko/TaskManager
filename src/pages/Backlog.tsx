import BacklogItem from "../components/BacklogItem.tsx";
import {useAppSelector} from "../store";
import {useState} from "react";


const Backlog = () => {
    const [activeItem, setActiveItem] = useState<string | null >(null)

    const backlogItems = useAppSelector((state) => state.tasks.items.filter(item => item.status === 'backlog'))

    return (
        <div className="flex flex-col items-center ">
            <div className="flex mr-auto ml-10 pb-10">
                <input type="text"
                       placeholder="Search item..."
                       className="bg-black outline-1 px-2 py-2 text-white rounded-xl"/>
            </div>
            {backlogItems.length > 0 ? (
                <div className="flex flex-col w-full gap-2 ">
                    {backlogItems.map(item => (
                        <BacklogItem task={item} key={item.id} activeItem={activeItem} setActiveItem={setActiveItem} />
                    ))}
                </div>
            ) : (
                <div className="font-bold text-3xl">
                    No Backlog Items Yet
                </div>
            )}

        </div>
    );
};

export default Backlog;