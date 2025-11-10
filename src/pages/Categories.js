import { CategoryCard } from '../components/cards/CategoryCard';

export default function Categories() {
    const categories = [
        { name: 'Education', icon: 'fa fa-book' },
        { name: 'Technology', icon: 'fa fa-laptop' },
        { name: 'Transport', icon: 'fa fa-bicycle' },
        { name: 'Furniture', icon: 'fa fa-couch' },
        { name: 'Clothes', icon: 'fa fa-tshirt' },
        { name: 'Sport', icon: 'fa fa-football-ball' },
        { name: 'Other', icon: 'fa fa-ellipsis-h' }
    ];

    return (
        <div className='flex flex-col items-center px-6 py-8 mx-auto'>

            <h1 className="mt-2 text-[2rem] justify-center font-bold leading-tight tracking-tight text-[#0A236D]">
                Categories
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 justify-center w-full max-w-6xl">
                {categories.map((category) => (
                    <CategoryCard key={category.name} category={category.name} icon={category.icon} />
                ))}
            </div>
        </div >
    )
}
