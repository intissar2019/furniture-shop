<?php


class OrderController
{
	public function httpGetMethod(Http $http, array $queryFields)
	{

        if(array_key_exists('id', $queryFields) == true)
        {
            if(ctype_digit($queryFields['id']) == true)
            {   
                $userSession = new UserSession();
                if($userSession->isAuthenticated() == false)
                    {
                         $http->redirectTo('/user/login');
                    }
                $productModel = new ProductModel();
                $product      = $productModel->find($queryFields['id']);

    
                 return
        [
            'product'    => $product
        ];
            }
        }

     
    }
            
       

}