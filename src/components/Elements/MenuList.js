import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  AuditOutlined,
  HomeOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  CodeSandboxOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  DatabaseFilled,
  MenuFoldOutlined,
  InsertRowRightOutlined, GoldOutlined
} from "@ant-design/icons";
import { logOut } from "../../redux/actions";
import admin from "../../const/api";
import history from "../../const/history";

const MenuList = (props) => {
  return (
    <Menu
      mode="inline"
      theme="dark"
      className="menu-ul"
    >
      <Menu.Item key="12">
        <Link to={`/categories`}>
          <InsertRowRightOutlined />
          <span>Categories</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="13">
        <Link to={`/persons`}>
          <UsergroupAddOutlined />
          <span>Waitres</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="14">
        <Link to={`/tables`}>
          <DatabaseFilled />
          <span>Tables</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="15">
        <Link to={`/menu`}>
          <MenuFoldOutlined />
          <span>Menu</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="16">
        <Link to={`/orders`}>
          <GoldOutlined />
          <span>Orders</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};


export default connect(null, { logOut })(MenuList);
