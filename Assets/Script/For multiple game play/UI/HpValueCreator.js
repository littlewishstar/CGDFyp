#pragma strict

static var personNum : int =0;

function Start () {

}

function Update () {

}

function showOutTheFullHpList(ps:List.<person>){
	resetToEmpty ();
	for(var i=0;i<ps.Count;i++){
		var personHpValue : GameObject = Instantiate(Resources.Load("Prefabs/UI gameObject/personHpValue")) as GameObject;
		personHpValue.transform.parent = this.transform;
		personHpValue.SendMessage("setUpHpValue",ps[i]);
		personHpValue.SendMessage("setUpLocation",new Vector2(0,105-i*65));
	}
	personNum = ps.Count;
	transform.GetComponent.<UI.Image>().rectTransform.sizeDelta = new Vector2(300, personNum*65);
}

function resetToEmpty (){
	for(var i:int=0;i<personNum;i++){
		Destroy(transform.GetChild(0).gameObject);
	}
}