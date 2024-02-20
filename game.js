var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;





function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}
	 if (event.keyCode == 32) {
        var player = document.getElementById('player');
        player.classList.add('fire');
      
      var arrow = document.createElement('div');
      arrow.classList= 'arrow' + lastPressed;
      document.body.appendChild(arrow)
      arrow.style.left=player.offsetLeft +'px';
      arrow.style.top=player.offsetTop + 15 +'px';
      }

	
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;

	if (downPressed == true) {
		var newTop = positionTop + 1;

		player.className = 'character walk down';

		var element = document.elementFromPoint(positionLeft, newTop + 46);

		if (element.classList.contains('cactus') == false) {
			player.style.top = newTop + 'px';
		}
	}

	if (upPressed == true) {
		var newTop = positionTop - 1;

		player.className = 'character walk up';

		var element = document.elementFromPoint(positionLeft, newTop);

		if (element.classList.contains('cactus') == false) {
			player.style.top = newTop + 'px';
		}
	}


	if (leftPressed == true) {
		var newLeft = positionLeft - 1;

		player.className = 'character walk left';

		var element = document.elementFromPoint(newLeft, player.offsetTop);

		if (element.classList.contains('cactus') == false) {
			player.style.left = newLeft + 'px';
		}
	}

	if (rightPressed == true) {
		var newLeft = positionLeft + 1;

		player.className = 'character walk right';

		var element = document.elementFromPoint(newLeft + 32, player.offsetTop);

		if (element.classList.contains('cactus') == false) {
			player.style.left = newLeft + 'px';
		}
	}
}

function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}


function myLoadFunction() {


	var start = document.getElementById('start');
	start.addEventListener('click', startgame);

	setupLives();
}

/**
 * 
 */

function setupLives() {
	lives = defaultLives;
	var ul = document.getElementsByClassName('health')[0];

	ul.innerHTML = '';

	for (let index = 0; index < lives; index ++) {
		createLives();
	}
}






function startgame() {
	var start = document.getElementById('start');
	start.style.display = 'none'

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);

	positiontank();
	setInterval(positiontank, 3000);

	var player = document.getElementById('player');

	player.style.top = '200px';
	player.style.left = '200px';
	var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
	
}

function positiontank() {
	var tanks = document.getElementsByClassName('tank');
	for (var i = 0; i < tanks.length; i++) {
		var random = Math.ceil(Math.random() * 100);
		tanks[i].style.top = random + 'vh';

		var bomb = document.createElement('div');
		bomb.classList = 'bomb';
		bomb.style.top = tanks[i].offsetTop + 'px';
		bomb.style.left = tanks[i].offsetLeft + 'px';
		document.body.appendChild(bomb);

		movebomb(bomb);
	}
}

function movebomb(bomb) {
    var leftpos = bomb.offsetLeft;
    var randomposition = Math.ceil(Math.random() * window.innerWidth);
    console.log(randomposition);
    var speed = Math.ceil(Math.random() * 25);

    var interval = setInterval(function() {
        leftpos = leftpos - 1;

        if (leftpos > randomposition) {
            bomb.style.left = leftpos + 'px';
        } else {
            bomb.classList = 'explosion';
            setTimeout(function() {
                bomb.parentNode.removeChild(bomb);
            }, 3000);

            clearInterval(interval);
        }
    }, speed);

	

	var player = document.getElementById('player'); 
	var check = colliding(player.offsetLeft, player.offsetTop,'explosion');
	if(check==true) {
		gameOver();
	}
	
	function colliding(left,top,clss){
		var element = document.elementFromPoint(left,top);
	
		if(element.classList.contains(clss)){
			return true;
		}
	}
	
	function gameOver() {
		var startbutton = document.getElementsByClassName('start')[0];
		startbutton.style.display = 'block';
		startbutton.firstChild.nodeValue = 'Try Again';
	
		upPressed = true;
		downPressed = true;
		leftPressed = true;
		rightPressed = true;
		lastPressed = true;
	
		clearInterval(timeout);
		document.removeEventListener('keydown', keydown);
		document.removeEventListener('keyup', keyup);
	
		var player = document.getElementById('player');
		player.classList = 'character stand down dead';
	
		var bttn = document.getElementsByClassName('start')[0];
		bttn.style.display = 'block';
		bttn.firstChild.nodeValue = 'Try Again';
	
		
		var textBox = document.getElementById('playerTextBox');
        if (!textBox) {
            textBox = document.createElement('input');
            textBox.id = 'playerTextBox';
            textBox.type = 'text';
            textBox.placeholder = 'Enter your name';
            player.appendChild(textBox);}
	}
	function moveArrow(arrow){
        var left = arrow.offsetLeft;

        setInterval(function(){
          left++;
          arrow.style.left = left+ 'px';
          if (collision(arrow, 'bomb')){
          }
        },10);
      }
}



document.addEventListener('DOMContentLoaded', myLoadFunction);