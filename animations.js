document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  function observeElements() {
    document
      .querySelectorAll(
        ".reveal:not(.is-visible), .section:not(.is-visible), .song-card:not(.is-visible), .entity-card:not(.is-visible)"
      )
      .forEach(element => {
        observer.observe(element);
      });
  }

  observeElements();

  const app = document.querySelector("#app");

  if (app) {
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(app, {
      childList: true,
      subtree: true
    });
  }
});
