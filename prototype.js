// CURRENT ISSUES
// need to fix freshmen going to Pre-Algebra if already taken in middle school
// problems with student grades and metric counting of class sizes

// ADDITIONAL FEATURES TO ADD
// simulate student switching courses middle of year
// simulate students entering district middle of year

// MORE METRICS TO REPORT:
// average class sizes - overall, by period, by teacher/subject
// where are the bottlenecks ...
// measure by looking at the same course class sizes in the same schedule

// Global Settings Variables
const creditValue = 0.25;
const sportCreditValue = 0.5;
const minConsiderPass = 0.75;
const fullPass = 1;

const scheduleSystemNum = 4;
const maxIncomingFreshmen = 1;
const minIncomingFreshmen = 1;

const chanceOfStartingEnglishCredit = 0.1;
const chanceOfStartingMathCredit = 0.1;
const chanceOfEarningSportCredit = 0.4;

const allYearsReport = [];
const courseRequirements = ["Alaska History", "Government"];
const graduationRequirements = {
	credits: {
		english: 4,
		math: 3,
		science: 3,
		social: 3,
		physical: 1,
		health: minConsiderPass,
		vocEd: 2,
		elective: 5,
	},
	courses: {
		"Alaska History": minConsiderPass,
		Government: minConsiderPass,
	},
};
const orderedCoreCredits = ["english", "math", "science", "social"];

const orderedSecondaryCredits = ["health", "vocEd", "physical", "elective"];

const creditExtraLogic = {
	akHistory: "social",
	government: "social",
};

const scheduleCourses = [
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
		gradePriority: null,
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
		gradePriority: null,
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
		gradePriority: 10,
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
		gradePriority: 10,
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
];

const exampleStudents = [
	{
		id: "456789",
		name: "Alice",
		grade: 9,
		proficiency: Math.round(Math.random() * (100 - 50) + 50),
		didGraduate: false,
		didDropout: false,
		credits: {
			english: 0,
			math: 0,
			science: 0,
			social: 0,
			physical: 0,
			health: 0,
			vocEd: 0,
			akHistory: 0,
			elective: 0,
		},
		courseHistory: {
			8: [],
			9: [],
			10: [],
			11: [],
			12: [],
			13: [],
		},
	},
];

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
				health: 0,
				vocEd: 0,
				elective: 0,
			},
			courses: {
				"Alaska History": 0,
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
		if (randEnglishCreditChance < chanceOfStartingEnglishCredit) {
			newStudent.requirements.credits["english"] +=
				creditValue * scheduleSystemNum;
			newStudent.courseHistory["8"].push({
				title: "English I",
				creditType: "english",
				nextCourse: "English II",
			});
		}
		if (randMathCreditChance < chanceOfStartingMathCredit) {
			newStudent.requirements.credits["math"] +=
				creditValue * scheduleSystemNum;
			newStudent.courseHistory["8"].push({
				title: "Pre-Algebra",
				creditType: "math",
				nextCourse: "Algebra I",
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
			courseHistoryMap[course.title] < fullPass;

		let meetsGradeRequirements = true;
		let meetsCourseRequirements = true;
		if (course.requirements.grade) {
			meetsGradeRequirements = studentGrade >= course.requirements.grade;
		}
		if (course.requirements.courses) {
			meetsCourseRequirements = course.requirements.courses.every(
				(courseTitle) => courseHistoryMap[courseTitle] >= minConsiderPass
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
				graduationRequirements.credits[course.creditType]
			) {
				curRequirements.credits[course.creditType] += creditValue;
			} else {
				curRequirements.credits.elective += creditValue;
			}

			// Assign credits for the special courses required for graduation (AK History and Government)
			if (course.title in graduationRequirements.courses) {
				if (
					curRequirements.courses[course.title] <
					graduationRequirements.courses[course.title]
				) {
					curRequirements.courses[course.title] += creditValue;
				}
			}
			curCreditVal -= creditValue;
		}
	}
	return curRequirements;
}

function checkDidGraduate(studentRequirements) {
	let meetsCreditRequirements = true;
	for (const [creditType, creditValue] of Object.entries(
		studentRequirements.credits
	)) {
		if (graduationRequirements.credits[creditType] > creditValue) {
			meetsCreditRequirements = false;
		}
	}
	let meetsCourseRequirements = true;
	for (const [courseName, creditValue] of Object.entries(
		studentRequirements.courses
	)) {
		if (graduationRequirements.courses[courseName] > creditValue) {
			meetsCourseRequirements = false;
		}
	}
	return meetsCreditRequirements && meetsCourseRequirements;
}

function chooseCourse(availableCourses, studentGrade, prevYearCourseHistory) {
	if (!availableCourses.length) {
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
	const failedCredits = [];
	for (const course of prevYearCourseHistory) {
		if (course.creditsEarned < fullPass) {
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
	for (let i = 0; i < scheduleSystemNum; i++) {
		const didPass = course.passRate > Math.random();
		creditsEarned += didPass ? creditValue : 0;
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
		if (creditsEarned >= minConsiderPass) {
			selectedCourse.passCount++;
		}
		return true;
	}
	return false;
}

function simulateSchoolYear() {
	const randNumNewStudents = Math.floor(
		Math.random() * (maxIncomingFreshmen - minIncomingFreshmen) +
			minIncomingFreshmen
	);
	const newStudents = createStudents(randNumNewStudents);
	const newYear = {
		id: generateId(),
		simYear: allYearsReport.length + 1,
		courses: [...scheduleCourses],
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
			for (const creditType of orderedCoreCredits) {
				if (
					student.requirements.credits[creditType] <
					graduationRequirements.credits[creditType]
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
			for (const courseTitle of Object.keys(graduationRequirements.courses)) {
				if (
					student.requirements.courses[courseTitle] <
					graduationRequirements.courses[courseTitle]
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
			for (const creditType of orderedSecondaryCredits) {
				if (
					student.requirements.credits[creditType] <
					graduationRequirements.credits[creditType]
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
				randSportChance < chanceOfEarningSportCredit &&
				!student.earnedSport
			) {
				student.requirements.credits["physical"] += sportCreditValue;
			}
		}
	}
	for (const student of newYear.students) {
		student.didGraduate = checkDidGraduate(student.requirements);
		if (!student.didGraduate && student.grade > 12) {
			student.didDropout = true;
		}
	}
	const coreCourses = scheduleCourses.filter(
		(course) =>
			orderedCoreCredits.includes(course.creditType) ||
			course.title in graduationRequirements.courses
	);
	let totalCoreClassSizes = 0;
	for (const course of coreCourses) {
		totalCoreClassSizes += course.students.length;
	}
	const secondaryCourses = scheduleCourses.filter((course) =>
		orderedSecondaryCredits.includes(course.creditType)
	);
	let totalSecondaryClassSizes = 0;
	for (const course of coreCourses) {
		totalSecondaryClassSizes += course.students.length;
	}
	const newMetrics = {
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
	newYear.metrics = newMetrics;
	allYearsReport.push(newYear);
}

for (let i = 0; i < 10; i++) {
	simulateSchoolYear();
}

console.log(allYearsReport);
