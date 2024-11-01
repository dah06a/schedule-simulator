// IDEAS
// Instead of the current model, there is another way to try and enroll/create student schedules
// Start by figuring out what classes a student needs for current year - make a list of courses except electives
// Then, try many times to see if there is a way for all those class to be taken this year
// If so, then back-fill any remaining periods with electives
// If not, retry with other core classes or options - if no solution is found, remove 1 class and repeat process

// TO DO ...
// Changing courses in the middle of the year is unlikely - but sometimes happens with seniors changing into easier classes if needed
// Need mechanism for switching courses during the year
// Need mechanism for adding/removing courses every other year
// Need to write up all logic for Stephen ...
// If freshman fails a quarter of English - then next year, enroll in English to make up that credit
// BUT - then switch courses after credits are made up
// Make a way to "flag" students who are in danger of failing each year if not "whole"

// Curveballs
// - kids enter in middle of year - min of 60 students total that enter, max of 100 (but max is very rare) - more like 80 normally
// - try to account for attrition rate - kids sometimes leave each school year
// - no more than 140 kids in the whole school

// Soft Cap for each of these
// - freshman target = 35  (usually between 20 - 40)
// - sophomore target = 35 (usually between 20 - 40)
// - junior target = 35 (usually between 20 - 40)
// - senior target = 35 (usually between 20 - 40)

// NEW SETTINGS
// - total kids
// - attrition rate per grade level
// - min and max number of applicants per grade level
// - super-impose actual class numbers over the schedule instead/with empty course list and class averages
// - try to do averages over the full simulation, not just average per type of class
// - maybe put all the courses at the bottom with different columns of info per each course at bottom

import runAllTests from "./tests.js";

// Global Settings Variables
const allYearsReport = [];
const settings = {
	yearsOfSimulation: 20,
	scheduleSystemNum: 4,
	minIncomingFreshmen: 5,
	maxIncomingFreshmen: 30,
	sportCreditValue: 0.5,
	minConsiderPass: 0.75,
	fullConsiderPass: 1,
	chanceOfStartingEnglishII: 0.3,
	chanceOfStartingAlgebra: 0.3,
	chanceOfStartingMathCredit: 0.1,
	chanceOfEarningSportCredit: 0.4,
	orderedCredits: [
		"health",
		"english",
		"math",
		"science",
		"social",
		"vocEd",
		"physical",
		"elective",
	],
	coreCredits: ["english", "math", "science", "social"],
};
settings.creditValue = 1 / settings.scheduleSystemNum;
settings.graduationRequirements = {
	credits: {
		english: 4,
		math: 3,
		science: 3,
		social: 3,
		health: 1,
		physical: 1,
		vocEd: 2,
		elective: 5,
	},
	courses: {
		"Alaska History": settings.minConsiderPass,
		Government: settings.minConsiderPass,
	},
};

