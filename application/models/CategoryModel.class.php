<?php

class CategoryModel
{
  

    public function listAll()
    {
        $database = new Database();

        $sql = 'SELECT * FROM category';

        return $database->query($sql);
    }

    
}