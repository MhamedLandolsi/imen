import * as React from 'react';
import store from "../../../store";
import {Widget, addResponseMessage, toggleWidget, deleteMessages, addUserMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import {useEffect, useState} from "react";
import DataTable from "../../atom/DataTable";
import {connect} from "react-redux";

function chat(props) {
    useEffect(() => {
        store.dispatch.chatState.getChatListAction().then(() => {
            let interval = setInterval(() => {
                store.dispatch.chatState.getCurrentChatMessageAction().then((data) => {

                    if (data.length !== 0) {
                        for (let i = props.chatManger.index; i < data.length; i++) {
                            if (data[i].source === props.user.id) {
                                addUserMessage(data[i].message);
                            } else {
                                addResponseMessage(data[i].message);
                            }
                        }
                    }
                })

            }, 1000)

            return () => {
                clearInterval(interval);
            }
        });
    }, []);


    function sendMessage(message) {
        store.dispatch.chatState.sendMessage({message, source: props.user.id}).then(
            () => {
                deleteMessages()
                store.dispatch.chatState.mvIndex({count: 0});
            }
        );
    }

    function openChat(id) {
        store.dispatch.chatState.setUser(id);
        deleteMessages()
        store.dispatch.chatState.mvIndex({count: 0});
        deleteMessages()
        toggleWidget();
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">User Chats</h1>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Open Chat List</h6>
                </div>
                <div className="card-body">

                    <div className="card-body">
                        <div className="table-responsive">
                            <DataTable
                                head={['Action', 'User']}
                                data={props.chatManger.chat.map((item) => {
                                    return [
                                        (<>

                                            <a className="btn btn-sm btn-info btn-circle"
                                               onClick={() => openChat(item.id)}>
                                                <i className="fas fa-chalkboard-teacher"/>
                                            </a>
                                        </>),
                                        item.username,
                                    ]
                                })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            {props.chatManger.user && <Widget
                title={''}
                subtitle={''}
                handleNewUserMessage={sendMessage}

            />}

        </>
    )
}


const mapState = (state) => ({
    chatManger: state.chatState,
    user: state.userState.user
})
export default connect(mapState, null)(chat)
