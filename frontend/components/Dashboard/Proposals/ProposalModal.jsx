function ProposalModal({ toggleModal, description, title, id }) {
  return (
    <div className=" w-1/2 h-full absolute top-0 left-0 bg-blue-400 rounded-sm">
      <div className="w-full flex items-center justify-center gap-4">
        <p className="w-1/5 text-white">Proposal ID</p>
        <input
          disabled
          value={id}
          className="p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3 resize-vertical"
        />
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <p className="w-1/5 text-white">Proposal Title</p>
        <input
          disabled
          value={title}
          className="p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3 resize-vertical"
        />
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <p className="w-1/5 text-white">Proposal Description</p>
        <textarea
          disabled
          value={description}
          className="p-2 bg-blue-100 rounded-sm placeholder-blue-300 font-semibold text-gray-900 w-2/3 my-3 h-full resize-vertical"
        />
      </div>
      <div className="mt-10 flex">
        <div className="w-1/5" />
        <div className="w-2/3 flex justify-around">
          <button
            type="button"
            onClick={toggleModal}
            className="w-1/3 text-red-500 border-2 tracking-wide font-semibold self-center p-2 rounded-md border-red-500 hover:bg-red-950 hover:translate-y-1"
          >
            Close Proposal
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProposalModal;
