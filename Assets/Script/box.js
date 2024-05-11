#pragma strict


public class box{


var empty:boolean =true;
var canStand:boolean  =true;
var ps:int=-1;
var inside : List.<boolean> = new List.<boolean>();   
var whatsThis : List.<String> = new List.<String>(); //Strings to record what's the boolean for
var shortForm : List.<String> = new List.<String>();
var thisPlane : plane;
var x:int;
var y:int;

function noBug(){}
public function box(){
	whatsThis.Add("Person"); //0
	whatsThis.Add("Stone");	//1
	whatsThis.Add("Fire");	//2
	whatsThis.Add("Ice");	//3
	whatsThis.Add("LiveTree");	//4
	whatsThis.Add("near Fire");	//5
	whatsThis.Add("near Ice");	// 6
	whatsThis.Add("near LiveTree");	//7

	shortForm.Add("");
	shortForm.Add("S");
	shortForm.Add("F");
	shortForm.Add("I");
	shortForm.Add("T");
	shortForm.Add("");
	shortForm.Add("");
	shortForm.Add("");
	for(var i:int=0;i<whatsThis.Count();i++)
		inside.Add(false);
}

public function returnThings(){ //return whst's at the box
	for(var i:int=0;i<inside.Count;i++)
		if(inside[i]==true)
			print("This is "+ whatsThis[i]);
}
public function changeBoxto(){ //change the box to whatever you like
	var x:int=0;
	while(x<1 || x>4){
		print("put what on it ?( 1.Stone 2.Fire  3.Ice 4.LiveTree)");
		//x=new Scanner(System.in).nextInt();
	}
	inside[x]= true;
	empty=false;
}
public function setUpFunction(i:int){
	if(i<inside.Count()){
		inside[i]=true;
		//System.out.println(i+" "+ ((inside.get(i))?"true":""));
	}	
		//System.out.println("hihi");
		empty = false;
}
public function detectperson(){
	//thinking how to auto detect if a person is on a box
}
public function isEmpty():boolean{
	return empty;
}
public function somethingIn(){
	empty = false;
}
public function clearThisSquare(){
	empty = true;
	canStand = true;
	thisPlane.canSelect = true;
	//System.out.println("hihi");
}
public function CanMeStand():boolean{
	return canStand;
}
public function standIn(i:int){
	canStand = false;
	empty = false;
	//System.out.println("hihi");
	ps=i;
}

public function leaveIt(){
	canStand = true;
	thisPlane.canSelect = true;
	ps=-1;
}
public function getMan():int{
	return ps;
}
public function havePerson():boolean{
	if(ps == -1){
		return false;
	}
	return true;
}
public function getShortForm():String{
	for(var i:int=0;i<inside.Count();i++){
		if(inside[i]==true){
			return shortForm[i];
		}
	}
	//System.out.println("hiih");
	return "";
}
public function haveFun():boolean{
	for(var i:int=0;i<inside.Count();i++){
		if(inside[i]==true){
			return inside[i];
		}
	}
	return false;
}
public function fire():int{
	return 10;
}
public function liveTree():int{
	return -100;
}
public function setLocation(x:int,y:int){
	this.x=x;
	this.y=y;
}





public var showIt : boolean = false;
var canChoose : GameObject;
var chosen : GameObject;

function Start () {

}

function Update () {
	if(showIt ==true){
	}
}

function insertPlane(tool:plane){
	thisPlane = tool;
}

}