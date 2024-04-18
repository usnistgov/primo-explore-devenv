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



})();