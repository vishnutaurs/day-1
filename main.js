import { createCard } from "./cardModule.js";
import greet, { add, multiply } from "./mathUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  // PAGE SWITCHING
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
    navLinks.forEach(link =>
      link.classList.toggle("active", link.dataset.page === pageId)
    );
    if (pageId === "students") loadStudents();
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // STUDENT STORAGE FUNCTIONS
  function getStudents() {
    return JSON.parse(localStorage.getItem("students") || "[]");
  }
  function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
  }

  // LOAD STUDENTS INTO TABLE
  function loadStudents() {
    const students = getStudents();
    const list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>${student.year}</td>
        <td><button class="action-btn" data-index="${index}">Delete</button></td>
      `;
      list.appendChild(row);
    });
  }

  // DELETE STUDENT (Event Delegation)
  document.getElementById("studentList").addEventListener("click", e => {
    if (e.target.classList.contains("action-btn")) {
      const index = e.target.dataset.index;
      if (confirm("Are you sure you want to delete this student?")) {
        const students = getStudents();
        students.splice(index, 1);
        saveStudents(students);
        loadStudents();
      }
    }
  });

  // REGISTER STUDENT
  document.getElementById("regForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value.trim();
    const year = document.getElementById("year").value;

    if (!name || !email || !course || !year) {
      alert("Please fill all fields!");
      return;
    }

    const students = getStudents();
    students.push({ name, email, course, year });
    saveStudents(students);
    alert("Student Registered!");
    e.target.reset();
  });

  // SEARCH STUDENTS
  document.getElementById("search").addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll("#studentList tr").forEach(row => {
      const name = row.children[0].textContent.toLowerCase();
      row.style.display = name.includes(query) ? "" : "none";
    });
  });

  // MINI ACTIVITIES
  const cardContainer = document.getElementById("cardContainer");
  document.getElementById("createCardBtn").addEventListener("click", () => {
    cardContainer.appendChild(createCard("Demo Card", "Sample Role"));
  });
  document.getElementById("addProfileBtn").addEventListener("click", () => {
    const name = prompt("Enter Name:");
    if (!name) return;
    const role = prompt("Enter Role:");
    if (!role) return;
    cardContainer.appendChild(createCard(name, role));
  });

  // MATH UTILS DEMO
  const mathDemo = document.getElementById("mathDemo");
  mathDemo.innerHTML = `
    <p>${greet("User")}</p>
    <p>2 + 3 = ${add(2, 3)}</p>
    <p>4 × 5 = ${multiply(4, 5)}</p>
  `;

  // INITIAL PAGE
  showPage("home");
});
