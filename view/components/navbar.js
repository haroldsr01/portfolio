 // Define the Navbar Web Component
 class NavbarComponent extends HTMLElement {
    constructor() {
      super();
    //   this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.innerHTML = `
            <nav class="nav-container">
                <ul class="nav-treeview">                    
                    <li><a class="nav-link" href="/">Intro</a></li>
                    <li><a class="nav-link" href="/page1">Projects</a></li>
                    <li><a class="nav-link" href="/page2">Contact</a></li>
                </ul>
            </nav>            
      `;       
    }
  }

  // Register the custom element
  customElements.define('navbar-component', NavbarComponent);