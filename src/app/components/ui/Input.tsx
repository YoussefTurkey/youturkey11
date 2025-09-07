import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}

const Input: React.FC<InputProps> = ({ type, placeholder, register }) => {
  if (type === "textarea") {
    return (
      <textarea
        placeholder={placeholder}
        {...register}
        className="border border-[hsl(var(--third)_/_20%)] focus:border-[hsl(var(--secondary))] text-[hsl(var(--third))] rounded-lg p-3 w-full h-40 resize-none"
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      className="border border-[hsl(var(--third)_/_20%)] focus:border-[hsl(var(--secondary))] text-[hsl(var(--third))] rounded-lg p-3 w-full"
    />
  );
};

export default Input;
