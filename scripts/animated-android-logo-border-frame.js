/** @type {AnimatedAndroidLogoBorderFrameInstance|null} */
let animatedAndroidLogoBorderFrameInstance = null

/**
 * Class representing an animated Android logo border frame.
 */
class AnimatedAndroidLogoBorderFrameInstance {
    /**
     * Create an AnimatedAndroidLogoBorderFrameInstance.
     */
    constructor() {
        /** @type {HTMLCanvasElement|null} */
        this.canvas = null

        /** @type {CanvasRenderingContext2D|null} */
        this.context = null

        /** @type {number} */
        this.rotationAngle = 0

        this.initialize()
        this.animate()
    }

    /**
     * Initialize the canvas and context for the animated border frame.
     */
    initialize() {
        this.canvas = /** @type {HTMLCanvasElement} */ (
            document.querySelector("canvas.animated-android-logo__border-frame")
        )
        this.canvas.width = this.canvas.parentElement.clientWidth
        this.canvas.height = this.canvas.parentElement.clientHeight
        this.context = /** @type {CanvasRenderingContext2D} */ (this.canvas.getContext("2d"))
    }

    /**
     * Draw the animated border frame with a gradient and dashed line.
     */
    draw() {
        if (!this.context || !this.canvas) return
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const radius = this.canvas.width / 2
        const borderWidth = 12

        /** @type {string[]} */
        const colors = ["rgba(255, 193, 7, 1)", "rgba(40, 167, 69, 1)"]
        const gradient = this.context.createConicGradient(this.rotationAngle, radius, radius)

        colors.forEach((color, index) => {
            gradient.addColorStop((index * 1.0) / colors.length, color)
        })
        gradient.addColorStop(1, colors[0])

        this.context.beginPath()
        this.context.arc(radius, radius, radius - borderWidth / 2, 0, 2 * Math.PI)
        this.context.strokeStyle = gradient
        this.context.lineWidth = borderWidth
        this.context.setLineDash([24, 24])
        this.context.lineCap = "round"
        this.context.stroke()
    }

    /**
     * Animate the border frame by updating the rotation angle and redrawing.
     */
    animate() {
        this.rotationAngle += 0.04
        this.rotationAngle %= 2 * Math.PI
        this.draw()
        requestAnimationFrame(() => this.animate())
    }
}

/**
 * Create a new AnimatedAndroidLogoBorderFrameInstance when the DOM content is loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    animatedAndroidLogoBorderFrameInstance = new AnimatedAndroidLogoBorderFrameInstance()
})
