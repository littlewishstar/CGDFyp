#pragma strict


public class poison extends assist{ // Poison 10 round hurt the person automatically
	public function poison(a:person){
		setUser(a);
	}
	public function functions(){
		de.isPoison=true;
		de.poisonHurt=(at.physicalDamage()-de.physicalDef())/10;
		de.poisonRound=10;
		GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/poisonVeiw.prefab", GameObject),de.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()));
	}	
function Start () {

}

function Update () {

}

}

