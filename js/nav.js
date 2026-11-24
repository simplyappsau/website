(function () {
  var dropdowns = document.querySelectorAll(".nav-dropdown");
  if (!dropdowns.length) return;

  function fineHover() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function setOpen(dropdown, open) {
    var button = dropdown.querySelector(".nav-dropdown-toggle");
    dropdown.classList.toggle("is-open", open);
    if (button) button.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeAll(except) {
    dropdowns.forEach(function (dropdown) {
      if (dropdown !== except) setOpen(dropdown, false);
    });
  }

  dropdowns.forEach(function (dropdown) {
    var button = dropdown.querySelector(".nav-dropdown-toggle");
    if (!button) return;

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var willOpen = !dropdown.classList.contains("is-open");
      closeAll();
      setOpen(dropdown, willOpen);
    });

    dropdown.addEventListener("mouseenter", function () {
      if (!fineHover()) return;
      closeAll();
      setOpen(dropdown, true);
    });

    dropdown.addEventListener("mouseleave", function () {
      if (!fineHover()) return;
      setOpen(dropdown, false);
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav-dropdown")) closeAll();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var open = document.querySelector(".nav-dropdown.is-open");
    closeAll();
    if (open) {
      var button = open.querySelector(".nav-dropdown-toggle");
      if (button) button.focus();
    }
  });
})();
