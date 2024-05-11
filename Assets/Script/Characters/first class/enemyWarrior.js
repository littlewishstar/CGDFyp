#pragma strict

public class enemyWarrior extends person{
	function Start () {

	}

	function Update () {

	}
	public function enemyWarrior(){		
		id = 10;
		myName = "enemyWarrior";
		star = 5;
		sp = 65;
		hp = 2300;
		fullHp = hp;
		step = 3;
		pa = 650;
		pd=390;
		ma=0;
		md=90;
		job=0;
		
		setModel(Resources.Load("Prefabs/Characters/CD2") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/e1"));
		
		skill_List.Add(new addSelfPhyDam(this));
		skill_List.Add(new simpleKnockBack(this));
		skill_List.Add(new roundAttack(this));
		skill_List.Add(new protectSomeone(this));
	}
}