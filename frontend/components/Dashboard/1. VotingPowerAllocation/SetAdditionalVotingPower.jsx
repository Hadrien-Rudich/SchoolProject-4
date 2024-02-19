import { useState, useContext } from 'react';
import setTokens from '../../../contracts/VoteAdministration/0. VotingPowerAllocation/setTokens';
import { VotingPowerContext } from '../../../context/VotingPower.context';
import Input from '../../Input';
import Button from '../../Button';

function SetAdditionalVotingPower() {
  const [input, setInput] = useState('');
  const {
    additionalVotingPower,
    setAdditionalVotingPower,
    setCurrentVotingPower,
  } = useContext(VotingPowerContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await setTokens(input);
      if (data.status === 'success') {
        setInput('');
        setAdditionalVotingPower(input);
        setCurrentVotingPower(input);
      }
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col divide-y-4 divide-gray-300">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col my-10 p-5 text-black items-center rounded-md"
      >
        <div className="flex flex-col gap-4">
          <Input
            inputText="Additional Voting Power"
            inputValue={input}
            placeHolderText="0"
            onChange={handleChange}
            inputWidth="w-1/3"
            pWidth="w-1/2"
          />

          <Button
            handleFunction={handleSubmit}
            buttonText="Set Additional Voting Power"
            buttonColor="green"
          />
        </div>
      </form>
      <div className="flex items-center justify-center text-black">
        {additionalVotingPower && (
          <div className="my-10 flex flex-col items-center justify-center gap-4 ">
            <p className=""> Current Additional Voting Power</p>
            <p className="text-xl text-darkPastelGreen">
              {additionalVotingPower}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SetAdditionalVotingPower;
