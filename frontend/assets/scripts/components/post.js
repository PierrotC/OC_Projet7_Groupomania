app.component('post', {
    template:
    /* html */
    `
    <article v-for="post in posts" class="post">
    <p class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet purus neque, nec mattis dolor dignissim vel. Mauris ultricies vel nunc accumsan fermentum. Sed molestie fermentum suscipit. Vestibulum gravida, dui id sodales tincidunt, tortor magna maximus leo, sed convallis magna magna quis ante. Quisque tincidunt diam id nisl lobortis condimentum. Pellentesque odio erat, dictum sit amet varius eget, mollis et dui. Nunc at tempor urna, non ullamcorper ipsum. Praesent vehicula blandit lobortis. Phasellus nec justo ut nulla dapibus ullamcorper. In a elementum leo. Sed et cursus libero. Sed ac metus metus.
        
        Etiam congue vel orci sed viverra. Praesent ultrices neque non diam sodales pellentesque. Praesent eleifend nunc sem, at iaculis lacus mollis ut. Aenean sit amet egestas magna. Praesent ac elit felis. Sed egestas placerat metus et pharetra. Nullam placerat quam ut libero pharetra vulputate. Sed euismod aliquet elementum.
    </p>
    <div class="image">
        <img src="test.jpg" />
    </div>
    <div class="buttons">
        <button class="button">J'aime</button>
        <button class="button">Modifier</button>
        <button class="button">Supprimer</button>
    </div>
</article>
    `,
    methods: {
    },
    data() {
        return {
        }
    }
});