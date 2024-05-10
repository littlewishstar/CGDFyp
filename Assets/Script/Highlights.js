#pragma strict
import System.Collections.Generic;

class planePath{
	var listOfPlane:List.<plane>  = new List.<plane>();
	
	var lastPlane:plane ;
	
	public var cost:int =0;
	public function planePath(){}
	
	public function planePath( startingPath:List.<plane>){
		listOfPlane=startingPath;
	}
	public function planeePath(tp:planePath){
		listOfPlane=tp.listOfPlane;
		cost=tp.cost;
		lastPlane=tp.lastPlane;
	}
	
	public function getLastPlane():plane{
		if(listOfPlane.Count > 0)
			return listOfPlane[listOfPlane.Count-1];
		return null;
	}
	
	public function addPlane(t:plane){
		cost+=t.movecost;
		listOfPlane.Add(t);
		lastPlane=t;
	}
}

public class Highlight{
	
	public function Highlight(){
	
	}
	public static function FindHighlight(originplane:plane, step:int):List.<plane>{
		print("hi");
		var open:List.<planePath> = new List.<planePath>();
		var closed:List.<plane> = new List.<plane>();
		///var current:planePath ;
		var originPath:planePath = new planePath();
		originPath.addPlane(originplane);
		
		while(open.Count > 0){
			//current = open[0];
			var current:planePath=open[0];
			open.Remove(open[0]);
			
			if(closed.Contains(current.getLastPlane())){
				continue;
			}
			if(current.cost > step){
				continue;
			}
			
			closed.AddRange(current.listOfPlane);
			
			for(var t:plane in current.getLastPlane().neighbors){
			print(t.neighbors);
				//var distenceBetween:int=t.movecost+current.cost;
				var newpath:planePath = current;
				newpath.addPlane(t);
				open.Add(newpath);
			}
		}
	}
}