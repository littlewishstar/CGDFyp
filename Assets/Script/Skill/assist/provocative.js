#pragma strict


public class provocative extends assist{ // provocative means let somebody angry
	public function provocative(a:person){
		setUser(a);
		
		skill_name = "provocative";
		small_SkillType[1] = true;
	}
	public function functions(){
		de.mustTarget = at.getId();
	}	
function Start () {

}

function Update () {

}

}

