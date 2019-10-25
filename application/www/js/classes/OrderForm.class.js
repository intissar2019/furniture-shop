'use strict';


var OrderForm = function()
{
    this.$form          = $('#order-form');
    this.$productId     = $('#id');
    this.$title         = $('#title');
    this.$price         = $('#price');
    this.$yourPopup  = $('#yourPopup');

    this.$panel = $('#panel');

    this.basketSession = new BasketSession();
};

OrderForm.prototype.showyourPopup=function() {
    this.$yourPopup.dialog({
        autoOpen: true,
        resizable: false,
        height: 'auto',
        width: 'auto',
        modal: true,
        show: { effect: "puff", duration: 300 }, 
        draggable: true
    });

    $(".ui-widget-header").css({"display":"none"}); 
}


OrderForm.prototype . closeyourPopup=function() { 
    this.$yourPopup.dialog('close'); 
}
OrderForm.prototype.onSubmitForm = function(event)
{
    /*
     * Le formulaire doit être validé par la classe FormValidator.
     *
     * Quand cette classe s'exécute elle enregistre combien d'erreurs de validation elle
     * a trouvé dans un attribut HTML data-validation-error-count de la balise <form>
     * (voir le code dans la méthode onSubmitForm() de la classe FormValidator).
     *
     * Si au moins une erreur est trouvée on ne veut surtout pas continuer !
     */
 
 event.preventDefault();


 var formFields;

    /*
     * Préparation d'une requête HTTP POST, construction d'un objet représentant
     * les données de formulaire.
     *
     * Ainsi form.basketItems donnera du côté du serveur en PHP $formFields['basketItems']
     */
   



    // Ajout de l'article dans le panier.
    this.basketSession.add
    (
        // Valeur sélectionnée dans la liste déroulante des produits alimentaires
        this.$productId.html(),

        // Nom sélectionné dans la liste déroulante des produits alimentaires
        this.$title.html(),

        // Saisie de la quantité par l'utilisateur
        this.$form.find('input[name=quantity]').val(),

        // Champ de formulaire caché contenant le prix
        this.$price.html()
    );
     formFields =
    {
        basketItems : this.basketSession.items
    };


        this.$panel.css("color", "yellow");

 $.post({
        url: getRequestUrl() + '/basket',                // URL de destination
        data:formFields,
        success:function(data){ 
            this.$yourPopup.html("dasdssfta"); 
        }
    });
  
    
};



OrderForm.prototype.run = function()
{
    /*
     * Installation d'un gestionnaire d'évènement sur la sélection d'un aliment
     * dans la liste déroulante des aliments.
     */

    /*
     * Utilisation de la méthode jQuery trigger() pour déclencher dès maintenant
     * l'évènement de la liste déroulante afin d'afficher le premier aliment de la liste.
     */


    /*
     * Installation d'un gestionnaire d'évènement FUTUR sur le clic des boutons de
     * suppression d'un article du panier.
     *
     * A cet instant il n'y a pas de bouton puisque c'est refreshOrderSummary() qui
     * génère cette partie du document HTML. Il peut n'y avoir aucun bouton (panier
     * vide) comme il peut y en avoir une dizaine, un pour chaque article du panier.
     */

    /*
     * Installation d'un gestionnaire d'évènement sur le clic du bouton de validation
     * de la commande.
     */


    // Installation d'un gestionnaire d'évènement sur la soumission du formulaire.
    this.$form.on('submit', this.onSubmitForm.bind(this));
    this.$form.find('[type=submit]').on('click', this.onSubmitForm.bind(this));

    /*
     * Le formulaire est caché au démarrage (pour éviter le clignotement de la page),
     * il faut l'afficher.
     */



    // Affichage initial du récapitulatif de la commande.
};

OrderForm.prototype.success = function()
{
    // Effacement du panier.
    this.basketSession.clear();
};