#pragma strict

public class FSM extends MonoBehaviour
{

	var walked:boolean;
	var attacked:boolean;
    protected function Initialize() { }
    protected function FSMUpdate() { }
    function FSMFixedUpdate(bd :board) { }
    function FSMsetEnemyAndFd(ps:List.<person>){}
    function UpdateEndTurnState(){}
	var controller : GameObject;
	var status:person ;
	var cal:Calculating;
	var bd:board;
	// Use this for initialization
	function Start () //unity start
    {
    	controller= GameObject.Find("Main Game Controller");
    	print(controller);
        Initialize();
	}
	function insertStatus(pr : person){
		status = pr;
	}
	// Update is called once per frame
	function Update () //unity update
    {
        FSMUpdate();
	}

    function FixedUpdate() //fixed time update
    {
        FSMFixedUpdate(new board(0,0));
    }
    function endTurn()
    {
    	UpdateEndTurnState();
    }
    function setEnemyAndFd(ps:List.<person>){
    	FSMsetEnemyAndFd(ps);
    }
}