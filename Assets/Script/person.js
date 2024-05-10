#pragma strict
public var id:int;
public var step:int=1;
public var locateX:int=5;
public var locateY:int=4;
var incontrol : boolean=false;
var controller: GameObject;
function Start () {
controller=GameObject.Find("Main Game Controller");
incontrol=false;
}

function Update () {

}
function setlocation(x:int,y:int){
	locateX=x;
	locateY=y;
}
function OnMouseDown(){
		//transform.parent.SendMessage("getTargetPlace",LocX,LocY);
		if(id==controller.GetComponent.<game_Process>().currentplayer){
		if(incontrol==false){
			controller.SendMessage("ShowWalk");
			incontrol=true;
		}
		else{
			controller.SendMessage("reset");
			incontrol=false;
		}
		}
}