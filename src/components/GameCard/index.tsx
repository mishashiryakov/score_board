type Props = {
  homeName: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
};

export const GameCard = ({
  homeName,
  awayName,
  homeScore,
  awayScore,
}: Props) => {
  return (
    <div className="flex justify-between bg-gradient-to-r from-red-500 via-pink-500 to-pink-700 text-white font-bold text-3xl py-4 px-10 rounded-lg shadow-lg">
      <h3>{homeName}</h3>
      <div>
        <p>
          {homeScore} : {awayScore}
        </p>
      </div>
      <h3>{awayName}</h3>
    </div>
  );
};
