let scrollTriggerAnimationInstance = null
gsap.registerPlugin(ScrollTrigger)

/**
 * Class representing the ScrollTrigger animations.
 */
class ScrollTriggerAnimation {
    /**
     * Creates an instance of ScrollTriggerAnimation.
     */
    constructor() {
        /** @type {NodeListOf<Element>} */
        this.sectionTitles = []

        /** @type {NodeListOf<Element>} */
        this.introductionCards = []

        /** @type {HTMLElement | null} */
        this.projectsContainer = null

        /** @type {HTMLElement | null} */
        this.joinRequest = null

        /** @type {HTMLElement | null} */
        this.joinRequestTitle = null

        /** @type {HTMLElement | null} */
        this.contactsContainer = null

        this.initialize()
    }

    /**
     * Initializes the elements and sets up the animations.
     */
    initialize() {
        this.setupElements()
        this.setupAnimations()
    }

    /**
     * Selects elements from the DOM and assigns them to class properties.
     */
    setupElements() {
        this.sectionTitles = document.querySelectorAll(".section__title")
        this.introductionCards = document.querySelectorAll(".introduction-card")
        this.projectsContainer = document.querySelector(".projects-container")
        this.joinRequest = document.querySelector(".footer__join-request")

        if (this.joinRequest) {
            this.joinRequestTitle = this.joinRequest.querySelector(".join-request__title")
            this.contactsContainer = this.joinRequest.querySelector(".join-request__contacts")
        }
    }

    /**
     * Sets up GSAP animations for the elements.
     */
    setupAnimations() {
        this.sectionTitles.forEach((title) => {
            gsap.to(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "top 80%",
                    toggleAction: "restart pause reverse pause",
                    scrub: true
                },
                y: 0
            })
        })

        this.introductionCards.forEach((card) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "top 80%",
                    toggleAction: "restart pause reverse pause",
                    scrub: true
                },
                x: 0,
                y: 0,
                opacity: 1
            })

            // Remove scale inline property in gsap to enable hover effect in css file
            card.style.removeProperty("scale")
        })

        if (this.projectsContainer) {
            gsap.to(this.projectsContainer, {
                scrollTrigger: {
                    trigger: this.projectsContainer,
                    start: "top 80%",
                    end: "top 80%",
                    toggleAction: "restart pause reverse pause",
                    scrub: true
                },
                y: 0,
                opacity: 1
            })
        }

        if (this.joinRequest && this.joinRequestTitle) {
            gsap.to(this.joinRequestTitle, {
                scrollTrigger: {
                    trigger: this.joinRequest,
                    start: "top 80%",
                    end: "top 80%",
                    toggleAction: "restart pause reverse pause",
                    scrub: true
                },
                y: 0
            })
        }

        if (this.joinRequest && this.contactsContainer) {
            gsap.to(this.contactsContainer, {
                scrollTrigger: {
                    trigger: this.joinRequest,
                    start: "top 80%",
                    end: "top 80%",
                    toggleAction: "restart pause reverse pause",
                    scrub: true
                },
                y: 0
            })
        }
    }
}

/**
 * Initializes the ScrollTriggerAnimation instance when the DOM content is fully loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    scrollTriggerAnimationInstance = new ScrollTriggerAnimation()
})
