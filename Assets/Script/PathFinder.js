#pragma strict

public class PathFinder {
	
	
	
	public function PathFinder () {
		
	}
	
	public static function  FindPath( originPlane:plane, toPlane:plane ):planePath {
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
			if (current.lastPlane == toPlane ) {
				current.listOfPlanes.RemoveAt(0);
				return current;
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
		return null;
	}
}