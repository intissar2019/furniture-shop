<?php

class ProductModel
{
   
    public function listLimit()
    {
        $database = new Database();

        $sql = 'SELECT *
                FROM category 
                INNER JOIN product 
                ON category.id=IdCategory  
                LIMIT 4';

        return $database->query($sql);
    }
     public function listAll()
    {
        $database = new Database();

        $sql = 'SELECT *
                FROM category 
                INNER JOIN product 
                ON category.id=IdCategory';

        return $database->query($sql);
    }

     public function find($productId)
    {
        $database = new Database();

        $sql = 'SELECT
                    Id,
                    Title,
                    Description,
                    img,
                    Price,
                    Color
                FROM product
                WHERE Id = ? AND QuantityInStock > 0';

        // Récupération du produit  spécifié.
        return $database->queryOne($sql, [ $productId ]);
    }

     public function findProductsByCategory($categoryId)
    {
        $database = new Database();

        $sql = 'SELECT * FROM product WHERE IdCategory = ? ';

        return $database->query($sql, [ $categoryId ]);
    }
    public function findCategory($categoryId)
    {
        $database = new Database();

        $sql = 'SELECT title FROM category WHERE IdCategory = ? ';

        return $database->queryOne($sql, [ $categoryId ]);
    }
}