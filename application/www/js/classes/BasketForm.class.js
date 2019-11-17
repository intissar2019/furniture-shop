'use strict';


var BasketForm = function()
{
    this.$form          = $('#basket-form');
    this.$containerOrder  = $('#containerOrder');
    this.$validateOrder = $('#validate-order');
    this.$basket = $('#basket');

    this.basketSession = new BasketSession();
};









BasketForm.prototype.onClickValidateOrder = function()
{
    var formFields;

    /*
     * Préparation d'une requête HTTP POST, construction d'un objet représentant
     * les données de formulaire.
     *
     * Ainsi form.basketItems donnera du côté du serveur en PHP $formFields['basketItems']
     */
    formFields =
    {
        basketItems : this.basketSession.items
    };

    /*
     * Exécution d'une requête HTTP POST AJAJ (Asynchronous JavaScript And JSON)
     * pour valider la commande et procéder au paiement.
     */
    $.post
    (
        getRequestUrl() + '/order/validation',      // URL de destination
        formFields,                                 // Données HTTP POST
        this.onAjaxClickValidateOrder.bind(this)    // Au retour de la réponse HTTP
    );
};

BasketForm.prototype.onSubmitForm = function(event)
{
    
};

BasketForm.prototype.refreshOrderSummary = function()
{
    var formFields;

    /*
     * Préparation d'une requête HTTP POST, construction d'un objet représentant
     * les données de formulaire.
     *
     * Ainsi form.basketItems donnera du côté du serveur en PHP $formFields['basketItems']
     */
    formFields =
    {
        basketItems : this.basketSession.items
    };

    /*
     * Exécution d'une requête HTTP POST AJAH (Asynchronous JavaScript And HTML)
     * pour récupérer le contenu du panier sous la forme d'un document HTML.
     */
    $.post
    (
        getRequestUrl() + '/basket',                // URL de destination
        formFields,                                 // Données HTTP POST
        this.onAjaxRefreshOrderSummary.bind(this)   // Au retour de la réponse HTTP
    );
};

BasketForm.prototype.run = function()
{
  
  
 // Affichage initial du récapitulatif de la commande.
    this.$basket.on('click',this.refreshOrderSummary.bind(this));

    /*
     * Installation d'un gestionnaire d'évènement FUTUR sur le clic des boutons de
     * suppression d'un article du panier.
     *
     * A cet instant il n'y a pas de bouton puisque c'est refreshOrderSummary() qui
     * génère cette partie du document HTML. Il peut n'y avoir aucun bouton (panier
     * vide) comme il peut y en avoir une dizaine, un pour chaque article du panier.
     */
    this.$containerOrder.on('click', 'button', this.onClickRemoveBasketItem.bind(this));

    /*
     * Installation d'un gestionnaire d'évènement sur le clic du bouton de validation
     * de la commande.
     */
    this.$validateOrder.on('click', this.onClickValidateOrder.bind(this));


    // Installation d'un gestionnaire d'évènement sur la soumission du formulaire.
    this.$form.on('submit', this.onSubmitForm.bind(this));
    this.$form.find('[type=submit]').on('click', this.onSubmitForm.bind(this));

   


   
};

BasketForm.prototype.success = function()
{
    // Effacement du panier.
    this.basketSession.clear();
};