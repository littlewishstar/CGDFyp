#pragma strict


public class hugeFireExplosion extends magic{ // no special bonus attack
	public function hugeFireExplosion(a:person){
		setUser(a);
		isRepeatedlyScan =true;
		placeChoose =true;
		needChoose=false;
		skillRange = 5;
		secondRange = 4;
		// SecondToZ = 0; // in fact is no need to set , but write down it as being reminder 
		needScan=true;
		
		skill_name = "hugeFireExplosion";
		small_SkillType[3] = true;
	}
	public function action(){
		hurt=MagHurt()*2;
	}
	
function Start () {

}

function Update () {

}

}

