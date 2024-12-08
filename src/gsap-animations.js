import gsap from "gsap";

document.querySelectorAll("#header-container-link").forEach((link) => {
link.addEventListener("mouseover", (e) => {
    const loaderBar = e.target.closest("div").previousElementSibling;

    gsap.to(loaderBar, {
    width: "100%",
    duration: 0.8,
    });
});

link.addEventListener("mouseleave", (e) => {
    const loaderBar = e.target.closest("div").previousElementSibling;
    gsap.to(loaderBar, {
    width: "0%",
    duration: 0.8,
    });
});
});

const iconTimeline = gsap.timeline()

const icon = document.getElementById("header-container-searchBar-subcontainer-icon");

icon.addEventListener("click", (e) => {
iconTimeline.to(e.target, {
    duration: 1,
    rotate: "360",
    ease: "power2.out",
});

iconTimeline.to(".header-container-searchBar", {

    width: "234px",
    stagger: 0.1

})

iconTimeline.to(".header-container-searchBar-subcontainer", {

    stagger: 0.05,

})

iconTimeline.to(".header-container-searchBar-subcontainer-textInput", {

    display: "flex",
    width: "100%"

})

iconTimeline.to("#searchBar-textInput", {

    width: "100%",

})

});

const logo = document.getElementById("header_logo");

logo.addEventListener("mouseover", (e) => {

gsap.to(e.target, {
    duration: 1,
    ease: "power2.out",
    overwrite: true,
    scale: "1.3",
});

})

logo.addEventListener("mouseleave", (e) => {
gsap.to(e.target, {
    duration: 1,
    ease: "power2.out",
    scale: "1",
});
});