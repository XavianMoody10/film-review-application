export const CastProfileCard = ({ profile_path, name }) => {
  const profilePath = `https://image.tmdb.org/t/p/original${profile_path}`;

  return (
    <div className=" flex flex-col items-center gap-2">
      <img src={profilePath} alt="" className=" w-full" />
      <span className=" text-white tracking-wider">{name}</span>
    </div>
  );
};
