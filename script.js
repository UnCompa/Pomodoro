window.onload = ()=>{
	//Timer
	let currentTime = 1;
	let seconds = 0;
	//Pomodoro 
	let workTime;
	let breakTime;
	let timesCompleted;
	let restTime;
	let cyclesGoal;
	let cyclesCompleted = 0;
	function timer(){
		if (currentTime > 0 || seconds > 0){
			if(seconds == 0){
				seconds = 59;
				currentTime--;
			} else {
				seconds--;
			}
			updateClock()
			console.log(currentTime,seconds)
			setTimeout(timer,1000);
		} else {
			pomodoroController();
			console.log("Completado");
		}
	}
function pomodoroController(){
	if (isRestTime()){
		cyclesCompleted++;
	if (!goalReached()) {
		currentTime = restTime;
		timer();
		timesCompleted = 0;
		} else {
			console.log("Pomodoro completado");
		}
		return;
	}
	if(timesCompleted % 2 == 0){
		currentTime = workTime;
		timesCompleted++;
		timer()
		console.log("Ha trabajar: " + timesCompleted + ", cycles:" + cyclesCompleted);
	} else {
		currentTime = breakTime;
		timesCompleted++;
		let snd = new Audio("./alarma.wav")
		snd.volume = 0.8;
		currentTime = 3;
		snd.play()
		timer();
		console.log("Empieza el break: " + timesCompleted + ", cycles:" + cyclesCompleted);
	}
}

function isRestTime() {
	return timesCompleted == 7;
}

function goalReached(){
	return cyclesGoal == cyclesCompleted;
}

//Front end -->
let clock = document.getElementById("clock");
let cyclesInput = document.getElementById("cycles-input");
let startButton = document.getElementById("start-button");
let workTimeInput = document.getElementById("work-time");
let breakTimeInput = document.getElementById("break-time");
let restTimeInput = document.getElementById("rest-time");

startButton.onclick = ()=>{
	variables();
	startPomodoro();
}
function startPomodoro(){
	console.log("Se inicio el pomodoro")
	pomodoroController();
}
function variables(){
	console.log("Variables sincronizadas");
	workTime = workTimeInput.value;
	breakTime = breakTimeInput.value;
	restTime = restTimeInput.value;
	cyclesGoal = cyclesInput.value;
	timesCompleted = 0;
}
/*Clock*/
let clockMinutes;
let clockSeconds;

function updateClock(){
	clockMinutes = formatNumbers(currentTime);
	clockSeconds = formatNumbers(seconds);
	clock.innerHTML = clockMinutes + ":" + clockSeconds;
}

function formatNumbers(time){
	let formatDigits;
	if (time < 10) {
		formatDigits = "0" + time;
	} else {
		formatDigits = time;
	}
	return formatDigits;
	}
}