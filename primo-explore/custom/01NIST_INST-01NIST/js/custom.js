(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);


app.controller('someController', ['angularLoad', function (angularLoad) {
    angularLoad.loadScript('/primo-explore/custom/01NIST_INST-01NIST/js/discovery-showcase.bundled.js');
    }]);

/*----------below is the code for Servicenow item level help link-----------*/

       app.controller('prmActionContainerAfterController', [function () {
        var vm = this;

        this.$onInit = function(){
            {

        vm.getPermalink = getPermalink;

        function getPermalink() {
            var permalink = encodeURIComponent(window.location.href);

            var formField = 'https://nist.servicenowservices.com/library?id=sc_cat_item&sys_id=529edfea1b795410348d9605bc4bcb66&referring_url=';
            formField += permalink;
           return formField;
        }
            }
        };
    }]);

    app.component('prmActionContainerAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'prmActionContainerAfterController',
        template: '<div id="report-problem" layout="row" layout-align="center center"><a id="problemLink" target="_blank" href="{{$ctrl.getPermalink()}}" title="Report a problem"><img src="/discovery/custom/01NIST_INST-01NIST/img/icon_warning.png">&nbsp;&nbsp;Report a problem with this item</a></div>'
    });

                /*----------Servicenow item level help link ends here-----------*/

                /*----------Alert After Search Bar BEGIN-----------*/
/*     app.component('myInstitutionComponent', {
        template: `<span style="margin-left: 40%;">Starting soon, <b>Sign in</b> will use the new <a href="https://inet.nist.gov/pao/drupal-documentation/okta-login-process" target="_blank">OKTA authentication method.</a></span>`
    });

    app.component('prmSearchBarAfter', {
        bindings: {parentCtrl: `<`},
        template: `<my-institution-component></my-institution-component>`

});
 */
                /*----------Alert After Search Bar END-----------*/


                /*------------Collection Discovery author and date display------------*/
                app.component('prmGalleryItemAfter', {
                  bindings: {
                  parentCtrl: '<'
                  },
                  controller: function () {
                  var $ctrl = this;
                  $ctrl.$onInit = function () {
                  try {
                  $ctrl.author = $ctrl.parentCtrl.item.pnx.addata.au[0];
                  } catch (e) {
                  $ctrl.author = '';
                  }
                  try {
                  $ctrl.date = $ctrl.parentCtrl.item.pnx.display.creationdate[0];
                  } catch (e) {
                  $ctrl.date = '';
                  }
                  $ctrl.hasDate = !!$ctrl.date;
                  $ctrl.hasAuthor = !!$ctrl.author;
                  };
                  },
                  template: `
                  <div ng-if="$ctrl.hasDate">{{$ctrl.date}}</div>
                  <div ng-if="$ctrl.hasAuthor">{{$ctrl.author}}</div>
                  `,
        });

/* Carousel Showcase script */
function loadJS(FILE_URL, async = true) {
  let scriptEle = document.createElement("script");
  scriptEle.setAttribute("src", FILE_URL);
  scriptEle.setAttribute("type", "module");
  scriptEle.setAttribute("async", async);
  document.body.appendChild(scriptEle);
  // success event
  scriptEle.addEventListener("load", () => {
      console.log("File loaded")
  });
  // error event
  scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file", ev);
  });
}
loadJS('/discovery/custom/01NIST_INST-01NIST/js/discovery-showcase.bundled.js')
//var app = angular.module('viewCustom', ['angularLoad']);

