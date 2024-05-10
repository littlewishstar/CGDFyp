#pragma strict
import System.Collections.Generic;

var sizeX:int =8;
var sizeY:int=13;
var persons:person[] = new person[8];
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
var icepre:GameObject;
var sth : skill = new basicAttack(persons[0]);


function Awake(){
	instance=this;
}

function Start () {
	SetUpLocation();
	//print(board(0).transform.position.x);
	yield WaitForSeconds(0.0000001);
	Awake();
	var ice : GameObject=Instantiate(icepre, map[2,4].transform.position, Quaternion.Euler(new Vector3()));
		ice.renderer.material.color=Color.blue;
	map[2,4].status[1].ishere=true;
			firstchapter();
	for(var per:person in persons)
		map[per.gridPosition.x,per.gridPosition.y].status[0].ishere=true;
		
}
function updateTurn(){
	persons[currentplayer].incontrol=false;
		if(currentplayer<persons.length-1)
			currentplayer++;
		else
			currentplayer=0;
}

function Update () {

}

function askaction(){
	var haveWalk:boolean=false;
	var skillUsed:boolean=false;
	var endTurn:boolean=false;
	if(/*something like button clicked && */haveWalk==false){
		highlightplaneat(persons[currentplayer].gridPosition);
		haveWalk = true;
		// askaction after finish walking
	}
	if(/*something like button clicked && */ skillUsed==false){
		
	}
	if(/*something like button clicked && */ endTurn==false){
		updateTurn();
	}
}

function firstchapter(){ //insert chatacter
		var mywar : person = (GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/CD1.prefab", GameObject),map[4,2].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		mywar.person(0,"war 1",5,60,2300,3,650,390,0,90,0,1);
		mywar.setlocation(4,2);
		persons[0]=mywar;
		
		var enemywar : person = (GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/CD2.prefab", GameObject),map[2,10].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		enemywar.person(1,"war 2", 5,65,2300,3,650,390,0,90,0,2);
		enemywar.setlocation(2,10);
		persons[1]=enemywar;
		
		var myassissan : person = (GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/CA1.prefab", GameObject),map[3,2].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		myassissan.person(2,"assissan 1",5,80,1000,4,1000,150,50,300,1,1);
		myassissan.setlocation(3,2);
		persons[2]=myassissan;
		
		var enemyassissan : person = (GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/CA2.prefab", GameObject),map[4,10].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		enemyassissan.person(3,"assissan 2",5,75,1000,4,1000,150,50,300,1,2);
		enemyassissan.setlocation(4,10);
		persons[3]=enemyassissan;
		
		var mymagic : person = (GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/CC1.prefab", GameObject),map[4,1].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		mymagic.person(4,"magic 1",5,40,1400,2,100,200,1000,460,2,1);
		mymagic.setlocation(4,1);
		persons[4]=mymagic;
		
		var enemymagic : person = (GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/CC2.prefab", GameObject),map[3,11].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		enemymagic.person(5,"magic 2",5,45,1400,2,100,200,1000,460,2,2);
		enemymagic.setlocation(3,11);
		persons[5]=enemymagic;
		
		var myhealer : person = (GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/CB1.prefab", GameObject),map[3,1].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		myhealer.person(6,"healer 1",5,50,1800,2,100,250,800,350,3,1);
		myhealer.setlocation(3,1);
		persons[6]=myhealer;
		
		var enemyhealer : person = (GameObject.Instantiate( Resources.LoadAssetAtPath("Assets/GameObject(Create by Skin)/CB2.prefab", GameObject),map[1,11].transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
		enemyhealer.person(7,"healer 2",5,45,1800,2,100,250,800,350,3,2);
		enemyhealer.setlocation(1,11);
		persons[7]=enemyhealer;
}

function walk(target:plane){
	mytarget=target;
	startWalk=true;
	var tomiddleofplane:Vector3=new Vector3(0,persons[currentplayer].transform.localScale.y/2,0);
	var now:plane=map[persons[currentplayer].gridPosition.x,persons[currentplayer].gridPosition.y];
	now.status[0].ishere=false;
	if(startWalk==true){
		reset();
		for(var go:plane in PathFinder.FindPath(now,mytarget).listOfPlanes){
			persons[currentplayer].toPlace.Add(go);
		}
		targetPos=mytarget.transform.position;
		var count:int=0;
		while(persons[currentplayer].transform.position!=targetPos+tomiddleofplane){
		//	persons[currentplayer].transform.position=Vector3.Lerp(persons[currentplayer].transform.position,persons[currentplayer].toPlace[0].transform.position+Vector3(0,person.transform.localScale.y/2,0), Time.deltaTime);
			persons[currentplayer].transform.position = Vector3.MoveTowards(persons[currentplayer].transform.position, persons[currentplayer].toPlace[0].transform.position+tomiddleofplane, 5*Time.deltaTime);
			if(persons[currentplayer].transform.position==persons[currentplayer].toPlace[0].transform.position+tomiddleofplane){
				persons[currentplayer].toPlace.RemoveAt(0);
			}
			yield WaitForSeconds(0.01);
		}
	}
	startWalk=false;
	persons[currentplayer].setlocation(mytarget.gridPosition.x,mytarget.gridPosition.y);
	map[mytarget.gridPosition.x,mytarget.gridPosition.y].status[0].ishere=true;
	persons[currentplayer].setlocation(mytarget.gridPosition.x,mytarget.gridPosition.y);
	mytarget=null;
	updateTurn();  // will go to other place
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
			map[i,j].setcanSelect(false);

		}
	}
}

function highlightplaneat(originLocation:Vector2){   //still useless now, similar to treeRecursive
	var walkRange:List.<plane> = Highlights.FindHighlight(map[parseInt(originLocation.x),parseInt(originLocation.y)],persons[currentplayer].step);
	//var walkRange:List.<plane> = Highlights.FindHighlight(map[2,2],persons[currentplayer].step);
	//print(walkRange.Count);
	for(var t:plane in walkRange){
		t.setcanSelect(true);
	}
}
/*function treeRecursive(x:int,y:int,step:int){ // do the recursion to render which is OK in walk
		if(step>0){
				if((y-1>=0) ){
					//var other : plane = map[x,y-1].GetComponent(plane);
					map[x,y-1].setcanSelect(true);
					treeRecursive(x,y-1,step-1);
				}	
			
			if((y+1<=sizeY-1) ){
					//var other1 : plane = map[x,y+1].GetComponent(plane);
					map[x,y+1].setcanSelect(true);
					treeRecursive(x,y+1,step-1);
			}
			if((x-1>=0) ){
					//var other2 : plane = map[x-1,y].GetComponent(plane);
					map[x-1,y].setcanSelect(true);
					treeRecursive(x-1,y,step-1);
			}
			if((x+1<=sizeX-1) ){
					var other3 : plane = map[x+1,y].GetComponent(plane);
					map[x+1,y].setcanSelect(true);
					treeRecursive(x+1,y,step-1);
			}
		}
	}*/
function ShowWalk(){
		//treeRecursive(persons[currentplayer].position.x,persons[currentplayer].position.y,persons[currentplayer].step);
		highlightplaneat(persons[currentplayer].gridPosition);
}

function reset(){
	for(var j:int=0;j<sizeY;j++)
		for(var i:int=0;i<sizeX;i++)
			map[i,j].GetComponent.<plane>().setcanSelect(false);
}
