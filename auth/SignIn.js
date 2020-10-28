import React from "react";
import Modal from "./Modal";
import { Formik, Field, Form } from "formik";
import auth from "./gotrue";
import { Link } from "react-router-dom";
import Alert from 'react-s-alert';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal title="Sign in to see premium content">
        <Formik
          initialValues={
            {
              email: '',
              password: ''
            }
          }
          onSubmit={(values, actions) => {
            auth.login(values.email, values.password, true)
              .then(response => {
                actions.setSubmitting(false);
                Alert.success('You signed in successfully!');
                this.props.history.push("/");
              })
              .catch(error => {
                this.setState({error: error.json.error_description})
                actions.setSubmitting(false);
              });
          }}
          render={props => (
            <Form className="form" _lpchecked={1}>
              {
                this.state.error &&
                <p className="space--bottom-1 flash--alert">{this.state.error}</p>
              }
              <div className="grid--center">
                <div className="grid__item lap-8-12">
                  <div className="form__field">
                    <label htmlFor="email" className="form__label">
                      Email<span className="required">*</span>
                    </label>
                    <Field type="email" name="email" id="email" required />
                  </div>
                </div>
                <div className="grid__item lap-8-12">
                  <div className="form__field">
                    <label htmlFor="password" className="form__label">
                      Password<span className="required">*</span>
                    </label>
                    <Field type="password" name="password" id="password" required />
                  </div>
                </div>
              </div>
              <hr className="space--both-2" />
              <div className="form__actions">
                <div className="align--center">
                  <button type="submit" className="button--primary">
                    {
                      props.isSubmitting ?
                        'Wait...' :
                        'Access'
                    }
                  </button>
                </div>
              </div>
            </Form>
          )}
        />
      </Modal>
    );
  }
}
