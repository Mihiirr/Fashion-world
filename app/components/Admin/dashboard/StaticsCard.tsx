type Props = {
  title: string;
  amount: string;
  description: string;
};

const StaticsCard = ({ title, amount, description }: Props) => {
  return (
    <div className="h-52 w-52 border-2 border-gray-200 bg-white rounded-md mb-20 mr-12">
      <div className="h-32 border-b-2 border-gray-200 flex flex-col items-center justify-center">
        <p className="mb-2 text-2xl">{title}</p>
        <p className="text-xl">{amount}</p>
      </div>
      <div className="h-20 flex items-center justify-center text-lg">
        {description}
      </div>
    </div>
  );
};

export default StaticsCard;
