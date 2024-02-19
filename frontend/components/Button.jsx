/* eslint-disable no-nested-ternary */
function Button({ handleFunction, buttonText, buttonColor }) {
  const baseClass =
    'w-fit text-black border self-center p-2 rounded-md transition duration-300 ease-in-out shadow-md tracking-widest hover:scale-105';

  const colorClass =
    buttonColor === 'red'
      ? 'bg-red-200 border-red-300 hover:bg-red-300 font-semibold'
      : buttonColor === 'green'
        ? 'bg-green-200 border-green-300 hover:bg-green-300 font-semibold'
        : 'bg-blue-200 border-blue-300 hover:bg-blue-300 font-semibold';

  return (
    <div className="w-full flex justify-center">
      <button
        type="submit"
        onClick={handleFunction}
        className={`${baseClass} ${colorClass}`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Button;
