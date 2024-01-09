let stopWatchContainer = document.createElement("div");
stopWatchContainer.classList.add("stop-watch-container");
stopWatchContainer.innerText = "0:00.00";

let stopStopwatch;

let callCounter = document.createElement('div');
callCounter.classList.add("container-calls-and-days");

//Контейнер звонков контейнер
let containerCallsOnly = document.createElement('div');
containerCallsOnly.classList.add("container-calls");
//Контейнер рабочих контейнер

//Кол-во звонков на сегодня
let textCallCounterDay = document.createElement('span');
textCallCounterDay.innerHTML = 'Кол-во звонков <br><b>за день:</b> ';
textCallCounterDay.classList.add("span-call-counter-day");

let inputCallCounterDay = document.createElement('input');
inputCallCounterDay.classList.add("input-call-counter-day");
//Кол-во звонков на сегодня
//Кол-во звонков за день НЕХВАТКА
let inscriptionCallCounterLackDay = document.createElement('span');
inscriptionCallCounterLackDay.innerText = 'Нехватка:';
inscriptionCallCounterLackDay.classList.add("span-inscription-counter-lack-day");

let textCallCounterLackDay = document.createElement('span');
textCallCounterLackDay.innerText = '-30';
textCallCounterLackDay.classList.add("span-call-counter-lack-day");
//Кол-во звонков за день НЕХВАТКА

//Кол-во звонков за месяц на данный момент ПЛАН
let textCallCounter = document.createElement('span');
textCallCounter.innerHTML = 'Кол-во звонков <br><b>за месяц:</b> ';
textCallCounter.classList.add("span-call-counter");

let inputCallCounterMonth = document.createElement('input');
inputCallCounterMonth.classList.add("input-call-counter");
//Кол-во звонков за месяц на данный момент ПЛАН

//Кол-во звонков НЕОБХОДИМОЕ за месяц 
let textCallMonth = document.createElement('span');
textCallMonth.innerHTML = 'План на месяц: ';
textCallMonth.classList.add("span-call-month");

let inputCallMonth = document.createElement('input');
inputCallMonth.classList.add("input-call-month");
//Кол-во звонков НЕОБХОДИМОЕ за месяц 
//Кол-во звонков за месяц НЕХВАТКА
let inscriptionCallCounterLack = document.createElement('span');
inscriptionCallCounterLack.innerText = 'Нехватка:';
inscriptionCallCounterLack.classList.add("span-inscription-counter-lack");

let textCallCounterLack = document.createElement('span');
textCallCounterLack.innerText = '0';
textCallCounterLack.classList.add("span-call-counter-lack");
//Кол-во звонков за месяц НЕХВАТКА

//Контейнер рабочих дней контейнер
let containerWorkDays = document.createElement('div');
containerWorkDays.classList.add("container-work-days");
//Контейнер рабочих дней контейнер

//Кол-во рабочих дней
let textCountWorkDays = document.createElement('span');
textCountWorkDays.innerHTML = 'Кол-во рабочих дней <br><b>всего:</b> ';
textCountWorkDays.classList.add("span-call-work-days");

let inputCountWorkDays = document.createElement('input');
inputCountWorkDays.classList.add("input-call-work-days");
//Кол-во рабочих дней
// Календарь
let calendarDiv = document.createElement("div"); // Fixed typo here
calendarDiv.innerText = 'pupupu'
calendarDiv.classList.add('calendar');
inputCountWorkDays.prepend(calendarDiv); // Fixed typo here
// Календарь

//Кол-во рабочих дней ПРОШЛО
let textCountWorkDaysPassed = document.createElement('span');
textCountWorkDaysPassed.innerHTML = 'Кол-во рабочих дней <br><b>прошло:</b> ';
textCountWorkDaysPassed.classList.add("span-call-work-days-passed");

let inputCountWorkDaysPassed = document.createElement('input');
inputCountWorkDaysPassed.classList.add("input-call-work-days-passed");
//Кол-во рабочих дней ПРОШЛО

// Вызываем функцию сохранения данных по кол-во звонков при изменении значений полей
inputCallMonth.addEventListener('change', saveData);
inputCallCounterMonth.addEventListener('change', saveData);
inputCallCounterDay.addEventListener('change', saveData);
inputCountWorkDays.addEventListener('change', saveData);
inputCountWorkDaysPassed.addEventListener('change', saveData);

