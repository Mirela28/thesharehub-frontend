import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../../contexts/UserContext';

export const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/itempost/${item.id}`);
    }
  };

  return (
    <div
      data-cy="item-card"
      className="w-full bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center min-h-[12rem] hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <img
        src={`data:image/jpeg;base64,${item.image}`}
        alt={item.name || 'Item image'}
        className="w-full h-[12rem] object-cover rounded mb-3"
      />
      <h5 className="text-xl font-semibold text-[#0A236D] text-center">{item.name}</h5>
      <p className="text-md font-medium text-gray-700">{item.price}€/day</p>
    </div>
  );
};