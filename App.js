import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: null
    };
  }

  onPressButton = () => {
    fetch("https://cryptic-ravine-52184.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password,
        errors: null
      })
    })
      .then(res =>
        res.json().then(content => {
          if (content.errors) {
            return this.setState({ errors: content.errors });
          }
          if (content.error) {
            return this.setState({
              errors: {
                login: "Wrong information!"
              }
            });
          }
        })
      )
      .catch(err => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.errormsg}>
          {this.state.errors &&
            this.state.errors.email &&
            this.state.errors.email.msg}{" "}
        </Text>
        <TextInput
          value={this.state.username}
          placeholder="Username.."
          placeholderTextColor="black"
          underlineColorAndroid="transparent"
          style={styles.input}
          onChangeText={text => {
            this.setState({ username: text });
          }}
        /> 
        <Text style={styles.errormsg}>
          {this.state.errors &&  
            this.state.errors.password &&
            this.state.errors.password.msg}{" "}
        </Text>

        <TextInput
          placeholder="Password.."
          value={this.state.password}
          placeholderTextColor="black"
          underlineColorAndroid="transparent"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({ password: text });
          }}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPressButton}>
          <Text>Sign In</Text>
        </TouchableHighlight>
        <Text style={styles.errormsg}>
          {this.state.errors &&
            this.state.errors.login &&
            this.state.errors.login}{" "}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "lightblue",
    justifyContent: "center"
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 100,
    marginVertical: 5,
    borderRadius: 20,
    height: 50,
    fontSize: 25
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    padding: 10,
    marginTop: 20,
    marginHorizontal: 100,
    borderRadius: 20,
    height: 50
  },
  errormsg: {
    color: "red",
    padding: 10,
    marginHorizontal: 100,
    height: 50
  }
});
