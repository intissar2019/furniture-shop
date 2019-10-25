<?php


class LayoutController
{
	 public function httpGetMethod()
    {
        $categoryModel = new CategoryModel();
        $categories    = $categoryModel->listAll();

        return
        [
            'flashBag' => new FlashBag(),
            'categories'    => $categories
        ];
    }
}