/**
* This React class is intended to query an endpoint that will return an alphanumeric string, after clicking a button.
* This component is passed a prop "apiQueryDelay", which delays the endpoint request by N milliseconds. There is a 
* second button to disable this functionality and have the endpoint request run immediately after button click.
* This data is then to be displayed inside a simple container.
* The "queryAPI" XHR handler will return the endpoint response in the form of a Promise (such as axios, fetch).
* The response object will look like the following: {data: "A0B3HCJ"}
* The containing element ref isn't used, but should remain within the class.
* Please identify, correct and comment on any errors or bad practices you see in the React component class below.
* Additionally, please feel free to change the code style as you see fit.
* Please note - React version for this exercise is 15.5.4
*/

// import React, Component from 'react'; 
import React, { Component } from 'react'; //Component is a named export and with ES6 when named exports are imported with curly bracket around the named 
import queryAPI from 'queryAPI';
import PropTypes from 'prop-types'; //The prop-types package was recommended by the react team as PropTypes was deprecated

// class ShowResultsFromAPI extends Component() { 
/* Component is a class and not a function
The above Component() is wrong as with OOP you can extend other class, implement Intefaces but not functions add the parenthesis makes it a function call 
*/
class ShowResultsFromAPI extends Component {
    constructor() {
        super(props);
        state = { //state is what react uses to manage data scoped to a component and since we need to keep track of the data from the Api response we keep track of it with state
            data: null,
            error: false
        }

        this.container = null;
    }

    static defaultProps = {
        apiQueryDelay: 0
    }

    onDisableDelay() {
        this.props.apiQueryDelay = 0;
    }

    click() {
        if (this.props.apiQueryDelay) {
            setTimeout(function () {
                this.fetchData();
            }, this.props.apiQueryDelay);
        }
    }

    fetchData() {
        queryAPI()
            .then(function (response) {
                if (response.data) {
                    this.setState({
                        data: response.data,
                        error: false
                    });
                }
            }).catch(err => this.setState({ error: true, data: null })); //there is need to catch errors because anything could go wrong e.g network issue, or server not returning data, hence if such happens there is need to pass on the message for the error for better user experience 
                
    }

    render() {
        const { data, error } = this.state
        return (
            <div> {/* With React components it is required have only a single parent, which why i wrapped it with a <div></div> */}
                <div className="content-container" ref={el => this.container = el}>
                    {error ? <p>Sorry - there was an error with your request.</p> : <p>{data}</p>} {/* It a lot cleaner to use tenary operator for single checks that evaluate to boolean, null or undefine*/}
                </div>
                <Button onClick={this.onDisableDelay.bind(this)}>Disable request delay</Button>
                <Button onClick={this.click.bind(this)}>Request data from endpoint</Button>
            </div>
        )
    }
}

ShowResultsFromAPI.propTypes = {
    name: PropTypes.oneOf(["ShowResultsFromAPI"]).isRequired,
    apiQueryDelay: PropTypes.number.isRequired,
}


ShowResultsFromAPI.displayName = {
    name: "ShowResultsFromAPI"
};


export const ContentContainer; //I'm assuming a named export for ContentConatiner, and with name export we need to declare the name, which is why i add const 