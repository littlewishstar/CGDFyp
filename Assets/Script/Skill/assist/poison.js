#pragma strict


public class poison extends assist{ // Poison 10 round hurt the person automatically
	public function poison(a:person){
		setUser(a);
		autoRound_Hp = 10;
		
		skill_name = "poison";
		small_SkillType[6] = true;
	}
	public function functions(){
		de.isPoison=true;
		de.poisonHurt=(at.physicalDamage()-de.physicalDef())/10;
		de.poisonRound=autoRound_Hp;
		
		var pr : GameObject = at.getModel();
		var poison:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/keepposion"), de.model.transform.position, de.model.transform.rotation);
		poison.transform.SetParent(de.model.transform);
		//GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/poisonVeiw.prefab", GameObject),de.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()));
	}	
function Start () {

}

function Update () {

}

}

