const awesomeBooks = document.getElementById('awesomeBooks');

class Book {
  constructor(awesomeBooks) {
    this.awesomeBooks = awesomeBooks;
    this.books = [];
  }

  updateLocalstorage() {
    localStorage.setItem('bokLibrarie', JSON.stringify(this.books));
  }

  remove(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.updateLocalstorage();
  }

  removeDom(element) {
    element.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parent = e.target.parentNode;
        this.remove(parent.id);
        parent.remove();
      });
    });
  }

  render(book) {
    this.awesomeBooks.innerHTML += `
    <li id="${book.id}">
    <p><span>${book.title}</span> by <span>${book.author}</span>.</p>
    <button class="btn">Remove</button>
</li>
      
        `;
    this.removeDom(awesomeBooks);
  }

  add(book) {
    this.render(book);
    this.books.push(book);
    this.removeDom(awesomeBooks);
    this.updateLocalstorage();
  }
}

const library = new Book(awesomeBooks);

document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
  const error = document.getElementById('error');
  const { title, author } = e.target;
  if (title.value.length < 3 || author.value.length < 3) {
    error.innerHTML = 'input field should contain minimum of three characters!';
    setTimeout(() => {
      error.innerHTML = '';
    }, 3000)
  } else {
    error.innerHTML = '';
    library.add({
      id: Date.now().toString(),
      title: title.value,
      author: author.value,
    });
    e.target.title.value = '';
    e.target.author.value = '';
  }
};

if (localStorage.getItem('bokLibrarie')) {
  library.books = JSON.parse(localStorage.getItem('bokLibrarie'));
} else {
  localStorage.setItem('bokLibrarie', JSON.stringify([]));
}

library.books.forEach((book) => library.render(book));