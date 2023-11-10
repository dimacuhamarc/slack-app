import { API_URL } from '../constants/Constants';
import axios from 'axios';

const ChannelService = {
    getChannels: async function(user, setChannels) {
        try {
            const response = await axios.get(`${API_URL}/channels`, {
                headers: {
                    "access-token": user.accessToken,
                    client: user.client,
                    expiry: user.expiry,
                    uid: user.uid
                }
            });

            const { data } = response;
            if (data) {
                setChannels(data.data);
            }
        } catch (error) {
            if (error.response.data.errors) {
                alert("Invalid credentials");
            }
        }
    },

    addChannel: async function(user, channelData) {
        try {
            const response = await axios.post(`${API_URL}/channels`, channelData, {
                headers: {
                    "access-token": user["access-token"],
                    "client": user.client,
                    "expiry": user.expiry,
                    "uid": user.uid
                }
            });

            if (response.status === 200) {
                console.log("Channel created successfully:", response.data);
                return response.data; 
              } else {
                console.error("Failed to create the channel. Unexpected status code:", response.status);
              }
            } catch (error) {
              console.error("Failed to add the channel:", error);
              throw error; 
            }
    },

    addChannelMember: async function(user, memberId) {
        try {
            const response = await axios.post(
                `${API_URL}/channel/add_member`,
                {
                    id: user.id,
                    member_id: memberId,
                },
                {
                    headers: {
                        "access-token": user.accessToken,
                        client: user.client,
                        expiry: user.expiry,
                        uid: user.uid,
                    },
                }
            );

            // handle the response [wip]
            const { data } = response;
            if (data) {
                // [wip] handle success here
            }
        } catch (error) {
            // [wip] handle error
            alert("Failed to add the member to the channel");
        }
    }


};

export default ChannelService;
