import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, getPosts } from "../store/actions";
import UserCard from "./UserCard";
import { AppState } from "../store/index.d";

interface UserProps {
  user: {
    ids: {
      length: number;
    };
    data: {
      id: string;
      name: string;
      email: string;
      phone: string;
      website: string;
      company: {
        name: string;
        catchPhrase: string;
        bs: string;
      };
    }[];
  };
  getUsers: () => {}[];
}

class UserHeader extends Component<UserProps> {
  componentDidMount() {
    this.props.getUsers();
  }
  renderUsers() {
    if (this.props.user.ids.length) {
      return this.props.user.data.map(
        ({ id, name, email, phone, website, company }) => {
          return (
            <div className="ui column four wide" key={id}>
              <UserCard
                name={name}
                emailAdress={email}
                phone={phone}
                webSite={website}
                companyName={company.name}
                catchPhrase={company.catchPhrase}
                bs={company.bs}
                id={id}
              />
            </div>
          );
        }
      );
    }
  }

  render() {
    return <div className="ui grid stretched">{this.renderUsers()}</div>;
  }
}

const mapStateToProps = (state: AppState) => {
  return { user: state.userReducer };
};

export default connect<AppState>(
  mapStateToProps,
  { getUsers, getPosts }
)(UserHeader);
