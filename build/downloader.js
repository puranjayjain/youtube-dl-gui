(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// a web worker instance of this file which will be used for interaction with node youtube dl
importScripts('../require.js');

// import fs from 'fs'
// import youtubedl from 'youtube-dl'

// onmessage = (e) => {
//   console.log('Message received from main script')
//   postMessage('yolo' + e.data)
// }

require({
  baseUrl: './'
}, ['require', 'fs', 'youtube-dl'], function (require, fs, youtubedl) {
  postMessage('yolo' + e.data);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGJhY2tncm91bmRcXGRvd25sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNDQSxjQUFjLGVBQWQ7Ozs7Ozs7Ozs7QUFVQSxRQUFRO0FBQ0osV0FBUztBQURMLENBQVIsRUFFSyxDQUFDLFNBQUQsRUFBWSxJQUFaLEVBQWtCLFlBQWxCLENBRkwsRUFHRSxVQUFDLE9BQUQsRUFBVSxFQUFWLEVBQWMsU0FBZCxFQUE0QjtBQUMxQixjQUFZLFNBQVMsRUFBRSxJQUF2QjtBQUNELENBTEgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gYSB3ZWIgd29ya2VyIGluc3RhbmNlIG9mIHRoaXMgZmlsZSB3aGljaCB3aWxsIGJlIHVzZWQgZm9yIGludGVyYWN0aW9uIHdpdGggbm9kZSB5b3V0dWJlIGRsXHJcbmltcG9ydFNjcmlwdHMoJy4uL3JlcXVpcmUuanMnKVxyXG5cclxuLy8gaW1wb3J0IGZzIGZyb20gJ2ZzJ1xyXG4vLyBpbXBvcnQgeW91dHViZWRsIGZyb20gJ3lvdXR1YmUtZGwnXHJcblxyXG4vLyBvbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4vLyAgIGNvbnNvbGUubG9nKCdNZXNzYWdlIHJlY2VpdmVkIGZyb20gbWFpbiBzY3JpcHQnKVxyXG4vLyAgIHBvc3RNZXNzYWdlKCd5b2xvJyArIGUuZGF0YSlcclxuLy8gfVxyXG5cclxucmVxdWlyZSh7XHJcbiAgICBiYXNlVXJsOiAnLi8nXHJcbiAgfSwgWydyZXF1aXJlJywgJ2ZzJywgJ3lvdXR1YmUtZGwnXSxcclxuICAocmVxdWlyZSwgZnMsIHlvdXR1YmVkbCkgPT4ge1xyXG4gICAgcG9zdE1lc3NhZ2UoJ3lvbG8nICsgZS5kYXRhKVxyXG4gIH1cclxuKVxyXG4iXX0=
