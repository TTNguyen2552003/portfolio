/** @type {MagneticHover|null} */
let magneticHoverInstance = null

/**
 * Class representing a magnetic hover effect.
 */
class MagneticHover {
    /**
     * Create a MagneticHover instance.
     */
    constructor() {
        /** @type {NodeListOf<Element>|null} */
        this.elements = null

        /** @type {DOMRect[]} */
        this.boundingRects = []

        this.initialize()
    }

    /**
     * Initialize the MagneticHover instance.
     */
    initialize() {
        this.setupElements()
        this.setupEventListener()
    }

    /**
     * Set up the elements for the magnetic hover effect.
     */
    setupElements() {
        this.elements = document.querySelectorAll("[magnetic-hover]")
        this.elements.forEach((element) => {
            this.boundingRects.push(element.getBoundingClientRect())
        })
    }

    /**
     * Set up event listeners for the magnetic hover effect.
     */
    setupEventListener() {
        this.elements.forEach((element, index) => {
            element.addEventListener("mouseenter", () => {
                this.boundingRects[index] = element.getBoundingClientRect()
            })

            element.addEventListener("mousemove", (event) => {
                const mousePosX = event.clientX - this.boundingRects[index].x
                const mousePosY = event.clientY - this.boundingRects[index].y

                gsap.to(element, {
                    x: (mousePosX - this.boundingRects[index].width / 2) * 0.4,
                    y: (mousePosY - this.boundingRects[index].height / 2) * 0.4,
                    duration: 0.8,
                    ease: "power3.out"
                })
            })

            element.addEventListener("mouseleave", () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                })
            })
        })
    }
}

/**
 * Create a new MagneticHover instance when the DOM content is loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    magneticHoverInstance = new MagneticHover()
})
