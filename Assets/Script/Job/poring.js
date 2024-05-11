#pragma strict

public class poring {

	public static function getSkill(i:int,pr:person):skill{
		
		if(i==0)
			return new basicAttack(pr);
		return null;
	}
}