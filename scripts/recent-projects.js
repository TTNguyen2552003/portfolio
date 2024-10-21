/**
 * Singleton instance for RecentProjects.
 * @type {RecentProjects|null}
 */
let recentProjectsInstance = null

/**
 * Manages the display and interaction of recent projects section with thumbnails and detailed views.
 */
class RecentProjects {
    /**
     * Gap between thumbnails in pixels.
     * @type {number}
     * @constant
     */
    static THUMBNAILS_GAP = 96

    /**
     * Rotation angle for thumbnail transformation in degrees.
     * @type {number}
     * @constant
     */
    static TRANSFORM_ROTATION = 10

    /**
     * Horizontal translation percentage for thumbnail transformation.
     * @type {number}
     * @constant
     */
    static TRANSFORM_TRANSLATE_X = -5

    /**
     * Initializes a new instance of RecentProjects.
     */
    constructor() {
        /**
         * Array of thumbnail elements.
         * @type {HTMLElement[]}
         */
        this.thumbnails = []

        /**
         * Array of project shortcut elements.
         * @type {HTMLElement[]}
         */
        this.projectShortcuts = []

        /**
         * Container element for project shortcuts.
         * @type {HTMLElement|null}
         */
        this.projectShortcutsContainer = null

        /**
         * Array of detailed project elements.
         * @type {HTMLElement[]}
         */
        this.detailedProjects = []

        /**
         * Container element for detailed projects.
         * @type {HTMLElement|null}
         */
        this.detailedProjectsContainer = null

        /**
         * Array of back button elements for detailed project views.
         * @type {HTMLElement[]}
         */
        this.backButtons = []

        /**
         * The index of project thumbnail and project in detailed view (if user click on shortcut)
         */
        this.selectedIndex = 0

        this.initialize()
    }

    /**
     * Initializes elements and sets up event listeners.
     * @private
     */
    initialize() {
        this.setupElements()
        this.setupEventListeners()
    }

    /**
     * Queries and sets up the required DOM elements.
     * @private
     */
    setupElements() {
        this.thumbnails = Array.from(document.querySelectorAll(".project-thumbnail"))
        this.projectShortcuts = Array.from(document.querySelectorAll(".project-shortcut"))
        this.projectShortcutsContainer = document.querySelector(".project-shortcuts")
        this.detailedProjects = Array.from(document.querySelectorAll(".project--detailed"))
        this.detailedProjectsContainer = document.querySelector(".projects--detailed")
        this.backButtons = Array.from(document.querySelectorAll(".project--detailed__back-button"))
    }

    /**
     * Sets up event listeners for project shortcuts and back buttons.
     * @private
     */
    setupEventListeners() {
        this.projectShortcuts.forEach((shortcut, projectShortcutIndex) => {
            shortcut.addEventListener("mouseover", () => {
                this.selectedIndex = projectShortcutIndex
                this.translateThumbnails(this.selectedIndex)
            })

            shortcut.addEventListener("click", () => {
                this.toggleElementsVisibility(projectShortcutIndex)
            })
        })

        this.backButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.toggleElementsVisibility(index)
            })
        })

        window.addEventListener("resize", () => {
            this.translateThumbnails(this.selectedIndex)
        })
    }

    /**
     * Translates and rotates thumbnails based on the selected index.
     * Adjusts the transform property of each thumbnail to position it correctly.
     * @param {number} selectedIndex - The index of the currently selected thumbnail.
     * @private
     */
    translateThumbnails(selectedIndex) {
        let translateY = this.calculateTranslateY(selectedIndex)
        this.thumbnails.forEach((thumbnail, thumbnailIndex) => {
            if (thumbnailIndex < selectedIndex) {
                thumbnail.style.transform = `rotate(-${RecentProjects.TRANSFORM_ROTATION}deg) translate(${RecentProjects.TRANSFORM_TRANSLATE_X}%, ${translateY}px)`
            } else if (thumbnailIndex == selectedIndex) {
                thumbnail.style.transform = `translateY(${translateY}px)`
            } else {
                thumbnail.style.transform = `rotate(${RecentProjects.TRANSFORM_ROTATION}deg) translate(${RecentProjects.TRANSFORM_TRANSLATE_X}%, ${translateY}px)`
            }
        })
    }

    /**
     * Calculates the Y translation value for a thumbnail based on its index.
     * @param {number} index - The index of the project shortcut.
     * @returns {number} - The calculated translateY value in pixels.
     * @private
     */
    calculateTranslateY(index) {
        let translateY = 0
        for (let i = 0; i < index; i++) {
            translateY -= this.thumbnails[i].clientHeight
        }
        translateY -= index * RecentProjects.THUMBNAILS_GAP
        return translateY
    }

    /**
     * Toggles the visibility of project shortcuts and detailed project elements.
     * @param {number} index - The index of the detailed project to show or hide.
     * @private
     */
    toggleElementsVisibility(index) {
        this.projectShortcutsContainer.classList.toggle("project-shortcuts--hidden")
        this.detailedProjects[index].classList.toggle("project--detailed--hidden")
        this.detailedProjectsContainer.classList.toggle("projects--detailed--hidden")
    }
}

// Initialize RecentProjects when the DOM content is fully loaded.
window.addEventListener("DOMContentLoaded", () => {
    recentProjectsInstance = new RecentProjects()
})
