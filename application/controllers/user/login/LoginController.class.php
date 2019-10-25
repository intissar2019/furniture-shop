<?php


class LoginController
{
	public function httpGetMethod()
	{
		return [ '_form' => new LoginForm()	];
	}

	public function httpPostMethod(Http $http, array $formFields)
	{
		try
		{
            // Récupération de l'utilisateur en fonction de ses identifiants.
            $userModel = new UserModel();
            $user      = $userModel->findWithEmailPassword
            (
                $formFields['email'],
                $formFields['password']
            );

            // Construction de la session utilisateur.
            $userSession = new UserSession();
            $userSession->create
            (
                $user['Id'],
                $user['FirstName'],
                $user['LastName'],
                $user['Email']
            );

            // Redirection vers la page d'accueil.
            $http->redirectTo('/products');
		}
		catch(DomainException $exception)
		{
            // Réaffichage du formulaire avec un message d'erreur.
            $form = new LoginForm();
            $form->bind($formFields);
            $form->setErrorMessage($exception->getMessage());

			return [ '_form' => $form ];
		}
	}
}