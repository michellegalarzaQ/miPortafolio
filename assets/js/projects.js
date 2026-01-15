fetch('assets/data/projects.json')
  .then(res => res.json())
  .then(projects => {

    const techs = ["Angular", "Node.js", "JWT", "API REST", "MySQL", "Docker", "PDFMake", "Flutter", "Clean Architecture", "Laravel", "Swagger", "React", "PHP"];
    const regex = new RegExp(`\\b(${techs.join("|")})\\b`, "g");

    /* ===== INDEX ===== */
    const listContainer = document.getElementById('projects-container');

    if (listContainer) {
      projects.forEach(p => {
        listContainer.innerHTML += `
          <div class="col-xl-3 col-lg-4 col-md-6">
            <a href="detail_projects.html?id=${p.id}" class="project-card-link">
              <div class="member">
                <img src="${p.cardImage}" class="img-fluid" alt="${p.title}">
                
                <div class="member-info">
                  <div class="member-info-content">
                    <h4 class="project-title">${p.title}</h4>
                    <span>${p.subtitle}</span>
                  </div>
    
                  <div class="project-action mt-2">
                    <i class="fa-solid fa-eye"></i>
                    <span>Ver</span>
                  </div>
                </div>
              </div>
            </a>
          </div>`;
      });
    }
    
    /* ===== DETALLE ===== */
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) return;

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('project-title').textContent = project.detailTitle;

    document.getElementById('slider').innerHTML =
      project.images.map(img =>
        `<div class="swiper-slide"><img src="${img}"></div>`
      ).join('');

    document.getElementById('project-tags').innerHTML =
      project.tags.map(t =>
        `<span class="tag ${t.type}" data-aos="fade-up" data-aos-delay="${t.delay}">${t.name}</span>`
      ).join('');

      
    document.getElementById('project-description').innerHTML =
      project.description.map(d => {
          const formatted = d.replace(regex, '<strong>$1</strong>');
          return `<p class="project-description" style="text-align: justify;">${formatted}</p>`;
      }).join('');
    


    document.getElementById('project-modules').innerHTML =
      project.modules.map(m =>
        `<li>
            <i class="fas ${m.icon}" style="color: ${m.color || 'black'}"></i> ${m.text}
        </li>`
      ).join('');


    /* ===== IMAGENES CARRUSEL ===== */
    setTimeout(() => {
        new Swiper('.portfolio-details-slider', {
        loop: true,
        speed: 600,
        autoplay: { delay: 5000, },
        slidesPerView: "auto",
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: "bullets",
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
        });
    }, 1000);
});
