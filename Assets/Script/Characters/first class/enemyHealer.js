#pragma strict

public class enemyHealer extends person{
	function Start () {

	}

	function Update () {

	}
	public function enemyHealer(){	
		id = 13;
		myName = "enemyHealer";
		star = 5;
		sp = 45;
		hp = 1800;
		fullHp = hp;
		step = 2;
		pa = 100;
		pd=250;
		ma=800;
		md=350;
		job=3;
		
		setModel(Resources.Load("Prefabs/Characters/CB2") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/e4"));
		
		skill_List.Add(new slowDownSomeone(this));
		skill_List.Add(new addPhyDam(this));
		skill_List.Add(new twoWayHeal(this));
		skill_List.Add(new autoHeal(this));
	}
	
}