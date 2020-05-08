import React from 'react';
import './App.css';
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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";


interface TestContainerData {
    clientId: string | null;
    tests: TestCaseTemplateData[];
}

interface AppState {
    data: TestContainerData;
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
            data: {tests: [], clientId: null},
            editing: false,
            clients: [],
            username: "",
            password: ""
        }
    }

    componentDidMount(): void {

    }

    addData = () => {
        const tests = [...this.state.data.tests, {icdCode: "", name: ""}];
        this.setState({
            data: {...this.state.data, tests}
        })
    };

    toggleEditing = () => {
        this.setState({editing: !this.state.editing})
    };

    handleDataChange = (data: TestCaseTemplateData, index: number) => {
        this.setState({
            data: {...this.state.data, tests: immutableReplace(this.state.data.tests, data, index)}
        });
    };

    handleDelete = (index: number) => {
        this.setState({
            data: {...this.state.data, tests: immutableDelete(this.state.data.tests, index)}
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
        TestbefundApi.createTest(this.state.data.tests, this.state.data.clientId, this.state.username, this.state.password)
            .then(result => this.setState({testWrapper: result}));
    };

    clientChange = (clientId: string) => {
        this.setState({
            data: {...this.state.data, clientId}
        })
    };

    clientMenuItems = () => {
        return this.state.clients.map(client =>  <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>)
    };


    renderResultingTemplate = () => {
        const jsonString = JSON.stringify(this.state.data, null, 2);
        if (this.state.editing) {
            return <TextField
                fullWidth={true}
                id="filled-multiline-flexible"
                label="Test-Template"
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
        return <div style={{'marginTop': "32px"}}>
            <TestbefundLogin authSuccessful={this.handleAuthSuccessful}/>
        </div>
    };

    TestbefundApp = () => {
        return <div>
            <TestbefundInfo/>
            <div>
                <FormControl fullWidth={true}>
                    <InputLabel>Ausstellende Organisation</InputLabel>
                    <Select
                        style={{minWidth: '300px'}}
                        fullWidth={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.data.clientId}
                        onChange={(event) => this.clientChange(event.target.value as string)}
                    >
                        {this.clientMenuItems()}
                    </Select>
                </FormControl>
            </div>

            {this.state.data.tests.map((data, index) => <TestCaseTemplate
                key={index}
                data={data}
                allClients={this.state.clients}
                dataDelete={_ => this.handleDelete(index)}
                dataChange={data => this.handleDataChange(data, index)}/>
            )}
            <Button onClick={this.addData}>Test Hinzufügen</Button>
            <Button onClick={this.generateQrCode} disabled={this.state.data.tests.length <= 0}>QR Code(s) Generieren</Button>
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
        return <div>
            <AppBar position="static">
                <Toolbar id="app-bar">
                    <img style={{'height': '64px'}} src="/img/testbefund_logo.png" alt="Testbefund Logo"/>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                {!this.state.username ? <this.Login/> : <this.TestbefundApp/>}
                <NotificationContainer/>
            </Container>
        </div>
    }

}

export default App;
