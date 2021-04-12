export default class ImageInjector {
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
