const Input = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
  }) => {
    return (
      <div className="mb-5">
  
        <label className="block mb-2 text-gray-800 font-semibold">
          {label}
        </label>
  
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
          w-full
          h-14
          px-5
          rounded-2xl
          border
          border-slate-300
          bg-white
          shadow-sm
          outline-none
          transition-all
          duration-300
          focus:ring-4
          focus:ring-cyan-100
          focus:border-cyan-500
          placeholder:text-gray-400
          "
        />
  
      </div>
    );
  };
  
  export default Input;