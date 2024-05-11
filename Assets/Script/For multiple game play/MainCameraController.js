#pragma strict

private var needGodView:int=0;
private var needCloseUp:int=0;
private var godViewFinish:boolean =true;
private var closeUpFinish:boolean =false;
private var vel : float = 0.00;
//var center = Vector3(6,-3,-1);
var lookatPos : Vector3 = new Vector3(6, -0.24f, 2.77f);
private var r:int=0;
private var rx:int=0;
private var ry:float=0;
private var rz:float=0;
private var cam_ortho:float=0;
private var posz:float=0;
private var G = Vector3(0,7,0);
private var V=Quaternion.Euler(0,0,0)*G;
var lookatCh : Vector3;
private var GC = Vector3(0,7,0);
private var VC=Quaternion.Euler(0,0,0)*G;
private var test = Vector3(0,0,0);
private var ppx:float=0;

//var tt=transform.position;

function Start () {
	
}

function Update () {
	//Debug.Log(transform.position);
	if(needGodView==1){
		if(r!=35){
			//Debug.Log(r-35);
			V=Quaternion.Euler(r-35,0,0)*G;
			transform.position = lookatPos + V;
			transform.LookAt(lookatPos);
			r++;
			//Debug.Log(r);
		}
		////Debug.Log(transform.position);
	}
	
	if(needGodView==2){
		if(r>=0){
			V=Quaternion.Euler(r-35,0,0)*G;
			transform.position = lookatPos + V;
			transform.LookAt(lookatPos);
			r--;
		}
		//Debug.Log(transform.position);
	}
	
	if(needCloseUp==1){
		if(ry>=-61){
			camera.orthographicSize=4+cam_ortho;
			VC=Quaternion.Euler(rx-35,ry,rz)*GC;
			transform.position = lookatCh + VC;	
			transform.LookAt(lookatCh);
			rx--;
			ry-=1.848;
			rz-=0.0303;
			cam_ortho-=(2.46f/33.0f);
			}
			closeUpFinish=true;
			
		
	}
	
	if(needCloseUp==2){
		//camera.orthographicSize=4;
		if(ry<=0){
			
			camera.orthographicSize=1.54+cam_ortho;
			VC=Quaternion.Euler(rx-35,ry,rz)*GC;
			transform.position = lookatCh + VC;
			transform.LookAt(lookatCh);
			rx++;
			ry+=1.848;
			rz+=0.0303;
			cam_ortho+=(2.46f/35.0f);
			
			//Debug.Log("HIHI9999999999999");
		}
		if(transform.position.x<=6)
			transform.position.x+=(4.0f/35.0f);
		//Debug.Log(transform.position.z);
		if(transform.position.z>=-1.4)
			transform.position.z-=(1.9f/35.0f);
		//Debug.Log(ppx);
		
		if(transform.position.x==6.000004)
			needCloseUp=0;
			
	}
	
	//-1.68
		
				
}

function GetCP(CP:GameObject){
	lookatCh=CP.transform.position+Vector3(0,0.3,1.25);
	
	if(needCloseUp==0){
		rx=0;
		ry=0;
		rz=0;
		cam_ortho=0;
		needCloseUp++;
	}

	if(closeUpFinish==true){
		cam_ortho=0;
		needCloseUp++;
		//Debug.Log("kk");	
	}
	
	if(needCloseUp==2 && closeUpFinish==true){
		//needcloseUpFinishloseUp=0;		
		closeUpFinish=false;
	}
	

}

function MapD(){
	//camera.orthographicSize=4;
	
	if(r==-1 && needGodView==2){
		needGodView=0;
	}
	
	if(godViewFinish==true){
		r=0;
		needGodView++;
		godViewFinish=false;
	}

	else{
		godViewFinish=true;
		needGodView++;
	}
}



