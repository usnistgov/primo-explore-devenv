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
    app.component('myInstitutionComponent', {
        template: `<span style="margin-left: 40%;">Starting soon, <b>Sign in</b> will use the new <a href="https://inet.nist.gov/pao/drupal-documentation/okta-login-process" target="_blank">OKTA authentication method.</a></span>`
    });

    app.component('prmSearchBarAfter', {
        bindings: {parentCtrl: `<`},
        template: `<my-institution-component></my-institution-component>`
});

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
        <li><a href="https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={{$ctrl.getSearchTerm()}}" target="_blank">IEEE</a></li>\
        <li><a href="https://www.sciencedirect.com/search?qs={{$ctrl.getSearchTerm()}}" target="_blank">ScienceDirect</a></li>\
        <li><a href="https://pubmed.ncbi.nlm.nih.gov/?term={{$ctrl.getSearchTerm()}}" target="_blank">PubMed</a></li>\
        <li><a href="https://mathscinet.ams.org/mathscinet/publications-search?query={{$ctrl.getSearchTerm()}}&page=1&size=20&sort=newest&facets=" target="_blank">MathSciNet</a></li>\
        <li><a href="https://app.knovel.com/kn/search?include_synonyms=off&page=0&query={{$ctrl.getSearchTerm()}}" target="_blank">Knovel</a></li>\
      </ul>\
      <p><span translate="" class="bold-text ng-scope">Need more help?</span></p>\
      <ul>\
        <li>Email the NIST Library at <a href="mailto:library@nist.gov">library@nist.gov</a>.</li>\
      </ul>\
    </md-card-content>\
  </md-card>'
});

})();