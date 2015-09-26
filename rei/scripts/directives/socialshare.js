'use strict';

app.directive('fbShare', [
          '$window', '$rootScope', function ($window, $rootScope) {
              return {
                  restrict: 'A',
                  scope: {
                    fbShare: '=?'
                  },
                  link: function (scope, element, attrs) {
                      if (!$window.FB) {
                          // Load Facebook SDK if not already loaded
                          $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                              $window.FB.init({
                                  appId: $rootScope.facebookAppId,
                                  xfbml: true,
                                  version: 'v2.0'
                              });
                              renderLikeButton();
                          });
                      } else {
                          renderLikeButton();
                      }

                    
                      function renderLikeButton() {
                          
                              element.html('<div class="fb-share-button"' + (!!scope.fbShare ? ' data-href="' + scope.fbShare + '"' : '') + ' data-layout="button" data-share="true"></div>');
                              $window.FB.XFBML.parse(element.parent()[0]);
                         
                      }
                  }
              };
          }
      ]);