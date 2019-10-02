import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments, addCommentCreator } from "../store/actions";
import { Link } from "react-router-dom";
import { AppState } from "../store/index.d";
import { Icon } from "semantic-ui-react";
import "./showPost.css";
import ModalCommon from "./ModalCommon";

interface ShowProps {
  location: {
    user: {
      name: string;
    }[];
    post: {
      userId: string;
      body: string;
      title: string;
    };
  };

  comments: {
    name: string;
    postId: number;
    body: string;
    email: string;
  }[];
  addCommentCreator: (
    parseInt: number,
    numberOfPosts: number,
    inputNameValue: string,
    inputEmailValue: string,
    textAreaValue: string
  ) => AppState;
  match: {
    params: {
      id: string;
    };
  };
  getComments: () => [];
  ShowPost: () => void;
  showComments: () => boolean;
}

interface ShowState {
  inputNameValue: string;
  inputEmailValue: string;
  textAreaValue: string;
  hideComments: boolean;
  open: boolean;
}

class ShowPost extends Component<ShowProps, ShowState> {
  constructor(props: ShowProps) {
    super(props);
    this.state = {
      hideComments: false,
      open: false,
      inputNameValue: "",
      inputEmailValue: "",
      textAreaValue: ""
    };
    this.showComments = this.showComments.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.handleInputChangeName = this.handleInputChangeName.bind(this);
    this.handleInputChangeEmail = this.handleInputChangeEmail.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.comments.length) {
      this.props.getComments();
    }
  }

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleInputChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputNameValue: e.target.value
    });
  }

  handleInputChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputEmailValue: e.target.value
    });
  }

  formHandler(e: React.FormEvent<HTMLFormElement>) {
    const { inputNameValue, inputEmailValue, textAreaValue } = this.state;
    const { match, comments, addCommentCreator } = this.props;
    e.preventDefault();
    let numberOfComments = comments.length + 1;

    addCommentCreator(
      parseInt(match.params.id),
      numberOfComments,
      inputNameValue,
      inputEmailValue,
      textAreaValue
    );

    this.setState({
      open: false,
      inputNameValue: "",
      inputEmailValue: "",
      textAreaValue: ""
    });
  }

  handleTextAreaChange(e: any) {
    this.setState({
      textAreaValue: e.target.value
    });
  }

  showComments() {
    this.setState({
      hideComments: !this.state.hideComments
    });
  }

  render() {
    const {
      open,
      inputNameValue,
      inputEmailValue,
      textAreaValue,
      hideComments
    } = this.state;
    const { location, match, comments } = this.props;
    return (
      <>
        <div className="ui grid segment">
          <div className="two wide column left aligned">
            <Link to={`/users/${location.post.userId}`}>
              <Icon name="arrow left" size="big" color="blue" />
              back
            </Link>
          </div>
          <div className="thirteen wide column fontSize boldFont">
            <h1 className="ui header">
              {location.user[parseInt(location.post.userId)].name}
            </h1>
          </div>
          <div className="one wide column" />
        </div>
        <div className="ui segment">
          <h1>{location.post.title}</h1>
          {location.post.body}
        </div>
        <button onClick={this.showComments} className="btn-post">
          Show Comments
        </button>
        <ModalCommon
          open={open}
          onClose={this.close}
          onClick={this.show}
          onSubmit={this.formHandler}
          inputNameValue={inputNameValue}
          inputEmailValue={inputEmailValue}
          textAreaValue={textAreaValue}
          onInputChange={this.handleInputChangeName}
          onInputEmailChange={this.handleInputChangeEmail}
          onTextAreaChange={this.handleTextAreaChange}
          text="Add Comment"
        />
        {hideComments &&
          comments.map(({ name, postId, body, email }) => {
            return (
              <div key={name}>
                {postId === parseInt(match.params.id) ? (
                  <div className="ui segment">
                    <div className="ui">
                      <div className="ui grid">
                        <div className="p-name">{name}</div>
                        <div className="p-email">{email}</div>
                      </div>
                      <div className="p-body">{body}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
      </>
    );
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    comments: state.postsReducer.comments
  };
};

export default connect<AppState>(
  mapStateToProps,
  {
    getComments,
    addCommentCreator
  }
)(ShowPost);
