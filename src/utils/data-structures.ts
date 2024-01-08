import {canvasDimensions} from "./painting-logic";

export enum levels {
    max = 'max',
    min = 'min'
}
export type stepDataType = {
    value: string
    level: levels
    father: Node
    node: Node | AlphaBetaNode
} | null

export type errorType = string | undefined

export type stepAlphaDataType = {
    alpha: number,
    beta: number
} | null

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
            y: 30
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
                this.level = levels.max

        // Decide on the leaf status of the father
        if(this.father)
            this.father.leaf = false

    }
}

export class AlphaBetaNode extends Node {
    children: AlphaBetaNode[]
    alpha: number
    beta: number
    father: AlphaBetaNode | null
    constructor(value: number | undefined = undefined, father: AlphaBetaNode | null = null, coordinates: coordinatesType =
                    {
                        x: canvasDimensions.width / 2,
                        y: 0
                    }
        , children: AlphaBetaNode[] = [], color = 'default', highlighted = false, alpha: number = -Infinity, beta: number = Infinity) {
        super(value, father, coordinates, children, color, highlighted);

        this.alpha = alpha
        this.beta = beta
        this.children = children
        this.father = father
    }
}