import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPosts,
  getUsers,
  addPostCreator,
  deletePostCreator
} from "../store/actions";
import { Link } from "react-router-dom";
import "./postList.css";
import { Icon } from "semantic-ui-react";
import { AppState } from "../store/index.d";
import ModalCommon from "./ModalCommon";

interface PostProps {
  posts: { title: string; userId: number; id: number; length: number }[];
  getPosts: () => [];
  user: {
    data: { name: string }[];
  };
  title: string;
  addPostCreator: (
    parseInt: number,
    numberOfPosts: number,
    inputNameValue: string,
    textAreaValue: string
  ) => void;
  match: {
    params: {
      id: string;
    };
  };
  deletePostCreator: (post: number) => number;
}

interface PostState {
  open: boolean;
  inputNameValue: string;
  textAreaValue: string;
}

class PostList extends Component<PostProps, PostState> {
  constructor(props: PostProps) {
    super(props);
    this.state = {
      open: false,
      inputNameValue: "",
      textAreaValue: ""
    };
    this.formHandler = this.formHandler.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.posts.length) {
      this.props.getPosts();
    }
  }

  show = () => this.setState({ open: true });
  close = () =>
    this.setState({ open: false, inputNameValue: "", textAreaValue: "" });

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputNameValue: e.target.value
    });
  }

  formHandler(e: React.FormEvent<HTMLFormElement>) {
    const { inputNameValue, textAreaValue } = this.state;
    const { posts, match, addPostCreator } = this.props;
    e.preventDefault();
    let numberOfPosts = posts.length + 1;

    addPostCreator(
      parseInt(match.params.id),
      numberOfPosts,
      inputNameValue,
      textAreaValue
    );

    this.setState({
      open: false,
      inputNameValue: "",
      textAreaValue: ""
    });
  }

  handleTextAreaChange(e: React.FormEvent<HTMLTextAreaElement>) {
    this.setState({
      textAreaValue: (e.target as HTMLTextAreaElement).value
    });
  }

  renderUserName() {
    const { open, inputNameValue, textAreaValue } = this.state;
    const { user, match } = this.props;
    if (user.data.length) {
      return (
        <>
          <div className="ui grid segment">
            <div className="two wide column left aligned">
              <Link to={`/`}>
                <Icon name="arrow left" size="big" color="blue" />
                back
              </Link>
            </div>
            <div className="thirteen wide column fontSize boldFont">
              {user.data[parseInt(match.params.id)].name}
            </div>
            <div className="one wide column">
              <ModalCommon
                open={open}
                onClose={this.close}
                onClick={this.show}
                onSubmit={this.formHandler}
                inputNameValue={inputNameValue}
                textAreaValue={textAreaValue}
                onInputChange={this.handleInputChange}
                onTextAreaChange={this.handleTextAreaChange}
                text="Add Post"
              />
            </div>
          </div>
          <div>{this.renderList()}</div>
        </>
      );
    }
    return null;
  }

  renderList() {
    const { posts, user, match } = this.props;
    if (posts.length) {
      return posts.map(post => {
        const location = {
          pathname: `/users/${post.userId}/${post.id}`,
          post,
          user: user.data
        };
        return (
          <div key={post.title}>
            {post.userId === parseInt(match.params.id) ? (
              <div className="ui grid segment">
                <div className="one wide column right aligned">
                  <i
                    className="trash alternate big icon blue"
                    onClick={() => {
                      this.props.deletePostCreator(post.id);
                    }}
                  />
                </div>
                <div className="twelve wide column left aligned fontSize">
                  {post.title}
                </div>
                <div className="three wide column right aligned">
                  <Link to={location}>
                    <i className="angle right big right icon" />
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        );
      });
    }
  }

  render() {
    return <div>{this.renderUserName()}</div>;
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    posts: state.postsReducer.posts,
    user: state.userReducer
  };
};

export default connect<AppState>(
  mapStateToProps,
  {
    getPosts,
    getUsers,
    addPostCreator,
    deletePostCreator
  }
)(PostList);
