import React from "react";
// import { useHistory } from "react-router-dom";
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export interface SignupProps {
  setToken: any;
  // updateToken: (token: string) => void;
}

export interface SignupState {
  email: string;
  password: string;
}

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = { email: "", password: "" };
  }

  onSubmit(e:any) {
    e.preventDefault()
    const endpointURL = `http://localhost:3001/users/register`;
    const body: RequestBodySignup = {
      users: {
        email: this.state.email,
        password: this.state.password,
      },
    };
    let signupHeaders = new Headers();
    signupHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: signupHeaders,
      body: JSON.stringify(body),
    };
    fetch(endpointURL, requestOptions)
      .then((res: any) => res.json())
      .then((json: ResponseSignup) => {
        this.props.setToken(json.sessionToken);
        console.log(json);
      });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{marginTop: '3em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',}}>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <form style={{width: '100%', // Fix IE 11 issue.
    marginTop: '1em',}}>
          <TextField
          variant="outlined"
          margin="normal"
          // required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="off"
          autoFocus
          type="email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />

<TextField
           variant="outlined"
           margin="normal"
          //  required
           fullWidth
           name="password"
           label="Password"
          type="password"
          id="password"
            autoComplete="current-password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            style={{marginBottom: '0.8em'}}
            onClick={(e) => this.onSubmit(e)}
          >
            Create Account
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item >
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in."}
              </Link>
            </Grid>
            <Grid item xs>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        
      </Box>
    </Container>
    );
  }
}

export default Signup;

export interface Users {
  
  email: string;
  password: string;
}

export interface RequestBodySignup {
  users: Users;
}

export interface ResponseSignup {
  users: Users;
  message: string;
  sessionToken: string;
}
