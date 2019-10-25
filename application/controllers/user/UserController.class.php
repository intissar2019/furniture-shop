<?php


class UserController
{
	public function httpGetMethod()
	{
		return [ '_form' => new UserForm() ];
	}

	public function httpPostMethod(Http $http, array $formFields)
	{
		try
		{
			// Inscription de l'utilisateur.
            $userModel = new UserModel();
			$userModel->signUp
			(
				$formFields['lastName'],
				$formFields['firstName'],
				$formFields['email'],
				$formFields['password'],
				$formFields['address'],
				$formFields['city'],
				$formFields['zipCode'],
				$formFields['phone']
			);

            // Redirection vers la page d'accueil.
            $http->redirectTo('/');
		}
		catch(DomainException $exception)
		{
            // Réaffichage du formulaire avec un message d'erreur.
            $form = new UserForm();
            $form->bind($formFields);
            $form->setErrorMessage($exception->getMessage());

			return [ '_form' => $form ];
		}
	}
}