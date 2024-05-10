#pragma strict
import System.Collections.Generic;

	public var id:int;
	public var gridPosition:Vector2; //use vector2 instead of locX locY , I think better
	var incontrol : boolean=false;
	var star:int=0;
	var sp:int=0;
	var step:int=0;
	var hp:int=0;
	var pa:int=0;
	var pd:int=0;
	var ma:int=0;
	var md:int=0;
	var phyBuff:boolean=false;
	var phyDeBuff:boolean=false;
	var magBuff:boolean=false;
	var magDeBuff:boolean=false;
	var dead:boolean =false;

	var toPlace:List.<plane> = new List.<plane>();
	public function person(id:int,star:int,sp:int,hp:int,step:int,pa:int, pd:int,ma:int, md:int){
			this.id=id;
			this.star = star;
			this.sp = sp;
			this.hp = hp;  
			this.step = step;
			this.pa = pa;
			this.pd = pd;
			this.ma = ma;
			this.md = md;
	}
	function setlocation(x:int,y:int){
		gridPosition.x=x;
		gridPosition.y=y;
	}
	function OnMouseDown(){
			//transform.parent.SendMessage("getTargetPlace",LocX,LocY);
			if(id==game_Process.instance.GetComponent.<game_Process>().currentplayer){
				if(incontrol==false){
					game_Process.instance.SendMessage("ShowWalk"); 					//will change to askaction();
					incontrol=true;
				}
				else{
					game_Process.instance.SendMessage("reset");
					incontrol=false;
				}
			}
	}