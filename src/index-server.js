import { requestAnimationFrame, cancelAnimationFrame } from './index'

let id1 = requestAnimationFrame(() => {
    console.log('first')
})
let id2 = requestAnimationFrame(() => {
    console.log('seconde')
})
let id3
setTimeout(() => {
    id3 = requestAnimationFrame(() => {
        console.log('third')
    })
    cancelAnimationFrame(id1)
}, 5000)
setTimeout(() => {
    cancelAnimationFrame()
}, 10000)
