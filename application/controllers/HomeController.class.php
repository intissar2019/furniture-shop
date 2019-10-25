<?php

class HomeController
{
   


         public function httpGetMethod()
    {
        // Récupération de tous les produits alimentaires.
        $productModel = new productModel();
        $products     = $productModel->listLimit();
        $categoryModel = new CategoryModel();
        $categories     = $categoryModel->listAll();

        return
        [
            'flashBag' => new FlashBag(),
            'products'    => $products,
            'categories'    => $categories,
        ];
    }
    	
    }

   