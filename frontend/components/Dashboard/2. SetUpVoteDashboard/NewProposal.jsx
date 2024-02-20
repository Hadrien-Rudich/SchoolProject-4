import Button from '../../Button';

function NewProposal({ toggleModal }) {
  return (
    <div className="relative z-10">
      <div className="mt-10">
        <Button
          handleFunction={toggleModal}
          buttonText="New Proposal"
          buttonColor="gray"
        />
      </div>
    </div>
  );
}

export default NewProposal;
