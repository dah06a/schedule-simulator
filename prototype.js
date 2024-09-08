// TODO
// create "paths" by adding props to courses for finding next course
// add props to courses for making priority for certain grade levels
// need to handle lab classes differently - try to select only if failures
// need a way to handle in course props when class counts towards multiple credits - akhistory
// when selecting a new class, cannot choose same class that has already been passed
// need better/updated method of predicting if student will pass a class (currently - profiency * passRate = grade)
// if students start taking band, they will likely continue taking band ...
// simulate student switching courses middle of year
// simulate student dropping out
// simulate students entering district middle of year
// simulate some students getting pe credit through a sport

// METRICS TO REPORT LATER:
// average class sizes - overall, by period, by teacher/subject
// how many kids could not graduate by senior year
// how many kids total in each class-year
// where are the bottlenecks ...
// measure by looking at the same course class sizes in the same schedule

// Global Settings Variables
const creditValue = 0.25;
const considerPass = 0.75;
const scheduleSystemNum = 4;
const maxIncomingFreshmen = 45;
const minIncomingFreshmen = 5;

const allYearsReport = [];
const creditRequirements = {
	english: 4,
	math: 3,
	science: 3,
	social: 3,
	physical: 1,
	health: 1,
	vocEd: 2,
	akHistory: 1,
	government: 1,
	elective: 5,
};

const orderedCredits = [
	"akHistory",
	"government",
	"english",
	"math",
	"science",
	"social",
	"health",
	"vocEd",
	"physical",
	"elective",
];

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
	},
	{
		title: "English III",
		creditType: "english",
		instructor: "Mr. X",
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
	},
	{
		title: "English II",
		creditType: "english",
		instructor: "Mr. X",
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
	},
	{
		title: "English I",
		creditType: "english",
		instructor: "Mr. X",
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
	},
	{
		title: "English II",
		creditType: "english",
		instructor: "Mr. X",
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
	},
	{
		title: "English IV",
		creditType: "english",
		instructor: "Mr. X",
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
	},

	// MATH
	{
		title: "Algebra I",
		creditType: "math",
		instructor: "Mr. X",
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
	},
	{
		title: "PreCalc/Calc",
		creditType: "math",
		instructor: "Mr. X",
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
	},
	{
		title: "Geometry",
		creditType: "math",
		instructor: "Mr. X",
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
	},
	{
		title: "Algebra I",
		creditType: "math",
		instructor: "Mr. X",
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
	},
	{
		title: "Algebra II",
		creditType: "math",
		instructor: "Mr. X",
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
	},
	{
		title: "Pre-Algebra",
		creditType: "math",
		instructor: "Mr. X",
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
	},

	// SCIENCE
	{
		title: "Science II",
		creditType: "science",
		instructor: "Mr. X",
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
	},
	{
		title: "Science III",
		creditType: "science",
		instructor: "Mr. X",
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
	},
	{
		title: "Science I",
		creditType: "science",
		instructor: "Mr. X",
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
	},
	{
		title: "Science I",
		creditType: "science",
		instructor: "Mr. X",
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
	},
	{
		title: "Science III",
		creditType: "science",
		instructor: "Mr. X",
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
	},
	{
		title: "Science II",
		creditType: "science",
		instructor: "Mr. X",
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
	},

	// SOCIAL STUDIES
	{
		title: "World History",
		creditType: "social",
		instructor: "Mr. X",
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
	},
	{
		title: "Alaska History",
		creditType: "akHistory",
		instructor: "Mr. X",
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
	},
	{
		title: "Government",
		creditType: "government",
		instructor: "Mr. X",
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
	},
	{
		title: "Government",
		creditType: "government",
		instructor: "Mr. X",
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
	},
	{
		title: "Alaska History",
		creditType: "akHistory",
		instructor: "Mr. X",
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
	},
	{
		title: "World History",
		creditType: "social",
		instructor: "Mr. X",
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
	},

	// LAB CLASSES
	{
		title: "English Lab",
		creditType: "english",
		instructor: "Mr. X",
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
	},
	{
		title: "US History",
		creditType: "social",
		instructor: "Mr. X",
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
	},
	{
		title: "English Lab",
		creditType: "english",
		instructor: "Mr. X",
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
	},
	{
		title: "Math Lab",
		creditType: "math",
		instructor: "Mr. X",
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
	},

	// PE
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
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
	},
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
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
	},
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
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
	},

	// MATH/SCIENCE/HEALTH
	{
		title: "Pre-Algebra",
		creditType: "math",
		instructor: "Mr. X",
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
	},
	{
		title: "Health",
		creditType: "health",
		instructor: "Mr. X",
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
	},
	{
		title: "Geometry",
		creditType: "math",
		instructor: "Mr. X",
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
	},
	{
		title: "Health",
		creditType: "health",
		instructor: "Mr. X",
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
	},
	{
		title: "Science Elective",
		creditType: "science",
		instructor: "Mr. X",
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
	},

	// ELECTIVES
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
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
	},
	{
		title: "Choir",
		creditType: "elective",
		instructor: "Mr. X",
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
	},
	{
		title: "Guitar",
		creditType: "elective",
		instructor: "Mr. X",
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
	},
	{
		title: "World Drumming",
		creditType: "elective",
		instructor: "Mr. X",
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
	},
	{
		title: "Band",
		creditType: "elective",
		instructor: "Mr. X",
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
		credits: {
			english: 0,
			math: 0,
			science: 0,
			social: 0,
			physical: 0,
			health: 0,
			vocEd: 0,
			akHistory: 0,
			government: 0,
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
	};
}

