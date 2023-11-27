import {canvasDimensions} from "./painting-logic";

export enum levels {
    max = 'max',
    min = 'min'
}

export type coordinatesType = {
    x: number,
    y: number
}
interface NodeI {
    children: Node[]
    level: levels
    father: Node | null
    value?: number
    leaf: boolean
//     For the painting in the DOM
    coordinates: {
        x: number,
        y: number
    }
    color: string
    highlighted: boolean
}
export class Node implements NodeI{
    children: Node[]
    color: string
    highlighted: boolean
    level: levels
    father: Node | null = null
    value?: number
    leaf: boolean = true
    coordinates : coordinatesType = {
        x: canvasDimensions.width / 2,
        y: 100
    }

    constructor(value: number | undefined = undefined, father: Node | null = null, coordinates: coordinatesType =
        {
            x: canvasDimensions.width / 2,
            y: 0
        }
        , children: Node[] = [], color = 'default', highlighted = false) {
        this.children = children
        this.color = color
        this.highlighted = highlighted
        this.value = value
        this.father = father
        this.coordinates = coordinates
        // Assign the correct type of level
        // This means that this node is root
        if(this.father === null)
            this.level = levels.max
        else
            // This means that the previous level was a max level
            if(this.father.level === levels.max)
                this.level = levels.min
            else
                // This means that the previous level was a min level
                this.level = levels.min

        // Decide on the leaf status of the father
        if(this.father)
            this.father.leaf = false

    }
}