// Require necessary NPM Packages
const express = require('express');
// Require Mongoose Model for Article
const Article = require('../models/article');
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/articles
 * Description: Get All Articles
 */
router.get('/api/articles', (req, res) => {
    Article.find()
        // Return all Articles as an Array
        .then((articles) => {
            res.status(200).json({ articles: articles });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});
/**
* Action:       SHOW
* Method:       GET
* URI:          /api/articles/5d664b8b68b4f5092aba18e9
* Description:  Get An Article by Article ID
*/
router.get('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
        .then((article) => {
            if (article) {
                //Pass the result of Mongoose's `.get` method to the next `.then`
                res.status(200).send(article);
            } else {
                //if we couldn't find a document with matching ID
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided ID doesn\'t match any document'
                    }
                })
            }
        })
        //catch any error that might accur
        .catch((error) => {
            res.status(500).json({ error: error });
        })
})

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/articles
 * Description: Create a new Article
*/
router.post('/api/articles', (req, res) => {
    Article.create(req.body.article)
        // On a successful `create` action, respond with 201
        // HTTP status and the content of the new article.
        .then((newArticle) => {
            res.status(201).json({ article: newArticle });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});
/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:          /api/articles/5d664b8b68b4f5092aba18e9
 * Description:  Update An Article by Article ID
 */
router.patch('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
        .then((article) => {
            if (article) {
                //Pass the result of Mongoose's `.update` method to the next `.then`

                return article.update()
            } else {
                //if we couldn't find a document with matching ID
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided ID doesn\'t match any document'
                    }
                })
            }
        })
        .then((article) => {
            //if the update succeeded, return 204 and no JSON
            res.status(200).send(article);
        })
        //catch any error that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        })
})

/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:          /api/articles/5d664b8b68b4f5092aba18e9
 * Description: Delete An Article by Article ID
 */

router.delete('/api/articles/:id', (req, res) => {
    Article.findById(req.params.id)
        .then((article) => {
            if (article) {
                //Pass the result of mongoose's .delete
                return article.remove();

            } else {
                // If we couldn't find a dicument with matching ID
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided ID doesn\'t match any documents'
                    }
                })
            }
        })

        .then(() => {
            //If the deleting succeeded, return 204 and no JSON
            res.status(204).end();
        })

        // Chatch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error })
        })
})

// Export the Router so we can use it in the server.js file
module.exports = router;