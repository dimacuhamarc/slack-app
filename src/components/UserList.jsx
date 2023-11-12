import { useState, useEffect } from "react";
import { API_URL } from "../constants/Constants";
import axios from "axios";
import UserService from "../services/UserServices";

export const UserList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Apply getUsers function from UserService here
    async function fetchUsers() {
        const users = await UserService.getUsers(user);
        setUserList(users);
    }
    if (user) {
      fetchUsers();
    }
  }, [1])

  if (userList.length > 0) {
    console.log(userList[0].id);
  }
}