'use strict';

/**
 * Module dependencies.
 */
var policy = require('../policies/generic.server.policy'),
  issues = require('../controllers/issues.server.controller'),
  solutions = require('../controllers/solutions.server.controller'),
  actions = require('../controllers/actions.server.controller'),
  comments = require('../controllers/comments.server.controller'),
  votes = require('../controllers/votes.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/issues').all(policy.isAllowed)
    .get(issues.list)
    .post(issues.create);

  app.route('/api/solutions').all(policy.isAllowed)
    .get(solutions.list)
    .post(solutions.create);

  app.route('/api/comments').all(policy.isAllowed)
    .get(comments.list)
    .post(comments.create);

  app.route('/api/votes').all(policy.isAllowed)
    .get(votes.list)
    .post(votes.updateOrCreate);

  app.route('/api/actions').all(policy.isAllowed)
    .get(actions.list)
    .post(actions.create);

  // Single article routes
  app.route('/api/issues/:issueId').all(policy.isAllowed)
    .get(issues.read)
    .put(issues.update)
    .delete(issues.delete);

  app.route('/api/solutions/:solutionId').all(policy.isAllowed)
    .get(solutions.read)
    .put(solutions.update)
    .delete(solutions.delete);

  app.route('/api/comments/:commentId').all(policy.isAllowed)
    .get(comments.read)
    .put(comments.update)
    .delete(comments.delete);

  app.route('/api/votes/:voteId').all(policy.isAllowed)
    .get(votes.read)
    .put(votes.update)
    .delete(votes.delete);

  app.route('/api/actions/:actionId').all(policy.isAllowed)
    .get(actions.read)
    .put(actions.update)
    .delete(actions.delete);

  // Finish by binding the article middleware
  app.param('issueId', issues.issueByID);
  app.param('solutionId', solutions.solutionByID);
  app.param('actionId', actions.actionByID);
  app.param('commentId', comments.commentByID);
  app.param('voteId', votes.voteByID);
};
