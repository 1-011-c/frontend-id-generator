// @ts-ignore
import * as QRCode from 'easyqrcodejs';
import React, {RefObject} from "react";

interface Props {
    value: string;
    title: string;
}

interface State {
    qrCode: RefObject<any>;
}

export class QrCode extends React.Component<Props, State>{

    private ref: RefObject<any>;

    constructor(props: Props) {
        super(props);
        this.ref = React.createRef();
    }

    updateQrCode = () => {
        // Options
        var options = {
            text: this.props.value,
            title: this.props.title,
            titleHeight: 40,
            width: 300,
            height: 300,
        };
        // Create new QRCode Object
        new QRCode( this.ref.current, options);
    };

    componentDidMount() {
        this.updateQrCode();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        //this.updateQrCode();
    }

    render() {
        return <div ref={this.ref}/>
    }
}
