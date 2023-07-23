# Task - image search

# Create the front-end part of the application for searching and viewing images by keyword. Add design of interface elements. Watch a demo video of the application.

## Search form

- The form is initially contained in an HTML document. The user will enter a
  string for search in the text field, and after submitting the form, an HTTP
  request must be performed.

<form class="search-form" id="search-form">
   <input
     type="text"
     name="searchQuery"
     autocomplete="off"
     placeholder="Search images..."
   />
   <button type="submit">Search</button>
</form>

## HTTP requests

- For the backend, use the public API of the Pixabay service. Sign up, get it
  your unique access key and read the documentation.

### List of query string parameters that you must specify:

- key - your unique API access key.
- q - search term. What the user will type.
- image_type - image type. Only photos are needed, so post the value of photo.
- orientation - orientation of the photo. Set the value to horizontal.
- safesearch - age filter. Set the value to true.
- The response will contain an array of images that meet the criteria of the
  request parameters. Each image is described by an object, of which you are
  only interested in the following properties:

- webformatURL - link to a small image for the card list.
- largeImageURL - a link to a large image.
- tags - a line with a description of the image. Suitable for the alt attribute.
- likes - number of likes.
- views - number of views.
- comments - number of comments.
- downloads - number of downloads.
- If the backend returns an empty array, then there was nothing suitable found
  In this case, show a message with the text "Sorry, there are no images
  matching your search query. Please try again.". For messages use the notiflix
  library.

## Gallery and image card

The div.gallery element is initially contained in the HTML document and is
required render image card markup. When searching for a new keyword it is
necessary to completely clean the contents of the gallery so as not to mix the
results.

<div class="gallery">
   <!-- Image cards -->
</div>

- Single image card layout template for gallery.

<div class="photo-card">
   <img src="" alt="" loading="lazy" />
   <div class="info">
     <p class="info-item">
       <b>Likes</b>
     </p>
     <p class="info-item">
       <b>Views</b>
     </p>
     <p class="info-item">
       <b>Comments</b>
     </p>
     <p class="info-item">
       <b>Downloads</b>
     </p>
   </div>
</div>

## Pagination

The Pixabay API supports pagination and provides page and per_page parameters.
do so so that each response contains 40 objects (20 by default).

- The initial value of the page parameter must be 1.
- With each subsequent request, it must be increased by 1.
- In the case of searching for a new keyword, the page value must be returned to
  initial, as there will be pagination through the new collection of images.
  HTML the document already contains the markup of the button that needs to be
  executed when clicked query for the next group of images and add markup to
  existing ones gallery elements.

<button type="button" class="load-more">Load more</button>

- In the initial state, the button should be hidden.
- After the first request, the button appears in the interface under the
  gallery.
- When resubmitting the form, the button is first hidden, and then again after
  the request is displayed.
- In the response, the backend returns the totalHits property - the total number
  images that match the search criteria (for a free account). If the user has
  reached the end of the collection, hide the button and display a message from
  with the text "We're sorry, but you've reached the end of search results.".

# Additionally

## Message

- After the first request, with each new search, receive a message in which it
  will be written how many images were found (totalHits property). Text
  message - "Hooray! We found totalHits images."

## SimpleLightbox library

- Add display of large version of image with SimpleLightbox library for full
  gallery.

- In the markup, you will need to wrap each image card in a link, like specified
  in the documentation.
- The library contains the refresh() method, which must be called every time
  after adding a new group of image cards. In order to connect the CSS code
  library in the project, it is necessary to add one more import, in addition to
  the one described in documentation.

- Described in the documentation import SimpleLightbox from "simplelightbox";
- Additional import of styles import
  "simplelightbox/dist/simple-lightbox.min.css";
