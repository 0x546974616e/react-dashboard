import React, { useState } from "react";
import { LogUpdates, clamp } from "Application/utils";
import { Chart } from "Application/components";
import { useDimensions } from "Application/hooks";

export const Notifications = React.memo(_Notifications);

function _Notifications(): JSX.Element {
  return (
    <LogUpdates id="notifications">
      <div>Notifications</div>
      <div>
        <Dada/>
      </div>
    </LogUpdates>
  );
}

export function Dada(): JSX.Element {
  const { height: screenHeight } = useDimensions();
  const height = clamp(screenHeight / 2, 200, 600);
  const [ width, setWidth ] = useState(0);

  const vw = 130;
  const vh = 250;
  const stroke = 20;

  const [ p, setP ] = useState<{ x: number, y: number }>({ x: vw * 0.75, y: 0 });

  return (
    <div className="m-4 p-4 bg-stone-50 rounded-md hover:bg-stone-100 shadow">
      <div className="p-2 bg-white rounded-lg">
        <div ref={(ref) => setWidth(ref?.getBoundingClientRect().width ?? 0)}>
          <Chart
            width={width}
            height={height}
            viewBoxWidth={vw}
            viewBoxHeight={vh}
            inset={stroke / 2}
            onMouseMove={({ vx: x, vy: y }) => setP({ x, y })}
            onMouseDown={({ vx: x, vy: y }) => setP({ x, y })}
            onMouseUp={({ vy: y }) => setP({ x: vw * 0.75, y })}
            // debug
          >
            <Chart.Line
              x1={vw * 0.25} y1={vh * 0.75}
              x2={vw * 0.75} y2={vh * 0.25}
              stroke={"blue"}
              strokeWidth={stroke}
              strokeLinecap={"round"}
            />
            <Chart.Line
              x1={0} y1={0}
              x2={vw} y2={vh}
              stroke={"red"}
              strokeWidth={stroke}
              strokeLinecap={"round"}
            />
            <Chart.Text
              x={vw / 2}
              y={vh / 2}
              textAnchor="middle"
              dominantBaseline={"middle"}
              alignmentBaseline={"middle"}
            >
              dada dadada
            </Chart.Text>
            <Chart.Line
              x1={vw * 0.75} y1={0}
              x2={vw * 0.75} y2={vh}
              stroke={"gray"}
              strokeWidth={stroke / 3}
              // strokeLinecap={"round"}
            />
            <Chart.Line
              x1={p.x} y1={0}
              x2={p.x} y2={vh}
              stroke={"green"}
              strokeWidth={stroke / 2}
              strokeLinecap={"round"}
            />
            <Chart.Circle
              cx={p.x} cy={p.y} r={stroke / 2}
              fill={"black"}
              stroke={"white"}
              strokeWidth={2}
            />
            <Chart.Text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline={"middle"}
              alignmentBaseline={"middle"}
              fill={"cyan"}
            >
              ici et là
            </Chart.Text>
          </Chart>
        </div>
      </div>
      {[...Array(50)].map((_, i) => <p key={i}>{i}</p>)}
    </div>
  );
}