'use strict';

var BasketSession = function()
{
    // Contenu du panier.
    this.items = null;

    this.load();
};

BasketSession.prototype.get = function(){

    var basket= localStorage.getItem('panier');
    console.log(basket);

}
BasketSession.prototype.add = function(productId, name, quantity, salePrice)
{
    var index;

    // Conversion explicite des valeurs spécifiées en nombres.
    productId = parseInt(productId);
    quantity  = parseInt(quantity);
    salePrice = parseFloat(salePrice);

    // Recherche de le produit spécifié.
    for(index = 0; index < this.items.length; index++)
    {
        if(this.items[index].productId == productId)
        {
            // Le produit spécifié a été trouvé, mise à jour de la quantité commandée.
            this.items[index].quantity += quantity;

            this.save();

            return;
        }
    }

    // Le produit spécifié n'a pas été trouvé, ajout au panier.
    this.items.push(
    {
        productId  : productId,
        name      : name,
        quantity  : quantity,
        salePrice : salePrice
    });

    this.save();
};

BasketSession.prototype.clear = function()
{
    // Destruction du panier dans le DOM storage.
    saveDataToDomStorage('panier', null);
};

BasketSession.prototype.isEmpty = function()
{
    return this.items.length == 0;
};

BasketSession.prototype.load = function()
{
    // Chargement du panier depuis le DOM storage.
    this.items = loadDataFromDomStorage('panier');

    if(this.items == null)
    {
        this.items = new Array();
    }
};

BasketSession.prototype.remove = function(productId)
{
    var index;

    // Recherche de le produit spécifié.
    for(index = 0; index < this.items.length; index++)
    {
        if(this.items[index].productId == productId)
        {
            // Le produit spécifié a été trouvé, suppression.
            this.items.splice(index, 1);

            this.save();

            return true;
        }
    }

    return false;
};

BasketSession.prototype.save = function()
{
    // Enregistrement du panier dans le DOM storage.
    saveDataToDomStorage('panier', this.items);
};