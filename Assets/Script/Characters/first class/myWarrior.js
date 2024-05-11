#pragma strict

public class myWarrior extends person{
	function Start () {

	}

	function Update () {

	}
	public function myWarrior(){	
		id = 0;
		myName = "myWarrior";
		star = 5;
		sp = 60;
		hp = 2300;
		fullHp = hp;
		step = 3;
		pa = 650;
		pd=390;
		ma=0;
		md=90;
		job=0;
		
		setModel(Resources.Load("Prefabs/Characters/warrior") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/warrior_icon"));
		
		skill_List.Add(new addSelfPhyDam(this));
		skill_List.Add(new simpleKnockBack(this));
		skill_List.Add(new roundAttack(this));
		skill_List.Add(new protectSomeone(this));
	}
	
}