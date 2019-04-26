var startValue = 0.0000001;
var maxWait = 777;
var $loButton = $('#double_your_btc_bet_lo_button'), $hiButton = $('#double_your_btc_bet_hi_button');

function client_seed() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 128; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
     var result = $('#next_client_seed').val(text);
	return result;
}

function reset(){
	$('#double_your_btc_stake').val(startValue);
}

function multiply(){
	var current = $('#double_your_btc_stake').val();
	var multiply = current * 2 + startValue;
	$('#double_your_btc_stake').val(multiply);
}

function getRandomWait(){
	var wait = Math.floor(Math.random() * maxWait ) + 100;
	console.log('Waiting for ' + wait + 'ms before next bet.');
	return wait ;
}

function startGame(){
	console.log('Game started!');
	$loButton.trigger('click');
}

$('#double_your_btc_bet_lose').unbind();
$('#double_your_btc_bet_win').unbind();
startGame();

$('#double_your_btc_bet_lose').bind("DOMSubtreeModified",function(event){
	if( $(event.currentTarget).is(':contains("lose")') ){
		console.log('You Lost');
		client_seed();
		multiply();
		setTimeout(function(){
			$loButton.trigger('click');
		}, getRandomWait());
	}
});

$('#double_your_btc_bet_win').bind("DOMSubtreeModified",function(event){
	if( $(event.currentTarget).is(':contains("win")') ){
		console.log('You Win');
		client_seed();
		reset();
		setTimeout(function(){
			$loButton.trigger('click');
		}, getRandomWait());
	}
});