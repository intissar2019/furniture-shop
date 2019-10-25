'use strict';

/////////////////////////////////////////////////////////////////////////////////////////
// FONCTIONS                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////

function runFormValidation()
{
    var $form;
    var formValidator;

    $form = $('form:not([data-no-validation=true])');

    // Y a t'il un formulaire à valider sur la page actuelle ?
    if($form.length == 1)
    {
        // Oui, exécution de la validation de formulaire.
        formValidator = new FormValidator($form);
        formValidator.run();
    }
}

function runOrderForm()
{
    var orderForm;
    var orderStep;

    orderForm = new OrderForm();

    // A quelle étape de la commande sommes-nous ?
    orderStep = $('[data-order-step]').data('order-step');

    switch(orderStep)
    {
        case 'run':
        orderForm.run();        // Commande en cours
        break;

        case 'success':
        orderForm.success();    // Succès du paiement de la commande
        break;
    }
}



/////////////////////////////////////////////////////////////////////////////////////////
// CODE PRINCIPAL                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////

$(function()
{
    // Effet spécial sur la boite de notifications (le flash bag).
    $('#notice').delay(3000).fadeOut('slow');


    // Exécution de la validation de formulaire si besoin.
    runFormValidation();

    // Exécution de la gestion du processus de commande si besoin.
    if(typeof OrderForm != 'undefined')
    {
        runOrderForm();
    }
});