// Назначаем обработчик события input для полей, ввод только цифр
inputCallMonth.addEventListener('input', validateInput);
inputCallCounterMonth.addEventListener('input', validateInput);
inputCallCounterDay.addEventListener('input', validateInput);
inputCountWorkDays.addEventListener('input', validateInput);
inputCountWorkDaysPassed.addEventListener('input', validateInput);

inputCountWorkDays.addEventListener('input', ()=>{
	inputCallMonth.value = (parseInt(inputCountWorkDays.value, 10) || 0)*30;
	localStorage.setItem('inputCallMonthValue', inputCallMonth.value);
});

inputCallCounterMonth.addEventListener('input', ()=>{
  if (inputCallCounterMonth !== null) {
    textCallCounterLack.innerText =
      inputCallCounterMonth.value - inputCountWorkDaysPassed.value * 30;
    if (textCallCounterLack.innerText >= 0) {
      textCallCounterLack.style.color = "#4cc75e";
      inscriptionCallCounterLack.innerText = "Избыток:";
			inscriptionCallCounterLack.style.color = "#4cc75e";
    }
    if (textCallCounterLack.innerText < 0) {
      textCallCounterLack.style.color = "#d3d3d3";
      inscriptionCallCounterLack.innerText = "Недостаток:";
			inscriptionCallCounterLack.style.color = "#d3d3d3";
    }
  }
});

inputCountWorkDaysPassed.addEventListener('input', ()=>{
  if (inputCallCounterMonth !== null) {
    textCallCounterLack.innerText =
      inputCallCounterMonth.value - inputCountWorkDaysPassed.value * 30;
    if (textCallCounterLack.innerText >= 0) {
      textCallCounterLack.style.color = "#4cc75e";
      inscriptionCallCounterLack.innerText = "Избыток:";
			inscriptionCallCounterLack.style.color = "#4cc75e";
    }
    if (textCallCounterLack.innerText < 0) {
      textCallCounterLack.style.color = "#d3d3d3";
      inscriptionCallCounterLack.innerText = "Недостаток:";
			inscriptionCallCounterLack.style.color = "#d3d3d3";
    }
		if (textCallCounterLack.innerText >= 0) {
			inputCallCounterMonth.style.color = "#4cc75e";
			inputCallCounterMonth.style.borderColor = "#4cc75e";
		} else {
			inputCallCounterMonth.style.color = "#d3d3d3";
			inputCallCounterMonth.style.borderColor = "#cbcbcb";
		}
	
  }
});

inputCallCounterDay.addEventListener('input', ()=>{
	if (inputCallCounterDay !== null) {
    textCallCounterLackDay.innerText =
			inputCallCounterDay.value - 30;
    if (textCallCounterLackDay.innerText >= 0) {
      textCallCounterLackDay.style.color = "#4cc75e";
      inscriptionCallCounterLackDay.innerText = "Избыток:";
			inscriptionCallCounterLackDay.style.color = "#4cc75e";
    }
    if (textCallCounterLackDay.innerText < 0) {
      textCallCounterLackDay.style.color = "#d3d3d3";
      inscriptionCallCounterLackDay.innerText = "Недостаток:";
			inscriptionCallCounterLackDay.style.color = "#d3d3d3";
    }
  }
});

