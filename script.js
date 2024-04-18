// Scroll down to close the navigation bar and scroll up to open navigation bar
let prevScrollPos = window.scrollY
let timeout

window.onscroll = function () {
    let currentScrollPos = window.scrollY
    let header = document.querySelector("header")
    let headerHeight = header.clientHeight

    if (prevScrollPos < currentScrollPos) {
        header.style.top = -headerHeight + "px"
    } else {
        header.style.top = "0"
        clearTimeout(timeout)
        if (currentScrollPos > headerHeight) {
            timeout = setTimeout(function () {
                header.style.top = -headerHeight + "px"
            }, 1200)
        }
    }
    prevScrollPos = currentScrollPos
}
//

// Add opening drawer menu event and closing drawer menu event
function openDrawerMenu() {
    document.getElementById("drawer-menu").style.left = "0"

    let header = document.querySelector("header")
    header.style.top = -header.clientHeight + "px"

    document.querySelector("body").classList.add("no-scroll")
}

function closeDrawerMenu() {
    document.getElementById("drawer-menu").style.left = "100%"

    let header = document.querySelector("header")
    if (prevScrollPos <= header.clientHeight) header.style.top = "0"

    document.querySelector("body").classList.remove("no-scroll")
}
//

//navigation for tablet and phone screen size
function goTo(target) {
    window.location.href = target
    closeDrawerMenu()
}

// Create an intersection observer all the animated elements
let targetElements = [
    document.querySelector("#personal-statement"),
    document.querySelector("#personal-statement > .body-container"),
    document.querySelector("#personal-statement > figure"),
    document.querySelector("#working-status > span"),
    document.querySelector("#introduction > .about-me > figure"),
    document.querySelector("#introduction > .about-me > .context-container > .title"),
    document.querySelector("#introduction > .about-me > .context-container > p"),
    document.querySelector(
        "#introduction > .sub-introductions-container > .sub-introduction-1-container > .sub-introduction-1"
    ),
    document.querySelector(
        "#introduction > .sub-introductions-container > .sub-introduction-2-container > .sub-introduction-2 "
    ),
    document.querySelector("#introduction > .about-me > .figure-and-sub-introductions > figure"),
    document.querySelector("#recent-project-container > .title "),
    document.querySelector("#joining-team-request-container > .body-container > .title "),
    document.querySelector("footer > .social-media-container > span ")
]
document
    .querySelectorAll("#drawer-menu > .social-media-container > .social-media-button")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("#drawer-menu > .social-media-container > .social-media-button-logo")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll(
        "#introduction > .about-me > .figure-and-sub-introductions > .sub-introductions-container > .sub-introduction"
    )
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("#recent-project-container > .projects > .project > .name ")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("#recent-project-container > .projects > .project > .category ")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("#recent-project-container>.projects>.project-2>.name-and-category>.name ")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("#recent-project-container>.projects>.project-2>.name-and-category>.category")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("#recent-project-container>.projects>.project-2>.cta")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("#joining-team-request-container > .body-container > .buttons > .button ")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("#joining-team-request-container > .body-container > .buttons > .logo-button")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("footer > .social-media-container > .social-media > .social-media-button ")
    .forEach((element) => targetElements.push(element))

document
    .querySelectorAll("footer > .social-media-container > .social-media > .social-media-button-logo")
    .forEach((element) => targetElements.push(element))

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.removeAttribute("style")
        } else {
            entry.target.style.animationName = "none"
        }
    })
})

let transitionLayer = document.getElementById("transition-layer")

const transitionLayerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio < 0.8) {
                targetElements.forEach((element) => {
                    observer.observe(element)
                })
            }
            if (entry.isIntersecting) {
                document.querySelector("body").classList.add("no-scroll")
            } else {
                document.querySelector("body").classList.remove("no-scroll")
            }
        })
    },
    { threshold: 0.8 }
)

transitionLayerObserver.observe(transitionLayer)
