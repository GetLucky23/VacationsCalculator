'use strict';

// variables section

const timeStartSpan = document.querySelector('.time-start span');
const timeStartDatepicker = document.querySelector('.time-start-datepicker');
const timeStartButton = document.querySelector('.time-start-button');

const timeEndSpan = document.querySelector('.time-end span');
const timeEndDatepicker = document.querySelector('.time-end-datepicker');
const timeEndButton = document.querySelector('.time-end-button');

const usedSpan = document.querySelector('.used-days span');
const usedInput = document.querySelector('.used-input');
const usedInputButton = document.querySelector('.used-input-button');

const calculateButton = document.querySelector('.calculate-button');

var start;
var end;
let used = 0;
let datePieces = [];

// variables after calculation

const spanDaysInPeriod = document.querySelector('.calc__p-days-in-period span');
const spanYearsInPeriod = document.querySelector('.calc__p-years-in-period span');
const spanHalfsInPeriod = document.querySelector('.calc__p-halfs-in-period span');

const spanEveryYear = document.querySelector('.calc__p-every-year span');

const AddBadCond = document.querySelector('.calc__p-add-bad-cond');
const spanAddBadCond = document.querySelector('.calc__p-add-bad-cond span');
const spanAddTime = document.querySelector('.calc__p-add-time span');
const spanTotalVacation = document.querySelector('.calc__p-total-vacation span');

// get dates section

timeStartButton.onclick = function() {
  timeStartSpan.textContent = timeStartDatepicker.value;
  start = convertFromStringToDate(timeStartDatepicker.value);
};

timeEndButton.onclick = function() {
  timeEndSpan.innerText = timeEndDatepicker.value;
  end = convertFromStringToDate(timeEndDatepicker.value);
};

usedInputButton.onclick = function() {
  used = usedInput.value;
  usedSpan.innerText = usedInput.value;
  console.log(used);
}



function convertFromStringToDate(responseDate) {
  datePieces = responseDate.split('-');

  return(new Date(datePieces[0], (datePieces[1] - 1), datePieces[2]))
}


// date picker on jQuery
/* 
  jQuery('#datetimepicker').datetimepicker();
*/


// checkbox

const checkbox = document.querySelector('.checkbox');
console.log(checkbox.checked);

if ("onpropertychange" in checkbox) {
  // old IE
  checkbox.onpropertychange = function() {
    if (event.propertyName == "checked") {
      /* spanAddBadCond.textContent = "--"; */
      /* AddBadCond.style.display = "none"; */
    }
  };
} else {
  // other browsers
  checkbox.onchange = function() {
    /* AddBadCond.style.display = "block"; */
  };
}


// calculate

calculateButton.onclick = calculateVacation;

function calculateVacation() {
  console.log(`Starting calculation...`);
  console.log(end);
  console.log(start);

  const difference = end - start;
  const totalDays = Math.floor(difference / (1000 * 3600 * 24));
  const fullYears = Math.floor(totalDays / 365);
  const halfYears = totalDays / 365 * 2;

  // якщо в проміжку цього часу є 1 високосний рік - 
  // то до чогось (не до totalDays, там враховано) 
  // потрібно додати +1 день

  console.log(`Кількість днів в періоді: ${totalDays}`);
  console.log(`Повних років: ${fullYears}`);
  console.log(`Півріч: ${halfYears}`);

  let vacations = ['everyYear', 'addBadcond', 'addTime'];


  // v.1.0
  console.log('');

  let everyYear = Math.round(totalDays / 365 * 24);
  console.log(`Щорічна відпустка: ${everyYear} днів`);


  let addBadcond = Math.floor(halfYears * 1); // every half of year - receives 1 day of vacation
  console.log(`Відпустка за шкідливі умови праці: ${addBadcond} днів`);

  let addTime = 0;

  // i < (totalDays + 1 + 1) / 365; // +1 is for last day of the year
  for (let i = 0; i < halfYears; i++) {
    if (i >= 5 && i < 9) {
      addTime += 1;
    } else if (i >= 9) {
      addTime += 2;
    }
  }

  console.log(`Відпустка за вислугу років: ${addTime} днів`);
  console.log(`Використано відпустки: ${used} days`);
  console.log('');


  let vacationTotal = checkbox.checked
    ? everyYear + addBadcond + addTime - used
    : everyYear + addTime - used;

  console.log(`ВСЬОГО ВІДПУСТКИ: ${vacationTotal} days`);

  spanDaysInPeriod.textContent = totalDays;
  spanYearsInPeriod.textContent = fullYears;
  spanHalfsInPeriod.textContent = halfYears;

  spanEveryYear.textContent = everyYear;
  spanAddBadCond.textContent = addBadcond;
  spanAddTime.textContent = addTime;
  spanTotalVacation.textContent = vacationTotal;
}

// vysokosnyi

/* let vysokosnyi = false;
if (end.getFullYear() === 2020) {
  vysokosnyi = true;
} */

/* const vysokosni = [2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040];

let vysokosnyi = 0;
if (end.getFullYear() === 2020) {
  vysokosnyi += 1;
}

console.log(vysokosnyi); */

// how to find first previos vysokosnyi

/* 
let now = new Date();
let date = new Date(now.getFullYear(), 2, 0);

for (now.getFullYear(), , year--) {
  if (date.getDate() == 29) {
    console.log("Високосный год!");
  }
}
*/

// FEATURED UPGRADES

// v.1.1 - graphics/background
// usage of for with amount of days


// v.1.2 - with panels/music/background change


// v.2.0
// usage of moment.js: https://momentjs.com/
