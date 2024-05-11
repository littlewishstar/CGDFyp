#pragma strict

var target:Transform;
function Start () {

}

function Update () {
	transform.position=Vector3.MoveTowards(transform.position,target.position,Time.deltaTime*5);
	if(Vector3.Distance(transform.position,target.position)==0)
		Destroy(gameObject,0.4);
}

function setTarget(ps:Transform){
	target=ps;
}