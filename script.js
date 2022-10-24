let books = []; 

let awesomeBooks = document.getElementById('awesomeBooks');

function render(book){
    awesomeBooks.innerHTML += `
    <li id="${book.id}">
    <h3>${book.title}</h3>
    <h4>${book.author}</h4>
    <button class="btn">remove</button>
    <hr>  
    </li>
  
    `
}

function add(book){
    render(book)
    books.push(book)
    removeDom(awesomeBooks)
}

function removeDom(element){
    element.querySelectorAll('.btn').forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            let parent = e.target.parentNode;
            remove(parent.id)
            parent.remove();
        })
    })
}

function remove(id){
    books = books.filter(book=>book.id !== id)
}

document.querySelector('form').onsubmit = (e)=>{
        e.preventDefault();
        const {title,author} = e.target;
        add({
            id:Date.now().toString(),
            title:title.value,
            author:author.value,
        })
        e.target.title.value = "";
        e.target.author.value = "";
}



books.forEach(book=>render(book))