// External search links - External Services created by Ithaca College
app.controller("externalLinkController", [function ($stateParams, $state) {
    this.$onInit = function () {
      {
        var spaceToPlus = function spaceToPlus(str) {
          return str.replace(/\s+/g, "+");
        };

        var convertToChips = function convertToChips(primoSearch) {
          var chipsSearchString = "";
          if (!Array.isArray(primoSearch)) {
            chipsSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
          } else {
            for (var i = 0; i < primoSearch.length; i++) {
              var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
              var conjunction = primoSearch[i].split(/,/)[3] || "";
              switch (primoSearch[i].split(/,/)[0]) {
                case "title":
                  chipsSearchString += "TI+(" + searchTerms + ")";
                  break;
                case "creator":
                  chipsSearchString += "AU+(" + searchTerms + ")";
                  break;
                case "sub":
                  chipsSearchString += "SU+(" + searchTerms + ")";
                  break;
                default:
                  // handles 'any' case
                  chipsSearchString += "(" + searchTerms + ")";
              }
              if (i !== primoSearch.length - 1) {
                chipsSearchString += "+" + conjunction + "+";
              }
            }
          }
          return chipsSearchString;
        };

        var convertToWorldCat = function convertToWorldCat(primoSearch) {
          var worldCatSearchString = "";
          if (!Array.isArray(primoSearch)) {
            worldCatSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
          } else {
            for (var i = 0; i < primoSearch.length; i++) {
              var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
              var conjunction = primoSearch[i].split(/,/)[3] || "";
              switch (primoSearch[i].split(/,/)[0]) {
                case "title":
                  worldCatSearchString += "ti:" + searchTerms;
                  break;
                case "creator":
                  worldCatSearchString += "au:" + searchTerms;
                  break;
                default:
                  worldCatSearchString += "kw:" + searchTerms;
              }
              if (i !== primoSearch.length - 1) {
                worldCatSearchString += "+";
              }
            }
          }
          return worldCatSearchString;
        };

        var convertToGoogle = function convertToGoogle(primoSearch) {
          var googleSearchString = "";
          if (!Array.isArray(primoSearch)) {
            googleSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
          } else {
            for (var i = 0; i < primoSearch.length; i++) {
              var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
              var conjunction = primoSearch[i].split(/,/)[3] || "";
              googleSearchString += "(" + searchTerms + ")";
              if (i !== primoSearch.length - 1) {
                googleSearchString += "+" + conjunction + "+";
              }
            }
          }
          return googleSearchString;
        };

        // function convertToNewspaper(primoSearch) {
        //   let newspaperSearchString = '';
        //   if (!Array.isArray(primoSearch)) {
        //     newspaperSearchString = spaceToPlus(primoSearch);
        //   } else {
        //     for (let i=0; i<primoSearch.length; i++) {
        //       let bit = primoSearch[i].replace(/contains/g, '');
        //       newspaperSearchString += spaceToPlus(bit) + ',';
        //     }
        //   }
        //   return newspaperSearchString;
        // }

        // get the view for image paths
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        this.view = urlParams.get("vid").replace(":", "-");

        var primoSearch = this.parentCtrl.$stateParams.query; // can be a string OR array!

        //var proxyString = "login?url=";

        var chipsSearchString = convertToChips(primoSearch);
        var googleSearchString = convertToGoogle(primoSearch);
        var worldCatSearchString = convertToWorldCat(primoSearch);
        // const npSearchString = convertToNewspaper(primoSearch);

        // this.newspaperLabel = 'Newspapers';
        // const newspaperBase = 'https://ithaca.primo.exlibrisgroup.com/discovery/npsearch?vid=01ITHACACOL_INST:01ITHACACOL_V1&lang=en&search_scope=MyInst_and_CI';
        // this.newspaperSearchUrl = newspaperBase + '&query=' + npSearchString;

        this.chipsLabel = "CHIPS Lit";
        var chipsBaseUrl = "https://inet.nist.gov/library/references?s=";
        var chipsSuffixUrl = "&k=&a=&type=All&y=All&items_per_page=10"
        var chipsSearchUrl = chipsBaseUrl + chipsSearchString + chipsSuffixUrl;
        this.chipsSearchUrl = chipsSearchUrl;

        this.googleLabel = "Google Scholar";
        var googleBaseUrl = "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C33&inst=7210957415625843320&q=";
        this.googleSearchUrl = googleBaseUrl + googleSearchString;

        this.worldCatLabel = "WorldCat";
        var worldCatBaseUrl = "https://www.worldcat.org/search?qt=worldcat_org_all&q=";
        this.worldCatSearchUrl =  worldCatBaseUrl + worldCatSearchString;
      }
    };
  }]);
  app.component("prmSearchResultListAfter", {
    bindings: { parentCtrl: "<" },
    controller: "externalLinkController",
    template: '<div id="ic-external-links"><h3 ng-class="section-title-header"><span>Try My Search In</span></h3><div id="ic-ebsco-link-block"><a href="{{$ctrl.chipsSearchUrl}}" target="_blank" id="ic-ebsco-link"><img src="custom/{{$ctrl.view}}/img/ebsco.svg" alt=""> {{$ctrl.chipsLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-google-link-block"><a href="{{$ctrl.googleSearchUrl}}" target="_blank" id="ic-google-link"><img src="custom/{{$ctrl.view}}/img/google.svg" alt=""> {{$ctrl.googleLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-worldcat-link-block"><a href="{{$ctrl.worldCatSearchUrl}}" target="_blank" id="ic-worldcat-link"><img src="custom/{{$ctrl.view}}/img/WorldCat.svg" alt=""> {{$ctrl.worldCatLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div></div>'
  });

