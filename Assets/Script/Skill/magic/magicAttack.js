#pragma strict


public class magicAttack extends magic{ // no special bonus attack
	public function magicAttack(a:person){
		setUser(a);
		
		skill_name = "magicAttack";
	}
	public function action(){
		hurt=MagHurt();
		at.ourAnimationPlay(4);	// animation play
	}
	
function Start () {

}

function Update () {

}

}

