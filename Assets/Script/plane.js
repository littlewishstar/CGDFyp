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
var gn:int=0;
var hn:int=0;
var fn:int=0;
var posX:int=-1;
var posY:int=-1;

function Start () {
	canStand=true;
	renderer.material = XSelect;
	//findneighbors();
	status.Add(new inside("person",false));
	status.Add(new inside("ice",false));
	status.Add(new inside("stone",false));
	status.Add(new inside("fire",false));
	status.Add(new inside("nearfire",false));
	status.Add(new inside("nearice",false));
}

public class inside {
	public var whatsin:String;
	public var ishere:boolean;
	public function inside(a:String , b:boolean){
		whatsin=a;
		ishere=b;
	}
}

function getF(originPlane:plane , toPlane:plane):int{
	gn= parseInt(Vector3.Distance(originPlane.transform.position,transform.position));
	hn= parseInt(Vector3.Distance(transform.position,toPlane.transform.position));
	fn=gn+hn;
	return fn;
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
	posX=x;
	posY=y;
}

function Update () {
/*	if(status[0].ishere==true || status[1].ishere==true || status[2].ishere==true)
		canStand=false;
	else
		canStand=true;*/
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
		//transform.parent.SendMessage("walk",gameObject.GetComponent.<plane>());
		//transform.parent.SendMessage("walk2",posX,posY);
		//transform.parent.SendMessage("walk2",this);
		
		if(transform.parent.GetComponent.<gameProcess>() != null){
			if(transform.parent.GetComponent.<gameProcess>().startWalk == true){
				//transform.parent.GetComponent.<gameProcess>().walk2(posX,posY);
				transform.parent.GetComponent.<gameProcess>().SendMessage("walk2",this);
			}
			if(transform.parent.GetComponent.<gameProcess>().startSkill == true){
				if(transform.parent.GetComponent.<gameProcess>().skillStage == 0){
					print("magic");
					transform.parent.GetComponent.<gameProcess>().usingSkill.setLand(posX, posY);
					transform.parent.GetComponent.<gameProcess>().skillStage = 1;
					transform.parent.GetComponent.<gameProcess>().SendMessage("useSkill2");
					//bs.setLand(x2, y2);
				}
			}
		}
		else if(transform.parent.GetComponent.<MultipleGameProcess>() != null){
			if(transform.parent.GetComponent.<MultipleGameProcess>().startWalk == true){
				//transform.parent.GetComponent.<MultipleGameProcess>().walk2(posX,posY);
				transform.parent.GetComponent.<MultipleGameProcess>().SendMessage("walk2",this);
			}
			if(transform.parent.GetComponent.<MultipleGameProcess>().startSkill == true){
				if(transform.parent.GetComponent.<MultipleGameProcess>().skillStage == 0){
					print("magic");
					transform.parent.GetComponent.<MultipleGameProcess>().usingSkill.setLand(posX, posY);
					transform.parent.GetComponent.<MultipleGameProcess>().skillStage = 1;
					transform.parent.GetComponent.<MultipleGameProcess>().SendMessage("useSkill2");
					//bs.setLand(x2, y2);
				}
			}
		}
		//transform.parent.GetComponent.<gameProcess>().walk2(posX,posY);
		//yield WaitForSeconds(0);
		//gameProcess.instance.walk2(posX,posY);
	}
}

function setcanSelect(a:boolean){
	//yield WaitForSeconds(0.000001);
	canSelect=a;
	//print(canSelect);
	//if(canStand==true){
		if(canSelect==true){
			yield WaitForSeconds(0);
			//renderer.material.color = Color.green;
			renderer.material = noSelect;
						
			//print("changed");
			}
		else{
			//print("OH no!"+gridPosition);
			renderer.material = XSelect;
		}
	//}
}