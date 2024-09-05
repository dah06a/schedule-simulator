// NOTES FROM CALL
// different classes can have different max class sizes
// 5 to 45 would be min and max for incoming
// main goals:
// schedule should not change year to year
// reduce 'bottlenecks' of classes/periods that are needed by everyone
// reduce teacher preps when possible
// maintain stable class sizes (best if greater than 10 and smaller than 27 for core classes)
// freshman should try to take AK history and other classes should try to take health

//Ideas:
// start with older kids first is good
// but - then go to the named courses next - akhistory, government, health, vocEd
// and THEN core requirements is good
// continue with random selection after that, but popularity value would be better
// could also rank importance of credits - ex: vocEd is more important than PE
// vocEd
// pe
// elective
// need to handle 'Lab' classes ...
// if failed more than 1 credit in the past for math or english, then try to enroll in labs
// need to record when students need credits but cannot take the course
// need to prototype a system for how to generate random students year

// Metrics:
// average class sizes - overall, by period, by teacher/subject
// how many kids could not graduate by senior year
// how many kids total in each class-year
// where are the bottlenecks ...
// measure by looking at the same course class sizes in the same schedule

// TO SUMMARIZE FOR STEPHEN CALL
// Initial implementation will be in Google Sheets
// Need to create sheet format together where info can be easily added and used by my program
// Need to clarify all rules and logic of flow from how classes are selected for students each year
// Need to clarify exactly what is needed from output - but most stats should be easy to collect
// Google sheet can also have a few cells reserved for basic settings for the whole simulation

// Later - can possibly turn this into a web app ... if we think it's a good/valuable idea :)

// max class for core classes and PE = 32
// max class for vocEd and lab = 15
// if students start taking band, they will likely continue taking band ...
// check to make sure that students do not have same class in the year (welding 1st period and 5th period)
// submit an issue if a student cannot fill schedule periods only

const allYearsReport = [];
const maxClassSize = 25;
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

