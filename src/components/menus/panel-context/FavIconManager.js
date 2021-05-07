import React from 'react'
import { LikeNodeIcon, DislikeNodeIcon } from '../../global/SvgIcons'

export default function FavIconManager({node,favClick}) {
    return (
        <>
            {node.fav ? (
                <DislikeNodeIcon
                  favClick={favClick}
                  node={node}
                  color="rgb(218,168,0)"
                />
              ) : (
                <LikeNodeIcon
                  favClick={favClick}
                  node={node}
                />
              )}
        </>
    )
}
