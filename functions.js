let flagRedText = false;

function startStopwatch() {
  let startTime = Date.now();

  function updateStopwatch() {
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;

		if (seconds >= 40 && flagRedText == false) {
			flagRedText = true;

      stopWatchContainer.style.color = "red";

      ////Изменения значений для кол-во звонков в ДЕНЬ
      // Получаем текущее значение
      let сurrentInputCallCounterDay =
        parseInt(inputCallCounterDay.value, 10) || 0;

      // Прибавляем к текущему значению
      let newСurrentInputCallCounterDay = сurrentInputCallCounterDay + 1;

      // Устанавливаем новое значение
      inputCallCounterDay.value = newСurrentInputCallCounterDay;

			if (inputCallCounterDay.value >= 10) {
        inputCallCounterDay.style.color = "#efd88a";
        inputCallCounterDay.style.borderColor = "#ffd139";
      }

      if (inputCallCounterDay.value >= 30) {
        inputCallCounterDay.style.color = "#4cc75e";
        inputCallCounterDay.style.borderColor = "#4cc75e";
      }
      ////Изменения значений для кол-во звонков в ДЕНЬ

      ////Изменения значений для кол-во звонков в МЕСЯЦ
      // Получаем текущее значение
      let сurrentInputCallCounterMonth =
        parseInt(inputCallCounterMonth.value, 10) || 0;

      // Прибавляем к текущему значению
      let newСurrentInputCallCounterMonth = сurrentInputCallCounterMonth + 1;

      // Устанавливаем новое значение
      inputCallCounterMonth.value = newСurrentInputCallCounterMonth;

			if (textCallCounterLack.innerText >= 0) {
        inputCallCounterMonth.style.color = "#4cc75e";
        inputCallCounterMonth.style.borderColor = "#4cc75e";
      }

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
      ////Изменения значений для кол-во звонков в день

			localStorage.setItem('inputCallCounterValue', inputCallCounterMonth.value);
			localStorage.setItem('inputCallCounterDayValue', inputCallCounterDay.value);
    }

    stopWatchContainer.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${milliseconds < 100 ? "0" : ""}${milliseconds}`;
  }

  // Обновляем секундомер каждую миллисекунду
  let intervalId = setInterval(updateStopwatch, 1);

  // Возвращаем функцию для остановки секундомера
  return function stopStopwatch() {
    clearInterval(intervalId);
  };
}

/////// Ожидание появления селектора
function waitForSelector(workFunction, selector) {
  // Передаваемый элемент
  const targetElement = document.querySelector(selector);

  if (targetElement) {
    workFunction();
  } else {
    // Создаем экземпляр MutationObserver с колбэком, который будет вызываться при изменениях
    const observer = new MutationObserver((mutationsList, observer) => {
      // Проверяем, есть ли сейчас элементы, соответствующие вашему селектору
      const targetElementNow = document.querySelector(selector);

      if (targetElementNow) {
        // Если элемент найден, останавливаем отслеживание и запускаем скрипт
        observer.disconnect();
        workFunction();
      }
    });

    // Начинаем отслеживание изменений в корне документа и его потомках
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
}
/////// Ожидание появления селектора

/////// Функция для сохранения данных в localStorage
function saveData() {
  localStorage.setItem('inputCallMonthValue', inputCallMonth.value);
  localStorage.setItem('inputCallCounterValue', inputCallCounterMonth.value);
	localStorage.setItem('inputCallCounterDayValue', inputCallCounterDay.value);
	localStorage.setItem('inputCountWorkDaysValue', inputCountWorkDays.value);
	localStorage.setItem('inputCountWorkDaysPassedValue', inputCountWorkDaysPassed.value);
}
/////// Функция для сохранения данных в localStorage

/////// Функция для загрузки данных из localStorage
function loadData() {
  const inputCallMonthValue = localStorage.getItem('inputCallMonthValue');
  const inputCallCounterValue = localStorage.getItem('inputCallCounterValue');
	const inputCallCounterDayValue = localStorage.getItem('inputCallCounterDayValue');
	const inputCountWorkDaysValue = localStorage.getItem('inputCountWorkDaysValue');
	const inputCountWorkDaysPassedValue = localStorage.getItem('inputCountWorkDaysPassedValue');

  // Проверяем, есть ли сохраненные значения
  if (inputCallMonthValue !== null) {
    inputCallMonth.value = inputCallMonthValue;
  }

  if (inputCallCounterValue !== null) {
    inputCallCounterMonth.value = inputCallCounterValue;
  }

	if (inputCallCounterDayValue !== null) {
    inputCallCounterDay.value = inputCallCounterDayValue;
  }

	if (inputCountWorkDaysValue !== null) {
    inputCountWorkDays.value = inputCountWorkDaysValue;
  }

	if (inputCountWorkDaysPassedValue !== null) {
    inputCountWorkDaysPassed.value = inputCountWorkDaysPassedValue;
  }
}
/////// Функция для загрузки данных из localStorage


/////// Функция для проверки ввода только цифр
function validateInput(event) {
  const inputElement = event.target;
  const inputValue = inputElement.value;

  // Фильтруем только цифры
  const filteredValue = inputValue.replace(/[^0-9]/g, '');

  // Обновляем значение поля
  inputElement.value = filteredValue;
}
/////// Функция для проверки ввода только цифр


/////// Функция для получения текущей даты в формате "год-месяц-день"
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
/////// Функция для получения текущей даты в формате "год-месяц-день"


/////// Функция для проверки, произошло ли изменение дня
function checkNewDay() {
  const currentDate = getCurrentDate();
  const lastLoadedDate = localStorage.getItem('lastLoadedDate');

  // Если день отличается от последней подгрузки, выполняем действия
  if (currentDate !== lastLoadedDate) {
    localStorage.setItem('lastLoadedDate', currentDate);
    doSomethingOnNewDay();
  }
}
/////// Функция для проверки, произошло ли изменение дня


/////// Отображения календаря
function showCalendar() {
	calendarDiv.style.display = 'block';
	renderCalendar();
}

function hideCalendar() {
	calendarDiv.style.display = 'none';
}

function renderCalendar() {
	const currentDate = new Date();
	const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

	let calendarHTML = '<table>';
	for (let i = 1; i <= daysInMonth; i++) {
			calendarHTML += `<tr><td>${i}</td></tr>`;
	}
	calendarHTML += '</table>';

	calendarDiv.innerHTML = calendarHTML;
}
/////// Отображения календаря
