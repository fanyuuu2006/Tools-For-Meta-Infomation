import { OutsideLink } from "./OutsideLink";
import { CommonDataTypes } from "@/lib/CommonType";
import { DateFromTimeStamp } from "@/lib/HandleFunction";
import { TableColumnProps } from "antd";

export const UserDataColumns: TableColumnProps[] = [
  {
    title: "序號",
    dataIndex: "Index",
    key: "Index",
    width: "15%",
  },
  {
    title: "用戶 ID",
    dataIndex: "Value",
    key: "UserID",
    render: (values) => (
      <OutsideLink href={values.href}>{values.UserID}</OutsideLink>
    ),
  },
  {
    title: "備註",
    dataIndex: "Note",
    key: "Note",
    render: (value) => DateFromTimeStamp(value),
  },
];

export const FeedDataColumns: TableColumnProps[] = [
  {
    title: "序號",
    dataIndex: "Index",
    key: "Index",
    width: "15%",
  },
  {
    title: "動態消息",
    dataIndex: "FeedName",
    key: "FeedName",
  },
  {
    title: "動態類型",
    dataIndex: "FeedType",
    key: "FeedType",
  },
  {
    title: "新增的主題",
    dataIndex: "AddedTopicNames",
    key: "AddedTopicNames",
  },
  {
    title: "新增的用戶",
    dataIndex: "AddedUserNames",
    key: "AddedUserNames",
  },
];

export const UserDataSource = (
  data: CommonDataTypes["UserData"][]
): {
  Index: number;
  Value: { UserID: CommonDataTypes["UserID"]; href: string };
  Note: number;
}[] =>
  data.map((data: CommonDataTypes["UserData"], index: number) => {
    return {
      Index: index + 1,
      Value: {
        UserID: data.string_list_data[0].value,
        href: data.string_list_data[0].href,
      },
      Note: data.string_list_data[0].timestamp ?? 0,
    };
  });

export const FeedDataSource = (
  data: CommonDataTypes["FeedData"][]
): {
  Index: number;
  FeedName: string;
  FeedType: string;
  AddedTopicNames: string;
  AddedUserNames: string;
}[] =>
  data.map((data: CommonDataTypes["FeedData"], index: number) => {
    return {
      Index: index + 1,
      FeedName: data.string_map_data["Feed name"].value,
      FeedType: data.string_map_data["Feed type"].value,
      AddedTopicNames:
        data.string_map_data["Added topic names delimited by `|`"].value,
      AddedUserNames:
        data.string_map_data["Added usernames delimited by `|`"].value,
    };
  });
