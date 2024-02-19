import { useState } from 'react';
import addVoter from '../../../contracts/VoteAdministration/1. SetUpVote/addVoter';
import Button from '../../Button';
import Input from '../../Input';

function AddVoter() {
  const [inputAddress, setInputAddress] = useState('');
  const [inputBaseVotingPower, setInputBaseVotingPower] = useState('');

  const handleAddressChange = (e) => {
    setInputAddress(e.target.value);
  };

  const handleBaseVotingPowerChange = (e) => {
    setInputBaseVotingPower(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addVoter(inputAddress, inputBaseVotingPower);
      if (data.status === 'success') {
        setInputAddress('');
        setInputBaseVotingPower('');
      }
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };

  return (
    <div className="w-full my-4">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col  gap-y-3 p-5  text-black rounded-md"
      >
        <Input
          inputText="New Voter Address"
          inputValue={inputAddress}
          placeHolderText="0x000000...."
          onChange={handleAddressChange}
          inputWidth="w-3/6"
          textWidth="w-2/6"
        />

        <Input
          inputText="Base Voting Power"
          inputValue={inputBaseVotingPower}
          placeHolderText="0"
          onChange={handleBaseVotingPowerChange}
          inputWidth="w-1/12"
          textWidth="w-1/6"
        />

        <Button
          handleFunction={handleSubmit}
          buttonText="Add Voter"
          buttonColor="green"
        />
      </form>
    </div>
  );
}

export default AddVoter;
