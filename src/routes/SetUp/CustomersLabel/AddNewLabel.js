import React, {Component} from 'react';
import {Button, Col, Form, Input, Modal, Radio} from "antd";

class AddNewLabel extends Component {
    constructor(props) {
        super(props);
        if (this.props.labelEditId === 0) {
            this.state = {
                name: "",
                desc: "",
                status: 1,
            };
        } else {
            const selectedLabel = this.props.labelList.find((label) => label.id === this.props.labelEditId);
            this.state = {...selectedLabel};
            setTimeout(this.onSetFieldsValue,10);
        }

    }
    onSetFieldsValue=()=>{
        console.log("aaraha hai" );
        this.props.form.setFieldsValue({
            name : this.state.name,
            description: this.state.desc

        });
    };


    onSaveData = () => {

        if (this.props.labelEditId === 0) {
            this.props.onAddLabelsData({...this.state});
        } else {
            this.props.onEditLabelsData({...this.state});
        }

        this.props.onSetID();
        this.props.onModalState();
    };
    check = () => {
        this.props.form.validateFields(err => {
            if (!err) {
                this.onSaveData();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
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
                        <Button key="Save" type="primary" onClick={this.check}>
                           Save
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
                        {console.log("Form", this.props.form)}
                        <Form.Item label="Name">{getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please input Name!'}],
                        })(<Input type="text" placeholder="Name" onChange={(e) => {
                            this.setState({name: e.target.value})
                        }}/>)}
                        </Form.Item>


                        <Form.Item label="Description">{getFieldDecorator('description', {
                            rules: [{required: true, message: 'Please input Description!'}],
                        })(<Input type="text" placeholder="Description" onChange={(e) => {
                            this.setState({desc: e.target.value})
                        }}/>)}
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

AddNewLabel = Form.create({})(AddNewLabel);

export default AddNewLabel;

