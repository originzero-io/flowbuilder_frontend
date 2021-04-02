import React from 'react'
import { Triangle } from '../style-components/Shapes'
import TagIcon from '../style-components/TagIcon'

export default function Flag({flagColor}) {
    return (
        <Triangle color={flagColor}>
            <TagIcon></TagIcon>
        </Triangle>
    )
}
