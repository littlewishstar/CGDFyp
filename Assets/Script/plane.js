#pragma strict
	import System.Collections.Generic;

public var selected : boolean = false;
public var gridPosition : Vector2 = Vector2.zero; //use vector2 instead of locX locY , I think better
var onSelect : Material;
var noSelect : Material;
var XSelect:Material;
var canSelect:boolean = false;
var canStand:boolean;
var movecost:int=1;
var neighbors:List.<plane> = new List.<plane>();
var status:List.<inside> = new List.<inside>();

function Start () {
	canStand=true;
	renderer.material = XSelect;
	findneighbors();
	status.Add(new inside("person",false));
	status.Add(new inside("fire",false));
	status.Add(new inside("ice",false));
	status.Add(new inside("stone",false));
	status.Add(new inside("nearfire",false));
	status.Add(new inside("nearice",false));
}

public class inside{
	public var whatsin:String;
	public var ishere:boolean;
	public function inside(a:String , b:boolean){
		whatsin=a;
		ishere=b;
	}
}
function updatePlane(th:int , here:boolean){
	status[th].ishere=here;
}
function findneighbors(){
	if(gridPosition.y>0){
		var up : Vector2 = new Vector2(gridPosition.x,gridPosition.y-1);
		neighbors.Add(game_Process.instance.map[parseInt(up.x),parseInt(up.y)]);
	}
	if(gridPosition.y<game_Process.instance.sizeY-1){
		var down : Vector2 = new Vector2(gridPosition.x,gridPosition.y+1);
		neighbors.Add(game_Process.instance.map[parseInt(down.x),parseInt(down.y)]);
	}
	if(gridPosition.x>0){
		var left : Vector2 = new Vector2(gridPosition.x-1,gridPosition.y);
		neighbors.Add(game_Process.instance.map[parseInt(left.x),parseInt(left.y)]);
	}
	if(gridPosition.x<game_Process.instance.sizeX-1){
		var right : Vector2 = new Vector2(gridPosition.x+1,gridPosition.y);
		neighbors.Add(game_Process.instance.map[parseInt(right.x),parseInt(right.y)]);
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
	else{
		canStand=canStand?false:true;
		flap();
		if(canStand==false){
			renderer.material.color=Color.red;
		}
	}
}
function flap(){
if(canStand==false)
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