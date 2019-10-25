<?php


class UserModel
{
    public function find($userId)
    {
    	$database = new Database();

    	// Récupération de l'utilisateur spécifié.
    	return $database->queryOne
    	(
    		"SELECT
    			Id,
    			LastName,
				FirstName,
				Email,
				Password,
				Address,
				City,
				ZipCode,
				Phone
			FROM user
			WHERE Id = ?",
    		[ $userId ]
    	);
    }

    public function findWithEmailPassword($email, $password)
    {
        $database = new Database();

        // Récupération de l'utilisateur ayant l'email spécifié en argument.
        $user = $database->queryOne
        (
            "SELECT
                Id,
                LastName,
                FirstName,
                Email,
                Password
            FROM user
            WHERE Email = ?",
            [ $email ]
        );

        // Est-ce qu'on a bien trouvé un utilisateur ?
        if(empty($user) == true)
        {
            throw new DomainException
            (
                "Il n'y a pas de compte utilisateur associé à cette adresse email"
            );
        }

        // Est-ce que le mot de passe spécifié est correct par rapport à celui stocké ?
    	if($this->verifyPassword($password, $user['Password']) == false)
    	{
			throw new DomainException
			(
				'Le mot de passe spécifié est incorrect'
			);
    	}

		return $user;
    }

    private function hashPassword($password)
    {
        /*
         * Génération du sel, nécessite l'extension PHP OpenSSL pour fonctionner.
         *
         * openssl_random_pseudo_bytes() va renvoyer n'importe quel type de caractères.
         * Or le chiffrement en blowfish nécessite un sel avec uniquement les caractères
         * a-z, A-Z ou 0-9.
         *
         * On utilise donc bin2hex() pour convertir en une chaîne hexadécimale le résultat,
         * qu'on tronque ensuite à 22 caractères pour être sûr d'obtenir la taille
         * nécessaire pour construire le sel du chiffrement en blowfish.
         */
        $salt = '$2y$11$'.substr(bin2hex(openssl_random_pseudo_bytes(32)), 0, 22);

        // Voir la documentation de crypt() : http://devdocs.io/php/function.crypt
       // return crypt($password,$salt);
         return ($password);
    }

    public function signUp(
        $lastName,
        $firstName,
        $email,
        $password,
        $address,
        $city,
        $zipCode,
        $phone)
    {
        $database = new Database();

        // On vérifie qu'il y a un utilisateur avec l'adresse e-mail spécifiée.
        $user = $database->queryOne
        (
            "SELECT Id FROM user WHERE Email = ?", [ $email ]
        );

        // Est-ce qu'on a bien trouvé un utilisateur ?
        if(empty($user) == false)
        {
            throw new DomainException
            (
                "Il existe déjà un compte utilisateur avec cette adresse e-mail"
            );
        }

        $sql = "INSERT INTO user
		(
			LastName,
			FirstName,
			Email,
			Password,
			CreationTimestamp,
			Address,
			City,
			ZipCode,
			Phone
		) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)";

        /*
         * Hachage du mot de passe, le mot de passe en clair n'est JAMAIS enregistré
         * et ne pourra JAMAIS être récupéré.
         */
        $passwordHash = $this->hashPassword($password);

        // Insertion de l'utilisateur dans la base de données.
        $database->executeSql($sql,
        [
            $lastName,
            $firstName,
            $email,
            $passwordHash,
            $address,
            $city,
            $zipCode,
            $phone
        ]);

        // Ajout d'un message de notification qui s'affichera sur la page d'accueil.
        $flashBag = new FlashBag();
        $flashBag->add('Votre compte utilisateur a bien été créé.');
    }

    public function updateLoginTimestamp($userId)
    {
        // Mise à jour de la date de dernière connexion pour cet utilisateur.
        $database = new Database();
        $database->executeSql
        (
            "UPDATE user SET LastLoginTimestamp = NOW()	WHERE Id = ?",
            [ $userId ]
        );
    }

	private function verifyPassword($password, $hashedPassword)
	{
        // Si le mot de passe en clair est le même que la version hachée alors renvoie true.
		//return crypt($password, $hashedPassword) == $hashedPassword;
        return ($password == $hashedPassword);
	}
}