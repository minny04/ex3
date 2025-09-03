(function () {
  const form = document.getElementById("registerForm");
  const el = (id) => document.getElementById(id);

  const setError = (id, msg) => { el(id).textContent = msg; };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Clear old errors
    ["nameError","fatherNameError","motherNameError","educationError","certificateError"]
      .forEach(id => setError(id, ""));

    // Values
    const name = el("name").value.trim();
    const father = el("fatherName").value.trim();
    const mother = el("motherName").value.trim();
    const education = el("education").value;
    const certificate = el("certificate").files[0];

    // Validations
    if (name.length < 2) { setError("nameError","Enter a valid name"); valid = false; }
    if (father.length < 2) { setError("fatherNameError","Enter father's name"); valid = false; }
    if (mother.length < 2) { setError("motherNameError","Enter mother's name"); valid = false; }
    if (!education) { setError("educationError","Select education"); valid = false; }

    if (!certificate) {
      setError("certificateError","Upload your certificate");
      valid = false;
    } else {
      if (certificate.type !== "application/pdf") {
        setError("certificateError","Only PDF allowed");
        valid = false;
      }
      if (certificate.size > 2 * 1024 * 1024) {
        setError("certificateError","File must be under 2MB");
        valid = false;
      }
    }

    if (!valid) return;

    el("formSuccess").hidden = false;
  });
})();
