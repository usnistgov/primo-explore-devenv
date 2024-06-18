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

// External search links
app.controller("externalLinkController", [function ($stateParams, $state) {
  this.$onInit = function () {
    {
      var spaceToPlus = function spaceToPlus(str) {
        return str.replace(/\s+/g, "+");
      };

      /*
      var convertToEbsco = function convertToEbsco(primoSearch) {
        var ebscoSearchString = "";
        if (!Array.isArray(primoSearch)) {
          ebscoSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (var i = 0; i < primoSearch.length; i++) {
            var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            var conjunction = primoSearch[i].split(/,/)[3] || "";
            switch (primoSearch[i].split(/,/)[0]) {
              case "title":
                ebscoSearchString += "TI+(" + searchTerms + ")";
                break;
              case "creator":
                ebscoSearchString += "AU+(" + searchTerms + ")";
                break;
              case "sub":
                ebscoSearchString += "SU+(" + searchTerms + ")";
                break;
              default:
                // handles 'any' case
                ebscoSearchString += "(" + searchTerms + ")";
            }
            if (i !== primoSearch.length - 1) {
              ebscoSearchString += "+" + conjunction + "+";
            }
          }
        }
        return ebscoSearchString;
      };
      */

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

      var convertToResearchGuides = function convertToResearchGuides(primoSearch) {
        var researchGuidesSearchString = "";
        if (!Array.isArray(primoSearch)) {
          researchGuidesSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (var i = 0; i < primoSearch.length; i++) {
            var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            var conjunction = primoSearch[i].split(/,/)[3] || "";
            researchGuidesSearchString += "(" + searchTerms + ")";
            if (i !== primoSearch.length - 1) {
              researchGuidesSearchString += "+" + conjunction + "+";
            }
          }
        }
        return researchGuidesSearchString;
      };

      var convertToUBIR = function convertToUBIR(primoSearch) {
        var UBIRSearchString = "";
        if (!Array.isArray(primoSearch)) {
          UBIRSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (var i = 0; i < primoSearch.length; i++) {
            var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            var conjunction = primoSearch[i].split(/,/)[3] || "";
            UBIRSearchString += "(" + searchTerms + ")";
            if (i !== primoSearch.length - 1) {
              UBIRSearchString += "+" + conjunction + "+";
            }
          }
        }
        return UBIRSearchString;
      };

      var convertToChipsLit = function convertToChipsLit(primoSearch) {
        var digitalCollectionsSearchString = "";
        if (!Array.isArray(primoSearch)) {
          digitalCollectionsSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (var i = 0; i < primoSearch.length; i++) {
            var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            var conjunction = primoSearch[i].split(/,/)[3] || "";
            digitalCollectionsSearchString += "(" + searchTerms + ")";
            if (i !== primoSearch.length - 1) {
            digitalCollectionsSearchString += "+" + conjunction + "+";
            }
          }
        }
        return digitalCollectionsSearchString;
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

      //var proxyString = "/login?url=";

      var ebscoSearchString = convertToEbsco(primoSearch);
      var googleSearchString = convertToGoogle(primoSearch);
      var worldCatSearchString = convertToWorldCat(primoSearch);
      // const npSearchString = convertToNewspaper(primoSearch);
      var UBIRSearchString = convertToUBIR (primoSearch);
      var chipsLitSearchString = convertToChipsLit (primoSearch);	  
     

      // this.newspaperLabel = 'Newspapers';
      // const newspaperBase = 'https://ithaca.primo.exlibrisgroup.com/discovery/npsearch?vid=01ITHACACOL_INST:01ITHACACOL_V1&lang=en&search_scope=MyInst_and_CI';
      // this.newspaperSearchUrl = newspaperBase + '&query=' + npSearchString;

      this.ebscoLabel = "EBSCO";
      var ebscoBaseUrl = "https://search.ebscohost.com/login.aspx?direct=true&defaultdb=aph,gnh,apn,ahl,aft,air,ami,rfh,bvh,bxh,boh,buh,cin20,cms,nlebk,eric,hev,8gh,hch,hia,ibh,qth,lxh,lfh,ulh,cmedm,mth,mah,msn,nfh,ofs,phl,tfh,rgr,bwh,ram,rft,sih,s3h,trh,ser,e870sww,e872sww,mft,kah,mzh&type=1&searchMode=Standard&site=ehost-live&scope=site";
      var ebscoSearchUrl = ebscoBaseUrl + "&bquery=" + ebscoSearchString;
      this.ebscoProxiedSearchUrl = proxyString + ebscoSearchUrl;

      this.googleLabel = "Google Scholar";
      var googleBaseUrl = "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C33&inst=7210957415625843320&q=";
      this.googleProxiedSearchUrl = googleBaseUrl + googleSearchString;

      this.worldCatLabel = "WorldCat";
      var worldCatBaseUrl = "https://www.worldcat.org/search?qt=worldcat_org_all&q=";
      this.worldCatProxiedSearchUrl = proxyString + worldCatBaseUrl + worldCatSearchString;
    }
  };
}]);
app.component("prmSearchResultSortByAfter", {
  bindings: { parentCtrl: "<" },
  controller: "externalLinkController",
  template: '<div id="ic-external-links"><h3 ng-class="section-title-header"><span>Try My Search In&hellip;</span></h3><div id="ic-ebsco-link-block"><a href="{{$ctrl.ebscoProxiedSearchUrl}}" target="_blank" id="ic-ebsco-link"><img src="custom/{{$ctrl.view}}/img/ebsco.svg" alt=""> {{$ctrl.ebscoLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-google-link-block"><a href="{{$ctrl.googleProxiedSearchUrl}}" target="_blank" id="ic-google-link"><img src="custom/{{$ctrl.view}}/img/google.svg" alt=""> {{$ctrl.googleLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-worldcat-link-block"><a href="{{$ctrl.worldCatProxiedSearchUrl}}" target="_blank" id="ic-worldcat-link"><img src="custom/{{$ctrl.view}}/img/WorldCat.svg" alt=""> {{$ctrl.worldCatLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div></div>'
});


/* Try my search list of links to include */
/* 
<li><a href="https://scholar.google.com/scholar?q={{$ctrl.getSearchTerm()}}" target="_blank">Google Scholar</a></li>\
<li><a href="https://www.worldcat.org/search?qt=worldcat_org_all&q={{$ctrl.getSearchTerm()}}" target="_blank">Worldcat</a></li>\
<li><a href="https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={{$ctrl.getSearchTerm()}}" target="_blank">IEEE</a></li>\
<li><a href="https://www.sciencedirect.com/search?qs={{$ctrl.getSearchTerm()}}" target="_blank">ScienceDirect</a></li>\
<li><a href="https://pubmed.ncbi.nlm.nih.gov/?term={{$ctrl.getSearchTerm()}}" target="_blank">PubMed</a></li>\
<li><a href="https://mathscinet.ams.org/mathscinet/publications-search?query={{$ctrl.getSearchTerm()}}&page=1&size=20&sort=newest&facets=" target="_blank">MathSciNet</a></li>\
<li><a href="https://app.knovel.com/kn/search?include_synonyms=off&page=0&query={{$ctrl.getSearchTerm()}}" target="_blank">Knovel</a></li>\
<li><a href="https://nist.primo.exlibrisgroup.com/discovery/search?query=any,contains,{{$ctrl.getSearchTerm()}}&tab=Everything&search_scope=MyInst_and_CI&vid=01NIST_INST:01NIST&offset=0&pcAvailability=true" target="_blank">Expanded Results</a></li>\
<li><a href="https://inet.nist.gov/library/references?s={{$ctrl.getSearchTerm()}}&k=&a=&type=All&y=All&items_per_page=10" target="_blank">CHIPS Lit</a></li>\
*/

})();