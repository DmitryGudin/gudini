const filterButtons = document.querySelectorAll(".filter-btn");
const moduleCards = document.querySelectorAll(".module-card");
const checkboxes = document.querySelectorAll(".practice-list input[type='checkbox']");
const progressText = document.querySelector("#progressText");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");

const storageKey = "python-data-analyst-progress";

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

loadProgress();
updateProgress();
