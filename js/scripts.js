let arrNext = document.querySelector('.adv__arr_next');
let arrPrev = document.querySelector('.adv__arr_prev');

arrNext.addEventListener('click', function() {
	arrPrev.classList.remove('disabled');
	currentDay++;
	renderData();
	if (currentDay == response.length - advItems.length) {
		arrNext.classList.add('disabled');
	}
});
arrPrev.addEventListener('click', function() {
	arrNext.classList.remove('disabled');
	currentDay--;
	renderData();
	if (currentDay == 0) {
		arrPrev.classList.add('disabled');
	}
});

var advData = {
	months: [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря'
	],
	days: [
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
		'Воскресенье'
	],
	icons: {
		sunny: ['img/icon__sun.svg', 'img/icon__sun.svg', 'img/icon__sun.svg', 'img/icon__sun.svg'],
		cloudy: [
			'img/icon__cloud.svg',
			'img/icon__rain.svg',
			'img/icon__snow.svg',
			'img/icon__thunder.svg'
		]
	},
	descr: ['без осадков', 'дождь', 'снегопад', 'гроза']
};

//get all blocks
var advItems = document.querySelectorAll('.adv__item-wrp');
var	descr   =	document.querySelector('.adv__item-descr');

var response;
var currentDay = 0;

window.onload = function() {
	let request = new XMLHttpRequest();
	request.open('GET', 'js/advisory-data.json');
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				response = JSON.parse(this.responseText);
				renderData();
			} else {
				console.log('Произошла ошибка, статус ошибки: ' + this.status);
			}
		}
	};
	request.send(null);
};

function renderData() {
	//weather data output
	for (let i = 0; i < advItems.length; i++) {
		
		let date = new Date(response[i + currentDay].date);
		if (!(i + currentDay)) {
			advItems[i].querySelector('.adv__item-day').innerHTML = 'Сегодня';
		} else {
			advItems[i].querySelector('.adv__item-day').innerHTML =
			advData.days[date.getDay()];
		}
		
		advItems[i].querySelector('.adv__item-date').innerHTML =
			date.getDate() + ' ' + advData.months[date.getMonth()];
		
		let descr = 0;
		response[i + currentDay].rain ? descr++ : '';
		response[i + currentDay].snow ? (descr = descr + 1) : '';
		advItems[i]
			.querySelector('img')
			.setAttribute(
				'src',
				advData.icons[response[i + currentDay].cloudiness][
					descr
				]
			);
		
		advItems[i].querySelector('.adv__item-time_day').innerHTML =
			'Днём ' + response[i + currentDay].temperature.day + '°';
		advItems[i].querySelector('.adv__item-time_night').innerHTML =
			'Ночью ' + response[i + currentDay].temperature.night + '°';
		
		advItems[i].querySelector('.adv__item-descr').innerHTML =
		advData.descr[descr];
	}
}
