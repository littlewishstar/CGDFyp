#pragma strict

var lastCamPosX:float = 0.0;
var lastCamPosY:float = 0.0;
var lastCamPosZ:float = 0.0;


function Start () {

}

function Update () {
	if(Input.GetMouseButton(1)){
		print("right click");
		if(Input.GetAxis("Mouse X") != lastCamPosX){
			transform.Rotate(0,Input.GetAxis("Mouse X"),0,Space.World);
		}
		lastCamPosX = Input.GetAxis("Mouse X");
		
		if(Input.GetAxis("Mouse Y") != lastCamPosX){
			transform.Rotate(Input.GetAxis("Mouse Y"),0,0,Space.World);
		}
		lastCamPosX = Input.GetAxis("Mouse Y");
	}
	
}