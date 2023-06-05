# React homework template
1 - Contact Book.
Take your solution to the assignment from the previous homework and add storage phonebook contacts to `localStorage'. Use lifecycle methods.

When you add and delete a contact, the contacts are stored in the local storage.
When the application is loaded, contacts, if any, are read from local storage and are written to the state.
2 - Image Search.
Write a keyword image search application. Preview of a working application see link.

Create components <Searchbar>, <ImageGallery>, <ImageGalleryItem>, <Loader>, <Button> и <Modal>. Ready styles of components can be taken in file styles.css and tweak them if needed.

component preview
Pixabay API instructions
For HTTP requests, use a public image search service Pixabay. Register and get a private access key.

The URL string of the HTTP request.

https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

Pixabay API supports pagination, by default the page parameter is set to 1. Let the response comes with 12 objects each, set to per_page. Don't Remember that when you search for a new keyword, you have to reset the value of page to 1.

The response from the api comes an array of objects in which you are only interested in the following properties.

id - a unique identifier
webformatURL - link to the small image for the list of cards
largeImageURL - link to the large image for the modal window
Description of the component <Searchbar>.
The component takes one prop onSubmit - a function to pass the value of the iput When the form is submitted. Creates a DOM element of the following structure.

<header class="searchbar">
  <form class="form">
    <button type="submit" class="button">
      <span class="button-label">Search</span>
    </button>

    <input
      class="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </form>
</header>

Description of the <ImageGallery> component.
A list of image cards. Creates a DOM element of the following structure.

<ul class="gallery">
  <! -- Set <li>
  with images -->
</ul>

Description of the component <ImageGalleryItem>.
A list item component with an image. Creates a DOM element of the following structure.

<li class="gallery-item">
  <img src="" alt="" />
</li>

Description of the <Button> component
Pressing the Load more button should load the next batch of Images and rendered with the previous ones. The button should be rendered only when there are some loaded images. If the image array is empty, the button is not rendered.

Description of the <Loader> component.
Spinner component, displays while images are being loaded. Use any ready made component, e.g. react-loader-spinner.

Description of the component <Modal>.
When you click on a gallery item a modal window with a dark overlay and display a larger version of the image. The modal window should be closed.

The appearance is similar to the functionality of this VanillaJS-plugin, only instead of white modal window the image is rendered (in the example press Run). Animation is not required.

<div class="overlay">
  <div class="modal">
    <img src="" alt="" />
  </div>
</div>
