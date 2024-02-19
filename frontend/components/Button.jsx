function Button({ handleFunction, buttonText, buttonColor }) {
  const baseClass =
    'w-fit text-black border-2 tracking-wide font-semibold self-center p-2 rounded-md transition duration-300 ease-in-out shadow-md';

  const colorClass =
    buttonColor === 'red'
      ? 'bg-red-200 border-red-300 hover:bg-red-300'
      : buttonColor === 'green' &&
        'bg-green-200 border-green-300 hover:bg-green-300';

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
