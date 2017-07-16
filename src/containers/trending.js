import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTrending} from '../actions/index';
import {fetchContributors} from '../actions/index';
import Contributors from '../components/contributors';

class Trending extends Component {
    constructor(props) {
        super(props);

        this.state = {sort: "stars"};

        this.sortByName = this.sortByName.bind(this);
        this.sortByOwner = this.sortByOwner.bind(this);
        this.sortByStars = this.sortByStars.bind(this);
    }

    componentDidMount() {
        this.props.fetchTrending();
    }

    sortByName() {
        this.setState({
            sort: "name"
        });
    }

    sortByOwner() {
        this.setState({
            sort: "owner"
        });
    }

    sortByStars() {
        this.setState({
            sort: "stars"
        });
    }

    renderTrending() {
        if (!this.props.trending[0]) {
            return "Loading...";
        }

        const trendingRepos = this.props.trending[0].items;
        if (this.state.sort == "stars") {
            trendingRepos.sort((a,b) => {return (a.watchers_count > b.watchers_count) ? -1 : ((b.watchers_count > a.watchers_count) ? 1 : 0);});
        } else if (this.state.sort == "name") {
            trendingRepos.sort((a,b) => {return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0);});
        } else if (this.state.sort == "owner")  {
            trendingRepos.sort((a,b) => {return (a.owner.login.toLowerCase() > b.owner.login.toLowerCase()) ? 1 : ((b.owner.login.toLowerCase() > a.owner.login.toLowerCase()) ? -1 : 0);});
        }

        return (

            this.props.trending[0].items.map((repo) => {
                return (
                    <div className="repo" key={repo.full_name} id={repo.full_name}>
                        <div className="headline"><a href={`https://github.com/${repo.owner.login}/${repo.name}`}>{repo.owner.login} / <span className="repo-name">{repo.name}</span></a></div>
                        <div>{repo.description}</div>
                        <div className="bottom-row">
                            <a href={`https://github.com/${repo.owner.login}/${repo.name}/stargazers`}><img className="star" src="/public/images/octicons-star.svg.png" /> {repo['watchers_count']}</a>
                            <a href={`https://github.com/${repo.owner.login}/${repo.name}/graphs/contributors`}> Contributors</a>
                            {/* <Contributors data={this.props.fetchContributors(repo.full_name)}/> */}
                        </div>
                    </div>
                );
            })
        );
    }

    render() {
        return (
            <main>
                <span className="sort" onClick={this.sortByName}>Sort by Name </span>
                <span className="sort" onClick={this.sortByOwner}>| Sort by Owner </span>
                <span className="sort" onClick={this.sortByStars}>| Sort by Stars</span>
                {this.renderTrending()}
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        trending: state.trending
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({fetchTrending, fetchContributors}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
