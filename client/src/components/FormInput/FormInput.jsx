export const FormInput = ({ type, placeholder, onChangeEvent }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className=" bg-white p-2.5 rounded-sm outline-none tracking-wider"
      onChange={onChangeEvent}
    />
  );
};
