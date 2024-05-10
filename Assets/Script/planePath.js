#pragma strict
import  System.Linq;

public class planePath {
	public var listOfPlanes:List.<plane>  = new List.<plane>();

	public var costOfPath:int  = 0;	
	
	public var lastPlane:plane;
	
	public function planePath() {}
	
	public function planePath(tp:planePath ) {
		listOfPlanes = tp.listOfPlanes.ToList();
		costOfPath = tp.costOfPath;
		lastPlane = tp.lastPlane;
	}
	
	public function addPlane(t:plane) {
		costOfPath += t.movecost;
		listOfPlanes.Add(t);
		lastPlane = t;
	}
}