/**
 * Singleton instance for AboutTheFoldBackground class.
 * Stores the instance of the background animation.
 * @type {AboutTheFoldBackground|null}
 */
let aboutTheFoldBackgroundInstance = null

/**
 * Manages the background animation for the "About the Fold" section.
 */
class AboutTheFoldBackground {
    /**
     * Represents a pair of coordinates (x, y).
     */
    static Coordinates = class {
        /**
         * Creates a new Coordinates instance.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         */
        constructor(x, y) {
            /** @type {number} The x-coordinate. */
            this.x = x

            /** @type {number} The y-coordinate. */
            this.y = y
        }
    }

    /**
     * Represents a square particle in the animation.
     */
    static SquareParticle = class {
        /**
         * Creates a new SquareParticle instance.
         * @param {number} size - The size of the particle (width and height).
         * @param {number} borderRadius - The border radius of the particle.
         * @param {string} backgroundColor - The background color of the particle.
         * @param {AboutTheFoldBackground.Coordinates} coordinates - The initial coordinates of the particle.
         */
        constructor(size, borderRadius, backgroundColor, coordinates) {
            /** @type {number} The size of the particle (width and height). */
            this.size = size

            /** @type {number} The border radius of the particle. */
            this.borderRadius = borderRadius

            /** @type {string} The background color of the particle. */
            this.backgroundColor = backgroundColor

            /** @type {AboutTheFoldBackground.Coordinates} The coordinates of the particle on the canvas. */
            this.coordinates = coordinates
        }
    }

    /** @type {number} Duration of the animation in milliseconds. */
    static ANIMATION_DURATION = 2000

    /**
     * Creates a new AboutTheFoldBackground instance and initializes the animation.
     */
    constructor() {
        /** @type {HTMLElement|null} The "About the Fold" section element. */
        this.aboutTheFold = null

        /** @type {HTMLCanvasElement|null} The canvas element for the animation. */
        this.canvas = null

        /** @type {DOMRect|null} Bounding rectangle of the "About the Fold" section. */
        this.aboutTheFoldBounding = null

        /** @type {CanvasRenderingContext2D|null} The 2D drawing context of the canvas. */
        this.context = null

        /** @type {AboutTheFoldBackground.SquareParticle[]} Array of particles for the animation. */
        this.particles = []

        /** @type {number|null} ID of the explode animation frame request. */
        this.explodeAnimationId = null

        /** @type {number|null} ID of the cursor animation frame request. */
        this.cursorAnimationId = null

        /** @type {number|null} Start time of the explode animation. */
        this.explodeAnimationStartTime = null

        /** @type {number|null} Start time of the cursor animation. */
        this.cursorAnimationStartTime = null

        this.initialize()
    }

    /**
     * Sets up the canvas, particles, and event listeners for the animation.
     */
    initialize() {
        this.setupElements()
        this.initialAnimation()
        this.setupEventListeners()
    }

    /**
     * Configures the canvas, its context, and initializes particles.
     */
    setupElements() {
        this.aboutTheFold = document.querySelector("#about-the-fold")

        // Configure the canvas size and context
        this.canvas = this.aboutTheFold.querySelector(".about-the-fold__background")
        this.canvas.width = this.aboutTheFold.clientWidth
        this.canvas.height = this.aboutTheFold.clientHeight

        // Store bounding rectangle for position calculations
        this.aboutTheFoldBounding = this.aboutTheFold.getBoundingClientRect()

        // Get 2D context for drawing
        this.context = this.canvas.getContext("2d")

        // Create particles with predefined sizes and colors
        let sizes = [44, 40, 32, 24, 20]
        const borderRadius = 4
        let colors = ["rgba(127, 82, 255, 1)", "rgba(199, 17, 225, 1)", "rgba(228, 72, 87, 1)"]
        for (let size of sizes) {
            for (let color of colors) {
                let particle = new AboutTheFoldBackground.SquareParticle(
                    size,
                    borderRadius,
                    color,
                    new AboutTheFoldBackground.Coordinates(
                        (this.canvas.width - size) / 2,
                        (this.canvas.height - size) / 2
                    )
                )
                this.particles.push(particle)
            }
        }
    }

    /**
     * Starts the initial animation by drawing particles and triggering the explode effect.
     */
    initialAnimation() {
        this.drawParticles()
        this.explodeAnimation()
    }

    /**
     * Draws all particles on the canvas.
     */
    drawParticles() {
        this.particles.forEach((particle) => {
            this.context.beginPath()
            this.context.fillStyle = particle.backgroundColor
            this.context.roundRect(
                particle.coordinates.x,
                particle.coordinates.y,
                particle.size,
                particle.size,
                particle.borderRadius
            )
            this.context.fill()
        })
    }

