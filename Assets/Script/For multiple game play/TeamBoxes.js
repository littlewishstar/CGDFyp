#pragma strict

var myID :int;
var whoAmI: person;

function Start () {

}

function Update () {

}

public var personUI: UI.Button;

function changeIcon(){
	personUI = gameObject.GetComponent.<UI.Button>();
	personUI.image.overrideSprite = whoAmI.getIcon();
}

function changePerson(id:int){
	var chList : characterList = new characterList();
	whoAmI = chList.getCharacter(id);
	//print(chList.getCharacter(id));
	myID = whoAmI.getId();
	changeIcon();
}

function getPerson():person{
	return whoAmI;
}