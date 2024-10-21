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
     * Set up event listeners for the magnetic hover / magnetic touch effect.
     */
    setupEventListener() {
        this.elements.forEach((element, index) => {
            let mouseenterAndTouchStartEventHandler = () => {
                this.boundingRects[index] = element.getBoundingClientRect()
            }
            element.addEventListener("mouseenter", mouseenterAndTouchStartEventHandler)
            element.addEventListener("touchstart", mouseenterAndTouchStartEventHandler)

            let mousemoveAndTouchmoveEventHandler = (event) => {
                let cursorPosX = null
                let cursorPosY = null

                if (event.type == "mousemove") {
                    cursorPosX = event.clientX - this.boundingRects[index].x
                    cursorPosY = event.clientY - this.boundingRects[index].y
                } else if (event.type == "touchmove") {
                    cursorPosX = event.touches[0].clientX - this.boundingRects[index].x
                    cursorPosY = event.touches[0].clientY - this.boundingRects[index].y
                }

                gsap.to(element, {
                    x: (cursorPosX - this.boundingRects[index].width / 2) * 0.4,
                    y: (cursorPosX - this.boundingRects[index].height / 2) * 0.4,
                    duration: 0.8,
                    ease: "power3.out"
                })
            }
            element.addEventListener("mousemove", mousemoveAndTouchmoveEventHandler)
            element.addEventListener("touchmove", mousemoveAndTouchmoveEventHandler)

            let mouseleaveAndTouchEndEventHandler = () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                })
            }
            element.addEventListener("mouseleave", mouseleaveAndTouchEndEventHandler)
            element.addEventListener("touchend", mouseleaveAndTouchEndEventHandler)
        })
    }
}

/**
 * Create a new MagneticHover instance when the DOM content is loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    magneticHoverInstance = new MagneticHover()
})