const scheduleCourses = [
	// ENGLISH
	{
		title: "English V",
		creditType: "english",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I", "English II", "English III", "English IV"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "English III",
		creditType: "english",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I", "English II"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "English II",
		creditType: "english",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "English I",
		creditType: "english",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "English II",
		creditType: "english",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "English IV",
		creditType: "english",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I", "English II", "English III"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},

	// MATH
	{
		title: "Algebra I",
		creditType: "math",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "PreCalc/Calc",
		creditType: "math",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra", "Algebra I", "Geometry", "Algebra II"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Geometry",
		creditType: "math",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra", "Algebra I"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Algebra I",
		creditType: "math",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Algebra II",
		creditType: "math",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra", "Algebra I", "Geometry"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Pre-Algebra",
		creditType: "math",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},

	// SCIENCE
	{
		title: "Science II",
		creditType: "science",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Science I"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Science III",
		creditType: "science",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Science I", "Science II"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Science I",
		creditType: "science",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Science I",
		creditType: "science",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Science III",
		creditType: "science",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Science I", "Science II"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Science II",
		creditType: "science",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Science I"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},

	// SOCIAL STUDIES
	{
		title: "World History",
		creditType: "social",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Alaska History",
		creditType: "akHistory",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Government",
		creditType: "government",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Government",
		creditType: "government",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Alaska History",
		creditType: "akHistory",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "World History",
		creditType: "social",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},

	// LAB CLASSES
	{
		title: "English Lab",
		creditType: "english",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "US History",
		creditType: "social",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "English Lab",
		creditType: "english",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Math Lab",
		creditType: "math",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},

	// PE
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},

	// MATH/SCIENCE/HEALTH
	{
		title: "Pre-Algebra",
		creditType: "physical",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Health",
		creditType: "health",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Geometry",
		creditType: "math",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra", "Algebra I"],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Health",
		creditType: "health",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Science Elective",
		creditType: "science",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},

	// ELECTIVES
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Choir",
		creditType: "elective",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Guitar",
		creditType: "elective",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "World Drumming",
		creditType: "elective",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
	{
		title: "Band",
		creditType: "elective",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 0.5,
	},
];

const exampleStudents = [
	{
		id: "456789",
		name: "Alice",
		grade: 9,
		proficiency: Math.round(Math.random() * (100 - 50) + 50),
		isGraduated: false,
		isDropout: false,
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
		isGraduated: false,
		isDropout: false,
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

function createStudents(numOfStudents = 100) {
	const students = [];
	for (let i = 0; i < numOfStudents; i++) {
		const newStudent = generateStudent();
		students.push(newStudent);
	}
	return students;
}

function getAllActivePrevStudents() {
	const activeStudents = [];
	for (const year of allYearsReport) {
		if (year.students) {
			for (const student of year.students) {
				if (!student.isGraduated && !student.isDropout) {
					activeStudents.push(student);
				}
			}
		}
	}
	return activeStudents;
}

function getPassedCoursesIds(student) {
	const allPassedCourses = [];
	for (const year of Object.values(student.courseHistory)) {
		for (const semester of year) {
			for (const course of semester) {
				if (course.didPass) {
					allPassedCourses.push(course.id);
				}
			}
		}
	}
	return allPassedCourses;
}

function getAvailableCourses(
	courseHistoryIds,
	studentGrade,
	semester,
	curCourses
) {
	const underMaxClassSize = [
		...curCourses.filter((course) => course.students.length < maxClassSize),
	];
	const inCurSemester = underMaxClassSize.filter(
		(course) => course.semester === semester
	);
	const newOrRepeatable = inCurSemester.filter(
		(course) => course.repeatable || !courseHistoryIds.includes(course.id)
	);
	return newOrRepeatable.filter((course) => {
		if (!course.requirements.grade && !course.requirements.courses) {
			return true;
		}

		let meetsGradeRequirements = true;
		let meetsCourseRequirements = true;
		if (course.requirements.grade) {
			meetsGradeRequirement = studentGrade >= course.requirements.grade;
		}
		if (course.requirements.courses) {
			meetsCourseRequirements = course.requirements.courses.every((courseId) =>
				courseHistoryIds.includes(courseId)
			);
		}
		return meetsGradeRequirements && meetsCourseRequirements;
	});
}

function getAvailablePeriods(curSchedule) {
	const allPeriods = [1, 2, 3, 4, 5, 6];
	const enrolledPeriods = curSchedule.map((course) => course.period);
	return allPeriods.filter((period) => !enrolledPeriods.includes(period));
}

function simulateSchoolYear() {
	// Create random number of new 9th grade students (80 - 140);
	const randNumNewStudents = Math.floor(Math.random() * (100 - 50) + 50);
	const newStudents = createStudents(randNumNewStudents);

	// Create new 'year' object with courses and students
	const newYear = {
		id: generateId(),
		simYear: allYearsReport.length + 1,
		courses: [...scheduleCourses],
		students: [...getAllActivePrevStudents(), ...newStudents],
		issues: [],
	};

	// Iterate over both semesters...
	for (let semester = 1; semester < 3; semester++) {
		// Get all students of a certain grade level and iterate through each (start with seniors)
		for (let gradeLevel = 13; gradeLevel > 8; gradeLevel--) {
			const curStudents = newYear.students.filter(
				(student) => student.grade === gradeLevel
			);

			// Loop over each student for each semester and evaluate needed credits
			for (const student of curStudents) {
				const studentSchedule = [];
				const courseHistoryIds = getPassedCoursesIds(student);
				const availableCourses = getAvailableCourses(
					courseHistoryIds,
					student.grade,
					semester,
					newYear.courses
				);

				// Enroll in class based on credits first, but try to fill all periods
				// NEED ACTUAL LOGIC FOR PICKING COURSES INSTEAD OF RANDOM CHOICE
				const coreRequirements = [
					{ creditType: "english", creditValue: 4 },
					{ creditType: "math", creditValue: 3 },
					{ creditType: "science", creditValue: 3 },
					{ creditType: "social", creditValue: 3 },
				];
				for (const requirement of coreRequirements) {
					if (
						student.credits[requirement.creditType] < requirement.creditValue
					) {
						const subjectCourses = availableCourses.filter(
							(course) => course.creditType === requirement.creditType
						);
						const availablePeriods = getAvailablePeriods(studentSchedule);
						const possibleCourses = subjectCourses.filter((course) =>
							availablePeriods.includes(course.period)
						);

						if (possibleCourses.length) {
							const randNdx = Math.floor(
								Math.random() * possibleCourses.length
							);
							const selectedCourse = possibleCourses[randNdx];
							const courseGrade = student.proficiency * selectedCourse.passRate;
							const didPass = courseGrade >= 60;

							const curYearCourseRef = newYear.courses.find(
								(course) => course.id === selectedCourse.id
							);
							const studentCourseRef = {
								id: selectedCourse.id,
								title: selectedCourse.title,
								instructor: selectedCourse.instructor,
								period: selectedCourse.period,
								semester: selectedCourse.semester,
								creditType: selectedCourse.creditType,
								creditValue: selectedCourse.creditValue,
								didPass: didPass,
							};

							curYearCourseRef.students.push(student);
							studentSchedule.push(studentCourseRef);
							if (didPass) {
								curYearCourseRef.passCount++;
								student.credits[requirement.creditType] +=
									curYearCourseRef.creditValue;
							}
						}
					} else {
						// todo - scenario when there are no remaining core requirements ...
					}
				}

				// After looping through all the core content requirements, fill remaining periods
				const remainingPeriods = getAvailablePeriods(studentSchedule);
				for (const period of remainingPeriods) {
					const possibleCourses = availableCourses.filter(
						(course) => course.period === period
					);
					if (possibleCourses.length) {
						const randNdx = Math.floor(Math.random() * possibleCourses.length);
						const selectedCourse = possibleCourses[randNdx];
						const courseGrade = student.proficiency * selectedCourse.passRate;
						const didPass = courseGrade >= 60;

						const curYearCourseRef = newYear.courses.find(
							(course) => course.id === selectedCourse.id
						);
						const studentCourseRef = {
							id: selectedCourse.id,
							title: selectedCourse.title,
							instructor: selectedCourse.instructor,
							period: selectedCourse.period,
							semester: selectedCourse.semester,
							creditType: selectedCourse.creditType,
							creditValue: selectedCourse.creditValue,
							didPass: didPass,
						};

						curYearCourseRef.students.push(student);
						studentSchedule.push(studentCourseRef);
						if (didPass) {
							curYearCourseRef.passCount++;
							student.credits[selectedCourse.creditType] +=
								curYearCourseRef.creditValue;
						}
					} else {
						newYear.issues.push({
							id: generateId(),
							semester: semester,
							student: student,
							period: period,
							message: "Could not find any available courses",
						});
					}
				}
				student.courseHistory[student.grade].push(studentSchedule);
				if (semester === 2) {
					student.grade++;
				}
			}
		}
	}

	allYearsReport.push(newYear);
}

for (let i = 0; i < 4; i++) {
	simulateSchoolYear();
	for (const year of allYearsReport) {
		for (const student of year.students) {
			console.log(student.grade, year.simYear);
			if (!student.didGraduate && !student.didDropout) {
				student.grade++;
			}
		}
	}
}

console.log(allYearsReport);

// To do ...
// Create check to see if students have met all requirements and make change

// Logic ideas and reminders
// when selecting a new class, cannot choose same class that has already been passed
// need better/updated method of predicting if student will pass a class (currently - profiency * passRate = grade)

// Extras ...
// simulate student switching courses middle of year
// simulate student dropping out
// simulate students entering district middle of year
// simulate some students getting health credit through a sport
// simulate updating schedule each with with some different courses
