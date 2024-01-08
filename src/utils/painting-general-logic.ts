import {settings} from "./general-logic";

export const drawCircle = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, NODE_RADIUS: number, drawAngle: number = 0) => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()
    // ctx.moveTo(drawX, drawY)
    ctx.arc(centerX, centerY, NODE_RADIUS, 0, drawAngle)
    ctx.stroke()

    drawAngle += settings.draw_speed
    if(drawAngle < 2 * Math.PI)
        requestAnimationFrame(() => drawCircle(ctx, centerX , centerY, NODE_RADIUS, drawAngle))
}
export const drawLine = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.stroke()
}

export enum colors {
    highlight = 'red',
    regular = 'black',
    white = 'white',
    comparison = 'green',
    pruned= 'blue'
}
export const canvasDimensions = {
    width: 500,
    height: 500
}