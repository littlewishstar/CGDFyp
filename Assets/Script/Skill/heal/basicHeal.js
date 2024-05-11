#pragma strict


public class basicHeal extends heal{ // heal the people next with you
	public function basicHeal(a:person){
		setUser(a);
		
		skill_name = "basicHeal";
	}
	public function action(){
		cure = Heal();
	}
	
function Start () {

}

function Update () {

}

}

