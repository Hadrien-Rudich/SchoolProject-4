import React from 'react';

function Proposal({ id, title, description }) {
  return (
    <div className="h-20 w-20">
      <p>{id}</p>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
}

export default Proposal;
