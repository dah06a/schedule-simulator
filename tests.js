const fullCourseLoad = 6;
export default function runAllTests(allYearsReport) {
	// --- TEST 1 --- //
	console.log("Test 1 - All freshman must take either English I or English II");
	const test1Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const freshmanEngish = student.courseHistory["9"].find(
				(course) =>
					course.title === "English I" || course.title === "English II"
			);
			const studentInFailList = test1Fails.find((s) => s.id === student.id);
			if (!freshmanEngish && !studentInFailList) {
				test1Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test1Fails.length) {
		console.error("----- FAIL -----");
		console.log(test1Fails);
	} else {
		console.log("----- PASS -----");
	}

	// --- TEST 2 --- //

	// PROBLEM IDENTIFIED
	// if a student needs geometry, but got put in English II during that period first ...
	// then it will be impossible for them to take geometry because that period is taken

	console.log(
		"Test 2 - All freshman must take either Pre-Algebra, Algebra I, or Geometry"
	);
	const test2Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const freshmanMath = student.courseHistory["9"].find(
				(course) =>
					course.title === "Pre-Algebra" ||
					course.title === "Algebra I" ||
					course.title === "Geometry"
			);
			const studentInFailList = test2Fails.find((s) => s.id === student.id);
			if (!freshmanMath && !studentInFailList) {
				test2Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test2Fails.length) {
		console.error("----- FAIL -----");
		console.log(test2Fails);
	} else {
		console.log("----- PASS -----");
	}

	// --- TEST 3 --- //
	console.log(
		"Test 3 - Students should not have any empty periods, except for seniors"
	);
	const test3Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			let studentYear = 9;
			while (studentYear <= student.grade) {
				if (student.courseHistory[studentYear].length < fullCourseLoad) {
					test3Fails.push(student);
				}
				studentYear++;
			}
		}
	}
	if (test3Fails.length) {
		console.error("----- FAIL -----");
		// console.log(test3Fails);
	} else {
		console.log("----- PASS -----");
	}
}
