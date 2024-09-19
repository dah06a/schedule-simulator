const allYearsReport = [];
settings = {};

function simulateSchedule() {
	const allSheets = SpreadsheetApp.getActiveSpreadsheet();
	const settingsTab = allSheets.getSheetByName("Settings");
	const coursesTab = allSheets.getSheetByName("Courses");
	const scheduleTab = allSheets.getSheetByName("Schedule");
	const resultsTab = allSheets.getSheetByName("Results");

	const rawSettings = settingsTab.getDataRange().getValues();
	settings = collectSettings(rawSettings);
	settings.creditValue = 1 / settings.scheduleSystemNum;

	const rawCourses = coursesTab.getDataRange().getValues();
	const rawSchedule = scheduleTab.getDataRange().getValues();

	const yearsOfSimulation = 10;
	for (let i = 0; i < yearsOfSimulation; i++) {
		simulateSchoolYear(rawCourses, rawSchedule);
	}

	for (const year of allYearsReport) {
		console.log(year.metrics);
	}
}

function collectSettings(rawSettings) {
	const settings = {
		orderedCoreCredits: [],
		orderedSecondaryCredits: [],
	};
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
			const creditName = row[0].trim();
			const creditValue = row[1];
			const creditIsPrimary = row[2].trim() === "Primary";
			const creditRank = Number(row[3]);
			graduationRequirements.credits[creditName] = creditValue;
			if (creditIsPrimary) {
				settings.orderedCoreCredits.push({
					creditType: creditName,
					rank: creditRank,
				});
			} else {
				settings.orderedSecondaryCredits.push({
					creditType: creditName,
					rank: creditRank,
				});
			}
			continue;
		}
		if (collectRequiredCourses) {
			const courseName = row[0];
			const courseRequiredCredits = settings.minConsiderPass;
			graduationRequirements.courses[courseName] = courseRequiredCredits;
			continue;
		}
	}
	settings.orderedCoreCredits = settings.orderedCoreCredits
		.sort((a, b) => a.rank - b.rank)
		.map((creditObject) => creditObject.creditType);
	settings.orderedSecondaryCredits = settings.orderedSecondaryCredits
		.sort((a, b) => a.rank - b.rank)
		.map((creditObject) => creditObject.creditType);
	settings.graduationRequirements = graduationRequirements;
	return settings;
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
		newCourse.students = [];
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

const firstNames = [
	"Cordelia",
	"Lynna",
	"Mercedes",
	"Cam",
	"Marillin",
	"Kathy",
	"Dorothea",
	"Casandra",
	"Dale",
	"Samantha",
	"Grayce",
	"Kathryn",
	"Elfrieda",
	"Ailee",
	"Zarah",
	"Nola",
	"Kiley",
	"Denni",
	"Isis",
	"Rosalind",
	"Darleen",
	"Sibel",
	"Johannah",
	"Mei",
	"Nancie",
	"Leontine",
	"Alex",
	"Laurianne",
	"Madalyn",
	"Gwenette",
	"Eilis",
	"Rosabel",
	"Valeda",
	"Nyssa",
	"Estella",
	"Deonne",
	"Krysta",
	"Carlynn",
	"Gracia",
	"Letitia",
	"Gertrudis",
	"Harmony",
	"Cordey",
	"Tonia",
	"Sarita",
	"Brynna",
	"Trude",
	"Sibel",
	"Latrena",
	"Joyann",
	"Kari",
	"Aimee",
	"Deidre",
	"Jennee",
	"Lexine",
	"Nissa",
	"Valli",
	"Florence",
	"Annabella",
	"Aurelea",
	"Pearline",
	"Tansy",
	"Angel",
	"Catrina",
	"Morissa",
	"Deloris",
	"Kris",
	"Mathilde",
	"Mabelle",
	"Glynis",
	"Ceil",
	"Corrina",
	"Phil",
	"Jenni",
	"Olivie",
	"Yoshi",
	"Dolly",
	"Prudi",
	"Robinet",
	"Denna",
	"Zelda",
	"Jazmin",
	"Gretta",
	"Drusi",
	"Wynn",
	"Jannel",
	"Odelle",
	"Edin",
	"Lorelle",
	"Merridie",
	"Mariann",
	"Valerie",
	"Lurette",
	"Sadie",
	"Gillie",
	"Winny",
	"Moira",
	"Nerita",
	"Martie",
	"Geralda",
];

