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
const creditValue = 0.25;
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
	"health",
	"vocEd",
	"english",
	"math",
	"science",
	"social",
	"physical",
	"elective",
];

const scheduleCourses = [
	// ENGLISH
	{
		title: "English V",
		creditType: "english",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I", "English II", "English III", "English IV"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "English III",
		creditType: "english",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I", "English II"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "English II",
		creditType: "english",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "English I",
		creditType: "english",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "English II",
		creditType: "english",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "English IV",
		creditType: "english",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["English I", "English II", "English III"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},

	// MATH
	{
		title: "Algebra I",
		creditType: "math",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "PreCalc/Calc",
		creditType: "math",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra", "Algebra I", "Geometry", "Algebra II"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Geometry",
		creditType: "math",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra", "Algebra I"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Algebra I",
		creditType: "math",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Algebra II",
		creditType: "math",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra", "Algebra I", "Geometry"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Pre-Algebra",
		creditType: "math",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},

	// SCIENCE
	{
		title: "Science II",
		creditType: "science",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Science I"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Science III",
		creditType: "science",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Science I", "Science II"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Science I",
		creditType: "science",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Science I",
		creditType: "science",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Science III",
		creditType: "science",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Science I", "Science II"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Science II",
		creditType: "science",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Science I"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},

	// SOCIAL STUDIES
	{
		title: "World History",
		creditType: "social",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Alaska History",
		creditType: "akHistory",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Government",
		creditType: "government",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Government",
		creditType: "government",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Alaska History",
		creditType: "akHistory",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "World History",
		creditType: "social",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},

	// LAB CLASSES
	{
		title: "English Lab",
		creditType: "english",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "US History",
		creditType: "social",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "English Lab",
		creditType: "english",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Math Lab",
		creditType: "math",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},

	// PE
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "High School PE",
		creditType: "physical",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},

	// MATH/SCIENCE/HEALTH
	{
		title: "Pre-Algebra",
		creditType: "physical",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Health",
		creditType: "health",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Geometry",
		creditType: "math",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: ["Pre-Algebra", "Algebra I"],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Health",
		creditType: "health",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: false,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Science Elective",
		creditType: "science",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},

	// ELECTIVES
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 2,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Welding",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 5,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Carpentry",
		creditType: "vocEd",
		instructor: "Mr. X",
		period: 6,
		passRate: 0.9,
		passCount: 0,
		maxSize: 15,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Choir",
		creditType: "elective",
		instructor: "Mr. X",
		period: 1,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Guitar",
		creditType: "elective",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "World Drumming",
		creditType: "elective",
		instructor: "Mr. X",
		period: 3,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
		popularity: 1,
	},
	{
		title: "Band",
		creditType: "elective",
		instructor: "Mr. X",
		period: 4,
		passRate: 0.9,
		passCount: 0,
		maxSize: 32,
		isRepeatable: true,
		students: [],
		requirements: {
			courses: [],
			grade: null,
		},
		classSize: 0,
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

function getAllActiveStudents() {
	const activeStudents = [];
	for (const year of allYearsReport) {
		if (year.students) {
			for (const student of year.students) {
				if (!student.didGraduate && !student.didDropout) {
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
	const allPassedCourses = [];
	for (const year of Object.values(student.courseHistory)) {
		for (const quarter of year) {
			for (const course of quarter) {
				if (course.didPass) {
					allPassedCourses.push(course.title);
				}
			}
		}
	}

	const courseHistoryMap = {};
	for (const course of allPassedCourses) {
		if (!courseHistoryMap[course]) {
			courseHistoryMap[course] = 0.25;
		} else {
			courseHistoryMap += 0.25;
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
		const isNewOrRepeatable =
			course.isRepeatable ||
			!courseHistoryMap[course] ||
			courseHistoryMap[course] <= 0.75;

		let meetsGradeRequirements = true;
		let meetsCourseRequirements = true;
		if (course.requirements.grade) {
			meetsGradeRequirements = studentGrade >= course.requirements.grade;
		}
		if (course.requirements.courses) {
			meetsCourseRequirements = course.requirements.courses.every(
				(courseTitle) => courseHistoryMap[courseTitle] >= 0.75
			);
		}
		const meetsAllRequirements =
			meetsGradeRequirements && meetsCourseRequirements;
		if (
			courseIsNotFull &&
			notAlreadyInSchedule &&
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
	const chooseList = [];
	for (const course of courses) {
		for (let i = 0; i < course.popularity; i++) {
			chooseList.push(course);
		}
	}
	const randNdx = Math.floor(Math.random() * chooseList.length);
	return chooseList[randNdx];
}

function assignCredits(schedule, curCredits) {
	const newCredits = [...curCredits];
	for (const course of schedule) {
		if (course.didPass) {
			if (
				curCredits[course.creditType] < creditRequirements[course.creditType]
			) {
				newCredits[course.creditType] += creditValue;
			} else if (
				(course.creditType === "akHistory" ||
					course.creditType === "government") &&
				curCredits.social < creditRequirements.social
			) {
				newCredits.social += creditValue;
			} else {
				newCredits.elective += creditValue;
			}
		}
	}
	return newCredits;
}

function simulateSchoolYear() {
	// Create random number of new 9th grade students (80 - 140);
	const randNumNewStudents = Math.floor(Math.random() * (45 - 5) + 5);
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
						const selectedCourse =
							chooseRandCourseByPopularity(availableCourses);

						for (let i = 0; i < 4; i++) {}
						const didPass = course.passRate > Math.random();
						const studentCourseRef = {
							title: selectedCourse.title,
							instructor: selectedCourse.instructor,
							period: selectedCourse.period,
							creditType: selectedCourse.creditType,
							didPass: didPass,
						};
						studentSchedule.push(studentCourseRef);

						// NEED TO UPDATE COURSE NUMBERS AND PASS COUNT
					} else {
						newYear.issues.push({
							student: student,
							type: "creditRequirementsCourseNotFound",
							message: `No courses found for ${student.grade}th student who needed more ${creditType} credits`,
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
						const didPass = course.passRate > Math.random();
						const studentCourseRef = {
							title: selectedCourse.title,
							instructor: selectedCourse.instructor,
							period: selectedCourse.period,
							creditType: selectedCourse.creditType,
							didPass: didPass,
						};
						studentSchedule.push(studentCourseRef);
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
