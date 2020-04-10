import React from "react";
import {TestbefundApiTestCase, TestbefundApiTestWrapper} from "../data/ApiModel";
import {QrCode} from "./QrCode";
import {TestbefundConfig} from "../Config";


interface CreatedTestCaseProps {
    testWrapper?: TestbefundApiTestWrapper
}

export class CreatedTestCase extends React.Component<CreatedTestCaseProps, {}> {

    renderQrCodes = (testCases: TestbefundApiTestCase[]) => {
        return testCases
            .map(value => <div key={value.writeId} className="qr-code">
                <QrCode value={value.writeId} title={`${value.title}(${value.icdCode})`}/>
            </div>);
    };

    render() {
        if (!this.props.testWrapper) {
            return <React.Fragment/>
        } else {
            const readUrl = `${TestbefundConfig.testbefundPatientUrl}?readId=${this.props.testWrapper.readId}`;
            return <div style={{display: "flex", flexDirection: "row"}}>
                <div className="qr-code">
                    <QrCode value={readUrl} title={"Patienten-Code"}/>
                </div>
                {this.renderQrCodes(this.props.testWrapper.testCases)}
            </div>
        }

    }
}
