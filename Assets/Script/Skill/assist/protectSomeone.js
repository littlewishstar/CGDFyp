#pragma strict


public class protectSomeone extends assist{ 
	public function protectSomeone(a:person){
		setUser(a);
		skillRange = 5;
		
		skill_name = "protectSome";
		small_SkillType[2] = true;
	}
	public function functions(){
		de.protectedHit = 1;
		de.protectedRound = 999;
		de.protector=at.getId();
		print(de.protector + " start protect "+de.getName());
		var pr : GameObject = de.getModel();
		var p:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/protect"), pr.transform.position + new Vector3(0, 1, 0), pr.transform.rotation);
		p.transform.SetParent(pr.transform);
	}	
function Start () {

}

function Update () {

}

}

