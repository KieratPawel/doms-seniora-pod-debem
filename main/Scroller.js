export default class Scroller {
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
