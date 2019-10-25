<?php


class LogoutController
{
	public function httpGetMethod(Http $http)
	{
		// Destruction de la session de l'utilisateur.
		$userSession = new UserSession();
		$userSession->destroy();

 		// Redirection vers la page d'accueil.
		$http->redirectTo('/');
	}
}