const lastNames = [
	"Tienda",
	"Pacitto",
	"Janiak",
	"Marinaccio",
	"Erbs",
	"Skinkis",
	"Dresselhaus",
	"Birkenmeier",
	"Fouts",
	"Strudwick",
	"Johnke",
	"Gonyo",
	"Carling",
	"Altamura",
	"Bumba",
	"Barwari",
	"Dosier",
	"Turow",
	"Freise",
	"Blacketter",
	"Kolls",
	"Klimek",
	"Mccollom",
	"Raap",
	"Roiland",
	"Daven",
	"Dudkiewicz",
	"Crus",
	"Greenhow",
	"Chy",
	"Bailen",
	"Kellock",
	"Gosline",
	"Dethomas",
	"Lunstrum",
	"Blech",
	"Datson",
	"Gaddam",
	"Turmenne",
	"Fletcher",
	"Noullet",
	"Iona",
	"Leciejewski",
	"Bockholt",
	"Rittman",
	"Lisher",
	"Lazarus",
	"Antrican",
	"Ozog",
	"Acero",
	"Carrigg",
	"Bastain",
	"Betrand",
	"Stillday",
	"Gremore",
	"Judy",
	"Lemus",
	"Sebetka",
	"Miranti",
	"Ozdemir",
	"Bossler",
	"Bredbenner",
	"Smithhisler",
	"Liban",
	"Easterbrook",
	"Marini",
	"Quazi",
	"Linsay",
	"Raygo",
	"Copelan",
	"Perretti",
	"Giorlando",
	"Simer",
	"Talavera",
	"Slomka",
	"Holko",
	"Kuzmick",
	"Balcita",
	"Levovitz",
	"Haylett",
	"Mcnichol",
	"Floerke",
	"Saffran",
	"Juneja",
	"Telis",
	"Buglino",
	"Bongiorno",
	"Seltzer",
	"Scherz",
	"Latif",
	"Behenna",
	"Glus",
	"Cannarella",
	"Gorbet",
	"Monie",
	"Berzoza",
	"Ososki",
	"Ovesen",
	"Dehayes",
	"Midlam",
];

function generateId() {
	const chars =
		"abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let id = "";
	for (let i = 0; i < 20; i++) {
		const randNdx = Math.floor(Math.random() * chars.length);
		id += chars[randNdx];
	}
	return id;
}

function generateName() {
	const randFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
	const randLast = lastNames[Math.floor(Math.random() * lastNames.length)];
	return randFirst + " " + randLast;
}

function generateStudent() {
	return {
		id: generateId(),
		name: generateName(),
		grade: 9,
		proficiency: Math.round(Math.random() * (100 - 50) + 50),
		didGraduate: false,
		didDropout: false,
		earnedSport: false,
		requirements: {
			credits: {
				english: 0,
				math: 0,
				science: 0,
				social: 0,
				physical: 0,
				vocEd: 0,
				elective: 0,
			},
			courses: {
				"Alaska History": 0,
				Health: 0,
				Government: 0,
			},
		},
		courseHistory: {
			8: [],
			9: [],
			10: [],
			11: [],
			12: [],
			13: [],
		},
	};
}

function createStudents(numOfStudents = 25) {
	const students = [];
	for (let i = 0; i < numOfStudents; i++) {
		const newStudent = generateStudent();
		const randEnglishCreditChance = Math.random();
		const randMathCreditChance = Math.random();
		if (randEnglishCreditChance < settings.chanceOfStartingEnglishCredit) {
			newStudent.requirements.credits["english"] +=
				settings.creditValue * settings.scheduleSystemNum;
			newStudent.courseHistory["8"].push({
				title: "English I",
				creditType: "english",
				nextCourse: "English II",
				creditsEarned: 1,
			});
		}
		if (randMathCreditChance < settings.chanceOfStartingMathCredit) {
			newStudent.requirements.credits["math"] +=
				settings.creditValue * settings.scheduleSystemNum;
			newStudent.courseHistory["8"].push({
				title: "Pre-Algebra",
				creditType: "math",
				nextCourse: "Algebra I",
				creditsEarned: 1,
			});
		}
		students.push(newStudent);
	}
	return students;
}

