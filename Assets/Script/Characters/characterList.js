#pragma strict

public class characterList{

function Start () {

}

function Update () {

}

function getCharacter(id:int):person{
	switch(id){
		case 0: return new myWarrior();
				break;
		case 1: return new myAssissan();
				break;
		case 2: return new myMagician();
				break;
		case 3: return new myHealer();
				break;
		case 4: return new enemyWarrior();
				break;
		case 5: return new enemyAssissan();
				break;
		case 6: return new enemyMagician();
				break;
		case 7: return new enemyHealer();
				break;
				
	}
}

}