import React from 'react';

function Input({
  inputText,
  inputValue,
  placeHolderText,
  onChange,
  inputWidth,
  pWidth,
}) {
  return (
    <div className="w-full flex items-center gap-4">
      <p className={pWidth}>{inputText}</p>
      <input
        type="text"
        value={inputValue}
        placeholder={placeHolderText}
        onChange={onChange}
        className={`p-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black ${inputWidth} my-3 shadow-md`}
      />
    </div>
  );
}

export default Input;
