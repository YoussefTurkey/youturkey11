import React, { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface InputProps {
  type: "text" | "textarea" | "select" | "file" | "email" | "password";
  placeholder?: string;
  register?: UseFormRegisterReturn;
  value?: string;
  accept?: string; // جديد للـ file input
  onChange?: (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => void;
  options?: Option[];
  disabled? : boolean
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  register,
  value,
  onChange,
  accept,
  options,
  disabled
}) => {
  if (type === "textarea") {
    return (
      <textarea
        placeholder={placeholder}
        {...register}
        value={value}
        cols={10}
        rows={10}
        onChange={onChange}
        className={`col-span-2 sm:col-span-1 border border-[hsl(var(--third)_/_20%)] focus:border-[hsl(var(--secondary))] text-[hsl(var(--third))] rounded-lg p-3 w-full h-40 resize-none`}
      />
    );
  }

  if (type === "select") {
    return (
      <select
        {...register}
        value={value}
        onChange={onChange}
        className="col-span-2 sm:col-span-1 cursor-pointer border border-[hsl(var(--third)_/_20%)] focus:border-[hsl(var(--secondary))] text-[hsl(var(--third))] rounded-lg p-3 w-full"
      >
        {options?.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[hsl(var(--background))]"
          >
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (type === "file") {
    return (
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="col-span-2 w-full cursor-pointer border border-[hsl(var(--third)_/_20%)] focus:border-[hsl(var(--secondary))] text-[hsl(var(--third))] rounded-lg p-3"
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      value={value}
      onChange={onChange}
      disabled = {disabled}
      className={`${disabled ? 'cursor-not-allowed' : 'cursor-auto'} col-span-2 sm:col-span-1 border border-[hsl(var(--third)_/_20%)] focus:border-[hsl(var(--secondary))] text-[hsl(var(--third))] rounded-lg p-3 w-full`}
    />
  );
};

export default Input;
