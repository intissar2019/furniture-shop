<?php


class ProductsController
{
	public function httpGetMethod(Http $http, array $queryFields)
	{
        $productModel = new ProductModel();
        $products     = $productModel->listAll();

        $categoryModel = new CategoryModel();
        $categories     = $categoryModel->listAll();

       // $productsByCategory=$categoryModel->findProductsByCategory($queryFields['id']);

        return
        [
            'flashBag' => new FlashBag(),
            'products'    => $products,
            'categories' => $categories,
        ];
	}
}