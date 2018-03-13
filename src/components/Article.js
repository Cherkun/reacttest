import React, {Component, PureComponent} from 'react'
class Article extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            count: 0
        }
    }

    componentWillMount(){
        console.log('---','mount')
    }
    /*
    componentWillReceiveProps(nextProps){
            if(nextProps.defaultIsOpen!==this.props.defaultIsOpen) this.setState({
                isOpen: nextProps.defaultIsOpen
          })
        }
        shouldComponentUpdate(nextProps, nextState){
            return this.state.isOpen!==nextState.isOpen
        }
    */
    componentWillUpdate(){
        console.log('---','WillUpdate')
    }

    render(){
        const {article, isOpen, onButtonClick}=this.props
        const body=isOpen && <section className="card-text">{article.text}</section>
        return (
            <div className="card mx-auto" style={{width:'50%'}}>
                <div className="card-header">
                <h2 onClick={this.incrementCounter}>
                    {article.title}
                    clicked: {this.state.count}
                    <button className="btn btn-primary btn-lg float-right" onClick={onButtonClick}>{isOpen?"close":"open"}</button></h2>
                </div>
                <div className="card-body">
                    <h6 className="text-muted card-subtitle">creation at: {(new Date(article.date)).toDateString()}</h6>
                {body}
                </div>
            </div>
        )
    }

    incrementCounter=()=>{
        this.setState({
            count: this.state.count+1
        })
    }
}
export default Article