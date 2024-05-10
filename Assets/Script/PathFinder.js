#pragma strict

public class PathFinder {
	
	
	
	public function PathFinder () {
		
	}
	
	public static function  FindPath( originPlane:plane, step:int ):planePath {
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
				newPath.addPlane(t);
				open.Add(newPath);
			}
		}
		closed.Remove(originPlane);
		return closed;
	}
}