function createStudents(numOfStudents = 25) {
	const students = [];
	for (let i = 0; i < numOfStudents; i++) {
		const newStudent = generateStudent();
		students.push(newStudent);
	}
	return students;
}

// CAN IMPROVE THIS BY STARTING AT LAST YEAR AND ONLY LOOKING BACK LAST 5 YEARS ...
function getAllActiveStudents() {
	const activeStudents = [];
	for (const year of allYearsReport) {
		if (year.students) {
			for (const student of year.students) {
				if (
					!student.didGraduate &&
					!student.didDropout &&
					!activeStudents.find((s) => s.id === student.id)
				) {
					activeStudents.push(student);
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
		const notAlreadyInSchedule = !curSchedule.includes(course.title);
		const periodIsAvailable = getAvailablePeriods(curSchedule).includes(
			course.period
		);
		const isNewOrRepeatable =
			course.isRepeatable ||
			!courseHistoryMap[course] ||
			courseHistoryMap[course] <= considerPass;

		let meetsGradeRequirements = true;
		let meetsCourseRequirements = true;
		if (course.requirements.grade) {
			meetsGradeRequirements = studentGrade >= course.requirements.grade;
		}
		if (course.requirements.courses) {
			meetsCourseRequirements = course.requirements.courses.every(
				(courseTitle) => courseHistoryMap[courseTitle] >= considerPass
			);
		}
		const meetsAllRequirements =
			meetsGradeRequirements && meetsCourseRequirements;
		if (
			courseIsNotFull &&
			notAlreadyInSchedule &&
			periodIsAvailable &&
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

function assignCredits(studentSchedule, curCredits) {
	for (const course of studentSchedule) {
		let curCreditVal = course.creditsEarned;
		while (curCreditVal > 0) {
			if (
				curCredits[course.creditType] < creditRequirements[course.creditType]
			) {
				curCredits[course.creditType] += creditValue;
				if (creditExtraLogic) {
					const creditExtraType = creditExtraLogic[course.creditType];
					if (
						creditExtraType &&
						curCredits[creditExtraType] < creditRequirements[creditExtraType]
					) {
						curCredits[creditExtraType] += creditValue;
					}
				}
			} else {
				curCredits.elective += creditValue;
			}
			curCreditVal -= creditValue;
		}
	}
	return curCredits;
}

function checkDidGraduate(studentCredits) {
	let meetsRequirements = true;
	for (const [creditType, creditValue] of Object.entries(studentCredits)) {
		if (creditRequirements[creditType] > creditValue) {
			meetsRequirements = false;
		}
	}
	return meetsRequirements;
}

function simulateSchoolYear() {
	// Create random number of new 9th grade students (80 - 140);
	const randNumNewStudents = Math.floor(
		Math.random() * (maxIncomingFreshmen - minIncomingFreshmen) +
			minIncomingFreshmen
	);
	const newStudents = createStudents(randNumNewStudents);

	// Create new 'year' object with courses and students
	const newYear = {
		id: generateId(),
		simYear: allYearsReport.length + 1,
		courses: [...scheduleCourses],
		students: [...getAllActiveStudents(), ...newStudents],
		issues: [],
	};

	// Simulate school year enrollment for each student
	for (let gradeLevel = 13; gradeLevel > 8; gradeLevel--) {
		const curStudents = getStudentsByGrade(newYear.students, gradeLevel);
		for (const student of curStudents) {
			const courseHistoryMap = getCourseHistoryMap(student);
			const studentSchedule = [];

			// First, attempt to enroll based on credit type rankings
			for (const creditType of orderedCredits) {
				if (student.credits[creditType] < creditRequirements[creditType]) {
					const curCreditTypeCourses = newYear.courses.filter(
						(course) => course.creditType === creditType
					);
					const availableCourses = getAvailableCourses(
						courseHistoryMap,
						student.grade,
						studentSchedule,
						curCreditTypeCourses
					);
					if (availableCourses.length) {
						// Handle special cases for Freshmen going to some specific courses
						let selectedCourse;
						if (
							student.grade === 9 &&
							creditType === "english" &&
							availableCourses.find((course) => course.title === "English I")
						) {
							const desiredCourses = availableCourses.filter(
								(course) => course.title === "English I"
							);
							selectedCourse = chooseRandCourseByPopularity(desiredCourses);
						} else if (
							student.grade === 9 &&
							creditType === "akHistory" &&
							availableCourses.find(
								(course) => course.title === "Alaska History"
							)
						) {
							const desiredCourses = availableCourses.filter(
								(course) => course.title === "Alaska History"
							);
							selectedCourse = chooseRandCourseByPopularity(desiredCourses);
						} else if (student.grade === 9 && creditType === "health") {
							continue;
						} else {
							selectedCourse = chooseRandCourseByPopularity(availableCourses);
						}
						let creditsEarned = 0;
						for (let i = 0; i < scheduleSystemNum; i++) {
							const didPassQuarter = selectedCourse.passRate > Math.random();
							if (didPassQuarter) {
								creditsEarned += creditValue;
							}
						}
						const courseRef = {
							title: selectedCourse.title,
							instructor: selectedCourse.instructor,
							period: selectedCourse.period,
							creditType: selectedCourse.creditType,
							creditsEarned: creditsEarned,
						};
						studentSchedule.push(courseRef);
						const studentRef = {
							id: student.id,
							name: student.name,
							grade: student.grade,
						};
						selectedCourse.students.push(studentRef);
						if (creditsEarned >= considerPass) {
							selectedCourse.passCount++;
						}
					} else if (student.grade > 11) {
						newYear.issues.push({
							student: student,
							type: "creditRequirementsCourseNotFound",
							message: `No courses found for senior who needed more ${creditType} credits`,
						});
					}
				}
			}

			// Then, enroll in courses for any remaining empty periods
			const remainingPeriods = getAvailablePeriods(studentSchedule);
			if (remainingPeriods.length) {
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
					if (availableCourses.length) {
						const selectedCourse =
							chooseRandCourseByPopularity(availableCourses);
						let creditsEarned = 0;
						for (let i = 0; i < 4; i++) {
							const didPassQuarter = selectedCourse.passRate > Math.random();
							if (didPassQuarter) {
								creditsEarned += creditValue;
							}
						}
						const studentCourseRef = {
							title: selectedCourse.title,
							instructor: selectedCourse.instructor,
							period: selectedCourse.period,
							creditType: selectedCourse.creditType,
							creditsEarned: creditsEarned,
						};
						studentSchedule.push(studentCourseRef);
						const studentRef = {
							id: student.id,
							name: student.name,
							grade: student.grade,
						};
						selectedCourse.students.push(studentRef);
						if (creditsEarned >= considerPass) {
							selectedCourse.passCount++;
						}
					} else {
						newYear.issues.push({
							student: student,
							type: "emptyPeriodCourseNotFound",
							message: `No courses found for ${student.grade}th student who needed a class for ${period} period`,
						});
					}
				}
			}

			// Finally, update each student course history and assign credits
			const orderedSchedule = studentSchedule.sort(
				(a, b) => a.period - b.period
			);
			student.courseHistory[student.grade] = orderedSchedule;
			const updatedStudentCredits = assignCredits(
				orderedSchedule,
				student.credits
			);
			student.credits = updatedStudentCredits;
		}
	}
	for (const student of newYear.students) {
		student.didGraduate = checkDidGraduate(student.credits);
		if (!student.didGraduate && student.grade > 12) {
			student.didDropout = true;
		}
		if (!student.didGraduate && !student.didDropout) {
			student.grade++;
		}
	}
	allYearsReport.push(newYear);
}

for (let i = 0; i < 5; i++) {
	simulateSchoolYear();
}

console.log(allYearsReport);
