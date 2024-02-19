import React from 'react';

function Input({ inputText, inputValue, placeHolderText, onChange, width }) {
  return (
    <div className="w-full flex items-center gap-4">
      <p className="w-1/5 ">{inputText}</p>
      <input
        type="text"
        value={inputValue}
        placeholder={placeHolderText}
        onChange={onChange}
        className={`p-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black ${width} my-3 shadow-md`}
      />
    </div>
  );
}

export default Input;
