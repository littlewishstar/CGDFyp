#pragma strict

var lastCamPosX:float = 0.0;

function Start () {

}

function Update () {
	if(Input.GetMouseButton(1)){
		print("right click");
		if(Input.GetAxis("Mouse X") != lastCamPosX){
			transform.Rotate(0,Input.GetAxis("Mouse X"),0,Space.World);
		}
		lastCamPosX = Input.GetAxis("Mouse X");
	}
	
}