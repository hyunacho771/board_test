//CommentDetail.js
import React from "react";
import { Card, Icon, Avatar } from "antd";
const { Meta } = Card;

function CommentDetail(props) {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://www.w3schools.com/howto/img_avatar.png"
        />
      }
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="edit" key="edit" />,
        <Icon type="ellipsis" key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://www.w3schools.com/howto/img_avatar.png" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
}
