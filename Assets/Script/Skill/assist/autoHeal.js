#pragma strict


public class autoHeal extends assist{ 
	public function autoHeal(a:person){
		setUser(a);
		skillRange = 3;
		
		skill_name = "autoHeal";
	}
	public function functions(){
		at.ourAnimationPlay(5);	// animation play
		
		var pr : GameObject = de.getModel();
		var h:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/autoHeal1"), pr.transform.position, pr.transform.rotation);
		h.transform.SetParent(pr.transform);
		de.isAutoHeal=true;
		de.autoHealNum=at.magicalDamage()/5;
		de.autoHealRound=10;
	}	
function Start () {

}

function Update () {

}

}

