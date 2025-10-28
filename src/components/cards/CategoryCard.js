export const CategoryCard = ({ category, icon }) => {
    return (
        <div className="w-full bg-gray-100 rounded-lg shadow-sm flex flex-col items-center justify-center p-6 min-h-[12rem]">
            <i className={`${icon} mb-4 text-[4rem] text-[#3B82F6]`}></i>
            <h5 className="text-2xl font-bold tracking-tight text-[#0A236D]">{category}</h5>
        </div>
    );
}