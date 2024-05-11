#pragma strict


public class basicAttack extends attack{ // no special bonus attack
	public function basicAttack(a:person){
		setUser(a);
		skill_name = "basic Attack";
	}
	public function action(){
		hurt=PhyHurt();
		at.ourAnimationPlay(3);	// animation play
	}
	
function Start () {

}

function Update () {

}

}

