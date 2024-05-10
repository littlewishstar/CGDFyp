#pragma strict


public class attack extends skill{

var hurt : int  = 0;

	
public function attack(){ // constructer for extends
	needHurtCal=true;
	haveFunction=false;
	chooseTeamate = false;
}
public function attack(a: person){ // contructer
	setUser(a);
	//needHurtCal=true;
}
public function PhyHurt(): int{ // return Physical hurt 
	return (at.physicalDamage()-de.physicalDef());
}
public function damage(): int{
	if(hurt>0){
		return hurt;
	}
	return 1;
}


function Start () {

}

function Update () {

}


}