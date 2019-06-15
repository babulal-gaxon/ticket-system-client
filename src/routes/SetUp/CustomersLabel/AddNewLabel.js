import React, {Component} from 'react';
import {Button, Col, Form, Input, Modal, Radio} from "antd";


class AddNewLabel extends Component {
    constructor(props) {
        super(props);
        console.log("labelEditId", this.props.labelEditId);
        if (this.props.labelEditId === 0) {
            this.state = {
                name: "",
                desc: "",
                status: 1,
            };
        } else {
            const selectedLabel = this.props.labelList.find((label) => label.id === this.props.labelEditId);
            this.state = {...selectedLabel};
        }

    }

    onSaveData = () => {

        if (this.props.labelEditId === 0) {
            this.props.onAddLabelsData({...this.state});
        } else {
            this.props.onEditLabelsData({...this.state});
        }

        this.props.onSetID();
        this.props.onModalState();
    };

    render() {
        const {visible} = this.props;
        return (
            <div>
                <Modal
                    title="Add New Label"
                    visible={visible}
                    onCancel={() => {
                        this.props.onModalState();
                        this.props.onSetID()
                    }}
                    footer={[
                        <Button key="Save" type="primary" onClick={() => this.onSaveData()}>
                            {this.props.labelEditId === 0 ? "Add Label" : "Edit"}
                        </Button>,
                        <Button key="Cancel" onClick={() => {
                            this.props.onModalState();
                            this.props.onSetID()
                        }}>
                            Cancel
                        </Button>,
                    ]}
                >

                    <Form layout="vertical" style={{width: "60%"}}>
                        <Form.Item label="First Name">
                            <Input type="text" value={this.state.name} placeholder="Name" onChange={(e) => {
                                this.setState({name: e.target.value})
                            }}/>
                        </Form.Item>

                        <Form.Item label="Description">
                            <Input type="text" value={this.state.desc} placeholder="Description" onChange={(e) => {
                                this.setState({desc: e.target.value})
                            }}/>
                        </Form.Item>
                        <Form.Item label={"Set Priority"}>
                            <Radio.Group onChange={(e) => {
                                this.setState({status: e.target.value})
                            }} value={this.state.status}>
                                <Radio value={1}>Active</Radio>
                                <Radio value={0}>Disabled</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }


}

export default AddNewLabel;

