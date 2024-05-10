#pragma strict


public class basicAttack extends attack{ // no special bonus attack
	public function basicAttack(a:person){
		setUser(a);
	}
	public function action(){
		hurt=PhyHurt();
	}
	
function Start () {

}

function Update () {

}

}

