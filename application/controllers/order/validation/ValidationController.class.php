<?php


class ValidationController
{
	public function httpPostMethod(Http $http, array $formFields)
	{
        $userSession = new UserSession();
        if($userSession->isAuthenticated() == false)
        {
            // On ne peut pas valider une commande sans être connecté !
            $http->redirectTo('/user/login');
        }


        // Validation (enregistrement) de la commande.
        $orderModel = new OrderModel();
        $orderId    = $orderModel->validate
        (
            $userSession->getUserId(),
            $formFields['basketItems']
        );

        // La commande a été créé, renvoi du numéro de commande en JSON.
        $http->sendJsonResponse($orderId);
	}
}