'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');
var projectName = 'unfpa-lac';

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    project: projectName,
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    project: projectName,
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  },
  'iphone5': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Apple iPhone 5'
      }
    }
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://lac.unfpa.org';

var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      .pause(2000)
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude:
          [
            // Carousel.
            '.carousel',
            '.slider-for',
            '.slick-track a img',
            // Video.
            '.views-field-field-video',
            '.videos-home-sub-list img',
            // Publications.
            '.pane-vw-publications img',
            // Side banners.
            '.side_banners a',
            // News image.
            '.news-img',
          ],
        remove:
          [
            // News.
            '.news-body',
            // Publications.
            '.pane-vw-publications .title',
            '.pane-vw-publications .summary',
            '.views-field-title'
          ],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the news page',function(done) {
    client
      .url(baseUrl + '/news')
      .webdrivercss(testName + '.news', {
        name: '1',
        exclude:
          [
            // Article.
            '.item img',
          ],
        remove:
          [
            // Date and news type.
            '.left',
            // Article
            '.item .right',
            // Video
            '.views-field-title'
          ],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the publications page',function(done) {
    client
      .url(baseUrl + '/publications')
      .webdrivercss(testName + '.publications', {
        name: '1',
        exclude:
          [
            // Article.
            '.left img',
          ],
        remove:
          [
            // Article.
            '.right .title',
            '.right p',
            '#stcpDiv',
          ],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });

  it('should show the videos page',function(done) {
    client
      .url(baseUrl + '/videos')
      .webdrivercss(testName + '.videos', {
        name: '1',
        exclude:
          [
            // Main video.
            '.player .video-wrap',
            // Video thumbnail.
            '.view-id-vw_video img'
          ],
        remove:
          [
            // Social.
            '.stBubble',
            // Video thumbnail.
            '.view-id-vw_video h3',
            '.view-id-vw_video .pub-date'
          ],
        hide: [],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });
});
