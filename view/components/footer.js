 // Define the Navbar Web Component
 class FooterComponent extends HTMLElement {
    constructor() {
      super();
    //   this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.innerHTML = `
            <footer">
                <div class="footer-content">
                    <p>&copy; <span id="year"></span> Your Website Name. All rights reserved.</p>
                    <nav>
                        <ul>
                            <li><a href="/" class="nav-link">Home</a></li>
                            <li><a href="/page1" class="nav-link">Page 1</a></li>
                            <li><a href="/page2" class="nav-link">Page 2</a></li>
                            <li><a href="/contact" class="nav-link">Contact</a></li>
                        </ul>
                    </nav>
                    <p>
                    Follow us on:
                        <a href="https://twitter.com" target="_blank">Twitter</a> |
                        <a href="https://facebook.com" target="_blank">Facebook</a> |
                        <a href="https://instagram.com" target="_blank">Instagram</a>
                    </p>
                </div>
            </footer>

            <script>
            // Dynamically set the year in the footer
            document.getElementById("year").textContent = new Date().getFullYear();
            </script>

      `;       
    }
  }

  // Register the custom element
  customElements.define('footer-component', FooterComponent);