function calculateDownloadTime() {
  const fileSize = parseFloat(document.getElementById("fileSize").value);
  const fileSizeUnit = document.getElementById("fileSizeUnit").value;
  const speed = parseFloat(document.getElementById("speed").value);
  const speedUnit = document.getElementById("speedUnit").value;

  if (isNaN(fileSize) || isNaN(speed) || fileSize <= 0 || speed <= 0) {
    document.getElementById("result").value = "Invalid input";
    return;
  }

  let fileSizeMB;
  switch (fileSizeUnit) {
    case "GB":
      fileSizeMB = fileSize * 1024;
      break;
    case "Gb":
      fileSizeMB = (fileSize * 1024) / 8;
      break;
    case "MB":
      fileSizeMB = fileSize;
      break;
    case "Mb":
      fileSizeMB = fileSize / 8;
      break;
    case "KB":
      fileSizeMB = fileSize / 1024;
      break;
    case "Kb":
      fileSizeMB = fileSize / (1024 * 8);
      break;
    case "TB":
      fileSizeMB = fileSize * 1024 * 1024;
      break;
    case "Tb":
      fileSizeMB = (fileSize * 1024 * 1024) / 8;
      break;
  }

  let speedMBps;
  switch (speedUnit) {
    case "Mbps":
      speedMBps = speed / 8;
      break;
    case "MBps":
      speedMBps = speed;
      break;
    case "Gbps":
      speedMBps = speed * 128;
      break;
    case "GBps":
      speedMBps = speed * 1024;
      break;
    case "Kbps":
      speedMBps = speed / 8000;
      break;
    case "KBps":
      speedMBps = speed / 1024;
      break;
  }

  const timeInSeconds = fileSizeMB / speedMBps;
  const years = Math.floor(timeInSeconds / (3600 * 24 * 365));
  const days = Math.floor((timeInSeconds % (3600 * 24 * 365)) / (3600 * 24));
  const hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.round(timeInSeconds % 60);

  let result = "";
  if (years > 0) {
    result += `${years} years `;
  }
  if (days > 0) {
    result += `${days} days `;
  }
  if (hours > 0) {
    result += `${hours} hours `;
  }
  if (minutes > 0) {
    result += `${minutes} minutes `;
  }
  if (seconds > 0 || result === "") {
    result += `${seconds} seconds`;
  }

  const resultElement = document.getElementById("result");
  resultElement.value = result.trim();

  // Change color based on time
  if (years > 0 || days > 0) {
    resultElement.style.color = "red";
    resultElement.style.backgroundColor = "#ffe6e6";
    resultElement.style.outline = "2px solid red";
  } else if (hours > 0) {
    resultElement.style.color = "orange";
    resultElement.style.backgroundColor = "#fff3e6";
    resultElement.style.outline = "2px solid orange";
  } else {
    resultElement.style.color = "green";
    resultElement.style.backgroundColor = "#e6ffe6";
    resultElement.style.outline = "2px solid green";
  }
}

function loadLanguage(lang) {
  fetch(`./lang/${lang}.json`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("titleText").innerText = data.title;
      document.getElementById("fileSizeLabel").innerText = data.fileSizeLabel;
      document.getElementById("speedLabel").innerText = data.speedLabel;
      document.getElementById("calculateButton").innerText =
        data.calculateButton;
      document.getElementById("resultLabel").innerText = data.resultLabel;
      document.getElementById("darkModeSwitchLabel").innerText =
        data.darkModeSwitch;
    });
}

function switchLanguage() {
  const currentLang = localStorage.getItem("language") || "en";
  const newLang = currentLang === "en" ? "id" : "en";
  localStorage.setItem("language", newLang);
  loadLanguage(newLang);
}

function switchLanguageDropdown() {
  const selectedLang = document.getElementById("languageSwitchDropdown").value;
  localStorage.setItem("language", selectedLang);
  loadLanguage(selectedLang);
}

function applyDarkMode(isDarkMode) {
  const darkModeSwitch = document.getElementById("darkModeSwitch");
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeSwitch.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    darkModeSwitch.checked = false;
  }
}

function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

// Apply dark mode and language on page load based on user preference
document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  applyDarkMode(isDarkMode);

  const lang = localStorage.getItem("language") || "en";
  document.getElementById("languageSwitchDropdown").value = lang;
  loadLanguage(lang);
});
