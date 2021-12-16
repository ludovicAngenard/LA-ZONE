# LA-ZONE
site de vente en ligne

Projet créer par :
  - ANGENARD Ludovic
  - BLESSING Arnaud
  
 Pour que l'application fonctionne correctement il faut au préalable enregistrer des produits / catégories dans notre base de données
 
 Les catégories possèdent cette structure :

categories :
  -name (string)
  -image(string) > Le champs image correspond a l'url d'hébergement de l'image.
  
  Les produits possèdent cette structure :
  
products :
  -brand (string)
  -category (string) > correspond a l'id du document categories correspondant
  -description (string)
  -image (array)
    [0] (string) > Le champs correspond a l'url d'hébergement de l'image.
    [1] (string) > Le champs correspond a l'url d'hébergement de l'image.
    [2] (string) > Le champs correspond a l'url d'hébergement de l'image.
  -name (string)
  -price (number)
  
  
 endpoint possible :
 /register
 /connect
 /product-list
 /product/{productId}
 /panier
 /profile
 /whish-list