function generateCourses() {
	return [
		// ENGLISH
		{
			title: "English V",
			creditType: "english",
			instructor: "Mr. X",
			isRecovery: false,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["English I", "English II", "English III", "English IV"],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "English III",
			creditType: "english",
			instructor: "Mr. X",
			isRecovery: false,
			period: 2,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["English I", "English II"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "English IV",
			gradePriority: null,
		},
		{
			title: "English II",
			creditType: "english",
			instructor: "Mr. X",
			isRecovery: false,
			period: 3,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["English I"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "English III",
			gradePriority: null,
		},
		{
			title: "English I",
			creditType: "english",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: "English II",
			gradePriority: 9,
		},
		{
			title: "English II",
			creditType: "english",
			instructor: "Mr. X",
			isRecovery: false,
			period: 5,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["English I"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "English III",
			gradePriority: null,
		},
		{
			title: "English IV",
			creditType: "english",
			instructor: "Mr. X",
			isRecovery: false,
			period: 6,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["English I", "English II", "English III"],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},

		// MATH
		{
			title: "Algebra I",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Pre-Algebra"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Geometry",
			gradePriority: null,
		},
		{
			title: "PreCalc/Calc",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 2,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Pre-Algebra", "Algebra I", "Geometry", "Algebra II"],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Geometry",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 3,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Pre-Algebra", "Algebra I"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Algebra II",
			gradePriority: null,
		},
		{
			title: "Algebra I",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Pre-Algebra"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Geometry",
			gradePriority: null,
		},
		{
			title: "Algebra II",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 5,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Pre-Algebra", "Algebra I", "Geometry"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "PreCalc/Calc",
			gradePriority: null,
		},
		{
			title: "Pre-Algebra",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 6,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Algebra I",
			gradePriority: 9,
		},

		// SCIENCE
		{
			title: "Science II",
			creditType: "science",
			instructor: "Mr. X",
			isRecovery: false,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Science I"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Science III",
			gradePriority: null,
		},
		{
			title: "Science III",
			creditType: "science",
			instructor: "Mr. X",
			isRecovery: false,
			period: 2,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Science I", "Science II"],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Science I",
			creditType: "science",
			instructor: "Mr. X",
			isRecovery: false,
			period: 3,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Science II",
			gradePriority: 9,
		},
		{
			title: "Science I",
			creditType: "science",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Science II",
			gradePriority: 9,
		},
		{
			title: "Science III",
			creditType: "science",
			instructor: "Mr. X",
			isRecovery: false,
			period: 5,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Science I", "Science II"],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Science II",
			creditType: "science",
			instructor: "Mr. X",
			isRecovery: false,
			period: 6,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Science I"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Science III",
			gradePriority: null,
		},

		// SOCIAL STUDIES
		{
			title: "World History",
			creditType: "social",
			instructor: "Mr. X",
			isRecovery: false,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Alaska History",
			creditType: "social",
			instructor: "Mr. X",
			isRecovery: false,
			period: 2,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: 9,
		},
		{
			title: "Government",
			creditType: "social",
			instructor: "Mr. X",
			isRecovery: false,
			period: 3,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: 11,
		},
		{
			title: "Government",
			creditType: "social",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: 11,
		},
		{
			title: "Alaska History",
			creditType: "social",
			instructor: "Mr. X",
			isRecovery: false,
			period: 5,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: 9,
		},
		{
			title: "World History",
			creditType: "social",
			instructor: "Mr. X",
			isRecovery: false,
			period: 6,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},

		// LAB CLASSES
		{
			title: "English Lab",
			creditType: "english",
			instructor: "Mr. X",
			isRecovery: true,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "US History",
			creditType: "social",
			instructor: "Mr. X",
			isRecovery: false,
			period: 3,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "English Lab",
			creditType: "english",
			instructor: "Mr. X",
			isRecovery: true,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Math Lab",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: true,
			period: 5,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},

		// PE
		{
			title: "High School PE",
			creditType: "physical",
			instructor: "Mr. X",
			isRecovery: false,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "High School PE",
			creditType: "physical",
			instructor: "Mr. X",
			isRecovery: false,
			period: 2,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "High School PE",
			creditType: "physical",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},

		// MATH/SCIENCE/HEALTH
		{
			title: "Pre-Algebra",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Algebra I",
			gradePriority: 9,
		},
		{
			title: "Health",
			creditType: "health",
			instructor: "Mr. X",
			isRecovery: false,
			period: 2,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: 10,
		},
		{
			title: "Geometry",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 3,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: ["Pre-Algebra", "Algebra I"],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Algebra II",
			gradePriority: null,
		},
		{
			title: "Health",
			creditType: "health",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: false,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: 10,
		},
		{
			title: "Science Elective",
			creditType: "science",
			instructor: "Mr. X",
			isRecovery: false,
			period: 6,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},

		// ELECTIVES
		{
			title: "Welding",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Welding",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 2,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Welding",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 3,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Welding",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Welding",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 5,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Welding",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 6,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Carpentry",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Carpentry",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 5,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Carpentry",
			creditType: "vocEd",
			instructor: "Mr. X",
			isRecovery: false,
			period: 6,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Choir",
			creditType: "elective",
			instructor: "Mr. X",
			isRecovery: false,
			period: 1,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Guitar",
			creditType: "elective",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "World Drumming",
			creditType: "elective",
			instructor: "Mr. X",
			isRecovery: false,
			period: 3,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
		{
			title: "Band",
			creditType: "elective",
			instructor: "Mr. X",
			isRecovery: false,
			period: 4,
			passRate: 0.95,
			passCount: 0,
			maxSize: 32,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: "Band",
			gradePriority: null,
		},
		{
			title: "Personal Finance",
			creditType: "math",
			instructor: "Mr. X",
			isRecovery: false,
			period: 5,
			passRate: 0.95,
			passCount: 0,
			maxSize: 15,
			isRepeatable: true,
			students: [],
			requirements: {
				courses: [],
				grade: null,
			},
			popularity: 1,
			nextCourse: null,
			gradePriority: null,
		},
	];
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
		const randEnglishChance = Math.random();
		const randAlgebraChance = Math.random();
		const randMathCreditChance = Math.random();
		if (randEnglishChance < settings.chanceOfStartingEnglishII) {
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
			newStudent.courseHistory["8"].push(
				{
					title: "Pre-Algebra",
					creditType: "math",
					creditsEarned: 1,
				},
				{
					title: "Algebra I",
					creditType: "math",
					nextCourse: "Geometry",
					creditsEarned: 1,
				}
			);
		} else if (randAlgebraChance < settings.chanceOfStartingAlgebra) {
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
			if (courseHistoryMap[course.title]) {
				courseHistoryMap[course.title] += course.creditsEarned;
			} else {
				courseHistoryMap[course.title] = course.creditsEarned;
			}
		}
	}

	return courseHistoryMap;
}

function getAvailableCourses(
	courseHistoryMap,
	studentGrade,
	curSchedule,
	curCourses
) {
	return curCourses.filter((course) => {
		const courseIsNotFull = course.students.length < course.maxSize;
		const notAlreadyInSchedule = !curSchedule.find(
			(c) => c.title === course.title
		);
		const periodIsAvailable = getAvailablePeriods(curSchedule).includes(
			course.period
		);
		const matchesGradePriority =
			!course.gradePriority || studentGrade >= course.gradePriority;

		const isNewOrRepeatable =
			course.isRepeatable ||
			!courseHistoryMap[course.title] ||
			courseHistoryMap[course.title] < settings.minConsiderPass;

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
			matchesGradePriority &&
			isNewOrRepeatable &&
			meetsAllRequirements
		) {
			return true;
		}
		return false;
	});
}

// NEED TO UPDATE THIS FUNCTION TO BE DYNAMIC BASED ON SCHEDULE
function getAvailablePeriods(curSchedule) {
	const allPeriods = [1, 2, 3, 4, 5, 6];
	const enrolledPeriods = curSchedule.map((course) => course.period);
	return allPeriods.filter((period) => !enrolledPeriods.includes(period));
}

function chooseByScheduleThenPopularity(courses, nextCoursesNeeded) {
	if (courses.length === 1) {
		return courses[0];
	}
	let courseList = courses;

	// Try to choose more intelligently, by not selecting a course that has a known conflict with another needed course
	// If there are no choices available without a conflict, choose course with min number of conflicts
	// Example:
	// - Choosing between two "English II" courses
	// - But the student will also need to take "Geometry" this year
	// - One of the "English II" options is the same period as the only "Geometry" course
	// - So, pick the other option which does NOT have a conflict with "Geometry"
	nextCoursesNeeded = nextCoursesNeeded.filter(
		(course) => !courses.find((c) => c.title === course.title)
	);
	if (nextCoursesNeeded.length) {
		const coursesCopy = [...courses];
		for (const course of coursesCopy) {
			let conflictingPeriods = 0;
			for (const nextCourse of nextCoursesNeeded) {
				if (course.period === nextCourse.period) {
					conflictingPeriods++;
				}
			}
			course.conflicts = conflictingPeriods;
		}
		const coursesWithoutConflict = coursesCopy.filter(
			(course) => course.conflicts === 0
		);
		if (coursesWithoutConflict.length) {
			courseList = coursesWithoutConflict;
		} else {
			const minConflicts = Math.min(
				...coursesCopy.map((course) => course.conflicts)
			);
			const coursesWithMinConflicts = coursesCopy.filter(
				(course) => course.conflicts <= minConflicts
			);
			courseList = coursesWithMinConflicts;
		}
	}

	const chooseList = [];
	for (const course of courseList) {
		for (let i = 0; i < course.popularity; i++) {
			chooseList.push(course);
		}
	}
	const randNdx = Math.floor(Math.random() * chooseList.length);
	return chooseList[randNdx];
}

function assignCredits(course, curRequirements) {
	// Assign credits to main creditType or electives if they already have enough
	if (
		curRequirements.credits[course.creditType] <
		settings.graduationRequirements.credits[course.creditType]
	) {
		curRequirements.credits[course.creditType] += settings.creditValue;
	} else {
		curRequirements.credits.elective += settings.creditValue;
	}

	// Assign credits for the special courses required for graduation (AK History, Health, Government)
	if (course.title in settings.graduationRequirements.courses) {
		if (
			curRequirements.courses[course.title] <
			settings.graduationRequirements.courses[course.title]
		) {
			curRequirements.courses[course.title] += settings.creditValue;
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

function chooseCourse(
	availableCourses,
	studentGrade,
	prevYearCourseHistory,
	nextCoursesNeeded
) {
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
		return chooseByScheduleThenPopularity(priorityCourses, nextCoursesNeeded);
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
			return chooseByScheduleThenPopularity(recoveryCourses, nextCoursesNeeded);
		}
	}

	// Next, pick a course based on current pathways (Example:  English I -> English II)
	const pathwayCourseTitles = prevYearCourseHistory
		.filter((course) => course.nextCourse)
		.map((course) => course.nextCourse);
	if (pathwayCourseTitles.length) {
		const nextCourses = availableCourses.filter((course) =>
			pathwayCourseTitles.includes(course.title)
		);
		if (nextCourses.length) {
			return chooseByScheduleThenPopularity(nextCourses, nextCoursesNeeded);
		}
	}

	// Otherwise, if no cases are met, return a random course based on popularity
	return chooseByScheduleThenPopularity(availableCourses, nextCoursesNeeded);
}

function getCourseRef(selectedCourse) {
	return {
		title: selectedCourse.title,
		instructor: selectedCourse.instructor,
		period: selectedCourse.period,
		creditType: selectedCourse.creditType,
		nextCourse: selectedCourse.nextCourse,
		passRate: selectedCourse.passRate,
		creditsEarned: 0,
	};
}

function getStudentRef(student) {
	return {
		id: student.id,
		name: student.name,
		grade: student.grade,
	};
}

function enrollStudent(
	availableCourses,
	studentSchedule,
	student,
	allCourses,
	compareNextCourses
) {
	// Find cases where there is a next course needed, but only 1
	const nextCourseTitles = student.courseHistory[student.grade - 1]
		.filter((course) => course.nextCourse)
		.map((c) => c.nextCourse);
	const nextCoursesNeeded = compareNextCourses
		? allCourses.filter(
				(course) =>
					// Special case added here to allow skipping into English V when English IV is full
					(course.title === "English IV" &&
						!availableCourses.includes("English IV") &&
						availableCourses.includes("English V")) ||
					(nextCourseTitles.includes(course.title) &&
						!studentSchedule.find((c) => c.title === course.title))
		  )
		: [];
	if (availableCourses.length) {
		const selectedCourse = chooseCourse(
			availableCourses,
			student.grade,
			student.courseHistory[student.grade - 1],
			nextCoursesNeeded
		);
		const courseRef = getCourseRef(selectedCourse);
		studentSchedule.push(courseRef);
		const studentRef = getStudentRef(student);
		selectedCourse.students.push(studentRef);
		return selectedCourse;
	}
	return false;
}

function collectMetrics(newYear) {
	const courseMaxSizes = [];
	for (const course of newYear.courses) {
		const courseMax = course.maxSize;
		const maxSizeMatch = courseMaxSizes.find(
			(max) => max.maxSize === course.maxSize
		);
		if (!maxSizeMatch) {
			courseMaxSizes.push({
				maxSize: courseMax,
				totalCourses: 1,
				totalStudents: course.students.length,
			});
		} else {
			maxSizeMatch.totalCourses++;
			maxSizeMatch.totalStudents += course.students.length;
		}
	}
	for (const maxSize of courseMaxSizes) {
		const avg = Math.round(maxSize.totalStudents / maxSize.totalCourses);
		maxSize.avgCourseSize = avg;
	}
	const emptyCourses = newYear.courses.filter(
		(course) => !course.students.length
	);
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
		emptyCourses:
			emptyCourses.length > 5
				? emptyCourses.length
				: emptyCourses.map((c) => c.title).join(", "),
		courseSizeAvgs: courseMaxSizes,
	};
}

function simulateSchoolYear(rawCourses, rawSchedule) {
	// Setup new school year
	const randNumNewStudents = Math.floor(
		Math.random() *
			(settings.maxIncomingFreshmen - settings.minIncomingFreshmen) +
			settings.minIncomingFreshmen
	);
	const newStudents = createStudents(randNumNewStudents);
	const newYear = {
		id: generateId(),
		simYear: allYearsReport.length - settings.scheduleSystemNum + 1,
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
			const orderedCreditList = settings.orderedCredits.map((creditType) => ({
				course: null,
				credit: creditType,
			}));
			const orderedCourseList = Object.keys(
				settings.graduationRequirements.courses
			).map((courseTitle) => ({ course: courseTitle, credit: null }));
			const orderedEnrollment = [...orderedCourseList, ...orderedCreditList];

			// Try enrolling for each required course, then each credit type ordered by priority
			for (const enrollmentType of orderedEnrollment) {
				// If the student is taking a required course,
				// Then skip enrolling in the credit type of that course again
				// Example: Student is already enrolled in AK History, so don't try to enroll in another social studies course
				// NOTE: Only finding 1 required course, can improve for more generic function by using array and checking all
				let curRequiredCourseTitle = null;
				for (const requiredCourseTitle of Object.keys(
					settings.graduationRequirements.courses
				)) {
					if (
						studentSchedule.find(
							(course) => course.title === requiredCourseTitle
						)
					) {
						curRequiredCourseTitle = requiredCourseTitle;
					}
				}
				if (curRequiredCourseTitle) {
					const requiredCreditType = studentSchedule.find(
						(course) => course.title === curRequiredCourseTitle
					).creditType;
					if (
						enrollmentType.credit &&
						enrollmentType.credit === requiredCreditType
					) {
						continue;
					}
				}

				// Otherwise, check if the student needs this credit type or course,
				// Then go through the enrollment process by finding available courses,
				// and then selecting the course most appropriate
				if (
					(enrollmentType.credit &&
						student.requirements.credits[enrollmentType.credit]) <
						settings.graduationRequirements.credits[enrollmentType.credit] ||
					(enrollmentType.course &&
						student.requirements.courses[enrollmentType.course] <
							settings.graduationRequirements.courses[enrollmentType.course])
				) {
					const courseOptions = newYear.courses.filter((course) => {
						if (enrollmentType.credit) {
							return course.creditType === enrollmentType.credit;
						} else {
							return course.title === enrollmentType.course;
						}
					});
					const availableCourses = getAvailableCourses(
						courseHistoryMap,
						student.grade,
						studentSchedule,
						courseOptions
					);
					const didEnroll = enrollStudent(
						availableCourses,
						studentSchedule,
						student,
						newYear.courses,
						true
					);
					if (!didEnroll && student.grade > 11) {
						newYear.issues.push({
							student: student,
							type: "credits",
							message: `Senior could not find option for ${
								enrollmentType.course || enrollmentType.credit
							}`,
						});
					}
				}
			}

			// Next, try to fill any empty periods with core classes
			const firstRemainingPeriods = getAvailablePeriods(studentSchedule);
			if (firstRemainingPeriods.length && student.grade < 13) {
				const missingCoreCredits = [...settings.coreCredits].filter(
					(creditType) =>
						!studentSchedule.find((course) => course.creditType === creditType)
				);
				if (missingCoreCredits.length) {
					for (const creditType of missingCoreCredits) {
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
							student,
							newYear.courses,
							false
						);
						if (!didEnroll && student.grade < 13) {
							newYear.issues.push({
								student: student,
								type: "cores",
								message: `Student could not find course to have all core classes in schedule ${creditType}`,
							});
						}
					}
				}
			}

			// Finally enroll in courses for any remaining empty periods with any classes available
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
						student,
						newYear.courses,
						false
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

			// Add the completed schedule to the student object
			const orderedSchedule = studentSchedule.sort(
				(a, b) => a.period - b.period
			);
			student.courseHistory[student.grade] = orderedSchedule;

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

	// Simulate earning credits throughout the year
	for (let i = 0; i < settings.scheduleSystemNum; i++) {
		for (const student of newYear.students) {
			for (const courseRef of student.courseHistory[student.grade]) {
				const didPass = courseRef.passRate > Math.random();
				courseRef.creditsEarned += didPass ? settings.creditValue : 0;
				const updatedStudentRequirements = assignCredits(
					courseRef,
					student.requirements
				);
				student.requirements = updatedStudentRequirements;
			}
		}
	}

	// Update course pass rates, check for graduates, and collect metrics
	for (const student of newYear.students) {
		for (const courseRef of student.courseHistory[student.grade]) {
			if (courseRef.creditsEarned >= settings.minConsiderPass) {
				const curCourse = newYear.courses.find(
					(course) =>
						course.title === courseRef.title &&
						course.period === courseRef.period
				);
				curCourse.passCount++;
			}
		}
		student.didGraduate = checkDidGraduate(student.requirements);
		if (!student.didGraduate && student.grade > 12) {
			student.didDropout = true;
		}
	}
	const newMetrics = collectMetrics(newYear);
	newYear.metrics = newMetrics;
	allYearsReport.push(newYear);
}

for (
	let i = 0;
	i < settings.yearsOfSimulation + settings.scheduleSystemNum;
	i++
) {
	simulateSchoolYear();
}

for (let i = 0; i < settings.scheduleSystemNum; i++) {
	allYearsReport.shift();
}
console.log(allYearsReport);
runAllTests(allYearsReport);
