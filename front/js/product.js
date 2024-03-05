// Récupérer l'ID mn l'URL
const params = new URLSearchParams(document.location.search);
const id = params.get("id");

// URL dyal l'API pour fetcher tous les produits
const apiUrl = "https://kanap-gold.vercel.app/api/products";

// Envoi de la requête l'API pour fetcher tous les produits
fetch(apiUrl)
    .then(response => {
        // Vérification de la réponse HTTP
        if (!response.ok) {
            throw new Error('Mreqtsh mabqawch');
        }
        // Convertir la réponse l JSON
        return response.json();
    })
    .then(products => {
        // Utilisation de la méthode find pour chercher l'élément par son ID
        const product = products.find(product => product._id === id);

        if (product) {
            console.log(product); // Afficher l'élément trouvé

            const itemImage = document.querySelector('.item__img')
            const ProductImage = document.createElement('img')
            ProductImage.setAttribute('alt', product.name + ' ' + 'image')
            ProductImage.setAttribute('src', product.imageUrl)
            itemImage.appendChild(ProductImage)

            const title = document.getElementById('title')
            title.innerHTML = product.name

            const price = document.getElementById('price')
            price.innerHTML = product.price

            const description = document.getElementById('description')
            description.innerHTML = product.description

            const colors = document.getElementById('colors')
            product.colors.forEach(color => {
                const MyColor = document.createElement('option')
                MyColor.setAttribute('value', color)
                MyColor.innerHTML = color
                colors.appendChild(MyColor)
            })

        } else {
            console.log("Ma 3ndna walou b l ID hadak.");
        }
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('M3a l error f fetch:', error);
    });


// Fonction pour ajouter un article l panier
function addToCart(product) {
    // Récupérer l'panier mn localStorage ou initialiser un panier vide
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Vérifier si un produit de même couleur existe déjà dans l'panier
    const existingProductIndex = cart.findIndex(item => item.name === product.name && item.color === product.color);

    if (existingProductIndex !== -1) {
        // Modifier la quantité du produit existant
        cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity) + parseInt(product.quantity);
    } else {
        // Ajouter le produit l panier
        cart.push(product);
    }

    // Mettre à jour localStorage b l'panier nouveau
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Écouter les clics l btn "Ajouter l panier"
const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', function() {
    // Récupérer les infos dyal l produit
    const productName = document.getElementById('title').innerHTML;
    const productPrice = document.getElementById('price').innerHTML;
    const productColor = document.getElementById('colors').value;
    const productQuantity = document.getElementById('quantity').value;

    // Vérifier si les champs mabghawch ikouno khawya
    if ( productColor.trim() === '' || productQuantity.trim() === '') {
        alert('mla2a4chi kayn f les champs 9bal ma t3jbouh.');
        return; // Stopper l'exécution si les champs sont khawya
    }

    // Créer un objet qui représente l produit à ajouter l panier
    const product = {
        name: productName,
        price: productPrice,
        color: productColor,
        quantity: productQuantity
    };

    // Ajouter l produit l panier
    addToCart(product);
});


// Mettre à jour l'affichage du nombre d'articles l panier lors du chargement dyal la page
const cart = JSON.parse(localStorage.getItem('cart')) || [];
// updateCartItemCount(cart.length);
