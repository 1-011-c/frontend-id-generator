import React from "react";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import {TestbefundApi} from "../data/TestbefundApi";
import {NotificationManager} from "react-notifications";


interface State {
    username: string;
    password: string;
    loginPending: boolean;
}

interface Props {
    authSuccessful(username: string, password: string): void;
}

export class TestbefundLogin extends React.Component<Props, State> {


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            password: "",
            username: "",
            loginPending: false
        }
    }

    handleUserNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.setState({
            username: event.target.value
        })
    };

    handlePasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.setState({
            password: event.target.value
        })
    };

    setLoginPending = (loginPending: boolean) => {
        this.setState({
            loginPending
        })
    };

    handleLogin = () => {
        this.setLoginPending(true);
        TestbefundApi.isAuthenticated(this.state.username, this.state.password)
            .then(authenticated => {
                this.setLoginPending(true);
                if (authenticated) {
                    this.props.authSuccessful(this.state.username, this.state.password);
                    NotificationManager.success('Login Erfolgreich')
                } else {
                    NotificationManager.error('Login Fehlgeschlagen')
                }
            })
    };

    render() {
        return <Card>
            <CardHeader title={" Testbefund GENERATOR Login"}
                        subheader={<div>Mehr Informationen zu Testbefund gibt es <a href="https://testbefund.nusselt.de/" rel="noopener noreferrer" target="_blank">hier</a></div>}>
            </CardHeader>
            <CardMedia
                image="/img/undraw_authentication_fsn5.svg"
                component="img"
                alt="Login"
                height="250"
                title="Login"
            />
            <CardContent style={{"display": "flex", "flexDirection": "column"}}>
                <TextField label="Nutzername" value={this.state.username} onChange={this.handleUserNameChange}/>
                <TextField label="Passwort" value={this.state.password} onChange={this.handlePasswordChange}
                           type="password"/>
                <div>

                </div>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={this.handleLogin}>
                    Login
                </Button>
            </CardActions>
        </Card>
    }
}
