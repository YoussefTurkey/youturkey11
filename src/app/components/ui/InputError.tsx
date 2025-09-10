"use client";
import { FieldError } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";

type InputErrorProps = {
  error?: FieldError | string;
};

const InputError = ({ error }: InputErrorProps) => {
  // نستخرج الميسج سواء كانت string أو FieldError
  const message = typeof error === "string" ? error : error?.message;

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  return message ? <span className="text-red-400">{message}</span> : null;
};

export default InputError;
