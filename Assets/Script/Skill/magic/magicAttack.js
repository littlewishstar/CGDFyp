#pragma strict


public class magicAttack extends magic{ // no special bonus attack
	public function magicAttack(a:person){
		setUser(a);
	}
	public function action(){
		hurt=MagHurt();
	}
	
function Start () {

}

function Update () {

}

}

