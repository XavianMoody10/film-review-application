export const FormButton = ({ children }) => {
  return (
    <button className=" cursor-pointer border border-white text-white font-semibold py-2.5 rounded-sm tracking-wider hover:bg-white hover:text-black duration-150">
      {children}
    </button>
  );
};
