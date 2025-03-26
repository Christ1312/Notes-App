class AppFooter extends HTMLElement {
    constructor() {
      super();
   
      this.render();
    }
   
    render() {
      this.innerHTML = `
        <footer>
          &copy; 2025, Dicoding Academy
        </footer>
      `;
    }
  }
   
  customElements.define('app-footer', AppFooter);