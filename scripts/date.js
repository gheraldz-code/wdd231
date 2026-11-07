
// Get the current year
const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

// Get the last modified date
document.querySelector("#lastModified").textContent =
    document.lastModified;
