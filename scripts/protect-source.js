let blockViewingSourceInstance = null

class BlockViewingSource {
    constructor() {
        this.setupEvents()
    }

    setupEvents() {
        window.addEventListener("contextmenu", (event) => {
            event.preventDefault()
            this.rateProjectOnGitHub()
        })

        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "Meta":
                    event.preventDefault()
                    this.rateProjectOnGitHub()
                    break
                case "Control":
                    event.preventDefault()
                    this.rateProjectOnGitHub()
                    break
                case "F12":
                    event.preventDefault()
                    this.rateProjectOnGitHub()
                    break
            }
        })

        document.querySelectorAll("img").forEach((image) => {
            image.addEventListener("dragstart", (event) => {
                event.preventDefault()
            })

            image.addEventListener("touchstart", (event) => {
                event.preventDefault()
            })
        })
    }

    rateProjectOnGitHub() {
        window.alert("Why don't you rate my project on GitHub :))")
    }
}

window.addEventListener("load", () => {
    blockViewingSourceInstance = new BlockViewingSource()
})
