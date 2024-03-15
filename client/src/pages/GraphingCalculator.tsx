import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import functionPlot, { FunctionPlotOptions } from 'function-plot';

function GraphingCalculators() {
  const rootEl = useRef<HTMLDivElement | null>(null); // Specify type explicitly

  useEffect(() => {
    try {
      if (rootEl.current) { // Ensure rootEl is not null before using it
        functionPlot({
          target: rootEl.current,
          width: 800,
          height: 500,
          yAxis: { domain: [-1, 9] },
          grid: true,
          data: [
            {
              fn: '2x', // Define your function here
              derivative: {
                fn: '0',
                updateOnMouseMove: true
              }
            }
          ]
        });
      }
    } catch (e) {}
  }, []); // Empty dependency array to run only once

  return (
    <div>
      <Header />
      <div ref={rootEl}></div>
    </div>
  );
}

export default GraphingCalculators;
