#pragma strict


public class mySet{

var x:int;
var y:int;
var prev:mySet;
var bye:int;
var hi:int;
var myNum:int=0;

public function mySet(sx:int,sy:int){
	x=sx;
	y=sy;
	prev=null;
	hi=0;
	bye=0;
	myNum=0;
}
public function mySet(tool:mySet){
	x=tool.x;
	y=tool.y;
	prev=null;
	hi=tool.hi;
	bye=tool.bye;
	this.myNum=tool.myNum;
}
public function setprev(a:mySet):mySet{
	prev=a;
	return a;
}
public function appendSet(a:mySet):mySet{
	a.setprev(this);
	myNum ++;
	return a;
}
public function setHi(a:int,b:int){
	hi= parseInt(Mathf.Sqrt((a-x)*(a-x)+(b-y)*(b-y)));
}
public function setBye(a:int,b:int){
	bye=parseInt(Mathf.Sqrt((a-x)*(a-x)+(b-y)*(b-y)));
}
public function getF():int{
	return (hi+bye);
}




function Start () {

}

function Update () {

}


}