    /**
     * Animates particles moving to random locations, creating an explosion effect.
     */
    explodeAnimation() {
        let targetDestinations = []
        this.particles.forEach((particle) => {
            let minX = 0
            let maxX = this.canvas.width - particle.size
            let minY = 0
            let maxY = this.canvas.height - particle.size

            targetDestinations.push(
                new AboutTheFoldBackground.Coordinates(
                    Math.floor(Math.random() * (maxX - minX + 1)) + minX,
                    Math.floor(Math.random() * (maxY - minY + 1)) + minY
                )
            )
        })

        const animate = (timestamp) => {
            if (!this.explodeAnimationStartTime) this.explodeAnimationStartTime = timestamp
            let progress = (timestamp - this.explodeAnimationStartTime) / AboutTheFoldBackground.ANIMATION_DURATION
            let easedProgress = this.easeOutQuart(progress)

            this.particles.forEach((particle, index) => {
                particle.coordinates.x += easedProgress * (targetDestinations[index].x - particle.coordinates.x)
                particle.coordinates.y += easedProgress * (targetDestinations[index].y - particle.coordinates.y)
            })

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drawParticles()

            if (progress < 1) {
                this.explodeAnimationId = requestAnimationFrame(animate)
            }
        }

        this.explodeAnimationId = requestAnimationFrame(animate)
    }

    /**
     * Eases out animation progress for a smooth transition.
     * @param {number} progress - The current progress of the animation (0 to 1).
     * @returns {number} The adjusted progress.
     */
    easeOutQuart(progress) {
        return 1 - Math.pow(1 - progress, 4)
    }

    /**
     * Eases in animation progress for a smooth start.
     * @param {number} progress - The current progress of the animation (0 to 1).
     * @returns {number} The adjusted progress.
     */
    easeInSine(progress) {
        return 1 - Math.cos((progress * Math.PI) / 2)
    }

    /**
     * Sets up event listeners for mouse interactions and window resizing.
     */
    setupEventListeners() {
        // Handles mousemove events to animate particles towards the cursor
        const mousemoveEventHandler = (event) => {
            const cursorCoordinates = new AboutTheFoldBackground.Coordinates(
                event.clientX - this.aboutTheFoldBounding.left,
                event.clientY - this.aboutTheFoldBounding.top
            )

            const animate = (timestamp) => {
                if (!this.cursorAnimationStartTime) this.cursorAnimationStartTime = timestamp
                let progress = (timestamp - this.cursorAnimationStartTime) / AboutTheFoldBackground.ANIMATION_DURATION
                let easedProgress = this.easeInSine(progress)

                this.particles.forEach((particle) => {
                    particle.coordinates.x += easedProgress * (cursorCoordinates.x - particle.coordinates.x)
                    particle.coordinates.y += easedProgress * (cursorCoordinates.y - particle.coordinates.y)
                })

                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.drawParticles()

                if (progress < 1) {
                    this.cursorAnimationId = requestAnimationFrame(animate)
                }
            }

            this.cursorAnimationId = requestAnimationFrame(animate)
        }

        this.aboutTheFold.addEventListener("mousemove", mousemoveEventHandler)
        this.aboutTheFold.addEventListener("mouseleave", () => {
            this.cancelAnimation()
            this.explodeAnimation()
        })
        this.aboutTheFold.addEventListener("mouseenter", () => {
            this.cancelAnimation()
        })

        // Adjusts the canvas size when the window is resized
        window.addEventListener("resize", () => {
            this.canvas.width = this.aboutTheFold.clientWidth
            this.canvas.height = this.aboutTheFold.clientHeight
            this.aboutTheFoldBounding = this.aboutTheFold.getBoundingClientRect()
        })

        // Updates the bounding box on scroll to account for repositioning
        window.addEventListener("scroll", () => {
            this.aboutTheFoldBounding = this.aboutTheFold.getBoundingClientRect()
        })
    }

    /**
     * Cancels any active animations for explode or cursor movement.
     */
    cancelAnimation() {
        cancelAnimationFrame(this.explodeAnimationId)
        cancelAnimationFrame(this.cursorAnimationId)
        this.explodeAnimationId = null
        this.cursorAnimationId = null
        this.explodeAnimationStartTime = null
        this.cursorAnimationStartTime = null
    }
}

/**
 * Instantiates the background animation once the DOM content is loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    aboutTheFoldBackgroundInstance = new AboutTheFoldBackground()
})