function getAllActiveStudents() {
	const prevGraduateIds = [];
	const activeStudents = [];
	const mostRecentYear = allYearsReport.length - 1;
	let upToFiveYearsAgo = allYearsReport.length - 6;
	if (upToFiveYearsAgo < 0) {
		upToFiveYearsAgo = 0;
	}
	for (let i = mostRecentYear; i >= upToFiveYearsAgo; i--) {
		const year = allYearsReport[i];
		if (year.students) {
			for (const student of year.students) {
				if (student.didGraduate) {
					prevGraduateIds.push(student.id);
				}
				if (
					!student.didGraduate &&
					!student.didDropout &&
					!prevGraduateIds.includes(student.id) &&
					!activeStudents.find((s) => s.id === student.id)
				) {
					const studentCopy = JSON.parse(JSON.stringify(student));
					studentCopy.grade++;
					activeStudents.push(studentCopy);
				}
			}
		}
	}
	return activeStudents;
}

function getStudentsByGrade(allStudents, grade) {
	return allStudents.filter((student) => student.grade === grade);
}

function getCourseHistoryMap(student) {
	const courseHistoryMap = {};
	for (const year of Object.values(student.courseHistory)) {
		for (const course of year) {
			courseHistoryMap[course.title] = course.creditsEarned;
		}
	}

	return courseHistoryMap;
}

function getAvailableCourses(
	courseHistoryMap,
	studentGrade,
	curSchedule,
	curYearCourses
) {
	return curYearCourses.filter((course) => {
		const courseIsNotFull = course.students.length < course.maxSize;
		const notAlreadyInSchedule = !curSchedule.find(
			(c) => c.title === course.title
		);
		const periodIsAvailable = getAvailablePeriods(curSchedule).includes(
			course.period
		);
		const isNotHigherGradePriority =
			!course.gradePriority || studentGrade >= course.gradePriority;

		const isNewOrRepeatable =
			course.isRepeatable ||
			!courseHistoryMap[course.title] ||
			courseHistoryMap[course.title] < settings.fullConsiderPass;

		let meetsGradeRequirements = true;
		let meetsCourseRequirements = true;
		if (course.requirements.grade) {
			meetsGradeRequirements = studentGrade >= course.requirements.grade;
		}
		if (course.requirements.courses) {
			meetsCourseRequirements = course.requirements.courses.every(
				(courseTitle) =>
					courseHistoryMap[courseTitle] >= settings.minConsiderPass
			);
		}
		const meetsAllRequirements =
			meetsGradeRequirements && meetsCourseRequirements;
		if (
			courseIsNotFull &&
			notAlreadyInSchedule &&
			periodIsAvailable &&
			isNotHigherGradePriority &&
			isNewOrRepeatable &&
			meetsAllRequirements
		) {
			return true;
		}
		return false;
	});
}

function getAvailablePeriods(curSchedule) {
	const allPeriods = [1, 2, 3, 4, 5, 6];
	const enrolledPeriods = curSchedule.map((course) => course.period);
	return allPeriods.filter((period) => !enrolledPeriods.includes(period));
}

function chooseRandCourseByPopularity(courses) {
	if (courses.length === 1) {
		return courses[0];
	}
	const chooseList = [];
	for (const course of courses) {
		for (let i = 0; i < course.popularity; i++) {
			chooseList.push(course);
		}
	}
	const randNdx = Math.floor(Math.random() * chooseList.length);
	return chooseList[randNdx];
}

