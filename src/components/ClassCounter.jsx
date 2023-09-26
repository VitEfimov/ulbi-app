import React from "react";



class ClassCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.increment = this.increment.bind(this);
        this.decriment = this.decriment.bind(this);
    }



    increment() {
        this.setState({ count: this.state.count + 1 })
    };

    decriment() {
        this.setState({ count: this.state.count - 1 })
    };

    render() {
        return (
            <div>
                <h1>
                    {this.state.count}
                </h1>
                <button onClick={this.decriment}>Decriment</button>
                <button onClick={this.increment}>Increment</button>

            </div>
        )
    }
}

export default ClassCounter;