import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all current companies data. */

  static async getCompanies() {
    let res = await this.request('companies');
    return res.companies;
  }

  /** Find a company via company name. */

  static async findCompanies(searchTerm) {
    let query = { name: searchTerm };
    let res = await this.request('companies', query);
    return res.companies;
  }

  /** Get all current jobs data. */

  static async getJobs() {
    let res = await this.request('jobs');
    return res.jobs;
  }

  /** Get job data via the job id. */
  static async getJobData(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Find a job via job title. */

  static async findJobs(searchTerm) {
    let query = { title: searchTerm };
    let res = await this.request('jobs', query);
    return res.jobs;
  }

  /** Get user details by username. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;

  }

  /** Register a new user. */

  static async register(userData) {
    let res = await this.request('auth/register', userData, 'post');
    return res.token;
  }

  /** Authenticate an existing user. */

  static async authenticate(userData) {
    let res = await this.request('auth/token', userData, 'post');
    return res.token;
  }

  /** Update data for an existing user. */

  static async updateUser(username, userData) {
     let res = await this.request(`users/${username}`, userData, 'patch');
     return res.user
  }

  /** Submit a user's job application. */

  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
    return res.jobId
  }
  
}

JoblyApi.token = null;

export default JoblyApi;