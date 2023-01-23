export class VideoIFrame {
  parentElm: any;
  iframe: any;
  isMouseOver: boolean = false;

  constructor(parentElm: string, iframe: any) {
    this.parentElm = parentElm;
    this.iframe = iframe;

    window.addEventListener('blur', (e: any) => {
      if (document.activeElement === this.iframe && this.isMouseOver) {
        setTimeout(this.focusParentDiv, 100);
      }
    });

    iframe.addEventListener('mouseover', this.mouseOver);
    iframe.addEventListener('mouseout', this.mouseOut);
  }

  focusParentDiv = () => {
    if (this.parentElm) {
      // Store previous scroll position
      let x = window.scrollX,
        y = window.scrollY;
      this.parentElm.focus();
      // Restore previous scroll position
      window.scrollTo(x, y);
    }
  };

  mouseOver = () => {
    this.isMouseOver = true;
  };

  mouseOut = () => {
    this.isMouseOver = false;
  };

  unregister = () => {
    this.iframe.removeEventListener('mouseover', this.mouseOver);
    this.iframe.removeEventListener('mouseout', this.mouseOut);
  };
}
