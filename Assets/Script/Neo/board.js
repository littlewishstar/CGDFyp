#pragma strict


public class board{

var box : box[,];
var boxNeighbors : List.<box> = new List.<box>();

public function board(x:int,y:int){
	box= new box[x,y];
	for(var i:int=0;i<x;i++){
		for(var j:int=0;j<y;j++){
			box[i,j]=new box();
			box[i,j].setLocation(i,j);
		}
	}
}

public function getBox(x:int,y:int):box{
	//System.out.println(box.length);
	return box[x,y];
}
public function getSizeX():int{
	return box.GetLength(0);
}
public function getSizeY():int{
	return box.GetLength(1);
}
public function setFire(x:int,y:int){
	for(var i:int=x-1;i<=x+1;i++){
		for(var j:int=y-1;j<=y+1;j++){
			if(i!=x || j!=y){
				print(i+" "+j+" "+"ok");
				box[i,j].setUpFunction(5);
			}
		}
	}
	box[x,y].setUpFunction(2);
	GameObject.Instantiate( Resources.Load("Prefabs/Obstacle/fireObject") as GameObject,box[x,y].thisPlane.transform.position+Vector3(0,0.1,0), Quaternion.Euler(new Vector3()));
}

public function setStone(x:int,y:int){
	box[x,y].setUpFunction(1);
	GameObject.Instantiate(Resources.Load("Prefabs/Obstacle/stone") as GameObject,box[x,y].thisPlane.transform.position, Quaternion.Euler(new Vector3()));
	box[x,y].canStand = false;
}
public function setIce(x:int,y:int){
	for(var i:int=x-1;i<=x+1;i++){
		for(var j:int=y-1;j<=y+1;j++){
			if(i!=x || j!=y){
				box[i,j].setUpFunction(6);
			}
		}
	}
	box[x,y].canStand = false;
	box[x,y].setUpFunction(3);
	GameObject.Instantiate( Resources.Load("Prefabs/Obstacle/KeoCycstal") as GameObject,box[x,y].thisPlane.transform.position+Vector3(0,0,0), Quaternion.Euler(new Vector3()));
}
public function setLifeTree(x:int,y:int){
	for(var i:int=x-1;i<=x+1;i++){
		for(var j:int=y-1;j<=y+1;j++){
			if(i!=x || j!=y){
				box[i,j].setUpFunction(7);
			}
		}
	}
	box[x,y].setUpFunction(4);
	box[x,y].canStand = false;
}
public function whatFunction(pr:person){
	var x:int=pr.getLocationX();
	var y:int=pr.getLocationY();
	var tools:boolean[] = new boolean [box[0,0].whatsThis.Count()];
	for(var i:int=0;i<tools.length;i++){
		if(box[x,y].inside[i]== true){
			print(i+"hihi");
			tools[i]=true;
		}
		else{
			tools[i] = false;
		}
	}
	if(tools[2]){
		pr.getHurt(box[x,y].fire()*2);
	}
	if(tools[3]){
		pr.slowDown();
	}else{
		pr.leaveIce();
	}
	if(tools[5]){
		pr.getHurt(box[x,y].fire());
	}
	if(tools[6]){
		pr.slowDown();
	}else{
		pr.leaveIce();
	}
	if(tools[7]){
		pr.getHurt(box[x,y].liveTree());
	}
		
}
function findNeighbors(x:int,y:int){
	if(x-1 > 0){
		boxNeighbors.Add(getBox(x-1,y));
	}
	if(x+1 < box.GetLength(0)){
		boxNeighbors.Add(getBox(x+1,y));
	}
	if(y-1 > 0){
		boxNeighbors.Add(getBox(x,y-1));
	}
	if(y+1 < box.GetLength(1)){
		boxNeighbors.Add(getBox(x,y+1));
	}
}









function Start () {

}

function Update () {

}

}