#pragma strict


public class Calculating{

var board:int[,]; // record the board
var OKBoard:boolean[,];
var haveListP : boolean =false;
var listP : List.<plane> = new List.<plane>();
var listS : List.<mySet> = new List.<mySet>();
var bd:board;

public function Calculating(bd:int[,]){
	board = bd;
	OKBoard = new boolean[bd.GetLength(0),bd.GetLength(1)];
	for(var i:int=0;i<board.GetLength(0);i++){
		for(var j:int = 0;j<board.GetLength(1);j++){
			OKBoard[i,j]=false;
		}
	}
}

public function Calculating(bd:board){
	this.bd=bd;
	board = new int[bd.getSizeX(),bd.getSizeY()];
	OKBoard = new boolean[bd.getSizeX(),bd.getSizeY()];
	for(var i:int = 0;i<board.GetLength(0);i++){
		for(var j:int = 0;j<board.GetLength(1);j++){
			OKBoard[i,j]=false;
			if(bd.getBox(i, j).CanMeStand()){
				board[i,j]=-1;
			}else if(bd.getBox(i, j).getMan()>=0){
				board[i,j]=bd.getBox(i, j).getMan();
			}else{
				board[i,j]=-2;
			}
		}
	}
}

public function treeRecursive(x:int,y:int ,step:int ){ // do the recursion to render which is OK in walk
	if(step>0){
		if((y-1>=0) && board[x,y-1]==-1){
			//if(OKBoard[x,y-1]==false){
				OKBoard[x,y-1]=true;
				treeRecursive(x,y-1,step-1);
			//}
		}
		if((y+1<=board.GetLength(1)-1) && board[x,y+1]==-1){
			//if(OKBoard[x,y+1]==false){
				OKBoard[x,y+1]=true;
				treeRecursive(x,y+1,step-1);
			//}
		}
		if((x-1>=0) && board[x-1,y]==-1){
			//if(OKBoard[x-1,y]==false){
				OKBoard[x-1,y]=true;
				treeRecursive(x-1,y,step-1);
			//}
		}
		if((x+1<=board.GetLength(0)-1) && board[x+1,y]==-1){
			//if(OKBoard[x+1,y]==false){
				OKBoard[x+1,y]=true;
				treeRecursive(x+1,y,step-1);
			//}
		}
	}
}
public function treeRecursive2(x:int,y:int ,range:int){ // do the recursion to render which is OK in walk
	if(range>0){
		if((y-1>=0) && board[x,y-1]>-2){
				OKBoard[x,y-1]=true;
				treeRecursive2(x,y-1,range-1);
		}
		if((y+1<=board.GetLength(1)-1) && board[x,y+1]>-2){
				OKBoard[x,y+1]=true;
				treeRecursive2(x,y+1,range-1);
		}
		if((x-1>=0) && board[x-1,y]>-2){
				OKBoard[x-1,y]=true;
				treeRecursive2(x-1,y,range-1);
		}
		if((x+1<=board.GetLength(0)-1) && board[x+1,y]>-2){
				OKBoard[x+1,y]=true;
				treeRecursive2(x+1,y,range-1);
		}
	}
}


/*public function  FindHighlight2(x:int,y:int, step:int ):List.<mySet> {
	
	var closed2:List.<mySet> = new List.<mySet>();
	var open2:List.<mySet> = new List.<mySet>();
	
	open2.Add(new mySet(x,y));
	
	//while (open2.Count > 0) {
		
		
		var current2:mySet = open2[0];
		open2.RemoveAt(0);
		
		if(closed2.Contains(current2)){
			//continue;
		}
		if(current2.myNum > step+1){
			//continue;
		}
		closed2.Add(current2);

		bd.findNeighbors(current2.x,current2.y);
		for ( var t:box in bd.boxNeighbors) {				
			//var newPath:planePath = new planePath(current);
			var newSet:mySet = new mySet(current2);
			if(t.canStand==true){
				//newPath.addPlane(t);
				newSet = newSet.appendSet(new mySet(t.x,t.y));
			}
			open2.Add(newSet);
			//open.Add(newPath);
		}
		
	//}
	closed2.RemoveAt(0);
	listS = closed2;
	haveListP=true;
	return closed2;
}
public function  FindHighlight( originPlane:plane, step:int ):List.<plane> {
	var closed:List.<plane> = new List.<plane>();
	var open:List.<planePath> = new List.<planePath>();
	
	var originPath:planePath = new planePath();
	originPath.addPlane(originPlane);
	
	open.Add(originPath);
	
	while (open.Count > 0) {
		var current:planePath = open[0];
		open.Remove(open[0]);
		
		if (closed.Contains(current.lastPlane)) {
			continue;
		} 
		if (current.costOfPath > step +1) {
			continue;
		}
		
		closed.Add(current.lastPlane);
		
		for ( var t:plane in current.lastPlane.neighbors) {				
			var newPath:planePath = new planePath(current);
			if(t.canStand==true){
				newPath.addPlane(t);
			}
			open.Add(newPath);
		}
	}
	closed.Remove(originPlane);
	//listP = closed;
	//haveListP=true;
	return closed;
}*/
	
public function cross1(x:int,y:int ,range:int){
	for(var i:int = 0;i<2*range+1;i++){
		if(x-range+i>=0 && x-range+i<board.GetLength(0)){
			if(board[x-range+i,y]>-2){
				OKBoard[x-range+i,y]=true;
			}
		}
		if(y-range+i>=0 && y-range+i<board.GetLength(1)){
			if(board[x,y-range+i]>-2){
				OKBoard[x,y-range+i]=true;
			}
		}
	}
}
public function cross2(x:int,y:int ,range:int,firstpoint:boolean ,direction:int ){
	if(firstpoint ==true){
		if(x-1>=0){
			if(board[x-1,y]==-1){
				cross2(x-1,y,range-1,false,0);
			}
			OKBoard[x-1,y] = true;
		}
		if(x+1<board.GetLength(0)){
			if(board[x+1,y]==-1){
				cross2(x+1,y,range-1,false,1);
			}
			OKBoard[x+1,y] = true;
		}
		if(y-1>=0){
			if(board[x,y-1]==-1){
				cross2(x,y-1,range-1,false,2);
			}
			OKBoard[x,y-1] = true;
		}
		if(y+1<board.GetLength(1)){
			if(board[x,y+1]==-1){
				cross2(x,y+1,range-1,false,3);
			}
			OKBoard[x,y+1] = true;
		}
	}
	else{
		if(range>0){
			if(direction==0){
				if(x-1>=0){
					if(board[x-1,y]==-1){
						cross2(x-1,y,range-1,false,0);
					}
					OKBoard[x-1,y] = true;
				}
			}
			else if(direction==1){
				if(x+1<board.GetLength(0)){
					if(board[x+1,y]==-1){
						cross2(x+1,y,range-1,false,1);
					}
					OKBoard[x+1,y] = true;
				}
			}
			else if(direction==2){
				if(y-1>=0){
					if(board[x,y-1]==-1){
						cross2(x,y-1,range-1,false,2);
					}
					OKBoard[x,y-1] = true;
				}
			}
			else if(direction==3){
				if(y+1<board.GetLength(1)){
					if(board[x,y+1]==-1){
						cross2(x,y+1,range-1,false,3);
					}
					OKBoard[x,y+1] = true;
				}
			}
		}
	}
}
public function circle(x:int,y:int ,range:int){
	for(var i:int = 0;i<board.GetLength(0);i++){
		for(var j:int = 0;j<board.GetLength(1);j++){
			if(Mathf.Sqrt((x-i)*(x-i)+(y-j)*(y-j))<=range){
				OKBoard[i,j]=true;
			}
		}
	}
}
public function aroundPeople(x:int,y:int ,range:int){
	for(var i:int = 0;i<board.GetLength(0);i++){
		for(var j:int = 0;j<board.GetLength(1);j++){
			if(Mathf.Sqrt((x-i)*(x-i))<=range && Mathf.Sqrt((y-j)*(y-j))<=range){
				OKBoard[i,j]=true;
			}
		}
	}
}
public function getOKBoard():boolean[,]{ // return OKBoard
	return OKBoard;
}
public function getOKList():List.<plane>{
	if(haveListP == true){
		return listP;
	}
	else{
		for(var i=0;i<OKBoard.GetLength(0);i++){
			for(var j=0;j<OKBoard.GetLength(1);j++){
				if(OKBoard[i,j] == true){
					print(bd.getBox(i,j).thisPlane);
					listP.Add(bd.getBox(i,j).thisPlane);
				}
			}
		}
		
	}
	return listP;
}

public function go(x:int ,y:int ,lx:int,ly:int):mySet[]{ // A* Algorithms to find the path
	var open:List.<mySet> = new List.<mySet>();
	var close:List.<mySet> = new List.<mySet>();
	var fin:List.<mySet> = new List.<mySet>();
	open.Add(new mySet(x,y));
	//Debug.Log("close.Count() "+close.Count());
	//Debug.Log("x " +x+" y "+y+"lx "+lx+" ly "+ly);
	do{
		if((open[0].y-1>=0) && OKBoard[open[0].x,open[0].y-1]==true){
			var tool:mySet = new mySet(open[0].x,open[0].y-1);
			var same:boolean=false;
			for(var i:int = 0;i<close.Count();i++){
				if(close[i].x==tool.x &&close[i].y==tool.y)
					same=true;
			}
			for(i = 0;i<open.Count();i++){
				if(open[i].x==tool.x &&open[i].y==tool.y)
					same=true;
			}
			if(same==false){
				tool.setHi(x,y);
				tool.setBye(lx, ly);
				open.Add(tool);
				tool.setprev(open[0]);
			}
		}
		if((open[0].y+1<=board.GetLength(1)-1) &&OKBoard[open[0].x,open[0].y+1]==true){
			tool = new mySet(open[0].x,open[0].y+1);
			same=false;
			for(i = 0;i<close.Count();i++){
				if(close[i].x==tool.x &&close[i].y==tool.y)
					same=true;
			}
			for(i = 0;i<open.Count();i++){
				if(open[i].x==tool.x &&open[i].y==tool.y)
					same=true;
			}
			if(same==false){
				tool.setHi(x,y);
				tool.setBye(lx, ly);
				open.Add(tool);
				tool.setprev(open[0]);
			}
		}
		if((open[0].x-1>=0) && OKBoard[open[0].x-1,open[0].y]==true){
			tool = new mySet(open[0].x-1,open[0].y);
			same=false;
			for(i= 0;i<close.Count();i++){
				if(close[i].x==tool.x &&close[i].y==tool.y)
					same=true;
			}
			for(i = 0;i<open.Count();i++){
				if(open[i].x==tool.x &&open[i].y==tool.y)
					same=true;
			}
			if(same==false){
				tool.setHi(x,y);
				tool.setBye(lx, ly);
				open.Add(tool);
				tool.setprev(open[0]);
			}
		}
		if((open[0].x+1<=board.GetLength(0)-1) && OKBoard[open[0].x+1,open[0].y]==true){
			tool = new mySet(open[0].x+1,open[0].y);
			same=false;
			for(i= 0;i<close.Count();i++){
				if(close[i].x==tool.x &&close[i].y==tool.y)
					same=true;
			}
			for(i = 0;i<open.Count();i++){
				if(open[i].x==tool.x &&open[i].y==tool.y)
					same=true;
			}
			if(same==false){
				tool.setHi(x,y);
				tool.setBye(lx, ly);
				open.Add(tool);
				tool.setprev(open[0]);
			}
		}
		close.Add(open[0]);
		open.RemoveAt(0);
		//Debug.Log("open.Count() "+open.Count());
		var smallest:int=0;
		for(var in1:int =1;in1<open.Count();in1++){
			if(open[in1].getF()<open[smallest].getF())
				smallest=in1;
		}
		var tmp:mySet=open[smallest];
		open[smallest]= open[0];
		open[0]= tmp;
		
		//Debug.Log("open[0]: "+open[0].x+","+open[0].y);
		//Debug.Log("close[end]: "+close[close.Count()-1].x+","+close[close.Count()-1].y);
	}while(open[0].x!=lx || open[0].y!=ly);
	
	var tool3:mySet =open[0];
	while(tool3.prev!=null){
		fin.Add(tool3);
		tool3=tool3.prev;
	}
	var fin2:mySet[]=new mySet[fin.Count()];
	for(var j = 0;j<fin2.length;j++){
		fin2[fin.Count()-j-1]=fin[j];
	}
	return fin2;
}

public function go2(x:int ,y:int ,lx:int,ly:int):mySet[]{ // A* Algorithms to find the path
	var open:List.<mySet> = new List.<mySet>();
	var close:List.<mySet> = new List.<mySet>();
	var fin:List.<mySet> = new List.<mySet>();
	open.Add(new mySet(x,y));
	
	do{
		if((open[0].y-1>=0) ){
			var tool:mySet = new mySet(open[0].x,open[0].y-1);
			var same:boolean=false;
			for(var i:int = 0;i<close.Count();i++){
				if(close[i].x==tool.x &&close[i].y==tool.y)
					same=true;
			}
			for(i = 0;i<open.Count();i++){
				if(open[i].x==tool.x &&open[i].y==tool.y)
					same=true;
			}
			if(same==false){
				tool.setHi(x,y);
				tool.setBye(lx, ly);
				open.Add(tool);
				tool.setprev(open[0]);
			}
		}
		if((open[0].y+1<=board.GetLength(1)-1) ){
			tool = new mySet(open[0].x,open[0].y+1);
			same=false;
			for(i = 0;i<close.Count();i++){
				if(close[i].x==tool.x &&close[i].y==tool.y)
					same=true;
			}
			for(i = 0;i<open.Count();i++){
				if(open[i].x==tool.x &&open[i].y==tool.y)
					same=true;
			}
			if(same==false){
				tool.setHi(x,y);
				tool.setBye(lx, ly);
				open.Add(tool);
				tool.setprev(open[0]);
			}
		}
		if((open[0].x-1>=0) ){
			tool = new mySet(open[0].x-1,open[0].y);
			same=false;
			for(i= 0;i<close.Count();i++){
				if(close[i].x==tool.x &&close[i].y==tool.y)
					same=true;
			}
			for(i = 0;i<open.Count();i++){
				if(open[i].x==tool.x &&open[i].y==tool.y)
					same=true;
			}
			if(same==false){
				tool.setHi(x,y);
				tool.setBye(lx, ly);
				open.Add(tool);
				tool.setprev(open[0]);
			}
		}
		if((open[0].x+1<=board.GetLength(0)-1) ){
			tool = new mySet(open[0].x+1,open[0].y);
			same=false;
			for(i= 0;i<close.Count();i++){
				if(close[i].x==tool.x &&close[i].y==tool.y)
					same=true;
			}
			for(i = 0;i<open.Count();i++){
				if(open[i].x==tool.x &&open[i].y==tool.y)
					same=true;
			}			
			if(same==false){
				tool.setHi(x,y);
				tool.setBye(lx, ly);
				open.Add(tool);
				tool.setprev(open[0]);
			}
		}
		close.Add(open[0]);
		open.RemoveAt(0);
		for(var in1:int =1;in1<open.Count();in1++){
			for(var in2:int=in1;in2>0;in2--){
				if(open[in2].getF()<open[in2-1].getF()){
					var tmp:mySet=open[in2];
					open[in2]= open[in2-1];
					open[in2-1]= tmp;
				}else
					break;
			}
		}
	}while(open[0].x!=lx || open[0].y!=ly);
	
	var tool3:mySet =open[0];
	while(tool3.prev!=null){
		fin.Add(tool3);
		tool3=tool3.prev;
	}
	var fin2:mySet[]=new mySet[fin.Count()];
	for(var j = 0;j<fin2.length;j++){
		fin2[fin.Count()-j-1]=fin[j];
	}
	return fin2;
}










function Start () {

}

function Update () {

}

}