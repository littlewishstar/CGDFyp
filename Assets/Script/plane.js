#pragma strict
import System.Collections.Generic;

public var selected : boolean = false;
public var gridPosition : Vector2 = Vector2.zero;
var onSelect : Material;
var noSelect : Material;
var XSelect:Material;
var canSelect:boolean = false;
var LocX : int;
var LocY : int;
var canStand:boolean = false;
var neighbors:List.<plane> = new List.<plane>();

function Start () {
	//canSelect=false;	
	canStand=false;
	renderer.material = XSelect;
	findneighbors();
}
function findneighbors(){
	if(gridPosition.y>0){
		var up : Vector2 = new Vector2(gridPosition.x,gridPosition.y-1);
		neighbors.Add(game_Process.instance.map[up.x,up.y]);
	}
	if(gridPosition.y<game_Process.instance.sizeY-1){
		var down : Vector2 = new Vector2(gridPosition.x,gridPosition.y+1);
		neighbors.Add(game_Process.instance.map[down.x,down.y]);
	}
	if(gridPosition.x>0){
		var left : Vector2 = new Vector2(gridPosition.x-1,gridPosition.y);
		neighbors.Add(game_Process.instance.map[left.x,left.y]);
	}
	if(gridPosition.x<game_Process.instance.sizeX-1){
		var right : Vector2 = new Vector2(gridPosition.x+1,gridPosition.y);
		neighbors.Add(game_Process.instance.map[right.x,right.y]);
	}
}
function setUp(x:int,y:int){
	gridPosition.x=x;
	gridPosition.y=y;
}

function Update () {
}
function OnMouseEnter(){
//print("x: "+LocX + "  "+"y: "+LocY);
//print("x : " + gridPosition.x +  " y : " + gridPosition.y );
if(canSelect==true){
	selected = true;
	renderer.material = onSelect;
	}
}
function OnMouseExit(){
if(canSelect==true){
	selected = false;
	renderer.material = noSelect;
	}
}
function getcanStand() : boolean {
	return canStand;
}
function getcanSelect() : boolean {
	return canSelect;
}
function OnMouseDown(){
	if(canSelect==true){
		//transform.parent.SendMessage("getTargetPlace",LocX,LocY);
		transform.parent.SendMessage("getTargetPlace",gameObject.GetComponent.<plane>());
	}
}
function trySth(){
	canSelect=false;
}
function setcanSelect(a:boolean){
	//yield WaitForSeconds(0.000001);
	canSelect=a;
	if(canSelect==true)
	renderer.material = noSelect;
	else
	renderer.material = XSelect;
}