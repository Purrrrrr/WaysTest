angular.module("ParseServices",[]).factory("ParseSDK",["$rootScope",function(a){function b(a){var b=_.clone(a.attributes);return b.id=a.id,b}Parse.initialize("sSbouZ9V8HOSQY755wkzfMSYE5zmqe1nBzUd7Npc","DMcQVzpWOusZPNTuXzbMMTUKskvpzaFWLgSj7ump");var c=Parse.Object.extend("way"),d=Parse.Collection.extend({model:c}),e=new d;return{getWays:function(c,d,f,g){e.fetch({success:function(c){var d=_.map(c.models,b);f(d),a.$apply()},error:function(a,b){g(b)}})},getWay:function(d,e,f){var g=new Parse.Query(c);g.get(d,{success:function(c){e(b(c)),a.$apply()},error:function(a,b){f(b)}})},saveWay:function(a,b){var d=new c;d.save(a,{success:b})},saveWays:function(a){angular.forEach(a,function(a){var b=new c;b.save(a,{})})}}}]);var theWaysApp=angular.module("theways",["ngAnimate","ngTouch","ui.router","uiGmapgoogle-maps","ParseServices","ngCordova","ionic"]);theWaysApp.config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/splash"),a.state("splash",{url:"/splash",templateUrl:"partials/splashscreen.html"}).state("districts",{url:"/district",views:{"":{templateUrl:"partials/ways-browser/layout.html"},"districts@districts":{templateUrl:"partials/ways-browser/districts.html"}}}).state("districts.list",{url:"/:districtId",views:{"list@districts":{templateUrl:"partials/ways-browser/way-list.html"}}}).state("districts.list.way",{url:"/way/:wayId",views:{"way@districts":{templateUrl:"partials/ways-browser/way.html"}}}).state("districts.list.way.map_and_pic",{url:"/map_and_pic",views:{"way_details@districts":{templateUrl:"partials/ways-browser/map-and-pic.html"}}}).state("districts.list.way.details",{url:"/details",views:{"way_details@districts":{templateUrl:"partials/ways-browser/way-details.html"}}}).state("ways",{"abstract":!0,url:"/ways",templateUrl:"partials/browse-ways.html"}).state("ways.list",{url:"/list",views:{"list@ways":{controller:"WayListController",templateUrl:"partials/way-list.html"}}}).state("ways.list.way",{url:"/way/:wayId",views:{"details@ways":{controller:"WayController",templateUrl:"partials/way-details.html"}}})}]).run(["$rootScope","$state",function(a,b){a.goUp=function(){b.go("^")}}]),theWaysApp.directive("networkMissingIndicator",["OnlineStatusService","$animate",function(a){return{restrict:"E",scope:!0,templateUrl:"partials/components/network-missing-indicator.html",link:function(b){b.isOnline=!0,a.watchOnlineStatus(function(a){console.log(a),b.isOnline=a,console.log("digest"),b.$digest()})}}}]),theWaysApp.directive("resourceLoader",["$q",function(a){return{transclude:!0,scope:{resourceLoader:"=",loadIntoModel:"@"},templateUrl:"partials/components/resource-loader.html",link:function(b,c,d,e,f){function g(a){h.empty();var c=b.$parent;b.loadIntoModel&&(c[b.loadIntoModel]=a),f(c,function(a){h.append(a)})}var h=angular.element(c.children()[0]);b.$watch("resourceLoader",function(c){h.empty(),b.reloadFn=function(){b.status="loading",b.promise=c().then(function(a){return a?(b.status="success",b.resource=a,g(a)):b.status="notfound",a},function(c){return b.status="fail",console.log(c),a.reject(c)})},b.reloadFn()})}}}]),theWaysApp.directive("uiViewSlide",["$rootScope","$state","$timeout","$compile",function(a,b,c,d){function e(a){return a.split(".").slice(0,-1).join(".")}function f(a){var b={},c=g[a];return c.views?angular.forEach(c.views,function(c,d){-1===d.indexOf("@")&&(d=d+"@"+e(a)),b[d]=!0}):b["@"+a]=!0,b}var g={};return angular.forEach(b.get(),function(a){g[a.name]=a}),{restrict:"A",transclude:"element",require:["^ionSlideBox"],priority:600,link:function(g,h,i,j,k){function l(){var a=i.uiViewSlide||"",b=h.parent().inheritedData("$uiView"),c=b?b.state.name:"";return a.indexOf("@")<0&&(a=a+"@"+c),a}function m(a,b){do{var c=f(a),d=l();if(c[d])return!0;a=e(a)}while(""!==a&&b);return!1}function n(){return _.indexOf(h.parent().children(),q[0])}function o(){s.slide(n())}function p(a){m(a,!0)?q||k(g,function(a){var b=g.$new();q=a,h.after(a),d('<div class="ui-view-slide" ui-view="'+r+'"></div>')(b,function(b){a.append(b)}),s.update()}):q&&c(function(){q.remove(),q=null,s.update()},410)}var q,r=i.uiViewSlide,s=j[0].__slider;ss=s,a.$on("$stateChangeStart",function(a,b){p(b.name)}),a.$on("$stateChangeSuccess",function(a,b){m(b.name,!1)&&c(o,100)}),p(b.current.name),m(b.current.name,!1)&&c(o,10),g.$on("slideBox.slideChanged",function(){if(q&&s.currentIndex()==n()){var a=q.children().data("$uiView"),c=a&&a.state&&a.state.self.name;c&&c!=b.current.name&&b.go(c,a.state.params)}})}}}]),theWaysApp.directive("undraggable",["$ionicSlideBoxDelegate",function(){return{restrict:"A",priority:100,link:function(a,b){var c="touchstart mousedown touchend mouseup";b.on(c,function(a){a.stopPropagation()})}}}]),theWaysApp.directive("verticalText",[function(){return{restrict:"A",scope:{verticalText:"="},link:function(a,b){a.$watch("verticalText",function(a){var c=a.replace(/(.)(?!$)/g,"$1<br>");b.html(c)})}}}]),theWaysApp.directive("wayCircle",function(){return{restrict:"E",scope:{},transclude:!0,templateUrl:"partials/components/way-circle.html",link:function(){}}}),theWaysApp.directive("way",function(){return{restrict:"E",scope:{name:"="},templateUrl:"partials/components/way-icon.html",link:function(a,b,c){c.size&&b.children("div").addClass(c.size)}}}),theWaysApp.directive("grayscale",["GoogleMapApi".ns(),function(a){return function(b){var c={streetViewControl:!1,mapTypeControl:!1,styles:b};return{require:"uiGmapGoogleMap",restrict:"A",priority:1e4,link:function(b,d,e,f){a.then(function(){var a=f.getScope();window.ss=a;var b=f.getScope().map;b&&b.setOptions(c)})}}}([{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}])}]),theWaysApp.controller("WayListController",["$scope","$state","WaysService",function(a,b,c){a.gotoWay=function(a){b.go("ways.list.way",{wayId:a.id})},a.loadWays=function(){return c.getWays({})}}]),theWaysApp.controller("WayController",["$scope","$state","WaysService",function(a,b,c){a.loadWay=function(){return c.getWay(b.params.wayId).then(function(b){return a.mapCenter=_.clone(b.position),b})}}]),theWaysApp.service("OnlineStatusService",["$cordovaNetwork","$rootScope",function(a,b){var c,d=b.$new(),e=!1;document.addEventListener("deviceready",function(){console.log(navigator.connection),console.log(a),c=a.isOnline(),document.addEventListener("online",function(){c=!1,d.$broadcast("online-status-change",{isOnline:c})},!1),document.addEventListener("online",function(){c=!0,d.$broadcast("online-status-change",{isOnline:c})},!1),e=!0,d.$broadcast("online-status-change",{isOnline:c})}),this.watchOnlineStatus=function(a){d.$on("online-status-change",function(b,c){a(c.isOnline)}),e&&a(c)}}]),theWaysApp.service("WaysService",["ParseSDK","$q",function(a,b){this.getWays=function(c){var d=b.defer();return a.getWays(c,"",function(a){d.resolve(a)},function(a){d.reject(a)}),d.promise},this.getWay=function(c){var d=b.defer();return a.getWay(c,function(a){d.resolve(a)},function(a){d.reject(a)}),d.promise}}]),theWaysApp.service("BackgroundService",function(){});
//# sourceMappingURL=scripts.js.map