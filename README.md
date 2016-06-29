# Web-Service

cdf: g5natjia

email: nathan.jia@mail.utoronto.ca

Eight RESTful APIs are available for use. The first six can be accessed using HTTP GET requests, while the last two require
HTTP POST requests.

Note: the format of published_date would be YYYY-MM-DDTHH:MM:SS-MM:SS, where the "T" in the middle stands for time, and minutes and seconds are a range.

## GET:

1. 
  * url: /text-articles;
  * return: a list of articles;
  * fields: title, abstract, published_date, and short_url.

2. 
  * url; /authors; 
  * return: a list of authors;
  * field: author;
  * note: One author field may contain more than one authors, separated by " And ".

3. 
  * url: /urls;
  * return: a list of urls grouped by published dates;
  * fields: published_date, short_urls;
  * note: published dates are not sorted.

4. 
  * url: /tags;
  * return: a list of all the tags;
  * field: des_facet;
  * note: some tags may appear more than once.

5. 
  * url: /article/ + index;
  * return: an article specified by index;
  * fields: section, subsection, title, abstract, byline, published_date, des_facet;
  * note: 
    * index should be a positive interger;
    * null is returned if index is not valid;
    * returned value is enclosed in index 0 of an array, so use [0] to access it

6. 
  * url: /media-articles;
  * if multimedia(images) exist:
    * return: a list of articles with images and url linking to the original article;
    * fields: multimedia, short_url;
      * subfields of multimedia: url, caption, width, height;
    * note: multimedia may contain more than one images;
  * else:
    * return: a list of articles with title and url linking to the original article;
    * fields: title, short_url.

## POST:

1. 
  * url: /;
  * funcion: allow users to sign up (if the username does not exist) or log in;
  * return: 
    * "Signed up";
    * "Logged in";
    * "Wrong password";
  * note: 
    * highly recommend using a form to transfer the information;
    * when setting up the form, the username should have name uname, and the password should have pwd as name;
    * passwords are hashed at server-side using a hash function similar to hashCode() in Java.

2. 
  * url: /feedback;
  * function: allow users to submit feedback regarding this webpage, which will not associated with this user;
  * return: none;
  * note: only logged in users can submit feedback; this is to prevent spam.
