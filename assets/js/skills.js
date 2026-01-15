fetch("assets/data/skills.json")
  .then(res => res.json())
  .then(skills => {
    const container = document.getElementById("skills");
    if (!container) return;

    skills.forEach(skill => {
      container.innerHTML += `
        <span class="skill">
          <i class="${skill.icon}" style="color:${skill.color}"></i>
          <span>${skill.name}</span>
        </span>
      `;
    });
  });
