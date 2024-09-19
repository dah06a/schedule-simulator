function myFunction() {
	const allSheets = SpreadsheetApp.getActiveSpreadsheet();
	const settingsTab = allSheets.getSheetByName("Settings");
	const coursesTab = allSheets.getSheetByName("Courses");
	const scheduleTab = allSheets.getSheetByName("Schedule");
	const resultsTab = allSheets.getSheetByName("Results");

	const rawSettings = settingsTab.getDataRange().getValues();
	const [settings, graduationRequirements] = collectSettings(rawSettings);

	const rawCourses = coursesTab.getDataRange().getValues();
	const rawSchedule = scheduleTab.getDataRange().getValues();
	const newCourses = generateCourses(rawCourses, rawSchedule);
}

function collectSettings(rawSettings) {
	const settings = {};
	const graduationRequirements = {
		credits: {},
		courses: {},
	};
	let collectSettings = false;
	let collectCredits = false;
	let collectRequiredCourses = false;
	for (const row of rawSettings) {
		if (row[0] === "Setting Name") {
			collectSettings = true;
			continue;
		}
		if (row[0] === "Credit Variable Name") {
			collectCredits = true;
			continue;
		}
		if (row[0] === "Required Courses ") {
			collectRequiredCourses = true;
			continue;
		}
		if (row[0] === "") {
			collectSettings = false;
			collectCredits = false;
			collectRequiredCourses = false;
			continue;
		}
		if (collectSettings) {
			const settingName = row[0];
			const settingValue = row[1];
			settings[settingName] = settingValue;
			continue;
		}
		if (collectCredits) {
			const creditName = row[0];
			const creditValue = row[1];
			graduationRequirements.credits[creditName] = creditValue;
			continue;
		}
		if (collectRequiredCourses) {
			const courseName = row[0];
			const courseRequiredCredits = settings.minConsiderPass;
			graduationRequirements.courses[courseName] = courseRequiredCredits;
			continue;
		}
	}
	return [settings, graduationRequirements];
}

function generateCourses(rawCourses, rawSchedule) {
	const allCourses = [];
	const courseProperties = rawCourses[0];
	for (let row = 1; row < rawCourses.length; row++) {
		const newCourse = {};
		for (let col = 0; col < rawCourses[row].length; col++) {
			newCourse[courseProperties[col]] =
				rawCourses[row][col] !== "" ? rawCourses[row][col] : null;
		}
		newCourse.requirements = {
			courses: newCourse.requiredCourses?.split(",") || [],
			grade: newCourse.requiredGrade || null,
		};
		delete newCourse.requiredCourses;
		delete newCourse.requiredGrade;
		allCourses.push(newCourse);
	}
	for (const row of rawSchedule) {
		for (const col of row) {
			if (col && typeof col === "string" && col.includes("id-")) {
				const courseId = Number(col.split("\n")[1].replace("id-", ""));
				const coursePeriod = Number(row[0].split(" ")[1].trim());
				const matchingCourse = allCourses.find(
					(course) => course.id === courseId
				);
				matchingCourse.period = coursePeriod;
			}
		}
	}
	return allCourses;
}
