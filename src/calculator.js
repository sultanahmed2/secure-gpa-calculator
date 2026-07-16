const MAX_SUBJECT_LENGTH = 60;

export function validateCourse(course) {
  const name = String(course?.name ?? "").trim();
  const grade = Number(course?.grade);
  const credits = Number(course?.credits);

  if (name.length > MAX_SUBJECT_LENGTH) {
    throw new Error("اسم المادة يجب ألا يتجاوز 60 حرفاً.");
  }
  if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
    throw new Error("الدرجة يجب أن تكون رقماً بين 0 و100.");
  }
  if (!Number.isInteger(credits) || credits < 1 || credits > 10) {
    throw new Error("الساعات يجب أن تكون عدداً صحيحاً بين 1 و10.");
  }

  return { name: name || "مادة بدون اسم", grade, credits };
}

export function calculateAverage(courses) {
  if (!Array.isArray(courses) || courses.length === 0) {
    throw new Error("أضف مادة واحدة على الأقل.");
  }

  const validCourses = courses.map(validateCourse);
  const totalCredits = validCourses.reduce((sum, course) => sum + course.credits, 0);
  const weightedTotal = validCourses.reduce(
    (sum, course) => sum + course.grade * course.credits,
    0
  );

  return {
    average: Number((weightedTotal / totalCredits).toFixed(2)),
    totalCredits
  };
}

export function getRating(average) {
  if (!Number.isFinite(average) || average < 0 || average > 100) {
    throw new Error("المعدل غير صالح.");
  }
  if (average >= 90) return "ممتاز";
  if (average >= 80) return "جيد جداً";
  if (average >= 70) return "جيد";
  if (average >= 60) return "مقبول";
  return "راسب";
}
