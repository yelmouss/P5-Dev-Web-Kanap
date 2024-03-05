const UrlApi = 'https://kanap-gold.vercel.app/api/products'
const Items = document.getElementById('items')

fetch(UrlApi).then(
    reponse => {
        if (!reponse.ok) {
            throw new Error('Network response was KO')
        }
        return reponse.json()
    }
).then(data => {
    data.forEach(element => {
        let Matemplate = `<a href="./product.html?id=${element._id}">
                        <article>
                        <img src="${element.imageUrl}" alt="">
                        <h3 class="productName">${element.name}</h3>
                        <p class="productDescription">${element.description}</p>
                        </article>
                     </a>`
        Items.innerHTML += (Matemplate)
    });
}).catch(error => {
    console.log(error)
    let HtmlErreur = document.createElement('h2')
    HtmlErreur.innerHTML = 'Network response was KO'
    Items.appendChild(HtmlErreur)

})