function assignCredits(studentSchedule, curRequirements) {
	for (const course of studentSchedule) {
		let curCreditVal = course.creditsEarned;
		while (curCreditVal > 0) {
			// Assign credits to main creditType or electives if they already have enough
			if (
				curRequirements.credits[course.creditType] <
				settings.graduationRequirements.credits[course.creditType]
			) {
				curRequirements.credits[course.creditType] += settings.creditValue;
			} else {
				curRequirements.credits.elective += settings.creditValue;
			}

			// Assign credits for the special courses required for graduation (AK History, Health Government)
			if (course.title in settings.graduationRequirements.courses) {
				if (
					curRequirements.courses[course.title] <
					settings.graduationRequirements.courses[course.title]
				) {
					curRequirements.courses[course.title] += settings.creditValue;
				}
			}
			curCreditVal -= settings.creditValue;
		}
	}
	return curRequirements;
}

function checkDidGraduate(studentRequirements) {
	let meetsCreditRequirements = true;
	for (const [creditType, creditValue] of Object.entries(
		studentRequirements.credits
	)) {
		if (settings.graduationRequirements.credits[creditType] > creditValue) {
			meetsCreditRequirements = false;
		}
	}
	let meetsCourseRequirements = true;
	for (const [courseName, creditValue] of Object.entries(
		studentRequirements.courses
	)) {
		if (settings.graduationRequirements.courses[courseName] > creditValue) {
			meetsCourseRequirements = false;
		}
	}
	return meetsCreditRequirements && meetsCourseRequirements;
}

function chooseCourse(availableCourses, studentGrade, prevYearCourseHistory) {
	if (!availableCourses.length) {
		console.error(
			"Tried to choose course when there were no available courses"
		);
		return null;
	}

	// Choose a course first if it is marked as a priority (example = AK History for 9th graders)
	const priorityCourses = availableCourses.filter(
		(course) => course.gradePriority && course.gradePriority === studentGrade
	);
	if (priorityCourses.length) {
		return chooseRandCourseByPopularity(priorityCourses);
	}

	// Choose recovery courses if needed for credits that are missing from failed courses
	// NEED UPDATED LOGIC IN CASE THEY JUST NEED THOSE CREDITS
	// NEED NEW HANDLING FOR RETAKING SOME CREDITS OF JUST THAT COURSE
	const failedCredits = [];
	for (const course of prevYearCourseHistory) {
		if (course.creditsEarned < settings.fullConsiderPass) {
			failedCredits.push(course.creditType);
		}
	}
	if (failedCredits.length) {
		const recoveryCourses = availableCourses.filter(
			(course) => course.isRecovery && failedCredits.includes(course.creditType)
		);
		if (recoveryCourses.length) {
			return chooseRandCourseByPopularity(recoveryCourses);
		}
	}

	// Next, pick a course based on current pathways (Example:  English I -> English II)
	// NEED TO INVESTIGATE WHY THIS DOESN'T ALWAYS WORK ...
	const pathwayCourseTitles = prevYearCourseHistory
		.filter((course) => course.nextCourse)
		.map((course) => course.nextCourse);
	if (pathwayCourseTitles.length) {
		const nextCourses = availableCourses.filter((course) =>
			pathwayCourseTitles.includes(course.title)
		);
		if (nextCourses.length) {
			return chooseRandCourseByPopularity(nextCourses);
		}
	}

	// Otherwise, if no cases are met, return a random course based on popularity
	return chooseRandCourseByPopularity(availableCourses);
}

function awardCreditsForYear(course) {
	let creditsEarned = 0;
	for (let i = 0; i < settings.scheduleSystemNum; i++) {
		const didPass = course.passRate > Math.random();
		creditsEarned += didPass ? settings.creditValue : 0;
	}
	return creditsEarned;
}

function getCourseRef(selectedCourse, creditsEarned) {
	return {
		title: selectedCourse.title,
		instructor: selectedCourse.instructor,
		period: selectedCourse.period,
		creditType: selectedCourse.creditType,
		creditsEarned: creditsEarned,
		nextCourse: selectedCourse.nextCourse,
	};
}

