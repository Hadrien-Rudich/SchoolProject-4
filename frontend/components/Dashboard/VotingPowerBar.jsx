import React, { useState } from 'react';

function ProgressBar() {
  const [maxPower] = useState(10000);
  const [power] = useState(10000);

  // Calculate width percentage of the bar
  const barWidth = `${(power / maxPower) * 100}%`;

  const barColor =
    power / maxPower > 0.7
      ? 'bg-green-500'
      : power / maxPower >= 0.3
        ? 'bg-yellow-500'
        : 'bg-red-500';

  return (
    <div className="w-full space-y-2">
      <div className="w-full bg-black rounded-full h-8 ">
        <div
          className={`h-8 rounded-full ${barColor}`}
          style={{ width: barWidth }}
        />
      </div>
      <p>
        Power: {power} / {maxPower}
      </p>
    </div>
  );
}

export default ProgressBar;
