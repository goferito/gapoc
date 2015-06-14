/** @jsx React.DOM */
var React = require('react')
  , Grid = require('react-bootstrap').Grid
  , Row = require('react-bootstrap').Row
  , Col = require('react-bootstrap').Col
  

var Gapoc = React.createClass({

  changePageTitle: function(ev){
    var title = ev.target.value;
    document.querySelector('head > title').text = title;
  },

  sendPageView: function(){
    var trackId = document.querySelector('#trackId').value
      , numEvents = this.refs.numPVEvents.getDOMNode().value

    ga('create', trackId, 'auto');
    for (var i = 0; i < numEvents; i++) {
      ga('send', 'pageview');
    };
  },

  sendCustomEvent: function(){
    var trackId = document.querySelector('#trackId').value
    var category =  this.refs.eventCategory.getDOMNode().value
      , action =    this.refs.eventAction.getDOMNode().value
      , label =     this.refs.eventLabel.getDOMNode().value
      , value =     this.refs.eventValue.getDOMNode().value
      , numEvents = this.refs.numCustomEvents.getDOMNode().value

    ga('create', trackId, 'auto');
    for (var i = 0; i < numEvents; i++) {
      ga('send', 'event', category, action, label, value || 1);
    }
  },

  render: function(){

    return (
      <Grid>
        <Row>
          <Col md={6}>
            <h3>Use the form in the left to mess up with GA</h3>
            <h4>How to use this</h4>
            <ol>
              <li>
                Navigate to the path you want to track with your browser, to
                set up the url tha google analytics will track.
              </li>
              <li>
                Set the page title using the form.
              </li>
              <li>
                Specify the Google Analytics track ID you want to use
              </li>
              <li>
                Specify the number of events you want to send, and the event
                fields in case of custom events.
              </li>
              <li>
                Click on Send.
              </li>
              <li>
                Check on your Google Analytics the page views and events
                created.
              </li>
            </ol>
          </Col>

          <Col md={6} id="formContainer">

            Page Title:
            <br />
            <input
              type="text"
              defaultValue='GAPOC'
              onChange={this.changePageTitle} />

            <br />
            <br />

            Track Id: <br/>
            <input
              type="text"
              name="trackId"
              id="trackId"
              placeholder="UA-xxxxxxxx-x" />

            <br />
            <br />

            <h4>Send Page View Events</h4>
            <input
              type='text'
              size='2'
              ref='numPVEvents'
              defaultValue='1' />
            <input
              type='button'
              onClick={this.sendPageView}
              value='Send' />

            <br />
            <br />


            <h4>Send Custom Events</h4>
            <table cellspacing="0">
              <tr>
                <td>Category:</td>
                <td>
                  <input
                    type='text'
                    placeholder='ex: button'
                    ref='eventCategory' />
                </td>
              </tr>
              <tr>
                <td>Action:</td>
                <td>
                  <input
                    type='text'
                    placeholder='ex: click'
                    ref='eventAction' />
                </td>
              </tr>
              <tr>
                <td>Label:</td>
                <td>
                  <input
                    type='text'
                    placeholder='ex: nav buttons'
                    ref='eventLabel' />
                </td>
              </tr>
              <tr>
                <td>Value:</td>
                <td>
                  <input
                    type='text'
                    placeholder='ex: 4 (positive integer)(optional)'
                    ref='eventValue' />
                </td>
              </tr>
            </table>

            <br />
            <input
              type='text'
              size='2'
              ref='numCustomEvents'
              defaultValue='1' />
            <input
              type='button'
              onClick={this.sendCustomEvent}
              value='Send' />

          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Gapoc;

