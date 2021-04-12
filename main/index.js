const config = {
  mediaBreakdown: 1024,
  sliderDuration: 4000,
  frontPhotos: ["./images/building.jpg"],
  frontConfig: {
    type: "fade",
    rewind: true,
    autoplay: true,
    speed: 1000,
    interval: 4000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    pagination: false,
    height: "100vh",
    cover: true,
  },
  aboutPhotos: ["./images/hands.jpg"],
  galleryPhotos: [
    "./images/day-room2.jpg",
    "./images/yard2.jpg",
    "./images/room3.jpg",
    "./images/medic.jpg",
    "./images/kitchen.jpg",
    "./images/room.jpg",
    "./images/room2.jpg",
    "./images/bathroom.jpg",
    "./images/building.jpg",
    "./images/corridor.jpg",
    "./images/enterance.jpg",
    "./images/lobby.jpg",
    "./images/corridor2.jpg",
    "./images/saloon.jpg",
    "./images/toilet.jpg",
    "./images/corridor3.jpg",
    "./images/saloon2.jpg",
    "./images/toilet2.jpg",
    "./images/day-room.jpg",
    "./images/yard.jpg",
  ],
  galleryConfig: {
    rewind: true,
    autoplay: true,
    perPage: 1,
    height: "80vh",
    cover: true,
    easing: "cubic-bezier(.2,.8,.9,.99)",
    pauseOnHover: false,
    speed: 700,
  },
  splideStructure: [
    "splide__slide__container",
    "splide__slide",
    "splide__list",
    "splide__track",
  ],
};

class ImageInjector {
  constructor(selector, className, src) {
    this.parentElement = document.querySelector(selector);
    const sourceTable = src;
    this.newImages = sourceTable.map((img) => {
      const image = document.createElement("img");
      image.classList.add(className);
      image.setAttribute("src", img);
      return image;
    });
  }

  initPutOrNot(size) {
    if (window.innerWidth >= size) {
      this.newImages.forEach((img) => {
        this.parentElement.appendChild(img);
      });
    }
  }

  putOrCut(size) {
    this.initPutOrNot(size);
    const media = window.matchMedia(`(min-width: ${size}px)`);
    media.addEventListener("change", (e) => {
      if (e.matches) {
        this.newImages.forEach((img) => {
          this.parentElement.appendChild(img);
        });
      } else {
        this.newImages.forEach((img) => {
          img.remove();
        });
      }
    });
  }

  initialize(size, classNameDiv, classNameLi, classNameUl, classNameContainer) {
    const container = document.createElement("div");
    const ul = document.createElement("ul");
    container.setAttribute("class", classNameContainer);
    ul.setAttribute("class", classNameUl);
    container.appendChild(ul);
    this.parentElement.appendChild(container);
    if (window.innerWidth < size) {
      this.newImages.forEach((img) => {
        const li = document.createElement("li");
        li.setAttribute("class", classNameLi);
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", classNameDiv);
        ul.appendChild(li);
        li.appendChild(wrapper);
        wrapper.appendChild(img);
      });
    } else {
      this.newImages.forEach((img) => {
        const link = img.getAttribute("src");
        img.setAttribute(
          "src",
          link.substring(0, link.length - 4) + "-big.jpg"
        );
        const li = document.createElement("li");
        li.setAttribute("class", classNameLi);
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", classNameDiv);
        ul.appendChild(li);
        li.appendChild(wrapper);
        wrapper.appendChild(img);
      });
    }
  }

  resize(size) {
    const media = window.matchMedia(`(min-width: ${size}px)`);
    media.addEventListener("change", (e) => {
      if (e.matches) {
        this.newImages.forEach((img) => {
          const link = img.getAttribute("src");
          img.setAttribute(
            "src",
            link.substring(0, link.length - 4) + "-big.jpg"
          );
        });
      } else {
        this.newImages.forEach((img) => {
          const link = img.getAttribute("src");
          img.setAttribute("src", link.substring(0, link.length - 8) + ".jpg");
        });
      }
    });
  }
}

class Scroller {
  constructor(rootSelector, throttleTime) {
    const rootElement = document.querySelector(rootSelector);
    this.sections = [...rootElement.querySelectorAll("section")];
    const currentSectionIndex = this.sections.findIndex(
      this.isScrolledIntoView
    );
    this.currentSectionIndex = Math.max(currentSectionIndex, 0);
    this.throttleTime = throttleTime;
    this.isThrottled = false;
  }

  isScrolledIntoView(element) {
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = Math.floor(rect.bottom);
    const isVissible = elementTop >= 0 && elementBottom <= window.innerHeight;
    return isVissible;
  }

  listenScroll(event) {
    if (this.isThrottled) return;
    this.isThrottled = !this.isThrottled;
    setTimeout(() => {
      this.isThrottled = !this.isThrottled;
    }, this.throttleTime);
    const direction = event.deltaY > 0 ? 1 : -1;
    this.scroll(direction);
  }

  scroll(direction) {
    if (direction === 1) {
      const isLastSection =
        this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const firstSection = this.currentSectionIndex === 0;
      if (firstSection) return;
    }
    this.currentSectionIndex = this.currentSectionIndex + direction;
    this.scrollToCurrentSection();
  }

  scrollToCurrentSection() {
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  scrollToSection(className) {
    const index = this.sections.findIndex((element) =>
      element.classList.contains(className)
    );
    this.currentSectionIndex = index;
    this.scrollToCurrentSection();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const aboutImage = new ImageInjector(
    ".about",
    "about__image",
    config.aboutPhotos
  );
  aboutImage.putOrCut(config.mediaBreakdown);

  const galleryImages = new ImageInjector(
    ".gallery__container",
    "gallery__image",
    config.galleryPhotos
  );
  const frontImages = new ImageInjector(
    ".front__gallery",
    "front__image",
    config.frontPhotos
  );
  galleryImages.initialize(config.mediaBreakdown, ...config.splideStructure);
  frontImages.initialize(config.mediaBreakdown, ...config.splideStructure);
  galleryImages.resize(config.mediaBreakdown);
  frontImages.resize(config.mediaBreakdown);

  new Splide(".gallery__container", config.galleryConfig).mount();
  new Splide(".front__gallery", config.frontConfig).mount();

  if (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1 ||
    window.innerWidth < 1024
  ) {
    document.documentElement.style.overflow = "auto";
    document.querySelector(".front__button").addEventListener("click", () => {
      document.querySelector(".contact").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  } else {
    const scroller = new Scroller(".page", 800);
    document.addEventListener("wheel", (event) => scroller.listenScroll(event));
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 40) {
        scroller.scroll(1);
      } else if (event.keyCode === 38) {
        scroller.scroll(-1);
      }
    });
    document
      .querySelector(".front__arrow-down-btn")
      .addEventListener("click", () => {
        scroller.scroll(1);
      });

    const navButtons = document.querySelectorAll(".front__nav-link");
    navButtons.forEach((element) => {
      element.addEventListener("click", () => {
        scroller.scrollToSection(element.dataset.link);
      });
    });
  }
});
