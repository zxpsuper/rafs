let vendors = ['webkit', 'moz']
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame']
}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        let id = window.setTimeout(function () {
            callback()
        }, 1000 / 60)
        return id
    }
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
    }
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
    // Generate four random hex digits.
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
    )
}
function find(list, predicate) {
    for (let index = 0; index < list.length; index++) {
        if (predicate(list[index], index, list)) {
            return list[index]
        }
    }
    return null
}
class Rafs {
    constructor() {
        this.pool = []
        this.rafId = null
        // start the Animation
        this.animation()
    }
    animation() {
        this.rafId = window.requestAnimationFrame(() => {
            // assign to a variable to avoid ensure no race conditions happen
            // b/w flushing the pool and interating through the pool
            const { pool } = this
            pool.forEach(item => {
                item[Object.keys(item)[0]]()
            })

            this.animation()
        })
    }
    // add the callback to the pool, and return the Unique ID as callbackId
    add(callback) {
        const entry = find(
            this.pool,
            item => item[Object.keys(item)[0]] === callback
        )
        // Avoid pushing the same callback
        if (entry) return Object.keys(entry)[0]
        let callbackId = guid()
        this.pool.push({ [callbackId]: callback })
        return callbackId
    }
    // if you provide this callbackId, it will delete related callback function
    // without callbackId, it will cancel the animation
    cancel(callbackId = null) {
        if (callbackId) {
            this.pool = this.pool.filter(item => {
                return !item[callbackId]
            })
        } else {
            window.cancelAnimationFrame(this.rafId)
        }
    }
}

let instance = new Rafs()

export const requestAnimationFrame = instance.add.bind(instance)
export const cancelAnimationFrame = instance.cancel.bind(instance)
