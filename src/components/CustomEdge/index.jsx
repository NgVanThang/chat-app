import { BaseEdge, EdgeLabelRenderer, getStraightPath, useReactFlow } from '@xyflow/react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <Button
          icon={<DeleteOutlined />}
          type="dashed"
          danger
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        />
      </EdgeLabelRenderer>
    </>
  );
}
