let drawerMenuInstance = null

/**
 * Represents a drawer menu with open and close functionality.
 * Handles the animation duration, page scroll locking, and event listeners.
 */
class DrawerMenu {
    /** @constant {number} Duration of the close drawer animation in milliseconds. */
    static CLOSE_DRAWER_ANIMATION_DURATION = 1000

    /**
     * Initializes the drawer menu, sets up elements, and event listeners.
     */
    constructor() {
        /** @type {HTMLElement | null} The drawer menu element. */
        this.drawerMenu = null
        /** @type {HTMLElement | null} The button to open the drawer menu. */
        this.openDrawerMenuButton = null
        /** @type {HTMLElement | null} The button to close the drawer menu. */
        this.closeDrawerMenuButton = null
        /** @type {HTMLElement[]} List of navigation items in the drawer menu. */
        this.drawerNavigationItems = []
        /** @type {HTMLElement[]} List of social media items in the drawer menu. */
        this.socialMediaItems = []
        /** @type {HTMLElement | null} Represents the HTML page element for scroll control. */
        this.page = null
        /** @type {number | null} ID of the timeout for re-enabling page scrolling. */
        this.toggleScrollPageId = null

        this.initialize()
    }

    /**
     * Initializes the drawer menu by setting up elements and event listeners.
     * @private
     */
    initialize() {
        this.setupElements()
        this.setupEventListeners()
    }

    /**
     * Sets up the DOM elements needed for the drawer menu functionality.
     * @private
     */
    setupElements() {
        this.drawerMenu = document.querySelector("#drawer-menu")
        this.openDrawerMenuButton = document.querySelector(".header__open-drawer-menu-button")
        this.closeDrawerMenuButton = document.querySelector(".drawer-menu__close-button")
        this.drawerNavigationItems = Array.from(document.querySelectorAll(".drawer-menu-navigation-item"))
        this.socialMediaItems = Array.from(document.querySelectorAll(".social-media-item"))
        this.page = document.querySelector("html")
    }

    /**
     * Sets up event listeners for opening and closing the drawer menu and item clicks.
     * @private
     */
    setupEventListeners() {
        this.openDrawerMenuButton.addEventListener("click", () => {
            this.openDrawerMenu()
            this.cancelEnableScrollingSchedule()
            this.blockPageScrolling()
        })

        this.closeDrawerMenuButton.addEventListener("click", () => {
            this.closeDrawerMenu()
            this.scheduleEnablePageScrolling()
        })

        this.drawerNavigationItems.forEach((item) => {
            item.addEventListener("click", () => {
                this.cancelEnableScrollingSchedule()
                this.enablePageScrolling()
                this.closeDrawerMenu()
            })
        })

        this.socialMediaItems.forEach((item) => {
            item.addEventListener("click", () => {
                this.cancelEnableScrollingSchedule()
                this.enablePageScrolling()
                this.closeDrawerMenu()
            })
        })
    }

    /**
     * Closes the drawer menu by adding a hidden class.
     */
    closeDrawerMenu() {
        this.drawerMenu.classList.add("drawer-menu--hidden")
    }

    /**
     * Opens the drawer menu by removing a hidden class.
     */
    openDrawerMenu() {
        this.drawerMenu.classList.remove("drawer-menu--hidden")
    }

    /**
     * Schedules re-enabling of page scrolling after a set duration.
     */
    scheduleEnablePageScrolling() {
        this.toggleScrollPageId = setTimeout(() => {
            this.enablePageScrolling()
        }, DrawerMenu.CLOSE_DRAWER_ANIMATION_DURATION)
    }

    /**
     * Cancels the scheduled re-enabling of page scrolling.
     */
    cancelEnableScrollingSchedule() {
        clearTimeout(this.toggleScrollPageId)
        this.toggleScrollPageId = null
    }

    /**
     * Blocks page scrolling by adding a class that disables scroll.
     */
    blockPageScrolling() {
        this.page.classList.add("no-scroll")
    }

    /**
     * Enables page scrolling by removing the scroll-lock class.
     */
    enablePageScrolling() {
        this.page.classList.remove("no-scroll")
    }
}

/**
 * Initializes the drawer menu instance when the DOM is fully loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    drawerMenuInstance = new DrawerMenu()
})
