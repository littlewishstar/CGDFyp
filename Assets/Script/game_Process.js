#pragma strict
import System.Collections.Generic;

var sizeX:int =8;
var sizeY:int=13;
var persons:person[] = new person[8];
var person:GameObject;
var box:GameObject;
var pstep:int=0;
var map : plane[,] = new plane[sizeX,sizeY];
var currentplayer:int=0;
public static var instance:game_Process;
//var targetX : int=0;
//var targetY : int=0;
private var mytarget : plane ;
private var targetPos : Vector3 ;
var startWalk : boolean = false;
var stepList : Aset[];

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
		var y:int = persons[currentplayer].GetComponent.<person>().locateY;
		var x:int = persons[currentplayer].GetComponent.<person>().locateX;
		pstep=persons[currentplayer].GetComponent.<person>().step;
		treeRecursive(x,y,pstep);
}

function reset(){
	for(var j:int=0;j<sizeY;j++)
		for(var i:int=0;i<sizeX;i++)
			map[i,j].GetComponent.<plane>().setcanSelect(false);
				pstep=0;
}

function astar(lx:int , ly:int ):Aset[]{
	var open: List.<Aset> = new List.<Aset>();
	var close:List.<Aset> = new List.<Aset>();
	var fin:List.<Aset> = new List.<Aset>();
	var tool1: Aset = new Aset();
	tool1.setUp(5,4);
	open.Add(tool1);
		do{
			if((open[0].y-1>=0) /*&&OKBoard[open.get(0).x][open.get(0).y-1]==true*/){
				var tool2:Aset = new Aset();
				tool2.setUp(open[0].x,open[0].y-1);
				var same:boolean=false;
				for(var i:int =0;i<close.Count;i++){
					if(close[i].x==tool2.x &&close[i].y==tool2.y)
						same=true;
				}
				if(same==false){
					tool2.Gval(open[0].x,open[0].y);
					tool2.Hval(lx, ly);
					open.Add(tool2);
					tool2.setprev(open[0]);
				}
			}
			if((open[0].y+1<=sizeY-1) /*&&OKBoard[open.get(0).x][open.get(0).y+1]==true*/){
				var tool3:Aset = new Aset();
				tool3.setUp(open[0].x,open[0].y+1);
				same=false;
				for(i=0;i<close.Count;i++){
					if(close[i].x==tool3.x &&close[i].y==tool3.y)
						same=true;
				}
				if(same==false){
					tool3.Gval(open[0].x,open[0].y);
					tool3.Hval(lx, ly);
					open.Add(tool3);
					tool3.setprev(open[0]);
				}
			}
			if((open[0].x-1>=0) /*&&OKBoard[open.get(0).x][open.get(0).y+1]==true*/){
				var tool4:Aset = new Aset();
				tool4.setUp(open[0].x-1,open[0].y);
				same = false;
				for( i=0;i<close.Count;i++){
					if(close[i].x==tool4.x &&close[i].y==tool4.y)
						same=true;
				}
				if(same==false){
					tool4.Gval(open[0].x,open[0].y);
					tool4.Hval(lx, ly);
					open.Add(tool4);
					tool4.setprev(open[0]);
				}
			}
			if((open[0].x+1<=map.length-1) /*&&OKBoard[open.get(0).x][open.get(0).y+1]==true*/){
				var tool5:Aset = new Aset();
				tool5.setUp(open[0].x+1,open[0].y);
				same=false;
				for( i=0;i<close.Count;i++){
					if(close[i].x==tool5.x &&close[i].y==tool5.y)
						same=true;
				}
				if(same==false){
					tool5.Gval(open[0].x,open[0].y);
					tool5.Hval(lx, ly);
					open.Add(tool5);
					tool5.setprev(open[0]);
				}
			}
			close.Add(open[0]);
			open.Remove(open[0]);
			for( i =1;i<open.Count;i++){
				for(var in2:int =i;in2>0;in2--){
					if( open[in2].getF() < open[in2-1].getF() ){
						var tmp:Aset =open[in2];
						open[in2]=open[in2-1];
						open[in2-1]= tmp;
					}
					else
						break;
				}
			}
		}while(open[0].x!=lx || open[0].y!=ly);
		var tool:Aset =open[0];
		while(tool3.prev!=null){
			fin.Add(tool);
			tool=tool.prev;
		}
		var fin2:Aset[] =new Aset[fin.Count];
		for( i =0;i<fin2.length;i++){
			fin2[fin.Count-i-1]=fin[i];
		}
		return fin2;
}