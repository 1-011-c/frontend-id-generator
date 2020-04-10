import {FormControl, MenuItem, TextField} from "@material-ui/core";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {TestbefundApiOrganisation} from "../data/ApiModel";

export interface TestCaseTemplateData {
    name: string;
    icdCode: string;
    client: string;
}

interface TestCaseTemplateProps {
    data: TestCaseTemplateData;
    allClients: TestbefundApiOrganisation[];
    dataChange(data: TestCaseTemplateData): void;
    dataDelete(data: TestCaseTemplateData): void;
}

export class TestCaseTemplate extends React.Component<TestCaseTemplateProps, {}> {

    private valueChange = (key: keyof TestCaseTemplateData) => {
        return (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            this.changeValue(event.target.value, key);
        }
    };

    changeValue = (value: string, key: keyof TestCaseTemplateData) => {
        const changed: TestCaseTemplateData = {
            ...this.props.data,
            [key]: value
        };
        this.props.dataChange(changed);
    };

    clientChange = (clientId: string) => {
        this.changeValue(clientId, 'client')
    };

    clientMenuItems = () => {
        return this.props.allClients.map(client =>  <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>)
    };


    render() {
        return <div>
            <div>
                <TextField id="testname" label="Testname" value={this.props.data.name} onChange={this.valueChange('name')}/>
                <TextField id="icdcode" label="ICD-Code" value={this.props.data.icdCode} onChange={this.valueChange('icdCode')}/>
                <FormControl>
                    <InputLabel>Organisation</InputLabel>
                    <Select
                        style={{width: '180px'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.props.data.client}
                        onChange={(event) => this.clientChange(event.target.value as string)}
                    >
                        {this.clientMenuItems()}
                    </Select>
                </FormControl>
                <IconButton onClick={() => this.props.dataDelete(this.props.data)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    }
}

export default TestCaseTemplate;
