#pragma strict

public class Warrior {

public static function getSkill(i:int,pr:person):skill{
	//slowDownSomeone();
	//twoWayHeal();
	//addPhyDam();
	//autoHeal();
	if(i==0)
		return new addSelfPhyDam(pr);
	else if(i==1)
		return new simpleKnockBack(pr);
	else if(i==2)
		return new roundAttack(pr);
	else if(i==3)
		return new protectSomeone(pr);
	return null;
}


function Start () {

}

function Update () {

}


}