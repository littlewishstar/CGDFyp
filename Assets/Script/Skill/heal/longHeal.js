#pragma strict


public class longHeal extends heal{ // heal one people in the area
	public function longHeal(a:person){
		setUser(a);
		skillRange = 5;
		
		skill_name = "longHeal";
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

