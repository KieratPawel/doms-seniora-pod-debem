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

export default config;