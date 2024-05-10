#pragma strict
import System.Collections.Generic;

public class Highlights {
	
	public function Highlights () {
		
	}
	
	public static function  FindHighlight( originPlane:plane, step:int ):List.<plane> {
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
		return closed;
	}
}