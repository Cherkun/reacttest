import React, {Component} from 'react'
import Textinputs from './Textinputs'


function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryCalculate(temperature, convert) {
    const input = parseFloat(temperature);
    if(Number.isNaN(input)) return '';
    const output=convert(input);
    const rounded=Math.round(output*1000)/1000;
    return rounded.toString();
}

class Calculator extends Component {
    constructor(props) {
        super(props)
        this.handleCelsiumChange = this.handleCelsiumChange.bind(this)
        this.handleFarenheitChange = this.handleFarenheitChange.bind(this)
        this.state={
            temperature: '',
            scale: 'c'
        }
    }
    handleCelsiumChange(temperature){
        this.setState({
            scale: 'c',
            temperature
        })
    }
    handleFarenheitChange(temperature){
        this.setState({
            scale: 'f',
            temperature
        })
    }

    render() {
        const {temperature, scale} = this.state
        const celsius=scale=='f'?tryCalculate(temperature, toCelsius):temperature
        const farenheit=scale=='c'?tryCalculate(temperature, toFahrenheit):temperature
        return(
            <div>
                    <Textinputs
                        scale="c"
                        temperature={celsius}
                        temperatureChange={this.handleCelsiumChange}
                    />
                    <Textinputs
                        scale="f"
                        temperature={farenheit}
                        temperatureChange={this.handleFarenheitChange}
                    />
            </div>
        )
    }
}

export default Calculator