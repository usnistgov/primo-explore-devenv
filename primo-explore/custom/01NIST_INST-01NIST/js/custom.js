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

/* Display message on authority search page */
app.component('prmAuthoritySearchAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmAuthoritySearchAfterController',
    template: '<div id="authority-search" layout="row" layout-align="center center">The NIST Library & Museum is not using this feature. Please try your search in <a href="https://nist.primo.exlibrisgroup.com/discovery/search?vid=01NIST_INST:01NIST">NIST Library Search</a></div>'
});

//START - Google Analytics

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