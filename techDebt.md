* `GET /posts/:id`
  * responds with a post by id
  * should include the populated user
  * should include all comments associated with the post (populated with commenter)

  * `GET /posts/popular`
  * respond with a list of the 10 posts with the most comments

* BONUS:
  * `GET /users/popular`
    * respond with the 10 users with the most total comments on their posts
  * `GET /users/prolific`
    * respond with the 10 users with the most posts
  * `GET /users/leader`
    * respond with the 10 users with the most comments
  * `GET /users/impact`
    * respond with the 10 users with the highest `$avg` comments per post

    