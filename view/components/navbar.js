 // Define the Navbar Web Component
 class NavbarComponent extends HTMLElement {
    constructor() {
      super();
    //   this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.innerHTML = `
            <nav class="navbar navbar-expand-md bg-body-tertiary">
              <div class="container-fluid">
                <a class="navbar-brand" href="/">
                  <img src="./img/myfav_logo_crop_transparent.png" alt="myfav_logo" width="150px">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav w-100 column-gap-5 justify-content-center">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/about">About Me</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/portfolio">Portfolio</a>
                    </li>                    
                  </ul>                  
                  <a class="btn btn-outline-success" type="button" href="#contact">Contact</a>
                </div>
            </div>
          </nav>
      `;       
    }
  }

  // Register the custom element
  customElements.define('navbar-component', NavbarComponent);