function getStudentRef(student) {
	return {
		id: student.id,
		name: student.name,
		grade: student.grade,
	};
}

function enrollStudent(availableCourses, studentSchedule, student) {
	if (availableCourses.length) {
		const selectedCourse = chooseCourse(
			availableCourses,
			student.grade,
			student.courseHistory[student.grade - 1],
			studentSchedule
		);
		const creditsEarned = awardCreditsForYear(selectedCourse);

		const courseRef = getCourseRef(selectedCourse, creditsEarned);
		studentSchedule.push(courseRef);

		const studentRef = getStudentRef(student);
		selectedCourse.students.push(studentRef);
		if (creditsEarned >= settings.minConsiderPass) {
			selectedCourse.passCount++;
		}
		return true;
	}
	return false;
}

function collectMetrics(newYear) {
	const coreCourses = newYear.courses.filter(
		(course) =>
			settings.orderedCoreCredits.includes(course.creditType) ||
			course.title in settings.graduationRequirements.courses
	);
	let totalCoreClassSizes = 0;
	for (const course of coreCourses) {
		totalCoreClassSizes += course.students.length;
	}
	const secondaryCourses = newYear.courses.filter((course) =>
		settings.orderedSecondaryCredits.includes(course.creditType)
	);
	let totalSecondaryClassSizes = 0;
	for (const course of coreCourses) {
		totalSecondaryClassSizes += course.students.length;
	}
	return {
		numFreshmen: newYear.students.filter((student) => student.grade === 9)
			.length,
		numSophomore: newYear.students.filter((student) => student.grade === 10)
			.length,
		numJunior: newYear.students.filter((student) => student.grade === 11)
			.length,
		numSenior: newYear.students.filter((student) => student.grade === 12)
			.length,
		numSuperSenior: newYear.students.filter((student) => student.grade === 13)
			.length,
		totalStudents: newYear.students.length,
		numGraduates: newYear.students.filter((student) => student.didGraduate)
			.length,
		numDropouts: newYear.students.filter((student) => student.didDropout)
			.length,
		numStudentsWithEmptyBlocks: newYear.students.filter(
			(student) =>
				student.courseHistory[student.grade].length < 6 && student.grade < 13
		).length,
		numCasesSeniorCouldNotFindNeededCourse: newYear.issues.filter(
			(issue) => issue.type === "credits" && issue.student.grade > 11
		).length,
		avgCoreClassSize: totalCoreClassSizes / coreCourses.length,
		avgSecondaryClassSize: totalSecondaryClassSizes / secondaryCourses.length,
	};
}

