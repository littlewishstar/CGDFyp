#pragma strict

public class Magician {

public static function getSkill(i:int,pr:person):skill{
	//slowDownSomeone();
	//twoWayHeal();
	//addPhyDam();
	//autoHeal();
	if(i==0)
		return new downPhyDam(pr);
	else if(i==1)
		return new magicLongAttack(pr);
	else if(i==2)
		return new thunderLink(pr);
	else if(i==3)
		return new hugeFireExplosion(pr);
	return null;
}


function Start () {

}

function Update () {

}


}