import React from 'react';
import './App.css';
import {Button, Container, TextField} from "@material-ui/core";
import TestCaseTemplate, {TestCaseTemplateData} from "./modules/TestCaseTemplate";
import {immutableDelete, immutableReplace} from "./util";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import {TestbefundApiOrganisation, TestbefundApiTestWrapper} from "./data/ApiModel";
import {TestbefundApi} from "./data/TestbefundApi";
import {CreatedTestCase} from "./modules/CreatedTestCase";
import {TestbefundInfo} from "./modules/TestbefundInfo";
import {TestbefundLogin} from "./modules/TestbefundLogin";
import {NotificationContainer} from "react-notifications";


interface AppState {
    data: TestCaseTemplateData[];
    editing: boolean;
    // Loaded by API
    clients: TestbefundApiOrganisation[];
    testWrapper?: TestbefundApiTestWrapper;
    username: string;
    password: string;
}

class App extends React.Component<{}, AppState> {


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            data: [],
            editing: false,
            clients: [],
            username: "",
            password: ""
        }
    }

    componentDidMount(): void {

    }

    addData = () => {
        this.setState({
            data: [...this.state.data, {client: "", icdCode: "", name: ""}]
        })
    };

    toggleEditing = () => {
        this.setState({editing: !this.state.editing})
    };

    handleDataChange = (data: TestCaseTemplateData, index: number) => {
        this.setState({
            data: immutableReplace(this.state.data, data, index)
        });
    };

    handleDelete = (index: number) => {
        this.setState({
            data: immutableDelete(this.state.data, index)
        });
    };

    handleTemplateDataChange = (jsonString: string) => {
        let data = null;
        try {
            data = JSON.parse(jsonString);
        } catch (ignored) {

        }
        if (!!data) {
            this.setState({
                data: data
            })
        }
    };

    handleAuthSuccessful = (username: string, password: string): void => {
        this.setState({
            password,
            username
        });
        TestbefundApi.loadOrganisations(username, password)
            .then(clients => this.setState({clients}));
    };


    generateQrCode = () => {
        TestbefundApi.createTest(this.state.data, this.state.username, this.state.password)
            .then(result => this.setState({testWrapper: result}));
    };

    renderResultingTemplate = () => {
        const jsonString = JSON.stringify(this.state.data, null, 2);
        if (this.state.editing) {
            return <TextField
                fullWidth={true}
                id="filled-multiline-flexible"
                label="Multiline"
                multiline
                onChange={event => this.handleTemplateDataChange(event.target.value)}
                value={jsonString}
            />
        }
        return <code style={{'whiteSpace': 'pre'}}>
            {jsonString}
        </code>
    };

    Login = () => {
        return <TestbefundLogin authSuccessful={this.handleAuthSuccessful}/>
    };

    TestbefundApp = () => {
        return <div>
            <TestbefundInfo/>
            {this.state.data.map((data, index) => <TestCaseTemplate
                key={index}
                data={data}
                allClients={this.state.clients}
                dataDelete={_ => this.handleDelete(index)}
                dataChange={data => this.handleDataChange(data, index)}/>
            )}
            <Button onClick={this.addData}>Test Hinzufügen</Button>
            <Button onClick={this.generateQrCode}>QR Code(s) Generieren</Button>
            <h3>Resultierendes Test-Template
                <IconButton onClick={() => this.toggleEditing()}>
                    <EditIcon/>
                </IconButton>
            </h3>
            {this.renderResultingTemplate()}
            <CreatedTestCase testWrapper={this.state.testWrapper}/>
        </div>
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <Container maxWidth="md">
            {!this.state.username ? <this.Login/> : <this.TestbefundApp/>}
            <NotificationContainer/>
        </Container>
    }

}

export default App;
