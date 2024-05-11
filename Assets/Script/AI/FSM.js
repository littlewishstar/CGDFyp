#pragma strict

public class FSM extends MonoBehaviour
{

	var walked:boolean;
	var attacked:boolean;
    protected function Initialize() { }
    protected function FSMUpdate() { }
    protected function FSMFixedUpdate() { }
	var controller : MultipleGameProcess;
	// Use this for initialization
	function Start () //unity start
    {
    	controller= GameObject.Find("Main Game Controller").GetComponent.<MultipleGameProcess>();
        Initialize();
	}
	
	// Update is called once per frame
	function Update () //unity update
    {
        FSMUpdate();
	}

    function FixedUpdate() //fixed time update
    {
        FSMFixedUpdate();
    }    
}