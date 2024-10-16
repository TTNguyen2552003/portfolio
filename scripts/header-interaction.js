let headerInteractionInstance = null

class HeaderInteraction {
    static HIDING_HEADER_TIME_DELAY = 1250

    constructor() {
        this.header = null
        this.tabIndicator = null
        this.isHovered = false
        this.lastScrollTop = 0
        this.hidingHeaderTimeDelayId = null

        this.initialize()
    }

    initialize() {
        this.setupElements()
        this.setupEventListeners()
    }

    setupElements() {
        this.header = document.querySelector("header")

        this.tabIndicator = this.header.querySelector(".navigation-bar__indicator")
    }

    setupEventListeners() {
        this.header.addEventListener("mouseover", () => {
            this.isHovered = true
            this.resetTimeOut()
            this.showHeader()
        })

        this.header.addEventListener("mouseleave", () => {
            this.isHovered = false
            this.scheduleHeaderHiding()
        })

        let showOrHideHeader = () => {
            let scrollTop = window.scrollY
            if (scrollTop > this.lastScrollTop) {
                if (!this.isHovered) {
                    this.hideHeader()
                }
            } else {
                this.showHeader()

                if (!this.isHovered) {
                    this.scheduleHeaderHiding()
                }
            }
            this.lastScrollTop = scrollTop
        }

        window.addEventListener("scroll", showOrHideHeader)
    }

    hideHeader() {
        this.header.classList.add("header--hidden")
    }

    showHeader() {
        this.header.classList.remove("header--hidden")
    }

    scheduleHeaderHiding() {
        if (this.hidingHeaderTimeDelayId) {
            this.resetTimeOut()
        }
        this.hidingHeaderTimeDelayId = setTimeout(() => {
            this.header.classList.add("header--hidden")
        }, HeaderInteraction.HIDING_HEADER_TIME_DELAY)
    }

    resetTimeOut() {
        clearTimeout(this.hidingHeaderTimeDelayId)
        this.hidingHeaderTimeDelayId = null
    }

    changeIndicatorCoordinates(index) {
        console.log(index)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    headerInteractionInstance = new HeaderInteraction()
})