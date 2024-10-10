export default function runAllTests(year) {
	// Test 1 - Must take either English I or English II as Freshman
	console.log(
		"Test 1 - All freshman must take either English I or English II "
	);
	const test1Fails = [];
	for (const student of year.students) {
		const didTakeEngIOrII = student.courseHistory["9"].find(
			(course) => course.title === "English I" || course.title === "English II"
		);
		if (!didTakeEngIOrII) {
			test1Fails.push(student);
		}
	}
	if (test1Fails.length) {
		console.log("----- FAIL -----");
		console.log(test1Fails);
		console.log(
			year.courses.filter(
				(c) => c.title === "English I" || c.title === "English II"
			)
		);
	} else {
		console.log("----- PASS -----");
	}
}
