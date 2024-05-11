#pragma strict


public class hugeFireExplosion extends magic{ // no special bonus attack
	public function hugeFireExplosion(a:person){
		setUser(a);
		isRepeatedlyScan =true;
		placeChoose =true;
		needChoose=false;
		skillRange = 5;
		secondRange = 4;
		attackTeamate=false;
		// SecondToZ = 0; // in fact is no need to set , but write down it as being reminder 
		needScan=true;
		
		skill_name = "hugeFireExplosion";
		small_SkillType[3] = true;
	}
	public function action(){
		hurt=MagHurt()*2;
		at.ourAnimationPlay(4);	// animation play
		
		
		var pr : GameObject = at.getModel();
		if(GameObject.Find("Bbigfire(Clone)") == null){
			var bigfire : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Group 1/Bbigfire"), new Vector3(targetY,0,targetX), pr.transform.rotation);
			GameObject.Destroy(bigfire,10);
		}
	}
	
function Start () {

}

function Update () {

}

}

