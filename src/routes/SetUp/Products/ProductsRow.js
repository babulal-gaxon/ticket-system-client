import {Avatar, Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";

const ProductsRow = (context) => {
  return [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      render: (text, record) => {
        return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
            {record.avatar ?
              <Avatar className="gx-mr-3 gx-size-80" src={MEDIA_BASE_URL + record.avatar.src}/> :
              <Avatar className="gx-mr-3 gx-size-80"
                      style={{backgroundColor: '#f56a00'}}>{record.title[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body">
              <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ? "NA" : record.desc}</span>
      },
    },
    {
      title: 'Support',
      dataIndex: 'support_enable',
      key: 'support',
      render: (text, record) => {
        return <Tag color={record.support_enable === 1 ? "green" : "red"}>
          {record.support_enable === 1 ? "Enabled" : "Disabled"}
        </Tag>
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'empty',
      render: (text, record) => {
        return <span> {(Permissions.canProductEdit()) ?
          <i className="icon icon-edit gx-mr-3" onClick={() => context.onEditProduct(record)}/> : null}
          {(Permissions.canProductDelete()) ? context.onDeletePopUp(record.id) : null}
          </span>
      },
    },
  ];
};

export default ProductsRow;
