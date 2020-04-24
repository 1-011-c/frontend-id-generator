import React from "react";
import {TestbefundApiTestWrapper} from "../data/ApiModel";
import {QrCode} from "./QrCode";
import {TestbefundConfig} from "../Config";


interface CreatedTestCaseProps {
    testWrapper?: TestbefundApiTestWrapper
}

export class CreatedTestCase extends React.Component<CreatedTestCaseProps, {}> {

    render() {
        if (!this.props.testWrapper) {
            return <React.Fragment/>
        } else {
            const readUrl = `${TestbefundConfig.testbefundPatientUrl}?readId=${this.props.testWrapper.readId}`;
            const writeId = this.props.testWrapper.writeId;
            return <div>
                <h4>Labor-ID: {writeId}</h4>
                <h5>Die Labor-ID kann entweder manuell oder als QR Code gespeichert werden</h5>
                <div className="qr-codes">
                    <QrCode divId={'patient-qr-code'} value={readUrl} title={"Patienten-Code"}/>
                    <QrCode divId={'lab-qr-code'} value={writeId} title={"Labor-Code"}/>
                </div>
            </div>
        }

    }
}
