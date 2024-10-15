/** @type {AvatarFrame|null} */
let avatarFrameInstance = null

/**
 * Class representing an avatar frame with a gradient border.
 */
class AvatarFrame {
    /**
     * Create an AvatarFrame instance.
     */
    constructor() {
        /** @type {HTMLCanvasElement|null} */
        this.canvas = null

        /** @type {CanvasRenderingContext2D|null} */
        this.context = null

        this.initialize()
        this.draw()
    }

    /**
     * Initialize the canvas and context for the avatar frame.
     */
    initialize() {
        this.canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(".avatar__frame"))
        this.canvas.width = this.canvas.parentElement.clientWidth
        this.canvas.height = this.canvas.parentElement.clientHeight
        this.context = /** @type {CanvasRenderingContext2D} */ (this.canvas.getContext("2d"))
    }

    /**
     * Draw the avatar frame with a gradient border.
     */
    draw() {
        if (!this.context || !this.canvas) return

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const radius = this.canvas.width / 2
        const borderWidth = 4

        /** @type {string[]} */
        const colors = ["rgba(228, 72, 87, 1)", "rgba(199, 17, 225, 1)", "rgba(127, 82, 255, 1)"]
        const gradient = this.context.createConicGradient(0, radius, radius)

        colors.forEach((color, index) => {
            gradient.addColorStop((index * 1.0) / colors.length, color)
        })
        gradient.addColorStop(1, colors[0])

        this.context.beginPath()
        this.context.arc(radius, radius, radius - borderWidth / 2, 0, 2 * Math.PI)
        this.context.strokeStyle = gradient
        this.context.lineWidth = borderWidth
        this.context.stroke()
    }
}

/**
 * Create a new AvatarFrame instance when the DOM content is loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    avatarFrameInstance = new AvatarFrame()
})