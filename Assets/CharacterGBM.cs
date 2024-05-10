using UnityEngine;
using System.Collections;

public class CharacterGBM : MonoBehaviour {
	public CharacterGB CurrentMenu;

	public void Start(){
		ShowMenu(CurrentMenu);
	}

	public void ShowMenu(CharacterGB menu){
		if (CurrentMenu !=null)
			CurrentMenu.Isopen = false;

		CurrentMenu = menu;
		CurrentMenu.Isopen = true;
	}
	public void PlusMenu(CharacterGB menu){
		CurrentMenu = menu;
		menu.Isopen = true;
	}

}
