#pragma strict
import System.Collections.Generic;

var sizeX:int =8;
var sizeY:int=13;
var persons:person[] = new person[8];
var person:GameObject;
var box:GameObject;
//var pstep:int=0;
var map : plane[,] = new plane[sizeX,sizeY];
var currentplayer:int=0;
public static var instance:game_Process;
//var targetX : int=0;
//var targetY : int=0;
private var mytarget : plane ;
private var targetPos : Vector3 ;
var startWalk : boolean = false;

function Awake(){
	instance=this;
}
function Start () {
	SetUpLocation();
	//print(board(0).transform.position.x);
	for(var x:int=0;x<persons.length;x++){
		var personx : person = (GameObject.Instantiate(person,map[x,x].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		persons[x]=personx;
		persons[x].setlocation(x,x);
		persons[x].id=x;
		//persons[x].transform.position=map[x,4].transform.position+Vector3(0,0.5,0);
	}
	Awake();
	//	print(open[0].GetComponent.<plane>().LocX);
}
function Update () {
	if(startWalk==true){
		reset();		
	//	for(var i: int =0;i<stepList.length;i++){
		//	targetPos = stepList[i].transform.position;
			targetPos = mytarget.transform.position;
			persons[currentplayer].transform.position = Vector3.MoveTowards(persons[currentplayer].transform.position, targetPos+Vector3(0,person.transform.localScale.y/2,0), 5*Time.deltaTime);
			if(persons[currentplayer].transform.position==targetPos+Vector3(0,persons[currentplayer].transform.localScale.y/2,0)){
				startWalk=false;
				persons[currentplayer].GetComponent.<person>().setlocation(mytarget.gridPosition.x,mytarget.gridPosition.y);
				mytarget=null;
				if(currentplayer<persons.length-1)
					currentplayer++;
				else
					currentplayer=0;
				//person.GetComponent.<person>().incontrol=false;
			}
		//}
	}
}

function SetUpLocation(){
	var lx:int = this.transform.position.x;
	var ly:int = this.transform.position.y;
	for(var j:int=0;j<sizeY;j++){
		for(var i:int =0;i<sizeX;i++){
			var newbox : plane = (GameObject.Instantiate(box, new Vector3(j,0, i), Quaternion.Euler(new Vector3()))).GetComponent.<plane>();
			map[i,j]=newbox;
			newbox.transform.position = this.transform.position + Vector3(j,0,i);
			newbox.transform.parent = this.transform;
			map[i,j].gridPosition = new Vector2(i,j);
			//map[i,j].GetComponent.<Aset>().setUp(i,j);
			map[i,j].setcanSelect(false);
		}
	}
}

/*function highlightplaneat(originLocation:Vector2){   //still useless now, similar to treeRecursive
	print("color");
	var walkRange:List.<plane> = Highlight.FindHighlight(map[originLocation.x,originLocation.y],persons[currentplayer].step);
	for(var t:plane in walkRange){
		print(t.gridPosition);
		t.setcanSelect(true);
	}
}*/
function treeRecursive(x:int,y:int,step:int){ // do the recursion to render which is OK in walk
		if(step>0){
				if((y-1>=0) /*&& map[x,y-1].GetComponent.<planeColor>().getcanSelect()==false*/){
					//var other : plane = map[x,y-1].GetComponent(plane);
					map[x,y-1].setcanSelect(true);
					treeRecursive(x,y-1,step-1);
				}	
			
			if((y+1<=sizeY-1) /*&& map[x,y+1].GetComponent.<planeColor>().getcanSelect()==false*/){
					//var other1 : plane = map[x,y+1].GetComponent(plane);
					map[x,y+1].setcanSelect(true);
					treeRecursive(x,y+1,step-1);
			}
			if((x-1>=0) /*&& map[x-1,y].GetComponent.<planeColor>().getcanSelect()==false*/){
					//var other2 : plane = map[x-1,y].GetComponent(plane);
					map[x-1,y].setcanSelect(true);
					treeRecursive(x-1,y,step-1);
			}
			if((x+1<=sizeX-1) /*&& map[x+1,y].GetComponent.<planeColor>().getcanSelect()==false*/){
					var other3 : plane = map[x+1,y].GetComponent(plane);
					map[x+1,y].setcanSelect(true);
					treeRecursive(x+1,y,step-1);
			}
		}
	}
function getTargetPlace(map:plane){
	mytarget=map;
	//stepList=astar(mytarget.gridPosition.x,mytarget.gridPosition.y);
	startWalk=true;
	
}
function ShowWalk(){
	//map[1,1].SendMessage("setcanSelect",true);
//		pstep=persons[currentplayer].GetComponent.<person>().step;
		treeRecursive(persons[currentplayer].position.x,persons[currentplayer].position.y,persons[currentplayer].step);
		//highlightplaneat(persons[currentplayer].position);
}

function reset(){
	for(var j:int=0;j<sizeY;j++)
		for(var i:int=0;i<sizeX;i++)
			map[i,j].GetComponent.<plane>().setcanSelect(false);
//				pstep=0;
}
