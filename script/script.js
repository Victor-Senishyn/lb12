let countTrue = 0;
let countFalse = 0;
let num = 0;

let userName = prompt('Enter your name');
if (userName === null || userName.trim() === '') {
    userName = 'Player';
}
$('#user-name').text(userName);

const easyQuestionAndAnswer = {
    question: ['snow', 'red', 'stone', 'tree', 'sky', 'ocean', 'mountain', 'flower', 'fire', 'book', 'sun', 'moon', 'star', 'cloud', 'wind'],
    answer: ['сніг', 'червоний', 'каміння', 'дерево', 'небо', 'океан', 'гора', 'квітка', 'вогонь', 'книга', 'сонце', 'місяць', 'зірка', 'хмара', 'вітер'],
};

const normalQuestionAndAnswer = {
    question: ['blizzard', 'crimson', 'boulder', 'foliage', 'firmament', 'abyss', 'summit', 'blossom', 'inferno', 'volume', 'luminary', 'lunar', 'celestial body', 'cumulus', 'zephyr'],
    answer: ['заметіль', 'пурпурний', 'валун', 'листва', 'небесний світ', 'бездна', 'вершина', 'квітка', 'вогонь', 'твір', 'світильник', 'лунний', 'небесне тіло', 'кучерявий', 'легкий вітер'],
};

const hardQuestionAndAnswer = {
    question: ['quintessence', 'vermilion', 'monolith', 'foliation', 'firmament', 'abyssal depth', 'pinnacle', 'efflorescence', 'conflagration', 'opus', 'luminescence', 'lunar', 'celestial entity', 'cumulonimbus', 'zephyrous'],
    answer: ['квінтесенція', 'багряний', 'моноліт', 'листування', 'небесний світ', 'бездонна глибина', 'вершина', 'розквітання', 'вогонь', 'твір', 'світіння', 'лунний', "небесний об'єкт", 'кумулонімб', 'зефірний'],
};

let startSize = easyQuestionAndAnswer.question.length;
let rand;
let temp

$('#number').text(`${startSize}/0`);
$('#button-addon2').click(() => alert('Choice difficulty '));
$('#easy').click(() => {
	resetProgress()
    startSize = easyQuestionAndAnswer.question.length;
    rand = generateRandomIndex(easyQuestionAndAnswer.question);
    $('#question').text(easyQuestionAndAnswer.question[rand])
    temp = { ...easyQuestionAndAnswer }
    
    $('#button-addon2').off('click');
	$('#button-addon2').click(() => test(temp))
});

$('#normal').click(() => {
	resetProgress()
    startSize = normalQuestionAndAnswer.question.length;
    rand = generateRandomIndex(normalQuestionAndAnswer.question);
	$('#question').text(normalQuestionAndAnswer.question[rand])
    temp = { ...normalQuestionAndAnswer }

    $('#button-addon2').off('click');
    $('#button-addon2').click(() => test(temp))
});

$('#hard').click(() => {
	resetProgress()
	$('#number').text(`${startSize}/${num}`)
	$('#score').text(`True:${countTrue} False:${countFalse}`)

    startSize = hardQuestionAndAnswer.question.length;
    rand = generateRandomIndex(hardQuestionAndAnswer.question);
    $('#question').text(hardQuestionAndAnswer.question[rand])
    temp = { ...hardQuestionAndAnswer }

    $('#button-addon2').off('click');
    $('#button-addon2').click(() => test(temp))
});

function resetProgress() {
	countTrue = 0
	countFalse = 0
	num = 0

	$('#number').text(`${startSize}/${num}`)
	$('#score').text(`True:${countTrue} False:${countFalse}`)
}

function generateRandomIndex(array) {
    return parseInt(Math.random() * array.length);
}

function test(questionAndAnswer) {
	const userAnswer = String($('#answer').val()).trim().toLowerCase()
	const correctAnswer = questionAndAnswer.answer[rand].toLowerCase()

	if (userAnswer === correctAnswer) {
		countTrue++
		num++
		let temp = {
			question: [],
			answer: [],
		}

		let i = 0
		let delElement
		for (let item of questionAndAnswer.answer) {
			if (correctAnswer !== item) {
				temp.answer[i++] = item
			} else {
				delElement = i
			}
		}

		i = 0
		for (let j = 0; j < questionAndAnswer.question.length; j++) {
			if (j !== delElement) {
				temp.question[i++] = questionAndAnswer.question[j]
			}
		}
		questionAndAnswer.question = temp.question
		questionAndAnswer.answer = temp.answer
	} else {
		alert('Wrong answer')
		countFalse++
	}
	$('#answer').val('')

	$('#number').text(`${startSize}/${num}`)
	$('#score').text(`True:${countTrue} False:${countFalse}`)

	if (questionAndAnswer.question.length === 0) {
		$('#question').text(`Test over`)
		if (countFalse === 0) {
			alert('Your level of English is very good')
		} else if (countFalse < 6) {
			alert('Your level of English is good')
		} else if (countFalse < 11) {
			alert('Your level of English is bad')
		} else {
			alert('Your level of English is very bad')
		}
	} else {
		rand = parseInt(Math.random() * questionAndAnswer.question.length)
		$('#question').text(questionAndAnswer.question[rand])
	}
}
