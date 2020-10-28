import React from 'react';
import auth from './gotrue';

export default function withCurrentUser(SubComponent) {
  return class WithCurrentUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = { currentUser: auth.currentUser() };
    }

    componentDidMount() {
      this.unsubscribe = auth.subscribe(this.handleCurrentUserChange.bind(this))
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    handleCurrentUserChange(currentUser) {
      this.setState({ currentUser });
    }

    render() {
      return (
        <SubComponent
          {...this.props}
          currentUser={this.state.currentUser}
        />
      );
    }
  }
}
