// ==========================================================================
// Maya Chen — Portfolio site behaviour
// Progressive enhancement only: all pages work with JS disabled.
// ==========================================================================

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.setAttribute("data-expanded", String(!expanded));
      toggle.textContent = expanded ? "Menu ▾" : "Close ✕";
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Accessible contact form validation ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusBox = document.getElementById("form-status");

  var validators = {
    name: function (value) {
      return value.trim().length >= 2 ? "" : "Enter your name (at least 2 characters).";
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim()) ? "" : "Enter a valid email address, like jane@example.com.";
    },
    message: function (value) {
      return value.trim().length >= 10 ? "" : "Message should be at least 10 characters.";
    }
  };

  function fieldEls(name) {
    var input = form.elements[name];
    var error = document.getElementById(name + "-error");
    return { input: input, error: error };
  }

  function validateField(name) {
    var els = fieldEls(name);
    if (!els.input) return true;
    var message = validators[name] ? validators[name](els.input.value) : "";
    els.input.setAttribute("data-touched", "true");
    if (message) {
      els.input.setAttribute("aria-invalid", "true");
      if (els.error) els.error.textContent = message;
      return false;
    }
    els.input.setAttribute("aria-invalid", "false");
    if (els.error) els.error.textContent = "";
    return true;
  }

  ["name", "email", "message"].forEach(function (name) {
    var els = fieldEls(name);
    if (els.input) {
      els.input.addEventListener("blur", function () {
        validateField(name);
      });
      els.input.addEventListener("input", function () {
        if (els.input.getAttribute("data-touched") === "true") {
          validateField(name);
        }
      });
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var isValid = ["name", "email", "message"].reduce(function (acc, name) {
      var ok = validateField(name);
      return acc && ok;
    }, true);

    if (!isValid) {
      statusBox.textContent = "The form has errors. Please review the highlighted fields above.";
      statusBox.setAttribute("data-state", "error");
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend is wired up in this skeleton — simulate success.
    statusBox.textContent = "Thank you — your message has been noted. Maya will reply within two business days.";
    statusBox.setAttribute("data-state", "success");
    form.reset();
    ["name", "email", "message"].forEach(function (name) {
      var els = fieldEls(name);
      if (els.input) {
        els.input.removeAttribute("data-touched");
        els.input.removeAttribute("aria-invalid");
      }
      if (els.error) els.error.textContent = "";
    });
  });
})();
