var categories = [
	["Action", 2.0],
	["Action Adventure", 2.0],
	["Action Platform", 2.0],
	["Action RPG", 1.7],
	["Action Shooter", 2.2],
	["Action Stealth", 2.5],
	["Action Survival Horror", 2.5],
	["Beat'em Up", 1.0],
	["Board Game", 0.5],
	["Card Game", 0.5],
	["Fighting", 0.7],
	["Graphic Adventure", 2.5],
	["Interactive Novel", 2.5],
	["MMORPG", 0.5],
	["Party", 0.5],
	["Puzzle", 1.0],
	["Racing", 0.7],
	["Rhythm", 0.7],
	["Roguelike", 1.0],
	["Sandbox", 0.7],
	["Simulator", 0.7],
	["Single-player RPG", 1.0],
	["Sport", 0.5],
	["Strategy", 0.7],
	["Survival Horror", 1.5],
	["Text Adventure", 1.5],
	["Trivia", 0.5]
];

var ratingScales = [-0.30, 0.10, 0.15, 0.20, 0.25, 0.30];
var openStar = "&star;"
var closedStar = "&bigstar;"

function setupCategories() {
	var categorySelect = $("#categorySelect");
	categories.forEach(function(cat) {
		categorySelect.append("<option value='" + cat[1] + "'>" + cat[0] + "</option>");
	});
}

function buildTemplateRatingArray() {
	var templateArray = [];

	for (var i = 1; i < ratingScales.length; i++) {
		templateArray.push(openStar);
	}

	return templateArray;
}

function compileRatingString(array, index) {
	var ratingString = "";

	array.forEach(function(symbol, i) {
		if (i >= index) {
			ratingString += symbol;
		}
		else {
			ratingString += closedStar;
		}
	});

	return ratingString;
}

function setupRatings() {
	var ratingArrays = [];
	var ratingSelect = $("#ratingSelect");

	for (var i = 0; i < ratingScales.length; i++) {
		ratingArrays.push(buildTemplateRatingArray());
	}

	ratingArrays.forEach(function(array, index) {
		var ratingString = compileRatingString(array, index);
		var html = "<option value='" + ratingScales[index] + "'>" + ratingString + "</option>";
		ratingSelect.append(html);
	});
}

function getSelectedCategoryValue() {
	return parseFloat($("#categorySelect").val());
}

function getSelectedRatingValue() {
	return parseFloat($("#ratingSelect").val());
}

function getHours() {
	var hours = $("#hoursInput").val();

	try {
		hours = parseFloat(hours);

		if (isNaN(hours)) {
			window.alert("Invalid number of hours.")
		}
	}
	catch (err) {
		window.alert("Invalid number of hours.")
	}

	return hours;
}

function calculateValue() {
	var vph = getSelectedCategoryValue();
	var scale = getSelectedRatingValue();
	var hours = getHours();

	var totalValue = Math.round((vph * hours) * (1 + scale));

	console.log("vph=" + vph + ", scale=" + scale + ", hours=" + hours + ", total=" + totalValue);
	return totalValue;
}

function updateTotalValue(newValue) {
	if (isNaN(newValue)) {
		$("#totalValue").html("");
	}
	else {
		$("#totalValue").html("$" + newValue);
	}
}

function setupButtonHandling() {
	$("#calcButton").click(function() {
		var totalValue = calculateValue();
		updateTotalValue(totalValue);
	});
}

setupCategories();
setupRatings();
setupButtonHandling();