const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
retrieveData();

function addTask() {
  const task = inputBox.value.trim();

  if (task === "") {
    showPopup("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = task;
  listContainer.appendChild(li);

  const span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  inputBox.value = "";
  saveData();
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.querySelector("p").textContent = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000); // hides after 2 seconds
}

// Allow "Enter" to add task
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      console.log("->Task added")
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      console.log("->Task removed")
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data#101101", listContainer.innerHTML);
  console.log("->Data saved")
}

function retrieveData() {
  listContainer.innerHTML = localStorage.getItem("data#101101") || "";
  console.log("->Data restored")
}
