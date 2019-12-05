// Require necessary NPM packages
const express = require('express');

// Instantiate a Ruoter (mini app that only handles routes)
const router = express.Router();

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/articles
 * Description: Get All Articles
 */
router.get('./api/articles', (req, res) => {
    Article.find().then((articles)=>{
    res.status(200).json({ message: 'Get All Articles' });
})
});

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/articles/:Id
 * Description: Get An Article by Article ID
 */

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/articles
 * Description: Create a new Article
 */

/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/articles/:id
 * Description: Update an Article by Article ID
 */


/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:         /api/articles/:id
 * Description: Delete an Article by Article ID
 */

//Export the Router so we can use it in the server.js file
module.exports = router;