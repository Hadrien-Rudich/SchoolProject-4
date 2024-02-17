import VoteFor from './VoteFor';
import VoteAgainst from './VoteAgainst';

function VoteButtons({ id }) {
  return (
    <div className=" w-full flex items-center justify-center ">
      <VoteFor id={id} />
      <VoteAgainst id={id} />
    </div>
  );
}

export default VoteButtons;
