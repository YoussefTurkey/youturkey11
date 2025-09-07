"use client";
import { FieldError } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";

const InputError = ({ error }: { error: FieldError | undefined }) => {
  useEffect(() => {
    if (error?.message) {
      toast.error(error.message); 
    }
  }, [error]);

  return error ? <span className="text-red-400">{error.message}</span> : null;
};

export default InputError;
