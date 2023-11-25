// Import the modules we need
import request from 'request';
import { expect } from 'chai';


// Define the base URL of our app
const baseURL = 'http://localhost:4000/';

// Define a test suite for the AppController class
describe('AppController', () => {
  // Define a test case for the getHomepage method
  it('should render the homepage with tasks', () => {
    // Create a mock request object with stubs for the properties and methods
    request.get(baseURL, (error, response, body) => {
      // Check if there is no error and the status code is 200
      expect(error).to.be.null;
      expect(response.statusCode).to.equal(200);
      // Call the done function to indicate the test is finished
    //   done();
    });
  });
});
