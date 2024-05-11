#pragma strict

public class myMagician extends person{
	function Start () {

	}

	function Update () {

	}
	public function myMagician(){	
		id = 2;
		myName = "myMagician";
		star = 5;
		sp = 40;
		hp = 1400;
		fullHp = hp;
		step = 2;
		pa = 100;
		pd=200;
		ma=1000;
		md=460;
		job=2;
		
		setModel(Resources.Load("Prefabs/Characters/magic") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/magic_icon"));
		
		skill_List.Add(new downPhyDam(this));
		skill_List.Add(new magicLongAttack(this));
		skill_List.Add(new thunderLink(this));
		skill_List.Add(new hugeFireExplosion(this));
	}
	
}