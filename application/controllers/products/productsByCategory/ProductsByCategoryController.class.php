<?php


class ProductsByCategoryController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
        $categoryModel = new CategoryModel();
        $categories     = $categoryModel->listAll();

        $productModel = new ProductModel();
        $products     =$productModel->findProductsByCategory($queryFields['id']);

        return
        [
            'flashBag' => new FlashBag(),
            'products'    => $products,
            'categories' => $categories,
        ];
    }
}