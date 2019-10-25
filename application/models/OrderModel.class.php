<?php


class OrderModel
{
	public function find($orderId)
	{
        $database = new Database();

        $sql = 'SELECT
                    UserId,
                    CreationTimestamp,
                    CompleteTimestamp,
                    TotalAmount,
                    TaxRate,
                    TaxAmount
                FROM `orderfurniture`
                WHERE Id = ?';

		// Récupération de la commande spécifiée.
		return $database->queryOne($sql, [ $orderId ]);
	}

	public function findOrderLines($orderId)
	{
		$database = new Database();

        $sql = 'SELECT
                    QuantityOrdered,
                    PriceEach,
                    Title,
                    img
                FROM Orderline
                INNER JOIN product ON product.Id = OrderLine.ProductId
                WHERE OrderId = ?';

		// Récupération des lignes de la commande spécifiée.
		return $database->query($sql, [ $orderId ]);
	}

    public function validate($userId, array $basketItems)
    {
        $database = new Database();

        // Insertion de la commande dans la base de donées.
        $orderId = $database->executeSql
        (
            'INSERT INTO `orderfurniture`
			(
				UserId,
				CreationTimestamp,
				TaxRate
			) VALUES (?, NOW(), 20.0)',
            [ $userId ]
        );


        $sql = 'INSERT INTO orderline
        (
            OrderId,
            ProductId,
            QuantityOrdered,
            PriceEach
        ) VALUES (?, ?, ?, ?)';

        // Initialisation du montant total HT.
        $totalAmount = 0;

        // Insertion des lignes de la commande.
        foreach($basketItems as $basketItem)
        {
            // Ajout du montant HT de la ligne du panier au montant total HT.
            $totalAmount += $basketItem['quantity'] * $basketItem['salePrice'];

            // Insertion d'une ligne de commande dans la base de données.
            $database->executeSql
            (
                $sql,
                [
                    $orderId,
                    $basketItem['productId'],
                    $basketItem['quantity'],
                    $basketItem['salePrice']
                ]
            );
        }


        // Mise à jour de la commande dans la base de données, avec les montants.
        $sql = 'UPDATE `orderfurniture`
				SET CompleteTimestamp = NOW(),
					TotalAmount       = ?,
					TaxAmount         = ? * TaxRate / 100
				WHERE Id = ?';

        $database->executeSql
        (
            $sql,
            [
                $totalAmount,
                $totalAmount,
                $orderId
            ]
        );


        return $orderId;
    }
}