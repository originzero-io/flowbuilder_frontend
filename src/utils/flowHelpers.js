export function flowDataSeperator(flow) {
    return {
        nodes: flow.nodes.map(node => {
            return {
                id: node.id,
                type: node.type,
                data: {
                    enable: node.data.enable,
                    targetCount: node.data.targetCount,
                    sourceCount: node.data.sourceCount,
                }
            }
        }),
        edges: flow.edges.map(edge => {
            return {
                id: edge.id,
                source: edge.source,
                sourceHandle: edge.sourceHandle,
                target: edge.target,
                targetHandle: edge.targetHandle,
                data: edge.data
            }
        })
    }
}