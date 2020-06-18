<p align="center"><a href="https://github.com/zxpsuper/rafs" target="_blank" rel="noopener noreferrer"><img width="100" src="https://imgkr.cn-bj.ufileos.com/3e6abfaf-4e32-4549-bb6f-dc18f30ed657.png" alt="Rafs logo"></a></p>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status">
  <img src="https://img.shields.io/badge/npm-v0.0.1-blue" alt="Npm Version">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
</p>

A more powerful and simpler requestAnimationFrame library

It has the pool to avoid busyness on the thread and avoiding multiple calls to requestAnimationFrame with the same callback.

> window.requestAnimationFrame schedules and performs an animation before the next repaint, thus taking the guesswork out of being in sync with the user's browser readiness. It will perform the callback function 60 times per second, thus making the main thread quite busy. If you have hundreds of images on the page, it can be very painful on memory when you have hundreds of recurring handles on requestAnimationFrame. This small library can dramatically reduce memory usage as it uses a single requestAnimationFrame.

## Installation

```
npm install rafs --save
```

## Usage

```js
import { requestAnimationFrame, cancelAnimationFrame, raf, caf } from 'rafs'

let id1 = requestAnimationFrame(callback1)
let id2 = requestAnimationFrame(callback2)
// cancel the callback1
cancelAnimationFrame(id1)

// cancal All without params
cancelAnimationFrame()
// raf is the window.requestAnimationFrame api which is Compatible with different browsers
// caf is the window.cancelAnimationFrame api which is Compatible with different browsers
let id = raf(function () {})
caf(id)
```

Or use it by script tag

```html
<script src="https://unpkg.com/rafs@0.0.1/libs/rafs.umd.min.js"></script>
<script>
    let requestAnimationFrame = Rafs.requestAnimationFrame
    let cancelAnimationFrame = Rafs.cancelAnimationFrame

    let id1 = requestAnimationFrame(() => {
        console.log('first')
    })

    let id2 = requestAnimationFrame(() => {
        console.log('seconde')
    })

    let id3 = null
    setTimeout(() => {
        id3 = requestAnimationFrame(() => {
            console.log('third')
        })
        cancelAnimationFrame(id1)
    }, 5000)

    setTimeout(() => {
        cancelAnimationFrame()
    }, 10000)
</script>
```

## Contributing

-   ⇄ Pull requests and ★ Stars are always welcome.
-   For bugs and feature requests, please create an issue.

## Licence

MIT

## Questions or advise

If you have some question or advise, you can send me a E-mail(zxpscau@163.com).
