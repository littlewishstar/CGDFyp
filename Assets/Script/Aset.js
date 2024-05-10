#pragma strict

var prev:Aset;
var F:int=0;
var G:int=0;
var H:int=0;
var x:int=0;
var y:int=0;

function Start () {

}

function Update () {

}

function getF():float{
	return G+H;
}
function setUp(sx:int,sy:int){
	x=sx;
	y=sy;
}
function Gval(a:int , b:int){
	G=Mathf.Sqrt((a-x)*(a-x)+(b-y)*(b-y));
}
function Hval(a:int , b:int){
	H=Mathf.Sqrt((a-x)*(a-x)+(b-y)*(b-y));
}

function setprev(a:Aset):Aset{
		prev=a;
		//print(a);
		return a;
	}
