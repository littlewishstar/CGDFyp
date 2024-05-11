#pragma strict


public class superAttack extends attack{ // no special bonus attack
	public function superAttack(a:person){
		setUser(a);
		
		skill_name = "superAttack";
	}
	public function action(){
		hurt=2*PhyHurt();
	}
	
function Start () {

}

function Update () {

}

}