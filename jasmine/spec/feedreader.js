/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', () => {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('allFeeds Array has URL and not empty', () => {
      allFeeds.forEach((item) => { //Loop through allFeeds
        expect(item.url).toBeDefined();
        expect(item.url.length).not.toBe(0);
      });
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('allFeeds Array has NAME and not empty', () => {
      allFeeds.forEach((item) => { //Loop through allFeeds
        expect(item.name).toBeDefined();
        expect(item.name.length).not.toBe(0);
      });
    });
  });





  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', () => {
    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('menu hidden by default', () => {  //Check if menu is hidden by default
      expect($('body').hasClass('menu-hidden')).toEqual(true);
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('menu toggles', () => {  //Check if menu toggles states
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toEqual(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toEqual(true);
    });
  });





  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', () => {
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    beforeEach((done) => {
      loadFeed(0, () => { //Run the loadFeed function BEFORE test spec
        done();
      });
    });

    it('at least one .entry element in .feed container', () => {
      const myFeed = $("div.feed .entry"); //Get entry Children list
      expect(myFeed.length).toBeGreaterThan(0); //Make sure list is not empty
    });
  });





  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', () => {
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    let initialLoad;
    let secondLoad;

    beforeEach((done) => {
      loadFeed(0, () => { //Run the load feed function and store first entity
        initialLoad = $("div.feed").html(); //Caputure first entity info
        loadFeed(1, () => { //Load 2nd entity and THEN process spec
          done();
        });
      });
    });

    // Compare initial .feed list to .feed list AFTER it has loaded
    it('.entry content actually changes', () => {
      secondLoad = $("div.feed").html();
      expect(secondLoad).not.toBe(initialLoad);
    });

  });

}());
