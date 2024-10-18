/**
 * Singleton instance for the HeaderInteraction class.
 * Stores the instance of header interaction behavior.
 * @type {Header|null}
 */
let header = null

/**
 * Manages the interaction behaviors for the header, such as showing and hiding
 * based on scroll events and hover states.
 */
class Header {
    /**
     * Delay time in milliseconds before hiding the header after the mouse leaves.
     * @type {number}
     * @static
     */
    static HIDING_HEADER_TIME_DELAY = 1250

    /**
     * Creates a new HeaderInteraction instance and initializes interaction behaviors.
     */
    constructor() {
        /** @type {HTMLElement|null} The header element. */
        this.header = null

        /** @type {boolean} Indicates if the header is currently being hovered. */
        this.isHovered = false

        /** @type {number} Tracks the last known scroll position. */
        this.lastScrollTop = 0

        /** @type {number|null} Stores the timeout ID for hiding the header. */
        this.hidingHeaderTimeDelayId = null

        this.initialize()
    }

    /**
     * Initializes the elements and event listeners for header interactions.
     */
    initialize() {
        this.setupElements()
        this.setupEventListeners()
    }

    /**
     * Sets up the header and tab indicator elements.
     */
    setupElements() {
        this.header = document.querySelector("header")
    }

    /**
     * Configures event listeners for mouse hover and scroll behaviors.
     */
    setupEventListeners() {
        // Shows the header when hovered and resets any hiding timeout.
        this.header.addEventListener("mouseover", () => {
            this.isHovered = true
            this.resetTimeOut()
            this.showHeader()
        })

        // Schedules the header to hide when the mouse leaves the header area.
        this.header.addEventListener("mouseleave", () => {
            this.isHovered = false
            this.scheduleHeaderHiding()
        })

        // Shows or hides the header based on scroll direction.
        let showOrHideHeader = () => {
            let scrollTop = window.scrollY
            if (scrollTop > this.lastScrollTop) {
                // Hide header when scrolling down, unless it is hovered.
                if (!this.isHovered) {
                    this.hideHeader()
                }
            } else {
                // Show header when scrolling up.
                this.showHeader()

                // Schedule the header to hide if not hovered.
                if (!this.isHovered) {
                    this.scheduleHeaderHiding()
                }
            }
            this.lastScrollTop = scrollTop
        }

        window.addEventListener("scroll", showOrHideHeader)
    }

    /**
     * Hides the header by adding the 'header--hidden' class.
     */
    hideHeader() {
        this.header.classList.add("header--hidden")
    }

    /**
     * Shows the header by removing the 'header--hidden' class.
     */
    showHeader() {
        this.header.classList.remove("header--hidden")
    }

    /**
     * Schedules the header to hide after a delay if no hover interaction is detected.
     */
    scheduleHeaderHiding() {
        // Reset existing timeout if already set.
        if (this.hidingHeaderTimeDelayId) {
            this.resetTimeOut()
        }
        // Set a new timeout to hide the header after the specified delay.
        this.hidingHeaderTimeDelayId = setTimeout(() => {
            this.header.classList.add("header--hidden")
        }, Header.HIDING_HEADER_TIME_DELAY)
    }

    /**
     * Clears the timeout for hiding the header, preventing it from being hidden.
     */
    resetTimeOut() {
        clearTimeout(this.hidingHeaderTimeDelayId)
        this.hidingHeaderTimeDelayId = null
    }
}

/**
 * Instantiates the HeaderInteraction once the DOM content is loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    header = new Header()
})
