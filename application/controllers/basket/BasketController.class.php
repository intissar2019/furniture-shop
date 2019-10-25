<?php


class BasketController
{


     public function httpGetMethod()
    {
       
    }

    public function httpPostMethod(Http $http, array $formFields)
	{
        $userSession = new UserSession();
        if($userSession->isAuthenticated() == false)
        {
            // On ne peut pas avoir de panier sans être connecté !
            $http->redirectTo('/user/login');
        }

        // S'il n'y a pas de panier, il faut en créer un quand même mais vide.
        if(array_key_exists('basketItems', $formFields) == false)
        {
            $formFields['basketItems'] = [];
        }

        return
        [
            '_raw_template' => true,    // Il ne faut pas charger le layout !
            'basketItems'   => $formFields['basketItems']
        ];
	}
}