#pragma strict


public class magicLongAttack extends magic{ // no special bonus attack
	public function magicLongAttack(a:person){
		setUser(a);
		ToZ = 2;
		skillRange = 5;
	}
	public function action(){
		hurt=MagHurt();
	}
	
function Start () {

}

function Update () {

}

}

