/** @type {SplashScreen|null} */
let splashScreenInstance = null

/**
 * Represents a splash screen that can be observed and controls page scrolling.
 */
class SplashScreen {
    /** @type {number} The intersection threshold for the observer. */
    static INTERSECTION_THRESHOLD = 0.2

    /**
     * Creates a new SplashScreen instance and initializes it.
     */
    constructor() {
        /** @type {HTMLElement|null} The HTML element of the page. */
        this.page = null
        /** @type {HTMLElement|null} The splash screen element. */
        this.splashScreen = null
        /** @type {IntersectionObserver|null} The intersection observer. */
        this.observer = null

        this.initialize()
    }

    /**
     * Initializes the SplashScreen by setting up elements and starting observation.
     */
    initialize() {
        this.setupElements()
        this.startObserving()
    }

    /**
     * Sets up the necessary DOM elements and creates the IntersectionObserver.
     */
    setupElements() {
        this.page = document.querySelector("html")
        this.splashScreen = document.querySelector("#splash-screen")
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio >= SplashScreen.INTERSECTION_THRESHOLD) {
                        this.page.classList.add("no-scroll")
                    } else {
                        this.page.classList.remove("no-scroll")
                    }
                })
            },
            { threshold: SplashScreen.INTERSECTION_THRESHOLD }
        )
    }

    /**
     * Starts observing the splash screen element.
     */
    startObserving() {
        this.observer.observe(this.splashScreen)
    }
}

/**
 * Event listener for DOMContentLoaded event.
 * Creates a new SplashScreen instance when the DOM is fully loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    splashScreenInstance = new SplashScreen()
})
