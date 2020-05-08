import React from "react";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';
import {TestbefundApiOrganisation} from "../data/ApiModel";

export interface TestCaseTemplateData {
    name: string;
    icdCode: string;
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

    render() {
        return <div>
            <div>
                <TextField id="testname" label="Testname" value={this.props.data.name} onChange={this.valueChange('name')}/>
                <TextField id="icdcode" label="ICD-Code" value={this.props.data.icdCode} onChange={this.valueChange('icdCode')}/>
                <IconButton onClick={() => this.props.dataDelete(this.props.data)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    }
}

export default TestCaseTemplate;
