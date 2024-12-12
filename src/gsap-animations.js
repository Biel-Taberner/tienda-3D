import gsap from "gsap";
import Letterize from "letterizejs"
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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


const timeline = gsap.timeline();

const splittedTitleText = new Letterize({targets: "#main-body-first-section-title-text"});

timeline.from(splittedTitleText.list, {

  stagger: 0.075,
  duration: 0.5,
  opacity: 0,
  transformOrigin: "0% 50% -50",
  rotateY: 180,

})

timeline.to("#bottomBorderTitleLine", {
  duration: 0.35,
  stagger: 0.25,
  width: "100%"
})

timeline.to("#rightBorderTitleLine", {
  duration: 0.35,
  stagger: 0.25,
  height: "100%"
})

timeline.to("#topBorderTitleLine", {
  duration: 0.35,
  stagger: 0.25,
  width: "100%"
})

timeline.to("#leftBorderTitleLine", {
  duration: 0.35,
  stagger: 0.25,
  height: "100%"
})

timeline.to(splittedTitleText.list, {
  stagger: 0.05,
  textShadow: "2px 2px 10px black"
})


gsap.set(".footer-container-info-box-tab-title-subcontainer-hr", {
  width: "0px",
  visibility: "hidden",
})

gsap.to(".footer-container-info-box-tab-title-subcontainer-hr", {
  stagger: 0.25,
  duration: 1,
  visibility: "visible",
  ease: "power2.out",
  width: "35%",
  scrollTrigger: {
    trigger: ".footer-container-info-box-tab-title-subcontainer-hr",
  }
})







const colors = [
  "#8D6346",
  "#6E0000",
  "#6A878C",
  "#b4b2a4"
];
const sliders = gsap.utils.toArray(".slider");
const slidesArray = sliders.map((slider) =>
  gsap.utils.toArray(".slide", slider)
);
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let currentIndex = 0;
let isTweening = false;

slidesArray.forEach((slides) => {
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      // backgroundColor: colors[i],
      xPercent: i > 0 && 100
    });
  });
});

const gotoSlide = (value) => {
  if (isTweening) return;
  isTweening = true;
  const first = slidesArray[0];
  const currentSlides = [];
  const nextSlides = [];
  slidesArray.forEach((slides) => currentSlides.push(slides[currentIndex]));
  if (first[currentIndex + value]) {
    currentIndex += value;
  } else {
    currentIndex = value > 0 ? 0 : first.length - 1;
  }
  slidesArray.forEach((slides) => nextSlides.push(slides[currentIndex]));
  if (value > 0) {
    gsap.set(nextSlides, { xPercent: 100 });
    gsap.to(currentSlides, {
      xPercent: -100,
      onComplete: () => (isTweening = false)
    });
  } else {
    gsap.set(nextSlides, { xPercent: -100 });
    gsap.to(currentSlides, {
      xPercent: 100,
      onComplete: () => (isTweening = false)
    });
  }
  gsap.to(nextSlides, { xPercent: 0 });
  gsap.to(nextSlides, {
    backgroundColor: colors[currentIndex],
    duration: 2
  })
};

next.addEventListener("click", () => gotoSlide(1));
prev.addEventListener("click", () => gotoSlide(-1));


const colorsIconShoes = [
  "#8D6346",
  "#6E0000",
  "#6A878C",
  "#b4b2a4"
];
const slidersIconic = gsap.utils.toArray(".slider-iconic");
const slidesIconicArray = slidersIconic.map((slider) =>
  gsap.utils.toArray(".slide-iconic", slider)
);
const next_icon = document.getElementById("next_icon");
const prev_icon = document.getElementById("prev_icon");

let currentIconicIndex = 0;
let isIconTweening = false;

slidesIconicArray.forEach((slides) => {
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      backgroundColor: "#171717",
      xPercent: i > 0 && 100
    });
  });
});

const gotoIconSlide = (value) => {
  if (isIconTweening) return;
  isIconTweening = true;
  const first = slidesIconicArray[0];
  const currentIconicSlides = [];
  const nextIconicSlides = [];
  slidesIconicArray.forEach((slides) => currentIconicSlides.push(slides[currentIconicIndex]));
  if (first[currentIconicIndex + value]) {
    currentIconicIndex += value;
  } else {
    currentIconicIndex = value > 0 ? 0 : first.length - 1;
  }
  slidesIconicArray.forEach((slides) => nextIconicSlides.push(slides[currentIconicIndex]));
  if (value > 0) {
    gsap.set(nextIconicSlides, { xPercent: 100 });
    gsap.to(currentIconicSlides, {
      xPercent: -100,
      onComplete: () => (isIconTweening = false)
    });
  } else {
    gsap.set(nextIconicSlides, { xPercent: -100 });
    gsap.to(currentIconicSlides, {
      xPercent: 100,
      onComplete: () => (isIconTweening = false)
    });
  }
  gsap.to(nextIconicSlides, { xPercent: 0 });
};

next_icon.addEventListener("click", () => gotoIconSlide(1));
prev_icon.addEventListener("click", () => gotoIconSlide(-1));