const axios = require('axios');

class Repository {
  constructor(config, owner, name) {
    this.axios = axios.create({
      baseURL: config.baseURL += `/repos/${owner}/${name}`,
      headers: {
        Authorization: config.Authorization,
      }
    });
  }

  get() {
    return this.axios.get();
  }

  getHooks() {
    return this.axios.get('/hooks');
  }

  createHook(param) {
    return this.axios.post('/hooks', params);
  }

  getCollaborators() {
    return this.axios.post('/collaborators');
  }

  getFile(filePath, params) {
    return this.axios.get(`/contents/${filePath}`, { params });
  }

  createCommentIssue(number, params) {
    return this.axios.post(`/issues/${number}/comments`, params);
  }

  assingUserToIssue(number, params) {
    return this.axios.post(`/issues/${number}/assignees`, params);
  }

  assignUserForReview(number, params) {
    return this.axios.post(`/pulls/${number}/requested_reviewers`, params);
  }
}

class GithubApi {
  constructor(apiKey) {
    this.baseURL = 'https://api.github.com';
    this.Authorization = `token ${apiKey}`;
    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: this.Authorization,
      }
    });
  }

  getRootEndpoint() {
    return this.axios.get();
  }

  repo(owner, name) {
    return new Repository({
      baseURL: this.baseURL,
      Authorization: this.Authorization,
    }, owner, name);
  }

  assignUserToPrForReview(owner, name, number, params) {
    return this.axios.post(`/repos/${owner}/${name}/pulls/${number}/requested_reviewers`, params);
  }
}

module.exports = GithubApi;
