/** @jsx React.DOM */
var React = require('react')

var Gapoc = require('./Gapoc')


var $main = document.querySelector("body > #main")

React.render(<Gapoc />, $main);
