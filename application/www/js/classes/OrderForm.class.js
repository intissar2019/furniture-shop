'use strict';


var OrderForm = function()
{
    this.$form          = $('#order-form');
    this.$largeModal    = $('#largeModal');
    this.$validateOrder = $('#validate-order');
    this.$title         = $('#title');
    this.$id            = $('#id');
    this.$price         = $('#price');
    this.$quantity      = $('input[name=quantity]');
    this.$container     = $('#container');

    this.basketSession = new BasketSession();
};


OrderForm.prototype.onAjaxClickValidateOrder = function(result)
{
    var orderId;

    // Désérialisation du résulat en JSON contenant le numéro de commande.
    orderId = JSON.parse(result);

    // Redirection HTTP vers la page de demande de paiement de la commande.
    window.location.assign
    (
        getRequestUrl() + '/order/payment?id=' + orderId
    );
};

OrderForm.prototype.onAjaxRefreshOrderSummary = function(basketViewHtml)
{
    // Insertion du contenu du panier (la vue en PHP) dans le document HTML.
    this.$container.html(basketViewHtml);

};



OrderForm.prototype.onClickRemoveBasketItem = function(event)
{
    var $button;
    var productId;

    /*
     * Récupération de l'objet jQuery représentant le bouton de suppression sur
     * lequel l'utilisateur a cliqué.
     */
    $button = $(event.currentTarget);

    // Récupération du produit  relié au bouton.
    productId = $button.data('product-id');

    // Suppression du produit  du panier.
    this.basketSession.remove(productId);


    // Mise à jour du récapitulatif de la commande.
    this.refreshOrderSummary();


    /*
     * Par défaut les navigateurs ont pour comportement d'envoyer le formulaire
     * en requête HTTP à l'URL indiquée dans l'attribut action des balises <form>
     *
     * Il faut donc empêcher le comportement par défaut du navigateur.
     */
    event.preventDefault();
};

OrderForm.prototype.onClickValidateOrder = function()
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
  //  if(this.$form.data('validation-error-count') > 0)
  //  {
        // On ne fait rien, une ou des erreurs ont été trouvées dans le formulaire.
   //     return;
    //}
event.preventDefault();

    // Ajout de l'article dans le panier.
    this.basketSession.add
    (
        
        this.$id.text(),
        this.$title.text(),
        this.$quantity.val(),
        this.$price.text()
    );
 this.refreshOrderSummary();
    
   
};

OrderForm.prototype.refreshOrderSummary = function()
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

OrderForm.prototype.run = function()
{
    
    /*
     * Installation d'un gestionnaire d'évènement FUTUR sur le clic des boutons de
     * suppression d'un article du panier.
     *
     * A cet instant il n'y a pas de bouton puisque c'est refreshOrderSummary() qui
     * génère cette partie du document HTML. Il peut n'y avoir aucun bouton (panier
     * vide) comme il peut y en avoir une dizaine, un pour chaque article du panier.
     */
    this.$largeModal.on('click', 'button', this.onClickRemoveBasketItem.bind(this));

    /*
     * Installation d'un gestionnaire d'évènement sur le clic du bouton de validation
     * de la commande.
     */
    this.$validateOrder.on('click', this.onClickValidateOrder.bind(this));


    // Installation d'un gestionnaire d'évènement sur la soumission du formulaire.
    this.$form.on('submit', this.onSubmitForm.bind(this));
    this.$form.find('[type=submit]').on('click', this.onSubmitForm.bind(this));


    // Affichage initial du récapitulatif de la commande.
   
};

OrderForm.prototype.success = function()
{
    // Effacement du panier.
    this.basketSession.clear();
};