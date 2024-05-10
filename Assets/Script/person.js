#pragma strict
public var id:int;
public var step:int=4;
public var position:Vector2; //use vector2 instead of locX locY , I think better
var incontrol : boolean=false;
var controller: GameObject;
function Start () {
controller=GameObject.Find("Main Game Controller");
incontrol=false;
}

function Update () {

}
function setlocation(x:int,y:int){
	position.x=x;
	position.y=y;
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