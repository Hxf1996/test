/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [
    ["/2014/03/22/vuejs-010-release/index.html", "4533a3b593be47d8abec3bee918fc149"],
    ["/2014/07/29/vue-next/index.html", "cf43f0d0d3547b9e9e12bbb2d7b7e052"],
    ["/2014/11/09/vue-011-release/index.html", "93a2996b6cb0d00940b1b7c8165a4563"],
    ["/2014/12/08/011-component/index.html", "11b4210b872794784c6ec273be1044bf"],
    ["/2015/06/11/012-release/index.html", "fb7fbd2b8f8251924ebb599adecc3055"],
    ["/2015/10/26/1.0.0-release/index.html", "50111e9792a5bce8fa1caeb14b9ef3e3"],
    ["/2015/10/28/why-no-template-url/index.html", "46e09569c3e3945db9d67246e4b1ae02"],
    ["/2015/12/28/vue-cli/index.html", "d85fce86aa7e42962a13696f76b21855"],
    ["/2016/02/06/common-gotchas/index.html", "64a58d7ecc0ba766e3dcec8404b2920d"],
    ["/2016/03/14/march-update/index.html", "e547dd55665bca2d21ebf2c08b143ae7"],
    ["/2016/04/27/announcing-2.0/index.html", "004400a1f7aee564fd9ef1e4a3deec42"],
    ["/about/index.html", "9382144ca3bd76219bceb0c891d3e15c"],
    ["/api/index.html", "176a72f4aaa42c3b6a404d370e87fbb8"],
    ["/archives/2014/03/index.html", "5b9c7ffe7eb1f238118687ed4c60dcb4"],
    ["/archives/2014/07/index.html", "76e91b2dc036b62a805550b4845f0df3"],
    ["/archives/2014/11/index.html", "d7dbed2f4f1b21053ca1c1e9c47dc75e"],
    ["/archives/2014/12/index.html", "28d41562f3938ad4150c1031010a6a5c"],
    ["/archives/2014/index.html", "11f6ecff67b808d2f3c3b99966cc0fc8"],
    ["/archives/2015/06/index.html", "41c3c6075b0bf0bd6e7428b28fe895d6"],
    ["/archives/2015/10/index.html", "9e0bcab3f762391aa625ad3ff234f08e"],
    ["/archives/2015/12/index.html", "715688ba0a5bb53f86a225e16e4845a4"],
    ["/archives/2015/index.html", "09814bed21fd1e308f7b0a327b9a02ef"],
    ["/archives/2016/02/index.html", "54d9a7f96a1d8457649697bcc8879af9"],
    ["/archives/2016/03/index.html", "63a52dfb801fa87362798fbacd41b10e"],
    ["/archives/2016/04/index.html", "7b1c3a52437373a1b52ebb955e00db91"],
    ["/archives/2016/index.html", "3e25c40e72a8f63bb8099b7e293ad66c"],
    ["/archives/index.html", "ad3daa299c6f9ef1fc2a51fbcd59c691"],
    ["/archives/page/2/index.html", "1988cd2c81854c39d00a616942433a33"],
    ["/atom.xml", "b191f6c1f10ca9e91fcdda5e83678bb1"],
    ["/browserconfig.xml", "a1327babc882f9875f57f5b367c9ffc9"],
    ["/css/benchmark.css", "b083e0006589a5ba88a250eb8ee12cc5"],
    ["/css/index.css", "947837e70c120d6c06b6944ec6db6184"],
    ["/css/page.css", "b9676e58024caa72451841c9d8bde693"],
    ["/css/search.css", "e4e6c1e2a49dfe73bd8f10ca3409c040"],
    ["/examples/commits.html", "3cd3b2db40187e7f2d236473bae9ce59"],
    ["/examples/elastic-header.html", "198f4c19911bf30785905adb996ef899"],
    ["/examples/firebase.html", "266080b80e262a2b93289d466d1337b5"],
    ["/examples/grid-component.html", "3119ba25bb6b9dcc2f40d3f60e2136df"],
    ["/examples/hackernews.html", "f793aeb8d340c60945b0a58f3afa25c9"],
    ["/examples/index.html", "dc91b34e726c12318c4d083a3090c156"],
    ["/examples/modal.html", "88b6a98ec8a44cd783eaf0d71fcf46a7"],
    ["/examples/select2.html", "b812ad3b215af513c979c0d9759fe5c9"],
    ["/examples/svg.html", "0a1876c72d22212d243ed8c2d5b0404e"],
    ["/examples/todomvc.html", "a048618225f78a66ff322bb1dde98a37"],
    ["/examples/tree-view.html", "4815e09c4b3af4132da0e95dc1fbc945"],
    ["/fonts/Dosis/Dosis-Medium.ttf", "1a7809b30cc0cb7fc96feb3cad2eefb7"],
    ["/fonts/Roboto_Mono/RobotoMono-Regular.ttf", "a48ac41620cd818c5020d0f4302489ff"],
    ["/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf", "b2e90cc01cdd1e2e6f214d5cb2ae5c26"],
    ["/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf", "ba6cad25afe01d394e830f548a7f94df"],
    ["/fonts/Source_Sans_Pro/SourceSansPro-Semibold.ttf", "52984b3a4e09652a6feee711d5c169fd"],
    ["/guide/class-and-style.html", "a3174f2083dd58fbd1aa965dcc98133f"],
    ["/guide/comparison.html", "7c06634379b01b8e7ef0dfc90b9b8517"],
    ["/guide/components.html", "d98663b0d45a91f0a40541c1efe2bbfc"],
    ["/guide/computed.html", "3fcf408c7cdfd856ea75b6a5562ba8aa"],
    ["/guide/conditional.html", "896e19e7955f2616eb31ab4d8c65178c"],
    ["/guide/custom-directive.html", "697987fdd04783febdbff2aa2932c41d"],
    ["/guide/deployment.html", "be96515c673712671d042337366ddf63"],
    ["/guide/events.html", "0ebaec88003f2e1ab59ff868764d961a"],
    ["/guide/forms.html", "09ead2d35e42cdd09d848b27ec357491"],
    ["/guide/index.html", "e3171c7c94b236d5caa91894d8fdd581"],
    ["/guide/installation.html", "8acd1ab4fbaa082958259bf3a22d7b22"],
    ["/guide/instance.html", "61021765831307e8278d034c23502dd6"],
    ["/guide/join.html", "f2287c54050c9b576ed05af7baf6af73"],
    ["/guide/list.html", "772e05d65b4587501785906a4b681efd"],
    ["/guide/migration-vue-router.html", "e0d8a3e2dc09e2bda939c23c1e967765"],
    ["/guide/migration-vuex.html", "9b8659c8a4506acd24f2c0e3bee160f3"],
    ["/guide/migration.html", "af37d4bfb217e88a7f02eb92c446497f"],
    ["/guide/mixins.html", "270f751a44e1d1e18b9a31406a34fe8b"],
    ["/guide/plugins.html", "40467c9724e4917ae32582ac543db41b"],
    ["/guide/reactivity.html", "5b1e83c4a12b5f3e687e89e0a0b1ef05"],
    ["/guide/render-function.html", "4139dd80783f9eecb92d57dcf23dc54d"],
    ["/guide/routing.html", "f7f89a93550ee84e925ed84d6912a650"],
    ["/guide/single-file-components.html", "095eb3d7152439579d7a56227fe273f4"],
    ["/guide/ssr.html", "9143accd02c56349a3ec40d79eeefb4d"],
    ["/guide/state-management.html", "81ea6d4aee3ef538b507e4a5a0c3e3a0"],
    ["/guide/syntax.html", "611a256a910e0d1adfd5b418535e0ac1"],
    ["/guide/transitioning-state.html", "3f36248a3d9f6f21f10725f15775c5d6"],
    ["/guide/transitions.html", "4513c62165ee217697830a40e1795365"],
    ["/guide/unit-testing.html", "0f69c6b7a8d743af6384b8a2208b9a33"],
    ["/images/100offer-main.png", "8d37ff203f0818315e97516ae2e9f4ba"],
    ["/images/100offer.png", "5fc04cb5266c2171ce5cc68ca6be8ea4"],
    ["/images/2mhost.png", "4b8d618675f5ae2e25873930e0f1a33b"],
    ["/images/actualize.png", "caed3eca0208a349140a95b354d07382"],
    ["/images/chaitin.png", "2e90c7e1644d533624b59194544aab8b"],
    ["/images/check.png", "1ab55a9d7d368f9e185314b4ee3e108a"],
    ["/images/component_io.png", "62cc2842e0be59abcea55226b7b9f779"],
    ["/images/components.png", "c7b535e898bc597be0098040c2402f8b"],
    ["/images/data.png", "d777bbbf663f281783a84284ce7d3d18"],
    ["/images/deepstream.png", "2e6302d3d38d6e29da5e757edf42dedd"],
    ["/images/dom-tree.png", "7ed63c53d0fe7e8e1c0a74332f6eb775"],
    ["/images/down.png", "39cee69a29f44c5ae8acacf0c7c0c9fe"],
    ["/images/famebroker.png", "50c05f70a13a6ccf44ebc50d6b97263c"],
    ["/images/fancygrid.png", "06f2ce38e8497841593455ca53e58623"],
    ["/images/feed.png", "fc48422363785bd7645699a57c9c9660"],
    ["/images/frontend-meetups.png", "4d67ea5944cde49c38173b904fff492b"],
    ["/images/geekbang.jpg", "5d61b90673ef0f9ebe4f29a4e4236983"],
    ["/images/hn-architecture.png", "08daea42db8838ab4762f25b68dc743a"],
    ["/images/hn.png", "34849a03c242cc54b8fbab606902cbf3"],
    ["/images/htmlburger.png", "3c838f6dbddb1361e6019f521578171f"],
    ["/images/icons.png", "24c9ea5274c732f8ec0ee13fb2361313"],
    ["/images/icons/android-icon-144x144.png", "42d2c151cc101a4c42ac51bd96c8b24d"],
    ["/images/icons/android-icon-192x192.png", "ad7d1af025254f7fb6c45917d26c0486"],
    ["/images/icons/android-icon-36x36.png", "005fffcd0a3cce3dacf8856645501213"],
    ["/images/icons/android-icon-48x48.png", "e898ac737b264364a216e2007b1fd7da"],
    ["/images/icons/android-icon-72x72.png", "ad659ec7e8eae4a50b73145c69772d42"],
    ["/images/icons/android-icon-96x96.png", "90c13bf806fb3b3749ef1f60cc5dc34c"],
    ["/images/icons/apple-icon-114x114.png", "69c4653429d7ac74ef8b968ad0676a19"],
    ["/images/icons/apple-icon-120x120.png", "3bb7b09526b130a7713f247e7db6b835"],
    ["/images/icons/apple-icon-144x144.png", "42d2c151cc101a4c42ac51bd96c8b24d"],
    ["/images/icons/apple-icon-152x152.png", "6f0e515bd57131a7e9c584c0a99492c6"],
    ["/images/icons/apple-icon-180x180.png", "91bc1dd313b750413e8e54349d2d7feb"],
    ["/images/icons/apple-icon-57x57.png", "d322b29db86a269ca682d6d54450a6d1"],
    ["/images/icons/apple-icon-60x60.png", "99b633995d668a30d869843d322cb2d5"],
    ["/images/icons/apple-icon-72x72.png", "ad659ec7e8eae4a50b73145c69772d42"],
    ["/images/icons/apple-icon-76x76.png", "293bd080883b88e811ec54fd1d17f04c"],
    ["/images/icons/apple-icon-precomposed.png", "8366f4f77f84f5945d37c8b6b5e85466"],
    ["/images/icons/apple-icon.png", "8366f4f77f84f5945d37c8b6b5e85466"],
    ["/images/icons/favicon-16x16.png", "b0fb918340bdb38c3f82934c3b83da28"],
    ["/images/icons/favicon-32x32.png", "495a42102231b5a1e1999b969fe59ca9"],
    ["/images/icons/favicon-96x96.png", "90c13bf806fb3b3749ef1f60cc5dc34c"],
    ["/images/icons/ms-icon-144x144.png", "42d2c151cc101a4c42ac51bd96c8b24d"],
    ["/images/icons/ms-icon-150x150.png", "81b31836aa22a0861e979c3f798c2257"],
    ["/images/icons/ms-icon-310x310.png", "dc00a74758f465cf5545d759a7fc26fc"],
    ["/images/icons/ms-icon-70x70.png", "e20d096831d0fe142137fb69fd7c5915"],
    ["/images/itunescn.png", "ca4a777f3e67fda2fc0c703e5a0f3845"],
    ["/images/jsfiddle.png", "cdaaf61398b8ccde5fbfb28daab02dc2"],
    ["/images/juejin.png", "f8a801162a92753a9f69ee528ea72d81"],
    ["/images/laravel.png", "854ba2a1472cff4b73bbb98cc2bf6e74"],
    ["/images/lifecycle.png", "1d3dae65499d59846dfbfaaa7daae963"],
    ["/images/logged-proxied-data.png", "72b84d29d68b46cb4772b225aaf581e9"],
    ["/images/logo.png", "c2a605fbc0e687b2e1b4b90a7c445cdd"],
    ["/images/menu.png", "f97c6cafce76896f725f56d22c33dc5d"],
    ["/images/monterail.png", "a1b2c43f5834a30140acf56a56ee3d7e"],
    ["/images/mvvm.png", "edd0080fb145315fbc96164c219fee7e"],
    ["/images/onsen-ui.png", "c9c5c8fc38c7121ca4d5b83438d1ce9e"],
    ["/images/patreon.png", "c55a20c3dface37cde7d1534e243c9fe"],
    ["/images/paypal.png", "cdc87f756d415712f06c68dda7fa5f87"],
    ["/images/props-events.png", "27584e95845e262286d25c47d44e0979"],
    ["/images/search.png", "57bde6918157195ab105e3c5d0967dec"],
    ["/images/shuttleworth.png", "a511730065708edf9f15d5ca6518accc"],
    ["/images/someline.png", "2e05b0cfb1eaa734666dab9e5f92cea1"],
    ["/images/state.png", "c4265cfefa02351484110c3c8d2a623a"],
    ["/images/stdlib.png", "0c3292d4d501cfb819cf38e8324d9220"],
    ["/images/strikingly.png", "c220cba956cba87d47c972340ef872d1"],
    ["/images/tde.png", "dfd1f4c2d07907d379fc26e890827f14"],
    ["/images/tmvuejs2.png", "260af8aecb932915b0aff029550a80a4"],
    ["/images/tooltwist.png", "52e2b2bb7c5278b564bf30ffaca782b1"],
    ["/images/transition.png", "ca34aef3910abf105dc112aa23026d54"],
    ["/images/trisoft.png", "2cfc914f05b223404cf753d9427373d0"],
    ["/images/upyun-large.png", "cd66170a5022b5c9444119e3fa5cb83a"],
    ["/images/upyun-main.jpg", "54d539ea772a02d69d71c290932e110b"],
    ["/images/upyun-small.png", "7a42625327e1495cec13cbe25c7a200d"],
    ["/images/v2exer.png", "54820c96ce277e48a3764bcd8fb5c6aa"],
    ["/images/vue-component-with-preprocessors.png", "7288b0138807e76b63b20efcb73a1423"],
    ["/images/vue-component.png", "15bcfe9fb8601c7599b1b2d21364cddb"],
    ["/images/vuejobs.png", "e050f9a94eb0f893093529fcce61d707"],
    ["/images/vuejobs.svg", "c31e68ce1f2663afbe9655c368c6dd35"],
    ["/images/vuejsadmin.png", "dd05607d35642239837fff531f3c4a09"],
    ["/images/xfive.png", "016402e334a83e4af9ff0958d39a7b0e"],
    ["/images/xiaozhuanlan-sidebar.png", "bf39498271eb2d224410c8cb207e3091"],
    ["/images/xiaozhuanlan.png", "d7732ded0ee72192bf05ab43b191084f"],
    ["/index.html", "b75db8a2d1042a4eb1cd0ff595160d21"],
    ["/js/common.js", "6c8cd37665ae5c87bbc292a97ad225e6"],
    ["/js/css.escape.js", "fe4db48c9e3f272a6d12cf1312de889e"],
    ["/js/smooth-scroll.min.js", "53a7fcc785e987d5ed08302f36de6653"],
    ["/js/vue.js", "fa399a1766728d176bbcd931d9b680ff"],
    ["/js/vue.min.js", "96d008c97c9a5f74d947ad6d92deb215"],
    ["/manifest.json", "bd8de9895abf2cc1faa760a8bd1004d8"],
    ["/menu/index.html", "98a44c63e32e8d2129770cb4a7a827a1"],
    ["/page/2/index.html", "a49cd4b2863b344b2e32a0eb20043d2d"],
    ["/support-vuejs/index.html", "b2623d15bd7595b80d18877d9dfb3f91"],
    ["/v2/api/index.html", "47d6f10df8b195e01b1ec429b3f1ecf4"],
    ["/v2/cookbook/adding-instance-properties.html", "27f8f671610852a320dda12f488987f2"],
    ["/v2/cookbook/cookbook-contributions.html", "8414315d90589ba2f25dd5997abc15fa"],
    ["/v2/cookbook/index.html", "684aee5d708d362362e86bb314352134"],
    ["/v2/examples/commits.html", "5ab333302585eda20925663d4ab4ded6"],
    ["/v2/examples/deepstream.html", "2eaa3b3871c59d1375bc6f1eeb625104"],
    ["/v2/examples/elastic-header.html", "220425f390516c2ae5f3ac4ca54de269"],
    ["/v2/examples/firebase.html", "a128bab81ee1abcd050c5cc5d57ca3f9"],
    ["/v2/examples/grid-component.html", "e754c823959bc5f2458c8bab7d63bbd5"],
    ["/v2/examples/hackernews.html", "6973d70b9f0fa68d6a5e3afab594f088"],
    ["/v2/examples/index.html", "9e452b2f04d46fe6f9f3ba362c30e54e"],
    ["/v2/examples/modal.html", "e23a315e1d41986baecb5db9ee8715e3"],
    ["/v2/examples/select2.html", "9125e3c4e777ba159f13990aa7f69944"],
    ["/v2/examples/svg.html", "67020dfb78f4feced57105e39515c53a"],
    ["/v2/examples/todomvc.html", "c437561791656666bcd9b5511a1d50c7"],
    ["/v2/examples/tree-view.html", "8974a1d1104bb00c46d37195db9b7fa2"],
    ["/v2/guide/class-and-style.html", "50abea8d7c49421cb9be34a8bc8f02bc"],
    ["/v2/guide/comparison.html", "f58193ed69d4eca0c71246e9bfb1b41f"],
    ["/v2/guide/components.html", "699900d8d0d845ec640f7ab1e637dc50"],
    ["/v2/guide/computed.html", "169296552fb5b0bc5fa2a0db569318ad"],
    ["/v2/guide/conditional.html", "6c2659f76876abbbc31a10c61896296b"],
    ["/v2/guide/custom-directive.html", "6da6c0ac212e45a79c01519cb5d19991"],
    ["/v2/guide/deployment.html", "d59ae447efeef1abe3e0d81a8e47c529"],
    ["/v2/guide/events.html", "26d9aa490dcdec0278f992d2d642f500"],
    ["/v2/guide/filters.html", "a9212026d9017d4a93be72433267a6ff"],
    ["/v2/guide/forms.html", "c27d2e5a4875f56ea5708b16ba2c6860"],
    ["/v2/guide/index.html", "0745e4847ba65bbb73c1c398b5309e70"],
    ["/v2/guide/installation.html", "301487ed43ea98fd6c9268614bf934ca"],
    ["/v2/guide/instance.html", "95124f20a9d955739e9c6dc5509111ea"],
    ["/v2/guide/join.html", "1a8e80d6df13a770d47992c2e3007477"],
    ["/v2/guide/list.html", "66ed8775b320a0e91d6ea7119b004d1d"],
    ["/v2/guide/migration-vue-router.html", "45b70ff68c5565389d0bad989a5961bb"],
    ["/v2/guide/migration-vuex.html", "7ed2ef50f57d36eb6e85dcbdc013e9a1"],
    ["/v2/guide/migration.html", "2a8f97ddbf94e4d75404fdbfc313099d"],
    ["/v2/guide/mixins.html", "c3501e7bbcc40ec8ac3b2f082a59f047"],
    ["/v2/guide/plugins.html", "5b82378f654726e43ae24a5957f0c082"],
    ["/v2/guide/reactivity.html", "83b643c21b47785d7b0c6c0bdaa9b02f"],
    ["/v2/guide/render-function.html", "90395d1f445f0fa2d722984cbfba575f"],
    ["/v2/guide/routing.html", "90b265d2eda55b0673f10892e77455d2"],
    ["/v2/guide/single-file-components.html", "c418aeeb3f24108969e93fcab95b0d7e"],
    ["/v2/guide/ssr.html", "ca75615cb99ed51fe3131803c9aafa49"],
    ["/v2/guide/state-management.html", "3822f889de90ef9e80e5dbd5a4483266"],
    ["/v2/guide/syntax.html", "de6de2f45fbf5d40fe43093b036b11d3"],
    ["/v2/guide/team.html", "1e60bb8866f3b896fa2cd01652ac9c70"],
    ["/v2/guide/transitioning-state.html", "6a5ff203dcf006943dd4e4707752a473"],
    ["/v2/guide/transitions.html", "064c6b2c1fd2d7dec2dc91e7b5ea191c"],
    ["/v2/guide/typescript.html", "9ee088e0a23d2cc9f4037ebd16ccec46"],
    ["/v2/guide/unit-testing.html", "ca7b7f64eee9c5f391176fd87aec0b0f"],
    ["/v2/style-guide/index.html", "821ece55a6a043d58a082a42e8d851da"]
];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function(body) {
        // new Response() is happy when passed either a stream or a Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function(originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
        return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
        .split('&') // Split into an array of 'key=value' strings
        .map(function(kv) {
            return kv.split('='); // Split each 'key=value' string into a [key, value] array
        })
        .filter(function(kv) {
            return ignoreUrlParametersMatching.every(function(ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
            });
        })
        .map(function(kv) {
            return kv.join('='); // Join each [key, value] array into a 'key=value' string
        })
        .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
};


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function(item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function(requests) {
        return requests.map(function(request) {
            return request.url;
        });
    }).then(function(urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return setOfCachedUrls(cache).then(function(cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
                        // If we don't have a key matching url in the cache already, add it.
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, {
                                credentials: 'same-origin'
                            });
                            return fetch(request).then(function(response) {
                                // Bail out of installation unless we get back a 200 OK for
                                // every request.
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function(responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        }).then(function() {

            // Force the SW to transition from installing -> active state
            return self.skipWaiting();

        })
    );
});

self.addEventListener('activate', function(event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.keys().then(function(existingRequests) {
                return Promise.all(
                    existingRequests.map(function(existingRequest) {
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function() {

            return self.clients.claim();

        })
    );
});


self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        // Should we call event.respondWith() inside this fetch event handler?
        // This needs to be determined synchronously, which will give other fetch
        // handlers a chance to handle the request if need be.
        var shouldRespond;

        // First, remove all the ignored parameters and hash fragment, and see if we
        // have that URL in our cache. If so, great! shouldRespond will be true.
        var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
        shouldRespond = urlsToCacheKeys.has(url);

        // If shouldRespond is false, check again, this time with 'index.html'
        // (or whatever the directoryIndex option is set to) at the end.
        var directoryIndex = 'index.html';
        if (!shouldRespond && directoryIndex) {
            url = addDirectoryIndex(url, directoryIndex);
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond is still false, check to see if this is a navigation
        // request, and if so, whether the URL matches navigateFallbackWhitelist.
        var navigateFallback = '';
        if (!shouldRespond &&
            navigateFallback &&
            (event.request.mode === 'navigate') &&
            isPathWhitelisted([], event.request.url)) {
            url = new URL(navigateFallback, self.location).toString();
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond was set to true at any point, then call
        // event.respondWith(), using the appropriate cache key.
        if (shouldRespond) {
            event.respondWith(
                caches.open(cacheName).then(function(cache) {
                    return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
                        if (response) {
                            return response;
                        }
                        throw Error('The cached response that was expected is missing.');
                    });
                }).catch(function(e) {
                    // Fall back to just fetch()ing the request if some unexpected error
                    // prevented the cached response from being valid.
                    console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                    return fetch(event.request);
                })
            );
        }
    }
});


// *** Start of auto-included sw-toolbox code. ***
/*
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.toolbox = e()
    }
}(function() {
    return function e(t, n, r) {
        function o(c, s) {
            if (!n[c]) {
                if (!t[c]) {
                    var a = "function" == typeof require && require;
                    if (!s && a) return a(c, !0);
                    if (i) return i(c, !0);
                    var u = new Error("Cannot find module '" + c + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var f = n[c] = {
                    exports: {}
                };
                t[c][0].call(f.exports, function(e) {
                    var n = t[c][1][e];
                    return o(n ? n : e)
                }, f, f.exports, e, t, n, r)
            }
            return n[c].exports
        }
        for (var i = "function" == typeof require && require, c = 0; c < r.length; c++) o(r[c]);
        return o
    }({
        1: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                t = t || {};
                var n = t.debug || m.debug;
                n && console.log("[sw-toolbox] " + e)
            }

            function o(e) {
                var t;
                return e && e.cache && (t = e.cache.name), t = t || m.cache.name, caches.open(t)
            }

            function i(e, t) {
                t = t || {};
                var n = t.successResponses || m.successResponses;
                return fetch(e.clone()).then(function(r) {
                    return "GET" === e.method && n.test(r.status) && o(t).then(function(n) {
                        n.put(e, r).then(function() {
                            var r = t.cache || m.cache;
                            (r.maxEntries || r.maxAgeSeconds) && r.name && c(e, n, r)
                        })
                    }), r.clone()
                })
            }

            function c(e, t, n) {
                var r = s.bind(null, e, t, n);
                d = d ? d.then(r) : r()
            }

            function s(e, t, n) {
                var o = e.url,
                    i = n.maxAgeSeconds,
                    c = n.maxEntries,
                    s = n.name,
                    a = Date.now();
                return r("Updating LRU order for " + o + ". Max entries is " + c + ", max age is " + i), g.getDb(s).then(function(e) {
                    return g.setTimestampForUrl(e, o, a)
                }).then(function(e) {
                    return g.expireEntries(e, c, i, a)
                }).then(function(e) {
                    r("Successfully updated IDB.");
                    var n = e.map(function(e) {
                        return t.delete(e)
                    });
                    return Promise.all(n).then(function() {
                        r("Done with cache cleanup.")
                    })
                }).catch(function(e) {
                    r(e)
                })
            }

            function a(e, t, n) {
                return r("Renaming cache: [" + e + "] to [" + t + "]", n), caches.delete(t).then(function() {
                    return Promise.all([caches.open(e), caches.open(t)]).then(function(t) {
                        var n = t[0],
                            r = t[1];
                        return n.keys().then(function(e) {
                            return Promise.all(e.map(function(e) {
                                return n.match(e).then(function(t) {
                                    return r.put(e, t)
                                })
                            }))
                        }).then(function() {
                            return caches.delete(e)
                        })
                    })
                })
            }

            function u(e, t) {
                return o(t).then(function(t) {
                    return t.add(e)
                })
            }

            function f(e, t) {
                return o(t).then(function(t) {
                    return t.delete(e)
                })
            }

            function h(e) {
                e instanceof Promise || p(e), m.preCacheItems = m.preCacheItems.concat(e)
            }

            function p(e) {
                var t = Array.isArray(e);
                if (t && e.forEach(function(e) {
                        "string" == typeof e || e instanceof Request || (t = !1)
                    }), !t) throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");
                return e
            }

            function l(e, t, n) {
                if (!e) return !1;
                if (t) {
                    var r = e.headers.get("date");
                    if (r) {
                        var o = new Date(r);
                        if (o.getTime() + 1e3 * t < n) return !1
                    }
                }
                return !0
            }
            var d, m = e("./options"),
                g = e("./idb-cache-expiration");
            t.exports = {
                debug: r,
                fetchAndCache: i,
                openCache: o,
                renameCache: a,
                cache: u,
                uncache: f,
                precache: h,
                validatePrecacheInput: p,
                isResponseFresh: l
            }
        }, {
            "./idb-cache-expiration": 2,
            "./options": 4
        }],
        2: [function(e, t, n) {
            "use strict";

            function r(e) {
                return new Promise(function(t, n) {
                    var r = indexedDB.open(u + e, f);
                    r.onupgradeneeded = function() {
                        var e = r.result.createObjectStore(h, {
                            keyPath: p
                        });
                        e.createIndex(l, l, {
                            unique: !1
                        })
                    }, r.onsuccess = function() {
                        t(r.result)
                    }, r.onerror = function() {
                        n(r.error)
                    }
                })
            }

            function o(e) {
                return e in d || (d[e] = r(e)), d[e]
            }

            function i(e, t, n) {
                return new Promise(function(r, o) {
                    var i = e.transaction(h, "readwrite"),
                        c = i.objectStore(h);
                    c.put({
                        url: t,
                        timestamp: n
                    }), i.oncomplete = function() {
                        r(e)
                    }, i.onabort = function() {
                        o(i.error)
                    }
                })
            }

            function c(e, t, n) {
                return t ? new Promise(function(r, o) {
                    var i = 1e3 * t,
                        c = [],
                        s = e.transaction(h, "readwrite"),
                        a = s.objectStore(h),
                        u = a.index(l);
                    u.openCursor().onsuccess = function(e) {
                        var t = e.target.result;
                        if (t && n - i > t.value[l]) {
                            var r = t.value[p];
                            c.push(r), a.delete(r), t.continue()
                        }
                    }, s.oncomplete = function() {
                        r(c)
                    }, s.onabort = o
                }) : Promise.resolve([])
            }

            function s(e, t) {
                return t ? new Promise(function(n, r) {
                    var o = [],
                        i = e.transaction(h, "readwrite"),
                        c = i.objectStore(h),
                        s = c.index(l),
                        a = s.count();
                    s.count().onsuccess = function() {
                        var e = a.result;
                        e > t && (s.openCursor().onsuccess = function(n) {
                            var r = n.target.result;
                            if (r) {
                                var i = r.value[p];
                                o.push(i), c.delete(i), e - o.length > t && r.continue()
                            }
                        })
                    }, i.oncomplete = function() {
                        n(o)
                    }, i.onabort = r
                }) : Promise.resolve([])
            }

            function a(e, t, n, r) {
                return c(e, n, r).then(function(n) {
                    return s(e, t).then(function(e) {
                        return n.concat(e)
                    })
                })
            }
            var u = "sw-toolbox-",
                f = 1,
                h = "store",
                p = "url",
                l = "timestamp",
                d = {};
            t.exports = {
                getDb: o,
                setTimestampForUrl: i,
                expireEntries: a
            }
        }, {}],
        3: [function(e, t, n) {
            "use strict";

            function r(e) {
                var t = a.match(e.request);
                t ? e.respondWith(t(e.request)) : a.default && "GET" === e.request.method && 0 === e.request.url.indexOf("http") && e.respondWith(a.default(e.request))
            }

            function o(e) {
                s.debug("activate event fired");
                var t = u.cache.name + "$$$inactive$$$";
                e.waitUntil(s.renameCache(t, u.cache.name))
            }

            function i(e) {
                return e.reduce(function(e, t) {
                    return e.concat(t)
                }, [])
            }

            function c(e) {
                var t = u.cache.name + "$$$inactive$$$";
                s.debug("install event fired"), s.debug("creating cache [" + t + "]"), e.waitUntil(s.openCache({
                    cache: {
                        name: t
                    }
                }).then(function(e) {
                    return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t) {
                        return s.debug("preCache list: " + (t.join(", ") || "(none)")), e.addAll(t)
                    })
                }))
            }
            e("serviceworker-cache-polyfill");
            var s = e("./helpers"),
                a = e("./router"),
                u = e("./options");
            t.exports = {
                fetchListener: r,
                activateListener: o,
                installListener: c
            }
        }, {
            "./helpers": 1,
            "./options": 4,
            "./router": 6,
            "serviceworker-cache-polyfill": 16
        }],
        4: [function(e, t, n) {
            "use strict";
            var r;
            r = self.registration ? self.registration.scope : self.scope || new URL("./", self.location).href, t.exports = {
                cache: {
                    name: "$$$toolbox-cache$$$" + r + "$$$",
                    maxAgeSeconds: null,
                    maxEntries: null
                },
                debug: !1,
                networkTimeoutSeconds: null,
                preCacheItems: [],
                successResponses: /^0|([123]\d\d)|(40[14567])|410$/
            }
        }, {}],
        5: [function(e, t, n) {
            "use strict";
            var r = new URL("./", self.location),
                o = r.pathname,
                i = e("path-to-regexp"),
                c = function(e, t, n, r) {
                    t instanceof RegExp ? this.fullUrlRegExp = t : (0 !== t.indexOf("/") && (t = o + t), this.keys = [], this.regexp = i(t, this.keys)), this.method = e, this.options = r, this.handler = n
                };
            c.prototype.makeHandler = function(e) {
                var t;
                if (this.regexp) {
                    var n = this.regexp.exec(e);
                    t = {}, this.keys.forEach(function(e, r) {
                        t[e.name] = n[r + 1]
                    })
                }
                return function(e) {
                    return this.handler(e, t, this.options)
                }.bind(this)
            }, t.exports = c
        }, {
            "path-to-regexp": 15
        }],
        6: [function(e, t, n) {
            "use strict";

            function r(e) {
                return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
            }
            var o = e("./route"),
                i = e("./helpers"),
                c = function(e, t) {
                    for (var n = e.entries(), r = n.next(), o = []; !r.done;) {
                        var i = new RegExp(r.value[0]);
                        i.test(t) && o.push(r.value[1]), r = n.next()
                    }
                    return o
                },
                s = function() {
                    this.routes = new Map, this.routes.set(RegExp, new Map), this.default = null
                };
            ["get", "post", "put", "delete", "head", "any"].forEach(function(e) {
                s.prototype[e] = function(t, n, r) {
                    return this.add(e, t, n, r)
                }
            }), s.prototype.add = function(e, t, n, c) {
                c = c || {};
                var s;
                t instanceof RegExp ? s = RegExp : (s = c.origin || self.location.origin, s = s instanceof RegExp ? s.source : r(s)), e = e.toLowerCase();
                var a = new o(e, t, n, c);
                this.routes.has(s) || this.routes.set(s, new Map);
                var u = this.routes.get(s);
                u.has(e) || u.set(e, new Map);
                var f = u.get(e),
                    h = a.regexp || a.fullUrlRegExp;
                f.has(h.source) && i.debug('"' + t + '" resolves to same regex as existing route.'), f.set(h.source, a)
            }, s.prototype.matchMethod = function(e, t) {
                var n = new URL(t),
                    r = n.origin,
                    o = n.pathname;
                return this._match(e, c(this.routes, r), o) || this._match(e, [this.routes.get(RegExp)], t)
            }, s.prototype._match = function(e, t, n) {
                if (0 === t.length) return null;
                for (var r = 0; r < t.length; r++) {
                    var o = t[r],
                        i = o && o.get(e.toLowerCase());
                    if (i) {
                        var s = c(i, n);
                        if (s.length > 0) return s[0].makeHandler(n)
                    }
                }
                return null
            }, s.prototype.match = function(e) {
                return this.matchMethod(e.method, e.url) || this.matchMethod("any", e.url)
            }, t.exports = new s
        }, {
            "./helpers": 1,
            "./route": 5
        }],
        7: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return n = n || {}, i.debug("Strategy: cache first [" + e.url + "]", n), i.openCache(n).then(function(t) {
                    return t.match(e).then(function(t) {
                        var r = n.cache || o.cache,
                            c = Date.now();
                        return i.isResponseFresh(t, r.maxAgeSeconds, c) ? t : i.fetchAndCache(e, n)
                    })
                })
            }
            var o = e("../options"),
                i = e("../helpers");
            t.exports = r
        }, {
            "../helpers": 1,
            "../options": 4
        }],
        8: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return n = n || {}, i.debug("Strategy: cache only [" + e.url + "]", n), i.openCache(n).then(function(t) {
                    return t.match(e).then(function(e) {
                        var t = n.cache || o.cache,
                            r = Date.now();
                        if (i.isResponseFresh(e, t.maxAgeSeconds, r)) return e
                    })
                })
            }
            var o = e("../options"),
                i = e("../helpers");
            t.exports = r
        }, {
            "../helpers": 1,
            "../options": 4
        }],
        9: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return o.debug("Strategy: fastest [" + e.url + "]", n), new Promise(function(r, c) {
                    var s = !1,
                        a = [],
                        u = function(e) {
                            a.push(e.toString()), s ? c(new Error('Both cache and network failed: "' + a.join('", "') + '"')) : s = !0
                        },
                        f = function(e) {
                            e instanceof Response ? r(e) : u("No result returned")
                        };
                    o.fetchAndCache(e.clone(), n).then(f, u), i(e, t, n).then(f, u)
                })
            }
            var o = e("../helpers"),
                i = e("./cacheOnly");
            t.exports = r
        }, {
            "../helpers": 1,
            "./cacheOnly": 8
        }],
        10: [function(e, t, n) {
            t.exports = {
                networkOnly: e("./networkOnly"),
                networkFirst: e("./networkFirst"),
                cacheOnly: e("./cacheOnly"),
                cacheFirst: e("./cacheFirst"),
                fastest: e("./fastest")
            }
        }, {
            "./cacheFirst": 7,
            "./cacheOnly": 8,
            "./fastest": 9,
            "./networkFirst": 11,
            "./networkOnly": 12
        }],
        11: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                n = n || {};
                var r = n.successResponses || o.successResponses,
                    c = n.networkTimeoutSeconds || o.networkTimeoutSeconds;
                return i.debug("Strategy: network first [" + e.url + "]", n), i.openCache(n).then(function(t) {
                    var s, a, u = [];
                    if (c) {
                        var f = new Promise(function(r) {
                            s = setTimeout(function() {
                                t.match(e).then(function(e) {
                                    var t = n.cache || o.cache,
                                        c = Date.now(),
                                        s = t.maxAgeSeconds;
                                    i.isResponseFresh(e, s, c) && r(e)
                                })
                            }, 1e3 * c)
                        });
                        u.push(f)
                    }
                    var h = i.fetchAndCache(e, n).then(function(e) {
                        if (s && clearTimeout(s), r.test(e.status)) return e;
                        throw i.debug("Response was an HTTP error: " + e.statusText, n), a = e, new Error("Bad response")
                    }).catch(function(r) {
                        return i.debug("Network or response error, fallback to cache [" + e.url + "]", n), t.match(e).then(function(e) {
                            if (e) return e;
                            if (a) return a;
                            throw r
                        })
                    });
                    return u.push(h), Promise.race(u)
                })
            }
            var o = e("../options"),
                i = e("../helpers");
            t.exports = r
        }, {
            "../helpers": 1,
            "../options": 4
        }],
        12: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return o.debug("Strategy: network only [" + e.url + "]", n), fetch(e)
            }
            var o = e("../helpers");
            t.exports = r
        }, {
            "../helpers": 1
        }],
        13: [function(e, t, n) {
            "use strict";
            var r = e("./options"),
                o = e("./router"),
                i = e("./helpers"),
                c = e("./strategies"),
                s = e("./listeners");
            i.debug("Service Worker Toolbox is loading"), self.addEventListener("install", s.installListener), self.addEventListener("activate", s.activateListener), self.addEventListener("fetch", s.fetchListener), t.exports = {
                networkOnly: c.networkOnly,
                networkFirst: c.networkFirst,
                cacheOnly: c.cacheOnly,
                cacheFirst: c.cacheFirst,
                fastest: c.fastest,
                router: o,
                options: r,
                cache: i.cache,
                uncache: i.uncache,
                precache: i.precache
            }
        }, {
            "./helpers": 1,
            "./listeners": 3,
            "./options": 4,
            "./router": 6,
            "./strategies": 10
        }],
        14: [function(e, t, n) {
            t.exports = Array.isArray || function(e) {
                return "[object Array]" == Object.prototype.toString.call(e)
            }
        }, {}],
        15: [function(e, t, n) {
            function r(e, t) {
                for (var n, r = [], o = 0, i = 0, c = "", s = t && t.delimiter || "/"; null != (n = x.exec(e));) {
                    var f = n[0],
                        h = n[1],
                        p = n.index;
                    if (c += e.slice(i, p), i = p + f.length, h) c += h[1];
                    else {
                        var l = e[i],
                            d = n[2],
                            m = n[3],
                            g = n[4],
                            v = n[5],
                            w = n[6],
                            y = n[7];
                        c && (r.push(c), c = "");
                        var b = null != d && null != l && l !== d,
                            E = "+" === w || "*" === w,
                            R = "?" === w || "*" === w,
                            k = n[2] || s,
                            $ = g || v;
                        r.push({
                            name: m || o++,
                            prefix: d || "",
                            delimiter: k,
                            optional: R,
                            repeat: E,
                            partial: b,
                            asterisk: !!y,
                            pattern: $ ? u($) : y ? ".*" : "[^" + a(k) + "]+?"
                        })
                    }
                }
                return i < e.length && (c += e.substr(i)), c && r.push(c), r
            }

            function o(e, t) {
                return s(r(e, t))
            }

            function i(e) {
                return encodeURI(e).replace(/[\/?#]/g, function(e) {
                    return "%" + e.charCodeAt(0).toString(16).toUpperCase()
                })
            }

            function c(e) {
                return encodeURI(e).replace(/[?#]/g, function(e) {
                    return "%" + e.charCodeAt(0).toString(16).toUpperCase()
                })
            }

            function s(e) {
                for (var t = new Array(e.length), n = 0; n < e.length; n++) "object" == typeof e[n] && (t[n] = new RegExp("^(?:" + e[n].pattern + ")$"));
                return function(n, r) {
                    for (var o = "", s = n || {}, a = r || {}, u = a.pretty ? i : encodeURIComponent, f = 0; f < e.length; f++) {
                        var h = e[f];
                        if ("string" != typeof h) {
                            var p, l = s[h.name];
                            if (null == l) {
                                if (h.optional) {
                                    h.partial && (o += h.prefix);
                                    continue
                                }
                                throw new TypeError('Expected "' + h.name + '" to be defined')
                            }
                            if (v(l)) {
                                if (!h.repeat) throw new TypeError('Expected "' + h.name + '" to not repeat, but received `' + JSON.stringify(l) + "`");
                                if (0 === l.length) {
                                    if (h.optional) continue;
                                    throw new TypeError('Expected "' + h.name + '" to not be empty')
                                }
                                for (var d = 0; d < l.length; d++) {
                                    if (p = u(l[d]), !t[f].test(p)) throw new TypeError('Expected all "' + h.name + '" to match "' + h.pattern + '", but received `' + JSON.stringify(p) + "`");
                                    o += (0 === d ? h.prefix : h.delimiter) + p
                                }
                            } else {
                                if (p = h.asterisk ? c(l) : u(l), !t[f].test(p)) throw new TypeError('Expected "' + h.name + '" to match "' + h.pattern + '", but received "' + p + '"');
                                o += h.prefix + p
                            }
                        } else o += h
                    }
                    return o
                }
            }

            function a(e) {
                return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1")
            }

            function u(e) {
                return e.replace(/([=!:$\/()])/g, "\\$1")
            }

            function f(e, t) {
                return e.keys = t, e
            }

            function h(e) {
                return e.sensitive ? "" : "i"
            }

            function p(e, t) {
                var n = e.source.match(/\((?!\?)/g);
                if (n)
                    for (var r = 0; r < n.length; r++) t.push({
                        name: r,
                        prefix: null,
                        delimiter: null,
                        optional: !1,
                        repeat: !1,
                        partial: !1,
                        asterisk: !1,
                        pattern: null
                    });
                return f(e, t)
            }

            function l(e, t, n) {
                for (var r = [], o = 0; o < e.length; o++) r.push(g(e[o], t, n).source);
                var i = new RegExp("(?:" + r.join("|") + ")", h(n));
                return f(i, t)
            }

            function d(e, t, n) {
                return m(r(e, n), t, n)
            }

            function m(e, t, n) {
                v(t) || (n = t || n, t = []), n = n || {};
                for (var r = n.strict, o = n.end !== !1, i = "", c = 0; c < e.length; c++) {
                    var s = e[c];
                    if ("string" == typeof s) i += a(s);
                    else {
                        var u = a(s.prefix),
                            p = "(?:" + s.pattern + ")";
                        t.push(s), s.repeat && (p += "(?:" + u + p + ")*"), p = s.optional ? s.partial ? u + "(" + p + ")?" : "(?:" + u + "(" + p + "))?" : u + "(" + p + ")", i += p
                    }
                }
                var l = a(n.delimiter || "/"),
                    d = i.slice(-l.length) === l;
                return r || (i = (d ? i.slice(0, -l.length) : i) + "(?:" + l + "(?=$))?"), i += o ? "$" : r && d ? "" : "(?=" + l + "|$)", f(new RegExp("^" + i, h(n)), t)
            }

            function g(e, t, n) {
                return v(t) || (n = t || n, t = []), n = n || {}, e instanceof RegExp ? p(e, t) : v(e) ? l(e, t, n) : d(e, t, n)
            }
            var v = e("isarray");
            t.exports = g, t.exports.parse = r, t.exports.compile = o, t.exports.tokensToFunction = s, t.exports.tokensToRegExp = m;
            var x = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g")
        }, {
            isarray: 14
        }],
        16: [function(e, t, n) {
            ! function() {
                var e = Cache.prototype.addAll,
                    t = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);
                if (t) var n = t[1],
                    r = parseInt(t[2]);
                e && (!t || "Firefox" === n && r >= 46 || "Chrome" === n && r >= 50) || (Cache.prototype.addAll = function(e) {
                    function t(e) {
                        this.name = "NetworkError", this.code = 19, this.message = e
                    }
                    var n = this;
                    return t.prototype = Object.create(Error.prototype), Promise.resolve().then(function() {
                        if (arguments.length < 1) throw new TypeError;
                        return e = e.map(function(e) {
                            return e instanceof Request ? e : String(e)
                        }), Promise.all(e.map(function(e) {
                            "string" == typeof e && (e = new Request(e));
                            var n = new URL(e.url).protocol;
                            if ("http:" !== n && "https:" !== n) throw new t("Invalid scheme");
                            return fetch(e.clone())
                        }))
                    }).then(function(r) {
                        if (r.some(function(e) {
                                return !e.ok
                            })) throw new t("Incorrect response status");
                        return Promise.all(r.map(function(t, r) {
                            return n.put(e[r], t)
                        }))
                    }).then(function() {})
                }, Cache.prototype.add = function(e) {
                    return this.addAll([e])
                })
            }()
        }, {}]
    }, {}, [13])(13)
});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.networkFirst, {
    "origin": "sendgrid.sp1.convertro.com"
});
toolbox.router.get("/*", toolbox.networkFirst, {
    "origin": "ad.doubleclick.net"
});
toolbox.router.get("/*", toolbox.cacheFirst, {
    "origin": "cdn.jsdelivr.net"
});
toolbox.router.get("/*", toolbox.cacheFirst, {
    "origin": "fonts.googleapis.com"
});
toolbox.router.get("/*", toolbox.cacheFirst, {
    "origin": "fonts.gstatic.com"
});
toolbox.router.get("/*", toolbox.cacheFirst, {
    "origin": "cdnjs.cloudflare.com"
});
toolbox.router.get("/*", toolbox.cacheFirst, {
    "origin": "maxcdn.bootstrapcdn.com"
});