waitForSelector(() => {
  // Подгружаем данные по кол-во звонков
  loadData();

  if (inputCallCounterMonth !== null) {
    textCallCounterLack.innerText =
      inputCallCounterMonth.value - inputCountWorkDaysPassed.value * 30;
    if (textCallCounterLack.innerText >= 0) {
      textCallCounterLack.style.color = "#4cc75e";
      inscriptionCallCounterLack.innerText = "Избыток:";
      inscriptionCallCounterLack.style.color = "#4cc75e";
    }
    if (textCallCounterLack.innerText < 0) {
      textCallCounterLack.style.color = "#d3d3d3";
      inscriptionCallCounterLack.innerText = "Недостаток:";
      inscriptionCallCounterLack.style.color = "#d3d3d3";
    }
  }

  if (inputCallCounterDay !== null) {
    textCallCounterLackDay.innerText = inputCallCounterDay.value - 30;
    if (textCallCounterLackDay.innerText >= 0) {
      textCallCounterLackDay.style.color = "#4cc75e";
      inscriptionCallCounterLackDay.innerText = "Избыток:";
      inscriptionCallCounterLackDay.style.color = "#4cc75e";
    }
    if (textCallCounterLackDay.innerText < 0) {
      textCallCounterLackDay.style.color = "#d3d3d3";
      inscriptionCallCounterLackDay.innerText = "Недостаток:";
      inscriptionCallCounterLackDay.style.color = "#d3d3d3";
    }
  }

  if (textCallCounterLack.innerText >= 0) {
    textCallCounterLack.style.color = "#4cc75e";
  }

  if (inputCallCounterDay.value >= 10) {
    inputCallCounterDay.style.color = "#efd88a";
    inputCallCounterDay.style.borderColor = "#efd88a";
  }

  if (inputCallCounterDay.value >= 30) {
    inputCallCounterDay.style.color = "#4cc75e";
    inputCallCounterDay.style.borderColor = "#4cc75e";
  }

  if (inputCallCounterMonth.value >= 630) {
    inputCallCounterMonth.style.color = "#4cc75e";
    inputCallCounterMonth.style.borderColor = "#4cc75e";
  }

  if (textCallCounterLack.innerText >= 0) {
    inputCallCounterMonth.style.color = "#4cc75e";
    inputCallCounterMonth.style.borderColor = "#4cc75e";
  }

  let iframe = document.querySelector("iframe");

  const root = document.createElement("div");
  const shadowRoot = root.attachShadow({ mode: "open" });

  const cssUrl = chrome.runtime.getURL("content-script.css");

  shadowRoot.innerHTML = `<link rel="stylesheet" href="${cssUrl}"></link>`;

  // Секундомер
  shadowRoot.prepend(stopWatchContainer);

  // Кол-во звонков и дни
  shadowRoot.prepend(callCounter);

  //Кол-во дней
  callCounter.prepend(containerWorkDays);

  //Кол-во звонков
  callCounter.prepend(containerCallsOnly);

  //Кол-во рабочих дней ПРОШЛО
  containerWorkDays.prepend(inputCountWorkDaysPassed);
  containerWorkDays.prepend(textCountWorkDaysPassed);
  //Кол-во рабочих дней ПРОШЛО

  //Кол-во рабочих дней
  containerWorkDays.prepend(inputCountWorkDays);
  containerWorkDays.prepend(textCountWorkDays);
  //Кол-во рабочих дней

  //Кол-во звонков за месяц на данный момент ПЛАН
  containerCallsOnly.prepend(inputCallMonth);
  containerCallsOnly.prepend(textCallMonth);
  //Кол-во звонков за месяц на данный момент ПЛАН

  //Кол-во звонков НЕОБХОДИМОЕ за месяц
  containerCallsOnly.prepend(inputCallCounterMonth);
  containerCallsOnly.prepend(textCallCounter);
  //Нехватка ЗВОНКОВ за месяц
  textCallCounter.after(textCallCounterLack);
  textCallCounterLack.before(inscriptionCallCounterLack);
  //Нехватка ЗВОНКОВ за месяц
  //Кол-во звонков НЕОБХОДИМОЕ за месяц

  //Кол-во звонков за ДЕНЬ на данный момент
  containerCallsOnly.prepend(inputCallCounterDay);
  containerCallsOnly.prepend(textCallCounterDay);
  //Нехватка ЗВОНКОВ за день
  textCallCounterDay.after(textCallCounterLackDay);
  textCallCounterLackDay.before(inscriptionCallCounterLackDay);
  //Нехватка ЗВОНКОВ за день
  //Кол-во звонков за ДЕНЬ на данный момент

  iframe.after(root);

  // Функция, которая будет вызываться при появлении сообщения в консоли
  function handleConsoleMessage(event) {
    // Получаем текст сообщения
    const message = event.data;

    if (message.type === "EstablishedCall") {
      stopStopwatch = startStopwatch();
    } else if (message.type === "CallEnd") {
      flagRedText = false;
      stopStopwatch();
      stopWatchContainer.innerText = "0:00.00";
      stopWatchContainer.style.color = "black";
    }
  }

  // Подписываемся на событие message окна
  window.addEventListener("message", handleConsoleMessage);

  // Добавляет фукнционал календаря
	inputCountWorkDays.addEventListener("focus", () => {
    console.log("Фокус на inputCountWorkDays");
    showCalendar();
  });

  inputCountWorkDays.addEventListener("blur", () => {
		console.log("Потеря фокуса на inputCountWorkDays");
    hideCalendar();
  });
  // Добавляет фукнционал календаря
}, "iframe");

// Обновления кол-ва звонков в день
checkNewDay();

// Функция для выполнения действий при изменении дня
function doSomethingOnNewDay() {
  // Ваш код, который нужно выполнить при изменении дня
  inputCallCounterDay.value = 0;
  localStorage.setItem("inputCallCounterDayValue", inputCallCounterDay.value);
}

