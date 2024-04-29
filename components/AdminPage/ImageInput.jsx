import React, { InputHTMLAttributes, ReactNode } from "react";

export default function ImageInput({ id, onChange, children, ...rest }) {
  if (children) rest.hidden = true;
  else rest.hidden = false;

  return (
    <label htmlFor={id}>
      <input
        type="file"
        id={id}
        onChange={onChange}
        accept="image/*"
        {...rest}
      />
      <div className="flex items-center justify-center w-20 h-20 border border-gray-700 rounded cursor-pointer">
        {children}
      </div>
    </label>
  );
}