function simulateSchoolYear(rawCourses, rawSchedule) {
	const randNumNewStudents = Math.floor(
		Math.random() *
			(settings.maxIncomingFreshmen - settings.minIncomingFreshmen) +
			settings.minIncomingFreshmen
	);
	const newStudents = createStudents(randNumNewStudents);
	const newYear = {
		id: generateId(),
		simYear: allYearsReport.length + 1,
		courses: generateCourses(rawCourses, rawSchedule),
		students: [...getAllActiveStudents(), ...newStudents],
		issues: [],
		metrics: {
			numFreshmen: null,
			numSophomore: null,
			numJunior: null,
			numSenior: null,
			numSuperSenior: null,
			numGraduates: null,
			numDropouts: null,
			numStudentsWithEmptyBlocks: null,
			numCasesSeniorCouldNotFindNeededCourse: null,
			totalStudents: null,
			avgCoreClassSize: null,
			avgSecondaryClassSize: null,
		},
	};

	// Simulate school year enrollment for each student
	for (let gradeLevel = 13; gradeLevel > 8; gradeLevel--) {
		const curStudents = getStudentsByGrade(newYear.students, gradeLevel);
		for (const student of curStudents) {
			const courseHistoryMap = getCourseHistoryMap(student);
			const studentSchedule = [];

			// First, attempt to enroll based on core credits
			for (const creditType of settings.orderedCoreCredits) {
				if (
					student.requirements.credits[creditType] <
					settings.graduationRequirements.credits[creditType]
				) {
					const curCreditCourses = newYear.courses.filter(
						(course) => course.creditType === creditType
					);

					const availableCourses = getAvailableCourses(
						courseHistoryMap,
						student.grade,
						studentSchedule,
						curCreditCourses
					);
					const didEnroll = enrollStudent(
						availableCourses,
						studentSchedule,
						student
					);
					if (!didEnroll && student.grade > 11) {
						newYear.issues.push({
							student: student,
							type: "credits",
							message: `Senior could not find ${creditType} credits`,
						});
					}
				}
			}

			// Then enroll based on required courses
			for (const courseTitle of Object.keys(
				settings.graduationRequirements.courses
			)) {
				if (
					student.requirements.courses[courseTitle] <
					settings.graduationRequirements.courses[courseTitle]
				) {
					const curRequiredCourses = newYear.courses.filter(
						(course) => course.title === courseTitle
					);
					const availableCourses = getAvailableCourses(
						courseHistoryMap,
						student.grade,
						studentSchedule,
						curRequiredCourses
					);
					const didEnroll = enrollStudent(
						availableCourses,
						studentSchedule,
						student
					);
					// Need to update this issue, since not really an issue if course is not priority yet
					if (!didEnroll && student.grade > 11) {
						newYear.issues.push({
							student: student,
							type: "requiredCourse",
							message: `Senior could not find ${courseTitle} course`,
						});
					}
				}
			}

			// Then, enroll based on secondary credit types
			for (const creditType of settings.orderedSecondaryCredits) {
				if (
					student.requirements.credits[creditType] <
					settings.graduationRequirements.credits[creditType]
				) {
					const curCreditCourses = newYear.courses.filter(
						(course) => course.creditType === creditType
					);
					const availableCourses = getAvailableCourses(
						courseHistoryMap,
						student.grade,
						studentSchedule,
						curCreditCourses
					);
					const didEnroll = enrollStudent(
						availableCourses,
						studentSchedule,
						student
					);
					if (!didEnroll && student.grade > 11) {
						newYear.issues.push({
							student: student,
							type: "credits",
							message: `Senior could not find ${creditType} credits`,
						});
					}
				}
			}

			// Then enroll in courses for any remaining empty periods
			// DO THIS AFTER ALL STUDENTS HAVE BEEN ENROLLED - NOT IN THIS LOOP
			const remainingPeriods = getAvailablePeriods(studentSchedule);
			if (remainingPeriods.length && student.grade < 13) {
				for (const period of remainingPeriods) {
					const curPeriodCourses = newYear.courses.filter(
						(course) => course.period === period
					);
					const availableCourses = getAvailableCourses(
						courseHistoryMap,
						student.grade,
						studentSchedule,
						curPeriodCourses
					);
					const didEnroll = enrollStudent(
						availableCourses,
						studentSchedule,
						student
					);
					if (!didEnroll && student.grade < 12) {
						newYear.issues.push({
							student: student,
							type: "empty",
							message: `Empty ${period}th period block for ${student.grade}th grader`,
						});
					}
				}
			}

			// Finally, update each student course history and assign credits
			const orderedSchedule = studentSchedule.sort(
				(a, b) => a.period - b.period
			);
			student.courseHistory[student.grade] = orderedSchedule;
			const updatedStudentRequirements = assignCredits(
				orderedSchedule,
				student.requirements
			);
			student.requirements = updatedStudentRequirements;

			// Add 0.5 PE credits for playing a sport based on chance
			const randSportChance = Math.random();
			if (
				randSportChance < settings.chanceOfEarningSportCredit &&
				!student.earnedSport
			) {
				student.requirements.credits["physical"] += settings.sportCreditValue;
			}
		}
	}
	for (const student of newYear.students) {
		student.didGraduate = checkDidGraduate(student.requirements);
		if (!student.didGraduate && student.grade > 12) {
			student.didDropout = true;
		}
	}
	const newMetrics = collectMetrics(newYear);
	newYear.metrics = newMetrics;
	allYearsReport.push(newYear);
}
