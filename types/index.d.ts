export interface requestAnimationFrame {
    (callback: Function): number
}

export interface cancelAnimationFrame {
    (callbackId?: number): void
}

export const requestAnimationFrame: requestAnimationFrame
export const cancelAnimationFrame: cancelAnimationFrame
