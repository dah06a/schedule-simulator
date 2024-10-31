export default function runAllTests(allYearsReport) {
	// --- TEST 1 --- //
	console.log("Test 1 - All freshman must take either English I or English II");
	const test1Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test1Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			const freshmanEngish = student.courseHistory["9"].find(
				(course) =>
					course.title === "English I" || course.title === "English II"
			);
			if (!freshmanEngish) {
				test1Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test1Fails.length) {
		console.error("FAIL");
		console.log(test1Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 2 --- //
	console.log(
		"Test 2 - If freshman took English I in 8th grade, they should take English II in 9th grade"
	);
	const test2Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test2Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			const hasPriorEnglish = student.courseHistory["8"].find(
				(course) => course.title === "English I"
			);
			const nowHasEnglishII = student.courseHistory["9"].find(
				(course) => course.title === "English II"
			);
			if (hasPriorEnglish && !nowHasEnglishII) {
				test2Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test2Fails.length) {
		console.error("FAIL");
		console.log(test2Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 3 --- //
	console.log(
		"Test 3 - All freshman must take either Pre-Algebra, Algebra I, or Geometry"
	);
	const test3Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test3Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			const freshmanMath = student.courseHistory["9"].find(
				(course) =>
					course.title === "Pre-Algebra" ||
					course.title === "Algebra I" ||
					course.title === "Geometry"
			);
			if (!freshmanMath) {
				test3Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test3Fails.length) {
		console.error("FAIL");
		console.log(test3Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 4 --- //
	console.log(
		"Test 4 - If freshman took Math in 8th grade, they should take the next math course in 9th grade"
	);
	const test4Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test4Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			const hadPreAlgebra = student.courseHistory["8"].find(
				(course) => course.title === "Pre-Algebra"
			);
			const hadAlgebraI = student.courseHistory["8"].find(
				(course) => course.title === "Algebra I"
			);
			const nowHasAlgebraI = student.courseHistory["9"].find(
				(course) => course.title === "Algebra I"
			);
			const nowHasGeometry = student.courseHistory["9"].find(
				(course) => course.title === "Geometry"
			);
			if (hadAlgebraI && !nowHasGeometry) {
				test4Fails.push({ ...student, fromYear: year.simYear });
			} else if (hadPreAlgebra && !hadAlgebraI && !nowHasAlgebraI) {
				test4Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test4Fails.length) {
		console.error("FAIL");
		console.log(test4Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 5 --- //
	console.log(
		"Test 5 - Students should not have any empty periods, except for seniors"
	);
	const test5Fails = [];
	const fullCourseLoad = 6;
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test5Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			let studentYear = 9;
			let maxYear = Math.min(student.grade, 12);
			while (studentYear <= maxYear) {
				const studentInFailList = test5Fails.find((s) => s.id === student.id);
				if (
					student.courseHistory[studentYear].length < fullCourseLoad &&
					!studentInFailList
				) {
					test5Fails.push({ ...student, fromYear: year.simYear });
				}
				studentYear++;
			}
		}
	}
	if (test5Fails.length) {
		console.error("FAIL");
		console.log(test5Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 6 --- //
	console.log(
		"Test 6 - Students should never have more than 6 classes in a schedule"
	);
	const test6Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test6Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			let studentYear = 8;
			const maxClasses = 6;
			while (studentYear < 14) {
				const studentInFailList = test5Fails.find((s) => s.id === student.id);
				if (
					student.courseHistory[studentYear].length > maxClasses &&
					!studentInFailList
				) {
					test6Fails.push({ ...student, fromYear: year.simYear });
				}
				studentYear++;
			}
		}
	}
	if (test6Fails.length) {
		console.error("FAIL");
		console.log(test6Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 7 --- //
	console.log("Test 7 - All freshman must take a science class");
	const test7Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test7Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			const freshmanScience = student.courseHistory["9"].find(
				(course) => course.creditType === "science"
			);
			if (!freshmanScience) {
				test7Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test7Fails.length) {
		console.error("FAIL");
		console.log(test7Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 8 --- //
	console.log("Test 8 - All freshman should take AK History");
	const test8Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test8Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			const freshmanAkHistory = student.courseHistory["9"].find(
				(course) => course.title === "Alaska History"
			);
			if (!freshmanAkHistory) {
				test8Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test8Fails.length) {
		console.error("FAIL");
		console.log(test8Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 9 --- //
	console.log("Test 9 - Should not have any dropouts");
	const test9Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test9Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			const studentDidDropout = student.didDropout;
			if (studentDidDropout) {
				test9Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test9Fails.length) {
		console.error("FAIL");
		console.log(test9Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}

	// --- TEST 10 --- //
	console.log(
		"Test 10 - Students took 4 years of core classes (eligable for AK scholarship)"
	);
	const test10Fails = [];
	for (const year of allYearsReport) {
		for (const student of year.students) {
			const studentInFailList = test10Fails.find((s) => s.id === student.id);
			if (studentInFailList) {
				continue;
			}
			let hadCoresEachYear = true;
			const maxYear = Math.min(student.grade, 12);
			for (let i = 9; i <= maxYear; i++) {
				const schoolYear = student.courseHistory[i];
				const tookEnglish = schoolYear.find(
					(course) => course.creditType === "english"
				);
				const tookMath = schoolYear.find(
					(course) => course.creditType === "math"
				);
				const tookScience = schoolYear.find(
					(course) => course.creditType === "science"
				);
				const tookSocial = schoolYear.find(
					(course) => course.creditType === "social"
				);
				if (!tookEnglish || !tookMath || !tookScience || !tookSocial) {
					hadCoresEachYear = false;
				}
			}
			if (!hadCoresEachYear) {
				test10Fails.push({ ...student, fromYear: year.simYear });
			}
		}
	}
	if (test10Fails.length) {
		console.error("FAIL");
		console.log(test10Fails);
		console.log(
			"---------------------------------------------------------------"
		);
	} else {
		console.log("PASS");
		console.log(
			"---------------------------------------------------------------"
		);
	}
}
