/////////////////////////////////////////////////////////////////////////////
//  Nom fichier: IndAnimation.js                                           //
//  Auteur: Alexandre Homier                                               //
//  Description: Ajout d'animation, non implémenté                         //
//  Date: 25 mai 2022                                                      //
/////////////////////////////////////////////////////////////////////////////
class IndAnimation {
    constructor() {}

    addAnimation(id, x, y, object) {
        object.position.x = x;
        object.position.z = y;
    }

    tick() {}
}