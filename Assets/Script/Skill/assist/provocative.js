#pragma strict


public class provocative extends assist{ // provocative means let somebody angry
	public function provocative(a:person){
		setUser(a);
		attackTeamate=false;
		skillRange = 5;
		
		skill_name = "provocative";
		small_SkillType[1] = true;
	}
	public function functions(){
		de.mustTarget = at.getId();
		
		var pr : GameObject = at.getModel();
		var provo : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Group 1/provocative"), pr.transform.position, pr.transform.rotation);
		GameObject.Destroy(provo, 5);
		var afterProvo:GameObject;		
		afterProvo=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/Afterprovocative"), de.model.transform.position, de.model.transform.rotation);
		afterProvo.transform.SetParent(de.model.transform);
	}	
function Start () {

}

function Update () {

}

}

