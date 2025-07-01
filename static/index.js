document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  /**
   * Función para el desplazamiento suave cuando se hace clic en un enlace de navegación.
   */
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Previene el comportamiento predeterminado del enlace (salto instantáneo)
    const targetId = this.querySelector("a").getAttribute("href");
      // Encuentra la sección de destino en el DOM
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calcula la posición superior a la que se debe desplazar la ventana.
        // Resta la altura de la barra de navegación fija para que la sección no quede oculta.
        const offsetTop = targetSection.offsetTop ;

        // Realiza el desplazamiento suave usando la API nativa de scrollIntoView
        // 'behavior: "smooth"' proporciona una animación de desplazamiento suave.
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  /**
   * Función para resaltar el enlace de navegación de la sección actualmente visible.
   */
  function highlightActiveSection() {
    let currentActiveSectionId = ""; // Variable para almacenar el ID de la sección activa

    // Itera sobre cada sección para determinar cuál está actualmente visible
    sections.forEach((section) => {
      // Calcula la posición superior de la sección, ajustada por la altura del nav
      const sectionTop = section.offsetTop;
      // Calcula la altura total de la sección
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentActiveSectionId = "#" + section.id; // Almacena el ID de la sección activa
      }
    });

    // Primero, remueve la clase 'active' de todos los enlaces de navegación
    navLinks.forEach((link) => {
      link.classList.remove("select-nav"); // Remueve la clase 'active'
    });

    // Si se encontró una sección activa, añade la clase 'active' al enlace correspondiente
    if (currentActiveSectionId) {
      navLinks.forEach((link) => {
        const anchor = link.querySelector("a");
        if (anchor && anchor.getAttribute("href") === currentActiveSectionId) {
          link.classList.add("select-nav");
        }
      });
    }
  }

  // Añade un listener al evento 'scroll' de la ventana para actualizar la sección activa
  window.addEventListener("scroll", highlightActiveSection);

  // Llama a la función una vez al cargar la página para establecer la sección inicial
  highlightActiveSection();
});
