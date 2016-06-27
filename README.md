# Web-Service

CDF: g5natjia

email: nathan.jia@mail.utoronto.ca

All the HTTP requests are organized under a class NytimesApi.

Two types of requests are used.

POST:

1. nytimesApi.login();
It is used to allow users to sign up (if the username does not exist) or log in.
Usernames and passwords are not encrypted and are simply stored in arrays.

2. nytimesApi.submitFeedback();
It is used to allow users to submit feedback regarding this webpage. Information 
will not be stored.

GET:

1. nytimesApi.getTextArticles();
This is used to get all the articles in basic text format, including published dates, titles, abstracts, and short urls.

2. nytimesApi.getAuthors();
This is used retrieve a list of authors. Authors for the same article will be displayed
in a single line.

3. nytimesApi.getURLs();
This is used to retrieve a list of urls grouped by published dates. Dates are not sorted.

4. nytimesApi.getTags();
This is used to retrieve all the tags, displayed in the form of tag cloud, i.e. tags
with higher frequency will show a larger font size.

5. nytimesApi.getArticle(idx);
This is used to retrieve detailed information about a specific article, given article
index.

6. nytimesApi.getMediaArticles();
This is used to retrieve all articles in the form of hyperlinked images. Images are linked
to the original articles.