// No Results Page Changes

app.controller('prmNoSearchResultAfterController', [function() {
    var vm = this;

    this.$onInit = function(){
      {
        vm.getSearchTerm = getSearchTerm;
        function getSearchTerm() {
          return vm.parentCtrl.term;
        }
      }
    };
}]);

app.component('prmNoSearchResultAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmNoSearchResultAfterController',
  template: '<md-card class="default-card zero-margin _md md-primoExplore-theme">\
    <md-card-title>\
      <md-card-title-text>\
        <span translate="" class="md-headline ng-scope">No records found.</span>\
      </md-card-title-text>\
    </md-card-title>\
    <md-card-content>\
      <p><span>There are no results matching your search: <i>{{$ctrl.getSearchTerm()}}</i>. </span></p>\
      <p><span translate="" class="bold-text ng-scope">Common Troubleshooting:</span></p>\
      <ul>\
        <li>Try your search again with<a href="https://nist.primo.exlibrisgroup.com/discovery/search?query=any,contains,{{$ctrl.getSearchTerm()}}&tab=Everything&search_scope=MyInst_and_CI&vid=01NIST_INST:01NIST&lang=en&offset=0&pcAvailability=true"> "Expand My Results."</a></li>\
        <li>Make sure that all words are spelled correctly.</li>\
        <li>Try different keywords.</li>\
        <li>Try broader search terms.</li>\
        <li >If your original search was filtered, try clearing your filters to improve your results.</li>\
        </ul>\
      <p><span translate="" class="bold-text ng-scope">Try My Search In:</span></p>\
      <ul>\
        <li><a href="https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={{$ctrl.getSearchTerm()}}" target="_blank">IEEE Xplore</a></li>\
        <li><a href="https://www.sciencedirect.com/search?qs={{$ctrl.getSearchTerm()}}" target="_blank">ScienceDirect</a></li>\
        <li><a href="https://pubmed.ncbi.nlm.nih.gov/?term={{$ctrl.getSearchTerm()}}" target="_blank">PubMed</a></li>\
        <li><a href="https://mathscinet.ams.org/mathscinet/publications-search?query={{$ctrl.getSearchTerm()}}&page=1&size=20&sort=newest&facets=" target="_blank">MathSciNet</a></li>\
        <li><a href="https://app.knovel.com/kn/search?include_synonyms=off&page=0&query={{$ctrl.getSearchTerm()}}" target="_blank">Knovel</a></li>\
        <li><a href="https://inet.nist.gov/mr/library/research-tools" target="_blank">Other NIST Research Tools</a></li>\
      </ul>\
      <p><span translate="" class="bold-text ng-scope">Need more help?</span></p>\
      <ul>\
        <li>Email the NIST Library at <a href="mailto:library@nist.gov">library@nist.gov</a>.</li>\
      </ul>\
    </md-card-content>\
  </md-card>'
});

/* Display message on authority search page */
app.component('prmAuthoritySearchAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmAuthoritySearchAfterController',
    template: '<div id="authority-search" layout="row" layout-align="center center">The NIST Library & Museum is not using this feature. Please try your search in <a href="https://nist.primo.exlibrisgroup.com/discovery/search?vid=01NIST_INST:01NIST">NIST Library Search</a></div>'

});

//START - Google Analytics
//STANDARD CODE with edit to first line from 'async src' to 'googleAnalyticsUrl.src'

// var googleAnalyticsUrl = document.createElement('script');
// googleAnalyticsUrl.src ="https://www.googletagmanager.com/gtag/js?id=G-4KM704R98T";
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}  gtag('js', new Date());
// gtag('config', 'G-4KM704R98T');

var googleAnalyticsUrl = document.createElement('script');
googleAnalyticsUrl.src = "https://www.googletagmanager.com/gtag/js?id=G-4KM704R98T";
googleAnalyticsUrl.type = 'text/javascript';
googleAnalyticsUrl.async = true;
document.head.appendChild(googleAnalyticsUrl);

var googleAnalyticsCode = document.createElement('script');
googleAnalyticsCode.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-4KM704R98T');`;
document.head.appendChild(googleAnalyticsCode);

//END - Google Analytics

})();