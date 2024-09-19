function myFunction() {
	const allSheets = SpreadsheetApp.getActiveSpreadsheet();
	const settingsTab = allSheets.getSheetByName("Settings");
	const coursesTab = allSheets.getSheetByName("Settings");
	const scheduleTab = allSheets.getSheetByName("Settings");
	const resultsTab = allSheets.getSheetByName("Settings");

	const rawSettings = settingsTab.getDataRange().getValues();
	const [settings, graduationRequirements] = collectSettings(rawSettings);
	console.log(graduationRequirements);
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
