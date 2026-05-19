const filterButtons = document.querySelectorAll(".filter-btn");
const moduleCards = document.querySelectorAll(".module-card");
const checkboxes = document.querySelectorAll(".practice-list input[type='checkbox']");
const progressText = document.querySelector("#progressText");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");

const storageKey = "python-data-analyst-progress";

function injectHeroVisual() {
  if (document.querySelector(".hero-visual")) {
    return;
  }

  const codePanel = document.querySelector(".hero > .code-panel");

  if (!codePanel) {
    return;
  }

  const visual = document.createElement("div");
  visual.className = "hero-visual";
  visual.setAttribute("aria-label", "Визуальный пример аналитического отчета GUDINI");
  visual.innerHTML = `
    <div class="dashboard-card">
      <div class="dashboard-top">
        <div>
          <span class="mini-label">GUDINI report</span>
          <strong>Продажи за неделю</strong>
        </div>
        <span class="status-pill">Python</span>
      </div>
      <div class="metric-row">
        <div>
          <span>Выручка</span>
          <strong>842K</strong>
        </div>
        <div>
          <span>Заказы</span>
          <strong>1 284</strong>
        </div>
        <div>
          <span>CR</span>
          <strong>6.8%</strong>
        </div>
      </div>
      <div class="chart" aria-hidden="true">
        <span style="height: 42%"></span>
        <span style="height: 58%"></span>
        <span style="height: 36%"></span>
        <span style="height: 72%"></span>
        <span style="height: 64%"></span>
        <span style="height: 88%"></span>
        <span style="height: 76%"></span>
      </div>
      <div class="insight-row">
        <span>top_source</span>
        <strong>organic_search</strong>
        <em>+18%</em>
      </div>
    </div>
  `;

  codePanel.classList.add("compact-code");
  codePanel.replaceWith(visual);
  visual.append(codePanel);
}

function initRevealEffects() {
  const items = document.querySelectorAll(
    ".roadmap article, .rule-grid article, .module-card, .progress-box, .practice-list label, .final-project"
  );

  items.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function initSpotlight() {
  const canHover = window.matchMedia("(hover: hover)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canHover || reducedMotion) {
    return;
  }

  window.addEventListener("pointermove", (event) => {
    const x = `${Math.round((event.clientX / window.innerWidth) * 100)}%`;
    const y = `${Math.round((event.clientY / window.innerHeight) * 100)}%`;

    document.documentElement.style.setProperty("--spotlight-x", x);
    document.documentElement.style.setProperty("--spotlight-y", y);
  });
}

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = saved.includes(checkbox.dataset.task);
  });
}

function saveProgress() {
  const completed = [...checkboxes]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.task);

  localStorage.setItem(storageKey, JSON.stringify(completed));
  updateProgress();
}

function updateProgress() {
  const completedCount = [...checkboxes].filter((checkbox) => checkbox.checked).length;
  const totalCount = checkboxes.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  progressText.textContent = `${completedCount} из ${totalCount} блоков выполнено`;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    moduleCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.stage === filter;
      card.classList.toggle("hide", !isVisible);
    });
  });
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", saveProgress);
});

injectHeroVisual();
initRevealEffects();
initSpotlight();
loadProgress();
updateProgress();
