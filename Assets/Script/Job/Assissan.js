#pragma strict

public class Assissan {

public static function getSkill(i:int,pr:person):skill{
	//slowDownSomeone();
	//twoWayHeal();
	//addPhyDam();
	//autoHeal();
	if(i==0)
		return new doubleTimeAttack(pr);
	else if(i==1)
		return new poison(pr);
	else if(i==2)
		return new hide(pr);
	else if(i==3)
		return new highRoundAttack(pr);
	return null;
}


function Start () {

}

function Update () {

}


}