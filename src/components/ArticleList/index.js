import React, {Component} from 'react'
import Article from '../Article'
import './style.css'

class ArticleList extends Component {
    state = {
        openArticleId: null,
    }

    render() {
        const
            acrticleElements = this.props.articles.map((article, index) =>
                <li key={article.id} className="article_list__li">
                    <Article article={article}
                             isOpen={this.state.openArticleId === article.id}
                             onButtonClick={this.handleClick.bind(this, article.id)}
                    />
                </li>
            )
        return (
                <ul>
                    {acrticleElements}
                </ul>
        )
    }

    handleClick = openArticleId => {
        this.setState({
            openArticleId: this.state.openArticleId === openArticleId ? null : openArticleId
        })
    }
}

export default ArticleList