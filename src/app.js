import { calculateAverage, getRating, validateCourse } from "./calculator.js";

const form = document.querySelector("#course-form");
const coursesList = document.querySelector("#courses");
const result = document.querySelector("#result");
const courses = [];

function showMessage(message, isError = false) {
  result.textContent = message;
  result.classList.toggle("error", isError);
}

function renderCourses() {
  coursesList.replaceChildren();

  courses.forEach((course, index) => {
    const item = document.createElement("li");
    const description = document.createElement("span");
    const removeButton = document.createElement("button");

    description.textContent =
      `${course.name} — الدرجة: ${course.grade}، الساعات: ${course.credits}`;
    removeButton.type = "button";
    removeButton.textContent = "حذف";
    removeButton.setAttribute("aria-label", `حذف ${course.name}`);
    removeButton.addEventListener("click", () => {
      courses.splice(index, 1);
      renderCourses();
      showMessage("تم حذف المادة.");
    });

    item.append(description, removeButton);
    coursesList.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const data = new FormData(form);
    const course = validateCourse({
      name: data.get("name"),
      grade: data.get("grade"),
      credits: data.get("credits")
    });

    courses.push(course);
    renderCourses();
    form.reset();
    document.querySelector("#name").focus();
    showMessage("تمت إضافة المادة بنجاح.");
  } catch (error) {
    showMessage(error.message, true);
  }
});

document.querySelector("#calculate").addEventListener("click", () => {
  try {
    const { average, totalCredits } = calculateAverage(courses);
    showMessage(
      `معدلك: ${average}% — التقدير: ${getRating(average)} — مجموع الساعات: ${totalCredits}`
    );
  } catch (error) {
    showMessage(error.message, true);
  }
});
