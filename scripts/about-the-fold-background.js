let aboutTheFoldBackgroundInstance = null

/**
 * Class representing the background animation for "About the Fold".
 */
class AboutTheFoldBackground {
    /**
     * Class representing a pair of coordinates (x, y).
     * @class
     */
    static Coordinates = class {
        /**
         * Creates an instance of Coordinates.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         */
        constructor(x, y) {
            this.x = x
            this.y = y
        }
    }

    /**
     * Class representing a square particle in the animation.
     * @class
     */
    static SquareParticle = class {
        /**
         * Creates an instance of SquareParticle.
         * @param {number} size - The size of the particle (width and height).
         * @param {number} borderRadius - The border radius of the particle.
         * @param {string} backgroundColor - The background color of the particle.
         * @param {AboutTheFoldBackground.Coordinates} coordinates - The initial coordinates of the particle.
         */
        constructor(size, borderRadius, backgroundColor, coordinates) {
            this.size = size
            this.borderRadius = borderRadius
            this.backgroundColor = backgroundColor
            this.coordinates = coordinates
        }
    }

    /**
     * Creates an instance of AboutTheFoldBackground and initializes the animation.
     */
    constructor() {
        this.aboutTheFold = null
        this.canvas = null
        this.aboutTheFoldBounding = null
        this.context = null
        this.particles = []
        this.explodeAnimationId = null
        this.cursorAnimationId = null
        this.explodeAnimationStartTime = null
        this.cursorAnimationStartTime = null
        this.ANIMATION_DURATION = 2000

        this.initialize()
    }

    /**
     * Initializes the background animation by setting up the canvas, particles, and event listeners.
     */
    initialize() {
        this.setupElements()
        this.initialAnimation()
        this.setupEventListeners()
    }

    /**
     * Sets up the canvas, context, and particle elements for the animation.
     */
    setupElements() {
        // Setup about the fold section element
        this.aboutTheFold = document.querySelector("#about-the-fold")

        // Setup canvas
        this.canvas = this.aboutTheFold.querySelector(".about-the-fold__background")
        this.canvas.width = this.aboutTheFold.clientWidth
        this.canvas.height = this.aboutTheFold.clientHeight

        // Setup canvasBounding
        this.aboutTheFoldBounding = this.aboutTheFold.getBoundingClientRect()

        // Setup canvas context
        this.context = this.canvas.getContext("2d")

        // Setup particles
        let sizes = [44, 40, 32, 24, 20]
        const borderRadius = 4
        let colors = ["rgba(127, 82, 255, 1)", "rgba(199, 17, 225, 1)", "rgba(228, 72, 87, 1)"]
        for (let i = 0; i < sizes.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                let particle = new AboutTheFoldBackground.SquareParticle(
                    sizes[i],
                    borderRadius,
                    colors[j],
                    new AboutTheFoldBackground.Coordinates(
                        (this.canvas.width - sizes[i]) / 2,
                        (this.canvas.height - sizes[i]) / 2
                    )
                )
                this.particles.push(particle)
            }
        }
    }

    /**
     * Runs the initial animation by drawing the particles and triggering the explode animation.
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
     * Triggers the explode animation, making particles move to random locations.
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

        let animate = (timestamp) => {
            if (!this.explodeAnimationStartTime) this.explodeAnimationStartTime = timestamp
            let progress = (timestamp - this.explodeAnimationStartTime) / this.ANIMATION_DURATION
            let easedProgress = this.easeOutQuart(progress)

            this.particles.forEach((particle, index) => {
                particle.coordinates.x = particle.coordinates.x + easedProgress * (targetDestinations[index].x - particle.coordinates.x)
                particle.coordinates.y = particle.coordinates.y + easedProgress * (targetDestinations[index].y - particle.coordinates.y)
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
     * Easing function for smooth animation transition.
     * @param {number} progress - The current progress of the animation (between 0 and 1).
     * @returns {number} The eased progress.
     */
    easeOutQuart(progress) {
        return 1 - Math.pow(1 - progress, 4)
    }

    /**
     * Easing function for smooth animation transition.
     * @param {number} progress - The current progress of the animation (between 0 and 1).
     * @returns {number} The eased progress.
     */
    easeInSine(progress) {
        return 1 - Math.cos((progress * Math.PI) / 2)
    }

    /**
     * Sets up event listeners for mouse interactions to trigger animations.
     */
    setupEventListeners() {
        /**
         * Handles mousemove events to trigger particle movement toward the cursor.
         * @param {MouseEvent} event - The mousemove event.
         */
        let mousemoveEventHandler = (event) => {
            let cursorCoordinates = new AboutTheFoldBackground.Coordinates(
                event.clientX - this.aboutTheFoldBounding.left,
                event.clientY - this.aboutTheFoldBounding.top
            )

            let animate = (timestamp) => {
                if (!this.cursorAnimationStartTime) this.cursorAnimationStartTime = timestamp
                let progress = (timestamp - this.cursorAnimationStartTime) / this.ANIMATION_DURATION
                let easedProgress = this.easeInSine(progress)

                this.particles.forEach((particle) => {
                    particle.coordinates.x =
                        particle.coordinates.x + easedProgress * (cursorCoordinates.x - particle.coordinates.x)
                    particle.coordinates.y =
                        particle.coordinates.y + easedProgress * (cursorCoordinates.y - particle.coordinates.y)
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

        window.addEventListener("resize", () => {
            this.canvas.width = this.aboutTheFold.clientWidth
            this.canvas.height = this.aboutTheFold.clientHeight
        })

        window.addEventListener("scroll", () => { 
            this.aboutTheFoldBounding = this.aboutTheFold.getBoundingClientRect()
        })
    }

    /**
     * Cancels any ongoing animations.
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
 * Initializes the AboutTheFoldBackground animation once the DOM is fully loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    aboutTheFoldBackgroundInstance = new AboutTheFoldBackground()
})