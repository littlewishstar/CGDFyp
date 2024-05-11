#pragma strict


public class basicHeal extends heal{ // heal the people next with you
	public function basicHeal(a:person){
		setUser(a);
		
		skill_name = "basicHeal";
	}
	public function action(){
		cure = Heal();
		at.ourAnimationPlay(5);	// animation play
	}
	
function Start () {

}

function Update () {

}

}

