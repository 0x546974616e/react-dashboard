import { useDimensions } from "Application/hooks";
import React from "react";
import { useRef, useState } from "react";

export interface KpiGraphProps {

}

export function KpiGraph(): JSX.Element {
  const { height: screenHeight } = useDimensions();
  const height = Math.min(screenHeight / 2, 600);
  const [ width, setWidth ] = useState(0);

  return (
    <div className="p-4 bg-stone-50 rounded-md hover:bg-stone-100 shadow">
      <div className="p-4 bg-white rounded-lg">
        <div ref={(ref) => setWidth(ref?.getBoundingClientRect().width ?? 0)}>
          <_KpiGraph
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  );
}

function _KpiGraph(
    props: {
      width: number,
      height: number,
    }
  ): JSX.Element
{
  const { width, height } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    // preserveAspectRatio="none"
    >
      <line
        x1={width * 0.25} y1={height * 0.75}
        x2={width * 0.75} y2={height * 0.25}
        stroke="blue"
        strokeWidth={5}
      />
      <line
        x1={0} y1={0}
        x2={width} y2={height}
        stroke="red"
        strokeWidth={5}
      />
      <text
        x={width / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline={"middle"}
        alignmentBaseline={"middle"}
      >
        dada dadada
      </text>
    </svg>
  );
}

interface DadaProps {
  width: number,
  height: number,
}

class Dada extends React.Component<DadaProps> {
  public override render(): React.ReactNode {
    return (
      <div>

      </div>
    );
  }
}
