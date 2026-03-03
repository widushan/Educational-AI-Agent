import React, { useMemo } from 'react'
import { ReactFlow, Controls, MiniMap, Background, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TurboNode from './TurboNode';




const nodeTypes = {
  turbo: TurboNode
}


function RoadmapCanvas({initialNodes, initialEdges}:any) {

/*   const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
  ];
  const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }]; */

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setedges, onEdgesChange] = useNodesState(initialEdges)

  const layoutedNodes = useMemo(() => {
    if (!Array.isArray(initialNodes) || !Array.isArray(initialEdges)) {
      return initialNodes ?? [];
    }

    const nodeMap = new Map<string, any>();
    const inDegree = new Map<string, number>();

    initialNodes.forEach((node: any) => {
      nodeMap.set(node.id, { ...node });
      inDegree.set(node.id, 0);
    });

    initialEdges.forEach((edge: any) => {
      if (edge.target && inDegree.has(edge.target)) {
        inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
      }
    });

    const levels = new Map<string, number>();
    const queue: string[] = [];

    inDegree.forEach((deg, id) => {
      if (deg === 0) {
        levels.set(id, 0);
        queue.push(id);
      }
    });

    while (queue.length > 0) {
      const current = queue.shift() as string;
      const currentLevel = levels.get(current) ?? 0;

      initialEdges.forEach((edge: any) => {
        if (edge.source === current) {
          const target = edge.target;
          const nextLevel = currentLevel + 1;
          if (!levels.has(target) || (levels.get(target) ?? 0) < nextLevel) {
            levels.set(target, nextLevel);
          }
          const remaining = (inDegree.get(target) || 0) - 1;
          inDegree.set(target, remaining);
          if (remaining === 0) {
            queue.push(target);
          }
        }
      });
    }

    const nodesByLevel = new Map<number, any[]>();
    nodeMap.forEach((node, id) => {
      const level = levels.get(id) ?? 0;
      if (!nodesByLevel.has(level)) nodesByLevel.set(level, []);
      nodesByLevel.get(level)!.push(node);
    });

    const verticalGap = 180;
    const horizontalGap = 260;

    nodesByLevel.forEach((nodes, level) => {
      const totalWidth = (nodes.length - 1) * horizontalGap;
      const startX = -totalWidth / 2;
      nodes.forEach((node, index) => {
        node.position = {
          x: startX + index * horizontalGap,
          y: level * verticalGap,
        };
      });
    });

    return Array.from(nodeMap.values());
  }, [initialNodes, initialEdges]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
          nodes={layoutedNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}>
          <Controls />
          <MiniMap />
          {/*@ts-ignore*/}
          <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
      
}

export default RoadmapCanvas