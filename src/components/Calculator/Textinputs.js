import React, {Component} from 'react'
import './assets/style.less'
import PropTypes from 'prop-types'

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class Textinputs extends Component{
    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(e){
        this.props.temperatureChange(e.target.value);
    }

    render(){
        const {temperature, scale}=this.props
        return (
            <div className="card mx-auto" style={{width:'50%'}}>
                <fieldset>
                    <legend>
                        Enter temperature in {scaleNames[scale]}:
                    </legend>
                    <input type="text" className="form-control" onChange={this.handleChange} value={temperature}/>
                </fieldset>
            </div>
        )
    }
}

Textinputs.propTypes={
    temperature: PropTypes.number,
    scale: PropTypes.string,
    temperatureChange: PropTypes.func.isRequired
}

export default Textinputs